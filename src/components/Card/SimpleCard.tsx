import React from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
} from '@mui/material';
import * as icons from '@mui/icons-material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MyIcon from '../MyIcon';
import {TitleH4, TitleH5} from '../MyTypography';
import {useRouter} from 'next/router';

export type CardItemType = {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  button: {
    caption: string;
    path: string;
    color?: ButtonProps['color'];
    icon?: keyof typeof icons;
    variant?: ButtonProps['variant'];
  };
  totalAds?: number;
};

type Props = {
  card: CardItemType;
};

const SimpleCard = ({card}: Props) => {
  const router = useRouter();

  return (
    <StyledCard>
      <CardMedia component="img" alt={card.img.alt} image={card.img.src} />
      <FixedWrap>
        <CardContent sx={{padding: '20px 20px 10px'}}>
          <CardTitle marginBottom="15px" isWhite>
            {card.title}
          </CardTitle>
          {card.totalAds && (
            <Box display="flex" alignItems="center" sx={{marginBottom: '10px'}}>
              <PersonPinIcon
                sx={{
                  width: '24px',
                  height: '24px',
                  marginRight: '5px',
                  color: 'white',
                }}
              />
              <TitleH5 isWhite>
                <span>{card.totalAds} annunci </span>
              </TitleH5>
            </Box>
          )}
        </CardContent>
        <CardActions sx={{padding: '0px 20px 20px'}}>
          <Button
            variant={card.button.variant}
            size="small"
            color={card.button.color}
            onClick={() => router.push(card.button.path)}
            endIcon={
              <MyIcon
                variant={card.button.variant}
                color={card.button.color}
                icon={card.button.icon}
              />
            }
          >
            {card.button.caption}
          </Button>
        </CardActions>
      </FixedWrap>
    </StyledCard>
  );
};

export default SimpleCard;

const StyledCard = styled(Card)(() => ({
  maxWidth: 450,
  margin: '0 10px 50px 10px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  borderRadius: '4px',
  position: 'relative',
  transition: 'all 300ms ease',
  overflow: 'hidden',

  '& .MuiCardMedia-root': {
    height: '50vh',
    minHeight: '250px',
    transition: 'inherit',
    transformOrigin: '50% 50%',
  },

  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    transition: 'inherit',
    background:
      'linear-gradient(to top, rgba(35,35,37,0.85) 0%, rgba(35,35,37,0.4) 35%, rgba(22,22,23,0) 60%, rgba(0,0,0,0) 100%)',
  },

  '&:hover': {
    boxShadow: '0 1rem 1.5rem rgba(0, 0, 0, 0.2)',

    '& .MuiCardMedia-root': {
      transform: 'scale(105%)',
    },
  },
}));

const FixedWrap = styled(Box)(() => ({
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 1,
}));

const CardTitle = styled(TitleH4)(() => ({
  marginBottom: '15px',
  fontWeight: 400,
}));
