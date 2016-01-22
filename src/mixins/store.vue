<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import AlertNotification from 'themekit-docs/src/components/alert-notification'
	import store from 'themekit-docs/src/lib/store'

	export default {
		mixins: [
			AlertNotification
		],
		data () {
			return {
				appConfig: appStore.config,
				serviceLoading: false,
				serviceCompleteDebounce: null
			}
		},
		methods: {
			onServiceComplete () {
				clearTimeout(this.serviceCompleteDebounce)
				this.serviceCompleteDebounce = setTimeout(() => this.serviceLoading = false, 200)
			},
			onServiceError (e) {
				this.alertNotificationError(e)
			},
			onServiceLoading () {
				this.serviceLoading = true
			}
		},
		created () {
			store.setRef(this.appConfig.storeFirebaseRef)
			store.on('serviceLoading', this.onServiceLoading)
			store.on('serviceComplete', this.onServiceComplete)
			store.on('serviceError', this.onServiceError)
			this.store = store
		},
		destroyed () {
			store.ref.off()
			store.removeListener('serviceLoading', this.onServiceLoading)
			store.removeListener('serviceComplete', this.onServiceComplete)
			store.removeListener('serviceError', this.onServiceError)
			clearTimeout(this.serviceCompleteDebounce)
		}
	}
</script>