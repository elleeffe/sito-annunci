import {useMediaQuery} from '@mui/material';
import {useCallback} from 'react';
import {Form} from 'react-final-form';
import MyStepper from '../../MyStepper';
import ConfirmStep from './ConfirmStep';
import ImagesStep from './ImagesStep';
import InformationStep from './InformationStep';
import VisibilityStep from './VisibilityStep';

type Props = {
  initialAds?: Ads;
};

type FormValues = Ads & {
  privacyConsens?: boolean;
  marketing?: boolean;
  specialData?: boolean;
  imageConsens?: boolean;
};

const PublishForm = ({initialAds}: Props) => {
  const match = useMediaQuery('(max-width:600px)');

  const handleSubmit = useCallback(
    async (values: any) => console.log(values),
    []
  );

  return (
    <Form<FormValues> onSubmit={handleSubmit} initialValues={initialAds}>
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
          <form onSubmit={handleSubmit}>
            <MyStepper
              alternativeLabel
              hideLabel={match}
              steps={[
                {
                  label: 'Informazioni',
                  screen: <InformationStep hideConsens={!!initialAds} />,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors,
                },
                {
                  label: 'Aggiungi foto',
                  screen: <ImagesStep />,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
                },
                {
                  label: 'Visibilità',
                  screen: <VisibilityStep />,
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
                },
                {
                  label: 'Conferma',
                  screen: <ConfirmStep />,
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
