module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.cfye.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.cfye.com/server-sitemap.xml', // <==== Add here
    ],
  },
};
