var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()

module.exports = extend(config.getConfig(), {
    entry: {
        main: [ config.srcPath('js', 'main.js') ],
        vendor: [ config.srcPath('js', 'vendor.js') ]
    }
})