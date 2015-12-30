/*
 * STYLES
 */

// BOOTSTRAP
import 'bootstrap-sass/assets/stylesheets/_bootstrap'

// ICONS
import 'material-design-iconic-font/css/material-design-iconic-font'
import 'font-awesome/css/font-awesome'

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
 
import 'bootstrap-sass/assets/javascripts/bootstrap'
import 'modernizr/modernizr'

// Vue library
import Vue from 'vue'

// Vue Directives
import Scrollable from 'themekit-vue/src/vue/directives/scrollable'
import Datepicker from 'themekit-vue/src/vue/directives/datepicker'
import Highlight from '../app/directives/highlight'

Vue.directive('scrollable', Scrollable)
Vue.directive('datepicker', Datepicker)
Vue.directive('highlight', Highlight)