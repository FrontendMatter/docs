<template>

	<!-- Sidebar Toggle Button -->
	<sidebar-toggle-button 
		sidebar-id="sidebar" 
		label="Left" 
		class="btn btn-primary">
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


</template>

<script>
	import PageHeading from '../components/page-heading.vue'
	import SidebarToggleButton from 'themekit-vue/src/vue/components/sidebar/sidebar-toggle-button.vue'

	export default {
		components: {
			PageHeading,
			SidebarToggleButton
		}
	}
</script>