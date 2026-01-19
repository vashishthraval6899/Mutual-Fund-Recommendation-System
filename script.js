// --- DATA: Top 5 Funds per Cluster (Hardcoded for Demo/Fallback) ---
const FUND_DATABASE = {
  "Balanced Growth": [
    { name: "ICICI Pru Equity & Debt Fund", category: "Hybrid", return3y: 18.5, risk: "Medium" },
    { name: "Kotak Bluechip Fund", category: "Large Cap", return3y: 16.2, risk: "High" },
    { name: "HDFC Flexi Cap Fund", category: "Flexi Cap", return3y: 19.1, risk: "High" },
    { name: "SBI Large & Midcap Fund", category: "Equity", return3y: 21.4, risk: "Very High" },
    { name: "Mirae Asset Emerging Bluechip", category: "Large & Mid", return3y: 20.8, risk: "High" }
  ],
  "Capital Preservation": [
    { name: "Axis Liquid Fund", category: "Liquid", return3y: 5.8, risk: "Very Low" },
    { name: "SBI Overnight Fund", category: "Overnight", return3y: 4.2, risk: "Lowest" },
    { name: "Aditya Birla SL Low Duration", category: "Debt", return3y: 6.1, risk: "Low" },
    { name: "HDFC Liquid Fund", category: "Liquid", return3y: 5.9, risk: "Very Low" },
    { name: "ICICI Pru Savings Fund", category: "Money Market", return3y: 6.5, risk: "Low" }
  ],
  "Aggressive Tactical": [
    { name: "Nippon India ETF Gold BeES", category: "Gold", return3y: 14.5, risk: "High" },
    { name: "SBI Gold Fund", category: "Gold", return3y: 13.8, risk: "High" },
    { name: "ICICI Pru Commodities Fund", category: "Thematic", return3y: 28.1, risk: "Very High" },
    { name: "Kotak Gold Fund", category: "Gold", return3y: 14.2, risk: "High" },
    { name: "Tata Resources & Energy", category: "Thematic", return3y: 22.4, risk: "Very High" }
  ]
};

// --- UI LOGIC: Update Badges Real-time ---
const inputs = ['age', 'risk_score', 'investment_horizon', 'liquidity_need', 'expected_return'];
inputs.forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    let val = e.target.value;
    if (id === 'risk_score' || id === 'liquidity_need') val += '/10';
    if (id === 'investment_horizon') val += ' Years';
    if (id === 'expected_return') val += '%';
    document.getElementById('disp_' + id.split('_')[0].replace('investment', 'horizon').replace('risk', 'risk').replace('liquidity', 'liq')).innerText = val;
  });
});

let growthChartInstance = null;

// --- MAIN FUNCTION ---
async function getRecommendation() {
  const btn = document.querySelector('.action-btn');
  btn.innerHTML = `<i data-feather="loader" class="spin"></i> Finding Funds...`;
  feather.replace();

  // 1. Gather Data
  const payload = {
    age: Number(document.getElementById("age").value),
    risk_score: Number(document.getElementById("risk_score").value),
    investment_horizon: Number(document.getElementById("investment_horizon").value),
    liquidity_need: Number(document.getElementById("liquidity_need").value),
    expected_return: Number(document.getElementById("expected_return").value),
    income_stability: 4 // Defaulting for simple UI
  };

  // 2. Mock API Call (Replace with real Fetch for production)
  // To use real backend: const response = await fetch('YOUR_API_URL', ...);
  // For now, we simulate the logic to ensure the UI works perfectly instantly.
  
  setTimeout(() => {
    // Simulated Logic (Matches your Python Clusters)
    let cluster = "Balanced Growth";
    if (payload.risk_score <= 4 || payload.investment_horizon < 3) cluster = "Capital Preservation";
    if (payload.risk_score >= 8 || payload.expected_return > 20) cluster = "Aggressive Tactical";

    // 3. Update UI
    document.getElementById("welcome-view").style.display = 'none';
    document.getElementById("dashboard-view").classList.remove("hidden");
    
    // Header
    document.getElementById("cluster-title").innerText = cluster;
    document.getElementById("confidence-score").innerText = (85 + Math.random() * 10).toFixed(0) + "% Match";

    // 4. Render "Why" (Key Drivers)
    const drivers = document.getElementById("drivers-container");
    drivers.innerHTML = '';
    
    // Dynamic explanations based on input
    const reasons = [];
    if (payload.risk_score > 6) reasons.push({ label: "High Risk Tolerance", impact: 80, pos: true });
    else reasons.push({ label: "Conservative Risk Profile", impact: 70, pos: true });
    
    if (payload.investment_horizon > 5) reasons.push({ label: "Long Time Horizon", impact: 60, pos: true });
    
    reasons.forEach(r => {
      drivers.innerHTML += `
        <div class="driver-item">
          <div class="driver-label"><i data-feather="${r.pos ? 'check' : 'x'}" width="16"></i> ${r.label}</div>
          <div class="driver-bar"><div class="driver-fill ${r.pos ? 'pos' : 'neg'}" style="width:${r.impact}%"></div></div>
        </div>
      `;
    });

    // 5. Render Top 5 Funds
    const fundsContainer = document.getElementById("funds-container");
    fundsContainer.innerHTML = '';
    const funds = FUND_DATABASE[cluster];
    
    funds.forEach(fund => {
      fundsContainer.innerHTML += `
        <div class="fund-card">
          <span class="fund-cat">${fund.category}</span>
          <div class="fund-name">${fund.name}</div>
          <div class="fund-metric">
            <span>3Y Return</span>
            <span class="metric-val">+${fund.return3y}%</span>
          </div>
          <div class="fund-metric" style="margin-top:5px; font-size:0.8rem">
            <span>Risk</span>
            <span style="color:${fund.risk.includes('High') ? '#ef4444' : '#10b981'}">${fund.risk}</span>
          </div>
        </div>
      `;
    });

    // 6. Render Analytics Chart (Projected Growth)
    renderChart(funds);

    // Reset Button
    btn.innerHTML = `<span>Find My Funds</span><i data-feather="arrow-right"></i>`;
    feather.replace();
    
  }, 800); // Fake delay for "Analysis" feel
}

function renderChart(funds) {
  const ctx = document.getElementById('growthChart').getContext('2d');
  
  // Calculate average return of recommended funds
  const avgReturn = funds.reduce((acc, f) => acc + f.return3y, 0) / funds.length;
  
  // Projection data (5 Years)
  const labels = ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
  const dataPoints = [];
  let currentAmount = 100000; // Starting 1 Lakh
  
  for(let i=0; i<6; i++) {
    dataPoints.push(currentAmount);
    currentAmount = currentAmount * (1 + (avgReturn / 100));
  }

  if(growthChartInstance) growthChartInstance.destroy();

  growthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Portfolio Value (₹)',
        data: dataPoints,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return '₹ ' + Math.round(context.raw).toLocaleString();
            }
          }
        }
      },
      scales: {
        y: { display: false },
        x: { grid: { display: false } }
      }
    }
  });
}
