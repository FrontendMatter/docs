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
		</navbar>
		<!-- // END Navbar -->

		<!-- Content -->
		<div class="container">
			
			<!-- Display list -->
			<isotope v-if="packages">
				<isotope-item class="col-md-4" v-for="package in packages">
					<div class="panel panel-default panel-package" @click="routePackage(package.name)">
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
	import ServiceUtil from 'themekit-docs/src/mixins/service-util'
	import { Layout } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'
	import { Isotope, IsotopeItem } from 'themekit-vue'

	export default {
		mixins: [
			ServiceUtil
		],
		data () {
			return {
				packages: []
			}
		},
		methods: {
			routePackage (name) {
				this.$route.router.go({ name: 'package', params: { id: name } })
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
			IsotopeItem
		}
	}	
</script>

<style lang="sass">
	.panel-package {
		cursor: pointer;
	}
</style>