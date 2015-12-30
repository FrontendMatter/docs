<template>
	
	<!-- Layout -->
	<layout>
		
		<!-- Navbar -->
		<navbar slot="navbar"></navbar>

		<!-- Left Sidebar -->
		<sidebar show
			slot="sidebar"
			skin="blue"
			position="left"
			sidebar-id="sidebar"
			size="2">
		</sidebar>

		<!-- Right Sidebar Mini -->
		<sidebar show mini
			slot="sidebar"
			skin="white"
			position="right"
			sidebar-id="sidebar-mini"
			offset="sidebar-right">
		</sidebar>

		<!-- Right Sidebar Wide -->
		<sidebar show
			slot="sidebar"
			skin="blue"
			position="right"
			sidebar-id="sidebar-right"
			size="2"
			visible="md-up">
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