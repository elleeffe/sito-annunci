import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onOpen: () => void;
};

const SettingsMenu = ({anchorEl, onClose, onDelete, onEdit, onOpen}: Props) => {
  return (
    <StyledPopover
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: -10,
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      onClose={onClose}
    >
      <StyledListItemButton onClick={onOpen}>
        <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
          <OpenInNewIcon
            sx={{width: '20px', height: '20px'}}
            className="item-button"
          />
        </ListItemIcon>
        <ListItemText primary="Apri annuncio" className="item-button" />
      </StyledListItemButton>
      <StyledListItemButton onClick={onEdit}>
        <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
          <EditIcon
            sx={{width: '20px', height: '20px'}}
            className="item-button"
          />
        </ListItemIcon>
        <ListItemText primary="Modifica" className="item-button" />
      </StyledListItemButton>
      <StyledListItemButton isError onClick={onDelete}>
        <ListItemIcon sx={{minWidth: 'initial', marginRight: '15px'}}>
          <DeleteIcon
            sx={{width: '20px', height: '20px'}}
            className="item-button"
          />
        </ListItemIcon>
        <ListItemText primary="Elimina" className="item-button" />
      </StyledListItemButton>
    </StyledPopover>
  );
};

export default SettingsMenu;

const StyledPopover = styled(Popover)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none',
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isError',
})<{isError?: boolean}>(({theme, isError}) => ({
  paddingTop: '6px',
  paddingBottom: '6px',
  '&:hover': {
    '& .item-button': {
      ...(isError
        ? {color: theme.palette.error.main}
        : {color: theme.palette.primary.main}),
    },
  },
}));
