// https://ant.design/docs/react/use-with-create-react-app
const CracoLessPlugin = require('craco-less')
const { black, blue } = require('./colors')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': blue, '@black': black },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
