let fundData = [];
let returnChart = null;
let stdChart = null;

// Load CSV
fetch("mutual_fund_recommendations.csv")
    .then(response => response.text())
    .then(csv => {
        fundData = parseCSV(csv);
    });

function parseCSV(csv) {
    const rows = csv.split("\n").map(r => r.trim()).filter(r => r.length > 0);
    const headers = rows[0].split(",");

    return rows.slice(1).map(row => {
        const values = row.split(",");
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        obj["cluster"] = Number(obj["cluster"]);
        obj["Return (%)1 yr"] = Number(obj["Return (%)1 yr"]);
        obj["Return (%)2 yrs"] = Number(obj["Return (%)2 yrs"]);
        obj["Return (%)3 yrs"] = Number(obj["Return (%)3 yrs"]);
        obj["Standard Deviation"] = Number(obj["Standard Deviation"]);
        obj["Beta"] = Number(obj["Beta"]);
        return obj;
    });
}

// Category → Cluster mapping
const clusterMap = {
    "FoFs & Gold": 0,
    "Equity": 1,
    "Hybrid": 2,
    "Debt": 3
};

function filterFunds() {
    const fundType = document.getElementById("fundType").value;
    const clusterNumber = clusterMap[fundType];
    const topN = Number(document.getElementById("topN").value);

    let filtered = fundData.filter(f => f.cluster === clusterNumber);

    let resultDiv = document.getElementById("result");

    if (filtered.length === 0) {
        resultDiv.innerHTML = "<h3>No funds found</h3>";
        clearCharts();
        return;
    }

    filtered = filtered.slice(0, topN);

    // Show table
    resultDiv.innerHTML = `
        <table>
            <tr>
                <th>Fund</th>
                <th>3Y Return</th>
                <th>Std Dev</th>
                <th>Beta</th>
            </tr>
            ${filtered.map(f => `
                <tr>
                    <td>${f["Funds"]}</td>
                    <td>${f["Return (%)3 yrs"]}</td>
                    <td>${f["Standard Deviation"]}</td>
                    <td>${f["Beta"]}</td>
                </tr>
            `).join("")}
        </table>
    `;

    plotReturnChart(filtered);
    plotStdChart(filtered);
}

function clearCharts() {
    if (returnChart) returnChart.destroy();
    if (stdChart) stdChart.destroy();
}

function plotReturnChart(funds) {
    const labels = ["1Y Return", "2Y Return", "3Y Return"];

    const datasets = funds.map(fund => ({
        label: fund["Funds"],
        data: [
            fund["Return (%)1 yr"],
            fund["Return (%)2 yrs"],
            fund["Return (%)3 yrs"]
        ],
        fill: false,
        tension: 0.2
    }));

    if (returnChart) returnChart.destroy();

    const ctx = document.getElementById("returnChart").getContext("2d");
    returnChart = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: "Returns (1Y, 2Y, 3Y)" } }
        }
    });
}

function plotStdChart(funds) {
    const labels = funds.map(f => f["Funds"]);
    const values = funds.map(f => f["Standard Deviation"]);

    if (stdChart) stdChart.destroy();

    const ctx = document.getElementById("stdChart").getContext("2d");
    stdChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Standard Deviation",
                data: values
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: "Risk (Std. Deviation)" } }
        }
    });
}
