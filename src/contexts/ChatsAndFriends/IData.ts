type RetryStatus = {
  isRetry: boolean;
  timestamp: number;
};

type QueuedStatus = {
  isQueued: boolean;
  timestamp: number;
};

type SentStatus = {
  isSent: boolean;
  timestamp: number;
};

type DeliveredStatus = {
  isDelivered: boolean;
  timestamp: number;
};

type ReadStatus = {
  isRead: boolean;
  timestamp: number;
};

type Sender = {
  _id: string;
  retryStatus?: RetryStatus;
  queuedStatus: QueuedStatus;
  sentStatus: SentStatus;
};

export type Receiver = {
  _id: string;
  deliveredStatus?: DeliveredStatus;
  readStatus?: ReadStatus;
};

export type MessageData = {
  _id: string;
  chatId: string;
  queueId: string;
  isActive: boolean;
  message: string;
  sender: Sender;
  receivers: Receiver[];
  timestamp: number;
};
