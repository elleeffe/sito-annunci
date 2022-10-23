import {useCallback, useEffect, useState} from 'react';
import {Form} from 'react-final-form';
import {FORM_ERROR} from 'final-form';
import {Alert, Box, styled} from '@mui/material';
import {createPasswordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {TitleH5} from '../MyTypography';
import FormSuccess from './FormSuccess';

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSuccess: () => void;
};

const ChangePasswordForm = ({onSuccess}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(async (values: FormValues) => {
    try {
      console.log(values);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      //TODO
      return {
        [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
      };
    }
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }
  }, [success, onSuccess]);

  if (success) {
    return <FormSuccess label="Password modificata con successo!" />;
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
              Stai per modificare la password associata a questo account
            </TitleH5>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              validate={createPasswordValidator}
              name="currentPassword"
              placeholder="Password attuale*"
              type="password"
              spacingBottom
            />
            <MyTextField
              validate={createPasswordValidator}
              name="newPassword"
              placeholder="Nuova Password*"
              type="password"
              instructions
            />
            <MyTextField
              validate={(value) =>
                value === values.newPassword
                  ? ''
                  : 'La password non corrisponde'
              }
              name="confirmPassword"
              placeholder="Ripeti password*"
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
              Modifica password
            </MyButton>
          </form>
        )}
      </Form>
    </Wrap>
  );
};

export default ChangePasswordForm;

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
