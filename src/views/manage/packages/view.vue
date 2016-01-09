<template>

	<!-- Alert -->
	<div class="alert alert-success" v-if="alert">
		<button class="close" data-dismiss="alert">&times;</button>
		{{ alert.message }}
	</div>

	<!-- Service Loading -->
	<div class="alert alert-default" v-if="loading">Loading ...</div>

	<!-- Service Error -->
	<div class="alert alert-danger" v-if="serviceError">
		<h4>Service error</h4>
		<pre v-text="serviceError | json" class="m-b-0"></pre>
	</div>
	
	<!-- Display list -->
	<div class="alert alert-default" v-if="!loading && !components.length">No components to display.</div>
	<isotope v-else>
		<isotope-item class="col-md-4" v-for="component in components">
			<div class="panel panel-default panel-component">
				<div class="panel-heading">
					<h4 class="panel-title">
						<button class="close" @click="removeComponent(component.name)">&times;</button>
						{{ component.name }}
					</h4>
				</div>
				<div class="panel-body" @click="routeComponent(component.name)">
					{{ component.description }}
				</div>
				<ul class="list-group">
					<li class="list-group-item">{{ keys(component.props) }} properties <span class="badge">3 missing</span></li>
					<li class="list-group-item">5 events</li>
				</ul>
			</div>
		</isotope-item>
	</isotope>

</template>

<script>
	import { Isotope, IsotopeItem } from 'themekit-vue'
	import PackagesController from 'themekit-docs/src/mixins/packages-controller'
	import keys from 'mout/object/keys'

	export default {
		mixins: [
			PackagesController
		],
		route: {
			data ({ to, next }) {
				this.loadRouteDataTimeout = setTimeout(() => {
					this.$dispatch('loadedRouteData')
				}, 3000)
				this.$once('loadedRouteData', () => {
					clearTimeout(this.loadRouteDataTimeout)
					next()
				})
				this.onPackageComponentAdded(to.params.id, (component) => {
					this.onAdded(component)
					this.$dispatch('loadedRouteData')
				})
				this.onPackageComponentRemoved(to.params.id, this.onRemoved)
				this.onPackageComponentNone(to.params.id, next)
			}
		},
		data () {
			return {
				components: [],
				alert: null
			}
		},
		computed: {
			loading () {
				return this.$loadingRouteData || this.serviceLoading
			}
		},
		methods: {
			onAdded (data) {
				this.components.push(data)
			},
			onRemoved (name) {
				this.components = this.components.filter((c) => {
					return c.name !== name
				})
			},
			routeComponent (name) {
				this.$route.router.go({ name: 'package.edit.component', params: { id: this.$route.params.id, componentId: name } })
			},
			keys (obj) {
				return obj ? keys(obj).length : 0
			}
		},
		events: {
			alert (alert) {
				this.alert = alert
				setTimeout(() => {
					this.alert = null
				}, 5000)
			}
		},
		components: {
			Isotope,
			IsotopeItem
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