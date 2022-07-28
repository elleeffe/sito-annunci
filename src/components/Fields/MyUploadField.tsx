import React, {useCallback, useMemo, useState} from 'react';
import {
  FormControl,
  Box,
  FormHelperText,
  ButtonProps,
  styled,
  Grid,
} from '@mui/material';
import {FileUploader} from 'react-drag-drop-files';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import {Body1, Body2} from '../MyTypography';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const fileTypes = ['JPG', 'PNG', 'JPEG'];

type Props = {
  name: string;
  validate?: (value: string) => string;
  spacingBottom?: boolean;
  maxSize?: number;
  multiple?: number;
  label: string;
  disabled?: boolean;
  color?: ButtonProps['color'];
};

const MyUploadField = ({
  name,
  validate,
  spacingBottom,
  color = 'primary',
  multiple,
  ...props
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const {input, meta} = useField(name, {validate});

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const handleChange = useCallback(
    (files: any) => {
      setFiles(Object.values(files));
      input.onChange(Object.values(files));
    },
    [input]
  );

  const handleRemove = useCallback(
    (name: string) => {
      const newFiles = files.filter((el) => el.name !== name);
      setFiles(newFiles);
      input.onChange(newFiles);
    },
    [input, files]
  );

  return (
    <>
      <FormControl
        error={error}
        fullWidth
        sx={spacingBottom ? {marginBottom: '25px'} : undefined}
      >
        <FileUploader
          handleChange={handleChange}
          name={name}
          types={fileTypes}
          {...props}
          multiple={!!multiple && multiple > 1}
          hoverTitle="Rilascia"
        >
          <Placeholder
            sx={{
              borderColor: error ? 'error.main' : `${color}.main`,
            }}
          >
            {!!multiple && multiple > 1 && (
              <Body1>Puoi caricare fino a {multiple} immagini</Body1>
            )}
            <FileUploadIcon
              sx={{width: '40px', height: '40px', marginRight: '5px'}}
              color={error ? 'error' : color}
            />
            <Body2>{props.label}</Body2>
          </Placeholder>
        </FileUploader>
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
      <Grid container marginTop="30px">
        {files.map((el) => (
          <Grid item sm={6} md={4}></Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyUploadField;

const Placeholder = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderStyle: 'dashed',
  borderWidth: '2px',
  borderRadius: '25px',
  padding: '20px',
  textAlign: 'center',
}));
