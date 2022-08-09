import {Box, Grid, styled} from '@mui/material';
import {Body2, TitleH6} from '../../MyTypography';

type Props = {
  isLogged: boolean;
  showPayment: boolean;
};

const ConfirmStep = ({isLogged, showPayment}: Props) => {
  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH6 marginBottom="20px">Carica immagini</TitleH6>
      <Body2 marginBottom="20px">* Campi obbligatori</Body2>
    </Box>
  );
};

export default ConfirmStep;
