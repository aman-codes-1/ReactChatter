import { memo } from 'react';
import { Chip } from '@mui/material';
import { Avatar } from '../../../components';
import { useAuth } from '../../../hooks';
import { calculateSide, getDateLabel } from '../../../helpers';
import ChatBubble from './ChatBubble';
import { ChatMessageStyled } from './Chats.styled';

const ChatMessage = ({
  index,
  msg,
  lastMsgIndex,
  prevMsg,
  nextMsg,
  disableDateSeparator = false,
  isClickDisabled = false,
}: any) => {
  const { auth: { _id = '' } = {} } = useAuth();

  const side = calculateSide(msg, _id);
  const currentTimestamp = msg?.timestamp;
  const prevTimestamp = prevMsg?.timestamp;
  const nextTimestamp = nextMsg?.timestamp;
  const currentDate = getDateLabel(currentTimestamp);
  const prevDate = index > 0 ? getDateLabel(prevTimestamp) : '';
  const nextDate = index < lastMsgIndex ? getDateLabel(nextTimestamp) : '';
  const prevSide = index > 0 ? calculateSide(prevMsg, _id) : '';
  const nextSide = index < lastMsgIndex ? calculateSide(nextMsg, _id) : '';
  const isFirstOfGroup = prevSide !== side;
  const isLastOfGroup = nextSide !== side;
  const isFirstOfDateGroup = currentDate !== prevDate;
  const isLastOfDateGroup = currentDate !== nextDate;
  const dateSeparator = currentDate !== prevDate;

  let hasRightBeforeLeft = false;
  let hasRightAfterLeft = false;
  if (side === 'left') {
    if (!dateSeparator && prevSide === 'right') {
      hasRightBeforeLeft = true;
    }
    if (nextSide === 'right') {
      hasRightAfterLeft = true;
    }
  }

  const attachClass = () => {
    const classes = [];

    classes.push('chat-wrapper');

    if (dateSeparator) {
      classes.push('chat-wrapper-date-label');
    }

    if (!dateSeparator && (isFirstOfGroup || isFirstOfDateGroup)) {
      classes.push('chat-wrapper-first');
    }

    if (isLastOfGroup || isLastOfDateGroup) {
      classes.push('chat-wrapper-last');
    }

    if (side === 'left') {
      if (isFirstOfGroup && hasRightBeforeLeft) {
        classes.push('chat-margin-top');
      }
      if (isLastOfGroup && hasRightAfterLeft) {
        classes.push('chat-margin-bottom');
      }
    }

    return classes?.length ? classes.join(' ') : '';
  };

  const renderAvatar = () => {
    if (side === 'left') {
      if (isLastOfGroup) {
        return (
          <Avatar
            name={msg?.sender?.name}
            src={msg?.sender?.picture}
            sx={{ width: 32, height: 32 }}
          />
        );
      } else {
        return <div style={{ marginLeft: 32 }} />;
      }
    }
    return null;
  };

  return (
    <ChatMessageStyled>
      <div className={`${attachClass()}`}>
        {dateSeparator && !disableDateSeparator ? (
          <div className="date-label-wrapper">
            <Chip
              variant="outlined"
              label={getDateLabel(currentTimestamp)}
              className="date-label-chip"
            />
          </div>
        ) : null}
        <div className="chat-msg">
          {renderAvatar()}
          <ChatBubble
            msg={msg}
            side={side}
            isFirstOfGroup={isFirstOfGroup}
            isLastOfGroup={isLastOfGroup}
            isFirstOfDateGroup={isFirstOfDateGroup}
            isLastOfDateGroup={isLastOfDateGroup}
            isClickDisabled={isClickDisabled}
          />
        </div>
      </div>
    </ChatMessageStyled>
  );
};

export default memo(ChatMessage);
