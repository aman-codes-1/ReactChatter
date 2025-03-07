import { FriendRequestList, MainLayout } from '../..';
import { FriendRequestStyled } from './FriendRequest.styled';

const FriendRequest = ({
  mainLayoutProps,
  data,
  nameKey,
  emailKey,
  pictureKey,
  confirmBtnProps,
  deleteBtnProps,
}: any) => {
  return (
    <FriendRequestStyled>
      <MainLayout
        loadingDataProps={{
          className: 'friend-request-list',
          listItemClassName: 'friend-request-list-item',
          listItemButtonClassName: 'friend-request-list-item-btn',
          listItemAvatarClassName: 'friend-request-avatar',
          dataCount: 5,
        }}
        {...mainLayoutProps}
      >
        <FriendRequestList
          data={data}
          nameKey={nameKey}
          emailKey={emailKey}
          pictureKey={pictureKey}
          confirmBtnProps={confirmBtnProps}
          deleteBtnProps={deleteBtnProps}
        />
      </MainLayout>
    </FriendRequestStyled>
  );
};

export default FriendRequest;
