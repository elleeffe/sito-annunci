import {useMediaQuery} from '@mui/material';
import {useCallback} from 'react';
import {Form} from 'react-final-form';
import MyStepper from '../../MyStepper';
import InformationStep from './InformationStep';

type Props = {
  initialValues?: Ads;
};

const PublishForm = ({initialValues}: Props) => {
  const match = useMediaQuery('(max-width:600px)');

  const handleSubmit = useCallback(
    async (values: any) => console.log(values),
    []
  );

  return (
    <Form onSubmit={handleSubmit} initialValues={initialValues}>
      {({
        handleSubmit,
        submitting,
        hasValidationErrors,
        pristine,
        values,
        form,
      }) => {
        console.log(values);
        return (
          <form onSubmit={(e) => e.preventDefault()}>
            <MyStepper
              alternativeLabel
              hideLabel={match}
              steps={[
                {
                  label: 'Informazioni',
                  screen: <InformationStep />,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors,
                },
                {
                  label: 'Aggiungi foto',
                  screen: <h1>Aggiungi foto</h1>,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
                },
                {
                  label: 'Visibilità',
                  screen: <h1>Visibilità</h1>,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
                },
                {
                  label: 'Conferma',
                  screen: <h1>Conferma</h1>,
                  action: () => {},
                },
              ]}
              final={{
                screen: <h1>Annuncio caricato con successo</h1>,
                action: () => {},
                button: {
                  label: 'Vai al profilo',
                },
              }}
            />
          </form>
        );
      }}
    </Form>
  );
};

export default PublishForm;
