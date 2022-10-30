import React, {useCallback, useState} from 'react';
import {useAdsContext} from '../../../contexts/AdsContext';
import {useUser} from '../../../contexts/UserContext';
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
} from '@mui/material';
import {Login, Logout, Person, PersonAddAlt1} from '@mui/icons-material';
import {useRouter} from 'next/router';

type Props = {
  isScrolled: boolean;
};

const DesktopUserMenu = ({isScrolled}: Props) => {
  const {user, logout} = useUser();

  const {push} = useRouter();

  const {ads, setAds} = useAdsContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((old) => (!!old ? null : event.currentTarget));
  }, []);

  return (
    <>
      {user ? (
        <Button
          size={isScrolled ? 'small' : 'medium'}
          variant="text"
          startIcon={<Person />}
          sx={{marginRight: '15px', transition: 'all 100ms linear'}}
          color="primary"
          onClick={handleClick}
        >
          Area privata
        </Button>
      ) : (
        <Button
          size={isScrolled ? 'small' : 'medium'}
          variant="text"
          startIcon={<Login />}
          sx={{marginRight: '15px', transition: 'all 100ms linear'}}
          color="primary"
          onClick={handleClick}
        >
          Entra
        </Button>
      )}
      <StyledPopover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
      >
        {user ? (
          <>
            <StyledListItemButton
              onClick={() => {
                push('/profilo');
                ads && setAds(undefined);
                setAnchorEl(null);
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
                setAnchorEl(null);
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
                setAnchorEl(null);
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
                setAnchorEl(null);
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

export default DesktopUserMenu;

const StyledPopover = styled(Popover)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: '0 5px 20px 5px rgb(35 38 58 / 10%)',
    marginTop: '5px',
    borderRadius: '4px',
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({theme}) => ({
  padding: ' 10px 15px',
  '&:hover': {
    '& .item-button': {
      color: theme.palette.primary.main,
    },
  },
}));
