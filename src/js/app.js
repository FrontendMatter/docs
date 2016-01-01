import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

// Resource Options
Vue.http.options.root = 'http://localhost:3000/api'

// The main application
import App from '../app/app'

// Vue router
import router from './router.app'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'body')