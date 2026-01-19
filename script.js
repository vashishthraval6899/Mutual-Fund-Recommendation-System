// --- 1. DATA: Extracted from your CSV ---
// Using 1yr, 2yr, 3yr returns for the mini-charts
const FUND_DB = {
  "Balanced Growth": [
    { name: "ICICI Pru Pharma Healthcare", cat: "Equity", r1: 5.36, r2: 29.94, r3: 26.65, sharpe: 0.43, risk: "High" },
    { name: "Kotak Nifty Midcap 50", cat: "Equity", r1: 10.29, r2: 23.20, r3: 25.36, sharpe: 0.36, risk: "High" },
    { name: "SBI Healthcare Opp Fund", cat: "Equity", r1: 2.66, r2: 26.68, r3: 24.09, sharpe: 0.41, risk: "Med-High" },
    { name: "HDFC Flexi Cap Fund", cat: "Equity", r1: 10.33, r2: 24.96, r3: 21.89, sharpe: 0.43, risk: "Medium" },
    { name: "Parag Parikh Flexi Cap", cat: "Equity", r1: 8.68, r2: 21.08, r3: 21.65, sharpe: 0.49, risk: "Medium" }
  ],
  "Capital Preservation": [
    { name: "Bank of India Overnight", cat: "Debt", r1: 6.10, r2: 6.45, r3: 6.51, sharpe: -0.36, risk: "Low" },
    { name: "Axis Overnight Fund", cat: "Debt", r1: 6.02, r2: 6.37, r3: 6.43, sharpe: -0.51, risk: "Very Low" },
    { name: "UTI Overnight Fund", cat: "Debt", r1: 5.97, r2: 6.33, r3: 6.39, sharpe: -0.59, risk: "Low" },
    { name: "Invesco India Overnight", cat: "Debt", r1: 5.95, r2: 6.32, r3: 6.38, sharpe: -0.61, risk: "Very Low" },
    { name: "Nippon India Overnight", cat: "Debt", r1: 5.97, r2: 6.31, r3: 6.37, sharpe: -0.63, risk: "Low" }
  ],
  "Aggressive Tactical": [
    { name: "Mirae Asset NYSE FANG+", cat: "Global", r1: 81.73, r2: 67.49, r3: 71.07, sharpe: 0.49, risk: "Very High" },
    { name: "Mirae Asset NYSE FANG+ ETF", cat: "Equity", r1: 49.31, r2: 53.07, r3: 60.85, sharpe: 0.47, risk: "Very High" },
    { name: "DSP World Gold Mining", cat: "FoF", r1: 80.51, r2: 61.60, r3: 44.46, sharpe: 0.38, risk: "High" },
    { name: "Mirae Asset S&P 500 Top 50", cat: "FoF", r1: 55.57, r2: 48.07, r3: 40.60, sharpe: 0.40, risk: "High" },
    { name: "HDFC Silver ETF", cat: "Gold", r1: 50.51, r2: 40.55, r3: 33.05, sharpe: 0.35, risk: "High" }
  ]
};

// --- 2. INPUT LISTENERS (Fixed) ---
const inputs = ['age', 'risk_score', 'investment_horizon', 'liquidity_need', 'expected_return'];
inputs.forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    let val = e.target.value;
    if(id === 'risk_score' || id === 'liquidity_need') val += '/10';
    if(id === 'investment_horizon') val += ' Years';
    if(id === 'expected_return') val += '%';
    document.getElementById('disp_' + id.split('_')[0].replace('investment','horizon').replace('risk','risk').replace('liquidity','liq')).innerText = val;
  });
});

let mainChart = null;

