import {useState} from 'react';
import {Box} from '@mui/material';
import {timeRangeOptions, visibilityOptions} from '../../../utils/config';
import {isRequired} from '../../../utils/fields';
import MyRadioCard from '../../Fields/MyRadioCard';
import MySelect from '../../Fields/MySelect';
import MiniHeroBanner from '../../Hero/MiniHeroBanner';
import {TitleH6} from '../../MyTypography';
import MyModal from '../../MyModal';

type Props = {
  showTime: boolean;
  initialValue?: Visibility;
};

const VisibilityStep = ({showTime, initialValue}: Props) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Box display="flex" flexDirection="column" marginBottom="30px">
        <TitleH6 marginBottom="20px">
          Più visibilità per il tuo annuncio
        </TitleH6>
        <MiniHeroBanner
          variant="primary"
          title="Super visibilità con l'Annuncio Super Top!"
          button={{caption: 'Scopri di più', action: () => setModal(true)}}
          chip="New"
          spacingBottom
        />
        <MyRadioCard
          options={visibilityOptions}
          name="visibilityOption"
          spacingBottom
          initialValue={initialValue}
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
