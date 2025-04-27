import { io, Socket } from 'socket.io-client';
import { Message } from '../types';

let socket: Socket | null = null;

// Connect to Socket.IO server
export const initializeSocket = (
  onMessage: (message: Message) => void,
  onConnect: () => void,
  onDisconnect: () => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Use environment variable for Socket.IO server URL
      const socketUrl = import.meta.env.VITE_SOCKET_SERVER_URL || 'wss://socketio-chat-h9jt.onrender.com';
      
      socket = io(socketUrl, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity, // Keep trying to reconnect
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000, // Cap the delay at 5 seconds
        timeout: 20000,
        forceNew: true, // Force a new connection
      });

      socket.on('connect', () => {
        console.log('Socket connected successfully');
        onConnect();
        resolve();
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected - attempting to reconnect...');
        onDisconnect();
      });

      socket.on('chat message', (message: Message) => {
        onMessage(message);
      });

      socket.on('connect_error', (error: Error) => {
        console.warn('Connection error:', error.message);
        // Implement exponential backoff
        const nextDelay = Math.min(1000 * Math.pow(2, socket?.io?.reconnectionAttempts || 0), 10000);
        console.log(`Attempting to reconnect in ${nextDelay}ms...`);
      });

      socket.on('error', (error: Error) => {
        console.error('Socket error:', error);
        // Only reject if we've completely failed to connect
        if (!socket?.connected && socket?.disconnected) {
          reject(error);
        }
      });

      // Handle browser going offline
      window.addEventListener('offline', () => {
        console.log('Browser went offline - pausing reconnection attempts');
        socket?.disconnect();
      });

      // Handle browser coming back online
      window.addEventListener('online', () => {
        console.log('Browser back online - attempting to reconnect');
        socket?.connect();
      });

    } catch (err) {
      console.error('Socket initialization error:', err);
      reject(err);
    }
  });
};

// Send message to socket server
export const sendMessageToSocket = (message: Message): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      reject(new Error('Socket not initialized'));
      return;
    }

    if (!socket.connected) {
      reject(new Error('Socket not connected'));
      return;
    }

    socket.emit('chat message', message, (error: Error | null) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Disconnect socket
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Check connection status
export const isConnected = (): boolean => {
  return socket !== null && socket.connected;
};

// Get current connection state
export const getConnectionState = (): string => {
  if (!socket) return 'uninitialized';
  if (socket.connected) return 'connected';
  if (socket.disconnected) return 'disconnected';
  return 'connecting';
};