const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    'enterfront.main': '/enterfront',
    'enterfront.home': '/enterfront/home',
    'enterfront.auth': '/enterfront/auth',
    'enterfront.reg': '/enterfront/reg',
    'enterfront.account': '/enterfront/account',
    'enterfront.chat': '/enterfront/chat',
  },
  features: {
    "enterfront": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "enterfront.api": "/api",
    // paste stand URL to config
  },
};
