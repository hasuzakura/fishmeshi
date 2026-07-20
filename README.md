# fishmeshi
釣れた魚からレシピを探すジェネレーター

## レシピデータの追加・変更

すべてのレシピデータは `data.js` に集約されている（FISH_LIST / RECIPES 等）。追加・修正した後は必ず以下を実行してSEO用の静的ページを再生成してからデプロイすること。

```
node build.js
```

`recipe/`・`fish/`・`recipes/`・`sitemap.xml`・`robots.txt` が再生成される。生成物はgit管理下に置き、コミットしてデプロイする（Vercelはビルドコマンドを持たない静的サイトのため、生成済みファイルがそのまま配信される）。
