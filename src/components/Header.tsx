import React, {useEffect, useState} from 'react';
import {Box, Button, Container, IconButton, styled} from '@mui/material';
import {Add, Login} from '@mui/icons-material';
import {TitleH6} from './MyTypography';
import {useRouter} from 'next/router';

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () =>
      setMobile(window.matchMedia('(max-width: 600px)').matches);

    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrap isScrolled={scrolled}>
      <Inner>
        <TitleH6>Logo</TitleH6>
        <Box display="flex" alignItems="center">
          {mobile ? (
            <IconButton
              size="small"
              color="primary"
              onClick={() => router.push('/auth')}
            >
              <Login />
            </IconButton>
          ) : (
            <Button
              endIcon={<Login />}
              size={scrolled || mobile ? 'small' : 'medium'}
              sx={{transition: 'all 100ms linear'}}
              onClick={() => router.push('/auth')}
            >
              Accedi
            </Button>
          )}
          <Button
            size={scrolled || mobile ? 'small' : 'medium'}
            variant="contained"
            endIcon={<Add />}
            sx={{marginLeft: '10px', transition: 'all 100ms linear'}}
            color="warning"
          >
            Pubblica annuncio
          </Button>
        </Box>
      </Inner>
    </Wrap>
  );
};

export default Header;

const Wrap = styled(Box)<{isScrolled: boolean}>(({theme, isScrolled}) => ({
  ...(isScrolled ? {height: '55px'} : {height: '70px'}),
  transition: 'all 100ms linear',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: theme.palette.background.default,
  zIndex: 100,
  boxShadow: '0 5px 20px 5px rgb(35 38 58 / 10%)',
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  height: '100%',
}));
