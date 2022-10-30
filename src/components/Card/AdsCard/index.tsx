import React, {useMemo} from 'react';
import {Box, Button, Chip, Grid, styled} from '@mui/material';
import {formatAdsCardText, formatDate} from '../../../utils/utils';
import {Body2, TitleH5, TitleH6} from '../../MyTypography';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {visibilityOptions} from '../../../utils/config';
import Favorites from './Favorites';
import Visibility from './Visibility';
import {useRouter} from 'next/router';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useResponsive from '../../../hooks/useResponsive';

type Props = {
  ads: Ads;
  isPreview?: boolean;
  whiteBg?: boolean;
  onSettings?: (event: React.MouseEvent<HTMLElement>) => void;
  onFavorite?: (id?: string) => void;
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
  const router = useRouter();

  const {isMd} = useResponsive();

  const visibilityOption = useMemo(
    () => visibilityOptions.find((el) => el.value === ads.visibilityOption),
    [ads]
  );

  return (
    <Wrap
      container
      columnSpacing={2}
      rowSpacing={2}
      isPreview={isPreview}
      whiteBg={whiteBg}
      isHighlighted={ads.isHighlighted}
    >
      {ads.isHighlighted && (
        <HotWrap>
          <LocalFireDepartmentIcon sx={{width: 15, height: 15}} />
          <HotLabel>Super Hot</HotLabel>
        </HotWrap>
      )}
      {!!onSettings && !!ads.publicationDate && (
        <PublicationWrap>
          <PublicationLabel>{formatDate(ads.publicationDate)}</PublicationLabel>
        </PublicationWrap>
      )}

      {!!onSettings && ads.views !== undefined && (
        <ViewsWrap>
          <VisibilityIcon sx={{color: 'white', width: 17, height: 17}} />
          <ViewsLabel marginLeft="10px">
            {ads.views}{' '}
            {ads.views === 1 ? 'visualizzazione' : 'visualizzazioni'}
          </ViewsLabel>
        </ViewsWrap>
      )}
      <Cover
        item
        xs={12}
        md={5}
        sx={{backgroundImage: `url(${ads.cover[0].base64})`}}
      />
      <Content item xs={12} md={7}>
        {!!onSettings &&
          !!visibilityOption &&
          ads.visibilityExpiration !== undefined && (
            <Visibility
              option={visibilityOption}
              expiration={ads.visibilityExpiration}
            />
          )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="10px"
          width="100%"
        >
          <Chip label={ads.category} color="primary" size="small" />
          <Box display="flex" alignItems="center">
            {!onSettings && <Body2>{ads.age} anni</Body2>}
            {!!onFavorite && ads.isFavorite !== undefined && (
              <Favorites
                onClick={() => onFavorite(ads.id)}
                isFavorite={ads.isFavorite}
                loading={favoriteLoading}
                error={favoriteError}
              />
            )}
          </Box>
        </Box>
        <Title>{formatAdsCardText(ads.title, isMd ? 25 : 13)}</Title>
        {!onSettings && (
          <Body2 marginBottom="10px">
            {formatAdsCardText(ads.description, isMd ? 40 : 20)}
          </Body2>
        )}
        <InfoWrap>
          <CardAction>
            <LocationWrap>
              <PlaceIcon
                color="primary"
                sx={{width: '17px', height: '17px', marginRight: '5px'}}
              />
              <Body2>
                {ads.city.toUpperCase()}
                {ads.neighborhood && ` - ${ads.neighborhood}`}
              </Body2>
            </LocationWrap>
            {!!onSettings ? (
              <CardButton
                size="small"
                color="primary"
                variant="text"
                onClick={onSettings}
                endIcon={<SettingsIcon />}
              >
                Gestisci
              </CardButton>
            ) : (
              <CardButton
                size="small"
                color="primary"
                variant="text"
                endIcon={<ArrowForwardIosIcon />}
                disabled={isPreview}
                onClick={() =>
                  router.push(`/categorie/${ads.category}/${ads.id}`)
                }
              >
                Visita
              </CardButton>
            )}
          </CardAction>
        </InfoWrap>
      </Content>
    </Wrap>
  );
};

export default AdsCard;

const Wrap = styled(Grid, {
  shouldForwardProp: (prop) =>
    prop !== 'isPreview' && prop !== 'whiteBg' && prop !== 'isHighlighted',
})<{
  isPreview?: boolean;
  whiteBg?: boolean;
  isHighlighted?: boolean;
}>(({theme, isPreview, whiteBg, isHighlighted}) => ({
  borderRadius: '4px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 100ms linear',
  marginLeft: '0px',
  border: `1px solid rgba(0,0,0,0.1)`,
  position: 'relative',
  marginTop: '25px',
  overflow: 'hidden',
  height: '260px',

  ...(whiteBg
    ? {
        background: '#fff',
      }
    : {
        background: '#F8FAFB',
      }),

  ...(isHighlighted && {
    border: `2px solid ${theme.palette.error.main}`,
  }),

  ...(!isPreview && {
    '&:hover': {
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
    },
  }),

  [theme.breakpoints.down('md')]: {
    height: 'auto',
  },
}));

const Cover = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isProfile',
})<{isProfile?: boolean}>(({theme, isProfile}) => ({
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  ...(isProfile ? {height: '320px'} : {height: '100%'}),

  [theme.breakpoints.down('lg')]: {
    ...(isProfile ? {height: '320px'} : {height: '100%'}),
  },

  [theme.breakpoints.down('md')]: {
    height: '35vh',
    marginRight: '0px',
    minHeight: '380px',
  },

  [theme.breakpoints.down('sm')]: {
    height: '25vh',
    minHeight: '200px',
  },
}));

const Title = styled(TitleH5)(({theme}) => ({
  fontWeight: '500',
  marginBottom: '10px',
}));

const Content = styled(Grid)(({theme}) => ({
  height: '100%',
  padding: '20px !important',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',

  [theme.breakpoints.down('md')]: {
    height: 'auto',
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

  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
  },

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

const CardButton = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: '25px',
  },
}));

const HotWrap = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '5px 10px 7px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.error.main,
  borderBottomRightRadius: '4px',
}));

const HotLabel = styled(TitleH6)(() => ({
  color: 'white',
  fontWeight: '500',
  marginLeft: '5px',
}));

const PublicationWrap = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '5px 10px 7px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.text.secondary,
  borderBottomRightRadius: '4px',
  bordertTopRightRadius: '4px',
}));

const PublicationLabel = styled(TitleH6)(() => ({
  color: 'white',
  fontWeight: '500',
}));

const ViewsWrap = styled(Box)(({theme}) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: '5px 10px 7px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.primary.main,
  borderBottomLeftRadius: '4px',
  borderTopRightRadius: '4px',

  [theme.breakpoints.down('md')]: {
    bottom: 'unset',
    left: 'unset',
    top: 0,
    right: 0,
  },
}));

const ViewsLabel = styled(TitleH6)(() => ({
  color: 'white',
  fontWeight: '500',
}));
