const { withPlaiceholder } = require('@plaiceholder/next');
const constants = require('./config/constants');

module.exports = withPlaiceholder({
  env: {
    ...constants,
  },
  images: {
    domains: ['admin.cfye.com', 'admin.cfye.local', 'cdn.cfye.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }
    return config;
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
