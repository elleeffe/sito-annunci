import {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {Box, Paper, styled} from '@mui/material';

import {useRouter} from 'next/router';
import {Login, PersonAddAlt1} from '@mui/icons-material';
import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components/Forms/RegisterForm';
import Layout from '../components/Layout';
import {useUser} from '../contexts/UserContext';
import {LoadingScreen} from '../components/Layout/AuthLoading';
import MyTabs from '../components/MyTabs';

const Auth: NextPage = () => {
  const [tab, setTab] = useState(0);

  const {user} = useUser();

  const router = useRouter();

  useEffect(() => {
    setTab(() => (router.query.tab === 'register' ? 1 : 0));
  }, [router.query]);

  useEffect(() => {
    if (user) {
      router.push('/profilo');
    }
  }, [user, router]);

  if (user) {
    return (
      <Layout hideHeader>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrap>
        <Box display="flex" justifyContent="center" width="100%">
          <StyledPaper>
            <MyTabs
              activeTab={tab}
              onChange={(newValue) => setTab(newValue)}
              tabs={[
                {
                  button: {
                    label: 'Accedi',
                    icon: <Login />,
                  },
                  children: <LoginForm />,
                },
                {
                  button: {
                    label: 'Crea account',
                    icon: <PersonAddAlt1 />,
                  },
                  children: <RegisterForm onSuccess={() => setTab(0)} />,
                },
              ]}
            />
          </StyledPaper>
        </Box>
      </Wrap>
    </Layout>
  );
};

export default Auth;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  minHeight: '100vh',
  background: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '100px',
  paddingBottom: '50px',
}));

const StyledPaper = styled(Paper)(() => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '500px',
  borderRadius: '4px',
}));
