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
	import keys from 'mout/object/keys'
	import merge from 'mout/object/merge'
	import hyphenate from 'mout/string/hyphenate'
	import unhyphenate from 'mout/string/unhyphenate'
	import properCase from 'mout/string/properCase'

	/* eslint no-unused-vars: 0 */
	const DEMOS_HOST = window.DEMOS_HOST = 'http://localhost:8081/'
	const API_HOST = window.API_HOST = 'http://localhost:3000/api'

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
								},
								query: {
									path: this.$route.query.path
								}
							}
						})
					})
				}
				return components
			}
		},
		ready () {
			var packageName = this.$route.query.path
			var packageURL = API_HOST
			if (packageName) {
				packageURL += '?path=' + packageName
			}

			this.$http.get(packageURL).then((response) => {
				var s = document.createElement('script')
				s.type = 'text/javascript'
				s.async = true
				s.src = packageURL
				var h = document.getElementsByTagName('head')[0]
				h.appendChild(s)
				s.addEventListener('load', () => {
					/*global Docs*/
					let Components = Docs.Components
					this.components = keys(Components).map((pascalId) => {
						let component = Components[pascalId]
						let id = hyphenate(pascalId)
						return merge({
							id: id,
							label: properCase(unhyphenate(id))
						}, component)
					})
				})
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