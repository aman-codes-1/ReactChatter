import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { circularProgressClasses } from '@mui/material/CircularProgress';
import { ILoaderProps } from './ILoaderProps';

const Loader = ({ message, center, height, width, color }: ILoaderProps) => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    direction="column"
    sx={{ minHeight: center ? '80vh' : height || '25vh' }}
    spacing={0}
    width={width || '100%'}
  >
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={25}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: color || ((theme) => theme.palette.primary.main),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={25}
        thickness={4}
      />
    </Box>
    {message && <Typography pt={1}>{message}</Typography>}
  </Grid>
);

export default Loader;
