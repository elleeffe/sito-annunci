import {useCallback, useEffect, useState} from 'react';
import {FORM_ERROR} from 'final-form';
import {Form} from 'react-final-form';
import {Alert, Box, styled} from '@mui/material';
import {numberValueValidator, passwordValidator} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {TitleH5} from '../MyTypography';
import FormSuccess from './FormSuccess';

type FormValues = {
  phone: string;
  password: string;
};

type Props = {
  user: User;
  onSuccess: (user: User) => void;
  onClose: () => void;
};

const ChangePhoneForm = ({onSuccess, user, onClose}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        console.log(values);
        setSuccess(true);
        onSuccess({...user, phone: values.phone});
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [user, onSuccess]
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [success, onClose]);

  if (success) {
    return <FormSuccess label="Telefono modificato con successo!" />;
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
              Stai per modificare il numero di telefono associato a questo
              account
            </TitleH5>
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
