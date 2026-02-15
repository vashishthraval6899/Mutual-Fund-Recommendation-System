// --- Helper: Natural Language Explanations ---
function humanizeExplanation(f) {
  const nameMap = {
    risk_appetite: "Risk Appetite",
    expected_returns: "Expected Returns",
    liquidity_needs: "Liquidity",
    investment_duration: "Duration",
    age: "Age"
  };

  const reasonMap = {
    increase: "increases risk",
    decrease: "lowers risk"
  };

  const featureName = nameMap[f.feature] || f.feature;
  const effectText = reasonMap[f.effect] || "impacts profile";

  return `<b>${featureName}</b> ${effectText} significantly.`;
}

const FUND_DATA = {
  "Growth & Stability": [
    { name: "DSP Credit Risk Fund-Reg(G)", cat: "Debt", returns: [21.58, 14.47, 14.87], aum: "208 Cr", expense: "1.2%", beta: 0.18, sharpe: 0.29, insight: "Market-leading credit pick with a Quality Score of 78%." },
    { name: "ICICI Pru BSE Sensex ETF", cat: "Equity", returns: [7.18, 15.15, 12.4], aum: "23,155 Cr", expense: "0.02%", beta: 0.98, sharpe: 0.2, insight: "Passive benchmark tracking with exceptional efficiency score of 76%." },
    { name: "HSBC Credit Risk Fund-Reg(G)", cat: "Debt", returns: [20.62, 13.66, 11.25], aum: "562 Cr", expense: "1.64%", beta: 0.66, sharpe: 0.2, insight: "Consistent debt performance with superior capital appreciation." },
    { name: "ICICI Pru Multi-Asset Fund(G)", cat: "Hybrid", returns: [12.92, 20.54, 19.34], aum: "68,000 Cr", expense: "1.38%", beta: 0.46, sharpe: 0.59, insight: "Scale stability for diversified hybrid portfolios (73% Quality)." },
    { name: "Parag Parikh Flexi Cap Fund", cat: "Equity", returns: [8.68, 21.08, 21.65], aum: "1.19L Cr", expense: "1.28%", beta: 0.57, sharpe: 0.49, insight: "Premium flexibility across caps with strong downside protection." }
  ],
  "Capital Preservation": [
    { name: "Bank of India Overnight Fund", cat: "Debt", returns: [6.1, 6.45, 6.51], aum: "34 Cr", expense: "0.1%", beta: 0.98, sharpe: -0.36, insight: "Maximum safety profile with a perfect 100% Quality Score." },
    { name: "Axis Overnight Fund-Reg(G)", cat: "Debt", returns: [6.02, 6.37, 6.43], aum: "8,743 Cr", expense: "0.11%", beta: 0.74, sharpe: -0.51, insight: "Highly liquid vehicle for institutional grade capital preservation." },
    { name: "UTI Overnight Fund-Reg(G)", cat: "Debt", returns: [5.97, 6.33, 6.39], aum: "6,559 Cr", expense: "0.11%", beta: 1.0, sharpe: -0.59, insight: "Consistent daily liquidity with ultra-low credit risk (99% Quality)." },
    { name: "Canara Rob Overnight Fund", cat: "Debt", returns: [5.93, 6.28, 6.35], aum: "265 Cr", expense: "0.09%", beta: 0.95, sharpe: -0.7, insight: "Optimized expense structure for preservation-focused portfolios." }
  ],
  "High-Alpha Aggressive": [
    { name: "Mirae Asset NYSE FANG+ETF FoF", cat: "FoFs", returns: [81.73, 67.49, 71.07], aum: "2,347 Cr", expense: "0.45%", beta: 0.47, sharpe: 0.49, insight: "Explosive growth potential in global tech (97% Quality Score)." },
    { name: "Mirae Asset NYSE FANG+ ETF", cat: "Equity", returns: [49.31, 53.07, 60.85], aum: "3,492 Cr", expense: "0.65%", beta: 0.88, sharpe: 0.47, insight: "Direct exposure to top 10 global giants with high alpha." },
    { name: "HDFC Silver ETF FoF-Reg(G)", cat: "Gold/Commodity", returns: [50.51, 40.55, 33.05], aum: "1,273 Cr", expense: "0.6%", beta: 0.04, sharpe: 0.35, insight: "Precious metal alpha for inflation hedging and diversification." },
    { name: "DSP World Gold Mining FoF", cat: "FoFs", returns: [80.51, 61.6, 44.46], aum: "1,678 Cr", expense: "2.34%", beta: 0.25, sharpe: 0.38, insight: "Commodity mining exposure for non-correlated portfolio returns." }
  ]
};

