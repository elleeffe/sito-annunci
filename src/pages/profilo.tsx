import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {NextPage} from 'next';
import BreadCrumb from '../components/BreadCrumb';
import Layout from '../components/Layout';
import PageIntro from '../components/Layout/PageIntro';
import {TitleH1} from '../components/MyTypography';
import {useUser} from '../context/UserContext';
import {LoadingScreen} from '../components/Layout/AuthLoading';

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
    </Layout>
  );
};

export default Profile;
