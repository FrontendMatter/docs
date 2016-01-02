var extend = require('themekit-webpack-config/extend')
var base = require('themekit-webpack-config/base')

module.exports = extend(base.getConfig(), {
    entry: {
        app: [ base.srcPath('js', 'app.js') ],
        demo: [ base.srcPath('js', 'demo.js') ],
        vendor: [ base.srcPath('js', 'vendor.js') ]
    }
})