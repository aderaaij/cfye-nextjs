const constants = require('./config/constants');

module.exports = {
  env: {
    ...constants,
  },
  images: {
    domains: ['admin.cfye.com'],
  },
  future: {
    webpack5: true,
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
  future: {
    webpack5: true,
  },
};
