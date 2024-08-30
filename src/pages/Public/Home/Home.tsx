import { Button, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getCurrentYear } from '../../../helpers';
import { HomeStyled } from './Home.styled';

const Home = () => (
  <HomeStyled>
    <div className="home-header">
      <Typography className="home-heading" fontWeight={700}>
        ReactChatter
      </Typography>
      <Typography className="home-sub-heading" fontWeight={700}>
        A simple real-time chat application built using
        <br />
        React.js v18, Material UI, Typescript, Nest.js, and GraphQL
        Subscriptions.
      </Typography>
      <Button
        component={Link}
        to="/login"
        size="large"
        variant="contained"
        className="home-login-btn"
      >
        Login
      </Button>
    </div>
    <div className="home-footer">
      <Typography className="home-footer-sub-heading" fontWeight={400}>
        Made with ❤️ by{' '}
        <MuiLink
          href="https://www.linkedin.com/in/aman-jain-4b24b8111/"
          target="_blank"
          rel="noreferrer"
          underline="none"
          color="black"
        >
          <strong>Aman Jain</strong>
        </MuiLink>
        {' | '}
        <MuiLink
          href="https://github.com/aman-codes-1/ReactChatter"
          target="_blank"
          rel="noreferrer"
          underline="none"
          color="black"
        >
          <strong>Source Code</strong>
        </MuiLink>
      </Typography>
      <Typography className="home-footer-sub-heading" fontWeight={400}>
        &copy; {getCurrentYear()} by{' '}
        <MuiLink
          href="https://bold.pro/my/aman-codes"
          target="_blank"
          rel="noreferrer"
          underline="none"
          color="black"
        >
          <strong>Aman.codes</strong>
        </MuiLink>{' '}
        All rights reserved.
      </Typography>
    </div>
  </HomeStyled>
);

export default Home;
