import {useCallback, useEffect, useState} from 'react';
import {useFiltersContext} from '../../contexts/FiltersContext';
import useResponsive from '../../hooks/useResponsive';
import {styled, Box, IconButton, Drawer} from '@mui/material';
import Filters from './Filters';
import {TitleH6} from '../MyTypography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import MyButton from '../MyButton';
import {ArrowUpward} from '@mui/icons-material';

const AdsFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const {filters, setFilters, orders, setOrders} = useFiltersContext();

  const {isMd} = useResponsive();

  const handleFilters = useCallback(
    (newFilters: Filters) => setFilters(newFilters),
    [setFilters]
  );

  const handleOrders = useCallback(
    (newOrders: Orders) => setOrders(newOrders),
    [setOrders]
  );

  const backToTop = useCallback(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

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

  console.log({filters, orders});

  return (
    <>
      <Wrap>
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
                <FilterTitle isSmall>Filtra</FilterTitle>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{transform: 'translateX(16px)'}}
              >
                <FilterTitle isSmall>Ordina per</FilterTitle>
                <IconButton color="primary" onClick={() => setIsOpen(true)}>
                  <SortIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Filters
              value={{...filters, ...orders}}
              onChangeFilters={handleFilters}
              onChangeOrders={handleOrders}
            />
          )}
        </FilterWrap>
        {!isMd && (
          <MyButton color="primary" variant="contained" onClick={backToTop}>
            Torna in cima
          </MyButton>
        )}
      </Wrap>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerInner>
          <Filters
            value={{...filters, ...orders}}
            onChangeFilters={handleFilters}
            onChangeOrders={handleOrders}
          />
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

const Wrap = styled(Box)(({theme}) => ({
  height: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'sticky',
  top: '75px',
  left: 0,
  width: '300px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'initial',
    position: 'initial',
  },
}));

const FilterWrap = styled(Box)(({theme}) => ({
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  overflow: 'overlay',
  flex: 1,
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
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

const FilterTitle = styled(TitleH6)(({theme}) => ({
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
