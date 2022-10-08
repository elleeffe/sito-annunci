import {useCallback, useState} from 'react';
import {
  IconButton,
  Modal,
  styled,
  useMediaQuery,
  Box,
  Paper,
  Alert,
  Tooltip,
} from '@mui/material';
import {Close} from '@mui/icons-material';
import {TitleH6} from '../MyTypography';
import {sleep} from '../../utils/utils';
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

const ReportModal = ({detailId, isOpen, onClose}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const match = useMediaQuery('(max-width:600px)');

  const handleSubmit = useCallback(
    async (values: {report: string}) => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        console.log({
          comment: values.report,
          idAdv: detailId,
        });
        // TODO
        await sleep(1000);
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
    [loading, detailId]
  );

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
          {success ? (
            <FormSuccess label="Segnalazione inviata con successo!" />
          ) : (
            <Form<{report: string}> onSubmit={handleSubmit}>
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
                      Segnalazione annuncio
                    </TitleH6>
                    {submitError && (
                      <Alert severity="error" sx={{marginBottom: '25px'}}>
                        {submitError}
                      </Alert>
                    )}
                    <MyTextField
                      name="report"
                      placeholder="Scrivi qui i motivi della segnalazione"
                      multiline
                      label="La tua segnalazione*"
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
                      Invia segnalazione
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
