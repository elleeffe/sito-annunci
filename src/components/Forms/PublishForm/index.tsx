import {Form} from 'react-final-form';
import MyStepper from '../../MyStepper';
import InformationStep from './InformationStep';

type Props = {
  handleSubmit: (values: any) => Promise<{
    'FINAL_FORM/form-error': string;
  } | void>;
};

const PublishForm = ({handleSubmit}: Props) => {
  return (
    <Form onSubmit={handleSubmit}>
      {({handleSubmit, submitting, hasValidationErrors, pristine, values}) => {
        return (
          <form onSubmit={(e) => e.preventDefault()}>
            <MyStepper
              alternativeLabel
              steps={[
                {
                  label: 'Informazioni',
                  screen: <InformationStep />,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
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
