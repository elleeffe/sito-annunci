import {useCallback, useMemo, useState} from 'react';
import {
  IconButton,
  TextField,
  TextFieldProps,
  Box,
  styled,
  Paper,
  Chip,
} from '@mui/material';
import * as icons from '@mui/icons-material';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import {BlobOptions} from 'buffer';
import {Body1} from '../MyTypography';

type Props = TextFieldProps & {
  name: string;
  validate?: (value: string) => string;
  icon?: keyof typeof icons;
  spacingBottom?: boolean;
  instructions?: boolean;
  disabled?: BlobOptions;
};

const MyCustoMultipleSelect = ({
  name,
  validate,
  icon,
  spacingBottom,
  instructions,
  disabled,
  ...props
}: Props) => {
  const [textValue, setTextValue] = useState<string>('');
  const [areas, setAreas] = useState<string[]>([]);
  const {input, meta} = useField(name, {validate});

  const iconStart = useMemo(() => {
    if (icon) {
      const Icon = icons[icon];
      return <Icon color={props.color || 'primary'} />;
    }
    return undefined;
  }, [icon, props.color]);

  const addIconColor = useMemo(() => {
    if (!textValue) {
      return 'disabled';
    }
    return props.color || 'primary';
  }, [textValue, props.color]);

  const handleArea = useCallback(() => {
    const newValue = [...areas, textValue];
    input.onChange(newValue);
    setAreas(newValue);
    setTextValue('');
  }, [input, textValue, areas]);

  const removeArea = useCallback(
    (value: string) => {
      const newValue = areas.filter((el) => el !== value);
      input.onChange(newValue);
      setAreas(newValue);
    },
    [input, areas]
  );

  return (
    <Box sx={{marginBottom: spacingBottom ? '25px' : undefined}}>
      <Box width="100%" position="relative">
        <TextField
          {...props}
          {...muiErrorConverter(meta)}
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
          disabled={disabled}
          InputProps={{
            startAdornment: iconStart,
          }}
          sx={{
            marginBottom: '15px',
            '& .MuiInputBase-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <IconButton
          size="medium"
          sx={{position: 'absolute', top: 0, right: 0}}
          disabled={!textValue}
          onClick={handleArea}
        >
          <icons.Add color={addIconColor} />
        </IconButton>
      </Box>
      <StyledPaper
        isEmpty={!areas.length}
        sx={{
          '&:hover': {
            borderColor: `${props.color || 'primary'}.main`,
          },
        }}
      >
        {!!areas.length ? (
          areas.map((area) => (
            <Chip
              key={area}
              label={area}
              sx={{marginBottom: '8px', marginRight: '9px'}}
              onDelete={() => removeArea(area)}
            />
          ))
        ) : (
          <Body1 sx={{color: 'text.disabled', fontWeight: '400'}} isPoppins>
            Aree selezionate
          </Body1>
        )}
      </StyledPaper>
    </Box>
  );
};

export default MyCustoMultipleSelect;

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isEmpty',
})<{isEmpty: boolean}>(({theme, isEmpty}) => ({
  boxShadow: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#BDBDBD',
  padding: '9px 0px 0px 9px',
  borderRadius: '28px',
  cursor: 'default',
  ...(isEmpty && {
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 21px',
  }),
}));
