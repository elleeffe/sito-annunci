import {Box, Button, Grid, styled} from '@mui/material';
import {formatAdsCardText} from '../../utils/utils';
import {Body1, TitleH6} from '../MyTypography';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  ads: Ads;
};

const AdsCard = ({ads}: Props) => {
  return (
    <Wrap container columnSpacing={2} rowSpacing={2}>
      <AdsCover
        item
        xs={12}
        md={5}
        lg={4}
        sx={{backgroundImage: `url(${ads.cover[0].base64})`}}
      />
      <AdsContent item xs={12} md={7} lg={8}>
        <AdsTitle>{formatAdsCardText(ads.title, 8)}</AdsTitle>
        <AdsDescription>{formatAdsCardText(ads.content, 20)}</AdsDescription>
        <InfoWrap>
          <AdsInfo divider>{ads.age} anni</AdsInfo>
          <CardAction>
            <LocationWrap>
              <PlaceIcon
                color="primary"
                sx={{width: '15px', height: '15px', marginRight: '3px'}}
              />
              <AdsInfo>
                {ads.city.toUpperCase()}
                {ads.neighborhood && `, ${ads.neighborhood}`}
              </AdsInfo>
            </LocationWrap>
            <CardButton
              size="small"
              color="primary"
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
            >
              Visita
            </CardButton>
          </CardAction>
        </InfoWrap>
      </AdsContent>
    </Wrap>
  );
};

export default AdsCard;

const Wrap = styled(Grid)(({theme}) => ({
  padding: '15px',
  borderRadius: '20px',
  width: '100%',
  background: '#F8FAFB',
  display: 'flex',
  cursor: 'pointer',
  transition: 'all 100ms linear',
  marginTop: '0px',
  marginLeft: '0px',

  '&:hover': {
    boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  },

  '& + &': {
    marginTop: '20px',
  },
}));

const AdsCover = styled(Grid)(({theme}) => ({
  borderRadius: '15px',
  height: '220px',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.down('md')]: {
    height: '35vh',
    marginRight: '0px',
    marginBottom: '25px',
    minHeight: '380px',
  },

  [theme.breakpoints.down('sm')]: {
    height: '25vh',
    minHeight: '250px',
  },
}));

const AdsTitle = styled(TitleH6)(({theme}) => ({
  fontWeight: '500',
  fontSize: '20px',

  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    marginBottom: '20px',
  },
}));

const AdsContent = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '0px !important',

  [theme.breakpoints.down('md')]: {
    paddingLeft: '0px !important',
  },
}));

const AdsDescription = styled(Body1)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: '25px',
  },
}));

const InfoWrap = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'initial',
  },
}));

const CardAction = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'initial',
    justifyContent: 'initial',
  },
}));

const LocationWrap = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    alignItems: 'initial',
  },
}));

const AdsInfo = styled(Body1, {
  shouldForwardProp: (prop) => prop !== 'divider',
})<{divider?: boolean}>(({theme, divider}) => ({
  fontWeight: '700',
  lineHeight: 1.2,
  ...(divider && {
    paddingRight: '10px',
    marginRight: '5px',
    borderRight: `2px solid ${theme.palette.text.secondary}`,
  }),

  [theme.breakpoints.down('md')]: {
    ...(divider && {
      paddingRight: '0',
      marginRight: '0',
      borderRight: 'unset',
      marginBottom: '10px',
    }),
  },
}));

const CardButton = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: '25px',
  },
}));
