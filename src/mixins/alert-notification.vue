<template>
	<div class="alert" :class="alertNotificationClass" v-if="alertNotificationModel">
		<button class="close" data-dismiss="alert">&times;</button>
		<template v-if="alertNotificationModel.type === 'error'">
			<h4>Error</h4>
			<pre v-text="alertNotificationModel.message | json" class="m-b-0"></pre>
		</template>
		<template v-else>
			{{ alertNotificationModel.message }}
		</template>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				alertNotificationModel: null,
				alertNotificationDebounce: null
			}
		},
		props: {
			timeout: {
				type: Number,
				default: 5000
			}
		},
		computed: {
			alertNotificationClass () {
				return {
					'alert-success': this.alertNotificationModel.type === 'success',
					'alert-danger': this.alertNotificationModel.type === 'error',
					'alert-warning': this.alertNotificationModel.type === 'warning',
					'alert-info': this.alertNotificationModel.type === 'info',
					'alert-default': !this.alertNotificationModel.type
				}
			}
		},
		methods: {
			alertNotification (message, type, debounce) {
				clearTimeout(this.alertNotificationDebounce)
				const root = this.$root
				this.alertNotificationDebounce = setTimeout(() => {
					root.$broadcast('alert-notification', { message, type })
				}, debounce || 0)
			},
			alertNotificationSuccess (message, debounce) {
				this.alertNotification(message, 'success', debounce)
			},
			alertNotificationError (message, debounce) {
				this.alertNotification(message, 'error', debounce)
			},
			alertNotificationInfo (message, debounce) {
				this.alertNotification(message, 'info', debounce)
			}
		},
		destroyed () {
			clearTimeout(this.alertNotificationDebounce)
		},
		events: {
			'alert-notification': function (alert) {
				this.alertNotificationModel = alert
				if (alert.type !== 'error') {
					setTimeout(() => {
						this.alertNotificationModel = null
					}, this.timeout)
				}
				return true
			}
		}
	}
</script>