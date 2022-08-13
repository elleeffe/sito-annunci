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
import {useAdsContext} from '../../../contexts/AdsContext';

type Props = {
  isLogged: boolean;
  showPayment: boolean;
  currentAds: AdsFormValues;
};

const ConfirmStep = ({isLogged, showPayment, currentAds}: Props) => {
  const router = useRouter();

  const {isSm, isMd} = useResponsive();

  const {setAds} = useAdsContext();

  const handleConnection = useCallback(
    (value: 'login' | 'register') => {
      setAds(currentAds);
      router.push({
        pathname: '/auth',
        query: {tab: value},
      });
    },
    [router, currentAds, setAds]
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

  const showResume = useMemo(
    () => (!isLogged && !showPayment) || (isLogged && showPayment),
    [isLogged, showPayment]
  );

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
      {showResume && (
        <>
          {visibilityOption && (
            <>
              <StyledTitleH6 marginBottom="10px">
                Piano visibilità scelto
              </StyledTitleH6>
              <VisibilityCard option={visibilityOption} />
            </>
          )}
          <StyledTitleH6 marginBottom="15px" marginTop="35px">
            Anteprima ricerca
          </StyledTitleH6>
          <AdsCard ads={currentAds} isPreview />
          <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
            Titolo annuncio
          </StyledTitleH6>
          <Subtitle1>{currentAds.title}</Subtitle1>
          <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
            Descrizione annuncio
          </StyledTitleH6>
          <Subtitle2>{currentAds.description}</Subtitle2>
          <Box display="flex" flexWrap="wrap">
            <Box width={isSm ? '100%' : '50%'}>
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Categoria
              </StyledTitleH6>
              <Subtitle2>{currentAds.category}</Subtitle2>
            </Box>
            <Box>
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Email
              </StyledTitleH6>
              <Subtitle2>{currentAds.email}</Subtitle2>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Box width={isSm ? '100%' : '50%'}>
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Telefono
              </StyledTitleH6>
              <Subtitle2>{currentAds.phone}</Subtitle2>
            </Box>
            <Box>
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Whatsapp
              </StyledTitleH6>
              <Subtitle2>{currentAds.whatsapp ? 'Si' : 'No'}</Subtitle2>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Box width={isSm ? '100%' : '50%'}>
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Età
              </StyledTitleH6>
              <Subtitle2>{currentAds.age}</Subtitle2>
            </Box>
            <Box>
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Città
              </StyledTitleH6>
              <Subtitle2>
                {currentAds.city.toUpperCase()}
                {currentAds.neighborhood && `, ${currentAds.neighborhood}`}
              </Subtitle2>
            </Box>
          </Box>
          <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
            Aree/Zone vicine
          </StyledTitleH6>
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
              <StyledTitleH6 isSmall marginBottom="5px" marginTop="35px">
                Foto annuncio
              </StyledTitleH6>
              <ImageList
                variant="quilted"
                cols={imageListCols}
                gap={8}
                sx={{marginTop: '5px'}}
              >
                {currentAds.images.map((image) => (
                  <ImageListItem key={image.name}>
                    <img
                      src={`${image.base64}`}
                      alt={image.name}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
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

const StyledTitleH6 = styled(TitleH6)(({theme}) => ({
  fontSize: '20px',
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
  },
}));
