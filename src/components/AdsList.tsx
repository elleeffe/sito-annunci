import {styled, Box, CircularProgress} from '@mui/material';
import {useFiltersContext} from '../contexts/FiltersContext';
import {useUser} from '../contexts/UserContext';
import useAdsList from '../hooks/useAdsList';
import AdsFilter from './AdsFilter';
import AdsCard from './Card/AdsCard';
import {PageInner} from './Layout';
import MyButton from './Buttons/MyButton';
import {TitleH5} from './MyTypography';

const AdsList = () => {
  const {user} = useUser();

  const {filters, orders} = useFiltersContext();

  const {
    adsList,
    listLoading,
    listError,
    getAdsList,
    handleFavorite,
    favoriteError,
    favoriteLoading,
  } = useAdsList(filters, orders);

  return (
    <>
      <AdsFilter onChange={() => getAdsList(true)} />
      <PageInner spacingHorizontal="left" spacingVertical="top">
        <TitleH5>Risultati di ricerca</TitleH5>
        <Box>
          {adsList.map((ads) => {
            const loading =
              ads.id !== undefined ? favoriteLoading === ads.id : false;
            const error =
              ads.id !== undefined ? favoriteError === ads.id : false;
            return (
              <AdsCard
                ads={ads}
                key={ads.id}
                whiteBg
                onFavorite={user ? handleFavorite : undefined}
                favoriteError={error}
                favoriteLoading={loading}
              />
            );
          })}
          <ListFooter>
            {listLoading && <CircularProgress color="primary" size={50} />}
            {!listLoading && !listError && !!adsList.length && (
              <MyButton
                onClick={() => getAdsList(false)}
                color="primary"
                variant="contained"
              >
                Mostra altro
              </MyButton>
            )}
            {!listLoading && !listError && !adsList.length && (
              <>
                <TitleH5 width="100%" textAlign="center" marginBottom="15px">
                  Nessun risultato
                </TitleH5>
                <MyButton
                  onClick={() => getAdsList(true)}
                  color="primary"
                  variant="contained"
                >
                  Ricarica
                </MyButton>
              </>
            )}
            {!listLoading && listError && (
              <MyButton
                onClick={() => getAdsList(false)}
                variant="contained"
                color="primary"
              >
                Riprova
              </MyButton>
            )}
          </ListFooter>
        </Box>
      </PageInner>
    </>
  );
};

export default AdsList;

const ListFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: '25px',
}));
