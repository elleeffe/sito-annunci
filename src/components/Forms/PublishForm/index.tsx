import {useMediaQuery} from '@mui/material';
import {useCallback, useMemo, useState} from 'react';
import {Form} from 'react-final-form';
import {useUser} from '../../../contexts/UserContext';
import MyStepper from '../../MyStepper';
import ConfirmStep from './ConfirmStep';
import FinalStep from './FinalStep';
import ImagesStep from './ImagesStep';
import InformationStep from './InformationStep';
import VisibilityStep from './VisibilityStep';

type Props = {
  initialAds?: Ads;
};

const PublishForm = ({initialAds}: Props) => {
  const [showFinal, setShowFinal] = useState<boolean>(false);

  const match = useMediaQuery('(max-width:600px)');

  const {user} = useUser();

  const handleSubmit = useCallback(
    async (values: AdsFormValues) => {
      try {
        if (initialAds && initialAds.id) {
          // TODO - edit
          console.log({adsToEdit: values});
          return setShowFinal(true);
        }
        // TODO - create
        console.log({newAds: values});
        return setShowFinal(true);
      } catch (e) {
        console.log(e);
      }
    },
    [initialAds]
  );

  const handleChangeStep = useCallback(
    () => window.scrollTo({top: 0, behavior: 'smooth'}),
    []
  );

  const initialValues:
    | AdsFormValues
    | {email: string; phone: string}
    | undefined = useMemo(() => {
    if (initialAds) {
      return initialAds;
    }
    if (user) {
      return {email: user.email, phone: user.phone};
    }
    return undefined;
  }, [user, initialAds]);

  return (
    <Form<AdsFormValues> onSubmit={handleSubmit} initialValues={initialValues}>
      {({handleSubmit, submitting, hasValidationErrors, pristine, values}) => {
        console.log(values);
        return (
          <form onSubmit={handleSubmit} style={{flex: 1}}>
            <MyStepper
              alternativeLabel
              hideLabel={match}
              initialStep={initialAds && !initialAds.id ? 3 : 0}
              onChangeStep={handleChangeStep}
              steps={[
                {
                  label: 'Informazioni',
                  screen: (
                    <InformationStep
                      user={user}
                      hideConsens={!!user || !!initialAds?.id}
                    />
                  ),
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
                  loading: submitting,
                  disabled: hasValidationErrors || pristine,
                },
                {
                  label: 'Visibilità',
                  screen: (
                    <VisibilityStep
                      showTime={!!values.visibilityOption}
                      initialValue={initialAds?.visibilityOption}
                    />
                  ),
                  loading: submitting,
                  disabled: hasValidationErrors,
                },
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
                  action: !submitting ? handleSubmit : undefined,
                  button: {
                    label: 'Conferma',
                    loading: submitting,
                  },
                },
              ]}
              final={{
                show: showFinal,
                screen: <FinalStep isLogged={!!user} />,
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
