import React from 'react';
import {Form} from 'react-final-form';
import {emailValidator, isRequired, passwordValidator} from '../utils/fields';
import MyTextField from './Fields/MyTextField';
import MyButton from './MyButton';
import {Body2} from './MyTypography';
import HelpIcon from '@mui/icons-material/Help';
import {styled, Box} from '@mui/material';
import MyCheckbox from './Fields/MyCheckbox';

const LoginForm = () => {
  return (
    <Form onSubmit={console.log}>
      {({handleSubmit, submitting, hasValidationErrors, pristine, values}) => (
        <form
          onSubmit={handleSubmit}
          style={{flex: 1, display: 'flex', flexDirection: 'column'}}
        >
          <Box flex={1}>
            <MyTextField
              validate={emailValidator}
              name="email"
              placeholder="Email"
              spacingBottom
            />
            <MyTextField
              validate={passwordValidator}
              name="password"
              placeholder="Password"
              type="password"
            />
            <MyCheckbox name="privacy" validate={isRequired}>
              Accetto le condizioni di utilizzo e la privacy policy.
            </MyCheckbox>
            <MyButton
              onClick={handleSubmit}
              disabled={pristine || hasValidationErrors}
              variant="contained"
              sx={{width: '100%'}}
              loading={submitting}
            >
              Accedi
            </MyButton>
          </Box>
          <Helper color="error">
            <HelpIcon
              color="error"
              sx={{width: '17px', height: '17px', marginRight: '5px'}}
            />
            <span>Non riesco ad accedere al mio account</span>
          </Helper>
        </form>
      )}
    </Form>
  );
};

export default LoginForm;

const Helper = styled(Body2)(() => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '25px',
  '&:hover': {textDecoration: 'underline'},
  span: {
    marginTop: '2px',
  },
}));
