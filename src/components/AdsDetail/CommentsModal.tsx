import {useCallback, useEffect, useState} from 'react';
import {Box, Button, Alert} from '@mui/material';
import SkeletonCard from '../Card/SkeletonCard';
import {TitleH4} from '../MyTypography';
import {sleep} from '../../utils/utils';
import MyModal from '../MyModal';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const CommentsModal = ({detailId, isOpen, onClose}: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title="Tutte le recensioni"
      size="large"
    >
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
          comments.map((el, i) => (
            <Box key={i}>recensione + {i + 1} (UI da fare)</Box>
          ))
        ) : (
          <>
            <TitleH4>Nessuna recensione</TitleH4>
          </>
        ))}
    </MyModal>
  );
};
export default CommentsModal;
