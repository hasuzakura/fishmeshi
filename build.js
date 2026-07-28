// レシピ詳細ページ・魚別インデックス・全レシピ一覧・sitemap.xml・robots.txt を静的生成するビルドスクリプト
// 実行方法: node build.js
// data.js（RECIPES等）を書き換えたら、このスクリプトを再実行して出力ファイルを更新すること

const fs = require("fs");
const path = require("path");
const { FISH_LIST, RECIPES, AMAZON_BASE, AMAZON_TAG, ADSENSE_ENABLED, FISHING_LOGS } = require("./data.js");

const SITE_URL = "https://fishmeshi.com";
const SITE_NAME = "釣り飯ジェネレーター";
const OPERATOR_NAME = "藤原";
const OUT_DIR = __dirname;

// Amazonアソシエイト・プログラムの規約で全ページへの掲載が義務づけられている表記
const AMAZON_DISCLOSURE = `Amazonのアソシエイトとして、${SITE_NAME}は適格販売により収入を得ています。`;

function parseTimeToISO(timeStr) {
  const match = timeStr.match(/(\d+)分/);
  return match ? `PT${match[1]}M` : undefined;
}

function writeFile(relPath, content) {
  const fullPath = path.join(OUT_DIR, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
}

function layout({ title, description, canonical, bodyHtml, structuredData, noindex, bodyScript }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  ${noindex ? `<meta name="robots" content="noindex">` : ""}
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <link rel="stylesheet" href="/style.css">
  ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ""}
</head>
<body>
  <header>
    <div class="container">
      <p class="site-title"><a href="/" style="color:inherit;text-decoration:none;">${SITE_NAME}</a></p>
      <p class="tagline">釣れた魚から、今夜の一品を見つけよう</p>
    </div>
  </header>
  <main>
    <div class="container">
      ${bodyHtml}
    </div>
  </main>
  <footer>
    <div class="container">
      <p>© 2026 ${SITE_NAME}</p>
      <p class="footer-note">掲載レシピはオリジナルコンテンツです</p>
      <p class="footer-note"><a href="/">魚から探す</a> ｜ <a href="/recipes/">レシピ一覧</a> ｜ <a href="/diary/">釣行記</a></p>
      <p class="footer-note"><a href="/about/">運営者情報</a> ｜ <a href="/privacy/">プライバシーポリシー</a> ｜ <a href="/disclaimer/">免責事項</a> ｜ <a href="/contact/">お問い合わせ</a></p>
      <p class="footer-note">${AMAZON_DISCLOSURE}</p>
    </div>
  </footer>
  ${bodyScript || ""}
</body>
</html>
`;
}

function buildRecipePage(fish, recipe) {
  const url = `${SITE_URL}/recipe/${fish.slug}-${recipe.slug}/`;
  const description = `${fish.name}で作る「${recipe.name}」のレシピ。${recipe.servings}・調理時間${recipe.time}。材料と作り方をわかりやすく紹介します。`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    image: [fish.photo],
    author: { "@type": "Organization", name: SITE_NAME },
    datePublished: "2026-07-20",
    description,
    recipeYield: recipe.servings,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map(s => ({ "@type": "HowToStep", text: s })),
  };
  const totalTime = parseTimeToISO(recipe.time);
  if (totalTime) structuredData.totalTime = totalTime;

  const amazonLinks = [...recipe.seasonings, ...recipe.tools]
    .filter(t => t !== "なんでもある")
    .map(t => `<a class="amazon-btn" href="${AMAZON_BASE}${encodeURIComponent(t + " 料理")}&tag=${AMAZON_TAG}" target="_blank" rel="noopener noreferrer">🛒 ${t}</a>`)
    .join("");

  const body = `
    <div class="breadcrumb">
      <a href="/">トップ</a> &gt; <a href="/fish/${fish.slug}/">${fish.name}</a> &gt; ${recipe.name}
    </div>
    <div class="detail-photo" style="background-image:url('${fish.photo}')"></div>
    <div class="detail-header">
      <h1>${recipe.name}</h1>
      <div class="recipe-meta">${recipe.servings}｜調理時間 ${recipe.time}</div>
      <div class="tag-row">
        ${recipe.places.map(p => `<span class="tag">${p}</span>`).join("")}
        ${recipe.tools.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
    <div class="detail-section">
      <h2>材料</h2>
      <ul class="ingredients-list">
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
    <div class="detail-section">
      <h2>作り方</h2>
      <ol class="steps-list">
        ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
      </ol>
    </div>
    ${amazonLinks ? `<div class="detail-section"><h2>この料理に使う調味料・道具</h2><div class="amazon-links">${amazonLinks}</div></div>` : ""}
    <div class="detail-section">
      <h2>関連</h2>
      <div class="amazon-links">
        <a class="permalink" href="/fish/${fish.slug}/">${fish.name}の他のレシピを見る →</a>
      </div>
    </div>
  `;

  writeFile(`recipe/${fish.slug}-${recipe.slug}/index.html`, layout({
    title: `${recipe.name}の作り方｜${fish.name}のレシピ - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
    structuredData,
  }));

  return url;
}

