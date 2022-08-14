import {useCallback, useEffect, useState} from 'react';
import {FORM_ERROR} from 'final-form';
import {Form} from 'react-final-form';
import {Alert, Box, keyframes, styled} from '@mui/material';
import {numberValueValidator, passwordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../MyButton';
import {Subtitle1, TitleH6} from '../MyTypography';
import CheckIcon from '@mui/icons-material/Check';
import {useUser} from '../../contexts/UserContext';

type FormValues = {
  phone: string;
  password: string;
};

type Props = {
  user: User;
  onSuccess: () => void;
};

const ChangePhoneForm = ({onSuccess, user}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);

  const {update} = useUser();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        console.log(values);
        setSuccess(true);
        update({...user, phone: values.phone});
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [user, update]
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
        <TitleH6>Telefono modificato con successo!</TitleH6>
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
            <TitleH6>Modifica telefono</TitleH6>
            <Subtitle1 marginBottom="25px">
              Stai per modificare il numero di telefono associato a questo
              account
            </Subtitle1>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              validate={(value) =>
                numberValueValidator(value, true, undefined, 10)
              }
              name="phone"
              placeholder="Telefono*"
              spacingBottom
            />
            <MyTextField
              validate={passwordValidator}
              name="password"
              placeholder="Password*"
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
              Modifica telefono
            </MyButton>
          </form>
        )}
      </Form>
    </Wrap>
  );
};

export default ChangePhoneForm;

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
