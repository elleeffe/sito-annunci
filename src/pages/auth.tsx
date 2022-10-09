import {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {Box, Button, Container, Paper, styled} from '@mui/material';
import {TitleH6} from '../components/MyTypography';
import {useRouter} from 'next/router';
import {ArrowForward, Login, PersonAddAlt1} from '@mui/icons-material';
import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components/Forms/RegisterForm';
import Layout from '../components/Layout';
import {useUser} from '../contexts/UserContext';
import {LoadingScreen} from '../components/Layout/AuthLoading';
import MyTabs from '../components/MyTabs';

const Auth: NextPage = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [tab, setTab] = useState(0);

  const {user} = useUser();

  const router = useRouter();

  useEffect(() => {
    setTab(() => (router.query.tab === 'register' ? 1 : 0));
    const handleResize = () =>
      setMobile(window.matchMedia('(max-width: 600px)').matches);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    <Layout hideHeader>
      <Wrap>
        <Box
          display="flex"
          alignItems="space-between"
          sx={{
            background: '#fff',
            height: '70px',
            width: '100%',
            marginBottom: '25px',
          }}
        >
          <Container
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TitleH6>Logo</TitleH6>
            <Button
              endIcon={<ArrowForward />}
              size={mobile ? 'small' : 'medium'}
              sx={{transition: 'all 100ms linear'}}
              onClick={() => router.push('/')}
            >
              {router.query.tab ? 'Torna ' : 'Vai '} al sito
            </Button>
          </Container>
        </Box>
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
  height: '100vh',
  minHeight: '600px',
  background: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledPaper = styled(Paper)(() => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '500px',
  borderRadius: '10px',
}));
