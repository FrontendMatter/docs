<template>
	
	<!-- Layout -->
	<layout-transition>

		<!-- Navbar -->
		<navbar slot="navbar-content" fixed="top" in-content>

			<a v-if="!isPackageView" v-link="appHelpers.routeToPackages()" slot="brand" class="navbar-brand">ThemeKit Docs</a>
			
			<!-- Sidebar Toggle Button -->
			<sidebar-toggle-button
				v-if="isPackageView"
				slot="sidebar-toggle-button"
				class="toggle pull-left"
				sidebar-id="sidebar"
				icon="fa fa-bars">
			</sidebar-toggle-button>

			<tabs-nav nav-id="tabs-navbar"></tabs-nav>

			<div class="navbar-form navbar-left">
				<algolia-search-dropdown
					:algolia-app-id="appConfig.algolia.appId"
					:algolia-api-key="appConfig.algolia.apiKey"
					:algolia-indices="algoliaIndices">
				</algolia-search-dropdown>
			</div>
			
		</navbar>
		<!-- // END Navbar -->

		<!-- Sidebar -->
		<sidebar-transition 
			:show="isPackageView"
			slot="sidebar"
			position="left"
			sidebar-id="sidebar"
			size="3"
			effect="reveal">

			<a v-link="appHelpers.routeToPackages()" slot="brand" class="sidebar-brand"><i class="fa fa-fw fa-chevron-left"></i> Packages</a>

			<!-- Service Loading -->
			<p v-if="serviceLoading && !appState.pkg" class="sidebar-text">Loading ...</p>

			<template v-if="appState.pkg">
				<!-- Package menu -->
				<div class="sidebar-block bg-white">
					<h4 class="sidebar-category">{{ appState.pkg.packageIdData.packageName }}</h4>
					<p><a v-link="appHelpers.routeToPackage(packageName, version)">Package Overview</a></p>
					<!-- Versions -->
					<div class="form-group" v-if="versions.length">
						<label for="version">Version</label>
						<select id="version" class="form-control" v-model="selectedVersion">
							<option v-for="v in versions" value="{{ v.version }}" :selected="v.version === version">{{ v.version }}</option>
						</select>
					</div>
				</div>

				<!-- Sidebar Menus -->
				<sidebar-menu 
					v-for="menu in menus" 
					:class="menu.class" 
					:heading="menu.heading"
					v-if="menu.children.length">
					
					<!-- Sidebar Menu Items -->
					<sidebar-collapse-item 
						v-for="item in menu.children" 
						:model="item">
					</sidebar-collapse-item>
					<!-- // END Sidebar Menu Items -->

				</sidebar-menu>
				<!-- // END Sidebar Menus -->

			</template>

		</sidebar-transition>
		<!-- // END Sidebar -->

		<!-- Content -->
		<router-view></router-view>
		<!-- // END Content -->

	</layout-transition>
	<!-- // END layout -->

</template>

