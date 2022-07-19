import React, {useState, useCallback, useMemo} from 'react';
import {Form} from 'react-final-form';
import {
  emailValidator,
  isRequired,
  numberValidator,
  passwordValidator,
} from '../../utils/fields';
import MyTextField from '../Fields/MyTextField';
import MyButton from '../MyButton';
import {Alert, Box} from '@mui/material';
import {Body2, TitleH6} from '../MyTypography';
import {FORM_ERROR} from 'final-form';

type Props = {
  onClose: () => void;
};

const RecoveryForm = ({onClose}: Props) => {
  const [step, setStep] = useState<'initial' | 'code' | 'credentials'>(
    'initial'
  );

  const handlePhone = useCallback(async (values: any) => {
    try {
      console.log({initial: values.phone});
    } catch (e) {
      console.log(e); //TODO
      return {
        [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
      };
    }
    setStep('code');
  }, []);

  const handleCode = useCallback(async (values: any) => {
    try {
      console.log({code: values.code});
    } catch (e) {
      console.log(e); //TODO
      return {
        [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
      };
    }
    setStep('credentials');
  }, []);

  const handleCredentials = useCallback(async (values: any) => {
    try {
      console.log({email: values.email, password: values.password});
    } catch (e) {
      console.log(e);
      //TODO
      return {
        [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
      };
    }
  }, []);

  const handleSubmit = useMemo(() => {
    if (step === 'initial') {
      return handlePhone;
    }
    if (step === 'code') {
      return handleCode;
    }
    return handleCredentials;
  }, [step, handlePhone, handleCode, handleCredentials]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {({
          handleSubmit,
          submitting,
          hasValidationErrors,
          pristine,
          values,
          form,
          submitError,
        }) => (
          <>
            <Box flex={1}>
              {step === 'initial' && (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TitleH6 isSmall sx={{marginBottom: '15px'}}>
                    Recupero credenziali
                  </TitleH6>
                  <Body2 sx={{marginBottom: '20px'}}>
                    Invieremo un codice segreto al numero di cellulare che hai
                    inserito.
                  </Body2>
                  {submitError && (
                    <Alert severity="error" sx={{marginBottom: '25px'}}>
                      {submitError}
                    </Alert>
                  )}
                  <MyTextField
                    validate={(value) => numberValidator(value, true)}
                    name="phone"
                    placeholder="Cellulare"
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
                    Invia codice
                  </MyButton>
                </form>
              )}
              {step === 'code' && (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TitleH6 isSmall sx={{marginBottom: '15px'}}>
                    Verifica codice
                  </TitleH6>
                  <Body2 sx={{marginBottom: '20px'}}>
                    Inserisci il codice segreto ricevuto per SMS
                  </Body2>
                  {submitError && (
                    <Alert severity="error" sx={{marginBottom: '25px'}}>
                      {submitError}
                    </Alert>
                  )}
                  <MyTextField
                    validate={isRequired}
                    name="code"
                    placeholder="Codice segreto"
                    spacingBottom
                    type="password"
                  />
                  <MyButton
                    onClick={handleSubmit}
                    disabled={pristine || hasValidationErrors}
                    variant="contained"
                    sx={{width: '100%'}}
                    loading={submitting}
                    type="submit"
                  >
                    Verifica
                  </MyButton>
                </form>
              )}
              {step === 'credentials' && (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TitleH6 isSmall sx={{marginBottom: '15px'}}>
                    Effettua l'accesso
                  </TitleH6>
                  <Body2 sx={{marginBottom: '20px'}}>
                    Ti abbiamo inviato un SMS con le credenziali del tuo account
                  </Body2>
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
                    validate={passwordValidator}
                    name="password"
                    placeholder="Password"
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
                    Accedi
                  </MyButton>
                </form>
              )}
            </Box>
            {step === 'initial' && (
              <MyButton size="small" variant="text" onClick={onClose}>
                Torna al login
              </MyButton>
            )}
          </>
        )}
      </Form>
    </>
  );
};

export default RecoveryForm;
