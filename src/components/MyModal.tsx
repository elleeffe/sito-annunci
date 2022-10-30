import {PropsWithChildren} from 'react';
import {Box, IconButton, Modal, Paper, styled, Tooltip} from '@mui/material';
import {Close} from '@mui/icons-material';
import {TitleH4, TitleH5} from './MyTypography';
import useResponsive from '../hooks/useResponsive';

type Props = PropsWithChildren<{
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  size?: 'small' | 'normal' | 'large';
  className?: string;
  noInnerSpacing?: boolean;
}>;

const MyModal = ({
  children,
  onClose,
  isOpen,
  title,
  size = 'normal',
  className,
  noInnerSpacing,
}: Props) => {
  const {isMd} = useResponsive();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      className={className}
    >
      <ModalInner size={size}>
        <Heading>
          {isMd ? <TitleH5>{title}</TitleH5> : <TitleH4>{title}</TitleH4>}
          {!!onClose && (
            <Tooltip title="Chiudi">
              <IconButton
                onClick={onClose}
                color="error"
                size={isMd ? 'small' : 'medium'}
              >
                <Close />
              </IconButton>
            </Tooltip>
          )}
        </Heading>
        <Body noSpacing={noInnerSpacing}>{children}</Body>
      </ModalInner>
    </Modal>
  );
};

export default MyModal;

const ModalInner = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{size?: 'small' | 'normal' | 'large'}>(({theme, size}) => ({
  width: '95vw',
  ...(size !== 'small' ? {height: '90vh'} : {height: 'auto'}),
  ...(size === 'large'
    ? {maxWidth: '900px'}
    : size === 'normal'
    ? {maxWidth: '700px'}
    : {maxWidth: '500px'}),
  maxHeight: '630px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  position: 'relative',
}));

const Heading = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#f6f6f6',
  padding: '15px 25px',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));

const Body = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'noSpacing',
})<{noSpacing?: boolean}>(({theme, noSpacing}) => ({
  ...(!noSpacing && {padding: '25px', overflow: 'auto'}),
  width: '100%',
  flex: 1,

  [theme.breakpoints.down('md')]: {
    ...(!noSpacing && {padding: '15px'}),
  },
}));