function buildFishPage(fish) {
  const recipes = RECIPES[fish.name] || [];
  const url = `${SITE_URL}/fish/${fish.slug}/`;
  const description = `${fish.name}で作れるレシピ${recipes.length}件。刺身・塩焼き・揚げ物など、釣れた${fish.name}をすぐ料理できるレシピ一覧。`;

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; ${fish.name}のレシピ一覧</div>
    <div class="detail-photo" style="background-image:url('${fish.photo}')"></div>
    <div class="detail-header">
      <h1>${fish.name}のレシピ一覧（${recipes.length}件）</h1>
    </div>
    <div class="index-list">
      ${recipes.map(r => `<a href="/recipe/${fish.slug}-${r.slug}/">${r.name}（${r.time}）</a>`).join("")}
    </div>
  `;

  writeFile(`fish/${fish.slug}/index.html`, layout({
    title: `${fish.name}のレシピ一覧 - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
  }));

  return url;
}

function buildRecipesIndexPage() {
  const url = `${SITE_URL}/recipes/`;
  const description = "アジ・サバ・イワシ・タイなど身近な魚のレシピを魚種別に全件掲載。釣れた魚からすぐ作れる料理を探せます。";

  const fishGrid = FISH_LIST.map(f => `
    <a href="/fish/${f.slug}/" style="background-image:url('${f.photo}')"><span>${f.name}</span></a>
  `).join("");

  const sections = FISH_LIST.map(fish => {
    const recipes = RECIPES[fish.name] || [];
    return `
      <div class="index-section">
        <h2>${fish.name}（<a href="/fish/${fish.slug}/">一覧を見る</a>）</h2>
        <div class="index-list">
          ${recipes.map(r => `<a href="/recipe/${fish.slug}-${r.slug}/">${r.name}</a>`).join("")}
        </div>
      </div>
    `;
  }).join("");

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; レシピ一覧</div>
    <div class="detail-header">
      <h1>全レシピ一覧</h1>
      <p class="step-sub">魚をタップして探すか、下のリストから直接選べます</p>
    </div>
    <div class="fish-index-grid">${fishGrid}</div>
    ${sections}
  `;

  writeFile("recipes/index.html", layout({
    title: `全レシピ一覧 - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
  }));

  return url;
}

