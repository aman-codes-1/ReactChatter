import { useContext, useLayoutEffect, useRef } from 'react';
import { Skeleton, Typography } from '@mui/material';
import { MainLayoutLoader, SuccessErrorMessage } from '../..';
import { DrawerContext } from '../../../contexts';
import { MainLayoutProps } from './IMainLayout';
import { MainLayoutStyled } from './MainLayout.styled';
import { useClient } from '../../../hooks';

const MainLayout = ({
  heading = '',
  description = '',
  loading = false,
  loadingProps,
  loadingData = false,
  loadingDataProps,
  data,
  error = '',
  disablePadding = false,
  onError,
  className,
  children,
}: MainLayoutProps) => {
  const { navBarHeight } = useContext(DrawerContext);
  const { isNetworkError } = useClient();
  const msgRef = useRef<HTMLDivElement | null>(null);
  const isError = !!error || isNetworkError;
  const errorMessage =
    error ||
    (isNetworkError &&
      'An error occurred while retrieving data from the server, please try again later.');

  useLayoutEffect(() => {
    if (!!error || isNetworkError) {
      onError?.();
    }
  }, [error, isNetworkError]);

  return (
    <MainLayoutStyled
      navBarHeight={navBarHeight}
      disablePadding={disablePadding}
      isHeading={!!heading}
      className={className}
    >
      {(loading && !loadingProps?.disableHeading) || heading ? (
        <Typography className="main-layout-heading">
          {loading ? (
            <Skeleton className="main-layout-heading-skeleton" />
          ) : (
            heading
          )}
        </Typography>
      ) : null}
      {loadingData ? <MainLayoutLoader {...loadingDataProps} /> : null}
      {!loadingData && isError ? (
        <SuccessErrorMessage
          ref={msgRef}
          message={errorMessage}
          type="error"
          className="main-layout-margin-top"
        />
      ) : null}
      {(loading && !loadingProps?.disableDescription) ||
      (!loadingData && !isError && description) ? (
        <Typography className="main-layout-description main-layout-margin-top">
          {loading ? (
            <Skeleton className="main-layout-description-skeleton" />
          ) : (
            description
          )}
        </Typography>
      ) : null}
      {!loadingData && !isError && (data?.length || !data) ? children : null}
    </MainLayoutStyled>
  );
};

export default MainLayout;
