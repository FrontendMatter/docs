var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()
var path = require('path')
var resolveAlias = {
	'themekit-docs': path.resolve(__dirname, '..')
}

module.exports = extend(config.getConfig(), {
    entry: {
        main: [ config.srcPath('js', 'main.js') ],
        manage: [ config.srcPath('js', 'manage.js') ],
        vendor: [ config.srcPath('js', 'vendor.js') ]
    },
	resolve: {
		alias: resolveAlias
	},
	resolveLoader: {
		alias: resolveAlias
	}
})