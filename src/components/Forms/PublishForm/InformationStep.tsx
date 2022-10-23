import {useState} from 'react';
import {Box, Grid, styled} from '@mui/material';
import {categoryOptions, cityOptions} from '../../../utils/config';
import {
  emailValidator,
  isRequired,
  numberValueValidator,
} from '../../../utils/fields';
import MyAutocomplete from '../../Fields/MyAutocomplete';
import MyCustomMultipleSelect from '../../Fields/MyCustomMultipleSelect';
import MySelect from '../../Fields/MySelect';
import MySwitch from '../../Fields/MySwitch';
import MyTextField from '../../Fields/MyTextField';
import {Body1, StyledButton, TitleH5} from '../../MyTypography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MyModal from '../../MyModal';

type Props = {
  hideConsens: boolean;
  user?: User;
};

const InformationStep = ({hideConsens, user}: Props) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH5 marginBottom="20px">Informazioni annuncio</TitleH5>
      <Body1 marginBottom="20px">* Campi obbligatori</Body1>
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
            name="description"
            multiline
            label="Descrizione*"
            rows={8}
            placeholder="Usa questo spazio per descrivere te stesso, il tuo corpo, per parlare delle tue specialità, cosa ti piace..."
            validate={(value) => isRequired(value)}
            sx={{'& .MuiInputBase-root': {borderRadius: '10px !important'}}}
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
        <Grid item xs={12} sm={3}>
          <MyTextField
            name="age"
            label="Eta*"
            placeholder="La tua età"
            validate={(value) => numberValueValidator(value, true, 18)}
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
            name="neighborhood"
            label="Quartiere"
            placeholder="Inserisci il tuo quartiere"
          />
        </Grid>
        <Grid item xs={12}>
          <MyCustomMultipleSelect
            name="areas"
            label="Aree vicine"
            placeholder="Zone e quartieri vicino a te"
          />
        </Grid>
      </Grid>
      <TitleH5 marginBottom="20px">Dati{!hideConsens && ' e consensi'}</TitleH5>
      <Body1 marginBottom="20px">* Campi obbligatori</Body1>
      <Grid container columnSpacing={4} rowSpacing={4} marginBottom="25px">
        <Grid item xs={12}>
          <MyTextField
            name="email"
            label="Email*"
            placeholder="Inserisci la tua email*"
            validate={emailValidator}
            InputProps={{
              readOnly: !!user,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <MyTextField
            name="phone"
            label="Telefono*"
            placeholder="Inserisci numero di telefono"
            validate={(value) =>
              numberValueValidator(value, true, undefined, 10)
            }
          />
        </Grid>
        <Grid item xs={3} display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <MySwitch name="whatsapp" label="Whatsapp" />
            <HelpOutlineIcon
              color="primary"
              sx={{
                cursor: 'pointer',
                marginLeft: '5px',
                opacity: 0.7,
                '&:hover': {opacity: 1},
              }}
              onClick={() => setModal(true)}
            />
          </Box>
        </Grid>
      </Grid>
      {!hideConsens && (
        <>
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
              <Body1>
                Ho letto{' '}
                <StyledButton isSmall type="button">
                  Termini e condizioni d’uso
                </StyledButton>{' '}
                e{' '}
                <StyledButton isSmall type="button">
                  Informativa sulla privacy
                </StyledButton>{' '}
                e autorizzo il trattamento dei miei dati personali per la
                fornitura di questo servizio web.
              </Body1>
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
              <Body1>
                Autorizzo l'elaborazione dei miei dati personali appartenenti a
                Categorie speciali &#40;es. stile di vita e comportamento
                sessuale&#41; al fine di pubblicare un annuncio su questo sito
                web &#40;
                <StyledButton isSmall type="button">
                  Normativa sulla privacy
                </StyledButton>
                &#41;. Se l'autorizzazione non viene data, assicurati che il tuo
                annuncio non contenga alcun dato personale appartenente a
                Categorie speciali.
              </Body1>
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
              <Body1>
                Autorizzo la Società al trattamento dei miei dati di contatto
                per finalità di marketing e comunicazione pubblicitaria &#40;
                <StyledButton isSmall type="button">
                  Informativa sulla privacy
                </StyledButton>
                &#41;.
              </Body1>
            </Grid>
          </Grid>
          <Body1 marginTop="30px" sx={{color: 'text.disabled'}}>
            Gli ultimi due permessi sono <b>facoltativi</b>, per maggiori
            informazioni o per revocare il consenso alla Società, vi invitiamo a
            consultare l’informativa sul{' '}
            <StyledButton isSmall type="button">
              trattamento dei dati personali
            </StyledButton>
            . La revoca del consenso non influirà sulla legalità di qualsiasi
            attività di trattamento da noi effettuata prima del ritiro di tale
            consenso.
          </Body1>
        </>
      )}
      <MyModal isOpen={modal} onClose={() => setModal(false)} title="Whatsapp">
        Aggiungere screen di annuncio con tasto whatsapp + spiegazione
      </MyModal>
    </Box>
  );
};

export default InformationStep;

const StyledGrid = styled(Grid)(({theme}) => ({
  paddingTop: '30px',
  marginBottom: '30px',
  borderTopColor: theme.palette.text.disabled,
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
}));
