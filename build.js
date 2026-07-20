// レシピ詳細ページ・魚別インデックス・全レシピ一覧・sitemap.xml・robots.txt を静的生成するビルドスクリプト
// 実行方法: node build.js
// data.js（RECIPES等）を書き換えたら、このスクリプトを再実行して出力ファイルを更新すること

const fs = require("fs");
const path = require("path");
const { FISH_LIST, RECIPES, AMAZON_BASE, FISHING_LOGS } = require("./data.js");

const SITE_URL = "https://fishmeshi.com";
const SITE_NAME = "釣り飯ジェネレーター";
const OUT_DIR = __dirname;

function parseTimeToISO(timeStr) {
  const match = timeStr.match(/(\d+)分/);
  return match ? `PT${match[1]}M` : undefined;
}

function writeFile(relPath, content) {
  const fullPath = path.join(OUT_DIR, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
}

function layout({ title, description, canonical, bodyHtml, structuredData }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
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
      <p class="footer-note"><a href="/recipes/">レシピを全件見る（魚種別一覧）</a> ｜ <a href="/diary/">釣行記を読む</a> ｜ <a href="/">魚から探すジェネレーターに戻る</a></p>
    </div>
  </footer>
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
    .map(t => `<a class="amazon-btn" href="${AMAZON_BASE}${encodeURIComponent(t + " 料理")}" target="_blank" rel="noopener noreferrer">🛒 ${t}</a>`)
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

  buildSitemap(urls);
  buildRobotsTxt();

  console.log(`生成完了: ${urls.length}件のURL（レシピページ・魚別一覧・全件一覧・トップ）`);
}

main();
