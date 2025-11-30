let allData = [];

// Risk mapping based on numeric values
function returnCategory(val) {
  val = Number(val);
  if (val > 15) return "High";
  if (val >= 8) return "Moderate";
  return "Low";
}

function riskCategory(std) {
  std = Number(std);
  if (std > 20) return "High";
  if (std >= 10) return "Moderate";
  return "Low";
}

function adjRiskCategory(beta) {
  beta = Number(beta);
  if (beta > 0.7) return "High";
  if (beta >= 0.3) return "Moderate";
  return "Low";
}

function renderTable(rows) {
  let html = `<table class="table">
    <thead>
      <tr>
        <th>Fund Name</th>
        <th>1Y Return %</th>
        <th>Std Dev</th>
        <th>Beta</th>
      </tr>
    </thead>
    <tbody>`;

  rows.forEach(r => {
    html += `<tr>
      <td>${r.Funds}</td>
      <td>${r["Return (%)1 yr"]}</td>
      <td>${r["Standard Deviation"]}</td>
      <td>${r.Beta}</td>
    </tr>`;
  });

  html += "</tbody></table>";
  document.getElementById("tableWrap").innerHTML = html;
}

// Plot risk vs return scatter
function drawScatter(rows) {
  const trace = {
    x: rows.map(r => Number(r["Standard Deviation"])),
    y: rows.map(r => Number(r["Return (%)1 yr"])),
    text: rows.map(r => r.Funds),
    mode: "markers",
    type: "scatter",
    marker: { size: 12 }
  };

  const layout = {
    title: "Risk vs Return",
    xaxis: { title: "Standard Deviation (Risk)" },
    yaxis: { title: "1Y Return (%)" }
  };

  Plotly.newPlot("scatter", [trace], layout, {responsive:true});
}

function applyFilters() {
  const fType = document.getElementById("fundType").value;  // always cluster 0 for now
  const rType = document.getElementById("returnType").value;
  const riskT = document.getElementById("riskType").value;
  const adjT = document.getElementById("adjRiskType").value;
  const topN = Number(document.getElementById("topN").value);

  // Step 1 — filter by cluster
  let rows = allData.filter(r => String(r.cluster) === fType);

  // Step 2 — filter by return category
  rows = rows.filter(r => returnCategory(r["Return (%)1 yr"]) === rType);

  // Step 3 — filter by risk category
  rows = rows.filter(r => riskCategory(r["Standard Deviation"]) === riskT);

  // Step 4 — filter by adjusted risk category
  rows = rows.filter(r => adjRiskCategory(r.Beta) === adjT);

  // Step 5 — sort by return (descending)
  rows.sort((a,b) => Number(b["Return (%)1 yr"]) - Number(a["Return (%)1 yr"]));

  // Step 6 — select top N
  rows = rows.slice(0, topN);

  renderTable(rows);
  drawScatter(rows);
}

// Load CSV
Papa.parse("mutual_fund_recommendations.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    allData = results.data;
    applyFilters();
  }
});

document.getElementById("applyBtn").addEventListener("click", applyFilters);
