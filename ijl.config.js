const pkg = require('./package')

module.exports = {
  apiPath: 'stubs/api',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`
    }
  },
  navigations: {
    'undefined.main': '/undefined',
    'link.undefined.auth': '/auth'
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
