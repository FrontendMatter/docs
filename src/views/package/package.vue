<template>
	<div class="container-fluid docs-container">
		<template v-if="appState.pkg">
			<h1>{{ appState.pkg.packageIdData.packageName }}</h1>
			<template v-if="appState.pkg.description">
				{{{ appState.pkg.description.data | marked }}}
			</template>
			<template v-if="appState.pkg.readme">
				{{{ appState.pkg.readme.data | marked }}}
			</template>
		</template>

		<template v-if="!appState.pkg && !serviceLoading">
			<template v-else>
				<h1>{{ packageName }}</h1>
				<h3>The package was not found.</h3>
			</template>
		</template>

		<div class="alert alert-default" v-if="serviceLoading && !appState.pkg">Loading data ...</div>
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
				appState: appStore.state
			}
		},
		computed: {
			packageName () {
				return this.$route.params.packageName
			},
			version () {
				return this.$route.params.version
			}
		},
		methods: {
			updateTitle () {
				this.appState.page.title = `${ this.packageName } (${ this.version })`
			}
		},
		created () {
			this.updateTitle()
		},
		watch: {
			'packageName': 'updateTitle',
			'version': 'updateTitle'
		}
	}
</script>