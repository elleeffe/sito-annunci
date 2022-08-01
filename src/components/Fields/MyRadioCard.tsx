import {useMemo} from 'react';
import {useField} from 'react-final-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  Box,
} from '@mui/material';
import {muiErrorConverter} from '../../utils/fields';
import {Body1, Body2, Subtitle2, TitleH6} from '../MyTypography';

type Props = {
  label?: string;
  name: string;
  validate?: (value: string) => string;
  options: VisibilityOption[];
  spacingBottom?: boolean;
};

const MyRadioCard = ({
  label,
  name,
  validate,
  options,
  spacingBottom,
}: Props) => {
  const {input, meta} = useField(name, {validate, type: 'radio'});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  return (
    <FormControl
      error={error}
      sx={{width: '100%', marginBottom: spacingBottom ? '25px' : undefined}}
    >
      {label && <FormLabel>Gender</FormLabel>}
      <RadioGroup
        row
        {...input}
        sx={{width: '100%', justifyContent: 'space-between'}}
      >
        <Grid container columnSpacing={2} rowSpacing={2}>
          {options.map((option) => (
            <Grid
              item
              xs={12}
              md={option.important ? undefined : 6}
              key={option.value}
            >
              <GridCard>
                {option.chip && <CardChip>{option.chip}</CardChip>}
                <Grid container alignItems="flex-end">
                  <Grid xs={9}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={option.title}
                      sx={{
                        '& .MuiTypography-root': {
                          marginLeft: '10px',
                        },
                      }}
                    />
                    <Body1 gutterBottom>{option.subtitle}</Body1>
                  </Grid>
                  <Grid
                    xs={3}
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
              </GridCard>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MyRadioCard;

const GridCard = styled(Box)(({theme}) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '15px',
  padding: '5px 15px 25px',
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
