<template>
	<tabs nav-id="tabs-navbar" :class="tabs">
		<tab-pane active icon="fa fa-fw fa-file-text-o" label="Docs">
			<div class="docs-container">
				<h1 class="component-name">{{ componentName }}</h1>
				<template v-if="component">
					{{{ component.description | unindent | marked }}}

					<h3>Properties</h3>
					<template v-for="(name, prop) in component.props">
						<h4>{{ name }}</h4>
						<p>{{ prop.description }}</p>
						<h5>type: <code>{{ prop.type.name }}</code></h5>
						<h5 v-if="prop.default">default: <code>{{ prop.default }}</code></h5>
						<hr>
					</template>
				</template>

				<template v-if="!component && !componentError">
					<h3>Loading component ...</h3>
				</template>

				<template v-if="componentError">
					<h3>The component was not found.</h3>
					<p>{{ componentError }}</p>
				</template>
			</div>
		</tab-pane>
		<tab-pane id="demo" label="Demo" v-if="hasDemo">
			<iframe :src="demoURL" frameborder="0"></iframe>
		</tab-pane>
	</tabs>
</template>

<script>
	import Tabs from 'themekit-vue/src/vue/components/tabs/tabs.vue'
	import TabPane from 'themekit-vue/src/vue/components/tabs/tab-pane.vue'
	import marked from 'marked'

	marked.setOptions({
		highlight: function (code) {
			return require('highlight.js').highlightAuto(code).value
		}
	})

	function unindent (str) {
		var match = str.match(/^[ \t]*(?=\S)/gm)
		if (!match) {
			return str
		}
		var indent = Math.min.apply(Math, match.map(function (el) {
			return el.length
		}))
		var re = new RegExp('^[ \\t]{' + indent + '}', 'gm')
		return indent > 0 ? str.replace(re, '') : str
	}

	export default {
		filters: {
			marked: marked,
			unindent: unindent
		},
		data () {
			return {
				component: null,
				componentError: null,
				tabId: null
			}
		},
		route: {
			canReuse: false,
			data () {
				try {
					return {
						component: require(`themekit-vue/docs/components/${ this.$route.params.id }.vue`)
					}
				}
				catch (e) {
					return {
						componentError: e.message
					}
				}
			}
		},
		computed: {
			demoURL () {
				return `demo.html#!\/${ this.$route.params.id }`
			},
			tabs () {
				return {
					'tabs-demo': this.tabId === 'demo'
				}
			},
			hasDemo () {
				try {
					require(`themekit-vue/docs/demo/${ this.$route.params.id }.vue`)
					return true
				}
				catch (e) {
					return false
				}
			},
			componentName () {
				return this.$route.params.id.replace(/\-/g, ' ')
			}
		},
		components: {
			Tabs,
			TabPane
		},
		events: {
			'shown.tk.tab': function (tabId) {
				this.tabId = tabId
			}
		}
	}
</script>

<style lang="sass">
	.tabbable.tabs-demo {
		position: relative;
		overflow: hidden;
		height: 100%;
		width: 100%;
		margin: 0;
		.tab-content {
			position: relative;
			height: 100%;
			width: 100%;
			padding: 0;
		}
	}
	#demo {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0;
	}
	iframe {
		width: 100%;
		height: 100%;
	}
	.docs-container {
		max-width: 800px; 
		margin: 0 auto;
		padding: 20px 0;
		letter-spacing: .2px;
		font-size: 16px;
		line-height: 1.7;
	}
	pre {
		background: #f9f9f9;
		border: none;
	}
	h1, h2, h3 {
		margin: 35px 0 20px;
	}
	p {
		margin-bottom: 15px;
	}
	code {
		background: #f7f7f7;
		color: inherit;
	}
	.component-name {
		text-transform: capitalize;
	}
</style>