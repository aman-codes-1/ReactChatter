import { List, Skeleton } from '@mui/material';
import { ListItem } from '../../../../components';
import { MainLayoutLoaderStyled } from './MainLayout.styled';

const MainLayoutLoader = ({
  avatarClassName,
  disablePrimary,
  disableSecondary,
  primaryFontSize,
  secondaryFontSize,
  sx,
  dense = false,
  btnAlignItems,
  btnClassName,
  listClassName,
  listItemTextClassName,
}: any) => (
  <MainLayoutLoaderStyled>
    <List dense={dense} disablePadding className={listClassName}>
      <ListItem
        disableGutters
        disableHover
        sx={sx}
        btnProps={{
          className: btnClassName,
          alignItems: btnAlignItems,
          textProps: {
            ...(disablePrimary
              ? {}
              : {
                  primary: <Skeleton className="primary-skeleton" />,
                  primaryTypographyProps: {
                    fontSize: primaryFontSize || '1.08rem',
                  },
                }),
            ...(disableSecondary
              ? {}
              : {
                  secondary: <Skeleton className="secondary-skeleton" />,
                  secondaryTypographyProps: {
                    fontSize: secondaryFontSize || '0.85rem',
                  },
                }),
            className: listItemTextClassName,
          },
          avatarProps: {
            children: (
              <Skeleton
                variant="circular"
                className={avatarClassName || 'avatar-skeleton'}
              />
            ),
          },
        }}
      />
    </List>
  </MainLayoutLoaderStyled>
);

export default MainLayoutLoader;
