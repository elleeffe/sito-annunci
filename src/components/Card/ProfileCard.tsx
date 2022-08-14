import {useState} from 'react';
import {useUser} from '../../contexts/UserContext';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import {Subtitle1} from '../MyTypography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MyModal from '../MyModal';
import ChangeEmailForm from '../Forms/ChangeEmailForm';
import ChangePhoneForm from '../Forms/ChangePhoneForm';
import ChangePasswordForm from '../Forms/ChangePasswordForm';
import DeleteAccountForm from '../Forms/DeleteAccountForm';

const ProfileCard = () => {
  const [action, setAction] = useState<
    'email' | 'phone' | 'password' | 'account'
  >();

  const {user, logout} = useUser();

  if (!user) {
    return (
      <UserWrap>
        <CircularProgress color="primary" size={50} />
      </UserWrap>
    );
  }

  return (
    <>
      <UserWrap>
        <UserInfo>
          <UserIcon color="primary" />
          <Subtitle1>{user.email}</Subtitle1>
          <Subtitle1>{user.phone}</Subtitle1>
        </UserInfo>
        <UserMenu>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setAction('email')}>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Modifica email" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setAction('phone')}>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Modifica telefono" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setAction('password')}>
              <ListItemIcon>
                <KeyIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Modifica password" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Disconnetti" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setAction('account')}>
              <ListItemIcon>
                <PersonRemoveIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Elimina account" />
            </ListItemButton>
          </ListItem>
        </UserMenu>
      </UserWrap>
      <MyModal isOpen={!!action} onClose={() => setAction(undefined)}>
        {action === 'email' && (
          <ChangeEmailForm onSuccess={() => setAction(undefined)} user={user} />
        )}
        {action === 'phone' && (
          <ChangePhoneForm onSuccess={() => setAction(undefined)} user={user} />
        )}
        {action === 'password' && (
          <ChangePasswordForm onSuccess={() => setAction(undefined)} />
        )}
        {action === 'account' && <DeleteAccountForm onSuccess={logout} />}
      </MyModal>
    </>
  );
};

export default ProfileCard;

const UserWrap = styled(Box)(({theme}) => ({
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'initial',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const UserInfo = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  padding: '20px',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    borderRight: `1px solid ${theme.palette.text.disabled}`,
  },

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'initial',
    borderRight: 'initial',
  },
}));

const UserIcon = styled(AccountCircleIcon)(() => ({
  width: '150px',
  height: '150px',
}));

const UserMenu = styled(List)(({theme}) => ({
  width: '100%',
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    marginBottom: '0px',
    padding: 0,
  },
}));
