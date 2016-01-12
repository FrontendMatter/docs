// Vue
import Vue from 'vue'

// The main application
const App = Vue.extend({
	template: '<router-view></router-view>',
	replace: false
})

// Vue router
import router from './router.main'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'body')