function buildDiaryPage(log) {
  const url = `${SITE_URL}/diary/${log.slug}/`;
  const description = `${log.location}で${log.species}を釣った釣行記。${log.conditions}・${log.method}・${log.catchCount}。`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: log.title,
    datePublished: log.date,
    author: { "@type": "Person", name: "藤原" },
    publisher: { "@type": "Organization", name: SITE_NAME },
    description,
    articleBody: log.body.join("\n"),
  };

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; <a href="/diary/">釣行記</a> &gt; ${log.title}</div>
    <div class="detail-header">
      <h1>${log.title}</h1>
      <div class="recipe-meta">${log.date}｜${log.location}</div>
      <div class="tag-row">
        <span class="tag">${log.species}</span>
        <span class="tag">${log.conditions}</span>
        <span class="tag">${log.method}</span>
        <span class="tag">${log.catchCount}</span>
      </div>
    </div>
    <div class="detail-section">
      ${log.body.map(p => `<p style="margin-bottom:12px;">${p}</p>`).join("")}
    </div>
    <div class="detail-section">
      <h2>関連</h2>
      <div class="amazon-links">
        <a class="permalink" href="/diary/">他の釣行記を見る →</a>
      </div>
    </div>
  `;

  writeFile(`diary/${log.slug}/index.html`, layout({
    title: `${log.title} - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
    structuredData,
  }));

  return url;
}

function buildDiaryIndexPage() {
  const url = `${SITE_URL}/diary/`;
  const description = "釣行の記録。いつ・どこで・何を釣ったか、実際の釣行エピソードを掲載しています。";

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; 釣行記</div>
    <div class="detail-header">
      <h1>釣行記</h1>
      <p class="step-sub">実際に釣りに行った記録です</p>
    </div>
    <div class="index-list">
      ${FISHING_LOGS.map(log => `<a href="/diary/${log.slug}/">${log.title}（${log.date}）</a>`).join("")}
    </div>
  `;

  writeFile("diary/index.html", layout({
    title: `釣行記 - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
  }));

  return url;
}

// 運営者情報・プライバシーポリシー・免責事項など、本文が固定のページを組み立てる
function legalSection(heading, innerHtml) {
  return `<div class="detail-section"><h2>${heading}</h2><div class="legal-body">${innerHtml}</div></div>`;
}

function buildAboutPage() {
  const url = `${SITE_URL}/about/`;
  const description = `${SITE_NAME}の運営者情報。実際に釣りをしている運営者が、釣れた魚を美味しく食べるためのレシピと釣行記を掲載しています。`;

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; 運営者情報</div>
    <div class="detail-header">
      <h1>運営者情報</h1>
      <p class="step-sub">このサイトを作っている人と、作っている理由について</p>
    </div>
    ${legalSection("サイト概要", `
      <dl class="legal-dl">
        <dt>サイト名</dt><dd>${SITE_NAME}</dd>
        <dt>URL</dt><dd>${SITE_URL}/</dd>
        <dt>運営者</dt><dd>${OPERATOR_NAME}</dd>
        <dt>開設</dt><dd>2026年7月</dd>
        <dt>連絡先</dt><dd><a href="/contact/">お問い合わせフォーム</a>よりご連絡ください</dd>
      </dl>
    `)}
    ${legalSection("このサイトについて", `
      <p>${SITE_NAME}は、釣れた魚をその日のうちに美味しく食べるためのサイトです。</p>
      <p>釣りをしていて一番困るのは、実は釣れたあとだと思っています。魚は釣れる、でも家に持ち帰ってから「これ、どうやって食べよう」と手が止まる。スマホでレシピを探しても、出てくるのは切り身が前提だったり、家に無い調味料が並んでいたりする。釣り場やキャンプ場では、そもそもフライパンしか無いこともあります。</p>
      <p>そこで、釣れた魚・料理する場所・使える道具・手元にある調味料を選ぶだけで、今の条件で実際に作れる料理だけが出てくる仕組みを作りました。それがトップページのジェネレーターです。</p>
    `)}
    ${legalSection("コンテンツの作り方", `
      <p>掲載しているレシピは、既存のレシピサイトから転載したものではなく、すべて当サイトで用意したオリジナルの内容です。魚種ごとの下処理や火の通し方を踏まえて、道具の制約がある状況でも作れるように構成しています。</p>
      <p><a href="/diary/">釣行記</a>は、運営者が実際に釣りに行った記録です。釣れた日も、あまり釣れなかった日も、そのまま書いています。良いことばかり書かれた記事より、実際に何が起きたかが分かる記録のほうが役に立つと考えているためです。</p>
    `)}
    ${legalSection("収益について", `
      <p>当サイトは、Amazonアソシエイト・プログラムを利用しています。レシピページに掲載している調味料や調理道具のリンクから商品が購入された場合、当サイトに紹介料が発生することがあります。</p>
      <p>${AMAZON_DISCLOSURE}</p>
      <p>紹介料の有無によって、レシピの内容や紹介する道具を歪めることはしません。詳しくは<a href="/privacy/">プライバシーポリシー</a>をご覧ください。</p>
    `)}
  `;

  writeFile("about/index.html", layout({
    title: `運営者情報 - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
  }));

  return url;
}

