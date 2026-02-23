# 📈 TradeFlow — Playbook Backtesting Journal

A professional trading journal built with React, featuring your complete 7-setup playbook, grader, timezone‑aware statistics, visual charts (powered by **recharts**), mindset tracker, and weekly reviews.

---

## 🚀 Quick Start (Run Locally)

### Step 1 — Install Node.js
Download and install Node.js (free): https://nodejs.org  
Choose the **LTS version** (recommended).

### Step 2 — Open Terminal / Command Prompt
- **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
- **Windows**: Press `Win + R`, type "cmd", press Enter

### Step 3 — Navigate to the project folder
```bash
cd path/to/trading-journal
```
(Replace `path/to` with the actual folder location, e.g. `cd Desktop/trading-journal`)

### Step 4 — Install dependencies
```bash
npm install
```
This downloads React and all required packages (~2 minutes).

### Step 5 — Start the app
```bash
npm start
```
The app will open automatically at **http://localhost:3000** in your browser. 🎉

---

## 🌐 Deploy FREE to GitHub Pages (Public URL)

This gives you a permanent URL like `https://yourusername.github.io/trading-journal`

### Step 1 — Create a free GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** icon → **New repository**
2. Name it: `trading-journal`
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Update your homepage URL
Open `package.json` and replace this line:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/trading-journal",
```
With your actual GitHub username, e.g.:
```json
"homepage": "https://john_trader.github.io/trading-journal",
```

### Step 4 — Push your code to GitHub
In Terminal, inside your project folder:
```bash
git init
git add .
git commit -m "Initial commit - Trading Journal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trading-journal.git
git push -u origin main
```

### Step 5 — Deploy to GitHub Pages
```bash
npm run deploy
```
This builds and publishes your app automatically.

### Step 6 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Branch**, select `gh-pages` → `/ (root)`
4. Click **Save**

### Step 7 — Visit your live app! 🎉
Go to: `https://YOUR_USERNAME.github.io/trading-journal`

> ⏱ It may take 1–2 minutes for the site to go live the first time.

---

## 🔄 Update Your App Later

After making changes:
```bash
npm run deploy
```
That's it — your live site updates automatically.

---

## 📂 Project Structure

```
trading-journal/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── AddTradeModal.jsx   # Trade entry form
│   │   └── UI.jsx              # Shared components
│   ├── data/
│   │   └── playbook.js         # All 7 setups + helpers
│   ├── hooks/
│   │   └── useStore.js         # localStorage state
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main overview
│   │   ├── Playbook.jsx        # Setup cards
│   │   ├── TradeLog.jsx        # Trade table
│   │   ├── SetupGrader.jsx     # Grade your setups
│   │   └── OtherPages.jsx      # Checklist, Stats, Weekly, Mistakes, Mindset
│   ├── App.js                  # Root component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
└── package.json
```

---

## 💾 Data Storage

All trade data is stored in your **browser's localStorage** — no backend needed, no server costs, completely private. Data persists between sessions on the same browser/device.

> **To back up your data**: Open browser DevTools → Application → Local Storage → copy the values for `tf_trades`, `tf_weekly`, `tf_mindset`.

---

## 🛠 Playbook Setups Included

| Setup | Type | Condition |
|-------|------|-----------|
| 10 Min ORB | Breakout | Any — mark at 9:40am |
| Vomy | Transition | Price crosses ribbon |
| iVomy | Transition | Inverse Vomy |
| Flag Into Ribbon | Trend | Pullback to ribbon |
| Divergence From Extreme | Reversal | Range + oscillator div |
| 1Min EOD Divergence | Reversal | 3–4pm end of day |
| Tweezer Bottom | Reversal | Wicky Wicky pattern |

---

## ❓ Troubleshooting

**`npm: command not found`** → Install Node.js from https://nodejs.org

**Port 3000 already in use** → Run `npm start` again, it'll use port 3001 automatically

**GitHub Pages shows 404** → Wait 2 minutes and refresh, or check Settings → Pages is set to `gh-pages` branch

**White screen after deploy** → Double-check `homepage` in `package.json` matches your GitHub username exactly
