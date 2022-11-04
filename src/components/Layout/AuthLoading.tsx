import {useState, useCallback, PropsWithChildren, useEffect} from 'react';
import {useUser} from '../../contexts/UserContext';
import {CircularProgress, Box, styled, Button} from '@mui/material';
import {Body1, StyledButton, TitleH5, TitleH3} from '../MyTypography';
import {useRouter} from 'next/router';
import MyModal from '../MyModal';

export const LoadingScreen = () => (
  <Wrap isHide={false}>
    <CircularProgress color="primary" size={50} />
  </Wrap>
);

const AuthLoading = ({children}: PropsWithChildren) => {
  const [modal, setModal] = useState<boolean>(true);

  const {loading} = useUser();

  const router = useRouter();

  const handleEnter = useCallback(() => {
    localStorage.setItem('sos-incontri-adulti', 'termini e condizioni');
    setModal(false);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('sos-incontri-adulti') ||
      router.query.permission
    ) {
      !localStorage.getItem('sos-incontri-adulti') &&
        localStorage.setItem('sos-incontri-adulti', 'termini e condizioni');
      setModal(false);
    } else {
      setModal(true);
    }
  }, [router]);

  return (
    <>
      {children}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Wrap isBlue isHide={!modal}>
          <MyModal isOpen={modal} title="Avviso agli utenti">
            <Box>
              <TitleH3 gutterBottom>Sos incontri</TitleH3>
              <TitleH5 marginBottom="10px">Contenuti per adulti</TitleH5>
              <StyledBody1>
                Questo sito contiene immagini e contenuti rivolti ad un pubblico
                adulto ed è accessibile solo a persone che abbiano raggiunto la
                maggiore età prevista dalla legge dal Paese dal quale si accede
                al sito.
              </StyledBody1>
              <StyledBody1>
                Sos incontri non crea né produce alcun contenuto pubblicitario
                presente nel sito e gli inserzionisti devono rispettare i nostri
                standard di età e contenuti nei propri annunci pubblicitari.
              </StyledBody1>
              <StyledBody1>
                Sos incontri ha una politica di tolleranza zero nei confronti
                della pornografia infantile, della pedofilia e nei confronti dei
                minori che tentassero di pubblicizzarsi attraverso il nostro
                sito. Qualsiasi attività riguardante tali reati verrà denunciata
                alle autorità competenti.
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
      )}
    </>
  );
};

export default AuthLoading;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isBlue' && prop !== 'isHide',
})<{isBlue?: boolean; isHide: boolean}>(({theme, isBlue, isHide}) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 500ms ease',
  ...(isBlue
    ? {background: theme.palette.primary.main}
    : {background: theme.palette.background.default}),
  ...(isHide
    ? {opacity: 0, visibility: 'hidden'}
    : {opacity: 1, visibility: 'visible'}),
}));

const StyledBody1 = styled(Body1)(() => ({
  marginBottom: '10px',
}));

const ButtonWrap = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '25px',
}));
