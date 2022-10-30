import {styled, Box, CircularProgress} from '@mui/material';
import {useFiltersContext} from '../../contexts/FiltersContext';
import {useUser} from '../../contexts/UserContext';
import useAdsList from '../../hooks/useAdsList';
import Filters from './Filters';
import AdsCard from '../Card/AdsCard';
import {PageInner} from '../Layout';
import MyButton from '../Buttons/MyButton';
import {TitleH5} from '../MyTypography';
import ListHeader from './ListHeader';

const AdsList = () => {
  const {user} = useUser();

  const {filters, order} = useFiltersContext();

  const {
    adsList,
    listLoading,
    listError,
    getAdsList,
    handleFavorite,
    favoriteError,
    favoriteLoading,
  } = useAdsList(filters, order);

  return (
    <>
      <PageInner
        spacingHorizontal="right"
        spacingVertical="top"
        mobileOrder={2}
      >
        <ListHeader />
        <Box>
          {adsList.map((ads, i) => {
            const loading =
              ads.id !== undefined ? favoriteLoading === ads.id : false;
            const error =
              ads.id !== undefined ? favoriteError === ads.id : false;
            return (
              <AdsCard
                ads={ads}
                key={'adv-card-' + i}
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
      <Filters onChange={() => getAdsList(true)} />
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
  marginBottom: '25px',
}));
