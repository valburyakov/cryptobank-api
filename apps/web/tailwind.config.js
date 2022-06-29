const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: [
    'apps/web/src/**/*.{js,jsx,ts,tsx}',
    createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
