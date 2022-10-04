import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {NextPage} from 'next';
import BreadCrumb from '../components/BreadCrumb';
import Layout, {PageBody, PageIntro} from '../components/Layout';
import {TitleH1} from '../components/MyTypography';
import {useUser} from '../contexts/UserContext';
import {LoadingScreen} from '../components/Layout/AuthLoading';
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
    <Layout title="Profilo">
      <PageIntro>
        <TitleH1 isWhite>Profilo</TitleH1>
        <BreadCrumb paths={[{label: 'Profilo', path: '/profilo'}]} />
      </PageIntro>
      <PageBody>
        <ProfileCard />
        <UserAdsList />
      </PageBody>
    </Layout>
  );
};

export default Profile;
