import {Box} from '@mui/material';
import {timeRangeOptions, visibilityOptions} from '../../../utils/config';
import {isRequired} from '../../../utils/fields';
import MyRadioCard from '../../Fields/MyRadioCard';
import MySelect from '../../Fields/MySelect';
import MiniHeroBanner from '../../MiniHeroBanner';
import {TitleH6} from '../../MyTypography';

type Props = {
  showTime: boolean;
};

const VisibilityStep = ({showTime}: Props) => {
  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH6 marginBottom="20px">Più visibilità per il tuo annuncio</TitleH6>
      <MiniHeroBanner
        variant="primary"
        title="Super visibilità con l'Annuncio Super Top!"
        button={{caption: 'Scopri di più', action: () => {}}}
        chip="New"
        spacingBottom
      />
      <MyRadioCard
        options={visibilityOptions}
        name="visibilityOption"
        spacingBottom
      />
      {showTime && (
        <MySelect
          id="time-range-select"
          name="visibilityTime"
          placeholder="Scegli orario"
          validate={(value) => isRequired(value)}
          options={timeRangeOptions}
          label="Orario*"
          spacingBottom
        />
      )}
    </Box>
  );
};

export default VisibilityStep;
