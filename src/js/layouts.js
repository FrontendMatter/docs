// The main application
import App from '../app/layouts'

// Vue router
import router from './router.layouts'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'body')