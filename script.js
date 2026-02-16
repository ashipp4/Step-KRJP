// -------------------------------
// IJ ISO Step Page (JA/KR + Tabs)
// - Safe DOM updates (no crash if elements are removed)
// - Keeps: language toggle, timeline (0~12), per-card tabs (rule/sales), search, dark theme
// -------------------------------

const UI = {
  lang: "ja", // "ja" | "ko"
  query: "",
  tabByStep: new Map(), // stepId -> "rule" | "sales"
};

// -------------------------------
// UI Text (Edit here)
// ※ heroNote is kept but page won't crash even if #heroNote is removed from HTML.
//   If you want to remove the "使い方" guide completely, set heroNote: "" (already "")
// -------------------------------
const TEXT = {
  ja: {
    title: "IJ 商品化プロセス（ISO Step）",
    sub: "規定と営業視点を一画面で切替できる学習・参照用ページ",
    heroH1: "全体Processを把握、ステップごとのやることを確認。",
    heroP:
      "各ステップで 規定 と 営業視点 を切替し、次ゲートに進むために必要な依頼・受領物を整理できます。※最終判断は原本PDF・関係部門の指示に従ってください。",
    heroNote: "", // ←「使い方」案内を消したいので空
    tlTitle: "ISO Step タイムライン",
    tlHint: "クリックすると該当ステップへ移動します。",
    stepsTitle: "ステップ一覧",
    footer:
      "※本ページは学習・参照用。最終判断は原本PDF・関係部門の指示に従ってください。",
    tabRule: "規定",
    tabSales: "営業視点",
    secPurpose: "目的/位置づけ",
    secMust: "必須対応（規定ベース）",
    secGate: "ゲート/次へ進む条件（規定）",
    secSales: "営業アクション",
    secDev: "開発へ依頼・受領物",
    secQa: "品質へ依頼・受領物",
    secNext: "次Gate条件（営業視点）",
    chipStep: "Step",
    dash: "—",
  },
  ko: {
    title: "IJ 상품화 프로세스(ISO Step)",
    sub: "규정과 영업 시점을 한 화면에서 전환하는 학습/참고용 페이지",
    heroH1: "전체 흐름을 잡고, 단계별 ‘할 일’을 헷갈리지 않게.",
    heroP:
      "각 단계에서 ‘규정’과 ‘영업 시점’을 전환하며 다음 게이트로 가기 위해 필요한 요청/수령물을 한눈에 정리합니다. ※최종 판단은 원문 PDF 및 관계 부서 지시에 따르세요.",
    heroNote: "", // ← 사용법 박스 제거(빈 문자열)
    tlTitle: "ISO Step 타임라인",
    tlHint: "클릭하면 해당 단계로 이동합니다.",
    stepsTitle: "단계 목록",
    footer:
      "※본 페이지는 학습/참고용 정리본입니다. 최종 판단은 원문 PDF 및 관계 부서 지시에 따르세요.",
    tabRule: "규정",
    tabSales: "영업 시점",
    secPurpose: "목적/포지션",
    secMust: "필수 대응(규정 기반)",
    secGate: "게이트/다음 단계 조건(규정)",
    secSales: "영업 액션",
    secDev: "개발 요청·수령물",
    secQa: "품질 요청·수령물",
    secNext: "다음 Gate 조건(영업 시점)",
    chipStep: "Step",
    dash: "—",
  },
};

// -------------------------------
// Data (Edit here)
// ※ You already have STEPS in your file. Paste your STEPS array here 그대로.
// -------------------------------
const STEPS = [
  // ✅ 여기에 네가 갖고 있는 STEPS 전체를 그대로 붙여넣어.
  // (너가 보낸 s0~s12 데이터 그대로 OK)
];

// -------------------------------
// DOM helpers
// -------------------------------
const $ = (sel) => document.querySelector(sel);

const setText = (sel, val) => {
  const el = $(sel);
  if (!el) return;
  el.textContent = val ?? "";
};

const setHTML = (sel, html) => {
  const el = $(sel);
  if (!el) return;
  el.innerHTML = html ?? "";
};

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));

// -------------------------------
// Render
// -------------------------------
function applyUIText() {
  const t = TEXT[UI.lang];
  document.documentElement.lang = UI.lang === "ja" ? "ja" : "ko";

  setText("#uiTitle", t.title);
  setText("#uiSub", t.sub);
  setText("#heroH1", t.heroH1);
  setText("#heroP", t.heroP);

  // ✅ #heroNote 요소를 HTML에서 삭제해도 페이지가 안 깨짐
  // ✅ heroNote 문자열이 빈 값이면, 요소가 있더라도 내용은 비워짐
  setText("#heroNote", t.heroNote);

  setText("#tlTitle", t.tlTitle);
  setText("#tlHint", t.tlHint);
  setText("#stepsTitle", t.stepsTitle);
  setText("#footerText", t.footer);

  setText("#langLabel", UI.lang === "ja" ? "日本語" : "한국어");
  setText("#langAlt", UI.lang === "ja" ? "한국어" : "日本語");
}

