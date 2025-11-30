// script.js
let allData = [];

function mapRiskType(val) {
  if (val < 0.33) return "Low";
  if (val < 0.66) return "Moderate";
  return "High";
}

function renderTable(rows) {
  const wrap = document.getElementById("tableWrap");
  if (!rows.length) { wrap.innerHTML = "<p>No funds match the filters.</p>"; return; }
  let html = '<table class="table"><thead><tr><th>Fund Name</th><th>Return</th><th>Risk</th><th>Adj Risk</th></tr></thead><tbody>';
  rows.forEach(r => {
    html += `<tr><td>${r.Fund_Name}</td><td>${r.chosenReturn}%</td><td>${(Number(r.Risk_Score)).toFixed(2)}</td><td>${(Number(r.Adjusted_Risk)).toFixed(2)}</td></tr>`;
  });
  html += '</tbody></table>';
  wrap.innerHTML = html;
}

function drawScatter(rows, returnKey) {
  const x = rows.map(r => Number(r.Risk_Score));
  const y = rows.map(r => Number(r[returnKey]));
  const names = rows.map(r => r.Fund_Name);
  const trace = { x, y, text: names, mode:"markers", marker:{size:12} };
  const layout = { title: "Risk vs Return", xaxis:{title:"Risk Score"}, yaxis:{title: returnKey} };
  Plotly.newPlot("scatter",[trace], layout, {responsive:true});
}

function drawBar(rows, returnKey) {
  const names = rows.map(r => r.Fund_Name);
  const adj = rows.map(r => Number(r.Adjusted_Risk));
  const ret = rows.map(r => Number(r[returnKey]));
  const t1 = { x:names, y:adj, name:"Adjusted Risk", type:"bar" };
  const t2 = { x:names, y:ret, name:returnKey, type:"bar" };
  const layout = { title: "Adjusted Risk vs Return", barmode:"group" };
  Plotly.newPlot("bar",[t1,t2], layout, {responsive:true});
}

function applyFilters() {
  const cluster = document.getElementById("fundType").value;
  const returnKey = document.getElementById("returnType").value;
  const riskType = document.getElementById("riskType").value;
  const adjType = document.getElementById("adjRiskType").value;
  const topN = Number(document.getElementById("topN").value);

  let filtered = allData.filter(r => String(r.Cluster) === String(cluster));

  // map chosenReturn to help table and sorting
  filtered = filtered.map(r => ({...r, chosenReturn: Number(r[returnKey])}));

  if (riskType !== "Any") filtered = filtered.filter(r => mapRiskType(Number(r.Risk_Score)) === riskType);
  if (adjType !== "Any") filtered = filtered.filter(r => mapRiskType(Number(r.Adjusted_Risk)) === adjType);

  filtered.sort((a,b) => Number(b.chosenReturn) - Number(a.chosenReturn));
  filtered = filtered.slice(0, topN);

  renderTable(filtered);
  drawScatter(filtered, returnKey);
  drawBar(filtered, returnKey);
}

// load CSV using PapaParse
Papa.parse("data/funds.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    allData = results.data;
    // draw initial view
    applyFilters();
  }
});

document.getElementById("applyBtn").addEventListener("click", applyFilters);
