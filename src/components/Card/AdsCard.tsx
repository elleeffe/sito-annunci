import {Box, Button, Grid, styled} from '@mui/material';
import {formatAdsCardText} from '../../utils/utils';
import {Body1, TitleH6} from '../MyTypography';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  ads: Ads;
  isPreview?: boolean;
};

const AdsCard = ({ads, isPreview}: Props) => {
  return (
    <Wrap container columnSpacing={2} rowSpacing={2} isPreview={isPreview}>
      <Cover
        item
        xs={12}
        md={5}
        lg={4}
        sx={{backgroundImage: `url(${ads.cover[0].base64})`}}
      />
      <Content item xs={12} md={7} lg={8}>
        <Title>{formatAdsCardText(ads.title, 10)}</Title>
        <Description>{formatAdsCardText(ads.description, 24)}</Description>
        <InfoWrap>
          <Info divider>{ads.age} anni</Info>
          <CardAction>
            <LocationWrap>
              <PlaceIcon
                color="primary"
                sx={{width: '15px', height: '15px', marginRight: '3px'}}
              />
              <Info>
                {ads.city.toUpperCase()}
                {ads.neighborhood && `, ${ads.neighborhood}`}
              </Info>
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
      </Content>
    </Wrap>
  );
};

export default AdsCard;

const Wrap = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isPreview',
})<{isPreview?: boolean}>(({theme, isPreview}) => ({
  padding: '15px',
  borderRadius: '20px',
  width: '100%',
  background: '#F8FAFB',
  display: 'flex',
  transition: 'all 100ms linear',
  marginTop: '0px',
  marginLeft: '0px',

  ...(!isPreview && {
    '&:hover': {
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
    },
  }),

  '& + &': {
    marginTop: '20px',
  },
}));

const Cover = styled(Grid)(({theme}) => ({
  borderRadius: '15px',
  height: '200px',
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

const Title = styled(TitleH6)(({theme}) => ({
  fontWeight: '500',
  fontSize: '20px',

  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    marginBottom: '20px',
  },
}));

const Content = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '0px !important',

  [theme.breakpoints.down('md')]: {
    paddingLeft: '0px !important',
  },
}));

const Description = styled(Body1)(({theme}) => ({
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

const Info = styled(Body1, {
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
