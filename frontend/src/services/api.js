// API Service Layer with Demo Mode Support
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';

// Mock data for demo mode (GitHub Pages)
const mockData = {
  status: { status: 'Self-Healing Blockchain Network API is running' },
  
  blacklist: {
    blacklistedAddresses: [
      { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD87', reason: 'DDoS Attack', date: '2026-01-28' },
      { address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', reason: 'Reentrancy', date: '2026-01-27' },
      { address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5', reason: 'Double Spend', date: '2026-01-26' },
      { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', reason: 'High Frequency', date: '2026-01-25' },
      { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', reason: 'Sybil Attack', date: '2026-01-24' },
    ]
  },
  
  attacks: {
    recentAttacks: [
      { type: 'Potential DDoS Attack', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD87', timestamp: Date.now() - 120000, severity: 'critical' },
      { type: 'High Transaction Frequency', address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', timestamp: Date.now() - 300000, severity: 'medium' },
      { type: 'Potential Reentrancy Attack', address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5', timestamp: Date.now() - 600000, severity: 'critical' },
      { type: 'Excessive Gas Usage', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', timestamp: Date.now() - 900000, severity: 'low' },
      { type: 'Potential Double Spending', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', timestamp: Date.now() - 1200000, severity: 'critical' },
      { type: 'Multiple Failed Transactions', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', timestamp: Date.now() - 1500000, severity: 'medium' },
    ]
  },
  
  mlDetections: {
    recentMLDetections: [
      { type: 'Anomaly Detection', confidence: 0.92, timestamp: Date.now() - 180000 },
      { type: 'Pattern Recognition', confidence: 0.78, timestamp: Date.now() - 360000 },
      { type: 'Behavioral Analysis', confidence: 0.65, timestamp: Date.now() - 720000 },
      { type: 'Transaction Clustering', confidence: 0.45, timestamp: Date.now() - 1080000 },
    ]
  },
  
  recoveryTrigger: { message: 'Recovery mode triggered successfully', success: true },
  recoveryExit: { message: 'Exited recovery mode successfully', success: true }
};

// Simulate network delay for realistic demo
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Get system status
  async getStatus() {
    if (DEMO_MODE) {
      await delay(300);
      return mockData.status;
    }
    const res = await fetch(`${API_BASE_URL}/status`);
    return res.json();
  },

  // Get blacklisted addresses
  async getBlacklist() {
    if (DEMO_MODE) {
      await delay(400);
      return mockData.blacklist;
    }
    const res = await fetch(`${API_BASE_URL}/blacklist`);
    return res.json();
  },

  // Get recent attacks
  async getAttacks() {
    if (DEMO_MODE) {
      await delay(350);
      return mockData.attacks;
    }
    const res = await fetch(`${API_BASE_URL}/attacks`);
    return res.json();
  },

  // Get ML detections
  async getMLDetections() {
    if (DEMO_MODE) {
      await delay(450);
      return mockData.mlDetections;
    }
    const res = await fetch(`${API_BASE_URL}/ml-detections`);
    return res.json();
  },

  // Trigger recovery mode
  async triggerRecovery() {
    if (DEMO_MODE) {
      await delay(800);
      return mockData.recoveryTrigger;
    }
    const res = await fetch(`${API_BASE_URL}/recovery/trigger`, { method: 'POST' });
    return res.json();
  },

  // Exit recovery mode
  async exitRecovery() {
    if (DEMO_MODE) {
      await delay(800);
      return mockData.recoveryExit;
    }
    const res = await fetch(`${API_BASE_URL}/recovery/exit`, { method: 'POST' });
    return res.json();
  }
};

export const isDemoMode = () => DEMO_MODE;
