import {Box, FormControlLabel, Grid, Radio, styled} from '@mui/material';
import {Body1, TitleH5} from '../MyTypography';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

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
            <Box display="flex">
              <RocketLaunchIcon color="primary" />
              <TitleH5 gutterBottom marginLeft="10px">
                {option.title}
              </TitleH5>
            </Box>
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
            <TitleH5 sx={{textDecoration: 'line-through'}}>
              {option.price.original}
            </TitleH5>
          )}
          <TitleH5>{option.price.actual}</TitleH5>
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

const CardChip = styled(Body1)(({theme}) => ({
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
