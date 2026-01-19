const FUND_DATA = {
  "Growth & Stability": [
    { name: "DSP Credit Risk Fund-Reg(G)", cat: "Debt", returns: [21.58, 14.47, 14.87], aum: "208 Cr", expense: "1.2%", beta: 0.18, sharpe: 0.29, insight: "Market-leading Debt pick with a Quant Quality Score of 78%." },
    { name: "ICICI Pru BSE Sensex ETF", cat: "Equity", returns: [7.18, 15.15, 12.4], aum: "23,155 Cr", expense: "0.02%", beta: 0.98, sharpe: 0.2, insight: "Top-tier Equity benchmark with a 76% AI confidence score." },
    { name: "HSBC Credit Risk Fund-Reg(G)", cat: "Debt", returns: [20.62, 13.66, 11.25], aum: "562 Cr", expense: "1.64%", beta: 0.66, sharpe: 0.2, insight: "Strong risk-adjusted performance in the credit debt space." },
    { name: "Franklin India Income Plus Arbitrage Active FoF", cat: "FoFs", returns: [13.1, 15.6, 14.14], aum: "76 Cr", expense: "0.53%", beta: 0.94, sharpe: 0.42, insight: "Hybrid arbitrage strategy for tax-efficient low volatility returns." },
    { name: "ICICI Pru Multi-Asset Fund(G)", cat: "Hybrid", returns: [12.92, 20.54, 19.34], aum: "68,000 Cr", expense: "1.38%", beta: 0.46, sharpe: 0.59, insight: "Perfect multi-asset diversification with massive scale stability." },
    { name: "Parag Parikh Flexi Cap Fund", cat: "Equity", returns: [8.68, 21.08, 21.65], aum: "119,723 Cr", expense: "1.28%", beta: 0.57, sharpe: 0.49, insight: "Conservative equity approach with consistent alpha generation." }
  ],
  "Capital Preservation": [
    { name: "Bank of India Overnight Fund", cat: "Debt", returns: [6.1, 6.45, 6.51], aum: "34 Cr", expense: "0.1%", beta: 0.98, sharpe: -0.36, insight: "Pure liquidity management with a perfect 100% Quality Score." },
    { name: "Axis Overnight Fund-Reg(G)", cat: "Debt", returns: [6.02, 6.37, 6.43], aum: "8,743 Cr", expense: "0.11%", beta: 0.74, sharpe: -0.51, insight: "Large-scale institutional grade overnight liquidity fund." },
    { name: "UTI Overnight Fund-Reg(G)", cat: "Debt", returns: [5.97, 6.33, 6.39], aum: "6,559 Cr", expense: "0.11%", beta: 1.0, sharpe: -0.59, insight: "Reliable stability and capital protection for short windows." },
    { name: "Canara Rob Overnight Fund", cat: "Debt", returns: [5.93, 6.28, 6.35], aum: "265 Cr", expense: "0.09%", beta: 0.95, sharpe: -0.7, insight: "Optimized expense ratio for maximum preservation of capital." },
    { name: "Invesco India Overnight Fund", cat: "Debt", returns: [5.95, 6.32, 6.38], aum: "644 Cr", expense: "0.12%", beta: 0.76, sharpe: -0.61, insight: "Consistently low volatility profile across all market conditions." },
    { name: "Franklin India Overnight Fund", cat: "Debt", returns: [5.98, 6.30, 6.35], aum: "486 Cr", expense: "0.11%", beta: 0.71, sharpe: -0.71, insight: "Institutional stability for high-liquidity risk profiles." }
  ],
  "High-Alpha Aggressive": [
    { name: "Mirae Asset NYSE FANG+ETF FoF", cat: "FoFs", returns: [81.73, 67.49, 71.07], aum: "2,347 Cr", expense: "0.45%", beta: 0.47, sharpe: 0.49, insight: "Hyper-growth tech exposure with a massive 97% Alpha Score." },
    { name: "Mirae Asset NYSE FANG+ ETF", cat: "Equity", returns: [49.31, 53.07, 60.85], aum: "3,492 Cr", expense: "0.65%", beta: 0.88, sharpe: 0.47, insight: "Direct tech benchmark with verified 3-year performance peaks." },
    { name: "HDFC Silver ETF FoF-Reg(G)", cat: "Gold/Commodity", returns: [50.51, 40.55, 33.05], aum: "1,273 Cr", expense: "0.6%", beta: 0.04, sharpe: 0.35, insight: "Commodity hedge with superior price correlation and low beta." },
    { name: "DSP World Gold Mining FoF", cat: "FoFs", returns: [80.51, 61.6, 44.46], aum: "1,678 Cr", expense: "2.34%", beta: 0.25, sharpe: 0.38, insight: "Unique global mining exposure providing high non-equity alpha." },
    { name: "Quantum Gold Saving Fund", cat: "Gold", returns: [51.16, 38.59, 31.91], aum: "299 Cr", expense: "0.45%", beta: 0.38, sharpe: 0.49, insight: "Efficient commodity asset with a strong 79% quality rating." },
    { name: "Mirae Asset S&P 500 Top 50 FoF", cat: "FoFs", returns: [55.57, 48.07, 40.6], aum: "752 Cr", expense: "0.49%", beta: 0.3, sharpe: 0.4, insight: "Diversified US-large cap exposure for global portfolio alpha." }
  ]
};

