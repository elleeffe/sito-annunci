import {useCallback, useState} from 'react';
import {useFiltersContext} from '../../contexts/FiltersContext';
import useResponsive from '../../hooks/useResponsive';
import {styled, Box, IconButton, Drawer} from '@mui/material';
import Filters from './Filters';
import {TitleH6} from '../MyTypography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

const AdsFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {filters, setFilters} = useFiltersContext();

  const {isMd} = useResponsive();

  const handleFilters = useCallback(
    (newFilters: Filters) => setFilters(newFilters),
    [setFilters]
  );

  return (
    <>
      <Wrap>
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
          <>
            <Box marginBottom="100px">
              <FilterTitle isSmall>Filtra</FilterTitle>
              <Filters value={filters} onChange={handleFilters} />
            </Box>
            <Box>
              <FilterTitle isSmall>Ordina per</FilterTitle>
            </Box>
          </>
        )}
      </Wrap>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerInner>
          <Box marginBottom="50px">
            <FilterTitle isSmall>Filtra</FilterTitle>
            <Filters value={filters} onChange={handleFilters} />
          </Box>
          <Box>
            <FilterTitle isSmall>Ordina per</FilterTitle>
          </Box>
        </DrawerInner>
      </Drawer>
    </>
  );
};

export default AdsFilter;

const Wrap = styled(Box)(({theme}) => ({
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  position: 'sticky',
  top: '75px',
  left: 0,
  height: 'calc(100vh - 90px)',
  overflow: 'overlay',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    background: 'transparent',
    borderRadius: 'initial',
    boxShadow: 'initial',
    position: 'initial',
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
