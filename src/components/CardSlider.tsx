import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Container, styled} from '@mui/material';
import {Pagination, Autoplay} from 'swiper';
import SimpleCard, {CardItemType} from './SimpleCard';

type Props = {autoPlay: boolean; cards: CardItemType[]};

const CardSlider = ({cards, autoPlay}: Props) => {
  return (
    <Wrap>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        breakpoints={{
          540: {
            slidesPerView: 2,
          },
          998: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination, Autoplay]}
        pagination={{clickable: true}}
        autoplay={
          autoPlay && {
            delay: 2500,
            disableOnInteraction: false,
          }
        }
        loop
      >
        {cards.map((card) => {
          return (
            <SwiperSlide key={card.title}>
              <SimpleCard card={card} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrap>
  );
};

export default CardSlider;

const Wrap = styled(Container)(({theme}) => ({
  padding: '50px 0 100px',
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
