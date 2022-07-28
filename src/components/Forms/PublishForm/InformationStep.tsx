import {Box, Grid, styled} from '@mui/material';
import {categoryOptions, cityOptions} from '../../../utils/config';
import {
  emailValidator,
  isRequired,
  numberValidator,
  numberValueValidator,
} from '../../../utils/fields';
import MyAutocomplete from '../../Fields/MyAutocomplete';
import MyCustoMultipleSelect from '../../Fields/MyCustoMultipleSelect';
import MySelect from '../../Fields/MySelect';
import MySwitch from '../../Fields/MySwitch';
import MyTextField from '../../Fields/MyTextField';
import {Body1, Body2, TitleH6} from '../../MyTypography';

const InformationStep = () => {
  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH6 marginBottom="20px">Informazioni annuncio</TitleH6>
      <Body2 marginBottom="20px">* Campi obbligatori</Body2>
      <Grid container columnSpacing={4} rowSpacing={4} marginBottom="50px">
        <Grid item xs={12}>
          <MyTextField
            name="title"
            placeholder="Dai un titolo accattivante al tuo annuncio"
            label="Titolo*"
            validate={(value) => isRequired(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            name="content"
            multiline
            label="Contenuto*"
            rows={8}
            placeholder="Una questo spazio per descrivere te stesso, il tuo corpo, per parlare delle tue specialità, cosa ti piace..."
            validate={(value) => isRequired(value)}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <MySelect
            id="category-select"
            name="category"
            placeholder="Scegli una categoria"
            validate={(value) => isRequired(value)}
            options={categoryOptions}
            label="Categoria*"
          />
        </Grid>
        <Grid item xs={3}>
          <MyTextField
            name="age"
            label="Eta*"
            placeholder="La tua età"
            validate={(value) => numberValueValidator(18, value, true)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyAutocomplete
            name="city"
            label="Città*"
            placeholder="Scegli una città"
            validate={(value) => isRequired(value)}
            options={cityOptions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyTextField
            name="address"
            label="Indirizzo"
            placeholder="Inserisci indirizzo"
          />
        </Grid>
        <Grid item xs={12}>
          <MyCustoMultipleSelect
            name="areas"
            label="Aree vicine"
            placeholder="Zone e quartieri vicino a te"
          />
        </Grid>
      </Grid>
      <TitleH6 marginBottom="20px">Dati e consensi</TitleH6>
      <Body2 marginBottom="20px">* Campi obbligatori</Body2>
      <Grid container columnSpacing={4} rowSpacing={4} marginBottom="25px">
        <Grid item xs={12}>
          <MyTextField
            name="email"
            label="Email*"
            placeholder="Inserisci la tua email*"
            validate={emailValidator}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <MyTextField
            name="phone"
            label="Telefono"
            placeholder="Inserisci numero di telefono"
            validate={(value) => numberValidator(value, false)}
          />
        </Grid>
        <Grid item xs={3} display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <MySwitch name="whatsapp" label="Whatsapp" />
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={12} marginBottom="30px">
        <Grid item xs={12} sm>
          <MySwitch
            name="privacyConsens"
            validate={(value) => isRequired(value, 'Concedi')}
          />
        </Grid>
        <Grid item xs={12} sm={11}>
          <Body1 marginTop="8px" gutterBottom>
            <b>Termini, condizioni e informativa sulla privacy*</b>
          </Body1>
          <Body2>
            Ho letto{' '}
            <StyledButton type="button">
              Termini e condizioni d’uso
            </StyledButton>{' '}
            e{' '}
            <StyledButton type="button">Informativa sulla privacy</StyledButton>{' '}
            e autorizzo il trattamento dei miei dati personali per la fornitura
            di questo servizio web.
          </Body2>
        </Grid>
      </Grid>
      <StyledGrid container item xs={12}>
        <Grid item xs={12} sm>
          <MySwitch name="specialData" />
        </Grid>
        <Grid item xs={12} sm={11}>
          <Body1 marginTop="8px" gutterBottom>
            <b>Categorie speciali di dati personali</b>
          </Body1>
          <Body2>
            Autorizzo l'elaborazione dei miei dati personali appartenenti a
            Categorie speciali &#40;es. stile di vita e comportamento
            sessuale&#41; al fine di pubblicare un annuncio sul Sito web &#40;
            <StyledButton type="button">Normativa sulla privacy</StyledButton>
            &#41;. Se l'autorizzazione non viene data, assicurati che il tuo
            annuncio non contenga alcun dato personale appartenente a Categorie
            speciali.
          </Body2>
        </Grid>
      </StyledGrid>
      <Grid container item xs={12}>
        <Grid item xs={12} sm>
          <MySwitch name="marketing" />
        </Grid>
        <Grid item xs={12} sm={11}>
          <Body1 marginTop="8px" gutterBottom>
            <b>Comunicazioni Marketing</b>
          </Body1>
          <Body2>
            Autorizzo la Società al trattamento dei miei dati di contatto per
            finalità di marketing e comunicazione pubblicitaria &#40;
            <StyledButton type="button">Informativa sulla privacy</StyledButton>
            &#41;.
          </Body2>
        </Grid>
      </Grid>
      <Body2 marginTop="30px" sx={{color: 'text.disabled'}}>
        Gli ultimi due permessi sono <b>facoltativi</b>, per maggiori
        informazioni o per revocare il consenso alla Società, vi invitiamo a
        consultare l’informativa sul
        <StyledButton type="button">
          trattamento dei dati personali
        </StyledButton>
        . La revoca del consenso non influirà sulla legalità di qualsiasi
        attività di trattamento da noi effettuata prima del ritiro di tale
        consenso.
      </Body2>
    </Box>
  );
};

export default InformationStep;

const StyledGrid = styled(Grid)(({theme}) => ({
  paddingTop: '30px',
  marginBottom: '30px',
  borderTopColor: 'text.disabled',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
}));

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
