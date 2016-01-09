<script>
	export default {
		data () {
			return {
				serviceLoading: false,
				serviceError: null
			}
		},
		methods: {
			onServiceComplete (error) {
				this.serviceError = error
				this.serviceLoading = false
			},
			onServiceError (error) {
				this.onServiceComplete(error)
			}
		}
	}
</script>