var webpack = require('webpack')
var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var baseConfig = new Base()
var config = require('config')
var path = require('path')
var resolveAlias = {
	'themekit-docs': path.resolve(__dirname, '..')
}

module.exports = extend(baseConfig.getConfig(), {
	entry: {
		main: [ baseConfig.srcPath('js', 'main.js') ],
		manage: [ baseConfig.srcPath('js', 'manage.js') ],
		vendor: [ baseConfig.srcPath('js', 'vendor.js') ]
	},
	resolve: {
		alias: resolveAlias
	},
	resolveLoader: {
		alias: resolveAlias
	},
	plugins: [
		new webpack.DefinePlugin({
			__APP__: {
				algolia: {
					appId: JSON.stringify(config.get('algolia.appId')),
					apiKey: JSON.stringify(config.get('algolia.apiKey'))
				},
				packageStoreFirebaseRef: JSON.stringify(config.get('packageStoreFirebaseRef'))
			}
		})
	]
})