import {useCallback, useEffect, useState} from 'react';
import useResponsive from '../../hooks/useResponsive';
import {styled, Box, IconButton, Drawer} from '@mui/material';
import Filters from './Filters';
import {TitleH5} from '../MyTypography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import MyButton from '../Buttons/MyButton';
import {ArrowUpward} from '@mui/icons-material';
import {Aside} from '../Layout';
import {backToTop} from '../../utils/utils';

type Props = {
  onChange: () => void;
};

const AdsFilter = ({onChange}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const {isMd} = useResponsive();

  const handleChange = useCallback(() => {
    backToTop();
    onChange();
  }, [onChange]);

  useEffect(() => {
    const checkScroll = () => {
      if (isMd && window.scrollY >= 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  });

  return (
    <>
      <Aside>
        <FilterWrap>
          {isMd ? (
            <>
              <Box
                display="flex"
                alignItems="center"
                sx={{transform: 'translateX(-16px)'}}
              >
                <IconButton color="primary" onClick={() => setIsOpen(true)}>
                  <FilterAltIcon />
                </IconButton>
                <FilterTitle>Filtra</FilterTitle>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{transform: 'translateX(16px)'}}
              >
                <FilterTitle>Ordina per</FilterTitle>
                <IconButton color="primary" onClick={() => setIsOpen(true)}>
                  <SortIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Filters onChange={handleChange} />
          )}
        </FilterWrap>
        {!isMd && (
          <Box sx={{padding: '0 20px'}}>
            <MyButton
              color="primary"
              variant="contained"
              onClick={backToTop}
              sx={{width: '100%'}}
            >
              Torna in cima
            </MyButton>
          </Box>
        )}
      </Aside>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerInner>
          <Filters onChange={handleChange} />
        </DrawerInner>
      </Drawer>
      {isMd && showButton && (
        <BackToTopButton size="small" onClick={backToTop}>
          <ArrowUpward sx={{color: '#fff'}} />
        </BackToTopButton>
      )}
    </>
  );
};

export default AdsFilter;

const FilterWrap = styled(Box)(({theme}) => ({
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  padding: '20px',
  overflow: 'overlay',
  flex: 1,
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    overflow: 'initial',
    background: 'transparent',
    borderRadius: 'initial',
    boxShadow: 'initial',
    marginBottom: '0px',
  },
}));

const FilterTitle = styled(TitleH5)(({theme}) => ({
  fontWeight: '500',
  marginBottom: '15px',

  [theme.breakpoints.down('md')]: {
    marginBottom: '0px',
  },
}));

const DrawerInner = styled(Box)(() => ({
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  maxWidth: '300px',
}));

const BackToTopButton = styled(IconButton)(({theme}) => ({
  background: theme.palette.primary.main,
  position: 'fixed',
  bottom: '15px',
  right: '15px',
  '&:hover': {
    background: theme.palette.primary.main,
  },
  svg: {
    color: theme.palette.background.default,
  },
}));
