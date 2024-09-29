import { useContext, useLayoutEffect, useRef } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '../../../components';
import { ChatsAndFriendsContext, MessagesContext } from '../../../contexts';
import { getTime, scrollIntoView } from '../../../helpers';
import { ChatMessagesStyled } from './ChatMessages.styled';

const Chats = ({ appBarHeight, textFieldHeight }: any) => {
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const friendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const { selectedMember, isListItemClicked } = useContext(
    ChatsAndFriendsContext,
  );
  const {
    loadingCached,
    setLoadingCached,
    loadingQueue,
    setLoadingQueue,
    messageGroups = [],
    messageQueue = [],
    getCachedMessages,
    getQueuedMessages,
  } = useContext(MessagesContext);
  const scrollRef = useRef<any>(null);

  useLayoutEffect(() => {
    if (selectedMember) return;

    if (chatId) {
      (async () => {
        try {
          await getCachedMessages(chatId, setLoadingCached);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }

    if (friendId) {
      (async () => {
        try {
          await getQueuedMessages(friendId, true, setLoadingQueue);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    }
  }, [selectedMember]);

  useLayoutEffect(() => {
    scrollIntoView(scrollRef);

    const checkScroll = () => {
      if (messageGroups?.length) {
        messageGroups?.forEach((messageGroup: any) => {
          if (messageGroup?.data?.length) {
            messageGroup?.data?.forEach(() => {
              scrollIntoView(scrollRef);
            });
          }
        });
      }

      if (messageQueue?.length) {
        messageQueue?.forEach(() => {
          scrollIntoView(scrollRef);
        });
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [messageGroups, messageQueue, isListItemClicked]);

  if (loadingCached || loadingQueue) {
    return null;
  }

  const attachClass = (data: any, index: number, side: string) => {
    if (index === 0) {
      return `msg-${side}-first`;
    }
    if (data && Array.isArray(data) && index === data.length - 1) {
      return `msg-${side}-last`;
    }
    return '';
  };

  const renderChat = (msg: any, index: number, data: any, side: string) => {
    return (
      <div className={`msg-${side}-row`} key={msg?._id}>
        <Typography
          align="left"
          className={`msg msg-${side} ${attachClass(data, index, side)}`}
        >
          <div className="msg-content">{msg?.message}</div>
          <div className="msg-timestamp">
            {msg?.sender?.sentStatus?.timestamp ? (
              <Typography
                variant="caption"
                whiteSpace="nowrap"
                fontWeight={600}
                className="msg-timestamp-text"
              >
                {getTime(msg?.sender?.sentStatus?.timestamp)}
              </Typography>
            ) : null}
            {side === 'right' ? (
              <>
                {msg?.sender?.sentStatus?.isSent === true ? (
                  <DoneRoundedIcon fontSize="inherit" />
                ) : null}
                {msg?.receiver?.readStatus?.isRead === true ? (
                  <DoneAllRoundedIcon fontSize="inherit" />
                ) : null}
              </>
            ) : null}
          </div>
        </Typography>
      </div>
    );
  };

  const IsNoMessages = !messageGroups?.length && !messageQueue?.length;

  return (
    <ChatMessagesStyled
      navbarHeight={navbarHeight}
      appBarHeight={appBarHeight}
      textFieldHeight={textFieldHeight}
    >
      <div className="chat-container">
        {IsNoMessages ? (
          <div className="no-messages-wrapper">No Messages</div>
        ) : null}
        {messageGroups?.length || messageQueue?.length ? (
          <div className="chat-wrapper">
            <div className="chat-grid">
              {messageGroups?.map((messageGroup: any, idx: number) => (
                <Grid
                  container
                  spacing={2}
                  justifyContent={
                    messageGroup?.side === 'right' ? 'flex-end' : 'flex-start'
                  }
                  alignItems="flex-end"
                  key={`${JSON.stringify(messageGroup)} ${idx}`}
                >
                  {messageGroup?.side === 'left' && (
                    <Grid>
                      <Avatar src="" width={32} height={32} />
                    </Grid>
                  )}
                  <Grid size={8}>
                    {messageGroup?.data?.length
                      ? messageGroup?.data?.map((msg: any, index: number) =>
                          renderChat(
                            msg,
                            index,
                            messageGroup?.data,
                            messageGroup?.side,
                          ),
                        )
                      : null}
                  </Grid>
                </Grid>
              ))}
              {messageQueue?.map((msgQueue: any, idx: number) => (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  key={`${JSON.stringify(msgQueue)} ${idx}`}
                >
                  <Grid size={8}>
                    <div className="msg-right-row">
                      <Typography
                        align="left"
                        className="msg msg-right msg-animation"
                      >
                        <div className="msg-content">{msgQueue?.message}</div>
                        <div className="msg-timestamp">
                          {msgQueue?.timestamp ? (
                            <Typography
                              variant="caption"
                              whiteSpace="nowrap"
                              fontWeight={600}
                              className="msg-timestamp-text"
                            >
                              {getTime(msgQueue.timestamp)}
                            </Typography>
                          ) : null}
                          <AccessTimeIcon fontSize="inherit" />
                        </div>
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              ))}
            </div>
            <div ref={scrollRef} />
          </div>
        ) : null}
      </div>
    </ChatMessagesStyled>
  );
};

export default Chats;
