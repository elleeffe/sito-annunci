import {Modal, styled, Box} from '@mui/material';
import PublishForm from '../Forms/PublishForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  ads?: Ads;
};

const EditModal = ({isOpen, onClose, ads}: Props) => {
  return (
    <Modal
      open={isOpen && !!ads}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ModalInner>
        <PublishForm initialAds={ads} finalVariant="edit" onClose={onClose} />
      </ModalInner>
    </Modal>
  );
};
export default EditModal;

const ModalInner = styled(Box)(() => ({
  display: 'flex',
  height: 'calc(100% - 10vh)',
  marginTop: '5vh',
  overflow: 'hidden',
  position: 'relative',
  padding: '0 15px',
  flex: 1,
}));
