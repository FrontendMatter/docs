/*
 * STYLES
 */

// BOOTSTRAP
import 'bootstrap-sass/assets/stylesheets/_bootstrap'

// ICONS
import 'font-awesome/css/font-awesome'

// THEMEKIT
import 'themekit-vue/dist/themekit.css'
import 'themekit-vue/src/sass/_themekit'

// DOCS
import '../sass/_docs'

/*
 * SCRIPTS
 */
 
import 'jquery'
import 'bootstrap-sass/assets/javascripts/bootstrap'
import 'modernizr/modernizr'

// EXTERNALS

// ISOTOPE
import Isotope from 'isotope-layout'
import Packery from 'isotope-packery'
window.Isotope = Isotope
window.Packery = Packery

// HIGHLIGHT.JS
import 'highlight.js/lib/highlight'
import 'highlight.js/styles/github-gist'
import 'highlight.js/lib/languages/xml'
import 'highlight.js/lib/languages/javascript'
import 'js-beautify'

// Vue library
import Vue from 'vue'

// Vue Validator
import VueValidator from 'vue-validator'
Vue.use(VueValidator)

// ThemeKit
import ThemeKit from 'themekit-vue'
Vue.use(ThemeKit)