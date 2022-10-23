import {useState} from 'react';
import {Box, IconButton, styled, Tooltip} from '@mui/material';
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {FreeMode} from 'swiper';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

type Props = {
  cover: AdsMedia;
  images?: AdsMedia[];
};

const AdsGallery = ({cover, images}: Props) => {
  const [opened, setOpened] = useState<AdsMedia>();
  const mockImages: AdsMedia[] = new Array(5).fill(images).flat();

  return (
    <>
      <Cover>
        <img src={cover.base64} alt={cover.name} />
      </Cover>
      {!!images && !!images.length && (
        <SliderWrap>
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className="mySwiper"
            grabCursor
            scrollbar
          >
            {mockImages.map((image) => (
              <SwiperSlide key={image.name}>
                <SliderInner>
                  <Tooltip title="Apri">
                    <ExpandButton size="small" onClick={() => setOpened(image)}>
                      <OpenInFullIcon />
                    </ExpandButton>
                  </Tooltip>
                  <img src={image.base64} alt={image.name} />
                </SliderInner>
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderWrap>
      )}
      <StyledModal
        open={!!opened}
        onClose={() => setOpened(undefined)}
        aria-labelledby="adv-image-expanded-modal"
        aria-describedby="adv-image-expanded-modal"
      >
        <>
          <Tooltip title="Chiudi">
            <CloseButton size="small" onClick={() => setOpened(undefined)}>
              <CloseIcon />
            </CloseButton>
          </Tooltip>
          <img src={opened?.base64} alt={opened?.name} />
        </>
      </StyledModal>
    </>
  );
};

export default AdsGallery;

const Cover = styled(Box)(({theme}) => ({
  marginBottom: '15px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.primary.main,
  borderRadius: '4px',
  overflow: 'hidden',

  img: {
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
  },
}));

const SliderWrap = styled(Box)(() => ({
  marginBottom: '25px',
  '& .mySwiper': {
    width: '100%',
  },

  '& .swiper-slide': {
    width: 'auto',
  },
}));

const SliderInner = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '300px',
  height: '150px',
  background: theme.palette.primary.main,
  borderRadius: '4px',
  overflow: 'hidden',
  position: 'relative',

  img: {
    maxHeight: '100%',
    maxWidth: '100%',
  },

  [theme.breakpoints.down('md')]: {
    width: '200px',
    height: '120px',
  },
}));

const ExpandButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '5px',
  right: '5px',

  svg: {
    color: 'white',
  },
}));

const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    width: '100%',
    maxWidth: '1440px',
    maxHeight: '95vh',
  },
}));

const CloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '25px',
  right: '25px',

  svg: {
    color: 'white',
  },
}));