// --- 3. MAIN RECOMMENDATION LOGIC ---
async function getRecommendation() {
  const btn = document.querySelector('.action-btn');
  btn.innerHTML = `<i data-feather="loader" class="spin"></i> Analyzing Profile...`;
  feather.replace();

  // Retrieve values
  const risk = Number(document.getElementById("risk_score").value);
  const horizon = Number(document.getElementById("investment_horizon").value);
  const exp_ret = Number(document.getElementById("expected_return").value);

  // Mock Latency
  setTimeout(() => {
    // Simple Rule-based clustering for Demo
    let cluster = "Balanced Growth";
    if (risk <= 4 || horizon < 3) cluster = "Capital Preservation";
    if (risk >= 8 || exp_ret > 20) cluster = "Aggressive Tactical";

    // Show Dashboard
    document.getElementById("welcome-view").style.display = 'none';
    document.getElementById("dashboard-view").classList.remove("hidden");
    document.getElementById("cluster-title").innerText = cluster;
    
    // --- A. RENDER FUNDS & MINI CHARTS ---
    const container = document.getElementById("funds-container");
    container.innerHTML = '';
    const funds = FUND_DB[cluster];
    
    funds.forEach((f, idx) => {
      // Unique ID for canvas
      const canvasId = `chart_${idx}`;
      
      container.innerHTML += `
        <div class="fund-card">
          <div class="fund-header">
            <span class="f-cat">${f.cat}</span>
            <div class="f-name">${f.name}</div>
          </div>
          <div class="f-stats">
            <div class="stat-box">
              <span class="stat-lbl">3Y Return</span>
              <span class="stat-val" style="color: #10b981">+${f.r3}%</span>
            </div>
            <div class="stat-box">
              <span class="stat-lbl">Risk</span>
              <span class="stat-val">${f.risk}</span>
            </div>
            <div class="stat-box">
              <span class="stat-lbl">Sharpe</span>
              <span class="stat-val">${f.sharpe}</span>
            </div>
          </div>
          <div class="mini-chart-container">
            <canvas id="${canvasId}"></canvas>
          </div>
        </div>
      `;
    });

    // Draw Mini Charts (Sparklines)
    funds.forEach((f, idx) => {
      const ctx = document.getElementById(`chart_${idx}`).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1Y', '2Y', '3Y'],
          datasets: [{
            data: [f.r1, f.r2, f.r3],
            borderColor: '#2563eb',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: {display: false}, tooltip: {enabled: false} },
          scales: { x: {display: false}, y: {display: false} }
        }
      });
    });

    // --- B. RENDER MAIN WEALTH PROJECTION ---
    renderWealthChart(funds, horizon);

    btn.innerHTML = `<span>Find Best Funds</span><i data-feather="arrow-right"></i>`;
    feather.replace();
  }, 800);
}

// --- 4. WEALTH PROJECTION & TIMELINE ---
function renderWealthChart(funds, years) {
  const ctx = document.getElementById('growthChart').getContext('2d');
  const avgReturn = funds.reduce((acc, f) => acc + f.r3, 0) / funds.length;
  
  // Generate Data Points
  const labels = [];
  const data = [];
  let current = 100000; // 1 Lakh start
  
  const timeline = document.getElementById('growth-timeline');
  timeline.innerHTML = ''; // Clear old

  // Initial
  labels.push('Start');
  data.push(current);
  timeline.innerHTML += `
    <div class="year-row">
      <span>Initial Investment</span>
      <span class="year-val">₹ 1,00,000</span>
    </div>`;

  for(let i=1; i<=years; i++) {
    labels.push(`Year ${i}`);
    current = current * (1 + (avgReturn/100));
    data.push(current);
    
    // Add to Timeline List
    timeline.innerHTML += `
      <div class="year-row">
        <span>Year ${i}</span>
        <span class="year-val">₹ ${Math.round(current).toLocaleString()}</span>
      </div>`;
  }

  // Draw Chart
  if(mainChart) mainChart.destroy();
  
  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Projected Value',
        data: data,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
          return gradient;
        },
        borderColor: '#2563eb',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: {display: false} },
      scales: {
        x: { grid: {display: false} },
        y: { display: false }
      }
    }
  });
}
