# Self-Healing Blockchain

This project implements a self-healing blockchain system with attack detection and protection mechanisms, featuring a modern React dashboard for real-time monitoring.

## 🖥️ Live Demo

**[View Dashboard on GitHub Pages](https://yourusername.github.io/Self-healing_blockchain)** *(Update with your GitHub username)*

## ✨ Features

- **Attack Detection**: Real-time detection for various attack types including:
  - High transaction frequency
  - Excessive gas usage
  - Reentrancy attacks
  - DDoS attacks
  - Double spending
  - Data tampering
  - Sybil attacks

- **Self-Healing Mechanisms**:
  - Automatic blacklisting of attackers
  - Security patch application
  - Recovery mode controls

- **ML-Powered Detection**: Machine learning-based attack detection integration

- **Real-time Monitoring**: WebSocket-based blockchain monitoring with live alerts

## 📁 Project Structure

```
Self-healing_blockchain/
├── contracts/          # Solidity smart contracts
├── migrations/         # Truffle deployment scripts
├── monitoring/         # Blockchain monitoring modules
├── server/             # Express.js backend API
├── frontend/           # React dashboard (NEW!)
│   ├── src/
│   │   ├── App.jsx           # Main dashboard component
│   │   ├── services/api.js   # API layer with demo mode
│   │   └── index.css         # Cyber-security themed styles
│   └── package.json
└── test/               # Attack simulation tests
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm
- Truffle (for smart contracts)
- Ganache CLI (for local blockchain)

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Running the Frontend (Demo Mode)

The frontend works in **Demo Mode** with simulated data - perfect for showcasing:

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running with Real Blockchain

1. **Start Ganache CLI**:
   ```bash
   ganache-cli -p 8545
   ```

2. **Deploy Contracts**:
   ```bash
   npx truffle migrate
   ```

3. **Start Backend Server**:
   ```bash
   npm start
   ```

4. **Start Frontend** (connect to backend):
   ```bash
   cd frontend
   # Edit .env: VITE_DEMO_MODE=false
   npm run dev
   ```

## 🌐 Deploy to GitHub Pages

The frontend can be deployed as a static site to GitHub Pages:

```bash
cd frontend

# Build and deploy
npm run deploy
```

This will:
1. Build the production bundle
2. Push to the `gh-pages` branch
3. GitHub Pages will serve from: `https://yourusername.github.io/Self-healing_blockchain`

### After Deployment

1. Go to your repo's **Settings > Pages**
2. Ensure source is set to `gh-pages` branch
3. Your dashboard will be live in a few minutes!

## 🧪 Running Tests

```bash
# Attack detection tests
npx truffle test test/attack_detection_test.js

# Custom attack simulation
npx truffle test test/custom_attack_simulation.js
```

## 🛡️ Smart Contracts

| Contract | Description |
|----------|-------------|
| `AttackDetector.sol` | Monitors transactions and detects attack patterns |
| `SelfHealingManager.sol` | Orchestrates recovery actions and blacklisting |
| `SecureToken.sol` | Token contract with built-in security features |
| `VulnerabilityPatches.sol` | Applies security patches dynamically |

## 📊 Dashboard Features

| Widget | Description |
|--------|-------------|
| **System Status** | Network uptime, block count, node count, threat level |
| **Attack Alerts** | Real-time feed of detected attacks with severity badges |
| **Blacklist Table** | Searchable list of blocked attacker addresses |
| **ML Detections** | AI-powered anomaly detection with confidence scores |
| **Recovery Controls** | Trigger/exit recovery mode buttons |

## 🔧 Configuration

### Frontend Environment Variables

Create `frontend/.env`:

```env
# Demo mode (true for GitHub Pages, false for real backend)
VITE_DEMO_MODE=true

# Backend API URL (only used when DEMO_MODE is false)
VITE_API_URL=http://localhost:3000/api
```

### Vite Config

Update `frontend/vite.config.js` base path to match your repo name:

```js
export default defineConfig({
  base: '/Your-Repo-Name/',
  // ...
})
```

## 📜 License

This project is licensed under the MIT License.

## 🙏 Credits

- Original blockchain contracts inspired by Ethereum security best practices
- Dashboard design with modern cyber-security aesthetics
- ML detection powered by TensorFlow.js and Isolation Forest
