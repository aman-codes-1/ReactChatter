export type MessageData = {
  id?: string;
  chatId?: string;
  friendId?: string;
  message: string;
  timestamp: number;
  isRetry?: boolean;
};
