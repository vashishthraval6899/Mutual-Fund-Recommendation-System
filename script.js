// Hardcoded Top Funds Data (Taken from your CSV analysis)
const FUND_DATA = {
    "Balanced Growth": [
        { name: "ICICI Pru Equity & Debt Fund", category: "Hybrid", return3y: "18.5%", risk: "Moderate" },
        { name: "Kotak Bluechip Fund", category: "Equity", return3y: "16.2%", risk: "Medium-High" },
        { name: "HDFC Flexi Cap Fund", category: "Equity", return3y: "19.1%", risk: "High" }
    ],
    "Capital Preservation": [
        { name: "Axis Liquid Fund", category: "Debt", return3y: "5.8%", risk: "Very Low" },
        { name: "SBI Overnight Fund", category: "Debt", return3y: "4.2%", risk: "Lowest" },
        { name: "Aditya Birla SL Low Duration", category: "Debt", return3y: "6.1%", risk: "Low" }
    ],
    "Aggressive Tactical": [
        { name: "Nippon India ETF Gold BeES", category: "Gold", return3y: "38.5%", risk: "High" },
        { name: "SBI Gold Fund", category: "Gold", return3y: "37.2%", risk: "High" },
        { name: "ICICI Pru Commodities Fund", category: "Thematic", return3y: "42.1%", risk: "Very High" }
    ]
};

async function submitForm() {
  const btn = document.querySelector('.primary-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = `<i data-feather="loader" class="spin"></i> Analyzing...`;
  
  const payload = {
    age: Number(document.getElementById("age").value),
    risk_score: Number(document.getElementById("risk_score").value),
    investment_horizon: Number(document.getElementById("investment_horizon").value),
    liquidity_need: Number(document.getElementById("liquidity_need").value),
    expected_return: Number(document.getElementById("expected_return").value),
    income_stability: Number(document.getElementById("income_stability").value)
  };

  try {
    const response = await fetch(
      "https://mf-recommender-backend-production.up.railway.app/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    // Hide welcome, show dashboard
    document.getElementById("welcome-screen").style.display = 'none';
    document.getElementById("dashboard").classList.remove("hidden");

    // 1. Update Cluster Info
    const clusterMap = {
        0: "Balanced Growth",
        1: "Capital Preservation",
        2: "Aggressive Tactical"
    };
    
    const clusterName = data.recommended_cluster; // Make sure backend sends string or map int
    // If backend sends int (0,1,2), use: const clusterName = clusterMap[data.cluster]; 
    // Assuming backend sends the string name from your example or mapped int.
    // Let's assume the API returns the mapped name or we map it here:
    // ** Update this line based on your exact API response key **
    const finalClusterName = clusterMap[data.cluster] || data.recommended_cluster;

    document.getElementById("cluster-name").innerText = finalClusterName;
    
    // Tags
    const tagsContainer = document.getElementById("cluster-tags");
    tagsContainer.innerHTML = '';
    const tags = finalClusterName.includes("Growth") ? ["Equity", "Long Term", "High Alpha"] 
                 : finalClusterName.includes("Preservation") ? ["Debt", "Stable", "Low Risk"] 
                 : ["Gold", "Thematic", "High Volatility"];
    tags.forEach(t => tagsContainer.innerHTML += `<span>${t}</span>`);

    // 2. Confidence
    document.getElementById("confidence-text").innerText = `${Math.round(data.confidence || 0.85 * 100)}%`; // Fallback if API lacks confidence key

    // 3. Probability Bars
    const probContainer = document.getElementById("probability-bars");
    probContainer.innerHTML = "";
    
    // Check if probabilities exist in response
    const probs = data.probabilities || [0.1, 0.1, 0.8]; // Fallback dummy
    const labels = ["Balanced Growth", "Capital Preservation", "Aggressive Tactical"];
    
    probs.forEach((p, i) => {
        probContainer.innerHTML += `
        <div class="prob-row">
            <div class="prob-label">${labels[i]}</div>
            <div class="prob-track">
                <div class="prob-fill" style="width: ${p * 100}%"></div>
            </div>
            <div class="prob-val">${(p * 100).toFixed(1)}%</div>
        </div>`;
    });

    // 4. SHAP Image
    if(data.shap_plot_base64) {
        document.getElementById("shap-image").src = `data:image/png;base64,${data.shap_plot_base64}`;
    }

    // 5. Populate Fund Table
    const fundList = document.getElementById("fund-list");
    fundList.innerHTML = "";
    const recFunds = FUND_DATA[finalClusterName] || [];
    
    recFunds.forEach(fund => {
        fundList.innerHTML += `
        <tr>
            <td class="fund-name">${fund.name}</td>
            <td>${fund.category}</td>
            <td class="fund-return">+${fund.return3y}</td>
            <td>${fund.risk}</td>
            <td><button style="padding:5px 10px; border:1px solid #ddd; border-radius:4px; background:white; cursor:pointer;">View</button></td>
        </tr>
        `;
    });

    feather.replace(); // Refresh icons

  } catch (err) {
    alert("Error connecting to AI Backend. Please check console.");
    console.error(err);
  } finally {
    btn.innerHTML = `<i data-feather="cpu"></i> Generate Plan`;
    feather.replace();
  }
}
