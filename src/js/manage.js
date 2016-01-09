// The main application
import App from '../views/manage/index'

// Vue router
import router from './router.manage'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'body')