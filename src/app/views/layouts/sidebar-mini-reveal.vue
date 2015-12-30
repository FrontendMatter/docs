<template>
	
	<!-- Layout -->
	<layout>

		<!-- Navbar -->
		<navbar slot="navbar"></navbar>

		<!-- Sidebar -->
		<sidebar show mini reveal
			slot="sidebar"
			skin="blue"
			position="left"
			sidebar-id="sidebar">
		</sidebar>
	
		<!-- Layouts Overview -->
		<overview></overview>

	</layout>
	<!-- // END layout -->

</template>

<script>
	import Layout from 'themekit-vue/src/vue/components/layout/layout.vue'
	import Navbar from '../../components/layouts-navbar.vue'
	import Sidebar from '../../components/layouts-sidebar.vue'
	import Overview from '../../components/layouts-overview.vue'

	export default {
		components: {
			Layout,
			Navbar,
			Sidebar,
			Overview
		}
	}
</script>