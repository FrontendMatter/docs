<template>
	
	<!-- Layout -->
	<layout>

		<!-- Navbar -->
		<navbar slot="navbar" fixed="top">
			<a href="" class="navbar-brand" slot="brand">Manage Docs</a>
			<ul class="nav navbar-nav">
				<li :class="{ active: $route.name === 'packages' }">
					<a v-link="{ name: 'packages' }">Packages</a>
				</li>
			</ul>
			<div class="navbar-form navbar-left">
				<algolia-instantsearch-dropdown
					:algolia-app-id="appConfig.algolia.appId"
					:algolia-api-key="appConfig.algolia.apiKey"
					algolia-index="components"
					:transform-hit="transformHit"
					search-box-placeholder="Search components ...">
				</algolia-instantsearch-dropdown>
			</div>
		</navbar>
		<!-- // END Navbar -->

		<!-- Content -->
		<div class="container">
			<router-view></router-view>
		</div>
		<!-- // END Content -->

	</layout>
	<!-- // END layout -->

</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import AlgoliaInstantsearchDropdown from 'themekit-docs/src/components/algolia-instantsearch-dropdown'
	import { Layout } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'

	export default {
		replace: false,
		data () {
			return {
				packages: [],
				appConfig: appStore.config,
				appHelpers: appStore.helpers
			}
		},
		methods: {
			transformHit (hit) {
				hit.route = this.appHelpers.routeToEditComponent(Object.keys(hit.packages)[0], hit.name)
				return hit
			}
		},
		components: {
			Layout,
			Navbar,
			AlgoliaInstantsearchDropdown
		}
	}
</script>