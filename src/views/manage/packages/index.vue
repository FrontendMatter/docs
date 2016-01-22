<template>

	<div class="page-header">
		<button class="btn btn-primary pull-right" v-link="appHelpers.routeToCreatePackage()">Add package</button>
		<h1>Packages</h1>
	</div>

	<alert-notification></alert-notification>

	<!-- Service Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>

	<!-- Display list -->
	<isotope v-if="!serviceLoading && packages.length">
		<isotope-item class="col-md-4" v-for="package in packages">
			<div class="panel panel-default panel-package">
				<div class="panel-heading">
					<h4 class="panel-title">
						<button class="close" @click="removePackage(package.name)">&times;</button>
						{{ package.name }}
					</h4>
				</div>
				<template v-if="package.content">
					<div class="panel-body" v-link="appHelpers.routeToPackageComponents(package.name)">
						{{ package.content | excerpt 60 }}
					</div>
					<hr>
				</template>
				<div class="panel-body text-center" v-link="appHelpers.routeToPackageComponents(package.name)">
					<strong>{{ package.components }}</strong> components
				</div>
			</div>
		</isotope-item>
	</isotope>

	<!-- No packages -->
	<div class="alert alert-default" v-if="!serviceLoading && !packages.length">
		No packages to display.
	</div>

</template>

<script>
	import { Isotope, IsotopeItem } from 'themekit-vue'
	import AlertNotification from 'themekit-docs/src/components/alert-notification'
	import Store from 'themekit-docs/src/mixins/store'
	import Validation from 'themekit-docs/src/mixins/validation'
	import appStore from 'themekit-docs/src/js/app.store'

	export default {
		mixins: [
			Store,
			Validation
		],
		data () {
			return {
				packages: [],
				appHelpers: appStore.helpers
			}
		},
		methods: {
			onAdded (data) {
				const exists = this.packages.find((p) => p.name === data.name)
				if (!exists) {
					this.packages.push(data)
				}
			},
			onRemoved (name) {
				this.packages = this.packages.filter((p) => p.name !== name)
			},
			removePackage (name) {
				if (confirm('Are you sure you want to remove this package?')) {
					this.store.removePackage(name)
				}
			}
		},
		created () {
			this.store.getPackages().then((packages) => {
				this.packages = packages

				this.store.onPackageAdded(this.onAdded)
				this.store.onPackageRemoved(this.onRemoved)
			})
		},
		components: {
			Isotope,
			IsotopeItem,
			AlertNotification
		}
	}
</script>

<style lang="sass">
	.panel-package .panel-body {
		cursor: pointer;
	}
</style>