<template>
	<div class="jumbotron text-center bg-transparent margin-none">
		<h1 v-if="title">{{ title }}</h1>
		<p><slot name="description">{{ description }}</slot></p>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			},
			description: {
				type: String
			}
		}
	}
</script>