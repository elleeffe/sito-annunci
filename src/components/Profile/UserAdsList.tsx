import {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Button, styled} from '@mui/material';
import {Subtitle1, TitleH6} from '../MyTypography';
import SkeletonCard from '../Card/SkeletonCard';
import {mockAds} from '../../utils/mocks';
import AdsCard from '../Card/AdsCard';

const mockUserAds = new Array(5)
  .fill(mockAds)
  .map((el, i) => ({...el, id: el.id + i}));

const sleep = (ms: number) =>
  new Promise((res, rej) => setTimeout(() => res(''), ms));

const UserAdsList = () => {
  const [ads, setAds] = useState<Ads[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUserAds = useCallback(async () => {
    try {
      setLoading(true);
      await sleep(3000);
      setAds(mockUserAds);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserAds();
  }, [getUserAds]);

  return (
    <Wrap>
      <TitleH6>I tuoi annunci</TitleH6>
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
              <Button color="inherit" size="small" onClick={getUserAds}>
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
            ads.map((el) => <AdsCard ads={el} key={el.id} whiteBg />)
          ) : (
            <>
              <Subtitle1>Non hai ancora pubblicato nessun annuncio</Subtitle1>
            </>
          ))}
      </List>
    </Wrap>
  );
};

export default UserAdsList;

const Wrap = styled(Box)(({theme}) => ({
  flex: 1,
  paddingLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flex: 'initial',
    paddingLeft: '0px',
    marginTop: '25px',
  },
}));

const List = styled(Box)(() => ({
  flex: 1,
  overflow: 'auto',
  marginTop: '25px',
  paddingBottom: '10px',
}));
