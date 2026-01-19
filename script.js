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
