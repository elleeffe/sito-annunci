import {useState} from 'react';
import {Box, Button, Menu, styled} from '@mui/material';
import {TitleH4} from '../MyTypography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {StyledMenuItem} from '../Layout/Header/DesktopNavLink';
import {useFiltersContext} from '../../contexts/FiltersContext';

const labels: Record<Order, string> = {
  'young-age': 'Età più giovane',
  'adult-age': ' Età più adulta',
  latest: 'Pubblicati di recente',
  oldest: 'Ordine di pubblicazione',
};

const ListHeader = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const {order, setOrder} = useFiltersContext();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <TitleH4>Risultati di ricerca</TitleH4>
      <Button
        variant="text"
        color="primary"
        size="small"
        endIcon={!!anchorEl ? <ExpandLess /> : <ExpandMore />}
        onClick={(e) =>
          setAnchorEl((old) => (!!old ? undefined : e.currentTarget))
        }
        sx={{minWidth: '216px'}}
      >
        {labels[order]}
      </Button>
      <Menu
        id="order-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        MenuListProps={{
          'aria-labelledby': 'order-menu',
        }}
        sx={{
          '& .MuiPaper-root': {
            marginTop: '10px',
            borderRadius: '4px',
            boxShadow: '0 5px 20px 5px rgb(35 38 58 / 10%)',
            '& .MuiList-root': {
              minWidth: '200px',
              padding: '0',
            },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {Object.keys(labels).map((el) => (
          <OrderMenuItem
            key={el}
            isActive={order === el}
            onClick={() => setOrder(el as Order)}
          >
            {labels[el as Order]}
          </OrderMenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ListHeader;

const OrderMenuItem = styled(StyledMenuItem)(() => ({
  fontSize: '13px !important',
}));
