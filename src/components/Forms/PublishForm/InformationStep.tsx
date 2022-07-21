import {Box, Grid} from '@mui/material';
import {isRequired} from '../../../utils/fields';
import MyAutocomplete from '../../Fields/MyAutocomplete';
import MyMultipleSelect from '../../Fields/MyMultipleSelect';
import MyTextField from '../../Fields/MyTextField';
import {Body2, TitleH6} from '../../MyTypography';

const InformationStep = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TitleH6 marginBottom="25px">Informazioni annuncio</TitleH6>
      <Body2 marginBottom="25px">* Campi obbligatori</Body2>
      <Grid container columnSpacing={3} rowSpacing={3} marginBottom="25px">
        <Grid item xs={12}>
          <MyMultipleSelect
            name="category"
            placeholder="Categorie*"
            validate={isRequired}
            options={[
              {
                value: 'categoria1',
                label: 'Categoria 1',
              },
              {
                value: 'categoria2',
                label: 'Categoria 2',
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyAutocomplete
            name="city"
            placeholder="Città"
            validate={isRequired}
            options={[
              {value: 'all', label: 'Tutte le città'},
              {value: 'roma', label: 'Roma'},
              {value: 'napoli', label: 'Napoli'},
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyTextField name="address" placeholder="Indirizzo" />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyTextField name="areas" placeholder="Zona / Quartiere" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformationStep;