function buildPrivacyPage() {
  const url = `${SITE_URL}/privacy/`;
  const description = `${SITE_NAME}のプライバシーポリシー。個人情報の取り扱い、Cookie、広告配信、アフィリエイトプログラムについて説明しています。`;

  // AdSenseを実際に配信し始めたら data.js の ADSENSE_ENABLED を true にすること
  const adSection = ADSENSE_ENABLED
    ? `
      <p>当サイトは、第三者配信の広告サービス「Google AdSense」を利用しています。</p>
      <p>Googleなどの第三者配信事業者は、Cookieを使用して、ユーザーが当サイトや他のサイトに過去にアクセスした際の情報に基づいて広告を配信します。</p>
      <p>Cookieを使用した広告のパーソナライズは、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">広告設定</a>で無効にできます。また、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>にアクセスすれば、第三者配信事業者のCookieを無効にできます。</p>
      <p>詳しくは<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">Googleの広告に関するポリシー</a>をご確認ください。</p>
    `
    : `
      <p>当サイトは現在、第三者配信の広告サービスを利用していません。</p>
      <p>将来的にGoogle AdSenseなどの広告サービスを導入する場合、第三者配信事業者がCookieを使用して、ユーザーが当サイトや他のサイトに過去にアクセスした際の情報に基づいて広告を配信することがあります。その際は本ポリシーを更新し、内容を明記します。</p>
    `;

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; プライバシーポリシー</div>
    <div class="detail-header">
      <h1>プライバシーポリシー</h1>
      <p class="step-sub">当サイトにおける個人情報・Cookieの取り扱いについて</p>
    </div>
    ${legalSection("基本方針", `
      <p>${SITE_NAME}（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の保護に関する法令およびその他の規範を遵守します。本ポリシーは、当サイトが取得する情報とその取り扱いについて定めるものです。</p>
    `)}
    ${legalSection("取得する情報と利用目的", `
      <p>当サイトは、<a href="/contact/">お問い合わせフォーム</a>を通じて、お名前・メールアドレス・お問い合わせ内容を取得します。</p>
      <p>これらの情報は、お問い合わせへの回答および必要な連絡のためにのみ利用し、それ以外の目的では利用しません。</p>
      <p>当サイトは、閲覧するだけの利用者に対して、氏名・住所・電話番号などの個人を特定できる情報の入力を求めることはありません。</p>
    `)}
    ${legalSection("個人情報の第三者提供", `
      <p>当サイトは、次の場合を除き、取得した個人情報を第三者に開示・提供しません。</p>
      <ul>
        <li>本人の同意がある場合</li>
        <li>法令に基づく開示請求があった場合</li>
        <li>人の生命・身体・財産の保護のために必要であり、本人の同意を得ることが困難な場合</li>
      </ul>
      <p>なお、お問い合わせフォームからの送信内容は、メール配信サービスを経由して運営者に届きます。この過程で送信内容が当該サービスのサーバーを通過します。</p>
    `)}
    ${legalSection("Cookieについて", `
      <p>Cookieとは、ウェブサイトが利用者のブラウザに保存する小さなテキストファイルです。利用者の識別や利便性の向上に使われます。</p>
      <p>当サイトのレシピ検索機能は、選択内容をブラウザ内で処理するのみで、その内容をサーバーに送信したり保存したりはしていません。</p>
      <p>Cookieはブラウザの設定によって無効にできます。無効にした場合でも、当サイトの閲覧やレシピ検索は問題なくご利用いただけます。</p>
    `)}
    ${legalSection("広告について", adSection)}
    ${legalSection("アフィリエイトプログラムについて", `
      <p>当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</p>
      <p>${AMAZON_DISCLOSURE}</p>
      <p>当サイトに掲載されたリンクからAmazon.co.jpにアクセスした場合、Amazon.co.jpがCookieを使用して、購入等の成果を計測することがあります。この過程で当サイトが利用者の氏名・住所・クレジットカード情報などを取得することは一切ありません。</p>
    `)}
    ${legalSection("アクセス解析ツールについて", `
      <p>当サイトは現在、Cookieを用いたアクセス解析ツールを導入していません。</p>
      <p>サイトの検索状況の把握のためにGoogle Search Consoleを利用していますが、これは検索結果における表示回数やクリック数を集計するものであり、個人を特定する情報は含まれません。</p>
      <p>将来的にGoogle Analyticsなどのアクセス解析ツールを導入する場合は、本ポリシーを更新して明記します。</p>
    `)}
    ${legalSection("免責事項", `
      <p>当サイトのコンテンツの利用にあたっては、<a href="/disclaimer/">免責事項</a>もあわせてご確認ください。魚の調理・喫食に関する重要な注意事項を記載しています。</p>
    `)}
    ${legalSection("著作権について", `
      <p>当サイトに掲載しているレシピ・釣行記などの文章は、当サイトが作成したオリジナルコンテンツです。無断での転載・複製をお断りします。</p>
      <p>掲載している魚の写真の一部は、ウィキメディア・コモンズなどで公開されている画像を、各画像のライセンス条件に従って利用しています。</p>
      <p>当サイトの内容について権利上の問題がある場合は、<a href="/contact/">お問い合わせフォーム</a>よりご連絡ください。速やかに対応いたします。</p>
    `)}
    ${legalSection("プライバシーポリシーの変更", `
      <p>当サイトは、法令の変更やサービス内容の変更に応じて、本ポリシーを予告なく変更することがあります。変更後の内容は、当ページに掲載した時点から効力を生じるものとします。</p>
    `)}
    ${legalSection("お問い合わせ", `
      <p>本ポリシーに関するお問い合わせは、<a href="/contact/">お問い合わせフォーム</a>よりご連絡ください。</p>
      <p class="legal-meta">制定日：2026年7月28日<br>運営者：${OPERATOR_NAME}</p>
    `)}
  `;

  writeFile("privacy/index.html", layout({
    title: `プライバシーポリシー - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
  }));

  return url;
}

