import {CircularProgress, IconButton, Tooltip, Box} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = {
  loading?: boolean;
  error?: boolean;
  isFavorite: boolean;
  onClick: () => void;
};

const Favorites = ({isFavorite, loading, error, onClick}: Props) => {
  return (
    <Tooltip
      title={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
    >
      <Box sx={{marginLeft: '10px'}} display="flex">
        {!loading && !error && (
          <IconButton color="warning" size="small" onClick={onClick}>
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )}
        {loading && (
          <Box padding="8px 10px">
            <CircularProgress size={20} color="warning" />
          </Box>
        )}
        {error && (
          <IconButton color="error" size="small" onClick={onClick}>
            <RefreshIcon />
          </IconButton>
        )}
      </Box>
    </Tooltip>
  );
};

export default Favorites;
