import {Box, FormControlLabel, Grid, Radio, styled} from '@mui/material';
import {Body1, Body2, Subtitle1, Subtitle2, TitleH6} from '../MyTypography';

type Props = {
  option: VisibilityOption;
  isRadio?: boolean;
  value?: Visibility;
};

const VisibilityCard = ({option, isRadio, value}: Props) => {
  return (
    <Wrap isRadio={isRadio}>
      {option.chip && <CardChip>{option.chip}</CardChip>}
      <Grid container alignItems="flex-end">
        <Grid item xs={9}>
          {isRadio ? (
            <FormControlLabel
              value={option.value}
              control={<Radio checked={value === option.value} />}
              label={option.title}
              sx={{
                '& .MuiTypography-root': {
                  marginLeft: '10px',
                },
              }}
            />
          ) : (
            <Subtitle1 gutterBottom>{option.title}</Subtitle1>
          )}
          <Body1 gutterBottom>{option.subtitle}</Body1>
        </Grid>
        <Grid
          xs={3}
          item
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
        >
          {option.price.original && (
            <Subtitle2 sx={{textDecoration: 'line-through'}}>
              {option.price.original}
            </Subtitle2>
          )}
          <TitleH6 isSmall>{option.price.actual}</TitleH6>
        </Grid>
      </Grid>
    </Wrap>
  );
};

export default VisibilityCard;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isRadio',
})<{isRadio?: boolean}>(({theme, isRadio}) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '15px',
  ...(!isRadio
    ? {
        padding: '15px',
      }
    : {
        padding: '5px 15px 25px',
      }),
  position: 'relative',
}));

const CardChip = styled(Body2)(({theme}) => ({
  position: 'absolute',
  top: 0,
  right: '15px',
  padding: '3px 5px',
  fontSize: '10px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontWeight: '500',
  borderRadius: '5px',
  transform: 'translateY(-50%)',
  color: theme.palette.background.default,
  background: theme.palette.error.main,
}));
