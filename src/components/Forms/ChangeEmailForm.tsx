import {useCallback, useEffect, useState} from 'react';
import {Form} from 'react-final-form';
import {FORM_ERROR} from 'final-form';
import {Alert, Box, styled} from '@mui/material';
import {emailValidator, passwordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {TitleH5} from '../MyTypography';
import FormSuccess from './FormSuccess';

type FormValues = {
  currentEmail: string;
  newEmail: string;
  password: string;
};

type Props = {
  user: User;
  onSuccess: (user: User) => void;
  onClose: () => void;
};

const ChangeEmailForm = ({user, onSuccess, onClose}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        console.log(values);
        setSuccess(true);
        onSuccess({...user, email: values.newEmail});
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [onSuccess, user]
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [success, onClose]);

  if (success) {
    return <FormSuccess label="Email modificata con successo!" />;
  }

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
            <TitleH5 marginBottom="25px">
              Stai per modificare l'email associata a questo account
            </TitleH5>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              validate={emailValidator}
              name="currentEmail"
              placeholder="Email attuale*"
              spacingBottom
            />
            <MyTextField
              validate={emailValidator}
              name="newEmail"
              placeholder="Nuova email*"
              spacingBottom
            />
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
            >
              Modifica email
            </MyButton>
          </form>
        )}
      </Form>
    </Wrap>
  );
};

export default ChangeEmailForm;

const Wrap = styled(Box)(() => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
}));
