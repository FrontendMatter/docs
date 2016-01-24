<template>
	<div class="container-fluid docs-container">
		<template v-if="page">
			<h1>{{ page.title }}</h1>
			<template v-if="page.content">
				{{{ page.content | marked }}}
			</template>
		</template>

		<template v-if="!page">
			<div class="alert alert-default" v-if="serviceLoading">Loading data ...</div>
			<template v-else>
				<h1>{{ pageId }}</h1>
				<h3>The page was not found.</h3>
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
				page: null
			}
		},
		route: {
			canReuse: false
		},
		computed: {
			pageId () {
				return this.$route.params.pageId
			}
		},
		created () {
			this.store.getPage(this.pageId).then((page) => {
				this.page = page
			})
		}
	}
</script>