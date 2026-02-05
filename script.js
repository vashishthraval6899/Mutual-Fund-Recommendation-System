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

// UI Handling
const sliders = ["age", "risk", "horizon", "liq", "ret"];
sliders.forEach(s => {
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
let shapChart = null;

async function generateStrategy() {
  // Get user inputs
  const inputs = {
    age: parseInt(document.getElementById('age').value),
    risk_appetite: parseInt(document.getElementById('risk').value),
    investment_duration: parseInt(document.getElementById('horizon').value),
    liquidity_needs: parseInt(document.getElementById('liq').value),
    expected_returns: parseInt(document.getElementById('ret').value)
  };

  // Call API to get risk score and SHAP values
  const apiResponse = await callRiskScoreAPI(inputs);
  
  // Show results section
  document.getElementById('hero-view').style.display = 'none';
  document.getElementById('results-view').classList.remove('hidden');
  document.getElementById('risk-section').classList.remove('hidden');
  
  // Determine strategy based on risk
  const risk = parseInt(document.getElementById('risk').value);
  const ret = parseInt(document.getElementById('ret').value);
  
  let cluster = "Growth & Stability";
  if (risk <= 4) cluster = "Capital Preservation";
  else if (risk >= 8 || ret > 20) cluster = "High-Alpha Aggressive";

  document.getElementById('strategy-name').innerText = cluster;

  // Render fund recommendations
  const funds = FUND_DATA[cluster];
  renderProjection(funds);
  renderFunds(funds);
  
  // Update risk score visualization
  updateRiskScoreVisualization(apiResponse);
  
  // Update SHAP chart
  renderSHAPChart(apiResponse.top_factors);
  
  // Update factors table
  renderFactorsTable(apiResponse.top_factors, inputs);
  
  feather.replace();
  
  // Smooth scroll to results on mobile
  if(window.innerWidth <= 1024) {
    document.getElementById('results-view').scrollIntoView({ behavior: 'smooth' });
  }
}

async function callRiskScoreAPI(inputs) {
  // For demo purposes, we'll simulate the API response
  // In production, replace with actual API call:
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(inputs)
  // });
  // return await response.json();
  
  // Simulated API response based on your sample
  return {
    risk_score: calculateSimulatedRiskScore(inputs),
    top_factors: simulateSHAPFactors(inputs)
  };
}

function calculateSimulatedRiskScore(inputs) {
  // Simulate risk score calculation based on inputs
  let score = 0.3; // Base score
  
  // Adjust based on inputs (simplified logic)
  score += (inputs.risk_appetite - 5) * 0.02;
  score += (inputs.investment_duration - 3) * 0.03;
  score += (inputs.liquidity_needs - 5) * (-0.02);
  score += (inputs.expected_returns - 12) * 0.01;
  score += (inputs.age - 40) * (-0.001);
  
  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, score)).toFixed(3);
}

function simulateSHAPFactors(inputs) {
  // Simulate SHAP factor impacts based on your sample
  return [
    {
      feature: "risk_appetite",
      value: inputs.risk_appetite,
      impact: (inputs.risk_appetite - 5.5) * 0.0217,
      effect: inputs.risk_appetite > 5.5 ? "increase" : "decrease"
    },
    {
      feature: "investment_duration",
      value: inputs.investment_duration,
      impact: (inputs.investment_duration - 3) * 0.0198,
      effect: "increase"
    },
    {
      feature: "liquidity_needs",
      value: inputs.liquidity_needs,
      impact: (inputs.liquidity_needs - 5.5) * (-0.0137),
      effect: inputs.liquidity_needs > 5.5 ? "decrease" : "increase"
    },
    {
      feature: "expected_returns",
      value: inputs.expected_returns,
      impact: (inputs.expected_returns - 12) * 0.015,
      effect: "increase"
    },
    {
      feature: "age",
      value: inputs.age,
      impact: (inputs.age - 40) * (-0.002),
      effect: inputs.age > 40 ? "decrease" : "increase"
    }
  ].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
   .slice(0, 3); // Top 3 factors
}

