import {
  IconButton,
  Modal,
  styled,
  useMediaQuery,
  Box,
  Paper,
  Tooltip,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import ReportForm from '../Forms/ReportForm';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const ReportModal = ({detailId, isOpen, onClose}: Props) => {
  const match = useMediaQuery('(max-width:600px)');

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
          <ReportForm advId={detailId} />
        </StyledPaper>
      </ModalInner>
    </Modal>
  );
};
export default ReportModal;

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
  maxWidth: '600px',
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
    justifyContent: 'center',
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
