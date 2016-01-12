<template>

	<div class="page-header">
		<button class="btn btn-primary pull-right" data-toggle="modal" data-target="#create-package">Add package</button>
		<h1>Packages</h1>
	</div>

	<alert-notification></alert-notification>

	<!-- Service Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>

	<!-- Display list -->
	<isotope v-if="packages">
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

	<!-- No packages -->
	<div class="alert alert-default" v-if="!serviceLoading && !packages.length">
		No packages to display.
	</div>

	<!-- Create -->
	<modal id="create-package" 
		title="Create package" 
		@save.tk.modal="create"
		slide panel>

		<validator name="validation" slot="body">
			<form @submit.prevent="submit">
				<div class="form-group" 
					:class="{ 'has-error': hasValidationError('validation', 'name') }">
					<label for="package-name">Package name</label>
					<input type="text" 
						class="form-control" 
						v-model="model.name" 
						v-validate:name="{ required: { rule: true, message: 'The package name is required' } }"
						autofocus />
					<p class="help-block" v-for="msg in validationMessages('validation', 'name')">{{ msg }}</p>
				</div>
			</form>
		</validator>
	</modal>

</template>

<script>
	import { Modal } from 'themekit-vue'
	import { Isotope, IsotopeItem } from 'themekit-vue'
	import AlertNotification from 'themekit-docs/src/mixins/alert-notification'
	import ServiceUtil from 'themekit-docs/src/mixins/service-util'
	import Validation from 'themekit-docs/src/mixins/validation'

	export default {
		mixins: [
			ServiceUtil,
			Validation
		],
		data () {
			return {
				model: {
					name: null
				},
				modal: null,
				packages: []
			}
		},
		methods: {
			create ({ abort, next }) {
				this.didSubmit = true
				if (this.$validation.invalid) {
					return abort('save')
				}
				this.store.setPackage(this.model.name, this.model).then(() => {
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
			this.defaultModel = Object.assign({}, this.model)

			this.store.getPackages().then((packages) => {
				this.packages = packages

				this.store.onPackageAdded(this.onAdded)
				this.store.onPackageRemoved(this.onRemoved)
			})
		},
		events: {
			'ready.tk.modal': function (modal) {
				this.modal = modal
			}
		},
		components: {
			Modal,
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