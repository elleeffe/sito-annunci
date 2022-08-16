import {styled, Box} from '@mui/material';
import {useFiltersContext} from '../contexts/FiltersContext';
import {mockAds} from '../utils/mocks';
import AdsCard from './Card/AdsCard';
import {TitleH6} from './MyTypography';

type Props = {};

const mockUserAds = new Array(5)
  .fill(mockAds)
  .map((el, i) => ({...el, id: el.id + i}));

const AdsList = ({}: Props) => {
  const {filters} = useFiltersContext();

  return (
    <Wrap>
      <TitleH6>Risultati</TitleH6>
      <List>
        {mockUserAds.map((el) => (
          <AdsCard ads={el} key={el.id} whiteBg />
        ))}
      </List>
    </Wrap>
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
  paddingBottom: '10px',
}));
