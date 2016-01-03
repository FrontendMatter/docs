<template>
	<tabs nav-id="tabs-navbar" :class="tabs">
		<tab-pane active icon="fa fa-fw fa-file-text-o" label="Docs">
			<div class="docs-container">
				
				<template v-if="component">
					<h1 class="component-name">{{ component.label }}</h1>
					<template v-if="component.description">
						{{{ component.description | unindent | marked }}}
					</template>

					<template v-if="component.props.length">
						<h3>Properties</h3>
						<template v-for="prop in component.props">
							<h4>{{ prop.name }}</h4>
							<p v-if="prop.description">{{{ prop.description | unindent | marked }}}</p>
							<h5>type: <code>{{ prop.type }}</code></h5>
							<h5 v-if="prop.default">default: <code>{{ prop.default }}</code></h5>
							<h5 v-if="prop.required">required: <code>true</code></h5>
							<hr>
						</template>
					</template>

					<template v-if="component.events.length">
						<h3>Events</h3>
						<template v-for="event in component.events">
							<h4>{{ event.name }}</h4>
							<p v-if="event.description">{{{ event.description | unindent | marked }}}</p>
							<pre><code v-highlight="event.event" lang="javascript"></code></pre>
							<hr>
						</template>
					</template>
				</template>

				<template v-if="!component">
					<h1>{{ componentName }}</h1>
					<h3 v-if="!componentError">Loading component ...</h3>
					<template v-else>
						<h3>The component was not found.</h3>
						<p v-html="componentError"></p>
					</template>
				</template>
			</div>
		</tab-pane>
		<tab-pane id="demo" label="Demo" v-if="hasDemo">
			<iframe :src="demoURL" frameborder="0"></iframe>
		</tab-pane>
	</tabs>
</template>

<script>
	import { Tabs } from 'themekit-vue'
	import { TabPane } from 'themekit-vue'
	import marked from 'marked'
	import Docs from 'themekit-vue/resources/docs/dist/docs'
	import hyphenate from 'mout/string/hyphenate'
	import unhyphenate from 'mout/string/unhyphenate'
	import properCase from 'mout/string/properCase'
	import pascalCase from 'mout/string/pascalCase'
	import forOwn from 'mout/object/forOwn'

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
			data ({ to, next }) {
				try {
					let id = to.params.id
					let propertyName = pascalCase(id)
					let component = Docs[propertyName]

					let props = []
					forOwn(component.props, (prop, name) => {
						props.push({
							name: hyphenate(name),
							description: prop.description,
							type: prop.type.name,
							default: prop.default,
							required: prop.required
						})
					})

					let events = []
					forOwn(component.events, (event, name) => {
						events.push({
							name: name,
							event: event.toString()
						})
					})

					next({
						component: {
							id: id,
							label: properCase(unhyphenate(id)),
							description: component.description,
							props: props,
							events: events
						}
					})
				}
				catch (e) {
					next({
						componentError: e.message
					})
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
					require(`themekit-vue/resources/docs/src/demo/${ this.$route.params.id }.vue`)
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
		background: #f9f9f9 !important;
		border: none;
		padding: 5px !important;
	}
	h1, h2, h3 {
		margin: 35px 0 20px;
	}
	p {
		margin-bottom: 15px;
	}
	code, pre code {
		background: #f9f9f9 !important;
		color: inherit;
	}
	pre code {
		padding: 0 !important;
	}
	.component-name {
		text-transform: capitalize;
	}
</style>