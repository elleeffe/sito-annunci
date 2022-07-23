import React from 'react';

import 'tinymce/tinymce';
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default';
// A theme is also required
import 'tinymce/themes/silver';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/emoticons';

import 'tinymce/skins/ui/oxide/skin.min.css';

import {Editor as TinyEditor} from '@tinymce/tinymce-react';

import {Box, FormHelperText, styled} from '@mui/material';
import {useField, UseFieldConfig} from 'react-final-form';

type EditorProps = {
  disabled?: boolean;
  error?: string;
  onChange?: (html: string) => void;
  value?: string;
};

type EditorFieldProps = EditorProps &
  UseFieldConfig<string> & {
    name: string;
  };

const MyEditorField = ({name, ...rest}: EditorFieldProps) => {
  const {input, meta} = useField(name, {...rest});

  const error =
    (meta.touched && meta.error) ||
    (!meta.dirtySinceLastSubmit && meta.submitError);

  return (
    <Editor
      {...input}
      {...rest}
      value={input.value}
      onChange={input.onChange}
      error={error}
    />
  );
};

export default MyEditorField;

const Editor = ({onChange, value, error, ...rest}: EditorProps) => {
  return (
    <Wrap isError={!!error}>
      <TinyEditor
        {...rest}
        onEditorChange={onChange}
        value={value}
        init={{
          branding: false,
          height: 500,
          menubar: false,
          plugins: ['link paste lists'],
          skin: false,
          content_css: [],
          toolbar:
            'undo redo | formatselect | bold italic | bullist numlist | blockquote | link | emoticons',
          // TODO
          // content_style: StyledContentCss,
        }}
      />

      {error && (
        <FormHelperText sx={{color: 'error.main', margin: '0px 14px'}}>
          {error}
        </FormHelperText>
      )}
    </Wrap>
  );
};

// TODO
// export const StyledContentCss = `
//     body {
//       width: 100%;
//       font-family: ${theme.fonts.verdana};
//       color: ${theme.colors.dark};
//       box-sizing: border-box;
//       margin: 0;
//       padding: 8px;
//     }

//     h1 {
//       font-size: 32px;
//       line-height: 42px;
//       font-weight: 300;
//       margin-top: 0;
//       margin-bottom: 16px;
//     }

//     h2 {
//       font-size: 24px;
//       line-height: 34px;
//       font-weight: 700;
//       margin-top: 0;
//       margin-bottom: 16px;
//     }

//     h3 {
//       color: ${theme.colors.dark2};
//       margin-bottom: 16px;
//       font-size: 20px;
//       line-height: 30px;
//       font-weight: 700;
//       margin-top: 0;
//       margin-bottom: 16px;
//     }

//     h4 {
//       font-size: 20px;
//       line-height: 30px;
//       font-weight: 400;
//       margin-top: 0;
//       margin-bottom: 16px;
//     }

//     h5 {
//       font-size: 18px;
//       line-height: 26px;
//       font-weight: 400;
//       margin-top: 0;
//       margin-bottom: 16px;
//     }

//     p {
//       font-size: 14px;
//       line-height: 22px;
//       color: ${theme.colors.dark};
//       margin: 0;
//     }

//     blockquote {
//       margin: 0 0 20px 0;
//       position: relative;
//       padding: 16px;
//       background: #e8308908;
//     }

//     .link {
//       position: absolute;
//       right: 5px;
//       top: 5px;
//       text-transform: uppercase;
//       font-size: 12px;
//       color: ${theme.colors.violet};
//     }

//     ul {
//       list-style: disc;
//       padding-left: 24px;
//     }

//     @media ${theme.responsive.phone} {
//       h1 {
//         font-size: 26px;
//         line-height: 36px;
//       }
//     }
// `;

const Wrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isError',
})<{isError?: boolean}>(({theme, isError}) => ({
  position: 'relative',

  '& .tox-tinymce': {
    border: 'none',
    maxHeight: '250px',
    minHeight: '50px',

    '& .tox-editor-header': {
      border: `2 px solid ${theme.palette.primary.main}`,
      borderBottomWidth: '1px',
      borderRadius: '4px',

      '& *': {
        borderBottom: 'none !important',
      },
    },
    '& .tox-sidebar-wrap': {
      fontFamily: 'Rubik !important',
      borderWidth: '1px',
      borderStyle: 'solid',
      ...(!isError
        ? {borderColor: theme.palette.text.disabled}
        : {borderColor: theme.palette.error.main}),
      borderBottom: 'none',
      borderRadius: '0px',
      marginTop: '8px',
    },
    '& .tox-statusbar': {
      borderWidth: '1px',
      borderStyle: 'solid',
      ...(!isError
        ? {borderColor: theme.palette.text.disabled}
        : {borderColor: theme.palette.error.main}),
      borderTop: 'none',
      borderRadius: '0px',
      height: '20px',
    },
  },
}));
