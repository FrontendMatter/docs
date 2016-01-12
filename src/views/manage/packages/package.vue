<template>

	<div class="page-header">
		<button class="btn btn-primary pull-right" v-link="{ name: 'package.create.component', params: { id: $route.params.id } }">Add component</button>
		<a class="btn btn-link pull-right" v-link="{ name: 'packages' }">View packages</a>
		<h1>{{ $route.params.id }}</h1>
	</div>

	<alert-notification></alert-notification>

	<!-- Service Loading -->
	<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>
	
	<!-- Display list -->
	<isotope v-if="components">
		<isotope-item class="col-md-4" v-for="component in components">
			<div class="panel panel-default panel-component">
				<div class="panel-heading">
					<h4 class="panel-title">
						<button class="close" @click="removeComponent(component.name)">&times;</button>
						{{ component.name }}
					</h4>
				</div>
				<div class="panel-body" @click="routeComponent(component.name)">
					<template v-if="component.description">
						{{ component.description }}
					</template>
					<template v-else>
						<span class="label label-danger">missing</span>
					</template>
				</div>
				<ul class="list-group">
					<li class="list-group-item" v-if="component.props">
						<span class="pull-right">
							<i class="fa fa-circle text-red-500" v-if="missing(component.props)" :title="missing(component.props)"></i>
							<i class="fa fa-circle text-orange-500" v-if="outsync(component.name, 'props')"></i>
						</span>
						{{ keys(component.props) }} properties 
					</li>
				</ul>
			</div>
		</isotope-item>
	</isotope>
	<!-- // END List -->

	<!-- No components -->
	<div class="alert alert-default" v-if="!serviceLoading && !components.length">
		No components to display.
	</div>

</template>

<script>
	import { Isotope, IsotopeItem } from 'themekit-vue'
	import AlertNotification from 'themekit-docs/src/mixins/alert-notification'
	import ServiceUtil from 'themekit-docs/src/mixins/service-util'
	import forOwn from 'mout/object/forOwn'

	export default {
		mixins: [
			ServiceUtil
		],
		data () {
			return {
				components: [],
				model: [],
				sync: []
			}
		},
		methods: {
			removeComponent (name) {
				if (confirm('Are you sure you want to remove this component?')) {
					this.store.removeComponent(name)
				}
			},
			onAdded ({ component, sync, merge }) {
				if (component) {
					let exists = this.model.find((m) => m.name === component.name)
					if (!exists) {
						this.model.push(component)
					}
				}
				if (sync) {
					let exists = this.sync.find((s) => s.name === sync.name)
					if (!exists) {
						this.sync.push(sync)
					}
				}
				if (merge) {
					let exists = this.components.find((s) => s.name === merge.name)
					if (!exists) {
						this.components.push(merge)
					}
				}
			},
			onRemoved (name) {
				const models = ['model', 'sync', 'components']
				models.forEach((model) => {
					this[model] = this[model].filter((m) => m.name !== name)
				})
			},
			routeComponent (name) {
				this.$route.router.go({ name: 'package.edit.component', params: { id: this.$route.params.id, componentId: name } })
			},
			keys (obj) {
				return obj ? Object.keys(obj).length : 0
			},
			missing (obj) {
				let missing = 0
				forOwn(obj, (value) => {
					if (!value.description) {
						missing++
					}
				})
				return missing
			},
			component (componentName, collection) {
				return this[collection].find((c) => {
					return c.name === componentName
				})
			},
			outsync (componentName, prop) {
				let missing = 0
				let component = this.component(componentName, 'model')
				if (!component) {
					return missing
				}
				let syncComponent = this.component(componentName, 'sync')
				forOwn(component[prop], (value, key) => {
					if (syncComponent && typeof syncComponent[prop][key] === 'undefined') {
						missing++
					}
				})
				return missing
			}
		},
		created () {
			const packageId = this.$route.params.id

			this.store.getPackageComponents(packageId).then((components) => {
				this.components = components

				this.store.onPackageComponentAdded(packageId, this.onAdded)
				this.store.onPackageComponentRemoved(packageId, this.onRemoved)
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
	.panel-component {
		border-color: $grey-200;
		.panel-body {
			cursor: pointer;
			color: $grey-700;
		}
		.list-group {
			color: $grey-600;
			font-size: 1rem;
			.list-group-item {
				padding: 3px 10px;
				border-color: #f9f9f9;
				.badge {
					top: 2px;
					position: relative;
				}
			}
		}
	}
</style>