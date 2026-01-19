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
    console.log("API RESPONSE:", data);

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
    console.log("Prediction Result:", data);

  } catch (err) {
    console.error("Prediction failed:", err);
  }
}
