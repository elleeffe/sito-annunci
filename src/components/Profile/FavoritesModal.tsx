import {useCallback, useEffect, useState} from 'react';
import {useMediaQuery, Button, Alert} from '@mui/material';
import {mockAds} from '../../utils/mocks';
import SkeletonCard from '../Card/SkeletonCard';
import AdsCard from '../Card/AdsCard';
import {TitleH4} from '../MyTypography';
import {sleep} from '../../utils/utils';
import MyModal from '../MyModal';

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
  }, []);

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title="I tuoi preferiti"
      size="large"
    >
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
            <Button color="inherit" size="small" onClick={getUserFavorites}>
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
            <TitleH4>Nessun annuncio aggiunto ai preferiti</TitleH4>
          </>
        ))}
    </MyModal>
  );
};
export default FavoritesModal;
