import {useMediaQuery} from '@mui/material';
import {useCallback, useMemo} from 'react';
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

const PublishForm = ({initialAds}: Props) => {
  const match = useMediaQuery('(max-width:600px)');

  const {user} = useUser();

  const handleSubmit = useCallback(async (values: any) => {
    console.log({submitValues: values});
  }, []);

  const handleChangeStep = useCallback(
    () => window.scrollTo({top: 0, behavior: 'smooth'}),
    []
  );

  return (
    <Form<AdsFormValues> onSubmit={handleSubmit} initialValues={initialAds}>
      {({handleSubmit, submitting, hasValidationErrors, pristine, values}) => {
        return (
          <form onSubmit={handleSubmit} style={{flex: 1}}>
            <MyStepper
              alternativeLabel
              hideLabel={match}
              initialStep={initialAds && 2}
              onChangeStep={handleChangeStep}
              steps={[
                // {
                //   label: 'Informazioni',
                //   screen: <InformationStep hideConsens={!!initialAds} />,
                //   action: handleSubmit,
                //   loading: submitting,
                //   disabled: hasValidationErrors,
                // },
                // {
                //   label: 'Aggiungi foto',
                //   screen: (
                //     <ImagesStep
                //       hideConsens={!!initialAds}
                //       disabledCover={!!values.cover}
                //       disabledImages={values.images?.length === 5}
                //     />
                //   ),
                //   action: !submitting ? handleSubmit : undefined,
                //   loading: submitting,
                //   disabled: hasValidationErrors || pristine,
                // },
                // {
                //   label: 'Visibilità',
                //   screen: (
                //     <VisibilityStep
                //       showTime={!!values.visibilityOption}
                //       initialValue={initialAds?.visibilityOption}
                //     />
                //   ),
                //   action: !submitting ? handleSubmit : undefined,
                //   loading: submitting,
                //   disabled: hasValidationErrors,
                // },
                {
                  label: 'Conferma',
                  disabled: !!values.visibilityOption && !user,
                  screen: (
                    <ConfirmStep
                      isLogged={!!user}
                      showPayment={!!values.visibilityOption}
                      currentAds={values}
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
