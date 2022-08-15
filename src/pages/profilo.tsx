import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {NextPage} from 'next';
import BreadCrumb from '../components/BreadCrumb';
import Layout from '../components/Layout';
import PageIntro from '../components/Layout/PageIntro';
import {TitleH1} from '../components/MyTypography';
import {useUser} from '../contexts/UserContext';
import {LoadingScreen} from '../components/Layout/AuthLoading';
import {Box, Container, styled} from '@mui/material';
import ProfileCard from '../components/Profile/ProfileCard';
import UserAdsList from '../components/Profile/UserAdsList';

const Profile: NextPage = () => {
  const {user} = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [router, user]);

  if (!user) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <PageIntro>
        <TitleH1 isWhite>Profilo</TitleH1>
        <BreadCrumb paths={[{label: 'Profilo', path: '/profilo'}]} />
      </PageIntro>
      <Container>
        <Wrap>
          <ProfileCard />
          <UserAdsList />
        </Wrap>
      </Container>
    </Layout>
  );
};

export default Profile;

const Wrap = styled(Box)(({theme}) => ({
  height: '80vh',
  minHeight: '600px',
  marginTop: '100px',
  display: 'flex',
  flexWrap: 'wrap',

  [theme.breakpoints.down('md')]: {
    height: 'auto',
    minHeight: 'initial',
    marginTop: '50px',
  },
}));
