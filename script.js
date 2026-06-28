const FISH_LIST = [
  { name: "アジ",   emoji: "🐟" },
  { name: "サバ",   emoji: "🐠" },
  { name: "イワシ", emoji: "🐟" },
  { name: "タイ",   emoji: "🎏" },
  { name: "スズキ", emoji: "🐡" },
  { name: "ブリ",   emoji: "🐟" },
  { name: "カサゴ", emoji: "🦐" },
  { name: "メバル", emoji: "🐠" },
  { name: "ハマチ", emoji: "🐟" },
  { name: "キス",   emoji: "🐡" },
];

const PLACES = [
  { name: "家のキッチン",  emoji: "🏠", desc: "調理設備が充実している" },
  { name: "キャンプ場",    emoji: "⛺", desc: "アウトドアで調理" },
  { name: "釣り場その場",  emoji: "🎣", desc: "釣り場で即料理" },
];

const TOOLS = [
  { name: "なんでもある",   emoji: "✅", desc: "フライパン・包丁・オーブンなど全部OK" },
  { name: "フライパン",     emoji: "🍳", desc: "フライパンと火があれば" },
  { name: "グリル・網",     emoji: "🔥", desc: "炭火・ガス火・グリルで焼く" },
  { name: "包丁まな板あり", emoji: "🔪", desc: "刺身など生食系もOK" },
];

const RECIPES = {
  "アジ": [
    { name: "アジの刺身",       places: ["家のキッチン", "釣り場その場"],              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "アジフライ",        places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "アジのなめろう",    places: ["家のキッチン", "釣り場その場", "キャンプ場"], tools: ["包丁まな板あり", "なんでもある"] },
    { name: "アジの塩焼き",      places: ["家のキッチン", "キャンプ場", "釣り場その場"], tools: ["グリル・網", "なんでもある"] },
    { name: "アジのムニエル",    places: ["家のキッチン", "キャンプ場"],                tools: ["フライパン", "なんでもある"] },
    { name: "アジの南蛮漬け",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "アジのバター醤油焼き", places: ["家のキッチン", "キャンプ場"],             tools: ["フライパン", "なんでもある"] },
    { name: "アジのたたき",      places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
  ],
  "サバ": [
    { name: "サバの味噌煮",      places: ["家のキッチン"],                              tools: ["なんでもある", "フライパン"] },
    { name: "サバの塩焼き",      places: ["家のキッチン", "キャンプ場", "釣り場その場"], tools: ["グリル・網", "なんでもある"] },
    { name: "しめサバ",          places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "サバの竜田揚げ",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "サバのみそ焼き",    places: ["家のキッチン", "キャンプ場"],                tools: ["グリル・網", "フライパン", "なんでもある"] },
    { name: "サバのアクアパッツァ", places: ["家のキッチン", "キャンプ場"],             tools: ["フライパン", "なんでもある"] },
  ],
  "イワシ": [
    { name: "イワシの蒲焼き",    places: ["家のキッチン"],                              tools: ["フライパン", "なんでもある"] },
    { name: "イワシの塩焼き",    places: ["家のキッチン", "キャンプ場", "釣り場その場"], tools: ["グリル・網", "なんでもある"] },
    { name: "イワシのつみれ汁",  places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "イワシの梅煮",      places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "イワシフライ",      places: ["家のキッチン"],                              tools: ["なんでもある"] },
  ],
  "タイ": [
    { name: "タイの刺身",        places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "タイの塩焼き",      places: ["家のキッチン", "キャンプ場"],                tools: ["グリル・網", "なんでもある"] },
    { name: "タイめし",          places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "タイのアクアパッツァ", places: ["家のキッチン", "キャンプ場"],             tools: ["フライパン", "なんでもある"] },
    { name: "タイのカルパッチョ", places: ["家のキッチン"],                             tools: ["包丁まな板あり", "なんでもある"] },
    { name: "タイの兜煮",        places: ["家のキッチン"],                              tools: ["なんでもある"] },
  ],
  "スズキ": [
    { name: "スズキのムニエル",  places: ["家のキッチン", "キャンプ場"],                tools: ["フライパン", "なんでもある"] },
    { name: "スズキの刺身",      places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "スズキのソテー",    places: ["家のキッチン", "キャンプ場"],                tools: ["フライパン", "なんでもある"] },
    { name: "スズキの塩焼き",    places: ["家のキッチン", "キャンプ場"],                tools: ["グリル・網", "なんでもある"] },
    { name: "スズキのアクアパッツァ", places: ["家のキッチン", "キャンプ場"],           tools: ["フライパン", "なんでもある"] },
    { name: "スズキのカルパッチョ", places: ["家のキッチン"],                           tools: ["包丁まな板あり", "なんでもある"] },
  ],
  "ブリ": [
    { name: "ブリの照り焼き",    places: ["家のキッチン"],                              tools: ["フライパン", "なんでもある"] },
    { name: "ブリ大根",          places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "ブリの刺身",        places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "ブリしゃぶ",        places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "ブリのカマ焼き",    places: ["家のキッチン", "キャンプ場"],                tools: ["グリル・網", "なんでもある"] },
    { name: "ブリのアラ汁",      places: ["家のキッチン"],                              tools: ["なんでもある"] },
  ],
  "カサゴ": [
    { name: "カサゴの唐揚げ",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "カサゴの煮付け",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "カサゴの塩焼き",    places: ["家のキッチン", "キャンプ場", "釣り場その場"], tools: ["グリル・網", "なんでもある"] },
    { name: "カサゴの味噌汁",    places: ["家のキッチン", "キャンプ場"],                tools: ["なんでもある", "フライパン"] },
    { name: "カサゴのアクアパッツァ", places: ["家のキッチン", "キャンプ場"],           tools: ["フライパン", "なんでもある"] },
  ],
  "メバル": [
    { name: "メバルの煮付け",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "メバルの塩焼き",    places: ["家のキッチン", "キャンプ場", "釣り場その場"], tools: ["グリル・網", "なんでもある"] },
    { name: "メバルの唐揚げ",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "メバルの刺身",      places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "メバルのアクアパッツァ", places: ["家のキッチン", "キャンプ場"],           tools: ["フライパン", "なんでもある"] },
  ],
  "ハマチ": [
    { name: "ハマチの刺身",      places: ["家のキッチン"],                              tools: ["包丁まな板あり", "なんでもある"] },
    { name: "ハマチの照り焼き",  places: ["家のキッチン"],                              tools: ["フライパン", "なんでもある"] },
    { name: "ハマチのカルパッチョ", places: ["家のキッチン"],                           tools: ["包丁まな板あり", "なんでもある"] },
    { name: "ハマチのアラ汁",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "ハマチの塩焼き",    places: ["家のキッチン", "キャンプ場"],                tools: ["グリル・網", "なんでもある"] },
  ],
  "キス": [
    { name: "キスの天ぷら",      places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "キスの塩焼き",      places: ["家のキッチン", "キャンプ場", "釣り場その場"], tools: ["グリル・網", "なんでもある"] },
    { name: "キスのフライ",      places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "キスの南蛮漬け",    places: ["家のキッチン"],                              tools: ["なんでもある"] },
    { name: "キスの干物焼き",    places: ["家のキッチン", "キャンプ場"],                tools: ["グリル・網", "なんでもある"] },
  ],
};

let selectedFish = null;
let selectedPlace = null;
let selectedTool = null;

function init() {
  renderFishGrid();
  renderPlaceGrid();
  renderToolGrid();
  document.getElementById("reset-btn").addEventListener("click", reset);
}

function renderFishGrid() {
  const grid = document.getElementById("fish-grid");
  grid.innerHTML = FISH_LIST.map(fish => `
    <button class="fish-btn" data-fish="${fish.name}" onclick="selectFish('${fish.name}')">
      <span class="fish-emoji">${fish.emoji}</span>
      <span>${fish.name}</span>
    </button>
  `).join("");
}

function renderPlaceGrid() {
  const grid = document.getElementById("place-grid");
  grid.innerHTML = PLACES.map(place => `
    <button class="option-btn" data-place="${place.name}" onclick="selectPlace('${place.name}')">
      <span class="option-emoji">${place.emoji}</span>
      <span class="option-label">
        <span>${place.name}</span>
        <span class="option-desc">${place.desc}</span>
      </span>
    </button>
  `).join("");
}

function renderToolGrid() {
  const grid = document.getElementById("tool-grid");
  grid.innerHTML = TOOLS.map(tool => `
    <button class="option-btn" data-tool="${tool.name}" onclick="selectTool('${tool.name}')">
      <span class="option-emoji">${tool.emoji}</span>
      <span class="option-label">
        <span>${tool.name}</span>
        <span class="option-desc">${tool.desc}</span>
      </span>
    </button>
  `).join("");
}

function selectFish(name) {
  selectedFish = name;
  selectedPlace = null;
  selectedTool = null;

  document.querySelectorAll(".fish-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.fish === name);
  });
  document.querySelectorAll(".option-btn[data-place]").forEach(btn => btn.classList.remove("selected"));
  document.querySelectorAll(".option-btn[data-tool]").forEach(btn => btn.classList.remove("selected"));

  document.getElementById("step-2").classList.remove("hidden");
  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-2").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectPlace(name) {
  selectedPlace = name;
  selectedTool = null;

  document.querySelectorAll(".option-btn[data-place]").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.place === name);
  });
  document.querySelectorAll(".option-btn[data-tool]").forEach(btn => btn.classList.remove("selected"));

  document.getElementById("step-3").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-3").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectTool(name) {
  selectedTool = name;

  document.querySelectorAll(".option-btn[data-tool]").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.tool === name);
  });

  showResults();
}

