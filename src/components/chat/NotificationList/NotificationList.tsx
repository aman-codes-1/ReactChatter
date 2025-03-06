import { ElementType, Fragment, RefObject, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, List, useTheme } from '@mui/material';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { ListItem } from '../..';
import { useAuth } from '../../../hooks';
import { ChatsAndFriendsContext } from '../../../contexts';
import {
  getChatDetails,
  getDate,
  getDateFromNow,
  getMember,
  getTime,
} from '../../../helpers';

const NotificationList = ({
  dense = false,
  disableGutters = false,
  data,
  className,
}: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth: { _id = '' } = {} } = useAuth();
  const { handleClickChat } = useContext(ChatsAndFriendsContext);
  const listRef = useRef<HTMLUListElement | null>(null);
  const listItemsRef = useRef<HTMLDivElement[] | null[]>([]);

  const renderDetails = (
    item: any,
    chatDetails: any,
    type: string,
    isGroupChat: boolean,
  ) => {
    let str = '';
    let avatarIcon: ElementType = Fragment;
    let fontSize = '0.6875rem';
    let stroke = false;
    let backgroundColor = theme.palette.common.black;
    let handleClick: any;

    if (type === 'friend') {
      if (chatDetails?.hasAdded) {
        avatarIcon = HowToRegRoundedIcon;
        fontSize = '0.75rem';
        backgroundColor = theme.palette.success.light;
        str = `<strong>${chatDetails?.name}</strong> accepted <strong>your friend request</strong>`;
        handleClick = handleClickChat;
      } else {
        avatarIcon = DoneRoundedIcon;
        stroke = true;
        backgroundColor = theme.palette.success.light;
        str = `<strong>${chatDetails?.name}'s</strong> friend request was <strong>confirmed by you</strong>`;
        handleClick = handleClickChat;
      }
    } else if (type === 'chat' && item?.lastMessage) {
      if (item?.lastMessage?.sender?._id === _id) {
        avatarIcon = ModeCommentRoundedIcon;
        str = `<strong>You</strong> sent a new message to <strong>${chatDetails?.name}</strong>`;
      } else {
        if (isGroupChat) {
          avatarIcon = ForumRoundedIcon;
          str = `<strong>${chatDetails?.name}</strong> - You received a <strong>new message</strong>`;
        } else {
          avatarIcon = ModeCommentRoundedIcon;
          str = `<strong>${chatDetails?.name}</strong> sent you a <strong>new message</strong>`;
        }
      }
      fontSize = '0.625rem';
      backgroundColor = theme.palette.grey[700];
      handleClick = handleClickChat;
    } else if (chatDetails?.hasSent) {
      avatarIcon = PersonAddAltRoundedIcon;
      backgroundColor = theme.palette.primary.main;
      str = `<strong>${chatDetails?.name}</strong> sent you a <strong>new friend request</strong>`;
      handleClick = () => {
        navigate('/friendRequests');
      };
    }

    const primary = str?.length ? (
      <div>
        {str?.split(/(<strong>.*?<\/strong>)/).map((text, index) =>
          text?.startsWith('<strong>') && text?.endsWith('</strong>') ? (
            <strong key={index} style={{ fontWeight: 600 }}>
              {text?.slice(8, -9)}
            </strong>
          ) : (
            text
          ),
        )}
      </div>
    ) : null;

    return {
      primary,
      avatarIcon,
      fontSize,
      stroke,
      backgroundColor,
      handleClick,
    };
  };

  const renderList = (
    item: any,
    idx: number,
    itemsRef: RefObject<HTMLDivElement[] | null[]>,
  ) => {
    const { currentMember, otherMember } = getMember(item?.members, _id);
    const { isGroupChat, type, chatDetails } = getChatDetails(
      item,
      otherMember,
      _id,
    );

    if (chatDetails) {
      const {
        primary,
        avatarIcon: AvatarIcon,
        fontSize,
        stroke,
        backgroundColor,
        handleClick,
      } = renderDetails(item, chatDetails, type, isGroupChat);

      let createdAt: number;

      if (item?.lastMessage) {
        createdAt = item?.lastMessage?.timestamp;
      } else {
        createdAt = item?.createdAt;
      }

      const secondary = `${getDateFromNow(createdAt)} - ${getDate(createdAt, {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      })} - ${getTime(createdAt)}`;

      return (
        <Fragment key={item?._id}>
          <ListItem
            disablePadding
            disableGutters={disableGutters}
            ref={(el) => {
              if (itemsRef?.current) {
                itemsRef.current[idx] = el;
              }
            }}
            btnProps={{
              textProps: {
                primary,
                secondary,
                slotProps: {
                  primary: {
                    fontWeight: 400,
                  },
                },
              },
              avatarProps: {
                name: chatDetails?.name,
                src: chatDetails?.picture,
                badge:
                  AvatarIcon !== Fragment
                    ? {
                        content: (
                          <AvatarIcon
                            sx={{
                              fontSize,
                              color: theme.palette.common.white,
                              ...(stroke
                                ? {
                                    stroke: theme.palette.common.white,
                                    strokeWidth: 2,
                                  }
                                : {}),
                            }}
                          />
                        ),
                        backgroundColor,
                      }
                    : null,
              },
              onClick: (_: any) => handleClick(_, item, chatDetails),
            }}
          />
          <Divider variant="inset" component="li" sx={{ mr: '5px' }} />
        </Fragment>
      );
    }

    return null;
  };

  return (
    <List
      dense={dense}
      disablePadding
      className={className}
      ref={listRef}
      sx={{
        overflow: 'auto',
        width: '100%',
        minHeight: '4.6rem',
        maxHeight: '260px',
      }}
    >
      {data?.map((item: any, idx: number) =>
        renderList(item, idx, listItemsRef),
      )}
    </List>
  );
};

export default NotificationList;
