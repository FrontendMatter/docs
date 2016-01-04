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

		<layout-transition>

			<!-- Sidebar -->
			<sidebar-transition show
				slot="sidebar-push"
				position="left"
				sidebar-id="sidebar-inside"
				size="3"
				effect="push">

				<h4 class="sidebar-category">Open</h4>
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-transition>
			
			<!-- Sidebar -->
			<sidebar-transition
				v-for="effect in $root.effects.withPush"
				slot="sidebar-push"
				position="left"
				:sidebar-id="'sidebar-' + effect"
				size="2"
				:effect="effect">

				<h4 class="sidebar-category">Testing</h4>
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-transition>

			<!-- Sidebar -->
			<sidebar-transition
				v-for="effect in $root.effects.withoutPush"
				slot="sidebar"
				position="left"
				:sidebar-id="'sidebar-' + effect"
				size="2"
				:effect="effect">

				<h4 class="sidebar-category">Testing</h4>
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-transition>

			<!-- Sidebar -->
			<sidebar
				slot="sidebar"
				position="left"
				sidebar-id="sidebar-no-st-left"
				size="2">

				<h4 class="sidebar-category">Testing</h4>
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar>

			<!-- Sidebar -->
			<sidebar
				slot="sidebar"
				position="right"
				sidebar-id="sidebar-no-st-right"
				size="2">

				<h4 class="sidebar-category">Testing</h4>
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar>

			<div class="panel panel-default panel-body" style="margin: 20px;">

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button 
					sidebar-id="sidebar" 
					label="Outside" 
					class="btn btn-primary">
				</sidebar-toggle-button>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button 
					sidebar-id="sidebar-inside" 
					label="Inside" 
					class="btn btn-warning">
				</sidebar-toggle-button>
				
				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button
					v-for="effect in $root.effects.withPush" 
					:sidebar-id="'sidebar-' + effect" 
					:label="effect"
					class="btn btn-default">
				</sidebar-toggle-button>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button
					v-for="effect in $root.effects.withoutPush" 
					:sidebar-id="'sidebar-' + effect" 
					:label="effect"
					class="btn btn-default">
				</sidebar-toggle-button>

				<hr>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button 
					sidebar-id="sidebar-no-st-left" 
					label="Left NST" 
					class="btn btn-primary">
				</sidebar-toggle-button>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button 
					sidebar-id="sidebar-no-st-right" 
					label="Right NST" 
					class="btn btn-primary">
				</sidebar-toggle-button>

			</div>

			<!-- Content -->
			<router-view></router-view>
			<!-- // END Content -->

		</layout-transition>

	</layout-transition>
	<!-- // END layout -->

</template>

<script>
	import { Layout } from 'themekit-vue'
	import { LayoutTransition } from 'themekit-vue'
	import { Sidebar } from 'themekit-vue'
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
				effects: {
					withPush: [
						'push',
						'push-rotate',
						'push-3d-rotate-in',
						'push-3d-rotate-out',
						'push-3d-rotate-delay'
					],
					withoutPush: [
						'reveal',
						'slide-in',
						'slide-along',
						'slide-out-reverse',
						'scale-down',
						'scale-up',
						'scale-rotate',
						'open-door',
						'fall-down'
					]
				},
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
			Layout,
			LayoutTransition,
			Sidebar,
			SidebarTransition,
			SidebarToggleButton,
			SidebarMenu,
			SidebarCollapseItem,
			Navbar,
			TabsNav
		}
	}
</script>