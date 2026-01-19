async function submitForm() {
  const payload = {
    age: Number(document.getElementById("age").value),
    risk_score: Number(document.getElementById("risk_score").value),
    investment_horizon: Number(document.getElementById("investment_horizon").value),
    liquidity_need: Number(document.getElementById("liquidity_need").value),
    expected_return: Number(document.getElementById("expected_return").value),
    income_stability: Number(document.getElementById("income_stability").value)
  };

  const response = await fetch(
    "https://mf-recommender-backend-production.up.railway.app/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );

  const data = await response.json();

  // Show dashboard
  document.getElementById("dashboard").classList.remove("hidden");

  // Cluster info
  document.getElementById("cluster-name").innerText =
    data.recommended_cluster;

  document.getElementById("confidence-text").innerText =
    `Confidence: ${(data.confidence * 100).toFixed(2)}%`;

  document.getElementById("confidence-bar").style.width =
    `${Math.round(data.confidence * 100)}%`;

  // Probability bars
  const clusterNames = [
    "Balanced Growth",
    "Capital Preservation",
    "Aggressive Tactical"
  ];

  const probContainer = document.getElementById("probability-bars");
  probContainer.innerHTML = "";

  data.probabilities.forEach((prob, idx) => {
    probContainer.innerHTML += `
      <div class="prob-row">
        <span>${clusterNames[idx]}</span>
        <div class="prob-track">
          <div class="prob-fill" style="width:${(prob * 100).toFixed(1)}%"></div>
        </div>
        <span>${(prob * 100).toFixed(1)}%</span>
      </div>
    `;
  });

  // SHAP Image
  document.getElementById("shap-image").src =
    `data:image/png;base64,${data.shap_plot_base64}`;
}
