<template>
	<tabs nav-id="tabs-navbar">
		<tab-pane label="Layouts" active>

			<!-- Page Heading -->
			<page-heading 
				title="Layout KIT"
				description="Get full control of the layout of your pages and easily create layouts from the most simple - fluid or boxed layouts - to the most advanced layouts with up to 6 sidebars on the same page and specially crafted layouts for complex web apps.">
			</page-heading>
			<!-- // END Page Heading -->

			<!-- Isotope -->
			<isotope>
				
				<!-- Grid Column -->
				<div class="col-lg-4 col-md-6">
					<div class="panel panel-default">
						<div class="panel-body">
							<h4 class="panel-title">Basic Fluid Layout</h4>
						</div>
						<div class="panel-footer">
							Most simple and common fluid layouts to get started from.
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'fluid-one-sidebar' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'fluid-one-sidebar'"
								src="../assets/images/layouts/1-sidebar-left.jpg" 
								label-xs="1 Sidebar" 
								:link="{ name: 'fluid-one-sidebar' }">
							</cover-link>
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'no-sidebar' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'no-sidebar'"
								src="../assets/images/layouts/no-sidebar.jpg" 
								label-xs="No Sidebar" 
								:link="{ name: 'no-sidebar' }">
							</cover-link>
						</div>
					</div>
				</div>
				<!-- // END Grid Column -->

				<!-- Grid Column -->
				<div class="col-lg-4 col-md-6">
					<div class="panel panel-default">
						<div class="panel-body">
							<h4 class="panel-title">Multiple Sidebars - Fluid Layout</h4>
						</div>
						<div class="panel-footer">
							More complex examples of fluid layouts with multiple sidebars on the same page, including application layouts.
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'fluid-two-sidebars' }">
						<div class="panel-body">

							<!-- Cover Link -->
							<cover-link 
								:hover="$route.name !== 'fluid-two-sidebars'"
								src="../assets/images/layouts/2-sidebars.jpg" 
								label-xs="2 Sidebars" 
								:link="{ name: 'fluid-two-sidebars' }">
							</cover-link>
							<!-- // END Cover Link -->

							<!-- Toggle Buttons -->
							<div class="toggle-buttons">
								
								<div class="btn-group">

									<!-- Sidebar Toggle Button -->
									<sidebar-toggle-button 
										sidebar-id="sidebar" 
										label="L" 
										class="btn btn-primary">
									</sidebar-toggle-button>
									<!-- // END Sidebar Toggle Button -->

									<!-- Sidebar Toggle Button -->
									<sidebar-toggle-button 
										sidebar-id="sidebar-right" 
										label="R" 
										class="btn btn-primary">
									</sidebar-toggle-button>
									<!-- // END Sidebar Toggle Button -->

								</div>

							</div>
							<!-- // END Toggle Buttons -->

						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'fluid-three-sidebars' }">
						<div class="panel-body">

							<!-- Cover Link -->
							<cover-link
								:hover="$route.name !== 'fluid-three-sidebars'"
								src="../assets/images/layouts/3-sidebars.jpg" 
								label-xs="3 Sidebars" 
								:link="{ name: 'fluid-three-sidebars' }">
							</cover-link>
							<!-- // END Cover Link -->

							<!-- Toggle Buttons -->
							<div class="toggle-buttons">

								<!-- Sidebar Toggle Button -->
								<sidebar-toggle-button 
									sidebar-id="sidebar" 
									label="L" 
									class="btn btn-primary">
								</sidebar-toggle-button>
								<!-- // END Sidebar Toggle Button -->
								
								<div class="btn-group">

									<!-- Sidebar Toggle Button -->
									<sidebar-toggle-button 
										sidebar-id="sidebar-mini" 
										label="R1" 
										class="btn btn-primary">
									</sidebar-toggle-button>
									<!-- // END Sidebar Toggle Button -->

									<!-- Sidebar Toggle Button -->
									<sidebar-toggle-button 
										sidebar-id="sidebar-right" 
										label="R2" 
										class="btn btn-primary">
									</sidebar-toggle-button>
									<!-- // END Sidebar Toggle Button -->
									
								</div>

							</div>
							<!-- // END Toggle Buttons -->

						</div>
					</div>
				</div>
				<!-- // END Grid Column -->
				
				<!-- Grid Column -->
				<div class="col-lg-4 col-md-6">
					<div class="panel panel-default">
						<div class="panel-body">
							<h4 class="panel-title">Sidebar Sizes</h4>
						</div>
						<div class="panel-footer">
							There are 3 predefined sidebar sizes of 56px (mini menu with icons), a sidebar of 200px (the most common) and a larger 250px sidebar size.
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'sidebar-mini' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'sidebar-mini'"
								src="../assets/images/layouts/sidebar-size-1.jpg" 
								label-xs="Sidebar Size 1 (56px)" 
								:link="{ name: 'sidebar-mini' }">
							</cover-link>
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'sidebar-mini-reveal' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'sidebar-mini-reveal'"
								src="../assets/images/layouts/sidebar-size-1-reveal.jpg" 
								label-xs="Sidebar Size 1 (56px) with Reveal" 
								:link="{ name: 'sidebar-mini-reveal' }">
							</cover-link>
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'sidebar-size-2' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'sidebar-size-2'"
								src="../assets/images/layouts/sidebar-size-2.jpg" 
								label-xs="Sidebar Size 2 (200px)" 
								:link="{ name: 'sidebar-size-2' }">
							</cover-link>
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'sidebar-size-3' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'sidebar-size-3'"
								src="../assets/images/layouts/sidebar-size-3.jpg" 
								label-xs="Sidebar Size 3 (250px)" 
								:link="{ name: 'sidebar-size-3' }">
							</cover-link>
						</div>
					</div>
					<div class="panel panel-default" 
						:class="{ 'panel-primary': $route.name === 'sidebar-percentage' }">
						<div class="panel-body">
							<cover-link
								:hover="$route.name !== 'sidebar-percentage'"
								src="../assets/images/layouts/sidebar-percentage.jpg" 
								label-xs="Percentage Sidebar Sizes (25-100%)" 
								:link="{ name: 'sidebar-percentage' }">
							</cover-link>
						</div>
					</div>
				</div>
				<!-- // END Grid Column -->
				
				<!-- Grid Column -->
				<div class="col-lg-4 col-md-6">
					<div class="panel panel-default">
						<div class="panel-body">
							<h4 class="panel-title">Fixed Layouts</h4>
						</div>
						<div class="panel-footer">
							Fixed or boxed layouts with centered content showcasing most of the sidebar options available with fluid layouts.
						</div>
						<ul class="list-group">
							<li class="list-group-item">
								<a href="fixed-no-sidebar.html">No Sidebar</a>
							</li>
							<li class="list-group-item">
								<a href="fixed-sidebar-overlay-single-toggle.html">Overlay Sidebars (Single Toggle Button)</a>
							</li>
							<li class="list-group-item">
								<a href="fixed-sidebar-overlay-multiple-toggle.html">Overlay Sidebars (Multiple Toggle Buttons)</a>
							</li>
							<li class="list-group-item">
								<a href="fixed-2-inner-sidebars.html">2 Inner Sidebars</a>
							</li>
							<li class="list-group-item">
								<a href="fixed-3-inner-sidebars.html">3 Inner Sidebars</a>
							</li>
						</ul>
					</div> 
				</div>
				<!-- // END Grid Column -->
				
				<!-- Grid Column -->
				<div class="col-lg-4 col-md-6">
					<div class="panel panel-default">
						<div class="panel-body">
							<h4 class="panel-title">Footer Variations</h4>
						</div>
						<div class="panel-footer">
							Footer options ranging from the most simple footer with just a line of copyright notice, to sticky footers and more complex footer menus.
						</div>
						<ul class="list-group">
							<li class="list-group-item">
								<a href="layout-footer-simple.html">Simple Footer</a>
							</li>
							<li class="list-group-item">
								Footer Menu (coming soon)
							</li>
						</ul>
					</div>
				</div>
				<!-- // END Grid Column -->

			</isotope>
			<!-- // END Isotope -->

		</tab-pane>
		<tab-pane icon="fa fa-fw fa-html5" label="HTML">
			<pre><code v-highlight="html" lang="html"></code></pre>
		</tab-pane>
		<tab-pane label="JavaScript" icon="fa fa-fw fa-code">
			<pre><code v-highlight="javascript" lang="javascript"></code></pre>
		</tab-pane>
	</tabs>
