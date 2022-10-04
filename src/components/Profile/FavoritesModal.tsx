import {useCallback, useEffect, useState} from 'react';
import {
  IconButton,
  Modal,
  styled,
  useMediaQuery,
  Box,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import {mockAds} from '../../utils/mocks';
import SkeletonCard from '../Card/SkeletonCard';
import AdsCard from '../Card/AdsCard';
import {Subtitle1, TitleH6} from '../MyTypography';
import {sleep} from '../../utils/utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const mockUserAds: Ads[] = new Array(5)
  .fill(mockAds)
  .map((el, i) => ({...el, id: el.id + i, isFavorite: true}));

const FavoritesModal = ({isOpen, onClose}: Props) => {
  const [ads, setAds] = useState<Ads[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [removeLoading, setRemoveLoading] = useState<string>();
  const [removeError, setRemoveError] = useState<string>();

  const match = useMediaQuery('(max-width:600px)');

  const getUserFavorites = useCallback(async () => {
    try {
      setLoading(true);
      // TODO
      await sleep(3000);
      setAds(mockUserAds);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemove = useCallback(async (id: string | undefined) => {
    if (!id) {
      return;
    }
    try {
      setRemoveError(undefined);
      setRemoveLoading(id);
      // TODO
      await sleep(1000);
      setRemoveLoading(undefined);
      // Optimistic update
      setAds((old) => old.filter((el) => el.id !== id));
    } catch (e) {
      console.log(e);
      setRemoveError(id);
    }
  }, []);

  useEffect(() => {
    getUserFavorites();
  }, [getUserFavorites]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ModalInner>
        <StyledPaper>
          <CloseButton
            onClick={onClose}
            color="error"
            size={match ? 'small' : 'medium'}
          >
            <Close />
          </CloseButton>
          <TitleH6 isSmall marginBottom="15px">
            Lista preferiti
          </TitleH6>
          <List>
            {loading && !error && (
              <>
                <SkeletonCard whiteBg />
                <SkeletonCard whiteBg />
              </>
            )}
            {!loading && error && (
              <Alert
                severity="error"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={getUserFavorites}
                  >
                    Riprova
                  </Button>
                }
              >
                Si è verificato un errore, riprovare.
              </Alert>
            )}
            {!loading &&
              !error &&
              (!!ads.length ? (
                ads.map((el) => (
                  <AdsCard
                    ads={el}
                    key={el.id}
                    onFavorite={() => handleRemove(el.id)}
                    favoriteError={!!removeError && removeError === el.id}
                    favoriteLoading={!!removeLoading && removeLoading === el.id}
                  />
                ))
              ) : (
                <>
                  <Subtitle1>Nessun annuncio aggiunto ai preferiti</Subtitle1>
                </>
              ))}
          </List>
        </StyledPaper>
      </ModalInner>
    </Modal>
  );
};
export default FavoritesModal;

const ModalInner = styled(Box)(({theme}) => ({
  display: 'flex',
  height: 'calc(100% - 10vh)',
  marginTop: '5vh',
  overflow: 'hidden',
  position: 'relative',
  padding: '0 15px',
  flex: 1,

  [theme.breakpoints.down('sm')]: {
    padding: '0 5px',
  },
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '900px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: ' 25px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',

  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
}));

const CloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '0px',
  right: '0px',
  zIndex: 1,

  [theme.breakpoints.down('md')]: {
    top: '5px',
    right: '5px',
  },
}));

const List = styled(Box)(() => ({
  flex: 1,
  overflow: 'auto',
}));
