// The main application
import App from '../views/public/index'

// Vue router
import router from './router.main'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'body')