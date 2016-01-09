import properCase from 'mout/string/properCase'
import pascalCase from 'mout/string/pascalCase'
import forOwn from 'mout/object/forOwn'
import merge from 'mout/object/merge'
import hyphenate from 'mout/string/hyphenate'
import unhyphenate from 'mout/string/unhyphenate'
import slugify from 'mout/string/slugify'

function funcToString (data) {
	if (typeof data === 'function') {
		return data.toString()
	}
	return data
}

function slug (value) {
	return slugify(value.replace(/\./g, ' '))
}

export default (id, data) => {
	id = hyphenate(id)
	let label = properCase(unhyphenate(id))
	let propertyName = pascalCase(id)
	let component = Object.assign({}, data[propertyName])

	let toStrings = ['created', 'ready', 'destroy', 'beforeDestroy', 'data']
	toStrings.forEach((stringify) => {
		if (component[stringify]) {
			component[stringify] = funcToString(component[stringify])
		}
	})

	if (component.methods) {
		forOwn(component.methods, (method, name, obj) => {
			obj[name] = funcToString(method)
		})
	}

	if (component.computed) {
		forOwn(component.computed, (computed, name, obj) => {
			obj[name] = funcToString(computed)
		})
	}

	if (component.watch) {
		forOwn(component.watch, (watch, name, obj) => {
			obj[name] = funcToString(watch)
		})
	}

	if (component.mixins) {
		component.mixins = component.mixins.filter((mix) => {
			return typeof mix.name !== 'undefined'
		})
		.map((mix) => {
			return { 
				name: mix.name,
				label: properCase(unhyphenate(mix.name))
			}
		})
	}

	forOwn(component.props, (prop, name, obj) => {
		obj[name] = {
			name: hyphenate(name),
			description: prop.description || null,
			type: prop.type.name,
			default: funcToString(prop.default) || null,
			required: prop.required || null
		}
	})

	forOwn(component.events, (event, name, obj) => {
		obj[slug(name)] = {
			name: name,
			event: event.toString()
		}
		delete obj[name]
	})

	if (component.components) {
		let components = []
		forOwn(component.components, (component, name) => {
			let id = hyphenate(name)
			components.push({
				id: id,
				label: properCase(unhyphenate(id))
			})
		})
		component.components = components
	}

	if (component.requirements) {
		component.requirements = component.requirements.map((id) => {
			return {
				name: id,
				label: properCase(unhyphenate(id))
			}
		})
	}

	return merge(component, {
		name: id,
		label: label
	})
}

module.exports = exports.default