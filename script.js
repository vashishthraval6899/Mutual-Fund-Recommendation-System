const FUND_DATA = {
  "Growth & Stability": [
    { name: "ICICI Pru Pharma Healthcare (G)", cat: "Equity", returns: [5.36, 29.94, 26.65], aum: "6,226 Cr", expense: "1.87%", beta: 0.76, sharpe: 0.43, insight: "Exceptional efficiency (Sharpe 0.43). Perfect for investors seeking high sector-specific growth with lower volatility than its peers." },
    { name: "Kotak Nifty Midcap 50 ETF", cat: "Equity", returns: [10.29, 23.2, 25.36], aum: "80 Cr", expense: "0.05%", beta: 1.0, sharpe: 0.36, insight: "Ultra-low cost structure. Captures mid-cap momentum effectively for long-term compounding." },
    { name: "HDFC Flexi Cap Fund (G)", cat: "Equity", returns: [10.33, 24.96, 21.89], aum: "85,559 Cr", expense: "1.37%", beta: 0.82, sharpe: 0.43, insight: "One of the largest funds. Its flexi-cap mandate allows it to shift between large and mid-caps to protect capital." },
    { name: "Parag Parikh Flexi Cap Fund", cat: "Equity", returns: [8.68, 21.08, 21.65], aum: "1.19L Cr", expense: "1.28%", beta: 0.57, sharpe: 0.49, insight: "Best-in-class risk management. The low Beta (0.57) makes it incredibly stable during market downturns." }
  ],
  "Capital Preservation": [
    { name: "Bank of India Overnight Fund", cat: "Debt", returns: [6.1, 6.45, 6.51], aum: "33 Cr", expense: "0.10%", beta: 0.98, sharpe: -0.36, insight: "Designed for absolute liquidity. Safest possible vehicle for parking emergency funds." },
    { name: "Axis Overnight Fund (G)", cat: "Debt", returns: [6.02, 6.37, 6.43], aum: "8,742 Cr", expense: "0.11%", beta: 0.74, sharpe: -0.51, insight: "High asset quality with zero credit risk. Ideal for 1-7 day investment windows." }
  ],
  "High-Alpha Aggressive": [
    { name: "Mirae Asset NYSE FANG+ ETF", cat: "Global", returns: [81.73, 67.49, 71.07], aum: "2,347 Cr", expense: "0.45%", beta: 0.47, sharpe: 0.49, insight: "Exposure to US Tech Giants. Incredible 3Y CAGR of 71%, though high global risk applies." },
    { name: "DSP World Gold Mining FoF", cat: "Gold/FoF", returns: [80.51, 61.6, 44.46], aum: "1,677 Cr", expense: "2.34%", beta: 0.25, sharpe: 0.38, insight: "Non-correlated asset. Gold mining stocks provide a hedge against inflation and equity crashes." }
  ]
};

// UI Interaction
const sliders = ["age", "risk", "horizon", "liq", "ret"];
sliders.forEach(s => {
  document.getElementById(s).addEventListener('input', (e) => {
    let val = e.target.value;
    let label = val;
    if(s === 'horizon') label += 'Y';
    if(s === 'ret') label += '%';
    if(s === 'risk' || s === 'liq') label += '/10';
    document.getElementById(`d-${s}`).innerText = label;
  });
});

let mainChart = null;

function generateStrategy() {
  const risk = parseInt(document.getElementById('risk').value);
  const ret = parseInt(document.getElementById('ret').value);
  
  let cluster = "Growth & Stability";
  if (risk <= 4) cluster = "Capital Preservation";
  else if (risk >= 8 || ret > 22) cluster = "High-Alpha Aggressive";

  document.getElementById('hero-view').style.display = 'none';
  document.getElementById('results-view').classList.remove('hidden');
  document.getElementById('strategy-name').innerText = cluster;

  const funds = FUND_DATA[cluster];
  renderProjection(funds);
  renderFunds(funds);
  feather.replace();
}

function renderProjection(funds) {
  const avg3y = funds.reduce((a, b) => a + b.returns[2], 0) / funds.length;
  const ctx = document.getElementById('mainChart').getContext('2d');
  
  let values = [100000];
  let labels = ["Start"];
  const yoyContainer = document.getElementById('yoy-list');
  yoyContainer.innerHTML = '';

  for(let i=1; i<=5; i++) {
    const val = values[i-1] * (1 + avg3y/100);
    values.push(val);
    labels.push(`Year ${i}`);
    
    yoyContainer.innerHTML += `
      <div class="yoy-item">
        <span>Year ${i}</span>
        <b>₹${Math.round(val).toLocaleString()}</b>
      </div>
    `;
  }

  if(mainChart) mainChart.destroy();
  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Growth',
        data: values,
        borderColor: '#6366f1',
        borderWidth: 4,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: {display: false} },
      scales: { x: {grid:{display:false}}, y: {ticks:{callback:v=>'₹'+v/1000+'k'}}}
    }
  });
}

function renderFunds(funds) {
  const grid = document.getElementById('fund-grid');
  grid.innerHTML = '';

  funds.forEach((f, i) => {
    const id = `f-chart-${i}`;
    grid.innerHTML += `
      <div class="fund-card">
        <div class="f-head">
          <span class="f-cat">${f.cat}</span>
          <div class="f-name">${f.name}</div>
        </div>
        <div class="f-analytics">
          <div class="mini-chart-wrap"><canvas id="${id}"></canvas></div>
          <div class="f-metrics">
            <div class="m-item"><label>AUM</label><div>${f.aum}</div></div>
            <div class="m-item"><label>Expense</label><div>${f.expense}</div></div>
            <div class="m-item"><label>Beta</label><div>${f.beta}</div></div>
            <div class="m-item"><label>Sharpe</label><div>${f.sharpe}</div></div>
          </div>
        </div>
        <div class="f-insight">
          <b>Fund Insight</b>
          ${f.insight}
        </div>
      </div>
    `;
    
    setTimeout(() => {
      const ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1Y', '2Y', '3Y'],
          datasets: [{
            data: f.returns,
            backgroundColor: ['#c7d2fe', '#818cf8', '#6366f1'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: {display: false}, title: {display: true, text: 'Returns History %', font: {size: 12}}},
          scales: { y: {display: false}, x: {grid:{display:false}} }
        }
      });
    }, 100);
  });
}
