import React, {useMemo} from 'react';
import {Box, Button, Grid, styled} from '@mui/material';
import {formatAdsCardText, formatDate} from '../../../utils/utils';
import {Body1, TitleH4, TitleH5} from '../../MyTypography';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {visibilityOptions} from '../../../utils/config';
import Favorites from './Favorites';
import Visibility from './Visibility';
import {useRouter} from 'next/router';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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

  const visibilityOption = useMemo(
    () => visibilityOptions.find((el) => el.value === ads.visibilityOption),
    [ads]
  );

  return (
    <HighlightedWrap isHighlighted={ads.isHighlighted}>
      {ads.isHighlighted && (
        <HighlightedLabel>
          <LocalFireDepartmentIcon color="error" />
          <TitleH4 marginLeft="10px">Super Hot</TitleH4>
        </HighlightedLabel>
      )}
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
            <TitleH5 marginLeft="10px">
              {ads.views}{' '}
              {ads.views === 1 ? 'visualizzazione' : 'visualizzazioni'}
            </TitleH5>
          </FullGrid>
        )}
        {!!onFavorite && ads.isFavorite !== undefined && (
          <Favorites
            onClick={() => onFavorite(ads.id)}
            isFavorite={ads.isFavorite}
            loading={favoriteLoading}
            error={favoriteError}
          />
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
            <TitleH5 sx={{marginBottom: '5px'}}>
              {formatDate(ads.publicationDate)}
            </TitleH5>
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
        {!!onSettings &&
          !!visibilityOption &&
          ads.visibilityExpiration !== undefined && (
            <Visibility
              option={visibilityOption}
              expiration={ads.visibilityExpiration}
            />
          )}
      </Wrap>
    </HighlightedWrap>
  );
};

export default AdsCard;

const HighlightedWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHighlighted',
})<{isHighlighted?: boolean}>(({theme, isHighlighted}) => ({
  borderRadius: '20px',
  marginTop: '20px',

  ...(isHighlighted && {
    border: `2px solid ${theme.palette.error.main}`,
    padding: '10px',
  }),
}));

const HighlightedLabel = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '5px',
}));

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
    minHeight: '200px',
  },
}));

const Title = styled(TitleH5)(({theme}) => ({
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
