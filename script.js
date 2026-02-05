// --- Helper: Natural Language Explanations ---
function humanizeExplanation(f) {
  const nameMap = {
    risk_appetite: "Your risk appetite",
    expected_returns: "Your expected returns",
    liquidity_needs: "Your liquidity needs",
    investment_duration: "Your investment duration",
    age: "Your age"
  };

  const reasonMap = {
    increase: "pushes your risk higher",
    decrease: "pulls your risk lower"
  };

  // Fallback if keys are missing
  const featureName = nameMap[f.feature] || f.feature;
  const effectText = reasonMap[f.effect] || "impacts your profile";

  return `${featureName} ${effectText}, making it one of the key drivers in your risk profile.`;
}

// --- Data Source ---
const FUND_DATA = {
  "Growth & Stability": [
    { name: "DSP Credit Risk Fund-Reg(G)", cat: "Debt", returns: [21.58, 14.47, 14.87], aum: "208 Cr", expense: "1.2%", beta: 0.18, sharpe: 0.29, insight: "Market-leading credit pick with a Quality Score of 78%." },
    { name: "ICICI Pru BSE Sensex ETF", cat: "Equity", returns: [7.18, 15.15, 12.4], aum: "23,155 Cr", expense: "0.02%", beta: 0.98, sharpe: 0.2, insight: "Passive benchmark tracking with exceptional efficiency score of 76%." },
    { name: "HSBC Credit Risk Fund-Reg(G)", cat: "Debt", returns: [20.62, 13.66, 11.25], aum: "562 Cr", expense: "1.64%", beta: 0.66, sharpe: 0.2, insight: "Consistent debt performance with superior capital appreciation." },
    { name: "Franklin India Income Plus Arbitrage Active FOF", cat: "FoFs", returns: [13.1, 15.6, 14.14], aum: "76 Cr", expense: "0.53%", beta: 0.94, sharpe: 0.42, insight: "Strategic asset allocation with a 74% quality confidence." },
    { name: "ICICI Pru Multi-Asset Fund(G)", cat: "Hybrid", returns: [12.92, 20.54, 19.34], aum: "68,000 Cr", expense: "1.38%", beta: 0.46, sharpe: 0.59, insight: "Scale stability for diversified hybrid portfolios (73% Quality)." },
    { name: "Parag Parikh Flexi Cap Fund", cat: "Equity", returns: [8.68, 21.08, 21.65], aum: "1.19L Cr", expense: "1.28%", beta: 0.57, sharpe: 0.49, insight: "Premium flexibility across caps with strong downside protection." },
    { name: "HDFC Multi-Asset Active FOF-Reg(G)", cat: "FoFs", returns: [11.46, 17.41, 16.21], aum: "4,793 Cr", expense: "1.1%", beta: 0.48, sharpe: 0.5, insight: "Active management across diverse fund categories for stability." },
    { name: "Kotak Nifty Midcap 50 ETF", cat: "Equity", returns: [10.29, 23.2, 25.36], aum: "80 Cr", expense: "0.05%", beta: 1.0, sharpe: 0.36, insight: "Focused mid-cap growth at institutional low expense ratios." }
  ],
  "Capital Preservation": [
    { name: "Bank of India Overnight Fund", cat: "Debt", returns: [6.1, 6.45, 6.51], aum: "34 Cr", expense: "0.1%", beta: 0.98, sharpe: -0.36, insight: "Maximum safety profile with a perfect 100% Quality Score." },
    { name: "Axis Overnight Fund-Reg(G)", cat: "Debt", returns: [6.02, 6.37, 6.43], aum: "8,743 Cr", expense: "0.11%", beta: 0.74, sharpe: -0.51, insight: "Highly liquid vehicle for institutional grade capital preservation." },
    { name: "UTI Overnight Fund-Reg(G)", cat: "Debt", returns: [5.97, 6.33, 6.39], aum: "6,559 Cr", expense: "0.11%", beta: 1.0, sharpe: -0.59, insight: "Consistent daily liquidity with ultra-low credit risk (99% Quality)." },
    { name: "Canara Rob Overnight Fund", cat: "Debt", returns: [5.93, 6.28, 6.35], aum: "265 Cr", expense: "0.09%", beta: 0.95, sharpe: -0.7, insight: "Optimized expense structure for preservation-focused portfolios." },
    { name: "Invesco India Overnight Fund", cat: "Debt", returns: [5.95, 6.32, 6.38], aum: "644 Cr", expense: "0.12%", beta: 0.76, sharpe: -0.61, insight: "Reliable yield stability for very short investment windows." },
    { name: "Franklin India Overnight Fund", cat: "Debt", returns: [5.98, 6.3, 6.35], aum: "486 Cr", expense: "0.11%", beta: 0.71, sharpe: -0.71, insight: "Tier-1 liquidity asset with consistent performance benchmarks." },
    { name: "Nippon India Overnight Fund", cat: "Debt", returns: [5.97, 6.31, 6.37], aum: "6,760 Cr", expense: "0.16%", beta: 1.0, sharpe: -0.63, insight: "High-volume overnight desk managing stability for large portfolios." },
    { name: "Baroda BNP Paribas Overnight Fund", cat: "Debt", returns: [5.94, 6.3, 6.37], aum: "457 Cr", expense: "0.17%", beta: 1.01, sharpe: -0.64, insight: "Consistent daily returns with minimal price volatility (98% Quality)." }
  ],
  "High-Alpha Aggressive": [
    { name: "Mirae Asset NYSE FANG+ETF FoF", cat: "FoFs", returns: [81.73, 67.49, 71.07], aum: "2,347 Cr", expense: "0.45%", beta: 0.47, sharpe: 0.49, insight: "Explosive growth potential in global tech (97% Quality Score)." },
    { name: "Mirae Asset NYSE FANG+ ETF", cat: "Equity", returns: [49.31, 53.07, 60.85], aum: "3,492 Cr", expense: "0.65%", beta: 0.88, sharpe: 0.47, insight: "Direct exposure to top 10 global giants with high alpha." },
    { name: "HDFC Silver ETF FoF-Reg(G)", cat: "Gold/Commodity", returns: [50.51, 40.55, 33.05], aum: "1,273 Cr", expense: "0.6%", beta: 0.04, sharpe: 0.35, insight: "Precious metal alpha for inflation hedging and diversification." },
    { name: "DSP World Gold Mining FoF", cat: "FoFs", returns: [80.51, 61.6, 44.46], aum: "1,678 Cr", expense: "2.34%", beta: 0.25, sharpe: 0.38, insight: "Commodity mining exposure for non-correlated portfolio returns." },
    { name: "Quantum Gold Saving Fund", cat: "Gold", returns: [51.16, 38.59, 31.91], aum: "299 Cr", expense: "0.45%", beta: 0.38, sharpe: 0.49, insight: "Efficient gold tracking with high-tier liquidity (79% Quality)." },
    { name: "Mirae Asset S&P 500 Top 50 FoF", cat: "FoFs", returns: [55.57, 48.07, 40.6], aum: "752 Cr", expense: "0.49%", beta: 0.3, sharpe: 0.4, insight: "Strategic US Large Cap allocation for global alpha capture." },
    { name: "Kotak Gold Fund(G)", cat: "Gold", returns: [50.53, 37.85, 31.5], aum: "4,153 Cr", expense: "0.5%", beta: 0.36, sharpe: 0.48, insight: "Stable commodity benchmark with consistent long-term growth." },
    { name: "Kotak Gold ETF", cat: "Gold", returns: [51.5, 38.7, 32.2], aum: "9,736 Cr", expense: "0.55%", beta: 0.48, sharpe: 0.49, insight: "High-volume gold asset optimized for active aggressive strategies." }
  ]
};

