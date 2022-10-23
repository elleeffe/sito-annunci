import {Alert} from '@mui/material';
import MyButton from '../Buttons/MyButton';
import MyModal from '../MyModal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  error: boolean;
  loading: boolean;
  onConfirm: () => Promise<void>;
};

const DeleteModal = ({isOpen, onClose, error, loading, onConfirm}: Props) => {
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminazione annuncio"
      size="small"
    >
      <Alert severity="warning" sx={{marginBottom: '25px'}}>
        Attenzione, quest'azione è irreversibile. Non potrai recuperare le
        informazioni dell'annuncio in alcun modo dopo averlo eliminato.
      </Alert>
      {error && (
        <Alert severity="error">Si è verificato un errore, riprovare</Alert>
      )}
      <MyButton
        onClick={onConfirm}
        variant="contained"
        color="primary"
        loading={loading}
        sx={{width: '100%'}}
      >
        {error ? 'Riprova' : 'Conferma eliminazione'}
      </MyButton>
    </MyModal>
  );
};

export default DeleteModal;