function buildDisclaimerPage() {
  const url = `${SITE_URL}/disclaimer/`;
  const description = `${SITE_NAME}の免責事項。魚の調理・喫食、釣行に関する注意事項と、掲載情報の取り扱いについて説明しています。`;

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; 免責事項</div>
    <div class="detail-header">
      <h1>免責事項</h1>
      <p class="step-sub">レシピをご利用になる前に、必ずお読みください</p>
    </div>
    ${legalSection("魚の調理・喫食に関する注意", `
      <p class="legal-alert">釣った魚を食べる行為には、食中毒などのリスクが伴います。以下の点は、レシピの手順以前の前提としてご確認ください。</p>
      <ul>
        <li><strong>寄生虫</strong>：サバ・イワシ・アジ・サケ科の魚などには、アニサキスをはじめとする寄生虫が付いていることがあります。生食する場合は、目視での確認に加え、中心温度70度以上での加熱、または冷凍（マイナス20度で24時間以上）による処理を行ってください。加熱・冷凍のいずれも行わない生食には、常にリスクが残ります。</li>
        <li><strong>鮮度管理</strong>：釣った魚は速やかに締めて冷却してください。特に気温の高い時期は傷みが早く、ヒスタミンによる食中毒の原因にもなります。</li>
        <li><strong>魚種の判別</strong>：フグ類をはじめ、毒を持つ魚が存在します。フグの処理には資格が必要です。魚種が確実に判別できない魚は、食べないでください。</li>
        <li><strong>アレルギー</strong>：魚介類・調味料に含まれる原材料によるアレルギーにご注意ください。</li>
        <li><strong>体調不良時</strong>：調理後に体調に異変を感じた場合は、速やかに医療機関を受診してください。</li>
      </ul>
      <p>当サイトのレシピは、標準的な鮮度・状態の魚を前提としています。実際に釣れた魚の状態の判断は、利用者ご自身の責任において行ってください。</p>
    `)}
    ${legalSection("釣行に関する注意", `
      <p><a href="/diary/">釣行記</a>は運営者個人の記録であり、同じ場所・同じ条件で同様の釣果が得られることを保証するものではありません。</p>
      <ul>
        <li>釣り場ごとのルール、遊漁券・入漁料、禁漁期間、体長制限、立入禁止区域を必ずご確認ください。</li>
        <li>ライフジャケットの着用など、安全対策を行ってください。</li>
        <li>ゴミの持ち帰りなど、釣り場のマナーを守ってください。</li>
      </ul>
      <p>釣行中に生じた事故・損害について、当サイトは一切の責任を負いません。</p>
    `)}
    ${legalSection("掲載情報について", `
      <p>当サイトは、掲載する情報について可能な限り正確を期していますが、その完全性・正確性・有用性・安全性を保証するものではありません。</p>
      <p>掲載内容は予告なく変更・削除されることがあります。当サイトの情報を利用したことにより生じたいかなる損害についても、当サイトは責任を負いかねます。</p>
    `)}
    ${legalSection("外部リンクについて", `
      <p>当サイトは、Amazon.co.jpをはじめとする外部サイトへのリンクを掲載しています。</p>
      <p>リンク先サイトで提供される情報・サービス、およびそこで発生した損害について、当サイトは責任を負いません。リンク先の利用にあたっては、各サイトの利用規約・プライバシーポリシーをご確認ください。</p>
      <p>${AMAZON_DISCLOSURE}</p>
    `)}
    ${legalSection("お問い合わせ", `
      <p>本免責事項に関するお問い合わせは、<a href="/contact/">お問い合わせフォーム</a>よりご連絡ください。</p>
      <p class="legal-meta">制定日：2026年7月28日<br>運営者：${OPERATOR_NAME}</p>
    `)}
  `;

  writeFile("disclaimer/index.html", layout({
    title: `免責事項 - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
  }));

  return url;
}

