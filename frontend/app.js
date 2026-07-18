
import { mountMemoryRail } from "./memoryRail.js";
import { mountStartScreen } from "./startScreen.js";
import { mountWorkshopsView } from "./workshops.js";

const API_BASE = "http://127.0.0.1:8000";

let apiStatusEl, homeViewEl, viewRootEl;

// ── Helpers ────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function checkApiHealth() {
  try {
    if (apiStatusEl) apiStatusEl.textContent = "[api: checking…]";
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (apiStatusEl) {
      apiStatusEl.textContent = data.status === "ok" ? "[api: online]" : "[api: unknown]";
    }
  } catch {
    if (apiStatusEl) apiStatusEl.textContent = "[api: offline]";
  }
}

function mountView(html) {
  if (!viewRootEl || !homeViewEl) return;
  homeViewEl.style.display = "none";
  viewRootEl.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Start screen ───────────────────────────────────────────

function renderStartScreen() {
  if (!viewRootEl || !homeViewEl) return;
  homeViewEl.style.display = "none";
  viewRootEl.innerHTML = "";
  mountStartScreen({ root: viewRootEl, onSelect: navigateTo });
}

// ── Navigation ─────────────────────────────────────────────

async function navigateTo(route) {
  // Push a history entry so the browser back button works
  history.pushState({ route }, "", `#${route}`);
  await showRoute(route);
}

async function showRoute(route) {
  await checkApiHealth();

  if (route === "goals")  { await renderGoalsView(); return; }
  if (route === "logs")   { renderLogAnalyzerView(); return; }
  if (route === "labs")   { renderWorkshopsView(); return; }
  if (route === "tools")  { renderPlaceholder("Tools",     "[coming soon]"); return; }
  if (route === "about")  { renderPlaceholder("About",     "[coming soon]"); return; }
  if (route === "start" || route === "home") { renderStartScreen(); return; }

  renderPlaceholder(route, "[no page wired yet]");
}

function renderPlaceholder(title, message) {
  mountView(`
    <div class="section view">
      <h2 class="section-title">${escapeHtml(title)}</h2>
      <p class="card-desc">${escapeHtml(message)}</p>
      <div class="form-row" style="margin-top:14px;">
        <button class="btn" data-route="home">← Back to Home</button>
      </div>
    </div>
  `);
}

// ── Back button (browser / OS) ──────────────────────────────

window.addEventListener("popstate", (e) => {
  const route = e.state?.route ?? "start";
  if (route === "start" || route === "home" || !route) {
    renderStartScreen();
  } else {
    showRoute(route);
  }
});

// ── data-route click delegation ────────────────────────────

document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-route]");
  if (!el) return;
  e.preventDefault();
  const route = (el.getAttribute("data-route") || "").trim().toLowerCase();
  await navigateTo(route);
});

// ── Views ──────────────────────────────────────────────────

async function renderGoalsView() {
  mountView(`
    <div class="section view">
      <div class="section-head">
        <h2 class="section-title">Travel</h2>
        <span class="chip">[travel.log]</span>
      </div>

      <article class="card wide">
        <div class="card-top">
          <span class="tag">[memory rail]</span>
          <span class="meta">click nodes to reveal memory files</span>
        </div>

        <h3 class="card-title">Trips</h3>
        <p class="card-desc">Click a node to reveal the memory file.</p>

        <section class="memory-rail-card" style="margin-top:12px;">
          <div class="memory-rail-header">
            <div class="memory-rail-title">MEMORY RAIL</div>
            <div class="memory-rail-sub">past → future</div>
          </div>
          <div id="memoryRail" class="memory-rail"></div>
          <div id="tripReveal" class="trip-reveal"></div>
        </section>

        <div class="form-row" style="margin-top:12px;">
          <button class="btn" data-route="home">← Back to Home</button>
        </div>
      </article>
    </div>
  `);

  try {
    await mountMemoryRail({ apiBase: API_BASE, railId: "memoryRail", revealId: "tripReveal" });
  } catch (err) {
    console.error("Memory Rail failed:", err);
    const reveal = document.getElementById("tripReveal");
    if (reveal) {
      reveal.innerHTML = `<div style="padding:12px;opacity:.75">
        Rail error: ${err.message}<br/>
        <a href="http://127.0.0.1:8000/docs" target="_blank" style="color:inherit;text-decoration:underline;">/docs</a>
      </div>`;
    }
  }
}

window.renderTripPage = function renderTripPage(trip) {
  const cities = Array.isArray(trip.cities) ? trip.cities : [];
  mountView(`
    <div class="section view">
      <div class="section-head">
        <h2 class="section-title">${escapeHtml(trip.name || "Trip")}</h2>
        <span class="chip">[trip]</span>
      </div>
      <article class="card wide">
        <div class="card-top">
          <span class="tag">[memory]</span>
          <span class="meta">${escapeHtml(trip.start_date || "")}</span>
        </div>
        <h3 class="card-title">Overview</h3>
        <p class="card-desc">${escapeHtml(trip.description || "No description yet.")}</p>
        <div style="margin-top:14px;">
          <div class="subhead">Cities</div>
          ${cities.length
            ? cities.map(c => `
                <div class="card" style="margin-top:10px;">
                  <div class="card-top">
                    <span class="tag">[city]</span>
                    <span class="meta">${escapeHtml(c)}</span>
                  </div>
                  <h3 class="card-title">${escapeHtml(c)}</h3>
                  <p class="card-desc">City notes + photos go here later.</p>
                </div>`).join("")
            : `<div class="meta">No cities added yet.</div>`
          }
        </div>
        <div class="form-row" style="margin-top:14px;">
          <button class="btn" data-route="goals">← Back to Travel</button>
          <button class="btn" data-route="home">Home</button>
        </div>
      </article>
    </div>
  `);
};

function renderWorkshopsView() {
  if (!viewRootEl || !homeViewEl) return;
  homeViewEl.style.display = "none";
  viewRootEl.innerHTML = "";
  mountWorkshopsView({ root: viewRootEl, onBack: () => navigateTo("home") });
}

function renderLogAnalyzerView() {
  mountView(`
    <div class="section view">
      <div class="section-head">
        <h2 class="section-title">Log Analyzer</h2>
        <span class="chip">[lab]</span>
      </div>
      <article class="card wide">
        <div class="card-top">
          <span class="tag">[soc]</span>
          <span class="meta">sample-based • safe • explainable</span>
        </div>
        <h3 class="card-title">Analyze Sample Logs</h3>
        <p class="card-desc">
          Select a log type and generate a short investigation summary using the Python backend.
        </p>
        <div class="form-row">
          <select id="log-type" class="select"></select>
          <button id="analyze-btn" class="btn">Analyze</button>
          <button id="copy-btn" class="btn" disabled>Copy JSON</button>
          <button id="download-btn" class="btn" disabled>Download JSON</button>
        </div>
        <div class="panel">
          <div class="meta">[results]</div>
          <div id="results">Ready.</div>
        </div>
        <div class="form-row" style="margin-top:14px;">
          <button class="btn" data-route="home">← Back to Home</button>
        </div>
      </article>
    </div>
  `);
}

// ── Bootstrap ──────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  apiStatusEl = document.getElementById("api-status");
  homeViewEl  = document.getElementById("home-view");
  viewRootEl  = document.getElementById("view-root");

  if (homeViewEl) homeViewEl.style.display = "none";

  checkApiHealth();

  // Seed history so the very first back-press returns to start
  history.replaceState({ route: "start" }, "", "#start");
  renderStartScreen();
});
