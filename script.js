const FUND_DATA = {
  "Growth & Stability": [
    { name: "DSP Credit Risk Fund-Reg(G)", cat: "Debt", returns: [21.58, 14.47, 14.87], aum: "208 Cr", expense: "1.2%", beta: 0.18, sharpe: 0.29, quality: "78.3%"},
    { name: "ICICI Pru BSE Sensex ETF", cat: "Equity", returns: [7.18, 15.15, 12.4], aum: "23,155 Cr", expense: "0.02%", beta: 0.98, sharpe: 0.2, quality: "75.7%"},
    { name: "HSBC Credit Risk Fund-Reg(G)", cat: "Debt", returns: [20.62, 13.66, 11.25], aum: "562 Cr", expense: "1.64%", beta: 0.66, sharpe: 0.2, quality: "75.5%"},
    { name: "Franklin India Income Plus Arbitrage Active FOF", cat: "FoFs", returns: [13.1, 15.6, 14.14], aum: "76 Cr", expense: "0.53%", beta: 0.94, sharpe: 0.42, quality: "73.9%"},
    { name: "ICICI Pru Multi-Asset Fund(G)", cat: "Hybrid", returns: [12.92, 20.54, 19.34], aum: "68,000 Cr", expense: "1.38%", beta: 0.46, sharpe: 0.59, quality: "73.3%"},
    { name: "Parag Parikh Flexi Cap Fund", cat: "Equity", returns: [8.68, 21.08, 21.65], aum: "1.19L Cr", expense: "1.28%", beta: 0.57, sharpe: 0.49, quality: "73.2%"},
    { name: "HDFC Multi-Asset Active FOF-Reg(G)", cat: "FoFs", returns: [11.46, 17.41, 16.21], aum: "4,793 Cr", expense: "1.1%", beta: 0.48, sharpe: 0.5, quality: "72.2%"},
    { name: "Kotak Nifty Midcap 50 ETF", cat: "Equity", returns: [10.29, 23.2, 25.36], aum: "80 Cr", expense: "0.05%", beta: 1.0, sharpe: 0.36, quality: "72.1%"}
  ],
  "Capital Preservation": [
    { name: "Bank of India Overnight Fund", cat: "Debt", returns: [6.1, 6.45, 6.51], aum: "34 Cr", expense: "0.1%", beta: 0.98, sharpe: -0.36, quality: "100%"},
    { name: "Axis Overnight Fund-Reg(G)", cat: "Debt", returns: [6.02, 6.37, 6.43], aum: "8,743 Cr", expense: "0.11%", beta: 0.74, sharpe: -0.51, quality: "99.5%"},
    { name: "UTI Overnight Fund-Reg(G)", cat: "Debt", returns: [5.97, 6.33, 6.39], aum: "6,559 Cr", expense: "0.11%", beta: 1.0, sharpe: -0.59, quality: "99.3%"},
    { name: "Canara Rob Overnight Fund", cat: "Debt", returns: [5.93, 6.28, 6.35], aum: "265 Cr", expense: "0.09%", beta: 0.95, sharpe: -0.7, quality: "99.0%"},
    { name: "Invesco India Overnight Fund", cat: "Debt", returns: [5.95, 6.32, 6.38], aum: "644 Cr", expense: "0.12%", beta: 0.76, sharpe: -0.61, quality: "98.8%"},
    { name: "Franklin India Overnight Fund", cat: "Debt", returns: [5.98, 6.3, 6.35], aum: "486 Cr", expense: "0.11%", beta: 0.71, sharpe: -0.71, quality: "98.8%"},
    { name: "Nippon India Overnight Fund", cat: "Debt", returns: [5.97, 6.31, 6.37], aum: "6,760 Cr", expense: "0.16%", beta: 1.0, sharpe: -0.63, quality: "98.6%"},
    { name: "Baroda BNP Paribas Overnight Fund", cat: "Debt", returns: [5.94, 6.3, 6.37], aum: "457 Cr", expense: "0.17%", beta: 1.01, sharpe: -0.64, quality: "98.3%"}
  ],
  "High-Alpha Aggressive": [
    { name: "Mirae Asset NYSE FANG+ETF FoF", cat: "FoFs", returns: [81.73, 67.49, 71.07], aum: "2,347 Cr", expense: "0.45%", beta: 0.47, sharpe: 0.49, quality: "97.0%"},
    { name: "Mirae Asset NYSE FANG+ ETF", cat: "Equity", returns: [49.31, 53.07, 60.85], aum: "3,492 Cr", expense: "0.65%", beta: 0.88, sharpe: 0.47, quality: "84.0%"},
    { name: "HDFC Silver ETF FoF-Reg(G)", cat: "Gold/Commodity", returns: [50.51, 40.55, 33.05], aum: "1,273 Cr", expense: "0.6%", beta: 0.04, sharpe: 0.35, quality: "82.8%"},
    { name: "DSP World Gold Mining FoF", cat: "FoFs", returns: [80.51, 61.6, 44.46], aum: "1,678 Cr", expense: "2.34%", beta: 0.25, sharpe: 0.38, quality: "79.9%"},
    { name: "Quantum Gold Saving Fund", cat: "Gold", returns: [51.16, 38.59, 31.91], aum: "299 Cr", expense: "0.45%", beta: 0.38, sharpe: 0.49, quality: "79.3%"},
    { name: "Mirae Asset S&P 500 Top 50 FoF", cat: "FoFs", returns: [55.57, 48.07, 40.6], aum: "752 Cr", expense: "0.49%", beta: 0.3, sharpe: 0.4, quality: "79.3%"},
    { name: "Kotak Gold Fund(G)", cat: "Gold", returns: [50.53, 37.85, 31.5], aum: "4,153 Cr", expense: "0.5%", beta: 0.36, sharpe: 0.48, quality: "79.2%"},
    { name: "Kotak Gold ETF", cat: "Gold", returns: [51.5, 38.7, 32.2], aum: "9,736 Cr", expense: "0.55%", beta: 0.48, sharpe: 0.49, quality: "79.0%"}
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
let riskData = null;

// API Configuration
const API_URL = "https://mf-recommender-backend-production.up.railway.app/";

// Sort funds by quality score (descending) and return top 6
function getTopFundsByQuality(funds) {
  // First, sort by quality score (convert percentage to number)
  return funds
    .map(fund => ({
      ...fund,
      qualityNum: parseFloat(fund.quality) // Convert "78.3%" to 78.3
    }))
    .sort((a, b) => b.qualityNum - a.qualityNum) // Sort descending
    .slice(0, 6) // Take top 6
    .map(({ qualityNum, ...rest }) => rest); // Remove the temporary qualityNum
}

// Call your actual API
async function callRiskAPI(inputs) {
  try {
    console.log('Calling API with:', inputs);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Ensure data has expected format
    if (!data.risk_score && data.risk_score !== 0) {
      console.warn('API response missing risk_score, using simulation');
      return simulateRiskData(inputs);
    }
    
    // Ensure top_factors exists and is an array
    if (!Array.isArray(data.top_factors)) {
      data.top_factors = calculateTopFactors(inputs);
    }
    
    return data;
    
  } catch (error) {
    console.error('API Error:', error);
    console.log('Falling back to simulation');
    return simulateRiskData(inputs);
  }
}

// Fallback simulation if API fails
function simulateRiskData(inputs) {
  return {
    risk_score: calculateRiskScore(inputs),
    top_factors: calculateTopFactors(inputs)
  };
}

function calculateRiskScore(inputs) {
  let score = 0.3;
  score += (inputs.risk_appetite - 5.5) * 0.04;
  score += (inputs.investment_duration - 3) * 0.05;
  score += (inputs.liquidity_needs - 5.5) * -0.03;
  score += (inputs.expected_returns - 12) * 0.02;
  score = Math.max(0, Math.min(1, score));
  return parseFloat(score.toFixed(3));
}

function calculateTopFactors(inputs) {
  const factors = [
    {
      feature: "risk_appetite",
      value: parseFloat(inputs.risk_appetite),
      impact: (inputs.risk_appetite - 5.5) * 0.0217,
      effect: inputs.risk_appetite > 5.5 ? "increase" : "decrease"
    },
    {
      feature: "investment_duration",
      value: parseFloat(inputs.investment_duration),
      impact: (inputs.investment_duration - 3) * 0.0198,
      effect: "increase"
    },
    {
      feature: "liquidity_needs",
      value: parseFloat(inputs.liquidity_needs),
      impact: (inputs.liquidity_needs - 5.5) * -0.0137,
      effect: inputs.liquidity_needs > 5.5 ? "decrease" : "increase"
    },
    {
      feature: "expected_returns",
      value: parseFloat(inputs.expected_returns),
      impact: (inputs.expected_returns - 12) * 0.015,
      effect: "increase"
    },
    {
      feature: "age",
      value: parseFloat(inputs.age),
      impact: (inputs.age - 40) * -0.0015,
      effect: inputs.age > 40 ? "decrease" : "increase"
    }
  ];
  
  // Sort by absolute impact and return top 3
  return factors
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 3)
    .map(factor => ({
      ...factor,
      impact: parseFloat(factor.impact.toFixed(4))
    }));
}

// Main function
async function generateStrategy() {
  // Show loading state
  const button = document.querySelector('.primary-btn');
  const originalText = button.innerHTML;
  button.innerHTML = '<i data-feather="loader" class="spin"></i> Analyzing Risk...';
  feather.replace();
  
  // Collect inputs
  const inputs = {
    age: parseInt(document.getElementById('age').value),
    risk_appetite: parseInt(document.getElementById('risk').value),
    investment_duration: parseInt(document.getElementById('horizon').value),
    liquidity_needs: parseInt(document.getElementById('liq').value),
    expected_returns: parseInt(document.getElementById('ret').value)
  };

  try {
    // 1. Call API for risk data
    riskData = await callRiskAPI(inputs);
    
    // 2. Show all sections
    document.getElementById('hero-view').style.display = 'none';
    document.getElementById('results-view').classList.remove('hidden');
    document.getElementById('risk-section').classList.remove('hidden');
    
    // 3. Update risk score visualization
    updateRiskScore(riskData);
    
    // 4. Update SHAP chart
    updateSHAPChart(riskData.top_factors);
    
    // 5. Update factors table
    updateFactorsTable(riskData.top_factors, inputs);
    
    // 6. Determine strategy cluster
    const risk = parseInt(document.getElementById('risk').value);
    const ret = parseInt(document.getElementById('ret').value);
    
    let cluster = "Growth & Stability";
    if (risk <= 4) cluster = "Capital Preservation";
    else if (risk >= 8 || ret > 20) cluster = "High-Alpha Aggressive";

    document.getElementById('strategy-name').innerText = cluster;
    document.getElementById('match-pct').innerText = calculateMatchPercentage(riskData.risk_score) + '%';

    const funds = FUND_DATA[cluster];
    const sortedFunds = getTopFundsByQuality(funds); // Get top 6 sorted by quality
    renderProjection(sortedFunds);
    renderFunds(sortedFunds);
    
    feather.replace();
    
    // Smooth scroll on mobile
    if(window.innerWidth <= 1024) {
      document.getElementById('results-view').scrollIntoView({ behavior: 'smooth' });
    }
    
  } catch (error) {
    console.error('Error in generateStrategy:', error);
    alert('There was an error analyzing your risk profile. Please try again.');
  } finally {
    // Restore button
    button.innerHTML = originalText;
    feather.replace();
  }
}

function calculateMatchPercentage(riskScore) {
  const risk = parseInt(document.getElementById('risk').value);
  const ret = parseInt(document.getElementById('ret').value);
  
  let baseScore = 85;
  
  const riskVal = parseFloat(riskScore);
  if (riskVal <= 0.33 && risk <= 4) baseScore += 10;
  else if (riskVal > 0.66 && risk >= 8) baseScore += 10;
  else if (riskVal > 0.33 && riskVal <= 0.66 && risk > 4 && risk < 8) baseScore += 10;
  
  return Math.min(98, baseScore);
}

function updateRiskScore(data) {
  const score = parseFloat(data.risk_score);
  const scoreElement = document.getElementById('risk-score');
  const levelElement = document.getElementById('risk-level');
  const descriptionElement = document.getElementById('risk-description');
  const riskCard = document.querySelector('.risk-card');
  
  // Update score with animation
  animateValue(scoreElement, 0, score, 1000);
  
  // Update level and colors
  let level, colorClass, description;
  
  if (score <= 0.33) {
    level = "LOW RISK";
    colorClass = "risk-low";
    description = ""; // Removed description text
  } else if (score <= 0.66) {
    level = "MODERATE RISK";
    colorClass = "risk-moderate";
    description = ""; // Removed description text
  } else {
    level = "HIGH RISK";
    colorClass = "risk-high";
    description = ""; // Removed description text
  }
  
  // Update level element
  levelElement.textContent = level;
  
  // Update badge styling
  levelElement.className = 'risk-badge ' + colorClass;
  
  // Update score color
  if (score <= 0.33) {
    scoreElement.style.color = '#22c55e';
  } else if (score <= 0.66) {
    scoreElement.style.color = '#eab308';
  } else {
    scoreElement.style.color = '#ef4444';
  }
  
  descriptionElement.textContent = description;
  
  // Update circular indicator
  updateCircularScore(score);
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = start + progress * (end - start);
    element.textContent = currentValue.toFixed(3);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function updateCircularScore(score) {
  const circularScore = document.querySelector('.circular-score');
  
  // Remove any existing indicator
  const existingIndicator = document.querySelector('.risk-indicator');
  if (existingIndicator) existingIndicator.remove();
  
  // Create new indicator with animation
  const angle = score * 360;
  const indicator = document.createElement('div');
  indicator.className = 'risk-indicator';
  
  // Apply color based on score
  if (score <= 0.33) {
    indicator.style.background = '#22c55e';
  } else if (score <= 0.66) {
    indicator.style.background = '#eab308';
  } else {
    indicator.style.background = '#ef4444';
  }
  
  // Set initial position and animate
  indicator.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  
  circularScore.appendChild(indicator);
  
  // Add score animation
  const scoreElement = document.querySelector('.score-value');
  scoreElement.classList.add('score-pulse');
  setTimeout(() => {
    scoreElement.classList.remove('score-pulse');
  }, 600);
}

function updateSHAPChart(factors) {
  const ctx = document.getElementById('shapChart').getContext('2d');
  
  // Destroy existing chart
  if (shapChart) {
    shapChart.destroy();
  }
  
  // Format data - sort by absolute impact
  const sortedFactors = [...factors].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
  const labels = sortedFactors.map(f => 
    f.feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  );
  const data = sortedFactors.map(f => Math.abs(f.impact));
  const colors = sortedFactors.map(f => 
    f.effect === 'increase' ? '#ef4444' : '#22c55e'
  );
  
  // Create chart
  shapChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderRadius: 6,
        borderWidth: 0
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
            label: (context) => {
              const factor = sortedFactors[context.dataIndex];
              const direction = factor.effect === 'increase' ? 'increases' : 'decreases';
              return `${direction} risk by ${Math.abs(factor.impact).toFixed(4)}`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { 
            display: true,
            color: '#f1f5f9'
          },
          ticks: {
            callback: (value) => value.toFixed(3),
            font: {
              size: 11
            }
          },
          title: {
            display: true,
            text: 'Impact Magnitude',
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

function updateFactorsTable(factors, inputs) {
  const tbody = document.getElementById('factors-body');
  tbody.innerHTML = '';
  
  // Feature name mapping
  const featureNames = {
    'risk_appetite': 'Risk Appetite',
    'investment_duration': 'Investment Duration',
    'liquidity_needs': 'Liquidity Needs',
    'expected_returns': 'Expected Returns',
    'age': 'Age'
  };
  
  // Value formatting
  const formatValue = (feature, value) => {
    switch(feature) {
      case 'risk_appetite':
      case 'liquidity_needs':
        return `${value}/10`;
      case 'investment_duration':
        return `${value} years`;
      case 'expected_returns':
        return `${value}%`;
      case 'age':
        return `${value} years`;
      default:
        return value;
    }
  };
  
  // Add rows without factor hints
  factors.forEach(factor => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>
        <div class="factor-name">${featureNames[factor.feature] || factor.feature}</div>
        <div class="factor-hint" style="display: none;"></div>
      </td>
      <td><span class="factor-value">${formatValue(factor.feature, factor.value)}</span></td>
      <td class="${factor.impact > 0 ? 'impact-positive' : 'impact-negative'}">
        ${factor.impact > 0 ? '+' : ''}${Math.abs(factor.impact).toFixed(4)}
      </td>
      <td>
        <span class="direction ${factor.effect}">
          ${factor.effect === 'increase' ? '↑ Increases' : '↓ Decreases'}
        </span>
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
          <div class="f-cat-row">
            <span class="f-cat">${f.cat}</span>
            <span class="f-quality">Quality: ${f.quality}</span>
          </div>
          <div class="f-name">${f.name}</div>
        </div>
        <div class="f-analytics">
          <div class="mini-chart-wrap"><canvas id="${cId}"></canvas></div>
          <div class="f-metrics">
            <div class="m-item"><label>AUM</label><div>${f.aum}</div></div>
            <div class="m-item"><label>Exp. Ratio</label><div>${f.expense}</div></div>
            <div class="m-item"><label>Quality Score</label><div>${f.quality}</div></div>
            <div class="m-item"><label>Sharpe Ratio</label><div>${f.sharpe}</div></div>
          </div>
        </div>
        <!-- Removed insight section -->
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
  // Pre-select some values for better demo
  document.getElementById('risk').value = 7;
  document.getElementById('d-risk').textContent = '7/10';
  
  feather.replace();
});

// Slider Information Tooltips
function showSliderInfo(sliderId) {
  const infoMessages = {
    'age': 'Your current age',
    'risk': 'Your comfort with investment risk',
    'horizon': 'How long you\'ll stay invested',
    'liq': 'How soon you may need the money',
    'ret': 'Your target yearly return'
  };

  // Remove any existing tooltip
  const existingTooltip = document.querySelector('.info-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // Create new tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'info-tooltip';
  tooltip.textContent = infoMessages[sliderId];

  // Position tooltip near the button
  const button = event.target;
  const rect = button.getBoundingClientRect();
  
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.bottom + 10) + 'px';

  document.body.appendChild(tooltip);

  // Remove tooltip after 3 seconds
  setTimeout(() => {
    if (tooltip && tooltip.parentNode) {
      tooltip.remove();
    }
  }, 3000);
}

// Remove tooltip when clicking elsewhere
document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('info-btn')) {
    const tooltip = document.querySelector('.info-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
});
