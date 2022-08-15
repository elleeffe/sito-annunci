import {useMemo, useState} from 'react';
import {Box, styled} from '@mui/material';
import {timeRangeOptions, visibilityOptions} from '../../../utils/config';
import {isRequired} from '../../../utils/fields';
import MyRadioCard from '../../Fields/MyRadioCard';
import MySelect from '../../Fields/MySelect';
import MiniHeroBanner from '../../Hero/MiniHeroBanner';
import {Body1, Subtitle1, Subtitle2, TitleH6} from '../../MyTypography';
import MyModal from '../../MyModal';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

type Props = {
  showTime: boolean;
  initialValue?: Visibility;
  visibilityExpiration?: string;
};

const VisibilityStep = ({
  showTime,
  initialValue,
  visibilityExpiration,
}: Props) => {
  const [modal, setModal] = useState<boolean>(false);

  const currentOption = useMemo(
    () => visibilityOptions.find((el) => el.value === initialValue),
    [initialValue]
  );

  return (
    <>
      <Box display="flex" flexDirection="column" marginBottom="30px">
        <TitleH6 marginBottom="20px">
          Più visibilità per il tuo annuncio
        </TitleH6>
        {!!visibilityExpiration && currentOption ? (
          <ExpirationWrap>
            <StyledRocketIcon color="primary" />
            <Box>
              <Subtitle1 gutterBottom>
                Opzione {currentOption.title} già attiva per questo annuncio
              </Subtitle1>
              <Subtitle2 gutterBottom>{visibilityExpiration}</Subtitle2>
              <Body1>
                Potrai rinnovare il piano di visibilità una volta terminato
                quello corrente.
              </Body1>
            </Box>
          </ExpirationWrap>
        ) : (
          <MiniHeroBanner
            variant="primary"
            title="Super visibilità con l'Annuncio Super Top!"
            button={{caption: 'Scopri di più', action: () => setModal(true)}}
            chip="New"
            spacingBottom
          />
        )}
        <MyRadioCard
          options={visibilityOptions}
          name="visibilityOption"
          spacingBottom
          initialValue={initialValue}
          disabled={!!visibilityExpiration}
        />
        {showTime && (
          <MySelect
            id="time-range-select"
            name="visibilityTime"
            placeholder="Scegli fascia oraria"
            validate={(value) => isRequired(value)}
            options={timeRangeOptions}
            label="Orario*"
            spacingBottom
            disabled={!!visibilityExpiration}
          />
        )}
      </Box>
      <MyModal isOpen={modal} onClose={() => setModal(false)}>
        Reference bakeka incontri - step visibilità
      </MyModal>
    </>
  );
};

export default VisibilityStep;

const ExpirationWrap = styled(Box)(({theme}) => ({
  display: 'flex',
  marginBottom: '25px',
  padding: '20px',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '20px',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: '10px 15px 15px',
  },
}));

const StyledRocketIcon = styled(RocketLaunchIcon)(({theme}) => ({
  width: '50px',
  height: '50px',
  marginRight: '15px',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    marginRight: '0px',
    marginBottom: '10px',
  },
}));
