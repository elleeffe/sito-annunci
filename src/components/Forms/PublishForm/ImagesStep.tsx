import {Box, Grid, styled} from '@mui/material';
import MySwitch from '../../Fields/MySwitch';
import MyUploadField from '../../Fields/MyUploadField';
import {Body1, Body2, TitleH6} from '../../MyTypography';

const ImagesStep = () => {
  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH6 marginBottom="20px">Carica immagini</TitleH6>
      <MyUploadField
        name="images"
        label="Trascina qui l'immagine o clicca per selezionarle"
        multiple={6}
      />
      <Grid container item xs={12} marginTop="30px">
        <Grid item xs={12} sm>
          <MySwitch name="imageConsens" />
        </Grid>
        <Grid item xs={12} sm={11}>
          <Body2 marginTop="8px">
            Autorizzo il trattamento delle mie foto da parte della Società al
            fine di pubblicare un annuncio su questo sito web &#40;
            <StyledButton type="button">Normativa sulla privacy</StyledButton>
            &#41;.
          </Body2>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImagesStep;

const StyledButton = styled('button')(({theme}) => ({
  color: theme.palette.warning.main,
  border: 'unset',
  background: 'transparent',
  cursor: 'pointer',
  padding: 0,
  '&:hover': {
    textDecoration: 'underline',
  },
}));
