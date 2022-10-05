import {useCallback, useEffect, useState} from 'react';
import {Form} from 'react-final-form';
import {FORM_ERROR} from 'final-form';
import {useUser} from '../../contexts/UserContext';
import {Alert, Box, keyframes, styled} from '@mui/material';
import {emailValidator, passwordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {Subtitle1, TitleH6} from '../MyTypography';
import CheckIcon from '@mui/icons-material/Check';

type FormValues = {
  currentEmail: string;
  newEmail: string;
  password: string;
};

type Props = {
  user: User;
  onSuccess: () => void;
};

const ChangeEmailForm = ({user, onSuccess}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);

  const {update} = useUser();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        console.log(values);
        setSuccess(true);
        update({...user, email: values.newEmail});
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [update, user]
  );

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
        <TitleH6>Email modificata con successo!</TitleH6>
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
            <TitleH6>Modifica email</TitleH6>
            <Subtitle1 marginBottom="25px">
              Stai per modificare l'email associata a questo account
            </Subtitle1>
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