function buildTimeline() {
  const t = TEXT[UI.lang];
  const wrap = $("#timelineChips");
  if (!wrap) return;

  wrap.innerHTML = "";

  STEPS.forEach((s, idx) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.dataset.to = s.id;

    chip.innerHTML =
      `${escapeHtml(t.chipStep)} ${idx} · ${escapeHtml(s.short?.[UI.lang])}` +
      `<small>${escapeHtml(s.title?.[UI.lang])}</small>`;

    wrap.appendChild(chip);
  });
}

function kvBlock(title, items) {
  const t = TEXT[UI.lang];
  const arr = Array.isArray(items) ? items : [];
  const ul = arr.length
    ? `<ul>${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
    : `<ul><li class="muted">${escapeHtml(t.dash)}</li></ul>`;

  return `<div class="kv"><h4>${escapeHtml(title)}</h4>${ul}</div>`;
}

function renderStepCard(step, idx) {
  const t = TEXT[UI.lang];
  const activeTab = UI.tabByStep.get(step.id) || "rule";

  const ruleHTML =
    kvBlock(t.secPurpose, step.rule?.purpose?.[UI.lang]) +
    kvBlock(t.secMust, step.rule?.must?.[UI.lang]) +
    kvBlock(t.secGate, step.rule?.gate?.[UI.lang]);

  const salesHTML =
    kvBlock(t.secSales, step.sales?.salesActions?.[UI.lang]) +
    kvBlock(t.secDev, step.sales?.devReq?.[UI.lang]) +
    kvBlock(t.secQa, step.sales?.qaReq?.[UI.lang]) +
    kvBlock(t.secNext, step.sales?.nextGate?.[UI.lang]);

  const contentHTML = activeTab === "rule" ? ruleHTML : salesHTML;

  return `
    <article class="card step-card" id="${escapeHtml(step.id)}" data-step="${escapeHtml(step.id)}">
      <div class="step-head">
        <div>
          <div class="step-title">${escapeHtml(t.chipStep)} ${idx} · ${escapeHtml(step.title?.[UI.lang])}</div>
          <div class="step-meta">${escapeHtml(step.meta?.[UI.lang])}</div>
        </div>
        <div class="step-actions">
          <span class="pilltag">${escapeHtml(step.short?.[UI.lang])}</span>
        </div>
      </div>

      <div class="tabs" role="tablist" aria-label="view tabs">
        <button class="tab ${activeTab === "rule" ? "active" : ""}" data-tab="rule" type="button">${escapeHtml(t.tabRule)}</button>
        <button class="tab ${activeTab === "sales" ? "active" : ""}" data-tab="sales" type="button">${escapeHtml(t.tabSales)}</button>
      </div>

      <div class="content" data-content>
        ${contentHTML}
      </div>
    </article>
  `;
}

function matchesQuery(step, q) {
  if (!q) return true;

  const blob = [
    step.short?.ja, step.short?.ko,
    step.title?.ja, step.title?.ko,
    step.meta?.ja, step.meta?.ko,

    ...(step.rule?.purpose?.ja || []), ...(step.rule?.purpose?.ko || []),
    ...(step.rule?.must?.ja || []), ...(step.rule?.must?.ko || []),
    ...(step.rule?.gate?.ja || []), ...(step.rule?.gate?.ko || []),

    ...(step.sales?.salesActions?.ja || []), ...(step.sales?.salesActions?.ko || []),
    ...(step.sales?.devReq?.ja || []), ...(step.sales?.devReq?.ko || []),
    ...(step.sales?.qaReq?.ja || []), ...(step.sales?.qaReq?.ko || []),
    ...(step.sales?.nextGate?.ja || []), ...(step.sales?.nextGate?.ko || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return blob.includes(q);
}

function renderSteps() {
  const wrap = $("#stepsWrap");
  if (!wrap) return;

  const q = (UI.query || "").trim().toLowerCase();

  const filtered = STEPS
    .filter((s) => matchesQuery(s, q))
    .map((s, idx) => renderStepCard(s, idx))
    .join("");

  wrap.innerHTML = filtered;
}

function rerenderAll() {
  applyUIText();
  buildTimeline();
  renderSteps();
}

// -------------------------------
// Events (event delegation)
// -------------------------------
function onClick(e) {
  // Timeline chip click
  const chip = e.target.closest(".chip");
  if (chip?.dataset?.to) {
    const id = chip.dataset.to;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Tab click
  const tab = e.target.closest(".tab");
  if (tab) {
    const card = tab.closest(".step-card");
    const stepId = card?.dataset?.step;
    const to = tab.dataset.tab; // rule | sales
    if (!stepId || (to !== "rule" && to !== "sales")) return;

    UI.tabByStep.set(stepId, to);
    renderSteps();
    return;
  }

  // Language toggle
  const langBtn = e.target.closest("#langBtn");
  if (langBtn) {
    UI.lang = UI.lang === "ja" ? "ko" : "ja";
    rerenderAll();
  }
}

// Debounce search to reduce lag
let searchTimer = null;
function onInput(e) {
  if (e.target?.id === "searchInput") {
    const val = e.target.value || "";
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      UI.query = val;
      renderSteps();
    }, 180);
  }
}

// -------------------------------
// Init
// -------------------------------
document.addEventListener("click", onClick);
document.addEventListener("input", onInput);

rerenderAll();
