import { List, Skeleton } from '@mui/material';
import { ListItem } from '../../../../components';
import { MainLayoutLoaderStyled } from './MainLayout.styled';

const MainLayoutLoader = ({
  dense = false,
  disablePadding = false,
  disableGutters = false,
  sx,
  avatarClassName,
  disablePrimary,
  disableSecondary,
  primaryFontSize,
  secondaryFontSize,
  btnAlignItems,
  btnClassName,
  listClassName,
  listItemTextClassName,
}: any) => (
  <MainLayoutLoaderStyled>
    <List dense={dense} disablePadding className={listClassName}>
      <ListItem
        disableHover
        disablePadding={disablePadding}
        disableGutters
        sx={sx}
        btnProps={{
          disableGutters,
          className: btnClassName,
          alignItems: btnAlignItems,
          textProps: {
            ...(disablePrimary
              ? {}
              : {
                  primary: <Skeleton className="primary-skeleton" />,
                  primaryTypographyProps: {
                    fontSize: primaryFontSize || '1.125',
                  },
                }),
            ...(disableSecondary
              ? {}
              : {
                  secondary: <Skeleton className="secondary-skeleton" />,
                  secondaryTypographyProps: {
                    fontSize: secondaryFontSize || '0.875rem',
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
