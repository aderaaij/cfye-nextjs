const { withPlaiceholder } = require('@plaiceholder/next');
const constants = require('./config/constants');

module.exports = withPlaiceholder({
  env: {
    ...constants,
  },
  images: {
    domains: ['admin.cfye.com', 'admin.cfye.local', 'cdn.cfye.com'],
  },
  async redirects() {
    return [
      {
        source: '/:slug([\\w-]+)(-\\d+)',
        destination: '/posts/:slug',
        permanent: true,
      },
    ];
  },
});
