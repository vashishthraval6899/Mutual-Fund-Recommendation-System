// Data from CSV
const FUND_DATA = {
    "Balanced Growth": [
        { name: "ICICI Pru Pharma Healthcare", cat: "Equity", r1: 5.36, r2: 29.94, r3: 26.65, beta: 0.76, sharpe: 0.43 },
        { name: "Kotak Nifty Midcap 50 ETF", cat: "Equity", r1: 10.29, r2: 23.2, r3: 25.36, beta: 1.0, sharpe: 0.36 },
        { name: "SBI Healthcare Opp Fund", cat: "Equity", r1: 2.66, r2: 26.68, r3: 24.09, beta: 0.87, sharpe: 0.41 },
        { name: "HDFC Flexi Cap Fund", cat: "Equity", r1: 10.33, r2: 24.96, r3: 21.89, beta: 0.82, sharpe: 0.43 },
        { name: "Parag Parikh Flexi Cap", cat: "Equity", r1: 8.68, r2: 21.08, r3: 21.65, beta: 0.57, sharpe: 0.49 }
    ],
    "Capital Preservation": [
        { name: "Bank of India Overnight Fund", cat: "Debt", r1: 6.1, r2: 6.45, r3: 6.51, beta: 0.98, sharpe: -0.36 },
        { name: "Axis Overnight Fund", cat: "Debt", r1: 6.02, r2: 6.37, r3: 6.43, beta: 0.74, sharpe: -0.51 },
        { name: "UTI Overnight Fund", cat: "Debt", r1: 5.97, r2: 6.33, r3: 6.39, beta: 1.0, sharpe: -0.59 },
        { name: "Invesco India Overnight Fund", cat: "Debt", r1: 5.95, r2: 6.32, r3: 6.38, beta: 0.76, sharpe: -0.61 },
        { name: "Nippon India Overnight Fund", cat: "Debt", r1: 5.97, r2: 6.31, r3: 6.37, beta: 1.0, sharpe: -0.63 }
    ],
    "Aggressive Tactical": [
        { name: "Mirae Asset NYSE FANG+ ETF", cat: "Global", r1: 81.73, r2: 67.49, r3: 71.07, beta: 0.47, sharpe: 0.49 },
        { name: "Mirae Asset NYSE FANG+ ETF (Direct)", cat: "Equity", r1: 49.31, r2: 53.07, r3: 60.85, beta: 0.88, sharpe: 0.47 },
        { name: "DSP World Gold Mining FoF", cat: "Gold/FoF", r1: 80.51, r2: 61.6, r3: 44.46, beta: 0.25, sharpe: 0.38 },
        { name: "Mirae Asset S&P 500 Top 50", cat: "Global", r1: 55.57, r2: 48.07, r3: 40.6, beta: 0.3, sharpe: 0.4 },
        { name: "HDFC Silver ETF FoF", cat: "Commodity", r1: 50.51, r2: 40.55, r3: 33.05, beta: 0.04, sharpe: 0.35 }
    ]
};

// Fixed Slider Listeners
const sliderIds = ["age", "risk_score", "investment_horizon", "liquidity_need", "expected_return"];
sliderIds.forEach(id => {
    document.getElementById(id).addEventListener("input", (e) => {
        let val = e.target.value;
        const dispId = "disp_" + id.replace("_score", "").replace("investment_", "").replace("liquidity_need", "liq").replace("expected_return", "return");
        let suffix = "";
        if (id.includes("risk") || id.includes("liquidity")) suffix = "/10";
        if (id.includes("horizon")) suffix = " Years";
        if (id.includes("return")) suffix = "%";
        document.getElementById(dispId).innerText = val + suffix;
    });
});

let mainChart = null;

async function getRecommendation() {
    const risk = parseInt(document.getElementById("risk_score").value);
    const horizon = parseInt(document.getElementById("investment_horizon").value);

    // AI logic
    let cluster = "Balanced Growth";
    if (risk <= 4 || horizon <= 2) cluster = "Capital Preservation";
    else if (risk >= 8) cluster = "Aggressive Tactical";

    document.getElementById("welcome-view").style.display = "none";
    document.getElementById("dashboard-view").classList.remove("hidden");
    document.getElementById("cluster-title").innerText = cluster;

    const funds = FUND_DATA[cluster];
    renderMainChart(funds);
    renderFundGrid(funds);
    feather.replace();
}

function renderMainChart(funds) {
    const ctx = document.getElementById("growthChart").getContext("2d");
    const avg3y = funds.reduce((a, b) => a + b.r3, 0) / funds.length;
    
    // Strictly 5 years
    let labels = ["Year 0", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
    let values = [100000];
    for(let i=1; i<=5; i++) values.push(values[i-1] * (1 + avg3y/100));

    if(mainChart) mainChart.destroy();
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wealth Growth (₹)',
                data: values,
                borderColor: '#4f46e5',
                fill: true,
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderFundGrid(funds) {
    const grid = document.getElementById("funds-grid");
    grid.innerHTML = "";

    funds.forEach((f, i) => {
        const card = document.createElement("div");
        card.className = "fund-card";
        card.innerHTML = `
            <div class="fund-info">
                <span>${f.cat}</span>
                <h4>${f.name}</h4>
            </div>
            <div class="analytics-box">
                <div class="chart-mini"><canvas id="fChart${i}"></canvas></div>
                <div class="risk-metrics">
                    <div class="metric-row"><span>Beta (Volatility)</span> <b>${f.beta}</b></div>
                    <div class="metric-row"><span>Sharpe (Efficiency)</span> <b>${f.sharpe}</b></div>
                    <div class="metric-row"><span>3Y Return</span> <b style="color:#10b981">${f.r3}%</b></div>
                </div>
            </div>
        `;
        grid.appendChild(card);

        // Render mini performance bar chart
        const ctx = document.getElementById(`fChart${i}`).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1Y', '2Y', '3Y'],
                datasets: [{
                    label: 'Return %',
                    data: [f.r1, f.r2, f.r3],
                    backgroundColor: ['#c7d2fe', '#818cf8', '#4f46e5'],
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, title: { display: true, text: 'Returns Comparison', font: {size: 10} } },
                scales: { y: { display: false }, x: { grid: { display: false } } }
            }
        });
    });
}
