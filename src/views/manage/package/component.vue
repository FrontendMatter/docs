<template>

	<alert-notification fixed></alert-notification>

	<!-- Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading data ...</div>
	
	<template v-if="!serviceLoading && (!isEditView || model.name)">

		<!-- Main form -->
		<validator name="validation">
			<form @submit.prevent="create">

				<div class="page-header">
					<div class="pull-right">
						<button type="button" class="btn btn-link" @click="cancel">Cancel</button>
						<button type="submit" class="btn btn-success">Save</button>
					</div>
					<h1 v-text="isEditView ? 'Edit component' : 'Create component'"></h1>
				</div>

				<div class="form-group" 
					:class="{ 'has-error': hasValidationError('name') }">
					<label for="name">Component name</label>
					<input type="text" 
						id="name"
						class="form-control" 
						v-model="model.name" 
						v-validate:name="{ required: { rule: true, message: 'The component name is required' } }"
						:autofocus="!isEditView"  />
					<p class="help-block" v-for="msg in validationMessages('name')">{{ msg }}</p>
				</div>
				<div class="form-group" 
					:class="{ 'has-error': hasValidationError('description') }">
					<label for="description">Description</label>
					<textarea id="description"
						class="form-control" 
						v-model="model.description" 
						v-validate:description="{ required: { rule: true, message: 'The component description is required' } }">
					</textarea>
					<p class="help-block" v-for="msg in validationMessages('description')">{{ msg }}</p>
				</div>

				<div class="page-header">
					<button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#add-property">Add property</button>
					<h2>Properties</h2>
				</div>

				<!-- Property -->
				<template 
					v-if="component.props" 
					v-for="(key, prop) in model.props">

					<!-- Editable property -->
					<validator 
						v-if="isEditable('props.' + key)"
						:name="'prop-validation-' + key">
						<div class="form-group form-group-prop" 
							:class="{ 'has-error': hasValidationError('description', '$prop-validation-' + key) }">
							<h3 id="prop-{{ key }}">{{ prop.name }}</h3>
							<label for="prop-{{ key }}-description">Description</label>
							<textarea id="prop-{{ key }}-description"
								class="form-control" 
								v-model="model.props[ key ].description" 
								v-validate:description="{ required: { rule: true, message: 'The property description is required' } }">
							</textarea>
							<p class="help-block" v-for="msg in validationMessages('description', '$prop-validation-' + key)">{{ msg }}</p>
							<p class="help-block">
								<button type="submit" class="btn btn-default">OK</button>
								<button class="btn btn-default" @click.stop="toggleEditable('props.' + key)">Cancel</button>
							</p>
							<pre v-text="component.props[ key ] | json"></pre>
							<button class="btn btn-link" @click.prevent.stop="removeProperty(key)">Remove</button>
						</div>
					</validator>
					<!-- // END Editable property -->
					
					<!-- Read-only property -->
					<div v-else class="form-group form-group-prop">
						<h3 id="prop-{{ key }}">{{ prop.name }}</h3>
						<label>Description</label> 
						<a href="#" @click.prevent.stop="toggleEditable('props.' + key)">Edit</a>
						<p class="help-block">
							<template v-if="model.props[key].description">
								{{ model.props[key].description }}
							</template>
							<template v-else>
								<span class="label label-danger">missing</span>
								The property is missing a description. 
								<a href="#" @click.prevent.stop="toggleEditable('props.' + key)">Add a description</a>
							</template>
						</p>
						<pre v-text="component.props[ key ] | json"></pre>
						<div>
							<button type="submit" class="btn btn-link">Save</button>
							<button class="btn btn-link" @click.prevent.stop="removeProperty(key)">Remove</button>
						</div>
					</div>
					<!-- // END Read-only property -->

				</template>
				<!-- // END Property -->

				<!-- No properties -->
				<div v-if="!hasProps(component)" class="alert alert-default">
					No properties.
				</div>
				
				<!-- Main form controls -->
				<div class="form-group">
					<button type="submit" class="btn btn-success">Save</button>
					<button type="button" class="btn btn-link" @click="cancel">Cancel</button>
				</div>
			</form>
		</validator>
		<!-- // END Main form -->

		<!-- Add property modal -->
		<modal id="add-property"
			title="Add property"
			@save.tk.modal="addProperty"
			slide panel>
			<validator name="add-property-validation" slot="body">
				<form @submit.prevent="submitAddProperty">
					<div class="form-group" 
						:class="{ 'has-error': hasValidationError('name', '$add-property-validation') }">
						<label for="property-name">Property name</label>
						<input type="text" 
							class="form-control" 
							v-model="property.name" 
							v-validate:name="{ required: { rule: true, message: 'The property name is required' } }"
							autofocus />
						<p class="help-block" v-for="msg in validationMessages('name', '$add-property-validation')">{{ msg }}</p>
					</div>
					<div class="form-group" 
						:class="{ 'has-error': hasValidationError('description', '$add-property-validation') }">
						<label for="property-description">Description</label>
						<textarea id="property-description"
							class="form-control" 
							v-model="property.description" 
							v-validate:description="{ required: { rule: true, message: 'The property description is required' } }">
						</textarea>
						<p class="help-block" v-for="msg in validationMessages('description', '$add-property-validation')">{{ msg }}</p>
					</div>
				</form>
			</validator>
		</modal>
		<!-- // END Add property modal -->

	</template>

