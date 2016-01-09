<template>
	<div class="page-header">
		<button class="btn btn-success pull-right" v-link="{ name: 'package.create.component', params: { id: $route.params.id } }">Add component</button>
		<a class="btn btn-link pull-right" v-link="{ name: 'packages' }">View packages</a>
		<h1>{{ $route.params.id }}</h1>
	</div>
	<router-view></router-view>
</template>