import {useState, useEffect, useCallback, PropsWithChildren} from 'react';
import axios from 'axios';
import {useUser} from '../../contexts/UserContext';
import {CircularProgress, Box, styled, Paper, Button} from '@mui/material';

import Layout from '.';
import {Body1, StyledButton, TitleH5, TitleH3} from '../MyTypography';
import {useRouter} from 'next/router';
import {mockUser} from '../../utils/mocks';
import {sleep} from '../../utils/utils';
import MyModal from '../MyModal';

export const LoadingScreen = () => (
  <Wrap>
    <CircularProgress color="primary" size={50} />
  </Wrap>
);

const AuthLoading = ({children}: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<boolean>(true);

  const {user, login} = useUser();

  const router = useRouter();

  const handleEnter = useCallback(() => {
    localStorage.setItem('sos-incontri-adulti', 'termini e condizioni');
    setModal(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/check-session');
        // login(response.data);
        const response = await sleep(1000);
        // login(mockUser);
        setLoading(false);
      } catch (e) {
        setTimeout(() => setLoading(false), 1000);
        console.log(e);
      }
    })();
  }, [login]);

  useEffect(() => {
    if (
      localStorage.getItem('sos-incontri-adulti') ||
      router.query.permission ||
      user // per le pagine termini e condizioni, privacy e cookie policy
    ) {
      !localStorage.getItem('sos-incontri-adulti') &&
        localStorage.setItem('sos-incontri-adulti', 'termini e condizioni');
      setModal(false);
    } else {
      setModal(true);
    }
  }, [router, user]);

  if (loading) {
    return <Layout hideHeader></Layout>;
  }

  if (modal) {
    return (
      <Wrap isBlue>
        <MyModal isOpen={true} title="Avviso agli utenti">
          <Box>
            <TitleH3 gutterBottom>Sos incontri</TitleH3>
            <TitleH5 marginBottom="10px">Contenuti per adulti</TitleH5>
            <StyledBody1>
              Questo sito contiene immagini e contenuti rivolti ad un pubblico
              adulto ed è accessibile solo a persone che abbiano raggiunto la
              maggiore età prevista dalla legge dal Paese dal quale si accede al
              sito.
            </StyledBody1>
            <StyledBody1>
              Sos incontri non crea né produce alcun contenuto pubblicitario
              presente nel sito e gli inserzionisti devono rispettare i nostri
              standard di età e contenuti nei propri annunci pubblicitari.
            </StyledBody1>
            <StyledBody1>
              Sos incontri ha una politica di tolleranza zero nei confronti
              della pornografia infantile, della pedofilia e nei confronti dei
              minori che tentassero di pubblicizzarsi attraverso il nostro sito.
              Qualsiasi attività riguardante tali reati verrà denunciata alle
              autorità competenti.
            </StyledBody1>
            <StyledBody1>
              Accedendo a questo sito Web, dichiari di essere maggiorenne e di
              accettare le Condizioni d'uso e di esonerare Sos incontri da
              qualsiasi responsabilità derivante dall'uso del sito.
            </StyledBody1>
            <StyledBody1>
              Per leggere la nostra privacy policy ed i nostri termini e
              condizioni{' '}
              <StyledButton
                onClick={() => {
                  router.push({
                    pathname: '/termini-e-condizioni',
                    query: {permission: true},
                  });
                }}
              >
                clicca qui
              </StyledButton>
              .
            </StyledBody1>
          </Box>
          <ButtonWrap>
            <Button
              variant="text"
              color="error"
              size="small"
              sx={{marginRight: '25px'}}
            >
              <a href="https://google.com">Abbandona sito</a>
            </Button>
            <Button variant="contained" size="small" onClick={handleEnter}>
              Accetta e continua
            </Button>
          </ButtonWrap>
        </MyModal>
      </Wrap>
    );
  }

  return <>{children}</>;
};

export default AuthLoading;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isBlue',
})<{isBlue?: boolean}>(({theme, isBlue}) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(isBlue
    ? {background: theme.palette.primary.main}
    : {background: theme.palette.background.default}),
}));

const StyledBody1 = styled(Body1)(() => ({
  marginBottom: '10px',
}));

const ButtonWrap = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '25px',
}));
