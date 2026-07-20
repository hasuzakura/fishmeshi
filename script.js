// FISH_LIST / PLACES / TOOLS / SEASONINGS_LIST / AMAZON_BASE / RECIPES は data.js で定義（index.htmlでdata.js→script.jsの順に読み込み）

let selectedFish = null;
let selectedPlace = null;
let selectedTool = null;
let selectedSeasonings = new Set();

function init() {
  renderFishGrid();
  renderPlaceGrid();
  renderToolGrid();
  renderSeasoningGrid();
  document.getElementById("reset-btn").addEventListener("click", reset);
}

function renderFishGrid() {
  document.getElementById("fish-grid").innerHTML = FISH_LIST.map(f => `
    <button class="fish-btn" data-fish="${f.name}" onclick="selectFish('${f.name}')"
      style="background-image:url('${f.photo}')">
      <span class="fish-name">${f.name}</span>
    </button>
  `).join("");
}

function renderPlaceGrid() {
  document.getElementById("place-grid").innerHTML = PLACES.map(p => `
    <button class="place-btn" data-place="${p.name}" onclick="selectPlace('${p.name}')"
      style="background-image:url('${p.photo}')">
      <span class="place-name">${p.name}</span>
      <span class="place-desc">${p.desc}</span>
    </button>
  `).join("");
}

function renderToolGrid() {
  document.getElementById("tool-grid").innerHTML = TOOLS.map(t => `
    <button class="option-btn" data-tool="${t.name}" onclick="selectTool('${t.name}')">
      <img class="tool-photo" src="${t.photo}" alt="${t.name}">
      <span class="option-label">
        <span>${t.name}</span>
        <span class="option-desc">${t.desc}</span>
      </span>
    </button>
  `).join("");
}

function renderSeasoningGrid() {
  document.getElementById("seasoning-grid").innerHTML = SEASONINGS_LIST.map(s => `
    <button class="seasoning-btn" data-seasoning="${s.name}" onclick="toggleSeasoning('${s.name}')">
      <span>${s.name}</span>
    </button>
  `).join("");
}

function selectFish(name) {
  selectedFish = name;
  selectedPlace = null;
  selectedTool = null;
  selectedSeasonings.clear();

  document.querySelectorAll(".fish-btn").forEach(b => b.classList.toggle("selected", b.dataset.fish === name));
  document.querySelectorAll(".place-btn").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll(".option-btn[data-tool]").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll(".seasoning-btn").forEach(b => b.classList.remove("selected"));

  document.getElementById("step-2").classList.remove("hidden");
  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("step-4").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-2").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectPlace(name) {
  selectedPlace = name;
  selectedTool = null;

  document.querySelectorAll(".place-btn").forEach(b => b.classList.toggle("selected", b.dataset.place === name));
  document.querySelectorAll(".option-btn[data-tool]").forEach(b => b.classList.remove("selected"));

  document.getElementById("step-3").classList.remove("hidden");
  document.getElementById("step-4").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-3").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectTool(name) {
  selectedTool = name;

  document.querySelectorAll(".option-btn[data-tool]").forEach(b => b.classList.toggle("selected", b.dataset.tool === name));

  document.getElementById("step-4").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("step-4").scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleSeasoning(name) {
  if (selectedSeasonings.has(name)) {
    selectedSeasonings.delete(name);
  } else {
    selectedSeasonings.add(name);
  }
  document.querySelectorAll(".seasoning-btn").forEach(b => {
    b.classList.toggle("selected", selectedSeasonings.has(b.dataset.seasoning));
  });
}

function selectAllSeasonings() {
  SEASONINGS_LIST.forEach(s => selectedSeasonings.add(s.name));
  document.querySelectorAll(".seasoning-btn").forEach(b => b.classList.add("selected"));
}

function clearSeasonings() {
  selectedSeasonings.clear();
  document.querySelectorAll(".seasoning-btn").forEach(b => b.classList.remove("selected"));
}

function showResults() {
  const recipes = (RECIPES[selectedFish] || []).filter(r =>
    r.places.includes(selectedPlace) && r.tools.includes(selectedTool)
  );

  const canCook = recipes.filter(r => r.seasonings.every(s => selectedSeasonings.has(s)));
  const almost  = recipes.filter(r => !r.seasonings.every(s => selectedSeasonings.has(s)));

  document.getElementById("results-subtitle").textContent =
    `${selectedFish} × ${selectedPlace} × ${selectedTool}`;

  // 今すぐ作れる
  const canCookSection = document.getElementById("can-cook-section");
  if (canCook.length > 0) {
    document.getElementById("can-cook-count").textContent = `${canCook.length}件`;
    document.getElementById("can-cook-list").innerHTML = canCook.map(r => buildRecipeCard(r)).join("");
    canCookSection.classList.remove("hidden");
  } else {
    canCookSection.classList.add("hidden");
  }

  // あと少しで作れる
  const almostSection = document.getElementById("almost-section");
  if (almost.length > 0) {
    document.getElementById("almost-count").textContent = `${almost.length}件`;
    document.getElementById("almost-list").innerHTML = almost.map(r => buildAlmostCard(r)).join("");
    almostSection.classList.remove("hidden");
  } else {
    almostSection.classList.add("hidden");
  }

  // 結果なし
  const noResults = document.getElementById("no-results");
  noResults.classList.toggle("hidden", canCook.length + almost.length > 0);

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildRecipeCard(recipe) {
  const id = recipe.name.replace(/\s/g, "_");
  const fish = FISH_LIST.find(f => f.name === selectedFish);
  const permalink = fish ? `/recipe/${fish.slug}-${recipe.slug}/` : null;
  return `
    <div class="recipe-card" id="card-${id}">
      <div class="recipe-card-header" onclick="toggleCard('${id}')">
        <div>
          <div class="recipe-title">${recipe.name}</div>
          <div class="recipe-meta">${recipe.servings}｜調理時間 ${recipe.time}</div>
        </div>
        <span class="toggle-icon">▼</span>
      </div>
      <div class="recipe-body">
        <div class="recipe-section">
          <h4>材料</h4>
          <ul class="ingredients-list">
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
        <div class="recipe-section">
          <h4>作り方</h4>
          <ol class="steps-list">
            ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
          </ol>
        </div>
        ${permalink ? `<div class="recipe-section"><a class="permalink" href="${permalink}">このレシピの単独ページを見る →</a></div>` : ""}
      </div>
    </div>
  `;
}

function buildAlmostCard(recipe) {
  const missing = recipe.seasonings.filter(s => !selectedSeasonings.has(s));
  const amazonLinks = missing.map(s =>
    `<a class="amazon-btn" href="${AMAZON_BASE}${encodeURIComponent(s + " 料理")}" target="_blank" rel="noopener noreferrer">🛒 ${s}</a>`
  ).join("");

  return `
    <div class="almost-card">
      <div class="almost-title">${recipe.name}</div>
      <div class="missing-label">足りない調味料：</div>
      <div class="amazon-links">${amazonLinks}</div>
    </div>
  `;
}

function toggleCard(id) {
  const card = document.getElementById("card-" + id);
  card.classList.toggle("open");
}

function reset() {
  selectedFish = null;
  selectedPlace = null;
  selectedTool = null;
  selectedSeasonings.clear();

  document.querySelectorAll(".fish-btn, .option-btn, .place-btn, .seasoning-btn").forEach(b => b.classList.remove("selected"));
  ["step-2", "step-3", "step-4", "results"].forEach(id => document.getElementById(id).classList.add("hidden"));

  document.getElementById("step-1").scrollIntoView({ behavior: "smooth", block: "start" });
}

init();
