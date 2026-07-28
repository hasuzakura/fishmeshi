# fishmeshi
釣れた魚からレシピを探すジェネレーター

## レシピデータの追加・変更

すべてのレシピデータは `data.js` に集約されている（FISH_LIST / RECIPES 等）。追加・修正した後は必ず以下を実行してSEO用の静的ページを再生成してからデプロイすること。

```
node build.js
```

`recipe/`・`fish/`・`recipes/`・`diary/`・`about/`・`privacy/`・`disclaimer/`・`contact/`・`sitemap.xml`・`robots.txt` が再生成される。生成物はgit管理下に置き、コミットしてデプロイする（Vercelはビルドコマンドを持たない静的サイトのため、生成済みファイルがそのまま配信される）。

## デプロイ手順

```
node build.js
git add -A && git commit -m "..."
git push
vercel --prod --yes
```

## お問い合わせフォーム

`/contact/` のフォームは `api/contact.js`（Vercel Serverless Function）が受け、Resend の API 経由で運営者宛にメールを送る。依存パッケージはなく、Node.js のグローバル `fetch` のみを使用。

Vercel のプロジェクト設定（Environment Variables）に以下を登録すること。未設定の場合、フォームは「現在お問い合わせを受け付けられません」と表示して送信を受け付けない。

| 変数名 | 内容 |
|---|---|
| `RESEND_API_KEY` | Resend の API キー（必須） |
| `CONTACT_TO` | 通知の宛先メールアドレス（必須） |
| `CONTACT_FROM` | 送信元。省略時は `onboarding@resend.dev` |

`onboarding@resend.dev` は独自ドメインの認証なしで使える既定の送信元だが、**宛先が Resend アカウント所有者のアドレスに限定される**。運営者への通知用途ならこれで足りる。fishmeshi.com を送信元にしたい場合は Resend でドメイン認証（DNSレコード追加）を行い、`CONTACT_FROM` を設定する。

スパム対策として、ボットだけが埋める隠しフィールド（ハニーポット）、フォーム表示から3秒未満の送信の拒否、同一IPからの1分あたり3件の制限を実装している。

## Google AdSense

`data.js` の `ADSENSE_ENABLED` / `ADSENSE_CLIENT` で制御する。`ADSENSE_ENABLED` が `true` のとき、`node build.js` は以下を行う。

- 生成する全ページの `<head>` に広告タグを挿入
- `ads.txt` を生成（`google.com, pub-XXXX, DIRECT, f08c47fec0942fa0`）
- プライバシーポリシーの「広告について」を、Cookie・第三者配信の説明を含む文面に切り替え

**`index.html` だけは手書きのファイルなので、広告タグが自動反映されない。** `ADSENSE_CLIENT` を変更したときは `index.html` の `<head>` にある同じタグも手で直すこと。

publisher ID: `ca-pub-7252742932766480`（2026-07-28 申請）
