import {
  memo,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconButton, Typography, useTheme } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { MessageStatus } from '../../../components';
import { ChatsAndFriendsContext } from '../../../contexts';
import { checkMessageStatus, getTime, toggleDrawer } from '../../../helpers';
import { ChatBubbleStyled } from './Chats.styled';

const ChatBubble = ({
  msg,
  side,
  isFirstOfGroup,
  isLastOfGroup,
  isFirstOfDateGroup,
  isLastOfDateGroup,
  isClickDisabled = false,
}: any) => {
  const theme = useTheme();
  const [isResize, setIsResize] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const {
    selectedChat,
    setIsMessageDrawerOpen,
    selectedMessage,
    setSelectedMessage,
  } = useContext(ChatsAndFriendsContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLSpanElement | null>(null);

  const messageStatus = useMemo(
    () => checkMessageStatus(msg, selectedChat),
    [msg, selectedChat],
  );
  const { isQueued, isSent, isDelivered, isRead, isRetry } =
    messageStatus || {};
  const queued = isQueued && !isSent && !isDelivered && !isRead;
  const timestamp = msg?.timestamp;

  useLayoutEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setIsResize((prev) => !prev);
        setIsOverflow(false);
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (containerRef?.current && messageRef?.current) {
        const containerElement = containerRef?.current;
        const messageElement = messageRef?.current;
        const containerHeight = containerElement?.offsetHeight;
        const messageHeight = messageElement?.offsetHeight;
        const height = containerHeight - messageHeight;
        if (!isNaN(height) && height < 40) {
          setIsOverflow(false);
        } else {
          setIsOverflow(true);
        }
      }
    };

    checkOverflow();
  }, [msg?._id, msg?.queueId, isResize]);

  useLayoutEffect(() => {
    if (selectedMessage?._id === msg?._id) {
      setSelectedMessage(msg);
    }
  }, [msg]);

  const handleClickMessage = () => {
    setSelectedMessage((prev: any) => {
      if (prev?._id !== msg?._id) {
        toggleDrawer(setIsMessageDrawerOpen, false, true);
      } else {
        toggleDrawer(setIsMessageDrawerOpen, true);
      }
      return msg;
    });
  };

  const attachClass = () => {
    const classes = [];

    if (
      isFirstOfGroup ||
      isFirstOfDateGroup ||
      (isFirstOfGroup && isLastOfGroup) ||
      (isFirstOfDateGroup && isLastOfDateGroup)
    ) {
      classes.push(`msg-first msg-${side}-first`);
    }

    if (
      (!isFirstOfGroup && !isFirstOfDateGroup && isLastOfGroup) ||
      (!isFirstOfGroup && !isFirstOfDateGroup && isLastOfDateGroup)
    ) {
      classes.push(`msg-last msg-${side}-last`);
    }

    return classes?.length ? classes.join(' ') : '';
  };

  return (
    <ChatBubbleStyled side={side} isClickDisabled={isClickDisabled}>
      <div
        ref={containerRef}
        className={`msg msg-${side} ${attachClass()} ${queued ? 'msg-animation' : ''} ${isOverflow ? 'msg-overflow' : ''}`}
        onClick={
          side === 'right' && !isClickDisabled ? handleClickMessage : () => {}
        }
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
        <span
          className={`msg-timestamp ${isOverflow ? 'msg-timestamp-overflow' : ''}`}
        >
          {timestamp ? (
            <Typography
              variant="caption"
              whiteSpace="nowrap"
              className={`msg-timestamp-text msg-timestamp-text-${side}`}
            >
              {getTime(timestamp)}
            </Typography>
          ) : null}
          {side === 'right' ? (
            <MessageStatus
              messageStatus={messageStatus}
              defaultColor={theme.palette.grey[300]}
              readColor={theme.palette.info.contrastText}
            />
          ) : null}
        </span>
      </div>
      {side === 'right' && isRetry ? (
        <div>
          <IconButton size="small" color="error">
            <ErrorOutlineOutlinedIcon color="error" />
          </IconButton>
        </div>
      ) : null}
    </ChatBubbleStyled>
  );
};

export default memo(ChatBubble);
