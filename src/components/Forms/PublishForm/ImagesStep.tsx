import {Box, Grid, styled} from '@mui/material';
import {imageValidator, isRequired} from '../../../utils/fields';
import MySwitch from '../../Fields/MySwitch';
import MyUploadField from '../../Fields/MyUploadField';
import {Body2, TitleH6} from '../../MyTypography';

type Props = {
  disabledCover: boolean;
  disabledImages: boolean;
  hideConsens: boolean;
};

const ImagesStep = ({disabledCover, disabledImages, hideConsens}: Props) => {
  return (
    <Box display="flex" flexDirection="column" marginBottom="30px">
      <TitleH6 marginBottom="15px">Copertina annuncio</TitleH6>
      <Body2 marginBottom="20px">
        Questa immagine sarà visibile dagli utenti senza aver bisogno di aprire
        l'annuncio
      </Body2>
      <MyUploadField
        name="cover"
        label="Trascina qui l'immagine o clicca per selezionarla"
        disabled={disabledCover}
        validate={(value) => imageValidator(value)}
      />
      <TitleH6 marginBottom="15px" marginTop="50px">
        Altre immagini
      </TitleH6>
      <Body2 marginBottom="20px">
        Puoi caricare fino a <b>5</b> immagini. Saranno visibili dagli utenti
        solamente all'interno dell'annuncio
      </Body2>
      <MyUploadField
        name="images"
        label="Trascina qui l'immagine o clicca per selezionarla"
        disabled={disabledImages}
      />
      {!hideConsens && (
        <Grid container item xs={12} marginTop="50px">
          <Grid item xs={12} sm>
            <MySwitch
              name="imageConsens"
              validate={(value) => isRequired(value, 'Concedi')}
            />
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
      )}
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
