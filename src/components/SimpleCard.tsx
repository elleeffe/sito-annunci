import React, {useCallback, useMemo} from 'react';
import {
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import * as icons from '@mui/icons-material';

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
};

type Props = {
  card: CardItemType;
};

const SimpleCard = ({card}: Props) => {
  const getIcon = useCallback(
    (
      color: ButtonProps['color'],
      icon?: keyof typeof icons,
      variant?: ButtonProps['variant']
    ) => {
      if (icon) {
        const Icon = icons[icon];
        return (
          <Icon
            sx={{
              color: () => {
                if (!color && !variant) {
                  return 'primary';
                }
                if (!color && variant === 'contained') {
                  return '#fff';
                }
                return color;
              },
            }}
          />
        );
      }
      return undefined;
    },
    []
  );

  const icon = useMemo(
    () => getIcon(card.button.color, card.button.icon, card.button.variant),
    [card.button.color, card.button.icon, card.button.variant, getIcon]
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '0 10px 50px 10px',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
      }}
    >
      <CardMedia
        component="img"
        alt={card.img.alt}
        height="250"
        image={card.img.src}
      />
      <CardContent sx={{padding: '15px'}}>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.caption}
        </Typography>
      </CardContent>
      <CardActions sx={{padding: '15px'}}>
        <Button
          variant={card.button.variant}
          size="small"
          color={card.button.color}
          endIcon={icon}
        >
          {card.button.caption}
        </Button>
      </CardActions>
    </Card>
  );
};

export default SimpleCard;
