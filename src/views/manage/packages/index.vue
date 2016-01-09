<template>

	<div class="page-header">
		<button class="btn btn-success pull-right" data-toggle="modal" data-target="#create-package">Add package</button>
		<h1>Packages</h1>
	</div>

	<!-- Service Loading -->
	<div class="alert alert-default" v-if="$loadingRouteData">Loading ...</div>

	<!-- Service Error -->
	<div class="alert alert-danger" v-if="serviceError">
		<h4>Service error</h4>
		<pre v-text="serviceError | json" class="m-b-0"></pre>
	</div>

	<!-- Create -->
	<modal id="create-package" 
		title="Create package" 
		@save.tk.modal="create"
		slide panel>

		<validator name="validation" slot="body">
			<form @submit.prevent="submit">
				<div class="form-group" 
					:class="{ 'has-error': ($validation.name.dirty || didSubmit) && $validation.name.invalid }">
					<label for="package-name">Package name</label>
					<input type="text" 
						class="form-control" 
						v-model="model.name" 
						v-validate:name="{ required: { rule: true, message: 'The package name is required' } }"
						autofocus />
					<p class="help-block" v-for="msg in $validation.name.messages">{{ msg }}</p>
				</div>
			</form>
		</validator>
	</modal>

	<!-- Display list -->
	<div class="alert alert-default" v-if="!serviceLoading && !packages.length">No packages to display.</div>
	<isotope v-else>
		<isotope-item class="col-md-4" v-for="package in packages">
			<div class="panel panel-default panel-package">
				<div class="panel-heading">
					<h4 class="panel-title">
						<button class="close" @click="removePackage(package.name)">&times;</button>
						{{ package.name }}
					</h4>
				</div>
				<div class="panel-body text-center" @click="routePackage(package.name)">
					<strong>{{ package.components.length }}</strong> components
				</div>
			</div>
		</isotope-item>
	</isotope>

</template>

<script>
	import { Modal } from 'themekit-vue'
	import { Isotope, IsotopeItem } from 'themekit-vue'
	import PackagesController from 'themekit-docs/src/mixins/packages-controller'

	export default {
		mixins: [
			PackagesController
		],
		route: {
			data ({ next }) {
				this.$once('loadedRouteData', next)
				this.onPackageAdded((data) => {
					this.onAdded(data)
					this.$dispatch('loadedRouteData')
				})
				this.onPackageRemoved(this.onRemoved)
				this.onPackageNone(next)
			}
		},
		data () {
			return {
				model: {
					name: null
				},
				modal: null,
				packages: [],
				didSubmit: false
			}
		},
		methods: {
			create ({ abort, next }) {
				this.didSubmit = true
				if (this.$validation.invalid) {
					return abort('save')
				}
				this.setPackage(this.model.name, this.model).then(() => {
					this.model = this.defaultModel
					next('save')
				})
				.catch((e) => {
					abort('save')
				})
			},
			submit () {
				if (this.modal) {
					this.modal.save()
				}
			},
			routePackage (name) {
				this.$route.router.go({ name: 'package', params: { id: name } })
			},
			onAdded (data) {
				this.packages.push(data)
			},
			onRemoved (name) {
				this.packages = this.packages.filter((p) => {
					return p.name !== name
				})
			}
		},
		created () {
			this.defaultModel = Object.assign({}, this.model)
		},
		events: {
			'ready.tk.modal': function (modal) {
				this.modal = modal
			}
		},
		components: {
			Modal,
			Isotope,
			IsotopeItem
		}
	}
</script>

<style lang="sass">
	.panel-package .panel-body {
		cursor: pointer;
	}
</style>