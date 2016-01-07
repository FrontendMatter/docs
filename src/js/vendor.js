/*
 * STYLES
 */

// BOOTSTRAP
import 'bootstrap-sass/assets/stylesheets/_bootstrap'

// ICONS
import 'font-awesome/css/font-awesome'

// THEMEKIT
import 'themekit-vue/dist/themekit.css'

// THEMEKIT PAGE
import 'themekit-vue/src/sass/page/_scaffolding'
import 'themekit-vue/src/sass/page/_typography'

// THEMEKIT HELPERS
import 'themekit-vue/src/sass/helpers/_general'
import 'themekit-vue/src/sass/helpers/_sizing'
import 'themekit-vue/src/sass/helpers/_spacing'

// THEMEKIT COLORS
import 'themekit-vue/src/sass/colors/_helpers'
import 'themekit-vue/src/sass/colors/_background'
import 'themekit-vue/src/sass/colors/_text'
import 'themekit-vue/src/sass/colors/_button'

// THEMEKIT ELEMENTS
import 'themekit-vue/src/sass/elements/_button'
import 'themekit-vue/src/sass/elements/_jumbotron'
import 'themekit-vue/src/sass/elements/_panel'

/*
 * SCRIPTS
 */
 
import 'jquery'
import 'bootstrap-sass/assets/javascripts/bootstrap'
import 'modernizr/modernizr'

// Vue library
import Vue from 'vue'

// Vue Resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// ThemeKit
import ThemeKit from 'themekit-vue'
Vue.use(ThemeKit)