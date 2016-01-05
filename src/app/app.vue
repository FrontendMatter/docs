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
			
		</navbar>
		<!-- // END Navbar -->

		<!-- Sidebar -->
		<sidebar-transition show
			slot="sidebar"
			position="left"
			sidebar-id="sidebar"
			size="3"
			effect="reveal">

			<a slot="brand" href="index.html" class="sidebar-brand">ThemeKit</a>

			<!-- Sidebar Menus -->
			<sidebar-menu 
				v-for="menu in menus" 
				:class="menu.class" 
				:heading="menu.heading">
				
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
	import { LayoutTransition } from 'themekit-vue'
	import { SidebarTransition } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	import { SidebarMenu } from 'themekit-vue'
	import { SidebarCollapseItem } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'
	import { TabsNav } from 'themekit-vue'
	import Docs from 'themekit-vue/resources/docs/dist/docs'
	import keys from 'mout/object/keys'
	import merge from 'mout/object/merge'
	import hyphenate from 'mout/string/hyphenate'
	import unhyphenate from 'mout/string/unhyphenate'
	import properCase from 'mout/string/properCase'

	export default {
		replace: false,
		data () {
			return {
				components: []
			}
		},
		computed: {
			menus () { 
				return [{
					class: {
						'sm-icons-right': false,
						'sm-icons-block': true,
						'sm-bordered': true,
						'sm-condensed': true
					},
					children: [
						{ label: 'Overview', icon: 'fa fa-home', route: {} }
					]
				}, {
					heading: 'Components',
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
				if (this.components && this.components.length) {
					this.components.forEach((component) => {
						components.push({
							label: component.label,
							route: {
								name: 'component',
								params: {
									id: component.id
								}
							}
						})
					})
				}
				return components
			}
		},
		ready () {
			this.components = keys(Docs).map((pascalId) => {
				let component = Docs[pascalId]
				let id = hyphenate(pascalId)
				return merge({
					id: id,
					label: properCase(unhyphenate(id))
				}, component)
			})
		},
		components: {
			LayoutTransition,
			SidebarTransition,
			SidebarToggleButton,
			SidebarMenu,
			SidebarCollapseItem,
			Navbar,
			TabsNav
		}
	}
</script>