import {
  Fragment,
  RefObject,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge, Divider, List, useTheme } from '@mui/material';
import { ListItem, MessageStatus } from '../..';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';
import {
  checkMessageStatus,
  getBadgeWidth,
  getChatDetails,
  getFriendId,
  getMember,
  scrollTo,
} from '../../../helpers';

const DataList = ({
  dense = false,
  disableGutters = false,
  dividerVariant,
  data,
  handleClickListItem,
  className,
  scrollDependencies = [],
}: any) => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const chatId =
    searchParams.get('type') === 'chat' ? searchParams.get('id') : null;
  const fullFriendId =
    searchParams.get('type') === 'friend' ? searchParams.get('id') : null;
  const { friendId } = getFriendId(fullFriendId);
  const { auth: { _id = '' } = {} } = useAuth();
  const { isHomeButtonClicked } = useContext(ChatsAndFriendsContext);
  const listRef = useRef<HTMLUListElement | null>(null);
  const listItemsRef = useRef<HTMLDivElement[] | null[]>([]);

  useLayoutEffect(() => {
    if (listRef?.current) {
      listRef.current.scrollTop = 0;
    }
  }, [isHomeButtonClicked]);

  useLayoutEffect(() => {
    const scrollToSelected = () => {
      if (listRef?.current && listItemsRef?.current?.length && data?.length) {
        scrollTo(listRef, listItemsRef, data, chatId || friendId);
      }
    };

    scrollToSelected();

    window.addEventListener('resize', scrollToSelected);

    return () => {
      window.removeEventListener('resize', scrollToSelected);
    };
  }, [data, chatId, friendId, ...scrollDependencies]);

  const renderSecondary = (chat: any, chatDetails: any) => {
    const msg = chat?.lastMessage;
    let isComponent = false;
    let component = null;
    const messageStatus = checkMessageStatus(msg, chat);

    if (msg) {
      isComponent = true;
      component = (
        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center',
          }}
        >
          {msg?.sender?._id && msg?.sender?._id === _id ? (
            <MessageStatus messageStatus={messageStatus} />
          ) : null}
          <span
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {msg?.message}
          </span>
        </div>
      );
    } else {
      component = chatDetails?.email;
    }

    return {
      isComponent,
      component,
    };
  };

  const renderList = (
    item: any,
    idx: number,
    selected: boolean,
    handleClick: any,
    itemsRef: RefObject<HTMLDivElement[] | null[]>,
  ) => {
    const { currentMember, otherMember } = getMember(item?.members, _id);
    const { chatDetails } = getChatDetails(item, otherMember, _id);

    if (chatDetails) {
      const { isComponent, component } = renderSecondary(item, chatDetails);

      return (
        <Fragment key={item?._id}>
          <ListItem
            disableGutters={disableGutters}
            ref={(el) => {
              if (itemsRef?.current) {
                itemsRef.current[idx] = el;
              }
            }}
            btnProps={{
              textProps: {
                primary: chatDetails?.name,
                secondary: component,
                slotProps: {
                  primary: {
                    ...(currentMember?.unreadMessagesCount
                      ? {
                          fontWeight: 600,
                        }
                      : {}),
                  },
                  secondary: {
                    ...(isComponent ? { component: 'div' as any } : {}),
                    ...(currentMember?.unreadMessagesCount
                      ? {
                          fontWeight: 700,
                          style: {
                            color: theme.palette.text.primary,
                          },
                        }
                      : {}),
                  },
                },
                style: {
                  WebkitLineClamp: 1,
                },
              },
              avatarProps: {
                name: chatDetails?.name,
                src: chatDetails?.picture,
              },
              endIcon: (
                <Badge
                  badgeContent={currentMember?.unreadMessagesCount}
                  color="secondary"
                  max={999}
                  sx={{
                    left: `-${getBadgeWidth(currentMember?.unreadMessagesCount)}px`,
                  }}
                  invisible={!currentMember?.unreadMessagesCount}
                />
              ),
              onClick: (_: any) => handleClick(_, item, chatDetails),
              selected,
            }}
          />
          <Divider
            variant={
              dividerVariant || (disableGutters ? 'fullWidth' : 'middle')
            }
            sx={
              disableGutters ? { ml: '5px', mr: '5px' } : { ml: 2.5, mr: 2.5 }
            }
          />
        </Fragment>
      );
    }

    return null;
  };

  if (!data?.length) return null;

  return (
    <List
      dense={dense}
      disablePadding
      className={className}
      ref={listRef}
      sx={{ overflow: 'auto', width: '100%', minHeight: '4.6rem' }}
    >
      {data?.map((item: any, idx: number) =>
        renderList(
          item,
          idx,
          item?._id && (item?._id === chatId || item?._id === friendId),
          handleClickListItem,
          listItemsRef,
        ),
      )}
    </List>
  );
};

export default DataList;
