let data = [];
let returnChart = null;
let stdChart = null;

// Load CSV
fetch("mutual_fund_recommendations.csv")
    .then(res => res.text())
    .then(csv => data = parseCSV(csv));

function parseCSV(csv) {
    const rows = csv.trim().split("\n");
    const headers = rows[0].split(",");

    return rows.slice(1).map(row => {
        const cols = row.split(",");
        let obj = {};
        headers.forEach((h, i) => obj[h] = cols[i]);

        obj.cluster = Number(obj.cluster);
        obj["Return (%)1 yr"] = Number(obj["Return (%)1 yr"]);
        obj["Return (%)2 yrs"] = Number(obj["Return (%)2 yrs"]);
        obj["Return (%)3 yrs"] = Number(obj["Return (%)3 yrs"]);
        obj["Standard Deviation"] = Number(obj["Standard Deviation"]);

        return obj;
    });
}

function showFunds() {
    const cluster = Number(document.getElementById("clusterSelect").value);
    const topN = Number(document.getElementById("topN").value);

    let filtered = data.filter(f => f.cluster === cluster);

    const tableDiv = document.getElementById("fundTable");
    tableDiv.innerHTML = "";

    if (filtered.length === 0) {
        tableDiv.innerHTML = "<div class='no-data'>No funds found</div>";
        clearCharts();
        return;
    }

    // Sort by 3Y return (descending)
    filtered.sort((a, b) => b["Return (%)3 yrs"] - a["Return (%)3 yrs"]);

    const topFunds = filtered.slice(0, topN);
    const top5ForCharts = filtered.slice(0, 5);

    // Create professional table
    tableDiv.innerHTML = `
        <table class="fund-table">
            <thead>
                <tr>
                    <th>Fund Name</th>
                    <th>3Y Return (%)</th>
                    <th>Std Dev</th>
                    <th>Beta</th>
                </tr>
            </thead>
            <tbody>
                ${topFunds.map(f => `
                    <tr>
                        <td>${f["Funds"]}</td>
                        <td>${f["Return (%)3 yrs"]}</td>
                        <td>${f["Standard Deviation"]}</td>
                        <td>${f["Beta"]}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    plotReturnChart(top5ForCharts);
    plotStdChart(top5ForCharts);
}

function clearCharts() {
    if (returnChart) returnChart.destroy();
    if (stdChart) stdChart.destroy();
}

function plotReturnChart(funds) {
    if (returnChart) returnChart.destroy();

    const labels = ["1Y", "2Y", "3Y"];
    const datasets = funds.map(f => ({
        label: f["Funds"],
        data: [
            f["Return (%)1 yr"],
            f["Return (%)2 yrs"],
            f["Return (%)3 yrs"]
        ],
        borderWidth: 2,
        fill: false,
        tension: 0.2
    }));

    const ctx = document.getElementById("returnChart").getContext("2d");
    returnChart = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            plugins: {
                legend: { position: "bottom" },
            }
        }
    });
}

function plotStdChart(funds) {
    if (stdChart) returnChart?.destroy();

    const ctx = document.getElementById("stdChart").getContext("2d");
    stdChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: funds.map(f => f["Funds"]),
            datasets: [{
                label: "Standard Deviation",
                data: funds.map(f => f["Standard Deviation"]),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            }
        }
    });
}
