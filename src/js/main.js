// The main application
import Vue from 'vue'
import App from '../views/main'

// Router requires a component to start
const Main = Vue.extend({
	replace: false,
	components: { App }
})

// Vue router
import router from './router.main'

// Start
router.start(Main, 'body')