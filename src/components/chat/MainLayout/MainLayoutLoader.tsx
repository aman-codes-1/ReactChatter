import { Skeleton } from '@mui/material';
import { ListItem } from '../..';
import { MainLayoutLoaderStyled } from './MainLayout.styled';

const MainLayoutLoader = ({
  dense = false,
  disablePadding = false,
  disableGutters = false,
  dataCount = 1,
  disablePrimary = false,
  disableSecondary = false,
  disableAvatar = false,
  primaryFontSize,
  secondaryFontSize,
  className,
  listItemClassName,
  listItemButtonClassName,
  listItemTextClassName,
  listItemAvatarClassName,
  sx,
}: any) => {
  const data = Array.from({ length: dataCount || 1 }, (_, idx) => idx + 1);

  return (
    <MainLayoutLoaderStyled dense={dense} disablePadding className={className}>
      {data?.map((item: number) => (
        <ListItem
          key={item}
          disableHover
          disablePadding={disablePadding}
          disableGutters
          sx={sx}
          className={listItemClassName}
          btnProps={{
            disableGutters,
            className: listItemButtonClassName,
            textProps: {
              ...(disablePrimary
                ? {}
                : {
                    primary: <Skeleton className="primary-skeleton" />,
                    slotProps: {
                      primary: {
                        fontSize: primaryFontSize || '1rem',
                      },
                    },
                  }),
              ...(disableSecondary
                ? {}
                : {
                    secondary: <Skeleton className="secondary-skeleton" />,
                    slotProps: {
                      secondary: {
                        fontSize: secondaryFontSize || '0.875rem',
                      },
                    },
                  }),
              className: listItemTextClassName,
            },
            ...(disableAvatar
              ? {}
              : {
                  avatarProps: {
                    loading: true,
                    className: listItemAvatarClassName,
                  },
                }),
          }}
        />
      ))}
    </MainLayoutLoaderStyled>
  );
};

export default MainLayoutLoader;
