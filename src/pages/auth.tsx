import {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {Box, Button, Container, Paper, styled, Tab, Tabs} from '@mui/material';
import {TitleH6} from '../components/MyTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useRouter} from 'next/router';
import {Login, PersonAddAlt1} from '@mui/icons-material';
import AuthForm from '../components/LoginForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth: NextPage = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [tab, setTab] = useState(0);

  const router = useRouter();

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  useEffect(() => {
    const handleResize = () =>
      setMobile(window.matchMedia('(max-width: 600px)').matches);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrap>
      <Box
        display="flex"
        alignItems="space-between"
        sx={{background: '#fff', height: '70px', width: '100%'}}
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
            endIcon={<ArrowForwardIosIcon />}
            size={mobile ? 'small' : 'medium'}
            sx={{transition: 'all 100ms linear'}}
            onClick={() => router.push('/')}
          >
            Vai al sito
          </Button>
        </Container>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex={1}
        width="100%"
      >
        <StyledPaper>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
              <Tab
                label="Accedi"
                sx={{textTransform: 'initial'}}
                icon={
                  <Login
                    sx={{marginLeft: '10px', width: '20px', height: '20px'}}
                  />
                }
                iconPosition="end"
              />
              <Tab
                label="Crea account"
                sx={{textTransform: 'initial'}}
                icon={
                  <PersonAddAlt1
                    sx={{marginLeft: '10px', width: '20px', height: '20px'}}
                  />
                }
                iconPosition="end"
              />
            </Tabs>
          </Box>
          {tab === 0 && (
            <TabPanel>
              <TitleH6 isSmall sx={{marginBottom: '25px'}}>
                Accedi al tuo account
              </TitleH6>
              <LoginForm />
            </TabPanel>
          )}
          {tab === 1 && (
            <TabPanel>
              <TitleH6 isSmall sx={{marginBottom: '25px'}}>
                Crea il tuo account
              </TitleH6>
              <RegisterForm />
            </TabPanel>
          )}
        </StyledPaper>
      </Box>
    </Wrap>
  );
};

export default Auth;

const Wrap = styled(Box)(({theme}) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.palette.primary.main,
}));

const StyledPaper = styled(Paper)(({theme}) => ({
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.08)',
  width: '95%',
  maxWidth: '500px',
  borderRadius: '10px',
}));

const TabPanel = styled(Box)(({theme}) => ({
  padding: '25px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  minHeight: '450px',
}));
