import {useMediaQuery} from '@mui/material';
import {useCallback} from 'react';
import {Form} from 'react-final-form';
import {useUser} from '../../../context/UserContext';
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

  const {user} = useUser();

  const handleSubmit = useCallback(async (values: any) => {
    console.log({submitValues: values});
  }, []);

  return (
    <Form<FormValues> onSubmit={handleSubmit} initialValues={initialAds}>
      {({handleSubmit, submitting, hasValidationErrors, pristine, values}) => {
        console.log({values});
        return (
          <form onSubmit={handleSubmit}>
            <MyStepper
              alternativeLabel
              hideLabel={match}
              steps={[
                {
                  label: 'Informazioni',
                  screen: <InformationStep hideConsens={!!initialAds} />,
                  action: handleSubmit,
                  loading: submitting,
                  disabled: hasValidationErrors,
                },
                {
                  label: 'Aggiungi foto',
                  screen: (
                    <ImagesStep
                      hideConsens={!!initialAds}
                      disabledCover={!!values.cover}
                      disabledImages={values.images?.length === 5}
                    />
                  ),
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
                },
                {
                  label: 'Visibilità',
                  screen: (
                    <VisibilityStep showTime={!!values.visibilityOption} />
                  ),
                  action: !submitting ? handleSubmit : undefined,
                  loading: submitting,
                  disabled: hasValidationErrors,
                },
                {
                  label: 'Conferma',
                  screen: (
                    <ConfirmStep
                      isLogged={!!user}
                      showPayment={!!values.visibilityOption}
                    />
                  ),
                  action: () => {},
                  button: {
                    label: 'Conferma',
                  },
                },
              ]}
              final={{
                screen: <h1>Annuncio caricato con successo</h1>,
                action: () => {},
                button: {
                  label: 'Conferma',
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
