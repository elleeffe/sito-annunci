import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
} from '@mui/material';
import {
  Add,
  ArrowBack,
  Login,
  Logout,
  Person,
  PersonAddAlt1,
} from '@mui/icons-material';
import {TitleH6} from '../MyTypography';
import {useUser} from '../../contexts/UserContext';
import {useAdsContext} from '../../contexts/AdsContext';

type Props = {
  hidePublish?: boolean;
};

const Header = ({hidePublish}: Props) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {push} = useRouter();

  const {user, logout} = useUser();

  const {ads, setAds} = useAdsContext();

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((old) => (!!old ? null : event.currentTarget));
  }, []);

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
    <>
      <Wrap isScrolled={scrolled}>
        <Inner>
          <Box display="flex" alignItems="center">
            <Link href="/">
              <TitleH6 sx={{cursor: 'pointer'}}>Logo</TitleH6>
            </Link>
          </Box>
          <Box display="flex" alignItems="center">
            {!hidePublish ? (
              <Button
                size={scrolled || mobile ? 'small' : 'medium'}
                variant="contained"
                endIcon={<Add />}
                sx={{marginRight: '15px', transition: 'all 100ms linear'}}
                color="warning"
                onClick={() => push('/pubblica-annuncio')}
              >
                Pubblica annuncio
              </Button>
            ) : (
              <Button
                size={scrolled || mobile ? 'small' : 'medium'}
                variant="contained"
                endIcon={<ArrowBack />}
                sx={{marginRight: '15px', transition: 'all 100ms linear'}}
                color="warning"
                onClick={() => {
                  push('/');
                  ads && setAds(undefined);
                }}
              >
                Vai al sito
              </Button>
            )}
            {user ? (
              <IconButton
                color="primary"
                size={scrolled || mobile ? 'small' : 'medium'}
                onClick={handleClick}
              >
                <Person />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                size={scrolled || mobile ? 'small' : 'medium'}
                onClick={handleClick}
              >
                <Login />
              </IconButton>
            )}
          </Box>
        </Inner>
      </Wrap>
      <StyledPopover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
      >
        {user ? (
          <>
            <StyledListItemButton
              onClick={() => {
                push('/profilo');
                ads && setAds(undefined);
              }}
            >
              <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
                <Person
                  sx={{width: '20px', height: '20px'}}
                  className="item-button"
                />
              </ListItemIcon>
              <ListItemText primary="Profilo" className="item-button" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                logout();
                ads && setAds(undefined);
              }}
            >
              <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
                <Logout
                  sx={{width: '20px', height: '20px'}}
                  className="item-button"
                />
              </ListItemIcon>
              <ListItemText primary="Disconnetti" className="item-button" />
            </StyledListItemButton>
          </>
        ) : (
          <>
            <StyledListItemButton
              onClick={() => {
                push({
                  pathname: '/auth',
                  query: {tab: 'login'},
                });
                ads && setAds(undefined);
              }}
            >
              <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
                <Login
                  sx={{width: '20px', height: '20px'}}
                  className="item-button"
                />
              </ListItemIcon>
              <ListItemText primary="Accedi" className="item-button" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                push({
                  pathname: '/auth',
                  query: {tab: 'register'},
                });
                ads && setAds(undefined);
              }}
            >
              <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
                <PersonAddAlt1
                  sx={{width: '20px', height: '20px'}}
                  className="item-button"
                />
              </ListItemIcon>
              <ListItemText primary="Registrati" className="item-button" />
            </StyledListItemButton>
          </>
        )}
      </StyledPopover>
    </>
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

const StyledPopover = styled(Popover)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none',
    marginTop: '10px',
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({theme}) => ({
  paddingTop: '6px',
  paddingBottom: '6px',
  '&:hover': {
    '& .item-button': {
      color: theme.palette.primary.main,
    },
  },
}));
