import React, {useCallback, useMemo, useState} from 'react';
import {
  FormControl,
  Box,
  FormHelperText,
  ButtonProps,
  styled,
  Grid,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {FileUploader} from 'react-drag-drop-files';
import {useField} from 'react-final-form';
import {muiErrorConverter} from '../../utils/fields';
import {Body2} from '../MyTypography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const fileTypes = ['JPG', 'PNG', 'JPEG'];

type Props = {
  name: string;
  validate?: (value: {name: string; base64: string}[]) => string;
  spacingBottom?: boolean;
  maxSize?: number;
  label: string;
  disabled?: boolean;
  color?: ButtonProps['color'];
};

const toBase64 = (file: File): Promise<any> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MyUploadField = ({
  name,
  validate,
  spacingBottom,
  color = 'primary',
  ...props
}: Props) => {
  const {input, meta} = useField(name, {validate});

  const [files, setFiles] = useState<{name: string; base64: string}[]>(
    () => input.value || []
  );

  const [loading, setLoading] = useState<boolean>(false);

  const {error, helperText} = useMemo(() => muiErrorConverter(meta), [meta]);

  const handleChange = useCallback(
    async (file: File) => {
      input.onFocus();
      setLoading(true);
      const newFile = await toBase64(file);
      const newFiles = [...files, {name: file.name, base64: newFile}];
      input.onChange(newFiles);
      setFiles(newFiles);
      setLoading(false);
      input.onBlur();
    },
    [input, files]
  );

  const handleRemove = useCallback(
    (name: string) => {
      const newFiles = files.filter((el) => el.name !== name);
      input.onChange(!!newFiles.length ? newFiles : undefined);
      setFiles(newFiles);
    },
    [input, files]
  );

  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <StyledGrid item xs={12} sm={6}>
        <FormControl
          error={error}
          fullWidth
          sx={{
            marginBottom: spacingBottom ? '25px' : undefined,
            height: '100%',
            label: {
              height: '100%',
              '&.is-disabled': {
                border: 'unset',
              },
            },
          }}
        >
          <FileUploader
            handleChange={handleChange}
            name={name}
            types={fileTypes}
            {...props}
            hoverTitle="Rilascia file"
          >
            <Placeholder
              sx={{
                borderColor: error ? 'error.main' : `${color}.main`,
              }}
            >
              <FileUploadIcon
                sx={{width: '40px', height: '40px', marginRight: '5px'}}
                color={error ? 'error' : color}
              />
              <Body2>{props.label}</Body2>
            </Placeholder>
          </FileUploader>
          {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </StyledGrid>
      {files.map((el, i) => (
        <StyledGrid item xs={12} sm={6} key={el.name + i}>
          <ImageBox>
            <DeleteButton size="small" onClick={() => handleRemove(el.name)}>
              <DeleteIcon />
            </DeleteButton>
            <img src={el.base64} alt={el.name} />
          </ImageBox>
        </StyledGrid>
      ))}
      {loading && (
        <LoadingBox item xs={12} sm={6}>
          <CircularProgress />
        </LoadingBox>
      )}
    </Grid>
  );
};

export default MyUploadField;

const Placeholder = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderStyle: 'dashed',
  borderWidth: '2px',
  borderRadius: '15px',
  padding: '20px',
  textAlign: 'center',
}));

const ImageBox = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderRadius: '15px',
  borderColor: theme.palette.primary.main,
  position: 'relative',
  width: '100%',
  height: '100%',
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const DeleteButton = styled(IconButton)(({theme}) => ({
  color: theme.palette.error.main,
  position: 'absolute',
  top: '10px',
  right: '10px',
}));

const StyledGrid = styled(Grid)(() => ({
  height: '30vh',
  maxHeight: '400px',
  minHeight: '300px',
}));

const LoadingBox = styled(Grid)(() => ({
  height: '30vh',
  maxHeight: '400px',
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
