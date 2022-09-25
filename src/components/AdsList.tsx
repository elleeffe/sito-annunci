import {styled, Box, CircularProgress} from '@mui/material';
import {useFiltersContext} from '../contexts/FiltersContext';
import useAdsList from '../hooks/useAdsList';
import AdsFilter from './AdsFilter';
import AdsCard from './Card/AdsCard';
import MyButton from './MyButton';
import {TitleH6} from './MyTypography';

const AdsList = () => {
  const {filters, orders} = useFiltersContext();

  const {adsList, loading, error, getAdsList} = useAdsList(filters, orders);

  return (
    <>
      <AdsFilter onChange={() => getAdsList(true)} />
      <Wrap>
        <TitleH6>Risultati &#40;{adsList.flat().length}&#41;</TitleH6>
        <List>
          {adsList.map((ads) => (
            <AdsCard ads={ads} key={ads.id} whiteBg />
          ))}
          <Box display="flex" justifyContent="center" marginTop="25px">
            {loading && <CircularProgress color="primary" size={50} />}
            {!loading && !error && (
              <MyButton
                onClick={() => getAdsList(false)}
                color="primary"
                variant="contained"
              >
                Mostra altro
              </MyButton>
            )}
            {!loading && error && (
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
