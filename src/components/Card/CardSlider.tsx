import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Box, styled} from '@mui/material';
import {Pagination, Autoplay} from 'swiper';
import SimpleCard, {CardItemType} from './SimpleCard';

type Props = {
  autoPlay: boolean;
  cards: CardItemType[];
  spacingTop?: boolean;
  spacingBottom?: boolean;
};

const CardSlider = ({cards, autoPlay, spacingBottom, spacingTop}: Props) => {
  return (
    <Wrap spacingBottom={spacingBottom} spacingTop={spacingTop}>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        breakpoints={{
          540: {
            slidesPerView: 2,
          },
          850: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        centeredSlides
        modules={[Pagination, Autoplay]}
        pagination={{clickable: true}}
        autoplay={
          autoPlay && {
            delay: 2500,
            disableOnInteraction: false,
          }
        }
        loop
        scrollbar={{draggable: true}}
      >
        {cards.map((card, i) => {
          return (
            <SwiperSlide key={card.title + i}>
              <SimpleCard card={card} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrap>
  );
};

export default CardSlider;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'spacingTop' && prop !== 'spacingBottom',
})<{
  spacingTop?: boolean;
  spacingBottom?: boolean;
}>(({theme, spacingTop, spacingBottom}) => ({
  padding: '50px 0',
  ...(spacingBottom && {marginBottom: '100px'}),
  ...(spacingTop && {marginTop: '100px'}),
  '& .swiper-slide': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .swiper-pagination': {
    bottom: '0px !important',
    '&-bullet': {
      width: '10px',
      height: '10px',
      '&-active': {
        background: theme.palette.primary.main,
      },
    },
  },
}));
