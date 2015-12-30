<template>
	
	<!-- Sidebar -->
	<sidebar 
		:show="show" 
		:mini="mini"
		:reveal="reveal"
		:skin="skin"
		:position="position"
		:sidebar-id="sidebarId"
		:size="size"
		:offset="offset"
		:visible="visible">

		<a href="index.html" class="sidebar-brand">ThemeKit</a>

		<sidebar-block heading="Heading">
			<p class="sidebar-text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
			</p>
		</sidebar-block>
	</sidebar>

</template>

<script>
	import Sidebar from 'themekit-vue/src/vue/components/sidebar/sidebar.vue'
	import SidebarBlock from 'themekit-vue/src/vue/components/sidebar-block/sidebar-block.vue'

	export default {
		components: {
			Sidebar,
			SidebarBlock
		},
		props: {
			size: {
				type: String,
				default: '2'
			},
			position: {
				type: String,
				default: 'left'
			},
			sidebarId: {
				type: String,
				required: true
			},
			skin: {
				type: String,
				default: 'default'
			},
			show: {
				type: Boolean,
				default: false
			},
			mini: {
				type: Boolean
			},
			reveal: {
				type: Boolean
			},
			offset: {
				type: String
			},
			visible: {
				type: String
			}
		}
	}
</script>