let riskChart = null;

const BACKEND_URL = "https://mf-recommender-backend-production.up.railway.app";

const sliders = ["age", "risk", "horizon", "liq", "ret"];
sliders.forEach(s => {
  document.getElementById(s).addEventListener('input', e => {
    let v = e.target.value;
    let lbl = v;
    if (s === "horizon") lbl += "Y";
    if (s === "ret") lbl += "%";
    if (["risk","liq"].includes(s)) lbl += "/10";
    document.getElementById(`d-${s}`).innerText = lbl;
  });
});

function humanize(feature, effect) {
  const map = {
    age: "Your age",
    risk_appetite: "Your risk appetite",
    investment_duration: "Your long-term investment horizon",
    liquidity_needs: "Your liquidity preference",
    expected_returns: "Your return expectations"
  };
  return `${map[feature]} ${effect === "increase"
    ? "pushes your risk higher"
    : "reduces your overall risk"}.`;
}

function renderExplainability(data) {
  document.getElementById("risk-score-val").innerText = data.risk_score.toFixed(2);

  const list = document.getElementById("explain-list");
  list.innerHTML = "";

  data.top_factors.forEach(f => {
    list.innerHTML += `
      <div class="explain-item">
        <b>${f.feature.replace("_"," ")}</b>: ${humanize(f.feature, f.effect)}
      </div>
    `;
  });

  const ctx = document.getElementById("riskExplainChart").getContext("2d");
  const labels = data.top_factors.map(f => f.feature.replace("_"," "));
  const impacts = data.top_factors.map(f => Math.abs(f.impact));

  if (riskChart) riskChart.destroy();
  riskChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: impacts,
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

async function generateStrategy() {
  const payload = {
    age: +document.getElementById("age").value,
    risk_appetite: +document.getElementById("risk").value,
    investment_duration: +document.getElementById("horizon").value,
    liquidity_needs: +document.getElementById("liq").value,
    expected_returns: +document.getElementById("ret").value
  };

  document.getElementById("hero-view").style.display = "none";
  document.getElementById("results-view").classList.remove("hidden");

  const res = await fetch(`${BACKEND_URL}/explain-risk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Explain response:", data);
  renderExplainability(data);
}
