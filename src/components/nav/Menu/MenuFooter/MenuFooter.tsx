import { List } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ListItem } from '../../..';
import { useApi, useAuth } from '../../../../hooks';
import { MenuFooterStyled } from './MenuFooter.styled';

const MenuFooter = ({ className }: any) => {
  const { auth: { name = '', email = '', picture = '' } = {} } = useAuth();
  const { callLogout } = useApi();

  const handleLogout = async () => {
    await callLogout();
  };

  return (
    <MenuFooterStyled className={className}>
      <List dense>
        <ListItem
          disablePadding
          disableGutters
          disableHover
          btnProps={{
            textProps: {
              primary: name,
              secondary: email,
              slotProps: {
                primary: {
                  fontSize: '0.9375rem',
                },
                secondary: {
                  fontSize: '0.75rem',
                },
              },
              style: {
                WebkitLineClamp: 1,
              },
            },
            avatarProps: {
              name,
              src: picture,
            },
            endIcon: (
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon fontSize="small" />}
                textHidden
                sx={{
                  minHeight: '52px',
                  minWidth: '54px',
                  ml: '1.75rem',
                }}
              />
            ),
          }}
        />
      </List>
    </MenuFooterStyled>
  );
};

export default MenuFooter;
