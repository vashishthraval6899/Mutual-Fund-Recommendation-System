let data = [];
let returnChart = null;
let stdChart = null;

// Use a nice color palette for the lines
const colors = [
    '#2563eb', '#7c3aed', '#db2777', '#dc2626', '#ea580c', 
    '#d97706', '#65a30d', '#059669', '#0891b2', '#4f46e5'
];

// Load CSV file - ***UPDATED FILENAME HERE***
fetch("Top_Funds_Cluster_Wise.csv")
    .then(res => res.text())
    .then(csv => {
        data = parseCSV(csv);
    })
    .catch(e => console.error("Error loading CSV. Make sure you are running this on a local server (e.g., Live Server extension).", e));

// Convert CSV → JSON
function parseCSV(csv) {
    const rows = csv.split("\n").filter(r => r.trim().length > 0);
    const headers = rows[0].split(",");

    return rows.slice(1).map(row => {
        const cols = row.split(",");
        let obj = {};
        headers.forEach((h, i) => obj[h] = cols[i]);

        // Clean numbers (Keys match your new CSV headers: cluster, Return (%)1 yr, etc.)
        obj["cluster"] = Number(obj["cluster"]);
        obj["Return (%)1 yr"] = parseFloat(obj["Return (%)1 yr"]);
        obj["Return (%)2 yrs"] = parseFloat(obj["Return (%)2 yrs"]);
        obj["Return (%)3 yrs"] = parseFloat(obj["Return (%)3 yrs"]);
        obj["Standard Deviation"] = parseFloat(obj["Standard Deviation"]);
        obj["Beta"] = parseFloat(obj["Beta"]);

        return obj;
    });
}

function showFunds() {
    const cluster = Number(document.getElementById("clusterSelect").value);
    const filtered = data.filter(f => f.cluster === cluster);
    const dashboard = document.getElementById("dashboard");
    const tableDiv = document.getElementById("fundTable");

    // Reveal Dashboard
    dashboard.classList.remove("hidden");

    if (filtered.length === 0) {
        tableDiv.innerHTML = "<div style='padding:20px; text-align:center'>No funds found matching this criteria.</div>";
        clearCharts();
        return;
    }

    // --- Prepare Data for Table and Charts ---
    // The table will show all funds, but the charts will be limited to top 10.
    const chartData = filtered.slice(0, 10);

    // Render Table with formatting and Ranks
    tableDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Fund Name</th>
                    <th>Return (1Y)</th>
                    <th>Return (3Y)</th>
                    <th>Std Dev (Risk)</th>
                    <th>Beta</th>
                </tr>
            </thead>
            <tbody>
            ${filtered.map((f, index) => `
                <tr>
                    <td style="font-weight:600; color:var(--text-muted);">${index + 1}</td>
                    <td class="fund-name">${f["Funds"]}</td>
                    <td>${f["Return (%)1 yr"].toFixed(2)}%</td>
                    <td style="font-weight:bold; color: ${f["Return (%)3 yrs"] > 0 ? '#16a34a' : '#dc2626'}">
                        ${f["Return (%)3 yrs"].toFixed(2)}%
                    </td>
                    <td>${f["Standard Deviation"].toFixed(2)}</td>
                    <td>${f["Beta"].toFixed(2)}</td>
                </tr>
            `).join("")}
            </tbody>
        </table>
    `;

    // Plot charts using the limited data set
    plotReturnChart(chartData);
    plotStdChart(chartData);
    
    // Smooth scroll to results
    dashboard.scrollIntoView({ behavior: 'smooth' });
}

function clearCharts() {
    if (returnChart) returnChart.destroy();
    if (stdChart) stdChart.destroy();
}

function plotReturnChart(funds) {
    if (returnChart) returnChart.destroy();

    const labels = ["1 Year", "2 Years", "3 Years"];
    
    const datasets = funds.map((f, index) => ({
        label: f["Funds"],
        data: [
            f["Return (%)1 yr"],
            f["Return (%)2 yrs"],
            f["Return (%)3 yrs"]
        ],
        fill: false,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        tension: 0.3, // Makes line smooth
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
    }));

    const ctx = document.getElementById("returnChart").getContext("2d");

    returnChart = new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6 } },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1e293b',
                    bodyColor: '#475569',
                    borderColor: '#e2e8f0',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    grid: { color: '#f1f5f9' },
                    ticks: { callback: (val) => val + '%' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function plotStdChart(funds) {
    if (stdChart) stdChart.destroy();

    // Use rank as the label for clarity, and the fund name in the tooltip
    const labels = funds.map((f, index) => `Rank ${index + 1}`); 
    const values = funds.map(f => f["Standard Deviation"]);

    const ctx = document.getElementById("stdChart").getContext("2d");

    // Create a gradient for bars
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#60a5fa');

    stdChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Standard Deviation (Risk)",
                data: values,
                backgroundColor: gradient,
                borderRadius: 6,
                barPercentage: 0.8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    // Show the actual fund name in the tooltip
                    callbacks: {
                         title: (tooltipItem) => {
                             return funds[tooltipItem[0].dataIndex].Funds;
                         },
                         label: (tooltipItem) => {
                             return `Risk (Std. Dev): ${tooltipItem.formattedValue}`;
                         }
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1e293b',
                    bodyColor: '#475569',
                    borderColor: '#e2e8f0',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}
