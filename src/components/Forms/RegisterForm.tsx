import {Alert} from '@mui/material';
import {FORM_ERROR} from 'final-form';
import {useRouter} from 'next/router';
import React, {useCallback} from 'react';
import {Form} from 'react-final-form';
import {
  createPasswordValidator,
  emailValidator,
  isRequired,
  numberValidator,
} from '../../utils/fields';
import MyCheckbox from '../Fields/MyCheckbox';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../MyButton';
import {TitleH6} from '../MyTypography';

type Props = {
  onFinish: () => void;
};

const RegisterForm = ({onFinish}: Props) => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: any) => {
      try {
        // TODO: add api
        console.log({registerValues: values});
        onFinish();
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [onFinish]
  );

  return (
    <>
      <TitleH6 isSmall sx={{marginBottom: '15px'}}>
        Crea il tuo account
      </TitleH6>
      <Form onSubmit={handleSubmit}>
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
              placeholder="Email"
              spacingBottom
            />
            <MyTextField
              validate={(value) => numberValidator(value, true)}
              name="phone"
              placeholder="Cellulare"
              spacingBottom
            />
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
            <MyCheckbox name="privacy" validate={isRequired}>
              Accetto le condizioni di utilizzo e la privacy policy.
            </MyCheckbox>
            <MyButton
              onClick={handleSubmit}
              disabled={pristine || hasValidationErrors}
              variant="contained"
              loading={submitting}
              sx={{width: '100%'}}
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
