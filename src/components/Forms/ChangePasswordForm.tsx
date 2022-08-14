import {useCallback, useEffect, useState} from 'react';
import {Form} from 'react-final-form';
import {FORM_ERROR} from 'final-form';
import {Alert, Box, keyframes, styled} from '@mui/material';
import {createPasswordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../MyButton';
import {Subtitle1, TitleH6} from '../MyTypography';
import CheckIcon from '@mui/icons-material/Check';

type FormValues = {
  password: string;
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
    return (
      <SuccessWrap>
        <CheckIcon
          color="success"
          sx={{
            animation: `700ms linear infinite alternate ${bouncing}`,
            width: '50px',
            height: '50px',
            marginBottom: '15px',
          }}
        />
        <TitleH6>Password modificata con successo!</TitleH6>
      </SuccessWrap>
    );
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
            <TitleH6>Modifica password</TitleH6>
            <Subtitle1 marginBottom="25px">
              Stai per modificare la password associata a questo account
            </Subtitle1>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              validate={createPasswordValidator}
              name="password"
              placeholder="Password"
              type="password"
              instructions
            />
            <MyTextField
              validate={(value) =>
                value === values.password ? '' : 'La password non corrisponde'
              }
              name="confirmPassword"
              placeholder="Ripeti password"
              type="password"
            />
            <MyButton
              onClick={handleSubmit}
              disabled={pristine || hasValidationErrors}
              variant="contained"
              sx={{width: '100%', marginTop: '30px'}}
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

const SuccessWrap = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%',
}));

const bouncing = keyframes`
from {
  transform: translateY(5px);
}
to {
  transform: translateY(0px)
}
`;
