import { useContext } from 'react';
import { WebSocketContext } from '../contexts';

export const useSocket = () => useContext(WebSocketContext);
