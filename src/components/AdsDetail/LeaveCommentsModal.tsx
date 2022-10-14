import {useEffect, useState} from 'react';
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
import {useUser} from '../../contexts/UserContext';
import {Login, PersonAddAlt1} from '@mui/icons-material';
import RegisterForm from '../Forms/RegisterForm';
import LoginForm from '../Forms/LoginForm';
import MyTabs from '../MyTabs';
import LeaveCommentsForm from '../Forms/LeaveCommentsForm';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const LeaveCommentsModal = ({detailId, isOpen, onClose}: Props) => {
  const {user} = useUser();
  const [tab, setTab] = useState(0);
  const [oldComment, setOldComment] = useState<string>();

  const match = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      try {
        // TODO
        // const oldComment = await sleep(1000);
        // setOldComment('Questo è il contenuto del tuo precedente commento');
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user]);

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
          {!user ? (
            <>
              <MyTabs
                activeTab={tab}
                onChange={(newValue) => setTab(newValue)}
                tabs={[
                  {
                    button: {
                      label: 'Accedi',
                      icon: <Login />,
                    },
                    children: <LoginForm onSuccess={() => setTab(0)} />,
                  },
                  {
                    button: {
                      label: 'Crea account',
                      icon: <PersonAddAlt1 />,
                    },
                    children: <RegisterForm onSuccess={() => setTab(0)} />,
                  },
                ]}
              />
            </>
          ) : (
            <LeaveCommentsForm initialValues={oldComment} advId={detailId} />
          )}
        </StyledPaper>
      </ModalInner>
    </Modal>
  );
};
export default LeaveCommentsModal;

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