</template>

<script>
	import Isotope from 'themekit-vue/src/vue/components/grid/isotope.vue'
	import CoverLink from 'themekit-vue/src/vue/components/cover/cover-link.vue'
	import PageHeading from './page-heading.vue'
	import SidebarToggleButton from 'themekit-vue/src/vue/components/sidebar/sidebar-toggle-button.vue'
	import Tabs from 'themekit-vue/src/vue/components/tabs/tabs.vue'
	import TabPane from 'themekit-vue/src/vue/components/tabs/tab-pane.vue'
	import camelCase from 'mout/string/camelCase'

	export default {
		computed: {
			sidebars () {
				let html = ''
				let propsCast = ['show', 'mini', 'reveal']
				let props = ['sidebar-id', 'position', 'visible', 'size', 'offset']
				this.$parent.queue.forEach((sidebar) => {
					html += `
						<!-- Sidebar -->
						<sidebar slot="sidebar" `

					propsCast.forEach((p) => {
						let value = sidebar[camelCase(p)]
						if (value) {
							html += `
								:${ p }="${ value }"`
						}
					})
					props.forEach((p) => {
						let value = sidebar[camelCase(p)]
						if (value) {
							html += `
								${ p }="${ sidebar[camelCase(p)] }"`
						}
					})
					html += `>
						</sidebar>
						<!-- // END Sidebar -->
					`
				})
				return html.trim()
			},
			html () {
				return `
					<!-- Layout -->
					<layout>

						${ this.sidebars }

						<!-- The layout content goes here -->

					</layout>
					<!-- // END Layout -->
				`.trim()
			},
			javascript () {
				let components = [{
					name: 'Layout',
					view: 'layout/layout'
				}]
				if (this.$parent.queue.length) {
					components.push({
						name: 'Sidebar',
						view: 'sidebar/sidebar'
					})
				}
				let html = '/* Import component(s) */'
				let names = []
				components.forEach((component) => {
					html += `
						import ${ component.name } from 'themekit-vue/src/vue/components/${ component.view }.vue'`
					names.push(component.name)
				})
				html += `

					/* Create a Vue instance */
					new Vue({
						el: 'body',
						replace: false,
						components: {
							${ names.join(',\n') }
						}
					})
				`
				return html.trim()
			}
		},
		components: {
			Isotope,
			CoverLink,
			PageHeading,
			SidebarToggleButton,
			Tabs,
			TabPane
		}
	}
</script>

<style lang="less" scoped>
	.panel:not(.panel-primary) {
		.cover {
			margin-bottom: 0;
		}
		.toggle-buttons {
			display: none;
		}
	}
	pre {
		padding: 0;
		border: none;
	}
</style>