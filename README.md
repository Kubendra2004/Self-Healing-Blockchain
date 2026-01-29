# Self-Healing Blockchain System

A robust blockchain security framework featuring real-time attack detection, automated self-healing mechanisms, and a modern interactive dashboard.

![Dashboard Preview] <img width="1875" height="763" alt="image" src="https://github.com/user-attachments/assets/c567f1bb-7e37-4863-b7ed-e086d7b5938d" />
## 🔗 Live Demo
**[View Dashboard](https://Kubendra2004.github.io/Self-Healing-Blockchain/)**  
*(Note: The live demo runs in "Demo Mode" with simulated data since it's hosted on GitHub Pages static hosting.)*

---

## ✨ Key Features

### 🛡️ Core Security
- **Automated Defense**: Instantly detects and blocks malicious actors.
- **Deep Impact Analysis**: Monitors transaction frequency, gas usage, and contract interactions.
- **Self-Healing**: Automatically triggers recovery modes and applies security patches without human intervention.
- **ML-Powered**: Uses TensorFlow.js and Isolation Forest to detect anomaly patterns.

### 🖥️ Interactive Dashboard (New!)
- **Real-time Updates**: Live WebSocket connection for instant alerts (no refresh needed).
- **Attack Simulator**: Built-in panel to launch simulated attacks (DDoS, Reentrancy, Double Spend) to test defenses.
- **Visual Analytics**: Glassmorphism UI showing network status, threat levels, and confidence scores.
- **Blacklist Management**: Searchable database of blocked addresses.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Socket.io-client, CSS Variables (Cyber-security theme)
- **Backend**: Node.js, Express, Socket.io, Web3.js
- **Blockchain**: Solidity, Truffle, Ganache (Local Testnet)
- **ML/AI**: TensorFlow.js, Isolation Forest

---

## 🚀 Getting Started (Run Locally)

To see the full system in action (with real blockchain interaction), run it locally:

### 1. Prerequisites
- Node.js (v16+)
- Ganache CLI (`npm install -g ganache-cli`)
- Truffle (`npm install -g truffle`)

### 2. Start Local Blockchain
Open a terminal and start Ganache:
```bash
ganache-cli -p 8545 -d
```
*(The `-d` flag ensures deterministic accounts so keys stay the same)*

### 3. Deploy Smart Contracts
In a new terminal (root directory):
```bash
npm install
npx truffle migrate
```

### 4. Start Backend Server
```bash
npm start
```
*Server runs on http://localhost:3000*

### 5. Start Frontend Dashboard
In a third terminal:
```bash
cd frontend
npm install
npm run dev
```
*Dashboard runs on http://localhost:5173*

> **Note**: Ensure `frontend/.env` has `VITE_DEMO_MODE=false` when running locally to connect to the real backend.

---

## 🎮 How to Use

1. **Monitor Status**: Watch the "System Status" card for real-time network health.
2. **Simulate Attacks**:
   - Go to the **Attack Simulator** card in the dashboard.
   - Select an attack type (e.g., "DDoS Attack").
   - Click **"🔥 Launch Attack"**.
3. **Verify Defense**:
   - A toast notification will appear instantly.
   - The attack will appear in the **Attack Alerts** feed.
   - If severity is high, **Recovery Mode** may automatically trigger.

---

## 📁 Project Structure

```
├── contracts/          # Solidity Smart Contracts (AttackDetection, SelfHealing)
├── migrations/         # Truffle deployment scripts
├── server/             # Node.js Express API & WebSocket Server
├── monitoring/         # Blockchain event listeners & ML models
├── frontend/           # React Dashboard Application
│   ├── src/
│   │   ├── components/ # Widgets (Status, Simulator, Alerts)
│   │   ├── services/   # socket.js, api.js
│   │   └── App.jsx     # Main Layout
└── test/               # Truffle tests
```

## 🤝 Contributing
1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
MIT License
