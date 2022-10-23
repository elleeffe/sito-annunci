import {Alert} from '@mui/material';
import {FORM_ERROR} from 'final-form';
import {useCallback, useState} from 'react';
import {Form} from 'react-final-form';
import {isRequired} from '../../utils/fields';
import {sleep} from '../../utils/utils';
import MyButton from '../Buttons/MyButton';
import MyTextField from '../Fields/MyTextField';
import FormSuccess from './FormSuccess';

type FormValues = {
  comment: string;
};

type Props = {
  advId: string;
  initialValues?: string;
};

const LeaveCommentsForm = ({advId, initialValues}: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (values: {comment: string}) => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        console.log({
          comment: values.comment,
          advId,
        });
        // TODO
        if (!!initialValues) {
          // change
          await sleep(1000);
        } else {
          // add
          await sleep(1000);
        }
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
    [loading, advId, initialValues]
  );

  if (success) {
    return (
      <FormSuccess
        label={
          !!initialValues
            ? 'Recensione modificata con successo!'
            : 'Recensione pubblicata con successo!'
        }
      />
    );
  }

  return (
    <Form<FormValues>
      initialValues={{comment: initialValues}}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        pristine,
        submitError,
        submitting,
        hasValidationErrors,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            {!initialValues && (
              <Alert severity="warning" sx={{marginBottom: '25px'}}>
                Attenzione, una volta pubblicata una recensione non potrà più
                essere cancellata.
              </Alert>
            )}
            {submitError && (
              <Alert severity="error" sx={{marginBottom: '25px'}}>
                {submitError}
              </Alert>
            )}
            <MyTextField
              name="comment"
              placeholder="Scrivi qui la tua recensione"
              multiline
              label="La tua recensione*"
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
              {!!initialValues ? 'Modifica recensione' : 'Pubblica recensione'}
            </MyButton>
          </form>
        );
      }}
    </Form>
  );
};

export default LeaveCommentsForm;