// UI Handling
const sliderConf = ["age", "risk", "horizon", "liq", "ret"];
sliderConf.forEach(s => {
  document.getElementById(s).addEventListener('input', (e) => {
    let val = e.target.value;
    let lbl = val;
    if(s === 'horizon') lbl += 'Y';
    if(s === 'ret') lbl += '%';
    if(['risk', 'liq'].includes(s)) lbl += '/10';
    document.getElementById(`d-${s}`).innerText = lbl;
  });
});

let mainChart = null;

function generateStrategy() {
  const risk = parseInt(document.getElementById('risk').value);
  const ret = parseInt(document.getElementById('ret').value);
  
  let cluster = "Growth & Stability";
  if (risk <= 4) cluster = "Capital Preservation";
  else if (risk >= 8 || ret > 20) cluster = "High-Alpha Aggressive";

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
  let labels = ["Base"];
  const listEl = document.getElementById('yoy-list');
  listEl.innerHTML = '';

  for(let i=1; i<=5; i++) {
    const nextVal = values[i-1] * (1 + avg3y/100);
    values.push(nextVal);
    labels.push(`Year ${i}`);
    listEl.innerHTML += `<div class="yoy-item"><span>Year ${i}</span><b>₹${Math.round(nextVal).toLocaleString()}</b></div>`;
  }

  if(mainChart) mainChart.destroy();
  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Value',
        data: values,
        borderColor: '#0284c7',
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        backgroundColor: 'rgba(2, 132, 199, 0.05)'
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
    const canvasId = `mini-${i}`;
    grid.innerHTML += `
      <div class="fund-card">
        <div class="f-head">
          <span class="f-cat">${f.cat}</span>
          <div class="f-name">${f.name}</div>
        </div>
        <div class="f-analytics">
          <div class="mini-chart-wrap"><canvas id="${canvasId}"></canvas></div>
          <div class="f-metrics">
            <div class="m-item"><label>AUM</label><div>${f.aum}</div></div>
            <div class="m-item"><label>Exp. Ratio</label><div>${f.expense}</div></div>
            <div class="m-item"><label>Beta</label><div>${f.beta}</div></div>
            <div class="m-item"><label>Sharpe</label><div>${f.sharpe}</div></div>
          </div>
        </div>
        <div class="f-insight">
          ${f.insight}
        </div>
      </div>
    `;
    
    setTimeout(() => {
      const mCtx = document.getElementById(canvasId).getContext('2d');
      new Chart(mCtx, {
        type: 'bar',
        data: {
          labels: ['1Y', '2Y', '3Y'],
          datasets: [{
            data: f.returns,
            backgroundColor: ['#bae6fd', '#38bdf8', '#0284c7'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: {display: false} },
          scales: { y: {display: false}, x: {grid:{display:false}, ticks:{font:{size:9}}} }
        }
      });
    }, 50);
  });
}
