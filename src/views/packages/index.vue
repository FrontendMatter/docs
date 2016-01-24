<template>

	<div class="container-fluid docs-container">

		<!-- Service Loading -->
		<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>
		
		<!-- Display list -->
		<isotope v-if="!serviceLoading && packages.length">
			<isotope-item class="col-md-4" v-for="package in packages">
				<div class="panel panel-default panel-package" v-link="appHelpers.routeToPackage(package.name)">
					<div class="panel-heading">
						<h4 class="panel-title">
							{{ package.name }}
						</h4>
					</div>
					<template v-if="package.content">
						<div class="panel-body">
							{{ package.content | excerpt 60 }}
						</div>
						<hr>
					</template>
					<div class="panel-body text-center">
						<strong>{{ package.components }}</strong> components
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
				packages: [],
				appHelpers: appStore.helpers
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