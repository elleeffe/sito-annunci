module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {userAgent: '*', disallow: '/auth'},
      {userAgent: '*', disallow: '/pubblica-annuncio'},
      {userAgent: '*', disallow: '/'},
    ],
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
  },
};
