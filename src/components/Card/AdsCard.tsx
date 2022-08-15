import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  styled,
} from '@mui/material';
import {
  formatAdsCardText,
  formatDate,
  formatVisibilityExpiration,
} from '../../utils/utils';
import {Body1, Subtitle2, TitleH6} from '../MyTypography';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DeleteIcon from '@mui/icons-material/Delete';
import {visibilityOptions} from '../../utils/config';
import RefreshIcon from '@mui/icons-material/Refresh';

type Props = {
  ads: Ads;
  isPreview?: boolean;
  whiteBg?: boolean;
  onSettings?: (event: React.MouseEvent<HTMLElement>) => void;
  onFavorite?: () => void;
  favoriteLoading?: boolean;
  favoriteError?: boolean;
};

const AdsCard = ({
  ads,
  isPreview,
  whiteBg,
  onSettings,
  onFavorite,
  favoriteError,
  favoriteLoading,
}: Props) => {
  return (
    <Wrap
      container
      columnSpacing={2}
      rowSpacing={2}
      isPreview={isPreview}
      whiteBg={whiteBg}
    >
      {!!onSettings && ads.views !== undefined && (
        <FullGrid item xs={12} marginBottom="15px" alignItems="center">
          <VisibilityIcon color="primary" />
          <Subtitle2 marginLeft="10px">
            {ads.views}{' '}
            {ads.views === 1 ? 'visualizzazione' : 'visualizzazioni'}
          </Subtitle2>
        </FullGrid>
      )}
      {!!onFavorite && (
        <FullGrid item xs={12} marginBottom="15px" alignItems="center">
          {!favoriteLoading && !favoriteError && (
            <IconButton color="error" size="small" onClick={onFavorite}>
              <DeleteIcon />
            </IconButton>
          )}
          {favoriteLoading && (
            <CircularProgress
              size={25}
              sx={{svg: {width: 25, height: 25}}}
              color="error"
            />
          )}
          {favoriteError && (
            <IconButton color="error" size="small" onClick={onFavorite}>
              <RefreshIcon />
            </IconButton>
          )}
          {!favoriteLoading && (
            <Subtitle2 marginLeft="10px">
              {favoriteError
                ? 'Si è verificato un errore, riprovare'
                : 'Rimuovi dai preferiti'}
            </Subtitle2>
          )}
        </FullGrid>
      )}
      <Cover
        item
        xs={12}
        md={5}
        lg={4}
        sx={{backgroundImage: `url(${ads.cover[0].base64})`}}
      />
      <Content item xs={12} md={7} lg={8}>
        <Title>{formatAdsCardText(ads.title, 10)}</Title>
        <Description>{formatAdsCardText(ads.description, 20)}</Description>
        {!!ads.publicationDate && (
          <Subtitle2 sx={{marginBottom: '5px'}}>
            {formatDate(ads.publicationDate)}
          </Subtitle2>
        )}
        <Info sx={{marginBottom: '5px'}}>{ads.category}</Info>
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
            {!!onSettings ? (
              <CardButton
                size="small"
                color="primary"
                variant="contained"
                onClick={onSettings}
                endIcon={<SettingsIcon />}
              >
                Gestisci
              </CardButton>
            ) : (
              <CardButton
                size="small"
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
              >
                Visita
              </CardButton>
            )}
          </CardAction>
        </InfoWrap>
      </Content>
      {!!onSettings && !!ads.visibilityOption && (
        <FullGrid item xs={12} marginTop="15px" alignItems="flex-start">
          <RocketLaunchIcon color="primary" />
          <Box display="flex" flex={1} flexWrap="wrap">
            <Subtitle2 marginLeft="10px">
              {
                visibilityOptions.find(
                  (el) => el.value === ads.visibilityOption
                )?.title
              }
            </Subtitle2>
            <Body1 marginLeft="6px">
              -{' '}
              {
                visibilityOptions.find(
                  (el) => el.value === ads.visibilityOption
                )?.subtitle
              }{' '}
              {!!formatVisibilityExpiration(ads.visibilityExpiration) &&
                `(${formatVisibilityExpiration(ads.visibilityExpiration)})`}
            </Body1>
          </Box>
        </FullGrid>
      )}
    </Wrap>
  );
};

export default AdsCard;

const Wrap = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isPreview' && prop !== 'whiteBg',
})<{isPreview?: boolean; whiteBg?: boolean}>(({theme, isPreview, whiteBg}) => ({
  padding: '15px',
  borderRadius: '20px',
  width: '100%',
  display: 'flex',
  transition: 'all 100ms linear',
  marginTop: '0px',
  marginLeft: '0px',
  ...(whiteBg
    ? {
        background: '#fff',
      }
    : {
        background: '#F8FAFB',
      }),

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

const FullGrid = styled(Grid)(() => ({
  display: 'flex',
  paddingLeft: '0px !important',
  paddingTop: '0px !important',
}));
