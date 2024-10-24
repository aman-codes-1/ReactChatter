import { List } from '@mui/material';
import { useAuth } from '../../../../hooks';
import { Button, ListItem } from '../../../../components';
import { MainLayout } from '../MainLayout';
import { FriendRequestStyled } from './FriendRequest.styled';

const FriendRequest = ({
  data,
  userObj,
  nameKey,
  emailKey,
  pictureKey,
  mainLayoutProps,
  confirmBtnProps,
  deleteBtnProps,
}: any) => {
  const { auth: { _id = '' } = {} } = useAuth();

  const isConfirmBtn = !!Object.keys(confirmBtnProps || {})?.length;
  const isDeleteBtn = !!Object.keys(deleteBtnProps || {})?.length;

  const renderItem = (obj: any, key: string) => {
    if (obj?.members?.length) {
      const memberObj = obj.members?.find((member: any) => member?._id !== _id);
      if (memberObj) {
        return memberObj?.[userObj]?.[key];
      }
      return null;
    }
    return null;
  };

  return (
    <FriendRequestStyled isConfirmBtn={isConfirmBtn}>
      <MainLayout
        data={data}
        loaderProps={{
          secondaryFontSize: '0.975rem',
          listClassName: 'friend-request-list',
          btnAlignItems: 'flex-start',
          btnClassName: 'friend-request-loader',
          avatarClassName: 'friend-request-loader-avatar',
          listItemTextClassName: 'friend-request-text-wrapper',
        }}
        {...mainLayoutProps}
      >
        <div className="friend-request-list-wrapper">
          <List disablePadding className="friend-request-list">
            {data?.map((obj: any, idx: number) => (
              <ListItem
                key={`${obj?._id}-${idx}`}
                disableGutters
                disableHover
                btnProps={{
                  wrapperClassName: 'friend-request-list-item-btn',
                  alignItems: 'flex-start',
                  avatarProps: {
                    src: renderItem(obj, pictureKey),
                    className: 'friend-request-avatar',
                  },
                  textProps: {
                    primary: renderItem(obj, nameKey),
                    primaryTypographyProps: {
                      fontSize: '1.125rem',
                    },
                    secondary: (
                      <>
                        {renderItem(obj, emailKey)}
                        <div className="friend-request-action-btn-wrapper">
                          {isConfirmBtn ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={(_) =>
                                confirmBtnProps?.onClick(_, idx, obj)
                              }
                            >
                              Confirm
                            </Button>
                          ) : null}
                          {isDeleteBtn ? (
                            <Button
                              variant="contained"
                              color="inherit"
                              fullWidth
                              onClick={(_) =>
                                deleteBtnProps?.onClick(_, idx, obj)
                              }
                            >
                              Delete
                            </Button>
                          ) : null}
                        </div>
                      </>
                    ),
                    secondaryTypographyProps: {
                      fontSize: '0.975rem',
                      component: 'div' as any,
                    },
                    className: 'friend-request-text-wrapper',
                  },
                }}
              />
            ))}
          </List>
        </div>
      </MainLayout>
    </FriendRequestStyled>
  );
};

export default FriendRequest;
