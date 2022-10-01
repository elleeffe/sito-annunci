import {CircularProgress, Grid, IconButton, styled} from '@mui/material';
import {useMemo} from 'react';
import {Subtitle2} from '../../MyTypography';
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
  const favoritesLabel = useMemo(() => {
    if (isFavorite) {
      return 'Rimuovi dai preferiti';
    }
    return 'Aggiungi ai preferiti';
  }, [isFavorite]);

  return (
    <FullGrid item xs={12} marginBottom="15px" alignItems="center">
      {!loading && !error && (
        <IconButton color="warning" size="small" onClick={onClick}>
          {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      )}
      {loading && (
        <CircularProgress
          size={25}
          sx={{svg: {width: 25, height: 25}}}
          color="warning"
        />
      )}
      {error && (
        <IconButton color="error" size="small" onClick={onClick}>
          <RefreshIcon />
        </IconButton>
      )}
      {!loading && (
        <Subtitle2 marginLeft="10px">
          {error ? 'Si è verificato un errore, riprovare' : favoritesLabel}
        </Subtitle2>
      )}
    </FullGrid>
  );
};

export default Favorites;

const FullGrid = styled(Grid)(() => ({
  display: 'flex',
  paddingLeft: '0px !important',
  paddingTop: '0px !important',
}));
