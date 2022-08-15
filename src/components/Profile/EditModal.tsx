import {IconButton, Modal, styled, useMediaQuery, Box} from '@mui/material';
import PublishForm from '../Forms/PublishForm';
import {Close} from '@mui/icons-material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  ads?: Ads;
};

const EditModal = ({isOpen, onClose, ads}: Props) => {
  const match = useMediaQuery('(max-width:600px)');

  return (
    <Modal
      open={isOpen && !!ads}
      onClose={onClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '90vh',
          minHeight: '500px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CloseButton
          onClick={onClose}
          color="error"
          size={match ? 'small' : 'medium'}
        >
          <Close />
        </CloseButton>
        <PublishForm initialAds={ads} finalVariant="edit" />
      </Box>
    </Modal>
  );
};
export default EditModal;

const CloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '20px',
  left: '20px',
  zIndex: 1,

  [theme.breakpoints.down('md')]: {
    top: '15px',
    left: '15px',
  },
}));
