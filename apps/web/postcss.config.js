module.exports = {
  plugins: {
    tailwindcss: { config: 'apps/web/tailwind.config.js' },
    autoprefixer: {},
    'postcss-normalize': { browsers: 'last 2 versions' },
  },
};
