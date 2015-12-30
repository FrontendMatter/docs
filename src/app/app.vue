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
		<sidebar-transition
			v-for="effect in $root.effects.withPush"
			slot="sidebar-push"
			position="left"
			:sidebar-id="'sidebar-' + effect"
			size="2"
			:effect="effect">

			<sidebar-block heading="testing">
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-block>
		</sidebar-transition>

		<!-- Sidebar -->
		<sidebar-transition
			v-for="effect in $root.effects.withoutPush"
			slot="sidebar"
			position="left"
			:sidebar-id="'sidebar-' + effect"
			size="2"
			:effect="effect">

			<sidebar-block heading="testing">
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-block>
		</sidebar-transition>

		<!-- Sidebar -->
		<sidebar
			slot="sidebar"
			position="left"
			sidebar-id="sidebar-no-st-left"
			size="2">

			<sidebar-block heading="testing">
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-block>
		</sidebar>

		<!-- Sidebar -->
		<sidebar
			slot="sidebar"
			position="right"
			sidebar-id="sidebar-no-st-right"
			size="2">

			<sidebar-block heading="testing">
				<p class="sidebar-text">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
				</p>
			</sidebar-block>
		</sidebar>

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
	import LayoutTransition from 'themekit-vue/src/vue/components/layout/layout-transition.vue'
	import Sidebar from 'themekit-vue/src/vue/components/sidebar/sidebar.vue'
	import SidebarTransition from 'themekit-vue/src/vue/components/sidebar/sidebar-transition.vue'
	import SidebarToggleButton from 'themekit-vue/src/vue/components/sidebar/sidebar-toggle-button.vue'
	import SidebarMenu from 'themekit-vue/src/vue/components/sidebar-menu/sidebar-menu.vue'
	import SidebarCollapseItem from 'themekit-vue/src/vue/components/sidebar-collapse-menu/sidebar-collapse-item.vue'
	import Navbar from 'themekit-vue/src/vue/components/navbar/navbar.vue'
	import TabsNav from 'themekit-vue/src/vue/components/tabs/tabs-nav.vue'

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
				menus: [{
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
						'ssm-item-bordered': true,
						'sm-active-button-bg': true,
						'sm-condensed': false
					},
					children: [
						{ label: 'Sidebar', route: { name: 'component', params: { id: 'sidebar' } } }, 
						{ label: 'Sidebar Toggle Button', route: { name: 'component', params: { id: 'sidebar-toggle-button' } } }, 
						{ label: 'Sidebar Menu', 
							children: [
								{ label: 'Sidebar Menu', route: { name: 'component', params: { id: 'sidebar-menu' } } }, 
								{ label: 'Sidebar Menu Item', route: { name: 'component', params: { id: 'sidebar-menu-item' } } }
							] 
						}, 
						{ label: 'Sidebar Elements', 
							children: [
								{ label: 'Sidebar Block', route: { name: 'component', params: { id: 'sidebar-block' } } }, 
								{ label: 'Sidebar Feed', route: { name: 'component', params: { id: 'sidebar-feed' } } },
								{ label: 'Sidebar Feed Item', route: { name: 'component', params: { id: 'sidebar-feed-item' } } },
								{ label: 'Sidebar Tabs', route: { name: 'component', params: { id: 'sidebar-tabs' } } },
								{ label: 'Sidebar Tab Pane', route: { name: 'component', params: { id: 'sidebar-tab-pane' } } }
							] 
						},
						{ label: 'Navbar', route: { name: 'component', params: { id: 'navbar' } } },
						{ label: 'Navbar Elements' },
						{ label: 'Layout Elements' },
						{ label: 'Cover', 
							children: [
								{ label: 'Cover Banner', route: { name: 'component', params: { id: 'cover-banner' } } }, 
								{ label: 'Cover Link', route: { name: 'component', params: { id: 'cover-link' } } },
								{ label: 'Cover Overlay', route: { name: 'component', params: { id: 'cover-overlay' } } },
								{ label: 'Cover Panel', route: { name: 'component', params: { id: 'cover-panel' } } }
							] 
						},
						{ label: 'Expandable', 
							children: [
								{ label: 'Expandable' }, 
								{ label: 'Expandable Panel' }
							] 
						},
						{ label: 'Isotope' },
						{ label: 'Mprogress' },
						{ label: 'Carousel', 
							children: [
								{ label: 'Carousel' }, 
								{ label: 'Carousel Item' }
							] 
						},
						{ label: 'Tabs', 
							children: [
								{ label: 'Tabs' }, 
								{ label: 'Tab Pane' },
								{ label: 'Tabs Nav' }
							] 
						},
						{ label: 'Modal' },
						{ label: 'Dropzone', 
							children: [
								{ label: 'Dropzone' }, 
								{ label: 'Dropzone Control' },
								{ label: 'Dropzone Control Progress' }
							] 
						}
					]
				}]
			}
		},
		components: {
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