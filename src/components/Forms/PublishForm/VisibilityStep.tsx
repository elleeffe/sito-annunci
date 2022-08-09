import {useState} from 'react';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  styled,
  useMediaQuery,
} from '@mui/material';
import {timeRangeOptions, visibilityOptions} from '../../../utils/config';
import {isRequired} from '../../../utils/fields';
import MyRadioCard from '../../Fields/MyRadioCard';
import MySelect from '../../Fields/MySelect';
import MiniHeroBanner from '../../Hero/MiniHeroBanner';
import {TitleH6} from '../../MyTypography';
import {Close} from '@mui/icons-material';

type Props = {
  showTime: boolean;
  initialValue?: Visibility;
};

const VisibilityStep = ({showTime, initialValue}: Props) => {
  const [modal, setModal] = useState<boolean>(false);

  const match = useMediaQuery('(max-width:600px)');

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
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <ModalInner>
          <CloseButton
            onClick={() => setModal(false)}
            color="primary"
            size={match ? 'small' : 'medium'}
          >
            <Close />
          </CloseButton>
        </ModalInner>
      </Modal>
    </>
  );
};

export default VisibilityStep;

const ModalInner = styled(Paper)(({theme}) => ({
  width: '90vw',
  height: '95vh',
  maxWidth: '700px',
  maxHeight: '630px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  padding: '25px',
  overflow: 'auto',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));

const CloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '20px',
  left: '20px',

  [theme.breakpoints.down('md')]: {
    top: '15px',
    left: '15px',
  },
}));