function updateRiskScoreVisualization(response) {
  const riskScore = parseFloat(response.risk_score);
  const riskMeter = document.getElementById('risk-meter');
  const riskValue = document.getElementById('risk-score-value');
  const riskLevel = document.getElementById('risk-level');
  const riskDescription = document.getElementById('risk-description');
  
  // Update score value
  riskValue.textContent = riskScore.toFixed(3);
  
  // Update circular progress
  const circumference = 2 * Math.PI * 54; // 2πr
  const offset = circumference - (riskScore * circumference);
  riskMeter.style.strokeDashoffset = offset;
  
  // Update risk level and color
  let levelText, levelColor, description;
  
  if (riskScore <= 0.33) {
    levelText = "Low Risk";
    levelColor = "#22c55e";
    description = "Conservative profile suitable for capital preservation strategies.";
    riskMeter.style.stroke = "#22c55e";
  } else if (riskScore <= 0.66) {
    levelText = "Moderate";
    levelColor = "#eab308";
    description = "Balanced profile ideal for growth-oriented strategies with moderate risk.";
    riskMeter.style.stroke = "#eab308";
  } else {
    levelText = "High Risk";
    levelColor = "#ef4444";
    description = "Aggressive profile suitable for high-growth potential investments.";
    riskMeter.style.stroke = "#ef4444";
  }
  
  riskLevel.textContent = levelText;
  riskLevel.style.background = levelColor + "20";
  riskLevel.style.color = levelColor;
  riskLevel.style.border = `1px solid ${levelColor}40`;
  riskDescription.textContent = description;
}

function renderSHAPChart(factors) {
  const ctx = document.getElementById('shapChart').getContext('2d');
  
  // Destroy existing chart if it exists
  if (shapChart) {
    shapChart.destroy();
  }
  
  // Prepare data for chart
  const labels = factors.map(f => 
    f.feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  );
  const impacts = factors.map(f => f.impact);
  const colors = factors.map(f => 
    f.effect === 'increase' ? '#22c55e' : '#ef4444'
  );
  
  // Create horizontal bar chart
  shapChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: impacts,
        backgroundColor: colors,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.map(c => c + '80')
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const factor = factors[context.dataIndex];
              const impact = Math.abs(factor.impact).toFixed(4);
              const direction = factor.effect === 'increase' ? 'increases' : 'decreases';
              return `${direction} risk by ${impact}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            callback: function(value) {
              return Math.abs(value).toFixed(3);
            }
          },
          title: {
            display: true,
            text: 'Impact on Risk Score',
            font: {
              size: 12,
              weight: '600'
            }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12,
              weight: '600'
            }
          }
        }
      }
    }
  });
}

function renderFactorsTable(factors, inputs) {
  const tbody = document.querySelector('#factors-table tbody');
  tbody.innerHTML = '';
  
  // Map feature names to human-readable labels
  const featureLabels = {
    'risk_appetite': 'Risk Appetite',
    'investment_duration': 'Investment Duration',
    'liquidity_needs': 'Liquidity Needs',
    'expected_returns': 'Expected Returns',
    'age': 'Age'
  };
  
  // Map feature names to interpretations
  const interpretations = {
    'risk_appetite': (value) => 
      value > 7 ? 'High risk tolerance indicates comfort with market volatility' :
      value > 4 ? 'Moderate risk tolerance suggests balanced approach' :
      'Low risk tolerance favors stable, conservative investments',
    
    'investment_duration': (value) => 
      value > 3 ? 'Longer duration allows for higher risk-taking' :
      'Short duration suggests need for liquidity and stability',
    
    'liquidity_needs': (value) => 
      value > 7 ? 'High liquidity need requires low-risk, accessible assets' :
      'Lower liquidity need allows for longer-term, higher-yield investments',
    
    'expected_returns': (value) => 
      value > 15 ? 'High return expectations correlate with higher risk acceptance' :
      value > 10 ? 'Moderate return expectations balanced with risk considerations' :
      'Conservative return expectations prioritize capital preservation',
    
    'age': (value) => 
      value < 30 ? 'Younger investors typically have higher risk capacity' :
      value < 50 ? 'Mid-age investors balance growth and preservation' :
      'Older investors generally prefer capital preservation'
  };
  
  factors.forEach(factor => {
    const row = document.createElement('tr');
    const label = featureLabels[factor.feature] || factor.feature;
    const interpretation = interpretations[factor.feature] ? 
      interpretations[factor.feature](factor.value) : 'No interpretation available';
    
    row.innerHTML = `
      <td class="factor-name">${label}</td>
      <td>
        <span class="factor-value">
          ${factor.feature === 'investment_duration' ? factor.value + ' years' : 
            factor.feature === 'age' ? factor.value + ' years' :
            factor.feature === 'expected_returns' ? factor.value + '%' :
            factor.value}/10
        </span>
      </td>
      <td class="${factor.impact > 0 ? 'impact-positive' : 'impact-negative'}">
        ${factor.impact > 0 ? '+' : ''}${factor.impact.toFixed(4)}
      </td>
      <td>
        <span class="direction ${factor.effect}">
          ${factor.effect === 'increase' ? 'Increases Risk' : 'Decreases Risk'}
        </span>
      </td>
      <td style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
        ${interpretation}
      </td>
    `;
    
    tbody.appendChild(row);
  });
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
          plugins: { legend: {display: false} },
          scales: { y: {display: false}, x: {grid:{display:false}, ticks:{font:{size:10}}} }
        }
      });
    }, 50);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Pre-select some values for better demo experience
  feather.replace();
});
