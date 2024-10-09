import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ListItem } from '../..';
import { useApi, useAuth } from '../../../hooks';
import { SideBarFooterStyled } from './SideBarFooter.styled';
import { CircularProgress, List } from '@mui/material';

const SideBarFooter = ({ className }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { auth: { name = '', email = '', picture = '' } = {} } = useAuth();
  const { callLogout } = useApi();

  const handleLogout = async () => {
    setIsLoading(true);
    await callLogout();
    setIsLoading(false);
  };

  return (
    <SideBarFooterStyled className={className}>
      <List dense>
        <ListItem
          disablePadding
          disableGutters
          disableHover
          btnProps={{
            textProps: {
              primary: name,
              secondary: email,
              primaryTypographyProps: {
                fontSize: '1rem',
                fontWeight: 500,
                style: {
                  WebkitLineClamp: 1,
                },
              },
              secondaryTypographyProps: {
                style: {
                  WebkitLineClamp: 1,
                },
              },
            },
            avatarProps: {
              src: picture,
            },
            endIcon: (
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleLogout}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <LogoutIcon fontSize="small" />
                  )
                }
                className="text-hidden"
                sx={{
                  minHeight: '3.25rem',
                  minWidth: '3.25rem',
                  ml: '1.7rem',
                }}
                disabled={isLoading}
              />
            ),
          }}
        />
      </List>
    </SideBarFooterStyled>
  );
};

export default SideBarFooter;