// UI Handling
const sliders = ["age", "risk", "horizon", "liq", "ret"];
sliders.forEach(s => {
  const el = document.getElementById(s);
  if(el) {
    el.addEventListener('input', (e) => {
      let val = e.target.value;
      let lbl = val;
      if(s === 'horizon') lbl += 'Y';
      if(s === 'ret') lbl += '%';
      if(['risk', 'liq'].includes(s)) lbl += '/10';
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

  document.getElementById('hero-view').style.display = 'none';
  document.getElementById('results-view').classList.remove('hidden');
  document.getElementById('strategy-name').innerText = cluster;

  const funds = FUND_DATA[cluster] || FUND_DATA["Growth & Stability"];
  renderProjection(funds);
  renderFunds(funds);
  
  if(typeof feather !== 'undefined') feather.replace();

  if(window.innerWidth <= 1024) {
    document.getElementById('results-view').scrollIntoView({ behavior: 'smooth' });
  }

  // API Call
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
  .then(res => res.json())
  .then(data => renderExplainability(data))
  .catch(err => {
    console.error(err);
    document.getElementById("explain-list").innerHTML = "<div class='explain-item'>AI explanation unavailable.</div>";
  });
}

function renderExplainability(data) {
  const scoreEl = document.getElementById("risk-score-val");
  const listEl = document.getElementById("explain-list");
  const chartEl = document.getElementById("riskExplainChart");

  if (!scoreEl || !listEl || !chartEl) return;

  scoreEl.innerText = `Score: ${data.risk_score.toFixed(1)}`;

  listEl.innerHTML = "";
  if (data.top_factors) {
    data.top_factors.forEach(f => {
      listEl.innerHTML += `<div class="explain-item">${humanizeExplanation(f)}</div>`;
    });

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
          borderRadius: 6,
          barThickness: 20
        }]
      },
      options: {
        indexAxis: 'y', // Horizontal bar for better readability in small space
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { grid: { display: false }, ticks: { font: { size: 10 } } }
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

  for(let i=1; i<=5; i++) {
    const nextVal = vals[i-1] * (1 + avg3y/100);
    vals.push(nextVal);
    lbls.push(`Year ${i}`);
    list.innerHTML += `<div class="yoy-item"><span>Year ${i}</span><b>₹${Math.round(nextVal).toLocaleString()}</b></div>`;
  }

  if(mainChart) mainChart.destroy();
  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lbls,
      datasets: [{
        data: vals,
        borderColor: '#2563eb',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.05)',
        pointRadius: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: {display: false} },
      scales: { x: {grid:{display:false}}, y: {ticks:{callback:v => '₹' + v/1000 + 'k'}}}
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
            <div class="m-item"><label>Exp</label><div>${f.expense}</div></div>
            <div class="m-item"><label>Beta</label><div>${f.beta}</div></div>
            <div class="m-item"><label>Sharpe</label><div>${f.sharpe}</div></div>
          </div>
        </div>
        <div class="f-insight">${f.insight}</div>
      </div>
    `;
    setTimeout(() => {
      new Chart(document.getElementById(cId).getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['1Y', '2Y', '3Y'],
          datasets: [{ data: f.returns, backgroundColor: ['#93c5fd', '#3b82f6', '#2563eb'], borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: {display: false} }, scales: { y: {display: false}, x: {display: false} } }
      });
    }, 50);
  });
}
