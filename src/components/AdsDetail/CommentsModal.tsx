import {useCallback, useEffect, useState} from 'react';
import {
  IconButton,
  Modal,
  styled,
  useMediaQuery,
  Box,
  Paper,
  Button,
  Alert,
  Tooltip,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import SkeletonCard from '../Card/SkeletonCard';
import {TitleH5, TitleH4} from '../MyTypography';
import {sleep} from '../../utils/utils';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const CommentsModal = ({detailId, isOpen, onClose}: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const match = useMediaQuery('(max-width:600px)');

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      // TODO - use detailId
      await sleep(3000);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ModalInner>
        <StyledPaper>
          <Tooltip title="Chiudi">
            <CloseButton
              onClick={onClose}
              color="error"
              size={match ? 'small' : 'medium'}
            >
              <Close />
            </CloseButton>
          </Tooltip>
          <TitleH4 marginBottom="15px">Tutti i commenti</TitleH4>
          <List>
            {loading && !error && (
              <>
                <SkeletonCard whiteBg />
                <SkeletonCard whiteBg />
              </>
            )}
            {!loading && error && (
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={getComments}>
                    Riprova
                  </Button>
                }
              >
                Si è verificato un errore, riprovare.
              </Alert>
            )}
            {!loading &&
              !error &&
              (!!comments.length ? (
                comments.map((el, i) => <Box key={i}>commento + {i + 1}</Box>)
              ) : (
                <>
                  <TitleH5>Nessun commento</TitleH5>
                </>
              ))}
          </List>
        </StyledPaper>
      </ModalInner>
    </Modal>
  );
};
export default CommentsModal;

const ModalInner = styled(Box)(({theme}) => ({
  display: 'flex',
  height: 'calc(100% - 10vh)',
  marginTop: '5vh',
  overflow: 'hidden',
  position: 'relative',
  padding: '0 15px',
  flex: 1,

  [theme.breakpoints.down('sm')]: {
    padding: '0 5px',
  },
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '900px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: ' 25px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',

  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
}));

const CloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '0px',
  right: '0px',
  zIndex: 1,

  [theme.breakpoints.down('md')]: {
    top: '5px',
    right: '5px',
  },
}));

const List = styled(Box)(() => ({
  flex: 1,
  overflow: 'auto',
}));
