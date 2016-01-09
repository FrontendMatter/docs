<template>
	
	<!-- Service Error -->
	<div class="alert alert-danger" v-if="serviceError">
		<h4>Service error</h4>
		<pre v-text="serviceError | json" class="m-b-0"></pre>
	</div>

	<!-- Loading -->
	<div class="alert alert-default" v-if="loading">Loading data ...</div>

	<!-- Form -->
	<template v-if="!loading">
		<validator name="validation">
			<form @submit.prevent="create">
				<div class="form-group" 
					:class="{ 'has-error': ($validation.name.dirty || didSubmit) && $validation.name.invalid }">
					<label for="name">Component name</label>
					<input type="text" 
						id="name"
						class="form-control" 
						v-model="model.name" 
						v-validate:name="{ required: { rule: true, message: 'The component name is required' } }"
						autofocus />
					<p class="help-block" v-for="msg in $validation.name.messages">{{ msg }}</p>
				</div>
				<div class="form-group" 
					:class="{ 'has-error': ($validation.description.dirty || didSubmit) && $validation.description.invalid }">
					<label for="description">Description</label>
					<textarea id="description"
						class="form-control" 
						v-model="model.description" 
						v-validate:description="{ required: { rule: true, message: 'The component description is required' } }">
					</textarea>
					<p class="help-block" v-for="msg in $validation.description.messages">{{ msg }}</p>
				</div>

				<template v-if="model.props">
					<div class="page-header">
						<h2>Properties</h2>
					</div>
					<div class="form-group" 
						:class="{ 'has-error': ($validation.description.dirty || didSubmit) && $validation.description.invalid }"
						v-for="(key, prop) in model.props">
						<h3>{{ prop.name }}</h3>
						<label for="prop-{{ key }}">Description</label>
						<textarea id="prop-{{ key }}"
							class="form-control" 
							v-model="model.props[ key ].description" 
							v-validate:description="{ required: { rule: true, message: 'The component description is required' } }">
						</textarea>
						<p class="help-block" v-for="msg in $validation.description.messages">{{ msg }}</p>
						<pre v-text="model.props[ key ] | json"></pre>
					</div>
				</template>

				<div class="form-group">
					<button type="button" class="btn btn-default" @click="cancel">Cancel</button>
					<button type="submit" class="btn btn-primary">Save</button>
				</div>
			</form>
		</validator>
		<hr>
		<pre v-text="model | json"></pre>
	</template>
</template>

<script>
	import PackagesController from 'themekit-docs/src/mixins/packages-controller'
	
	export default {
		mixins: [
			PackagesController
		],
		data () {
			return {
				model: {
					name: null,
					description: null,
					props: [],
					events: [],
					requirements: [],
					demo: null,
					packages: {}
				},
				didSubmit: false
			}
		},
		route: {
			data ({ to, next }) {
				if (!to.params.componentId) {
					return next()
				}
				this.getComponent(to.params.componentId, (data) => {
					if (data) {
						this.model = data
					}
					next()
				}, (e) => {
					next()
				})
			}
		},
		computed: {
			loading () {
				return this.serviceLoading || this.$loadingRouteData
			}
		},
		methods: {
			create () {
				this.didSubmit = true
				if (this.$validation.valid) {
					this.setComponent(this.model.name, this.model).then(() => {
						this.success('The component was saved.')
					})
				}
			},
			goToPackage () {
				this.$route.router.go({ name: 'package', params: { id: this.$route.params.id } })
			},
			cancel () {
				this.goToPackage()
			},
			success (message) {
				let root = this.$root
				setTimeout(() => {
					root.$broadcast('alert', { message: message })
				}, 100)
				this.goToPackage()
			}
		},
		created () {
			this.model.packages[this.$route.params.id] = true
		}
	}
</script>