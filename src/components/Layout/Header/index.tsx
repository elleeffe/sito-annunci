import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  styled,
} from '@mui/material';
import {Add, ArrowBack} from '@mui/icons-material';
import {TitleH3} from '../../MyTypography';
import {useAdsContext} from '../../../contexts/AdsContext';
import DesktopNavLink from './DesktopNavLink';
import {routes} from '../../../utils/config';
import useResponsive from '../../../hooks/useResponsive';
import DesktopUserMenu from './DesktopUserMenu';
import MenuIcon from '@mui/icons-material/Menu';
import MobileNavLink from './MobileNavLink';
import MobileUserMenu from './MobileUserMenu';

type Props = {
  hidePublish?: boolean;
};

const Header = ({hidePublish}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const {isSm, isMd} = useResponsive();

  const {push} = useRouter();

  const {ads, setAds} = useAdsContext();

  const navCallToAction = useMemo(() => {
    if (!hidePublish) {
      return (
        <Button
          size={scrolled || isSm ? 'small' : 'medium'}
          variant="outlined"
          endIcon={<Add />}
          sx={{transition: 'all 100ms linear'}}
          color="warning"
          onClick={() => push('/pubblica-annuncio')}
        >
          Pubblica annuncio
        </Button>
      );
    }
    return (
      <Button
        size={scrolled || isSm ? 'small' : 'medium'}
        variant="outlined"
        endIcon={<ArrowBack />}
        sx={{transition: 'all 100ms linear'}}
        color="warning"
        onClick={() => {
          push('/');
          ads && setAds(undefined);
        }}
      >
        Vai al sito
      </Button>
    );
  }, [hidePublish, scrolled, ads, isSm, push, setAds]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Wrap isScrolled={scrolled}>
        <Inner>
          {isMd ? (
            <>
              <Link href="/">
                <TitleH3 sx={{cursor: 'pointer'}}>Logo</TitleH3>
              </Link>
              {navCallToAction}
              <IconButton
                color="primary"
                size={scrolled || isSm ? 'small' : 'medium'}
                onClick={() => setIsOpen((old) => !old)}
              >
                <MenuIcon />
              </IconButton>
              <StyledDrawer
                anchor="top"
                open={isOpen}
                onClose={() => setIsOpen(false)}
              >
                <DrawerInner isScrolled={scrolled}>
                  {routes.map((route, i) => (
                    <MobileNavLink key={'nav-link-' + i} route={route} />
                  ))}
                </DrawerInner>
                <MobileUserMenu />
              </StyledDrawer>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="center">
                <Link href="/">
                  <TitleH3 sx={{cursor: 'pointer', marginRight: '25px'}}>
                    Logo
                  </TitleH3>
                </Link>
                {routes.map((route, i) => (
                  <DesktopNavLink key={'nav-link-' + i} route={route} />
                ))}
              </Box>
              <InnerRight>
                <DesktopUserMenu isScrolled={scrolled} />
                {navCallToAction}
              </InnerRight>
            </>
          )}
        </Inner>
      </Wrap>
    </>
  );
};

export default Header;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{isScrolled: boolean}>(({theme, isScrolled}) => ({
  ...(isScrolled ? {height: '60px'} : {height: '75px'}),
  transition: 'all 100ms linear',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: theme.palette.background.default,
  zIndex: 100,
  boxShadow: '0 5px 20px 5px rgb(35 38 58 / 10%)',

  [theme.breakpoints.down('md')]: {
    ...(isScrolled ? {height: '55px'} : {height: '65px'}),
  },
}));

const Inner = styled(Container)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 auto',
  height: '100%',
}));

const InnerRight = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
}));

const DrawerInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{isScrolled: boolean}>(({isScrolled}) => ({
  paddingBottom: '25px',
  overflow: 'auto',
  width: '100vw',
  height: '100vh',
  ...(isScrolled ? {paddingTop: '75px'} : {paddingTop: '85px'}),
}));

const StyledDrawer = styled(Drawer)(() => ({
  zIndex: 10,
  '& .MuiPaper-root': {
    height: '100vh',
  },
}));
