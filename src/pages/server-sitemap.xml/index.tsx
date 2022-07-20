import {GetServerSideProps} from 'next';
import {getServerSideSitemap, ISitemapField} from 'next-sitemap';

export default function Sitemap() {}

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const categories = ['categoria1', 'categoria2'];

  const fields: ISitemapField[] = categories.map((category: string) => ({
    loc: `${process.env.SITE_URL}/categorie/${category}`,
    lastMod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(cxt, fields);
};