// --- UI Interaction ---
const sliders = ["age", "risk", "horizon", "liq", "ret"];
sliders.forEach(s => {
  const el = document.getElementById(s);
  if (el) {
    el.addEventListener('input', (e) => {
      let val = e.target.value;
      let lbl = val;
      if (s === 'horizon') lbl += 'Y';
      if (s === 'ret') lbl += '%';
      if (['risk', 'liq'].includes(s)) lbl += '/10';
      document.getElementById(`d-${s}`).innerText = lbl;
    });
  }
});

let mainChart = null;
let riskChart = null;

function generateStrategy() {
  const risk = parseInt(document.getElementById('risk').value) || 5;
  const ret = parseInt(document.getElementById('ret').value) || 12;

  let cluster = "Growth & Stability";
  if (risk <= 4) cluster = "Capital Preservation";
  else if (risk >= 8 || ret > 20) cluster = "High-Alpha Aggressive";

  // Switch View
  document.getElementById('hero-view').style.display = 'none';
  document.getElementById('results-view').classList.remove('hidden');
  document.getElementById('strategy-name').innerText = cluster;

  const funds = FUND_DATA[cluster];
  renderProjection(funds);
  renderFunds(funds);
  
  if (typeof feather !== 'undefined') feather.replace();

  // Scroll on Mobile
  if (window.innerWidth <= 1024) {
    document.getElementById('results-view').scrollIntoView({ behavior: 'smooth' });
  }

  // --- Call Explainability API ---
  fetch("https://mf-recommender-backend-production.up.railway.app/explain-risk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      age: +document.getElementById("age").value,
      risk_appetite: +document.getElementById("risk").value,
      investment_duration: +document.getElementById("horizon").value,
      liquidity_needs: +document.getElementById("liq").value,
      expected_returns: +document.getElementById("ret").value
    })
  })
  .then(res => {
      if (!res.ok) throw new Error("API Response not ok");
      return res.json();
  })
  .then(data => renderExplainability(data))
  .catch(err => {
      console.error("Explainability API failed:", err);
      // Fallback message if API fails
      document.getElementById("explain-list").innerHTML = "<div class='explain-item'>Could not fetch explanation details.</div>";
  });
}

