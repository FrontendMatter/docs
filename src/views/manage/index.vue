<template>
	
	<!-- Layout -->
	<layout>

		<!-- Navbar -->
		<navbar slot="navbar" fixed="top">
			<a href="" class="navbar-brand" slot="brand">Manage Docs</a>
			<ul class="nav navbar-nav">
				<li :class="{ active: $route.name === 'packages' }">
					<a v-link="{ name: 'packages' }">Packages</a>
				</li>
			</ul>
		</navbar>
		<!-- // END Navbar -->

		<!-- Content -->
		<div class="container">
			<router-view></router-view>
		</div>
		<!-- // END Content -->

	</layout>
	<!-- // END layout -->

</template>

<script>
	import { Layout } from 'themekit-vue'
	import { Navbar } from 'themekit-vue'

	export default {
		replace: false,
		components: {
			Layout,
			Navbar
		}
	}
</script>