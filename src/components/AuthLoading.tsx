import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useUser} from '../context/UserContext';
import {CircularProgress, Box, styled, Paper, Button} from '@mui/material';

import Layout from './Layout';
import {Body1, StyledButton, Subtitle1, TitleH3} from './MyTypography';
import {useRouter} from 'next/router';

interface Props {
  children: React.ReactElement;
}
const sleep = (ms: number) =>
  new Promise((res, rej) => setTimeout(() => rej(''), ms));

const AuthLoading = ({children}: Props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<boolean>(true);

  const {setUser} = useUser();

  const router = useRouter();

  const handleEnter = useCallback(() => {
    localStorage.setItem('sos-incontri-adulti', 'termini e condizioni');
    setModal(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/check-session');
        // setUser(response.data);
        const response = await sleep(1000);
        setModal(false);
        setLoading(false);
      } catch (e) {
        setTimeout(() => setLoading(false), 1000);
        console.log(e);
      }
    })();
  }, [setUser]);

  useEffect(() => {
    if (
      localStorage.getItem('sos-incontri-adulti') ||
      router.query.permission // per le pagine termini e condizioni, privacy e cookie policy
    ) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [router]);

  if (loading) {
    return (
      <Layout hideHeader>
        <Wrap>
          <CircularProgress color="primary" size={50} />
        </Wrap>
      </Layout>
    );
  }

  if (modal) {
    return (
      <ModalWrap>
        <ModalInner>
          <Box textAlign="center">
            <TitleH3 gutterBottom>Sos incontri</TitleH3>
            <Subtitle1 textTransform="uppercase" marginBottom="15px">
              Contenuti per adulti
            </Subtitle1>
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
          </Box>
          <ButtonWrap>
            <Box display="flex" marginBottom="25px">
              <Button variant="contained" size="small" onClick={handleEnter}>
                Accedi al sito
              </Button>
              <Button
                variant="text"
                color="error"
                size="small"
                sx={{marginLeft: '25px'}}
              >
                <a href="https://google.com">Abbandona</a>
              </Button>
            </Box>
            <StyledButton
              onClick={() => {
                router.push({
                  pathname: '/termini-e-condizioni',
                  query: {permission: true},
                });
              }}
            >
              Leggi termini e condizioni
            </StyledButton>
          </ButtonWrap>
        </ModalInner>
      </ModalWrap>
    );
  }

  return children;
};

export default AuthLoading;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.default,
}));

const ModalWrap = styled(Box)(({theme}) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.primary.main,
}));

const ModalInner = styled(Paper)(({theme}) => ({
  width: '90vw',
  height: '95vh',
  maxWidth: '700px',
  maxHeight: '630px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  padding: '25px',
  overflow: 'auto',

  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));

const StyledBody1 = styled(Body1)(() => ({
  marginBottom: '20px',
}));

const ButtonWrap = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));
