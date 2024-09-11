const pkg = require('./package')

module.exports = {
  apiPath: 'stubs/api',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`
    }
  },
  navigations: {
    'enter.main': '/enter',
    'link.enter.auth': '/auth',
    'link.enter.account': '/account',
  },
  features: {
    'undefined': {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    'undefined.api': '/api',
  }
}
