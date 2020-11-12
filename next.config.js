const constants = require('./config/constants');

module.exports = {
  env: {
    ...constants,
  },
  images: {
    domains: ['admin.cfye.com'],
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
};
