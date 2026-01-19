async function submitForm() {
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error("API returned error");
    }

    const data = await response.json();

    // ✅ SHOW RESULT CARD
    document.getElementById("result-card").classList.remove("hidden");

    // ✅ UPDATE CONTENT
    document.getElementById("cluster-name").innerText =
      "Recommended Cluster: " + data.recommended_cluster;

    document.getElementById("confidence-text").innerText =
      "Confidence: " + (data.confidence * 100).toFixed(2) + "%";

    document.getElementById("confidence-bar").style.width =
      Math.round(data.confidence * 100) + "%";

  } catch (error) {
    console.error("Prediction failed:", error);
    alert("Something went wrong. Check console.");
  }
}
