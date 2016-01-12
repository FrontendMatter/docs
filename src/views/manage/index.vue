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

	/* eslint no-unused-vars: 0 */
	const DEMOS_HOST = window.DEMOS_HOST = 'http://localhost:8081/'
	const API_HOST = window.API_HOST = 'http://localhost:3000/api'
	const FIREBASE_URL = window.FIREBASE_URL = 'https://popping-fire-3177.firebaseio.com'

	export default {
		replace: false,
		components: {
			Layout,
			Navbar
		}
	}
</script>