<template>
	<div class="container-fluid docs-container">
		<template v-if="pkg">
			<h1>{{ pkg.name }}</h1>
			<template v-if="pkg.content">
				{{{ pkg.content | marked }}}
			</template>
		</template>

		<template v-if="!pkg">
			<div class="alert alert-default" v-if="serviceLoading">Loading data ...</div>
			<template v-else>
				<h1>{{ packageId }}</h1>
				<h3>The package was not found.</h3>
			</template>
		</template>
	</div>
</template>

<script>
	import Store from 'themekit-docs/src/mixins/store'
	import marked from 'marked'

	marked.setOptions({
		highlight: function (code) {
			return require('highlight.js').highlightAuto(code).value
		}
	})

	export default {
		mixins: [
			Store
		],
		filters: {
			marked: marked
		},
		data () {
			return {
				pkg: null
			}
		},
		route: {
			canReuse: false
		},
		computed: {
			packageId () {
				return this.$route.params.id
			}
		},
		created () {
			this.store.getPackage(this.packageId).then((pkg) => {
				this.pkg = pkg
			})
		}
	}
</script>