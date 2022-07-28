import {Box, Grid, styled} from '@mui/material';
import {Body2, TitleH6} from '../../MyTypography';

const VisibilityStep = () => {
  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH6 marginBottom="20px">Carica immagini</TitleH6>
      <Body2 marginBottom="20px">* Campi obbligatori</Body2>
    </Box>
  );
};

export default VisibilityStep;
