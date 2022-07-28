import {Box, Grid} from '@mui/material';
import {categoryOptions, cityOptions} from '../../../utils/config';
import {
  emailValidator,
  isRequired,
  numberValidator,
  numberValueValidator,
} from '../../../utils/fields';
import MyAutocomplete from '../../Fields/MyAutocomplete';
import MyCustoMultipleSelect from '../../Fields/MyCustoMultipleSelect';
import MyMultipleSelect from '../../Fields/MyMultipleSelect';
import MyTextField from '../../Fields/MyTextField';
import {Body2, TitleH6} from '../../MyTypography';

const InformationStep = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TitleH6 marginBottom="20px">Informazioni annuncio</TitleH6>
      <Body2 marginBottom="20px">* Campi obbligatori</Body2>
      <Grid container columnSpacing={4} rowSpacing={4} marginBottom="50px">
        <Grid item xs={12}>
          <MyTextField
            name="title"
            placeholder="Dai un titolo accattivante al tuo annuncio"
            validate={isRequired}
            label="Titolo*"
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            name="content"
            multiline
            label="Contenuto*"
            rows={8}
            placeholder="Una questo spazio per descrivere te stesso, il tuo corpo, per parlare delle tue specialità, cosa ti piace..."
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <MyMultipleSelect
            id="category-select"
            name="category"
            placeholder="Scegli una categoria"
            validate={isRequired}
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
            validate={isRequired}
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
      <TitleH6 marginBottom="20px">Contatti annuncio</TitleH6>
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
        <Grid item xs={12}>
          <MyTextField
            name="phone"
            label="Telefono"
            placeholder="Inserisci numero di telefono"
            validate={(value) => numberValidator(value, false)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformationStep;
