<template>
	<tabs nav-id="tabs-navbar" :class="tabs">
		<tab-pane active icon="fa fa-fw fa-file-text-o" label="Docs">
			<div class="docs-container">
				
				<template v-if="component">
					<h1 class="component-name">{{ component.label }}</h1>
					<template v-if="component.description">
						{{{ component.description | unindent | marked }}}
					</template>

					<template v-if="component.requirements.length">
						<h3>Requirements</h3>
						<blockquote>
							The {{ component.label }} component <strong>must be used</strong> as children of the following component(s):
							<ul class="list-unstyled">
								<li v-for="required in component.requirements">
									<a v-link="{ name: 'component', params: { id: required.id } }" v-text="required.label"></a>
								</li>
							</ul>
						</blockquote>
					</template>

					<template v-if="component.details">
						{{{ component.details | unindent | marked }}}
					</template>

					<template v-if="!component.template && !component.mixins.length">
						<h3>Note</h3>
						<blockquote>
							The {{ component.label }} component does not have a template.
							<template v-if="extendedBy.length">
								It's likely that this component is not meant to be used directly. Instead, you probably want to use one of the components extending {{ component.label }}, below.
							</template>
						</blockquote>
					</template>

					<h3 v-if="extendedBy.length || usedBy.length">Hierarchy</h3>
					<template v-if="extendedBy.length">
						<blockquote>
							The {{ component.label }} component is extended by:
							<ul class="list-unstyled">
								<li v-for="extending in extendedBy">
									<a v-link="{ name: 'component', params: { id: extending.id } }" v-text="extending.label"></a>
								</li>
							</ul>
						</blockquote>
					</template>

					<template v-if="usedBy.length">
						<blockquote>
							The {{ component.label }} component is used by:
							<ul class="list-unstyled">
								<li v-for="using in usedBy">
									<a v-link="{ name: 'component', params: { id: using.id } }" v-text="using.label"></a>
								</li>
							</ul>
						</blockquote>
					</template>

					<template v-if="component.components.length">
						<h3>Components</h3>
						<blockquote>
							The {{ component.label }} component is using:
							<ul class="list-unstyled">
								<li v-for="used in component.components">
									<a v-link="{ name: 'component', params: { id: used.id } }" v-text="used.label"></a>
								</li>
							</ul>
						</blockquote>
					</template>

					<template v-if="component.mixins.length">
						<h3>Mixins</h3>
						<blockquote>
							The {{ component.label }} component extends:
							<ul class="list-unstyled">
								<li v-for="mix in component.mixins">
									<a v-link="{ name: 'component', params: { id: mix.name } }" v-text="mix.label"></a>
								</li>
							</ul>
						</blockquote>
					</template>

					<template v-if="component.props.length">
						<h3>Properties</h3>
						<template v-for="prop in component.props">
							<div class="panel panel-default panel-body">
								<h4>{{ prop.name }}</h4>
								<p v-if="prop.description">{{{ prop.description | unindent | marked }}}</p>
								<h5>type: <code>{{ prop.type }}</code></h5>
								<h5 v-if="prop.default">default: <code>{{ prop.default }}</code></h5>
								<h5 v-if="prop.required">required: <code>true</code></h5>
							</div>
						</template>
					</template>

					<template v-if="component.events.length">
						<h3>Event listeners</h3>
						<p>The {{ component.label }} component listens and responds to the following events:</p>
						<template v-for="event in component.events">
							<h4>{{ event.name }}</h4>
							<p v-if="event.description">{{{ event.description | unindent | marked }}}</p>
							<pre><code v-highlight="event.event" lang="javascript"></code></pre>
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
	import keys from 'mout/object/keys'
	import forOwn from 'mout/object/forOwn'
	import merge from 'mout/object/merge'

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
					let label = properCase(unhyphenate(id))
					let propertyName = pascalCase(id)
					let component = Object.assign({}, Docs[propertyName])

					let mixins = component.mixins || []
					mixins = mixins.filter((mix) => {
						return typeof mix.name !== 'undefined'
					})
					.map((mix) => {
						mix.label = properCase(unhyphenate(mix.name))
						return mix
					})
					component.mixins = mixins

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
					component.props = props

					let events = []
					forOwn(component.events, (event, name) => {
						events.push({
							name: name,
							event: event.toString()
						})
					})
					component.events = events

					let components = []
					forOwn(component.components, (component, name) => {
						let id = hyphenate(name)
						components.push({
							id: id,
							label: properCase(unhyphenate(id))
						})
					})
					component.components = components

					component.requirements = (component.requirements || []).map((id) => {
						return {
							id: id,
							label: properCase(unhyphenate(id))
						}
					})

					component = merge({
						id: id,
						label: label
					}, component)

					next({
						component: component
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
			extendedBy () {
				return this.$root.components.filter((extending) => {
					return extending.mixins && extending.mixins.filter((mix) => {
						return mix.name === this.component.id
					}).length > 0
				})
			},
			usedBy () {
				return this.$root.components.filter((using) => {
					return using.components && 
						keys(using.components).indexOf(pascalCase(this.component.label)) !== -1
				})
			},
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
		padding: 15px !important;
		margin-bottom: 20px;
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
	blockquote {
		background: #f9f9f9;
	}
	.panel-default {
		border-color: #f9f9f9;
		background: #f9f9f9;
	}
</style>