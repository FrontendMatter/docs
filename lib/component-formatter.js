'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _properCase = require('mout/string/properCase');

var _properCase2 = _interopRequireDefault(_properCase);

var _pascalCase = require('mout/string/pascalCase');

var _pascalCase2 = _interopRequireDefault(_pascalCase);

var _forOwn = require('mout/object/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _merge = require('mout/object/merge');

var _merge2 = _interopRequireDefault(_merge);

var _hyphenate = require('mout/string/hyphenate');

var _hyphenate2 = _interopRequireDefault(_hyphenate);

var _unhyphenate = require('mout/string/unhyphenate');

var _unhyphenate2 = _interopRequireDefault(_unhyphenate);

var _slugify = require('mout/string/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function funcToString(data) {
	if (typeof data === 'function') {
		return data.toString();
	}
	return data;
}

function slug(value) {
	return (0, _slugify2.default)(value.replace(/\./g, ' '));
}

exports.default = function (id, data) {
	id = (0, _hyphenate2.default)(id);
	var label = (0, _properCase2.default)((0, _unhyphenate2.default)(id));
	var propertyName = (0, _pascalCase2.default)(id);
	var component = Object.assign({}, data[propertyName]);

	var toStrings = ['created', 'ready', 'destroy', 'beforeDestroy', 'data'];
	toStrings.forEach(function (stringify) {
		if (component[stringify]) {
			component[stringify] = funcToString(component[stringify]);
		}
	});

	if (component.methods) {
		(0, _forOwn2.default)(component.methods, function (method, name, obj) {
			obj[name] = funcToString(method);
		});
	}

	if (component.computed) {
		(0, _forOwn2.default)(component.computed, function (computed, name, obj) {
			obj[name] = funcToString(computed);
		});
	}

	if (component.watch) {
		(0, _forOwn2.default)(component.watch, function (watch, name, obj) {
			obj[name] = funcToString(watch);
		});
	}

	if (component.mixins) {
		component.mixins = component.mixins.filter(function (mix) {
			return typeof mix.name !== 'undefined';
		}).map(function (mix) {
			return {
				name: mix.name,
				label: (0, _properCase2.default)((0, _unhyphenate2.default)(mix.name))
			};
		});
	}

	(0, _forOwn2.default)(component.props, function (prop, name, obj) {
		obj[name] = {
			name: (0, _hyphenate2.default)(name),
			description: prop.description || null,
			type: prop.type.name,
			default: funcToString(prop.default) || null,
			required: prop.required || null
		};
	});

	(0, _forOwn2.default)(component.events, function (event, name, obj) {
		obj[slug(name)] = {
			name: name,
			event: event.toString()
		};
		delete obj[name];
	});

	if (component.components) {
		(function () {
			var components = [];
			(0, _forOwn2.default)(component.components, function (component, name) {
				var id = (0, _hyphenate2.default)(name);
				components.push({
					id: id,
					label: (0, _properCase2.default)((0, _unhyphenate2.default)(id))
				});
			});
			component.components = components;
		})();
	}

	if (component.requirements) {
		component.requirements = component.requirements.map(function (id) {
			return {
				name: id,
				label: (0, _properCase2.default)((0, _unhyphenate2.default)(id))
			};
		});
	}

	return (0, _merge2.default)(component, {
		name: id,
		label: label
	});
};

module.exports = exports.default;