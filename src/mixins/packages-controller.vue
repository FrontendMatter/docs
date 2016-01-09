<script>
	import PackageDb from 'themekit-docs/src/lib/services/package'
	import ServiceUtils from 'themekit-docs/src/mixins/service-utils'

	export default {
		mixins: [
			ServiceUtils
		],
		data () {
			return {
				packageService: new PackageDb(window.FIREBASE_REF)
			}
		},
		methods: {
			setPackage (name, data) {
				this.serviceLoading = true
				return this.packageService.setPackage(name, data).then(() => {
					this.onServiceComplete()
				})
				.catch((e) => {
					this.onServiceError(e)
				})
			},
			removePackage (name) {
				return this.packageService.removePackage(name)
			},
			setComponent (name, data) {
				this.serviceLoading = true
				return this.packageService.setComponent(name, data).then(() => {
					this.onServiceComplete()
				})
				.catch((e) => {
					this.onServiceError(e)
				})
			},
			removeComponent (name) {
				return this.packageService.removeComponent(name)
			},
			getComponent (name, cb) {
				this.serviceLoading = true
				this.packageService.getComponent(name, (data) => {
					this.onServiceComplete()
					cb(data)
				}, (e) => {
					this.onServiceError(e)
				})
			},
			onPackageAdded (cb) {
				this.serviceLoading = true
				this.packageService.onPackageAdded((data) => {
					this.onServiceComplete()
					cb(data)
				}, (e) => {
					this.onServiceError(e)
				})
			},
			onPackageRemoved (cb) {
				this.serviceLoading = true
				this.packageService.onPackageRemoved((name) => {
					this.onServiceComplete()
					cb(name)
				}, (e) => {
					this.onServiceError(e)
				})
			},
			onPackageNone (cb) {
				this.serviceLoading = true
				this.packageService.onPackageNone(() => {
					this.onServiceComplete()
					cb()
				}, (e) => {
					this.onServiceError(e)
				})
			},
			onPackageComponentAdded (packageName, cb) {
				this.serviceLoading = true
				this.packageService.onPackageComponentAdded(packageName, (data) => {
					this.onServiceComplete()
					cb(data)
				}, (e) => {
					this.onServiceError(e)
				})
			},
			onPackageComponentRemoved (packageName, cb) {
				this.serviceLoading = true
				this.packageService.onPackageComponentRemoved(packageName, (name) => {
					this.onServiceComplete()
					cb(name)
				}, (e) => {
					this.onServiceError(e)
				})
			},
			onPackageComponentNone (cb) {
				this.serviceLoading = true
				this.packageService.onPackageComponentNone(() => {
					this.onServiceComplete()
					cb()
				}, (e) => {
					this.onServiceError(e)
				})
			}
		}
	}
</script>