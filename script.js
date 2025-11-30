let data = [];
let returnChart = null;
let stdChart = null;

// Load CSV file
fetch("mutual_fund_recommendations.csv")
    .then(res => res.text())
    .then(csv => {
        data = parseCSV(csv);
    });

// Convert CSV → JSON
function parseCSV(csv) {
    const rows = csv.split("\n").filter(r => r.trim().length > 0);
    const headers = rows[0].split(",");

    return rows.slice(1).map(row => {
        const cols = row.split(",");
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


function showFunds() {
    const cluster = Number(document.getElementById("clusterSelect").value);

    const filtered = data.filter(f => f.cluster === cluster);

    const tableDiv = document.getElementById("fundTable");
    tableDiv.innerHTML = "";

    if (filtered.length === 0) {
        tableDiv.innerHTML = "<h2>No funds found</h2>";
        clearCharts();
        return;
    }

    tableDiv.innerHTML = `
        <table>
            <tr>
                <th>Fund Name</th>
                <th>Return 3Y</th>
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
    if (returnChart) returnChart.destroy();

    const labels = ["1Y", "2Y", "3Y"];

    const datasets = funds.map(f => ({
        label: f["Funds"],
        data: [
            f["Return (%)1 yr"],
            f["Return (%)2 yrs"],
            f["Return (%)3 yrs"]
        ],
        fill: false,
        tension: 0.25
    }));

    const ctx = document.getElementById("returnChart").getContext("2d");

    returnChart = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Returns (1Y, 2Y, 3Y)"
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
                label: "Standard Deviation",
                data: values
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Risk (Std. Deviation)"
                }
            }
        }
    });
}
