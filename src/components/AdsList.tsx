import {styled, Box, CircularProgress} from '@mui/material';
import {useFiltersContext} from '../contexts/FiltersContext';
import {useUser} from '../contexts/UserContext';
import useAdsList from '../hooks/useAdsList';
import AdsFilter from './AdsFilter';
import AdsCard from './Card/AdsCard';
import MyButton from './MyButton';
import {TitleH6} from './MyTypography';

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
      <Wrap>
        <TitleH6>Risultati &#40;{adsList.flat().length}&#41;</TitleH6>
        <List>
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
          <Box display="flex" justifyContent="center" marginTop="25px">
            {listLoading && <CircularProgress color="primary" size={50} />}
            {!listLoading && !listError && (
              <MyButton
                onClick={() => getAdsList(false)}
                color="primary"
                variant="contained"
              >
                Mostra altro
              </MyButton>
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
          </Box>
        </List>
      </Wrap>
    </>
  );
};

export default AdsList;

const Wrap = styled(Box)(({theme}) => ({
  flex: 1,
  paddingLeft: '20px',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flex: 'initial',
    paddingLeft: '0px',
    marginTop: '25px',
  },
}));

const List = styled(Box)(() => ({
  marginTop: '25px',
}));