<script>
	import appStore from 'themekit-docs/src/js/app.store'
	import Store from 'themekit-docs/src/mixins/store'
	import { AlgoliaSearchDropdown } from 'vue-algolia'
	import { LayoutTransition, SidebarTransition } from 'themekit-vue'
	import { SidebarMenu, SidebarCollapseItem } from 'themekit-vue'
	import { Navbar, TabsNav, SidebarToggleButton } from 'themekit-vue'
	import Vue from 'vue'

	export default {
		mixins: [
			Store
		],
		data () {
			return {
				appConfig: appStore.config,
				appHelpers: appStore.helpers,
				appState: appStore.state,
				versions: [],
				selectedVersion: null,
				pages: [],
				components: []
			}
		},
		route: {
			activate: 'pageState'
		},
		computed: {
			page () {
				return this.appState.page
			},
			packageName () {
				return this.$route.params.packageName
			},
			isPackageView () {
				return this.packageName !== undefined
			},
			version () {
				return this.$route.params.version
			},
			packageId () {
				if (this.appState.pkg) {
					return this.appState.pkg.packageIdData.objectID
				}
			},
			packageVersionId () {
				if (this.appState.pkg) {
					return this.appState.pkg.packageVersionIdData.objectID
				}
			},
			menus () { 
				return [{
					heading: 'Pages',
					class: {
						'sm-item-bordered': true,
						'sm-active-button-bg': true,
						'sm-condensed': true
					},
					children: this.pages.map((page) => {
						return {
							label: page.data.title,
							route: this.appHelpers.routeToPage(this.packageName, this.version, page.packageVersionPageIdData.pageId)
						}
					})
				}, {
					heading: 'Components',
					class: {
						'sm-item-bordered': true,
						'sm-active-button-bg': true,
						'sm-condensed': true
					},
					children: this.components.map((component) => {
						return {
							label: component.label,
							route: this.appHelpers.routeToComponent(this.packageName, this.version, component.componentIdData.componentName)
						}
					})
				}]
			},
			algoliaIndices () {
				return [{
					name: 'components',
					label: 'Components',
					transformHit: this.transformComponentHit,
					queryOptions: (() => {
						let options = {
							hitsPerPage: 5,
							distinct: true
						}
						if (this.isPackageView) {
							options = Object.assign({}, options, {
								facets: '*',
								facetFilters: [
									`packageVersionIdData.packageId: ${ this.packageId }`,
									`packageVersionIdData.version: ${ this.version }`
								]
							})
						}
						return options
					})()
				}, {
					name: 'packages',
					label: 'Packages',
					transformHit: this.transformPackageHit,
					queryOptions: (() => {
						let options = {
							hitsPerPage: 5,
							distinct: true
						}
						return options
					})()
				}]
			}
		},
		methods: {
			excerpt () {
				return Vue.filter('excerpt').apply(null, [].slice.call(arguments))
			},
			pageState () {
				document.title = `${ this.page.title } | ${ this.page.appTitle }`
			},
			transformComponentHit (hit) {
				hit.route = this.appHelpers.routeToComponent(hit.packageIdData.packageName, hit.packageVersionIdData.version, hit.componentIdData.componentName)
				if (hit.description) {
					hit.description = this.excerpt(hit.description.data)
				}
				return hit
			},
			transformPackageHit (hit) {
				hit.route = this.appHelpers.routeToPackage(hit.packageIdData.packageName, hit.packageVersionIdData.version)
				hit.label = hit.packageIdData.packageName
				if (hit.description) {
					hit.description = this.excerpt(hit.description.data)
				}
				return hit
			},
			updateVersion () {
				this.selectedVersion = this.version
				this.getPackage()
			},
			routeVersion () {
				if (this.selectedVersion && this.version !== this.selectedVersion) {
					this.$router.go({ name: this.$route.name, params: { version: this.selectedVersion } })
				}
			},
			getPackage () {
				if (this.packageName) {
					return this.store.getPackageVersionByName(this.packageName, this.version).then((pkg) => this.appState.pkg = pkg)
				}
				this.appState.pkg = null
			},
			getPackageVersions () {
				if (this.appState.pkg) {
					this.store.getPackageVersions(this.packageId).then((versions) => this.versions = versions)
				}
			},
			onPackageChanged () {
				this.components = []
				this.pages = []
				if (this.appState.pkg) {
					this.store.getPackageVersionComponents(this.packageVersionId).then((components) => this.components = components)
					this.store.getPackageVersionPages(this.packageVersionId).then((pages) => this.pages = pages)
				}
				this.getPackageVersions()
			}
		},
		created () {
			this.getPackage()
		},
		watch: {
			page: {
				handler: 'pageState',
				deep: true
			},
			packageName: 'getPackage',
			version: 'updateVersion',
			selectedVersion: 'routeVersion',
			'appState.pkg': 'onPackageChanged',
			components (value) {
				this.appState.components = value
			}
		},
		components: {
			LayoutTransition,
			SidebarTransition,
			SidebarToggleButton,
			SidebarMenu,
			SidebarCollapseItem,
			Navbar,
			TabsNav,
			AlgoliaSearchDropdown
		}
	}
</script>