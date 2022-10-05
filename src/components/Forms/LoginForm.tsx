import React, {useCallback, useState} from 'react';
import {Form} from 'react-final-form';
import {
  emailValidator,
  isRequired,
  passwordValidator,
} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../Buttons/MyButton';
import {Body2, TitleH6} from '../MyTypography';
import HelpIcon from '@mui/icons-material/Help';
import {styled, Box, Alert} from '@mui/material';
import MyCheckbox from '../Fields/MyCheckbox';
import RecoveryForm from './RecoveryForm';
import {FORM_ERROR} from 'final-form';
import {useUser} from '../../contexts/UserContext';
import {useRouter} from 'next/router';
import {useAdsContext} from '../../contexts/AdsContext';

type FormValues = {
  email: string;
  password: string;
  privacy: boolean;
};

type Props = {
  onSuccess?: () => void;
};

const LoginForm = ({onSuccess}: Props) => {
  const [recovery, setRecovery] = useState<boolean>(false);

  const {login} = useUser();

  const {ads} = useAdsContext();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        console.log(values);
        // const response = await axios.post('/api/login', {credentials: values})
        // login(response.data);
        setTimeout(
          () =>
            login({
              email: 'lorenzo@faenzi.com',
              phone: '34287438732',
              id: 'user-1',
            }),
          2000
        );
        if (ads) {
          !!onSuccess && onSuccess();
          router.push('/pubblica-annuncio');
          return;
        }
        !!onSuccess && onSuccess();
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      }
    },
    [login, router, ads, onSuccess]
  );

  if (recovery) {
    return <RecoveryForm onClose={() => setRecovery(false)} />;
  }

  return (
    <>
      <TitleH6 isSmall sx={{marginBottom: '15px'}}>
        Accedi al tuo account
      </TitleH6>
      <Form<FormValues> onSubmit={handleSubmit}>
        {({
          handleSubmit,
          submitting,
          hasValidationErrors,
          pristine,
          submitError,
          values,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <Box flex={1}>
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
                validate={passwordValidator}
                name="password"
                placeholder="Password*"
                type="password"
              />
              <MyCheckbox name="privacy" validate={isRequired}>
                Accetto le condizioni di utilizzo e la privacy policy.
              </MyCheckbox>
              <MyButton
                onClick={handleSubmit}
                disabled={pristine || hasValidationErrors || submitting}
                variant="contained"
                sx={{width: '100%'}}
                loading={submitting}
                type="submit"
              >
                Accedi
              </MyButton>
            </Box>
            <Helper color="error" onClick={() => setRecovery(true)}>
              <HelpIcon
                color="error"
                sx={{width: '17px', height: '17px', marginRight: '5px'}}
              />
              <span>Non riesco ad accedere al mio account</span>
            </Helper>
          </form>
        )}
      </Form>
    </>
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
