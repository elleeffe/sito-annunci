import {Alert} from '@mui/material';
import {FORM_ERROR} from 'final-form';
import {useCallback, useState} from 'react';
import {Form} from 'react-final-form';
import {isRequired} from '../../utils/fields';
import {sleep} from '../../utils/utils';
import MyButton from '../Buttons/MyButton';
import MyTextField from '../Fields/MyTextField';
import {TitleH6} from '../MyTypography';
import FormSuccess from './FormSuccess';

type FormValues = {
  report: string;
};

type Props = {
  advId: string;
};

const ReportForm = ({advId}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (values: {report: string}) => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        console.log({
          comment: values.report,
          advId,
        });
        // TODO
        await sleep(1000);
        setSuccess(true);
      } catch (e) {
        console.log(e);
        //TODO
        return {
          [FORM_ERROR]: 'Ops, qualcosa è andato storto. Riprovare',
        };
      } finally {
        setLoading(false);
      }
    },
    [loading, advId]
  );

  if (success) {
    return <FormSuccess label="Segnalazione inviata con successo!" />;
  }

  return (
    <Form<FormValues> onSubmit={handleSubmit}>
      {({
        handleSubmit,
        pristine,
        submitError,
        submitting,
        hasValidationErrors,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TitleH6 isSmall marginBottom="15px">
              Segnalazione annuncio
            </TitleH6>
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              name="report"
              placeholder="Scrivi qui i motivi della segnalazione"
              multiline
              label="La tua segnalazione*"
              rows={8}
              validate={(value) => isRequired(value)}
              spacingBottom
            />
            <MyButton
              variant="contained"
              onClick={handleSubmit}
              sx={{width: '100%'}}
              disabled={pristine || hasValidationErrors}
              loading={submitting}
            >
              Invia segnalazione
            </MyButton>
          </form>
        );
      }}
    </Form>
  );
};

export default ReportForm;
