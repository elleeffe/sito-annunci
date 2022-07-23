import {Box, Grid} from '@mui/material';
import {categoryOptions, cityOptions} from '../../../utils/config';
import {isRequired} from '../../../utils/fields';
import MyAutocomplete from '../../Fields/MyAutocomplete';
import MyCustoMultipleSelect from '../../Fields/MyCustoMultipleSelect';
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
            options={categoryOptions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyAutocomplete
            name="city"
            placeholder="Città"
            validate={isRequired}
            options={cityOptions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MyTextField name="address" placeholder="Indirizzo" />
        </Grid>
        <Grid item xs={12}>
          <MyCustoMultipleSelect
            name="areas"
            placeholder="Zone e quartieri vicino a te"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformationStep;