function showResults() {
  const recipes = RECIPES[selectedFish] || [];
  const filtered = recipes.filter(r =>
    r.places.includes(selectedPlace) && r.tools.includes(selectedTool)
  );

  const resultsSection = document.getElementById("results");
  const recipeGrid = document.getElementById("recipe-grid");

  document.getElementById("results-count").textContent = `${filtered.length}件`;
  document.getElementById("results-subtitle").textContent =
    `${selectedFish} × ${selectedPlace} × ${selectedTool}`;

  if (filtered.length === 0) {
    recipeGrid.innerHTML = `
      <div class="no-results">
        <p>この組み合わせのレシピは見つかりませんでした。<br>道具や場所を変えて試してみてください。</p>
      </div>
    `;
  } else {
    recipeGrid.innerHTML = filtered.map(recipe => {
      const url = `https://cookpad.com/search/${encodeURIComponent(recipe.name)}`;
      return `
        <a class="recipe-card" href="${url}" target="_blank" rel="noopener noreferrer">
          <div>
            <div class="recipe-name">${recipe.name}</div>
            <div class="recipe-sub">Cookpadでレシピを見る</div>
          </div>
          <span class="recipe-arrow">→</span>
        </a>
      `;
    }).join("");
  }

  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function reset() {
  selectedFish = null;
  selectedPlace = null;
  selectedTool = null;

  document.querySelectorAll(".fish-btn").forEach(btn => btn.classList.remove("selected"));
  document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));

  document.getElementById("step-2").classList.add("hidden");
  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-1").scrollIntoView({ behavior: "smooth", block: "start" });
}

init();
