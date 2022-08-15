import {PropsWithChildren} from 'react';
import {IconButton, Modal, Paper, styled, useMediaQuery} from '@mui/material';
import {Close} from '@mui/icons-material';

type Props = PropsWithChildren<{isOpen: boolean; onClose: () => void}>;

const MyModal = ({children, onClose, isOpen}: Props) => {
  const match = useMediaQuery('(max-width:600px)');

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      <ModalInner>
        <CloseButton
          onClick={onClose}
          color="error"
          size={match ? 'small' : 'medium'}
        >
          <Close />
        </CloseButton>
        {children}
      </ModalInner>
    </Modal>
  );
};

export default MyModal;

const ModalInner = styled(Paper)(({theme}) => ({
  width: '90vw',
  height: '95vh',
  maxWidth: '700px',
  maxHeight: '630px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  padding: '70px 25px',
  overflow: 'auto',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    padding: '40px 15px',
  },
}));

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
