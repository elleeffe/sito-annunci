import React from 'react';
import {Form} from 'react-final-form';
import {
  createPasswordValidator,
  emailValidator,
  passwordEqualityValidator,
} from '../utils/fields';
import MyTextField from './Fields/MyTextField';
import MyButton from './MyButton';

const RegisterForm = () => {
  return (
    <Form onSubmit={console.log}>
      {({handleSubmit, submitting, hasValidationErrors, pristine, values}) => (
        <form onSubmit={handleSubmit}>
          <MyTextField
            validate={emailValidator}
            name="email"
            placeholder="Email"
            spacingBottom
          />
          <MyTextField
            validate={createPasswordValidator}
            name="password"
            placeholder="Password"
            spacingBottom
            type="password"
          />
          <MyTextField
            validate={() =>
              passwordEqualityValidator(values.password, values.confirmPassword)
            }
            name="confirmPassword"
            placeholder="Ripeti password"
            spacingBottom
            type="password"
          />
          <MyButton
            onClick={handleSubmit}
            disabled={pristine || hasValidationErrors}
            variant="contained"
            sx={{width: '100%'}}
            loading={submitting}
          >
            Registrati
          </MyButton>
        </form>
      )}
    </Form>
  );
};

export default RegisterForm;
