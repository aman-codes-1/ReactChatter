type SentStatus = {
  isQueued: boolean;
  isRetry?: boolean;
  timestamp: number;
};

type Sender = {
  _id: string;
  sentStatus: SentStatus;
};

export type MessageData = {
  id?: string;
  chatId?: string;
  friendId?: string;
  selectedMember?: any;
  message: string;
  sender: Sender;
  timestamp: number;
};
