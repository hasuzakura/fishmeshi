// お問い合わせフォームの受信エンドポイント（Vercel Serverless Function）
// POST /api/contact に { name, email, message, website, elapsed } を受け取り、
// Resend の API 経由で運営者宛にメールを送る。
//
// 必要な環境変数（Vercelのプロジェクト設定 > Environment Variables に登録すること）:
//   RESEND_API_KEY  … Resend の API キー
//   CONTACT_TO      … 通知の宛先メールアドレス（Resendアカウントの所有者アドレス）
//   CONTACT_FROM    … 送信元。省略時は onboarding@resend.dev（独自ドメイン未認証でも使える既定値）
//
// 依存パッケージなし。Node.js 18以降のグローバル fetch を使用。

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Fish Meshi <onboarding@resend.dev>";

// フォーム表示から送信までがこれより速い場合はボットとみなす（ミリ秒）
const MIN_ELAPSED_MS = 3000;

// 同一IPからの連続送信を抑える。関数インスタンスのメモリ上のみの簡易的な制限。
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 3;
const recentRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const history = (recentRequests.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (history.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, history);
    return true;
  }

  history.push(now);
  recentRequests.set(ip, history);

  // 古いエントリが溜まり続けないよう、増えすぎたら掃除する
  if (recentRequests.size > 500) {
    for (const [key, times] of recentRequests) {
      if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) recentRequests.delete(key);
    }
  }

  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ヘッダインジェクション防止のため、件名などに使う値から改行を除く
function singleLine(str) {
  return String(str).replace(/[\r\n]+/g, " ").trim();
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "メソッドが許可されていません。" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "リクエストの形式が不正です。" });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "リクエストの形式が不正です。" });
  }

  // ハニーポットと送信速度によるボット判定。
  // ボットに検知を気づかせないよう、成功時と同じ応答を返す。
  const filledHoneypot = typeof body.website === "string" && body.website.trim() !== "";
  const tooFast = typeof body.elapsed === "number" && body.elapsed < MIN_ELAPSED_MS;
  if (filledHoneypot || tooFast) {
    return res.status(200).json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "お名前・メールアドレス・お問い合わせ内容をすべてご入力ください。" });
  }
  if (name.length > 100 || email.length > 200) {
    return res.status(400).json({ error: "お名前またはメールアドレスが長すぎます。" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "メールアドレスの形式をご確認ください。" });
  }
  if (message.length < 10) {
    return res.status(400).json({ error: "お問い合わせ内容は10文字以上でご入力ください。" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "お問い合わせ内容は2000文字以内でご入力ください。" });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : String(forwarded || "unknown")).split(",")[0].trim();
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "送信が続けて行われました。しばらく時間をおいてからお試しください。" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error("RESEND_API_KEY または CONTACT_TO が設定されていません");
    return res.status(500).json({ error: "現在お問い合わせを受け付けられません。時間をおいてお試しください。" });
  }

  const subject = `[fishmeshi] お問い合わせ：${singleLine(name)}`;
  const text = [
    `お名前：${name}`,
    `メールアドレス：${email}`,
    `送信元IP：${ip}`,
    `送信日時：${new Date().toISOString()}`,
    "",
    "----- お問い合わせ内容 -----",
    message,
  ].join("\n");

  const html = [
    `<p><strong>お名前：</strong>${escapeHtml(name)}</p>`,
    `<p><strong>メールアドレス：</strong>${escapeHtml(email)}</p>`,
    `<p><strong>送信元IP：</strong>${escapeHtml(ip)}</p>`,
    `<hr>`,
    `<p style="white-space:pre-wrap;">${escapeHtml(message)}</p>`,
  ].join("");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resendへの送信に失敗:", response.status, detail);
      return res.status(502).json({ error: "送信に失敗しました。時間をおいて再度お試しください。" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("お問い合わせ送信中のエラー:", error);
    return res.status(500).json({ error: "送信に失敗しました。時間をおいて再度お試しください。" });
  }
};
