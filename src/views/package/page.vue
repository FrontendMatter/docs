<template>
	<div class="container-fluid docs-container">
		<template v-if="page">
			<h1>{{ page.data.title }}</h1>
			<template v-if="page.data.content">
				{{{ page.data.content | marked }}}
			</template>
		</template>

		<template v-if="!page && !serviceLoading && appState.pkg">
			<template v-else>
				<h1>{{ pageId }}</h1>
				<h3>The page was not found.</h3>
			</template>
		</template>

		<div class="alert alert-default" v-if="serviceLoading && !page">Loading data ...</div>
	</div>
</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import Store from 'themekit-docs/src/mixins/store'

	export default {
		mixins: [
			Store
		],
		data () {
			return {
				page: null,
				appState: appStore.state
			}
		},
		computed: {
			pageId () {
				return this.$route.params.pageId
			},
			packageName () {
				return this.$route.params.packageName
			},
			version () {
				return this.$route.params.version
			}
		},
		methods: {
			getPage () {
				this.page = null
				this.store.getPackagePage(this.packageName, this.version, this.pageId).then((page) => this.page = page)
			}
		},
		created () {
			this.getPage()
		},
		watch: {
			page (value) {
				if (value) {
					this.appState.page.title = this.page.data.title
				}
			},
			'packageName': 'getPage',
			'version': 'getPage'
		}
	}
</script>