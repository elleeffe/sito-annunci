import React from 'react';
import {Form} from 'react-final-form';
import {createPasswordValidator, emailValidator} from '../utils/fields';
import MyTextField from './Fields/MyTextField';
import MyButton from './MyButton';

const RegisterForm = () => {
  return (
    <>
      <Form onSubmit={console.log}>
        {({
          handleSubmit,
          submitting,
          hasValidationErrors,
          pristine,
          values,
        }) => (
          <form onSubmit={handleSubmit} style={{flex: 1, display: 'flex'}}>
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
              validate={(value) =>
                value === values.password ? '' : 'La password non corrisponde'
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
              loading={submitting}
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
