import React from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';
import * as icons from '@mui/icons-material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MyIcon from '../MyIcon';
import {Body2, Subtitle2, TitleH5} from '../MyTypography';

export type CardItemType = {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  caption: string;
  button: {
    caption: string;
    action: () => void;
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
  return (
    <Card
      sx={{
        maxWidth: 450,
        margin: '0 10px 50px 10px',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
        borderRadius: '10px',
      }}
    >
      <CardMedia
        component="img"
        alt={card.img.alt}
        height="250"
        image={card.img.src}
      />
      <CardContent sx={{padding: '25px'}}>
        <TitleH5 gutterBottom>{card.title}</TitleH5>
        {card.totalAds && (
          <Box display="flex" alignItems="center" sx={{marginBottom: '10px'}}>
            <PersonPinIcon
              color="primary"
              sx={{width: '20px', height: '20px', marginRight: '5px'}}
            />
            <Subtitle2>
              <span>{card.totalAds} annunci caricati</span>
            </Subtitle2>
          </Box>
        )}
        <Body2 color="text.secondary">{card.caption}</Body2>
      </CardContent>
      <CardActions sx={{padding: '0px 25px 25px'}}>
        <Button
          variant={card.button.variant}
          size="small"
          color={card.button.color}
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
    </Card>
  );
};

export default SimpleCard;
