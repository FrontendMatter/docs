<template>
	
	<!-- Layout -->
	<layout>

		<!-- Navbar -->
		<navbar slot="navbar"></navbar>

		<!-- Layouts Overview -->
		<overview></overview>

	</layout>
	<!-- // END layout -->

</template>

<script>
	import Layout from 'themekit-vue/src/vue/components/layout/layout.vue'
	import Navbar from '../../components/layouts-navbar.vue'
	import Overview from '../../components/layouts-overview.vue'

	export default {
		components: {
			Layout,
			Navbar,
			Overview
		}
	}
</script>