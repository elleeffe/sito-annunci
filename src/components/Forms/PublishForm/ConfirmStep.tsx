import {useCallback, useMemo} from 'react';
import {
  Alert,
  Box,
  Chip,
  ImageList,
  ImageListItem,
  styled,
} from '@mui/material';
import {useRouter} from 'next/router';
import MyButton from '../../MyButton';
import {StyledButton, Subtitle1, Subtitle2, TitleH6} from '../../MyTypography';
import AdsCard from '../../Card/AdsCard';
import VisibilityCard from '../../Card/VisibilityCard';
import {visibilityOptions} from '../../../utils/config';
import useResponsive from '../../../hooks/useResponsive';

type Props = {
  isLogged: boolean;
  showPayment: boolean;
  currentAds: AdsFormValues;
};

const ConfirmStep = ({isLogged, showPayment, currentAds}: Props) => {
  const router = useRouter();

  const {isSm, isMd} = useResponsive();

  const handleConnection = useCallback(
    (value: 'login' | 'register') => {
      localStorage.setItem('ads-to-confirm', JSON.stringify(currentAds));
      router.push({
        pathname: '/auth',
        query: {tab: value},
      });
    },
    [router, currentAds]
  );

  const visibilityOption = useMemo(
    () =>
      visibilityOptions.find(
        (option) => option.value === currentAds.visibilityOption
      ),
    [currentAds]
  );

  const imageListCols = useMemo(() => {
    if (isSm) {
      return 1;
    }
    if (isMd) {
      return 2;
    }
    return 3;
  }, [isSm, isMd]);

  return (
    <Wrap>
      <TitleH6 marginBottom="20px">Riepilogo annuncio</TitleH6>
      {!isLogged &&
        (showPayment ? (
          <Overlay>
            <Box>
              <TitleH6 marginBottom="20px">Collega un account</TitleH6>
              <Subtitle1 marginBottom="20px">
                Hai selezionato opzioni di visibilità per cui è necessario
                collegare un account all'annuncio prima della creazione
              </Subtitle1>
              <MyButton
                onClick={() => handleConnection('login')}
                variant="contained"
                sx={{marginRight: '20px'}}
              >
                Accedi
              </MyButton>
              <MyButton
                onClick={() => handleConnection('register')}
                color="warning"
              >
                Crea account
              </MyButton>
            </Box>
          </Overlay>
        ) : (
          <Alert severity="warning" sx={{marginBottom: '25px'}}>
            Stai creando un annuncio anonimo che sarà visibile solo per 7
            giorni.
            <br />
            <StyledButton onClick={() => handleConnection('login')}>
              Accedi
            </StyledButton>{' '}
            o{' '}
            <StyledButton onClick={() => handleConnection('register')}>
              registrati
            </StyledButton>{' '}
            per renderlo permanente!
          </Alert>
        ))}
      <Subtitle1 marginBottom="15px">Anteprima ricerca</Subtitle1>
      <AdsCard ads={currentAds} isPreview />
      <TitleH6 isSmall marginBottom="5px" marginTop="35px">
        Titolo annuncio
      </TitleH6>
      <Subtitle1>{currentAds.title}</Subtitle1>
      <TitleH6 isSmall marginBottom="5px" marginTop="35px">
        Descrizione annuncio
      </TitleH6>
      <Subtitle2>{currentAds.description}</Subtitle2>
      <Box display="flex" flexWrap="wrap">
        <Box marginRight="150px">
          <TitleH6 isSmall marginBottom="5px" marginTop="35px">
            Età
          </TitleH6>
          <Subtitle2>{currentAds.age}</Subtitle2>
        </Box>
        <Box>
          <TitleH6 isSmall marginBottom="5px" marginTop="35px">
            Città
          </TitleH6>
          <Subtitle2>
            {currentAds.city.toUpperCase()}
            {currentAds.neighborhood && `, ${currentAds.neighborhood}`}
          </Subtitle2>
        </Box>
      </Box>
      <TitleH6 isSmall marginBottom="5px" marginTop="35px">
        Aree/Zone vicine
      </TitleH6>
      {currentAds.areas && (
        <Box display="flex" flexWrap="wrap">
          {currentAds.areas.map((area) => (
            <Chip
              color="primary"
              key={area}
              label={area}
              sx={{
                marginBottom: '8px',
                marginRight: '9px',
                color: '#fff',
                fontSize: '16px',
              }}
            />
          ))}
        </Box>
      )}
      {currentAds.images && (
        <>
          <TitleH6 isSmall marginBottom="5px" marginTop="35px">
            Foto annuncio
          </TitleH6>
          <ImageList variant="quilted" cols={imageListCols} gap={8}>
            {currentAds.images.map((image) => (
              <ImageListItem key={image.name}>
                <img src={`${image.base64}`} alt={image.name} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
      {visibilityOption && (
        <>
          <Subtitle1 marginBottom="10px" marginTop="35px">
            Piano visibilità scelto
          </Subtitle1>
          <VisibilityCard option={visibilityOption} />
        </>
      )}
    </Wrap>
  );
};

export default ConfirmStep;

const Wrap = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '30px',
  position: 'relative',
  flex: 1,
}));

const Overlay = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 1)',
  textAlign: 'center',
  padding: '0 100px',

  [theme.breakpoints.down('md')]: {
    padding: '0 50px',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));
