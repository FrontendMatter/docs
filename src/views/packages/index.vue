<template>

	<div class="container-fluid docs-container">

		<!-- Service Loading -->
		<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>
		
		<!-- Display list -->
		<isotope v-if="!serviceLoading && packages.length">
			<isotope-item class="col-md-4" v-for="package in packages">
				<div class="panel panel-default panel-package" v-link="appHelpers.routeToPackage(package.packageIdData.packageName, package.packageVersionIdData.version)">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a v-link="appHelpers.routeToPackage(package.packageIdData.packageName, package.packageVersionIdData.version)">{{ package.packageIdData.packageName }}</a>
						</h4>
					</div>
					<div class="panel-body">
						<span class="label label-default">{{ package.packageVersionIdData.version }}</span>
						<template v-if="package.description">{{ package.description.data }}</template>
					</div>
				</div>
			</isotope-item>
		</isotope>

		<!-- No packages -->
		<div class="alert alert-default" v-if="!serviceLoading && !packages.length">
			No packages to display.
		</div>
		
	</div>

</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import Store from 'themekit-docs/src/mixins/store'
	import { Isotope, IsotopeItem } from 'vue-isotope'

	export default {
		mixins: [
			Store
		],
		route: {
			activate () {
				this.appState.page.title = 'Packages'
			}
		},
		data () {
			return {
				packages: [],
				appHelpers: appStore.helpers,
				appState: appStore.state
			}
		},
		created () {
			this.store.getPackages().then((packages) => {
				this.packages = packages
			})
		},
		components: {
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