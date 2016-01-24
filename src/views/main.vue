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
				<algolia-instantsearch-dropdown
					:algolia-app-id="appConfig.algolia.appId"
					:algolia-api-key="appConfig.algolia.apiKey"
					algolia-index="components"
					:transform-hit="transformHit"
					search-box-placeholder="Search components ...">
				</algolia-instantsearch-dropdown>
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

			<template v-if="isPackageView">

				<a v-link="appHelpers.routeToPackages()" slot="brand" class="sidebar-brand"><i class="fa fa-fw fa-chevron-left"></i> Packages</a>

				<div class="sidebar-block bg-white">
					<h4 class="sidebar-category">{{ packageId }}</h4>
					<a v-link="appHelpers.routeToPackage(packageId)">Package Overview</a>
				</div>

				<!-- Service Loading -->
				<p v-if="!components.length && serviceLoading" class="sidebar-text">Loading ...</p>

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
	import { AlgoliaInstantsearchDropdown } from 'vue-algolia'
	import { LayoutTransition } from 'themekit-vue'
	import { SidebarTransition } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	import { SidebarMenu } from 'themekit-vue'
	import { SidebarCollapseItem } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'
	import { TabsNav } from 'themekit-vue'

	export default {
		replace: false,
		mixins: [
			Store
		],
		data () {
			return {
				components: [],
				pages: [],
				appConfig: appStore.config,
				appHelpers: appStore.helpers,
				appState: appStore.state
			}
		},
		route: {
			canReuse: false
		},
		computed: {
			isPackageView () {
				return this.packageId !== undefined
			},
			packageId () {
				return this.$route.params.id
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
							label: page.title,
							route: this.appHelpers.routeToPage(page.packageId, page.slug, page.pageId)
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
							route: this.appHelpers.routeToComponent(component.packageId, component.name)
						}
					})
				}]
			}
		},
		methods: {
			transformHit (hit) {
				hit.route = this.appHelpers.routeToComponent(hit.packageId, hit.name)
				return hit
			},
			loadPackageSidebar () {
				this.store.getPackageComponents(this.packageId).then((components) => {
					this.components = components.map(({ merge }) => merge)
				})
				this.store.getPages(this.packageId).then((pages) => {
					this.pages = pages
				})
			}
		},
		created () {
			if (this.isPackageView) {
				this.loadPackageSidebar()
			}
		},
		watch: {
			packageId (value) {
				this.components = []
				this.pages = []
				if (value) {
					this.loadPackageSidebar()
				}
			},
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
			AlgoliaInstantsearchDropdown
		}
	}
</script>