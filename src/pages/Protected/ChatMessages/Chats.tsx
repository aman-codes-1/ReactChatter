import { useContext, useLayoutEffect, useRef } from 'react';
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '../../../components';
import { MessagesContext } from '../../../contexts';
import { MESSAGES_QUERY, useAuth } from '../../../hooks';
import { getTime, groupMessages, scrollIntoView } from '../../../helpers';
import { ChatMessagesStyled } from './ChatMessages.styled';

const Chats = ({ appBarHeight, textFieldHeight }: any) => {
  const location = useLocation();
  const [navbarHeight] = useOutletContext<any>();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const { auth: { _id = '' } = {} } = useAuth();
  const {
    messages = [],
    messagesClient,
    loadingCached,
    setLoadingCached,
    messageGroups = [],
    setMessageGroups,
    messageQueue = [],
    setMessageQueue,
  } = useContext(MessagesContext);
  const scrollRef = useRef<any>(null);

  const messagesWithQueue = (msgs: any) => {
    setMessageQueue((prev: any[]) => {
      if (prev?.length && msgs?.length) {
        const queue = prev?.filter(
          (el: any) =>
            !msgs?.some(
              (el2: any) =>
                el?.timestamp === el2?.sender?.sentStatus?.timestamp,
            ),
        );
        return queue;
      }
      return prev;
    });
    const messageGroupsData = groupMessages(msgs, _id);
    setMessageGroups(messageGroupsData);
  };

  useLayoutEffect(() => {
    const getCachedData = async () => {
      try {
        setLoadingCached(true);
        const cachedData = await messagesClient?.readQuery({
          query: MESSAGES_QUERY,
          variables: { chatId },
        });
        if (!cachedData) {
          messagesWithQueue(messages);
        } else {
          messagesWithQueue(cachedData?.messages);
        }
      } catch (error) {
        console.error('Error reading cached data:', error);
      } finally {
        setLoadingCached(false);
      }
    };

    if (chatId) {
      getCachedData();
    }
  }, [messages, chatId]);

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
  }, [messageGroups, messageQueue, location?.state?.isListItemClicked]);

  const resetAllStates = () => {
    setMessageGroups([]);
  };

  useLayoutEffect(() => {
    if (chatId) {
      resetAllStates();
    }
  }, [chatId]);

  if (loadingCached) {
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

  const IsNoMessages = !(messageGroups?.length || messageQueue?.length);

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
            <div className="msg-grid">
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
              {messageQueue?.map((msgQueue: any, idx: number) => {
                return (
                  <Grid
                    container
                    spacing={2}
                    justifyContent="flex-end"
                    key={`${JSON.stringify(msgQueue)} ${idx}`}
                  >
                    <Grid size={8}>
                      <div className="msg-right-row">
                        <Typography align="left" className="msg msg-right">
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
                );
              })}
            </div>
            <div ref={scrollRef} />
          </div>
        ) : null}
      </div>
    </ChatMessagesStyled>
  );
};

export default Chats;
