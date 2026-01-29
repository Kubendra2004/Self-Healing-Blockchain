import { io } from 'socket.io-client';
import { isDemoMode } from './api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
let socket;

export const initSocket = () => {
  if (isDemoMode()) return null; // No socket in demo mode
  
  if (!socket) {
    socket = io(API_URL);
    console.log('Socket initialized');
  }
  return socket;
};

export const getSocket = () => socket;

export const subscribeToAlerts = (callback) => {
  if (!socket) return;
  socket.on('alert', callback);
};

export const subscribeToRecovery = (callback) => {
  if (!socket) return;
  socket.on('recovery-mode', callback);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
