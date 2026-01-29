const express = require('express');
const router = express.Router();

const BlockchainMonitor = require('../monitoring/BlockchainMonitor');
const config = require('../monitoring/config.json');

const monitor = new BlockchainMonitor(config);
monitor.start();

// Helper to emit events to frontend
const emitEvent = (io, event, data) => {
  if (io) io.emit(event, data);
};

router.get('/status', (req, res) => {
  res.json({ status: 'Self-Healing Blockchain Network API is running' });
});

router.get('/blacklist', (req, res) => {
  res.json({ blacklistedAddresses: Array.from(monitor.blacklistedAddresses) });
});

router.get('/attacks', (req, res) => {
  res.json({ recentAttacks: monitor.attackHistory.slice(-10) });
});

router.get('/ml-detections', (req, res) => {
  res.json({ recentMLDetections: monitor.mlDetector.getRecentDetections(10) });
});

router.post('/recovery/trigger', (req, res) => {
  // Trigger recovery actions
  emitEvent(req.io, 'recovery-mode', { active: true });
  res.json({ message: 'Recovery mode triggered successfully' });
});

router.post('/recovery/exit', (req, res) => {
  emitEvent(req.io, 'recovery-mode', { active: false });
  res.json({ message: 'Exited recovery mode' });
});

// Attack Simulation Endpoints
router.post('/simulate/attack', (req, res) => {
  const { type, address } = req.body;
  const attackData = {
    type: type || 'Unknown Attack',
    address: address || '0xSimulatedAttacker',
    timestamp: Date.now(),
    severity: ['DDoS', 'Double Spend', 'Reentrancy'].some(t => type.includes(t)) ? 'critical' : 'medium'
  };
  
  // Add to monitor history
  monitor.attackHistory.push(attackData);
  
  // Emit real-time alert
  emitEvent(req.io, 'alert', attackData);
  
  res.json({ message: `Simulated ${type} from ${address}`, attack: attackData });
});

module.exports = router;
