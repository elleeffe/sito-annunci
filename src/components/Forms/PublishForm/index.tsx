import {IconButton, Paper, styled, useMediaQuery} from '@mui/material';
import {useCallback, useMemo, useState} from 'react';
import {Form} from 'react-final-form';
import {useUser} from '../../../contexts/UserContext';
import {formatVisibilityExpiration} from '../../../utils/utils';
import MyStepper from '../../MyStepper';
import ConfirmStep from './ConfirmStep';
import CreateVariant from './FinalStep/CreateVariant';
import EditVariant from './FinalStep/EditVariant';
import ImagesStep from './ImagesStep';
import InformationStep from './InformationStep';
import VisibilityStep from './VisibilityStep';
import {Close} from '@mui/icons-material';

type Props = {
  initialAds?: Ads;
  onChangeStep?: () => void;
  finalVariant: 'create' | 'edit';
  onClose?: () => void;
};

const PublishForm = ({
  initialAds,
  onChangeStep,
  finalVariant,
  onClose,
}: Props) => {
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

  const initialValues:
    | AdsFormValues
    | {email: string; phone: string}
    | undefined = useMemo(() => {
    if (!!initialAds && !!initialAds.id) {
      const {id, publicationDate, views, isFavorite, ...rest} = initialAds;
      return rest;
    }
    if (!!initialAds && !initialAds.id) {
      return initialAds;
    }
    if (user) {
      return {email: user.email, phone: user.phone};
    }
    return undefined;
  }, [user, initialAds]);

  return (
    <StyledPaper>
      {!!onClose && (
        <CloseButton
          onClick={onClose}
          color="error"
          size={match ? 'small' : 'medium'}
        >
          <Close />
        </CloseButton>
      )}
      <Form<AdsFormValues>
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          submitting,
          hasValidationErrors,
          pristine,
          values,
          dirty,
        }) => {
          //   console.log(values);
          return (
            <form onSubmit={handleSubmit} style={{flex: 1}}>
              <MyStepper
                alternativeLabel
                hideLabel={match}
                initialStep={initialAds && !initialAds.id ? 3 : 0}
                onChangeStep={onChangeStep}
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
                        hideConsens={!!user || !!initialAds}
                        disabledCover={!!values?.cover}
                        disabledImages={values?.images?.length === 5}
                      />
                    ),
                    loading: submitting,
                    disabled:
                      initialAds && !!values?.cover
                        ? false
                        : hasValidationErrors || pristine,
                  },
                  {
                    label: 'Visibilità',
                    screen: (
                      <VisibilityStep
                        showTime={!!values?.visibilityOption}
                        initialValue={initialAds?.visibilityOption}
                        visibilityExpiration={formatVisibilityExpiration(
                          values?.visibilityExpiration
                        )}
                      />
                    ),
                    loading: submitting,
                    disabled: hasValidationErrors,
                  },
                  {
                    label: 'Conferma',
                    disabled: !!values?.visibilityOption && !user,
                    screen: (
                      <ConfirmStep
                        isLogged={!!user}
                        showPayment={!!values?.visibilityOption}
                        currentAds={values}
                      />
                    ),
                    action: !submitting ? handleSubmit : undefined,
                    button: {
                      disabled: finalVariant === 'edit' ? !dirty : false,
                      label: finalVariant === 'edit' ? 'Modifica' : 'Conferma',
                      loading: submitting,
                    },
                  },
                ]}
                final={{
                  show: showFinal,
                  screen:
                    finalVariant === 'create' ? (
                      <CreateVariant />
                    ) : (
                      <EditVariant />
                    ),
                }}
              />
            </form>
          );
        }}
      </Form>
    </StyledPaper>
  );
};

export default PublishForm;

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '900px',
  borderRadius: '10px',
  margin: '0 auto',
  padding: '35px 25px 25px',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'auto',
  position: 'relative',

  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  [theme.breakpoints.down('sm')]: {
    padding: '30px 10px 20px',
  },
}));

const CloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '20px',
  left: '20px',
  zIndex: 1,

  [theme.breakpoints.down('md')]: {
    top: '15px',
    left: '15px',
  },
}));
