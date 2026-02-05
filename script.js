const BACKEND_URL = "https://mf-recommender-backend-production.up.railway.app";

let mainChart = null;
let riskChart = null;

// ---------- UI SLIDERS ----------
["age", "risk", "horizon", "liq", "ret"].forEach(s => {
  document.getElementById(s).addEventListener("input", e => {
    let v = e.target.value;
    let lbl = v;
    if (s === "horizon") lbl += "Y";
    if (s === "ret") lbl += "%";
    if (["risk","liq"].includes(s)) lbl += "/10";
    document.getElementById(`d-${s}`).innerText = lbl;
  });
});

// ---------- MAIN ACTION ----------
async function generateStrategy() {
  const payload = {
    age: +age.value,
    risk_appetite: +risk.value,
    investment_duration: +horizon.value,
    liquidity_needs: +liq.value,
    expected_returns: +ret.value
  };

  document.getElementById("hero-view").style.display = "none";
  document.getElementById("results-view").classList.remove("hidden");

  // 🔵 1. Call explain-risk
  const explainRes = await fetch(`${BACKEND_URL}/explain-risk`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });

  const explainData = await explainRes.json();
  renderExplainability(explainData);

  // 🔵 2. Use RISK SCORE to drive UI logic
  const r = explainData.risk_score;

  let cluster = "Growth & Stability";
  if (r < 0.35) cluster = "Capital Preservation";
  else if (r > 0.7) cluster = "High-Alpha Aggressive";

  const funds = FUND_DATA[cluster];
  renderProjection(funds);
  renderFunds(funds);

  feather.replace();
}

// ---------- EXPLAINABILITY ----------
function renderExplainability(data) {
  document.getElementById("risk-score-val").innerText = data.risk_score.toFixed(2);

  const list = document.getElementById("explain-list");
  list.innerHTML = "";

  data.top_factors.forEach(f => {
    list.innerHTML += `
      <div class="explain-item">
        <b>${f.feature.replace("_"," ")}</b> ${
          f.effect === "increase" ? "pushes risk higher" : "reduces risk"
        }
      </div>`;
  });

  const ctx = document.getElementById("riskExplainChart").getContext("2d");
  const labels = data.top_factors.map(f => f.feature);
  const values = data.top_factors.map(f => Math.abs(f.impact));

  if (riskChart) riskChart.destroy();
  riskChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: "#2563eb",
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { display: false } }
    }
  });
}
