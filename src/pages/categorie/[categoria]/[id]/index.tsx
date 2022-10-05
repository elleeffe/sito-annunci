import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import BreadCrumb from '../../../../components/BreadCrumb';
import Layout, {
  PageBody,
  PageInner,
  PageIntro,
} from '../../../../components/Layout';
import {LoadingScreen} from '../../../../components/Layout/AuthLoading';
import {Body1, TitleH1, TitleH3} from '../../../../components/MyTypography';
import {categoryOptions} from '../../../../utils/config';
import {sleep} from '../../../../utils/utils';
import {mockAds} from '../../../../utils/mocks';
import AdsGallery from '../../../../components/AdsDetail/AdsGallery';
import CommentsModal from '../../../../components/AdsDetail/CommentsModal';

import AdsAside from '../../../../components/AdsDetail/AdsAside';

const Detail: NextPage = () => {
  const [detail, setDetail] = useState<Ads | null>();
  const [showComments, setShowComments] = useState<boolean>(false);

  const router = useRouter();

  const category = useMemo(
    () => categoryOptions.find((el) => el.value === router.query.categoria),
    [router]
  );

  useEffect(() => {
    if (!category || !router.query.id) {
      router.push('/categorie');
    }
    if (detail === null) {
      router.push('/404');
    }
  }, [router, category, detail]);

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.post('/api/dettaglio-annuncio', {id: router.query.id});
        // setDetail(response.data)
        await sleep(1000);
        setDetail(mockAds);
      } catch (e: any) {
        console.log(e);
        setDetail(null);
      }
    })();
  });

  if (!category || !router.query.id || !detail) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout title={detail.title}>
      <PageIntro>
        <TitleH1 isWhite isEllipsis>
          {detail.title}
        </TitleH1>
        <BreadCrumb
          paths={[
            {label: 'Categorie', path: '/categorie'},
            {
              label: category.label,
              path: `/categorie/${router.query.categoria}`,
            },
            {
              label: detail.title,
              path: `/categorie/${router.query.categoria}/${detail.id}`,
            },
          ]}
        />
      </PageIntro>
      <PageBody>
        <PageInner spacingHorizontal="right" spacingVertical="bottom">
          <AdsGallery cover={detail.cover[0]} images={detail.images} />
          <TitleH3 marginBottom="15px">{detail.title}</TitleH3>
          <Body1>{detail.description}</Body1>
        </PageInner>
        <AdsAside
          detail={detail}
          onOpenComments={() => setShowComments(true)}
        />
      </PageBody>
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </Layout>
  );
};

export default Detail;
