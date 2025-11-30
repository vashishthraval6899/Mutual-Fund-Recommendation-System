let data = [];
let returnChart = null;
let stdChart = null;

// Load CSV
fetch("mutual_fund_recommendations.csv")
    .then(res => res.text())
    .then(csv => {
        data = parseCSV(csv);
    });

// CSV → JSON
function parseCSV(csv) {
    const rows = csv.split("\n").filter(r => r.trim() !== "");
    const headers = rows[0].split(",");

    return rows.slice(1).map(r => {
        const cols = r.split(",");
        let obj = {};

        headers.forEach((h, i) => obj[h] = cols[i]);

        obj["cluster"] = Number(obj["cluster"]);
        obj["Return (%)1 yr"] = Number(obj["Return (%)1 yr"]);
        obj["Return (%)2 yrs"] = Number(obj["Return (%)2 yrs"]);
        obj["Return (%)3 yrs"] = Number(obj["Return (%)3 yrs"]);
        obj["Standard Deviation"] = Number(obj["Standard Deviation"]);

        return obj;
    });
}

// UI Button
document.getElementById("loadBtn").addEventListener("click", showFunds);

// Show Table + Charts
function showFunds() {
    const cluster = Number(document.getElementById("clusterSelect").value);
    const topN = Number(document.getElementById("topN").value);

    let filtered = data.filter(f => f.cluster === cluster);

    // Sort by 3-year return
    filtered.sort((a, b) => b["Return (%)3 yrs"] - a["Return (%)3 yrs"]);

    filtered = filtered.slice(0, topN);

    const tableDiv = document.getElementById("fundTable");
    tableDiv.innerHTML = `
        <table>
            <tr>
                <th>Fund Name</th>
                <th>Return 3Y (%)</th>
                <th>Risk (Std Dev)</th>
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

function plotReturnChart(funds) {
    if (returnChart) returnChart.destroy();

    const labels = ["1Y", "2Y", "3Y"];

    const datasets = funds.map((f, i) => ({
        label: f["Funds"],
        data: [
            f["Return (%)1 yr"],
            f["Return (%)2 yrs"],
            f["Return (%)3 yrs"]
        ],
        borderColor: `hsl(${i * 60}, 70%, 45%)`,
        backgroundColor: `hsl(${i * 60}, 70%, 65%)`,
        tension: 0.3
    }));

    const ctx = document.getElementById("returnChart").getContext("2d");

    returnChart = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" },
                title: {
                    display: true,
                    text: "Returns Over Time",
                    padding: 12
                }
            }
        }
    });
}

function plotStdChart(funds) {
    if (stdChart) stdChart.destroy();

    const labels = funds.map(f => f["Funds"]);
    const values = funds.map(f => f["Standard Deviation"]);

    const ctx = document.getElementById("stdChart").getContext("2d");

    stdChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Std Deviation",
                data: values,
                backgroundColor: "hsl(210, 70%, 50%)"
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Risk (Standard Deviation)",
                    padding: 12
                }
            }
        }
    });
}
