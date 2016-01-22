<template>

	<div class="page-header">
		<button class="btn btn-primary pull-right" v-link="appHelpers.routeToCreatePage(packageId)">Add page</button>
		<h1>Pages</h1>
	</div>

	<alert-notification></alert-notification>

	<!-- Service Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>
	
	<!-- Display list -->
	<isotope v-if="!serviceLoading && pages.length">
		<isotope-item class="col-md-6" v-for="page in pages">
			<div class="panel panel-default panel-page">
				<div class="panel-heading">
					<h4 class="panel-title">
						<button class="close" @click="removePage(page.pageId)">&times;</button>
						{{ page.title }}
					</h4>
				</div>
				<div class="panel-body" v-link="appHelpers.routeToEditPage(packageId, page.pageId)">
					{{ page.content | excerpt 100 }}
				</div>
			</div>
		</isotope-item>
	</isotope>
	<!-- // END List -->

	<!-- No components -->
	<div class="alert alert-default" v-if="!serviceLoading && !pages.length">
		No pages to display.
	</div>

	<nav v-if="paginator && paginator.hasResults()">
		<ul class="pager">
			<li :class="{ 'disabled': paginator.isFirstPage() }">
				<a href="#" @click.stop.prevent="prevPage">Previous</a>
			</li>
			<li :class="{ 'disabled': paginator.isLastPage() }">
				<a href="#" @click.stop.prevent="nextPage">Next</a>
			</li>
		</ul>
	</nav>

</template>

<script>
	import { Isotope, IsotopeItem } from 'themekit-vue'
	import appStore from 'themekit-docs/src/js/app.store'
	import AlertNotification from 'themekit-docs/src/components/alert-notification'
	import Store from 'themekit-docs/src/mixins/store'
	import crop from 'mout/string/crop'

	export default {
		mixins: [
			Store
		],
		filters: {
			excerpt: function (value, length) {
				return crop(value, length || 30)
			}
		},
		data () {
			return {
				pages: [],
				appHelpers: appStore.helpers,
				paginator: null
			}
		},
		computed: {
			packageId () {
				return this.$route.params.id
			}
		},
		methods: {
			removePage (pageId) {
				if (confirm('Are you sure you want to remove this page?')) {
					this.store.removePage(pageId)
				}
			},
			onAdded (page) {
				let exists = this.pages.find((p) => p.pageId === page.pageId)
				if (!exists) {
					this.pages.push(page)
				}
			},
			onRemoved (pageId) {
				this.pages = this.pages.filter((p) => p.pageId !== pageId)
			},
			nextPage () {
				if (!this.paginator || (this.paginator && !this.paginator.isLastPage())) {
					this.store.nextPage('pages').then((pages) => {
						this.pages = pages
						this.paginator = this.store.paginator.pages
					})
				}
			},
			prevPage () {
				if (this.paginator && !this.paginator.isFirstPage()) {
					this.store.prevPage('pages').then((pages) => {
						this.pages = pages
						this.paginator = this.store.paginator.pages
					})
				}
			}
		},
		created () {
			this.store.paginatePages(this.packageId)
			this.nextPage('pages')
			this.store.onPageRemoved(this.onRemoved)
		},
		components: {
			Isotope,
			IsotopeItem,
			AlertNotification
		}
	}
</script>

<style lang="sass">
	.panel-page .panel-body {
		cursor: pointer;
	}
</style>