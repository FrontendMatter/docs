var ThemeKit = require('themekit-gulp');

ThemeKit(function(mix, config) {

    // CLEAN
    mix.cleanTheme();

    // COPY
    mix.copy(config.getSrcPath('html', '*.html'));

    // WEBPACK DEV SERVER
    // Enable with CLI --webpack-dev-server
    var devServer = config.getConfig().webpackDevServer;

    // WEBPACK
    mix.webpack();

    // STATIC HTTP SERVER
    if (! devServer)
        mix.browserSync();

});