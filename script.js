async function callRecommendationAPI() {
  const apiUrl = "https://mf-recommender-backend-production.up.railway.app/predict";

  const payload = {
    age: 30,
    risk_score: 7,
    investment_horizon: 8,
    liquidity_need: 3,
    expected_return: 15,
    income_stability: 4
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    document.getElementById("result-card").classList.remove("hidden");

    document.getElementById("cluster-name").innerText =
      "Recommended Cluster: " + data.recommended_cluster;
    
    document.getElementById("confidence-text").innerText =
      "Confidence: " + (data.confidence * 100).toFixed(2) + "%";
    
    document.getElementById("confidence-bar").style.width =
      (data.confidence * 100).toFixed(0) + "%";

  } catch (error) {
    console.error("API ERROR:", error);
  }
}

async function submitForm() {
  const payload = {
    age: Number(document.getElementById("age").value),
    risk_score: Number(document.getElementById("risk_score").value),
    investment_horizon: Number(document.getElementById("investment_horizon").value),
    liquidity_need: Number(document.getElementById("liquidity_need").value),
    expected_return: Number(document.getElementById("expected_return").value),
    income_stability: Number(document.getElementById("income_stability").value)
  };

  console.log("Submitting payload:", payload);

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
    document.getElementById("result").innerHTML = `
  ✅ <b>Recommended Cluster:</b> ${data.recommended_cluster}<br>
  📊 <b>Confidence:</b> ${(data.confidence * 100).toFixed(2)}%
`;

  } catch (err) {
    console.error("Prediction failed:", err);
  }
}
