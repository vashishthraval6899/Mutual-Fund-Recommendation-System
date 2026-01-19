:root {
  --primary: #4f46e5;      /* Indigo 600 */
  --primary-glow: #818cf8; /* Indigo 400 */
  --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  --glass-bg: rgba(255, 255, 255, 0.95);
  --glass-border: rgba(255, 255, 255, 0.4);
  --text-main: #0f172a;
  --text-muted: #64748b;
  --radius: 16px;
  --shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
}

body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg-gradient);
  color: var(--text-main);
  min-height: 100vh;
}

/* Layout */
.main-wrapper {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 320px;
  background: white;
  padding: 30px;
  box-shadow: 5px 0 30px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary);
}

.brand h2 { margin: 0; font-size: 1.5rem; letter-spacing: -0.5px; }
.highlight { color: #1e293b; }

.tagline {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: -20px;
}

/* Inputs */
.input-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  transition: all 0.2s;
}

.input-group input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.range-val {
  float: right;
  font-weight: bold;
  color: var(--primary);
  margin-top: -30px;
  margin-right: 5px;
}

/* Button */
.primary-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px -5px rgba(79, 70, 229, 0.5);
}

.primary-btn:active { transform: translateY(0); }

/* Main Content */
.content-area {
  margin-left: 320px;
  padding: 40px;
  width: calc(100% - 320px);
}

/* Welcome Screen */
.welcome-screen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-muted);
}
.placeholder-content i { width: 64px; height: 64px; margin-bottom: 20px; color: #cbd5e1; }
.placeholder-content h1 { color: var(--text-main); margin-bottom: 10px; }

/* Dashboard Grid */
.dashboard.hidden { display: none; }
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 25px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Stat Cards */
.header-stat {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.main-rec h2 { font-size: 2.5rem; margin: 10px 0; color: var(--primary); }
.tags span {
  background: #eff6ff;
  color: var(--primary);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 5px;
}

/* Glass Cards */
.card.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;
  background: rgba(255,255,255,0.5);
}

.card-header h3 { margin: 0; display: flex; align-items: center; gap: 10px; font-size: 1rem; }
.card-body { padding: 25px; }

/* Probability Bars */
.prob-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
}
.prob-label { width: 140px; font-weight: 500; }
.prob-track {
  flex-grow: 1;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  margin: 0 15px;
  overflow: hidden;
}
.prob-fill { height: 100%; background: var(--primary); border-radius: 4px; transition: width 1s ease-out; }

/* SHAP Image */
.shap-img { width: 100%; border-radius: 8px; mix-blend-mode: multiply; }
.caption { text-align: center; font-size: 0.75rem; color: var(--text-muted); margin-top: 10px; }

/* Table */
.fund-table { width: 100%; border-collapse: collapse; }
.fund-table th { text-align: left; padding: 15px; color: var(--text-muted); font-size: 0.85rem; border-bottom: 1px solid #e2e8f0; }
.fund-table td { padding: 15px; font-size: 0.95rem; border-bottom: 1px solid #f1f5f9; }
.fund-name { font-weight: 600; color: var(--text-main); }
.fund-return { color: #10b981; font-weight: 700; }

/* Responsive */
@media (max-width: 900px) {
  .sidebar { width: 100%; height: auto; position: relative; }
  .content-area { margin-left: 0; width: 100%; }
  .header-stat, .charts-grid { grid-template-columns: 1fr; }
}
