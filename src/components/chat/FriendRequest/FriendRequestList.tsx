import { List } from '@mui/material';
import { Button, ListItem } from '../..';
import { useAuth } from '../../../hooks';
import { getMember } from '../../../helpers';
import { FriendRequestStyled } from './FriendRequest.styled';

const FriendRequestList = ({
  maxHeight,
  data,
  nameKey,
  emailKey,
  pictureKey,
  confirmBtnProps,
  deleteBtnProps,
}: any) => {
  const { auth: { _id = '' } = {} } = useAuth();
  const isConfirmBtn = !!Object.keys(confirmBtnProps || {})?.length;
  const isDeleteBtn = !!Object.keys(deleteBtnProps || {})?.length;

  const renderItem = (item: any, key: string) => {
    if (item && key) {
      const { otherMember } = getMember(item?.members, _id);
      return otherMember?.[key];
    }
    return null;
  };

  return (
    <FriendRequestStyled isConfirmBtn={isConfirmBtn} maxHeight={maxHeight}>
      <List disablePadding className="friend-request-list">
        {data?.map((item: any, idx: number) => (
          <ListItem
            key={item?._id}
            disableGutters
            disableHover
            className="friend-request-list-item"
            btnProps={{
              className: 'friend-request-list-item-btn',
              avatarProps: {
                name: renderItem(item, nameKey),
                src: renderItem(item, pictureKey),
                className: 'friend-request-avatar',
              },
              textProps: {
                primary: renderItem(item, nameKey),
                secondary: renderItem(item, emailKey),
                slotProps: {
                  primary: {
                    fontSize: '1.125rem',
                  },
                  secondary: {
                    fontSize: '1rem',
                  },
                },
                style: {
                  WebkitLineClamp: 1,
                },
              },
            }}
          >
            <div className="friend-request-action-btn-wrapper">
              {isConfirmBtn ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={(_) => confirmBtnProps?.onClick(_, idx, item)}
                >
                  Confirm
                </Button>
              ) : null}
              {isDeleteBtn ? (
                <Button
                  variant="contained"
                  color="inherit"
                  fullWidth
                  onClick={(_: any) => deleteBtnProps?.onClick(_, idx, item)}
                >
                  Delete
                </Button>
              ) : null}
            </div>
          </ListItem>
        ))}
      </List>
    </FriendRequestStyled>
  );
};

export default FriendRequestList;
