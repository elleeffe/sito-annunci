import React, {useCallback, useEffect, useState} from 'react';
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
import {Add, ArrowBack, Login, PersonAddAlt1} from '@mui/icons-material';
import {TitleH6} from '../MyTypography';
import {useRouter} from 'next/router';

type Props = {
  hidePublish?: boolean;
};

const Header = ({hidePublish}: Props) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((old) => (!!old ? null : event.currentTarget));
  }, []);

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
    <>
      <Wrap isScrolled={scrolled}>
        <Inner>
          <TitleH6>Logo</TitleH6>
          <Box display="flex" alignItems="center">
            {!hidePublish ? (
              <Button
                size={scrolled || mobile ? 'small' : 'medium'}
                variant="contained"
                endIcon={<Add />}
                sx={{marginRight: '15px', transition: 'all 100ms linear'}}
                color="warning"
                onClick={() => router.push('/pubblica-annuncio')}
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
                onClick={() => router.push('/')}
              >
                Torna al sito
              </Button>
            )}
            <IconButton
              color="primary"
              size={scrolled || mobile ? 'small' : 'medium'}
              onClick={handleClick}
            >
              <Login />
            </IconButton>
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
        <StyledListItemButton
          onClick={() =>
            router.push({
              pathname: '/auth',
              query: {tab: 'login'},
            })
          }
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
          onClick={() =>
            router.push({
              pathname: '/auth',
              query: {tab: 'register'},
            })
          }
        >
          <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
            <PersonAddAlt1
              sx={{width: '20px', height: '20px'}}
              className="item-button"
            />
          </ListItemIcon>
          <ListItemText primary="Registrati" className="item-button" />
        </StyledListItemButton>
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