function renderExplainability(data) {
  // Safe check
  const scoreEl = document.getElementById("risk-score-val");
  const listEl = document.getElementById("explain-list");
  const chartEl = document.getElementById("riskExplainChart");

  if (!scoreEl || !listEl || !chartEl) return;

  // Score
  scoreEl.innerText = data.risk_score.toFixed(1);

  // Text explanations
  listEl.innerHTML = "";
  if (data.top_factors && data.top_factors.length > 0) {
    data.top_factors.forEach(f => {
      listEl.innerHTML += `
        <div class="explain-item">
          <b>${f.feature.replace("_", " ")}</b>: ${humanizeExplanation(f)}
        </div>
      `;
    });

    // Chart
    const ctx = chartEl.getContext("2d");
    const labels = data.top_factors.map(f => f.feature.replace("_", " "));
    const impacts = data.top_factors.map(f => Math.abs(f.impact));

    if (riskChart) riskChart.destroy();
    
    riskChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          data: impacts,
          backgroundColor: "#2563eb",
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { display: false }
        }
      }
    });
  }
}

function renderProjection(funds) {
  const avg3y = funds.reduce((a, b) => a + b.returns[2], 0) / funds.length;
  const ctx = document.getElementById('mainChart').getContext('2d');

  let vals = [100000];
  let lbls = ["Base"];
  const list = document.getElementById('yoy-list');
  list.innerHTML = '';

  for (let i = 1; i <= 5; i++) {
    const nextVal = vals[i - 1] * (1 + avg3y / 100);
    vals.push(nextVal);
    lbls.push(`Year ${i}`);
    list.innerHTML += `<div class="yoy-item"><span>Year ${i}</span><b>₹${Math.round(nextVal).toLocaleString()}</b></div>`;
  }

  if (mainChart) mainChart.destroy();
  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lbls,
      datasets: [{
        label: 'Value',
        data: vals,
        borderColor: '#2563eb',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.05)'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { ticks: { callback: v => '₹' + v / 1000 + 'k' } } }
    }
  });
}

function renderFunds(funds) {
  const grid = document.getElementById('fund-grid');
  grid.innerHTML = '';

  funds.forEach((f, i) => {
    const cId = `chart-${i}`;
    grid.innerHTML += `
      <div class="fund-card">
        <div class="f-head">
          <span class="f-cat">${f.cat}</span>
          <div class="f-name">${f.name}</div>
        </div>
        <div class="f-analytics">
          <div class="mini-chart-wrap"><canvas id="${cId}"></canvas></div>
          <div class="f-metrics">
            <div class="m-item"><label>AUM</label><div>${f.aum}</div></div>
            <div class="m-item"><label>Exp. Ratio</label><div>${f.expense}</div></div>
            <div class="m-item"><label>Beta</label><div>${f.beta}</div></div>
            <div class="m-item"><label>Sharpe</label><div>${f.sharpe}</div></div>
          </div>
        </div>
        <div class="f-insight">${f.insight}</div>
      </div>
    `;

    setTimeout(() => {
      const mCtx = document.getElementById(cId).getContext('2d');
      new Chart(mCtx, {
        type: 'bar',
        data: {
          labels: ['1Y', '2Y', '3Y'],
          datasets: [{
            data: f.returns,
            backgroundColor: ['#93c5fd', '#3b82f6', '#2563eb'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { display: false }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } }
        }
      });
    }, 50);
  });
}
