var extend = require('themekit-webpack-config/extend');
var base = require('themekit-webpack-config/base');
var Config = require('themekit-pipeline').config;
var configInst = new Config();

module.exports = extend(base, {
    entry: {
        app: [ configInst.getSrcPath('js', 'app.js') ],
        layouts: [ configInst.getSrcPath('js', 'layouts.js') ],
        demo: [ configInst.getSrcPath('js', 'demo.js') ],
        vendor: [ configInst.getSrcPath('js', 'vendor.js') ]
    }
});