import {Alert, Box, Button, Modal, styled} from '@mui/material';
import MyButton from '../Buttons/MyButton';
import {TitleH5} from '../MyTypography';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  error: boolean;
  loading: boolean;
  onConfirm: () => Promise<void>;
};

const DeleteModal = ({isOpen, onClose, error, loading, onConfirm}: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ModalInner>
        <TitleH5 marginBottom="25px">
          Eliminare definitivamente l'annuncio?
        </TitleH5>
        {error && (
          <Alert severity="error">Si è verificato un errore, riprovare</Alert>
        )}
        <Box display="flex" justifyContent="flex-end" marginTop="25px">
          <Button
            variant="text"
            size="small"
            color="primary"
            onClick={onClose}
            sx={{marginRight: '15px'}}
          >
            Annulla
          </Button>
          <MyButton
            onClick={onConfirm}
            variant="contained"
            color="error"
            size="small"
            loading={loading}
            sx={{minWidth: '100px'}}
          >
            {error ? 'Riprova' : 'Elimina'}
          </MyButton>
        </Box>
      </ModalInner>
    </Modal>
  );
};

export default DeleteModal;

const ModalInner = styled(Box)(() => ({
  maxWidth: '500px',
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  padding: '20px',
}));