</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import AlertNotification from 'themekit-docs/src/components/alert-notification'
	import Store from 'themekit-docs/src/mixins/store'
	import Validation from 'themekit-docs/src/mixins/validation'

	import { Modal } from 'themekit-vue'
	import merge from 'mout/object/merge'
	import forOwn from 'mout/object/forOwn'
	import set from 'mout/object/set'
	import get from 'mout/object/get'
	import slugify from 'mout/string/slugify'
	import camelCase from 'mout/string/camelCase'
	import properCase from 'mout/string/properCase'
	import unhyphenate from 'mout/string/unhyphenate'
	
	export default {
		mixins: [
			AlertNotification,
			Store,
			Validation
		],
		data () {
			return {
				appHelpers: appStore.helpers,

				// main form model
				model: {
					name: null,
					label: null,
					packageId: null,
					description: null,
					props: {},
					events: {},
					requirements: [],
					demo: null
				},
				// sync model
				sync: null,

				// editable fields
				editable: {},

				// add property form
				property: {
					name: null,
					description: null
				},
				addPropertyModal: null
			}
		},
		route: {
			canReuse: false
		},
		computed: {
			component () {
				return this.sync ? merge({}, this.sync, this.model) : this.model
			},
			valid () {
				let valid = true
				forOwn(this.component.props, (prop, key) => {
					if (this.isEditable('props.' + key)) {
						if (!valid) {
							return false
						}
						valid = this.getValidator('$prop-validation-' + key).valid
					}
				})
				return this.$validation.valid && valid
			},
			packageId () {
				return this.$route.params.id
			},
			componentId () {
				return this.$route.params.componentId
			},
			isEditView () {
				return this.componentId
			}
		},
		methods: {
			create () {
				this.didSubmit = true
				if (this.valid) {
					this.model.label = properCase(unhyphenate(this.model.name))
					this.store.setComponent(this.model.name, this.saveFormatter()).then(() => {
						this.didSubmit = false
						this.success('The component was saved.')
					})
				}
			},
			goToPackage () {
				this.$route.router.go(this.appHelpers.routeToPackageComponents(this.packageId))
			},
			goToEditComponent () {
				this.$route.router.go(this.appHelpers.routeToEditComponent(this.packageId, this.model.name))
			},
			cancel () {
				this.goToPackage()
			},
			success (message) {
				this.alertNotificationSuccess(message)
				if (!this.isEditView) {
					this.goToEditComponent()
				}
			},
			toggleEditable (key) {
				let editable = {}
				set(editable, key, !this.isEditable(key))
				this.editable = Object.assign({}, this.editable, editable)
			},
			isEditable (key) {
				return get(this.editable, key)
			},
			modelSyncFormatter (sync) {
				let model = this.model
				forOwn(sync.props, (prop, key) => {
					model.props[key] = {
						name: prop.name,
						description: null
					}
				})
				return model
			},
			saveFormatter () {
				let model = JSON.parse(JSON.stringify(this.model))
				forOwn(model.props, (prop, key) => {
					if (!prop.description || prop.description.length === 0) {
						delete model.props[key]
					}
				})
				return model
			},
			addProperty ({ abort, next }) {

				// validate
				this.didSubmit = true
				if (this.getValidator('$add-property-validation').invalid) {
					return abort('save')
				}

				// format property model
				this.property.name = slugify(this.property.name)
				let key = camelCase(this.property.name)
				let property = {}
				property[key] = this.property

				// add property
				this.model.props = Object.assign({}, this.model.props, property)
				this.model = Object.assign({}, this.model)

				// reset
				this.didSubmit = false
				next('save')

				// scroll to element
				this.$nextTick(() => {
					this.$dispatch('scrollTo.tk.scrollable', '#prop-' + key)
				})
			},
			submitAddProperty () {
				if (this.addPropertyModal) {
					this.addPropertyModal.save()
				}
			},
			removeProperty (key) {
				if (confirm('Are you sure you want to remove this property?')) {
					delete this.model.props[key]
					this.model = Object.assign({}, this.model)
				}
			},
			hasProps (component) {
				return component.props && Object.keys(component.props).length
			}
		},
		created () {
			this.store.on('serviceLoading', () => {
				$('button[type="submit"]').prop('disabled', true)
			})

			this.store.on('serviceComplete', () => {
				setTimeout(() => {
					$('button[type="submit"]').prop('disabled', false)
				}, 200)
			})

			if (this.isEditView) {
				this.store.getComponent(this.componentId).then(({ component, sync }) => {
					if (component && sync) {
						this.model = merge(this.modelSyncFormatter(sync), component)
					}
					else if (sync && !component) {
						this.model = merge(this.modelSyncFormatter(sync), { name: sync.name })
					}
					else if (!sync && component) {
						this.model = component
					}
					if (sync) {
						this.sync = sync
					}
					if (!this.model.packageId) {
						this.model.packageId = this.packageId
					}
				})
			}
			else {
				this.model.packageId = this.packageId
			}
		},
		events: {
			'ready.tk.modal': function (modal) {
				this.addPropertyModal = modal
			}
		},
		components: {
			Modal,
			AlertNotification
		}
	}
</script>

<style lang="sass">
	.form-group-prop {
		border: 1px solid $panel-default-border;
		padding: 15px;
		border-radius: $panel-border-radius;
		h1, h2, h3  {
			margin: 0 0 15px;
		}
	}
</style>