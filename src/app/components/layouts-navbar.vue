<template>
	
	<!-- Navbar -->
	<navbar fixed="top" in-content>
		<tabs-nav nav-id="tabs-navbar"></tabs-nav>
	</navbar>

</template>

<script>
	import Navbar from 'themekit-vue/src/vue/components/navbar/navbar.vue'
	import TabsNav from 'themekit-vue/src/vue/components/tabs/tabs-nav.vue'

	export default {
		components: {
			Navbar,
			TabsNav
		}
	}
</script>