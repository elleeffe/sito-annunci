import {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {
  IconButton,
  Modal,
  styled,
  useMediaQuery,
  Box,
  Paper,
  Alert,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import {Body1, TitleH6} from '../MyTypography';
import {sleep} from '../../utils/utils';
import {useUser} from '../../contexts/UserContext';
import {Login, PersonAddAlt1} from '@mui/icons-material';
import RegisterForm from '../Forms/RegisterForm';
import LoginForm from '../Forms/LoginForm';
import MyButton from '../Buttons/MyButton';
import MyTextField from '../Fields/MyTextField';
import {Form} from 'react-final-form';
import {FORM_ERROR} from 'final-form';
import {isRequired} from '../../utils/fields';
import FormSuccess from '../Forms/FormSuccess';

type Props = {
  detailId: string;
  isOpen: boolean;
  onClose: () => void;
};

const LeaveCommentsModal = ({detailId, isOpen, onClose}: Props) => {
  const {user} = useUser();
  const [tab, setTab] = useState(0);
  const [oldComment, setOldComment] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const match = useMediaQuery('(max-width:600px)');

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  const handleSubmit = useCallback(
    async (values: {comment: string}) => {
      if (loading || !user) {
        return;
      }
      try {
        setLoading(true);
        console.log({
          comment: values.comment,
          idAdv: detailId,
          userId: user.id,
        });
        // TODO
        if (!!oldComment) {
          // change
          await sleep(1000);
        } else {
          // add
          await sleep(1000);
        }
        setSuccess(true);
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      } finally {
        setLoading(false);
      }
    },
    [loading, user, detailId, oldComment]
  );

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
              <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  variant="fullWidth"
                >
                  <Tab
                    label="Accedi"
                    sx={{textTransform: 'initial'}}
                    icon={
                      <Login
                        sx={{marginLeft: '10px', width: '20px', height: '20px'}}
                      />
                    }
                    iconPosition="end"
                  />
                  <Tab
                    label="Crea account"
                    sx={{textTransform: 'initial'}}
                    icon={
                      <PersonAddAlt1
                        sx={{marginLeft: '10px', width: '20px', height: '20px'}}
                      />
                    }
                    iconPosition="end"
                  />
                </Tabs>
              </Box>
              {tab === 0 && (
                <TabPanel>
                  <LoginForm onSuccess={() => setTab(0)} />
                </TabPanel>
              )}
              {tab === 1 && (
                <TabPanel>
                  <RegisterForm onFinish={() => setTab(0)} />
                </TabPanel>
              )}
            </>
          ) : success ? (
            <FormSuccess
              label={
                !!oldComment
                  ? 'Recensione modificata con successo!'
                  : 'Recensione pubblicata con successo!'
              }
            />
          ) : (
            <Form<{comment: string}>
              initialValues={{comment: oldComment}}
              onSubmit={handleSubmit}
            >
              {({
                handleSubmit,
                pristine,
                submitError,
                submitting,
                hasValidationErrors,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <TitleH6 isSmall marginBottom="15px">
                      Lascia una recensione
                    </TitleH6>
                    {!oldComment && (
                      <Body1 marginBottom="25px">
                        Attenzione, una volta pubblicata una recensione non
                        potrà più essere cancellata.
                      </Body1>
                    )}
                    {submitError && (
                      <Alert severity="error" sx={{marginBottom: '25px'}}>
                        {submitError}
                      </Alert>
                    )}
                    <MyTextField
                      name="comment"
                      placeholder="Scrivi qui la tua recensione"
                      multiline
                      label="La tua recensione*"
                      rows={8}
                      validate={(value) => isRequired(value)}
                      spacingBottom
                    />
                    <MyButton
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{width: '100%'}}
                      disabled={pristine || hasValidationErrors}
                      loading={submitting}
                    >
                      {!!oldComment
                        ? 'Modifica recensione'
                        : 'Pubblica recensione'}
                    </MyButton>
                  </form>
                );
              }}
            </Form>
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

const TabPanel = styled(Box)(({theme}) => ({
  padding: '15px 25px 25px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '450px',
  overflow: 'auto',
  '@media (max-height:700px)': {
    maxHeight: '500px',
  },
}));
