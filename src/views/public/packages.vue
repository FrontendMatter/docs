<template>

	<!-- Layout -->
	<layout>

		<!-- Navbar -->
		<navbar slot="navbar" fixed="top">
			<a href="#" class="navbar-brand" slot="brand">ThemeKit Docs</a>
			<ul class="nav navbar-nav">
				<li :class="{ active: $route.name === 'packages' }">
					<a v-link="{ path: '/' }">Packages</a>
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
			
			<!-- Display list -->
			<isotope v-if="packages">
				<isotope-item class="col-md-4" v-for="package in packages">
					<div class="panel panel-default panel-package" @click="$route.router.go(appHelpers.routeToPackage(package.name))">
						<div class="panel-heading">
							<h4 class="panel-title">
								{{ package.name }}
							</h4>
						</div>
						<div class="panel-body text-center">
							<strong>{{ package.components.length }}</strong> components
						</div>
					</div>
				</isotope-item>
			</isotope>

			<!-- No packages -->
			<div class="alert alert-default" v-if="!serviceLoading && !packages.length">
				No packages to display.
			</div>

		</div>
		<!-- // END Content -->

	</layout>
	<!-- // END Layout -->

</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import PackageStore from 'themekit-docs/src/mixins/package-store'
	import AlgoliaInstantsearchDropdown from 'themekit-docs/src/components/algolia-instantsearch-dropdown'
	import { Layout } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'
	import { Isotope, IsotopeItem } from 'themekit-vue'

	export default {
		mixins: [
			PackageStore
		],
		data () {
			return {
				packages: [],
				appConfig: appStore.config,
				appHelpers: appStore.helpers
			}
		},
		methods: {
			transformHit (hit) {
				hit.route = this.appHelpers.routeToComponent(Object.keys(hit.packages)[0], hit.name)
				return hit
			}
		},
		created () {
			this.store.getPackages().then((packages) => {
				this.packages = packages
			})
		},
		components: {
			Layout,
			Navbar,
			Isotope,
			IsotopeItem,
			AlgoliaInstantsearchDropdown
		}
	}	
</script>

<style lang="sass">
	.panel-package {
		cursor: pointer;
	}
</style>