function buildContactPage() {
  const url = `${SITE_URL}/contact/`;
  const description = `${SITE_NAME}へのお問い合わせフォーム。レシピや掲載内容へのご意見、権利関係のご連絡はこちらからお願いします。`;

  const body = `
    <div class="breadcrumb"><a href="/">トップ</a> &gt; お問い合わせ</div>
    <div class="detail-header">
      <h1>お問い合わせ</h1>
      <p class="step-sub">ご意見・ご指摘・掲載内容に関するご連絡はこちらから</p>
    </div>
    <div class="detail-section">
      <div class="legal-body">
        <p>レシピの内容に関するご指摘、掲載写真や文章の権利に関するご連絡、その他のお問い合わせを受け付けています。いただいた内容は運営者本人が確認します。</p>
        <p>返信が必要な場合は、メールアドレスをお間違えのないようご入力ください。内容によっては返信までお時間をいただくこと、また返信いたしかねる場合があります。</p>
        <p>ご入力いただいた情報の取り扱いについては、<a href="/privacy/">プライバシーポリシー</a>をご確認ください。</p>
      </div>
      <form id="contact-form" class="contact-form" novalidate>
        <label class="form-label" for="cf-name">お名前 <span class="form-required">必須</span></label>
        <input class="form-input" type="text" id="cf-name" name="name" maxlength="100" required autocomplete="name">

        <label class="form-label" for="cf-email">メールアドレス <span class="form-required">必須</span></label>
        <input class="form-input" type="email" id="cf-email" name="email" maxlength="200" required autocomplete="email">

        <label class="form-label" for="cf-message">お問い合わせ内容 <span class="form-required">必須</span></label>
        <textarea class="form-input form-textarea" id="cf-message" name="message" rows="8" maxlength="2000" required></textarea>

        <div class="form-honeypot" aria-hidden="true">
          <label for="cf-website">このらんは くうはくの ままに してください</label>
          <input type="text" id="cf-website" name="website" tabindex="-1" autocomplete="off">
        </div>

        <button class="form-submit" type="submit" id="cf-submit">送信する</button>
        <p class="form-status" id="cf-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  `;

  const script = `<script>
(function () {
  var form = document.getElementById("contact-form");
  var button = document.getElementById("cf-submit");
  var status = document.getElementById("cf-status");
  var loadedAt = Date.now();

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus("お名前・メールアドレス・お問い合わせ内容をすべてご入力ください。", "error");
      return;
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      setStatus("メールアドレスの形式をご確認ください。", "error");
      return;
    }
    if (message.length < 10) {
      setStatus("お問い合わせ内容は10文字以上でご入力ください。", "error");
      return;
    }

    button.disabled = true;
    setStatus("送信しています…", "");

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        website: form.website.value,
        elapsed: Date.now() - loadedAt
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok) {
          form.reset();
          setStatus("送信しました。お問い合わせありがとうございます。", "success");
        } else {
          button.disabled = false;
          setStatus(result.data && result.data.error ? result.data.error : "送信に失敗しました。時間をおいて再度お試しください。", "error");
        }
      })
      .catch(function () {
        button.disabled = false;
        setStatus("送信に失敗しました。通信環境をご確認のうえ、再度お試しください。", "error");
      });
  });
})();
</script>`;

  writeFile("contact/index.html", layout({
    title: `お問い合わせ - ${SITE_NAME}`,
    description,
    canonical: url,
    bodyHtml: body,
    bodyScript: script,
  }));

  return url;
}

function buildSitemap(urls) {
  const entries = urls.map(u => `  <url><loc>${u}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
  writeFile("sitemap.xml", xml);
}

function buildRobotsTxt() {
  writeFile("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

function main() {
  const urls = [`${SITE_URL}/`];

  urls.push(buildRecipesIndexPage());

  urls.push(buildDiaryIndexPage());
  FISHING_LOGS.forEach(log => {
    urls.push(buildDiaryPage(log));
  });

  FISH_LIST.forEach(fish => {
    urls.push(buildFishPage(fish));
    (RECIPES[fish.name] || []).forEach(recipe => {
      urls.push(buildRecipePage(fish, recipe));
    });
  });

  urls.push(buildAboutPage());
  urls.push(buildPrivacyPage());
  urls.push(buildDisclaimerPage());
  urls.push(buildContactPage());

  buildSitemap(urls);
  buildRobotsTxt();

  console.log(`生成完了: ${urls.length}件のURL（レシピページ・魚別一覧・全件一覧・釣行記・固定ページ・トップ）`);
}

main();
