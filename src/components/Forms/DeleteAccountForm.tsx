import {useCallback} from 'react';
import {FORM_ERROR} from 'final-form';
import {Form} from 'react-final-form';
import {Alert, Box, styled} from '@mui/material';
import {passwordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {Subtitle1, TitleH6} from '../MyTypography';

type FormValues = {
  password: string;
};

type Props = {
  onSuccess: () => void;
};

const DeleteAccountForm = ({onSuccess}: Props) => {
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        console.log(values);
        onSuccess();
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [onSuccess]
  );

  return (
    <Wrap>
      <Form<FormValues> onSubmit={handleSubmit}>
        {({
          handleSubmit,
          submitting,
          hasValidationErrors,
          pristine,
          submitError,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <TitleH6>Elimina account</TitleH6>
            <Subtitle1 marginBottom="25px">
              Stai per eliminare questo account e tutte le informazioni ad esso
              collegate
            </Subtitle1>
            <Alert
              severity="warning"
              sx={{marginBottom: '25px', textAlign: 'left'}}
            >
              Attenzione! Questa azione è irreversibile, in seguito non potrai
              in nessun modo recuperare questo account.
            </Alert>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              validate={passwordValidator}
              name="password"
              placeholder="Password*"
              type="password"
              spacingBottom
            />
            <MyButton
              onClick={handleSubmit}
              disabled={pristine || hasValidationErrors}
              variant="contained"
              sx={{width: '100%'}}
              loading={submitting}
              type="submit"
              color="warning"
            >
              Elimina account
            </MyButton>
          </form>
        )}
      </Form>
    </Wrap>
  );
};

export default DeleteAccountForm;

const Wrap = styled(Box)(() => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
}));
