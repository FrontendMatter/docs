<template>
	
	<!-- Layout -->
	<layout-transition>

		<!-- Navbar -->
		<navbar slot="navbar-content" fixed="top" in-content>
			
			<!-- Sidebar Toggle Button -->
			<sidebar-toggle-button
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
		<sidebar-transition show
			slot="sidebar"
			position="left"
			sidebar-id="sidebar"
			size="3"
			effect="reveal">

			<a slot="brand" href="index.html" class="sidebar-brand">ThemeKit Docs</a>

			<!-- Service Loading -->
			<p v-if="serviceLoading" class="sidebar-text">Loading ...</p>

			<!-- Sidebar Menus -->
			<sidebar-menu 
				v-for="menu in menus" 
				:class="menu.class" 
				:heading="menu.heading"
				v-if="!serviceLoading && components.length">
				
				<!-- Sidebar Menu Items -->
				<sidebar-collapse-item 
					v-for="item in menu.children" 
					:model="item">
				</sidebar-collapse-item>
				<!-- // END Sidebar Menu Items -->

			</sidebar-menu>
			<!-- // END Sidebar Menus -->

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
	import PackageStore from 'themekit-docs/src/mixins/package-store'
	import AlgoliaInstantsearchDropdown from 'themekit-docs/src/components/algolia-instantsearch-dropdown'
	import { LayoutTransition } from 'themekit-vue'
	import { SidebarTransition } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	import { SidebarMenu } from 'themekit-vue'
	import { SidebarCollapseItem } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'
	import { TabsNav } from 'themekit-vue'

	export default {
		mixins: [
			PackageStore
		],
		data () {
			return {
				components: [],
				appConfig: appStore.config,
				appHelpers: appStore.helpers,
				appState: appStore.state
			}
		},
		computed: {
			menus () { 
				return [{
					heading: 'Components',
					label: 'Components',
					class: {
						'sm-item-bordered': true,
						'sm-active-button-bg': true,
						'sm-condensed': true
					},
					children: this.componentsMenu
				}]
			},
			componentsMenu () {
				let components = []
				this.components.forEach((component) => {
					components.push({
						label: component.label,
						route: {
							name: 'component',
							params: {
								id: this.$route.params.id,
								componentId: component.name
							}
						}
					})
				})
				return components
			}
		},
		methods: {
			transformHit (hit) {
				hit.route = this.appHelpers.routeToComponent(this.$route.params.id, hit.name)
				return hit
			}
		},
		created () {
			this.store.getPackageComponents(this.$route.params.id).then((components) => {
				this.components = components
				this.appState.components = components
			})
		},
		destroyed () {
			this.appState.components = null
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