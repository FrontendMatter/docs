var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()

module.exports = extend(config.getConfig(), {
    entry: {
        app: [ config.srcPath('js', 'app.js') ],
        demo: [ config.srcPath('js', 'demo.js') ],
        vendor: [ config.srcPath('js', 'vendor.js') ]
    }
})