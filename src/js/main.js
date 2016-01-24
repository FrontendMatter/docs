// The main application
import App from '../views/main'

// Vue router
import router from './router.main'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'body')