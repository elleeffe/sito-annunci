import {Box, Button, styled} from '@mui/material';
import {useRouter} from 'next/router';
import {useAdsContext} from '../../../contexts/AdsContext';
import {useUser} from '../../../contexts/UserContext';
import {Login, Logout, Person, PersonAddAlt1} from '@mui/icons-material';

const MobileUserMenu = () => {
  const {user, logout} = useUser();

  const {push} = useRouter();

  const {ads, setAds} = useAdsContext();

  return (
    <FlexWrap>
      {!user ? (
        <>
          <Button
            size="small"
            variant="text"
            startIcon={<Login />}
            sx={{
              marginLeft: '15px',
              transition: 'all 100ms linear',
            }}
            color="primary"
            onClick={() => {
              push({
                pathname: '/auth',
                query: {tab: 'login'},
              });
              ads && setAds(undefined);
            }}
          >
            Entra
          </Button>
          <Button
            size="small"
            variant="text"
            endIcon={<PersonAddAlt1 />}
            sx={{
              transition: 'all 100ms linear',
            }}
            color="success"
            onClick={() => {
              push({
                query: {tab: 'register'},
              });
              ads && setAds(undefined);
            }}
          >
            Registrati
          </Button>
        </>
      ) : (
        <>
          <Button
            size="small"
            variant="text"
            startIcon={<Person />}
            sx={{
              transition: 'all 100ms linear',
            }}
            color="primary"
            onClick={() => {
              push('/profilo');
              ads && setAds(undefined);
            }}
          >
            Vai al profilo
          </Button>
          <Button
            size="small"
            variant="text"
            endIcon={<Logout />}
            sx={{
              transition: 'all 100ms linear',
            }}
            color="success"
            onClick={() => {
              logout();
              ads && setAds(undefined);
            }}
          >
            Disconnetti
          </Button>
        </>
      )}
    </FlexWrap>
  );
};

export default MobileUserMenu;

const FlexWrap = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 15px',
  boxShadow: '0 5px 20px 5px rgb(35 38 58 / 10%)',
}));
