import {Alert} from '@mui/material';
import {FORM_ERROR} from 'final-form';
import React, {useCallback} from 'react';
import {Form} from 'react-final-form';
import {
  createPasswordValidator,
  emailValidator,
  isRequired,
  numberValueValidator,
} from '../../utils/fields';
import MyCheckbox from '../Fields/MyCheckbox';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {TitleH5} from '../MyTypography';

type FormValues = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  privacy: boolean;
};

type Props = {
  onSuccess: () => void;
};

const RegisterForm = ({onSuccess}: Props) => {
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        // TODO: add api
        console.log({registerValues: values});
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
    <>
      <TitleH5 sx={{marginBottom: '15px'}}>Crea il tuo account</TitleH5>
      <Form<FormValues> onSubmit={handleSubmit}>
        {({
          handleSubmit,
          submitting,
          hasValidationErrors,
          pristine,
          values,
          submitError,
        }) => (
          <form onSubmit={handleSubmit}>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              validate={emailValidator}
              name="email"
              placeholder="Email*"
              spacingBottom
            />
            <MyTextField
              validate={(value) =>
                numberValueValidator(value, true, undefined, 10)
              }
              name="phone"
              placeholder="Telefono*"
              spacingBottom
            />
            <MyTextField
              validate={createPasswordValidator}
              name="password"
              placeholder="Password*"
              type="password"
              instructions
            />
            <MyTextField
              validate={(value) =>
                value === values.password ? '' : 'La password non corrisponde'
              }
              name="confirmPassword"
              placeholder="Ripeti password*"
              type="password"
            />
            <MyCheckbox name="privacy" validate={isRequired}>
              Accetto le condizioni di utilizzo e la privacy policy.
            </MyCheckbox>
            <MyButton
              onClick={handleSubmit}
              disabled={pristine || hasValidationErrors}
              variant="contained"
              loading={submitting}
              sx={{width: '100%', marginBottom: '25px'}}
              type="submit"
            >
              Crea account
            </MyButton>
          </form>
        )}
      </Form>
    </>
  );
};

export default RegisterForm;
