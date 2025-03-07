import { useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

const MessageStatus = ({ messageStatus, defaultColor, readColor }: any) => {
  const theme = useTheme();
  const { isSent, isDelivered, isRead } = messageStatus || {};

  const renderStatus = () => {
    if (isRead) {
      return (
        <DoneAllRoundedIcon
          fontSize="inherit"
          sx={{
            color: readColor || theme.palette.primary.main,
          }}
        />
      );
    } else if (isDelivered) {
      return (
        <DoneAllRoundedIcon
          fontSize="inherit"
          sx={{
            color: defaultColor || theme.palette.text.secondary,
          }}
        />
      );
    } else if (isSent) {
      return (
        <DoneRoundedIcon
          fontSize="inherit"
          sx={{
            color: defaultColor || theme.palette.text.secondary,
          }}
        />
      );
    } else {
      return (
        <AccessTimeIcon
          fontSize="inherit"
          sx={{
            color: defaultColor || theme.palette.text.secondary,
          }}
        />
      );
    }
  };

  return <>{renderStatus()}</>;
};

export default MessageStatus;
