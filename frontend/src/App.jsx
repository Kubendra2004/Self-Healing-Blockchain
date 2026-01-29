import { useState, useEffect, useCallback } from 'react';
import './index.css';
import { api, isDemoMode } from './services/api';

// Utility function to format time ago
const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

// Truncate address for display
const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 10)}...${address.slice(-8)}`;
};

// System Status Component
function SystemStatus({ data, loading }) {
  return (
    <div className="card system-status">
      <div className="card-header">
        <div className="card-title">
          <div className="card-title-icon">🛡️</div>
          <h3>System Status</h3>
        </div>
        <span className="card-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
          ONLINE
        </span>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : (
        <div className="status-metrics">
          <div className="metric">
            <div className="metric-value success">98.7%</div>
            <div className="metric-label">Uptime</div>
          </div>
          <div className="metric">
            <div className="metric-value info">1,247</div>
            <div className="metric-label">Blocks</div>
          </div>
          <div className="metric">
            <div className="metric-value warning">12</div>
            <div className="metric-label">Nodes</div>
          </div>
          <div className="metric">
            <div className="metric-value danger">5</div>
            <div className="metric-label">Threats</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Attack Alerts Component
function AttackAlerts({ attacks, loading }) {
  return (
    <div className="card attack-alerts">
      <div className="card-header">
        <div className="card-title">
          <div className="card-title-icon">🚨</div>
          <h3>Real-time Attack Alerts</h3>
        </div>
        <span className="card-badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
          {attacks.length} ACTIVE
        </span>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : attacks.length === 0 ? (
        <div className="empty-state">
          <div className="icon">✅</div>
          <p>No attacks detected</p>
        </div>
      ) : (
        <div className="alerts-list">
          {attacks.map((attack, index) => (
            <div key={index} className="alert-item">
              <div className={`alert-severity ${attack.severity}`}></div>
              <div className="alert-content">
                <div className="alert-type">{attack.type}</div>
                <div className="alert-address">{truncateAddress(attack.address)}</div>
              </div>
              <div className="alert-time">{timeAgo(attack.timestamp)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Blacklist Component
function BlacklistTable({ blacklist, loading }) {
  const [search, setSearch] = useState('');
  
  const filtered = blacklist.filter(item => 
    item.address.toLowerCase().includes(search.toLowerCase()) ||
    item.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card blacklist">
      <div className="card-header">
        <div className="card-title">
          <div className="card-title-icon">🚫</div>
          <h3>Blacklisted Addresses</h3>
        </div>
        <span className="card-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
          {blacklist.length} BLOCKED
        </span>
      </div>
      <input
        type="text"
        className="blacklist-search"
        placeholder="🔍 Search addresses or reasons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📋</div>
          <p>No blacklisted addresses found</p>
        </div>
      ) : (
        <div className="blacklist-table">
          {filtered.map((item, index) => (
            <div key={index} className="blacklist-item">
              <div className="blacklist-index">{index + 1}</div>
              <div className="blacklist-address">{truncateAddress(item.address)}</div>
              <div className="blacklist-reason">{item.reason}</div>
              <div className="blacklist-date">{item.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ML Detections Component
function MLDetections({ detections, loading }) {
  const getConfidenceLevel = (confidence) => {
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.5) return 'medium';
    return 'low';
  };

  return (
    <div className="card ml-detections">
      <div className="card-header">
        <div className="card-title">
          <div className="card-title-icon">🤖</div>
          <h3>ML Detections</h3>
        </div>
      </div>
      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : detections.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔬</div>
          <p>No ML detections available</p>
        </div>
      ) : (
        <div className="ml-list">
          {detections.map((detection, index) => {
            const level = getConfidenceLevel(detection.confidence);
            return (
              <div key={index} className="ml-item">
                <div className="ml-item-header">
                  <span className="ml-type">{detection.type}</span>
                  <span className={`ml-confidence ${level}`}>
                    {Math.round(detection.confidence * 100)}%
                  </span>
                </div>
                <div className="ml-progress">
                  <div 
                    className={`ml-progress-bar ${level}`}
                    style={{ width: `${detection.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Recovery Controls Component
function RecoveryControls({ onTrigger, onExit, recoveryMode, loading }) {
  return (
    <div className="card recovery-controls">
      <div className="card-header">
        <div className="card-title">
          <div className="card-title-icon">⚡</div>
          <h3>Recovery Mode Controls</h3>
        </div>
      </div>
      <div className="recovery-content">
        <div className="recovery-status">
          <div className={`recovery-indicator ${recoveryMode ? 'active' : 'inactive'}`}>
            {recoveryMode ? '🔴' : '🟢'}
          </div>
          <div className="recovery-label">Current Status</div>
          <div className={`recovery-state ${recoveryMode ? 'active' : 'inactive'}`}>
            {recoveryMode ? 'RECOVERY ACTIVE' : 'NORMAL OPERATION'}
          </div>
        </div>
        
        <div className="recovery-actions">
          <button 
            className="recovery-btn trigger"
            onClick={onTrigger}
            disabled={recoveryMode || loading}
          >
            {loading ? '⏳' : '🚨'} Trigger Recovery
          </button>
          <button 
            className="recovery-btn exit"
            onClick={onExit}
            disabled={!recoveryMode || loading}
          >
            {loading ? '⏳' : '✅'} Exit Recovery
          </button>
        </div>
        
        <div className="recovery-info">
          <h4>Recovery Mode Actions</h4>
          <ul>
            <li>Blacklist detected attackers</li>
            <li>Apply security patches</li>
            <li>Freeze suspicious contracts</li>
            <li>Enable enhanced monitoring</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <span>{message}</span>
    </div>
  );
}

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [attacks, setAttacks] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [mlDetections, setMlDetections] = useState([]);
  const [status, setStatus] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch all data
  const fetchData = useCallback(async () => {
    try {
      const [statusRes, attacksRes, blacklistRes, mlRes] = await Promise.all([
        api.getStatus(),
        api.getAttacks(),
        api.getBlacklist(),
        api.getMLDetections()
      ]);
      
      setStatus(statusRes);
      setAttacks(attacksRes.recentAttacks || []);
      setBlacklist(blacklistRes.blacklistedAddresses || []);
      setMlDetections(mlRes.recentMLDetections || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      addToast('Failed to connect to backend', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleTriggerRecovery = async () => {
    setRecoveryLoading(true);
    try {
      await api.triggerRecovery();
      setRecoveryMode(true);
      addToast('Recovery mode triggered successfully!', 'success');
    } catch (error) {
      addToast('Failed to trigger recovery mode', 'error');
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleExitRecovery = async () => {
    setRecoveryLoading(true);
    try {
      await api.exitRecovery();
      setRecoveryMode(false);
      addToast('Exited recovery mode successfully!', 'success');
    } catch (error) {
      addToast('Failed to exit recovery mode', 'error');
    } finally {
      setRecoveryLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🔐</div>
            <div className="logo-text">
              <h1>Self-Healing Blockchain</h1>
              <span>Attack Detection & Protection System</span>
            </div>
          </div>
          <div className="header-status">
            <div className="status-dot"></div>
            <span>Network Active</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Demo Mode Banner */}
        {isDemoMode() && (
          <div className="demo-banner">
            <span className="icon">🎭</span>
            <span>Demo Mode Active - Displaying simulated blockchain data</span>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <SystemStatus data={status} loading={loading} />
          <AttackAlerts attacks={attacks} loading={loading} />
          <BlacklistTable blacklist={blacklist} loading={loading} />
          <MLDetections detections={mlDetections} loading={loading} />
          <RecoveryControls 
            onTrigger={handleTriggerRecovery}
            onExit={handleExitRecovery}
            recoveryMode={recoveryMode}
            loading={recoveryLoading}
          />
        </div>
      </main>

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
