import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { getTime } from '../../../helpers';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';
import { ChatBubbleStyled } from './Chats.styled';

const ChatBubble = ({ msg, index, data, side, isResize }: any) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const { auth: { _id = '' } = {} } = useAuth();
  const { selectedChat } = useContext(ChatsAndFriendsContext);
  const containerRef = useRef<any>(null);
  const messageRef = useRef<any>(null);

  const sender = msg?.sender;
  const sentStatus = sender?.sentStatus;
  const sentTimeStamp = sentStatus?.timestamp;
  const isQueued = sentStatus?.isQueued;
  const isSent = sentStatus?.isSent;

  let readStatus;
  let readTimestamp;
  let isRead;

  if (selectedChat && selectedChat?.type === 'private') {
    const receivers = msg?.otherMembers;
    readStatus =
      receivers?.length === 1 &&
      receivers?.find((otherMember: any) => otherMember?._id !== _id);
    readTimestamp = readStatus?.timestamp;
    isRead = readStatus?.isRead;
  }

  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (containerRef?.current && messageRef?.current) {
        const containerElement = containerRef?.current;
        const messageElement = messageRef?.current;
        const containerHeight = containerElement?.offsetHeight;
        const messageHeight = messageElement?.offsetHeight;
        const height = containerHeight - messageHeight;
        if (!isNaN(height) && height > 23) {
          setIsOverflow(true);
        } else {
          setIsOverflow(false);
        }
      }
    };

    checkOverflow();
  }, [msg?._id, isResize]);

  const attachClass = () => {
    if (index === 0) {
      return `msg-${side}-first`;
    }
    if (data && Array.isArray(data) && index === data?.length - 1) {
      return `msg-${side}-last`;
    }
    return '';
  };

  return (
    <ChatBubbleStyled>
      <div
        className={`msg msg-${side} ${attachClass()} ${isQueued ? 'msg-animation' : ''} ${isOverflow ? 'msg-overflow' : ''}`}
        ref={containerRef}
        key={`${msg?._id}-${index}`}
      >
        {msg?.message ? (
          <Typography
            component="span"
            className={`msg-content msg-content-${side}`}
            ref={messageRef}
          >
            {msg?.message}
          </Typography>
        ) : null}
        {sentStatus || readStatus ? (
          <span
            className={`msg-timestamp ${isOverflow ? 'msg-timestamp-overflow' : ''}`}
          >
            {sentTimeStamp ? (
              <Typography
                variant="caption"
                whiteSpace="nowrap"
                fontWeight={500}
                className={`msg-timestamp-text-${side}`}
              >
                {getTime(sentTimeStamp)}
              </Typography>
            ) : null}
            {side === 'right' ? (
              <>
                {isQueued === true ? (
                  <AccessTimeIcon fontSize="inherit" />
                ) : null}
                {isSent === true ? (
                  <DoneRoundedIcon fontSize="inherit" />
                ) : null}
                {isRead === true ? (
                  <DoneAllRoundedIcon fontSize="inherit" />
                ) : null}
              </>
            ) : null}
          </span>
        ) : null}
      </div>
    </ChatBubbleStyled>
  );
};

export default ChatBubble;
