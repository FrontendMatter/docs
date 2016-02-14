webpackJsonp([3],{

/***/ 211:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(220)
	__vue_script__ = __webpack_require__(222)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/package/component.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(234)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Code/themekit-docs/themekit-docs-app/src/views/package/component.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(221);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(212)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/style-import-loader/index.js?config=sassImportLoader!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./component.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/style-import-loader/index.js?config=sassImportLoader!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./component.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(211)();
	// imports


	// module
	exports.push([module.id, ".tabbable.tabs-demo {\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n  margin: 0; }\n  .tabbable.tabs-demo .tab-content {\n    position: relative;\n    height: 100%;\n    width: 100%;\n    padding: 0; }\n\n#demo {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 0; }\n\niframe {\n  width: 100%;\n  height: 100%; }\n\n.component-name {\n  text-transform: capitalize; }\n", ""]);

	// exports


/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keys = __webpack_require__(223);

	var _keys2 = _interopRequireDefault(_keys);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _app = __webpack_require__(20);

	var _app2 = _interopRequireDefault(_app);

	var _store = __webpack_require__(169);

	var _store2 = _interopRequireDefault(_store);

	var _themekitVue = __webpack_require__(171);

	var _pascalCase = __webpack_require__(227);

	var _pascalCase2 = _interopRequireDefault(_pascalCase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<tabs nav-id="tabs-navbar" :class="tabs">
	// 		<tab-pane id="demo" label="Demo" v-show="hasDemos" :active="hasDemos" :visible="hasDemos">
	// 			<iframe v-if="hasDemos" :src="demos[0].url" frameborder="0"></iframe>
	// 		</tab-pane>
	// 		<tab-pane :active="!hasDemos" icon="fa fa-fw fa-file-text-o" label="Docs">
	// 			<div class="container-fluid docs-container">
	//
	// 				<template v-if="component">
	// 					<h1 class="component-name">{{ component.label }}</h1>
	// 					<template v-if="component.description">
	// 						{{{ component.description.data | marked }}}
	// 					</template>
	//
	// 					<template v-if="component.requirements.length">
	// 						<h3>Requirements</h3>
	// 						<blockquote class="warning">
	// 							The {{ component.label }} component <strong>must be used</strong> as a child element of
	// 							<template v-for="required in component.requirements">
	// 								<a v-link="appHelpers.routeToComponent(packageId, required.name)" v-text="required.label"></a><span v-text="$index | separatorLast component.requirements.length"></span>
	// 							</template>
	// 						</blockquote>
	// 					</template>
	//
	// 					<template v-if="!component.template && !component.mixins.length">
	// 						<h3>Warning</h3>
	// 						<blockquote class="warning">
	// 							The {{ component.label }} component does not have a template.
	// 							<template v-if="extendedBy.length">
	// 								It's likely that this component is not meant to be used directly. Instead, you probably want to use one of the components extending {{ component.label }}, below.
	// 							</template>
	// 						</blockquote>
	// 					</template>
	//
	// 					<h3 v-if="extendedBy.length || usedBy.length">Hierarchy</h3>
	// 					<template v-if="extendedBy.length">
	// 						<blockquote>
	// 							The {{ component.label }} component is extended by:
	// 							<ul class="list-unstyled">
	// 								<li v-for="extending in extendedBy">
	// 									<a v-link="appHelpers.routeToComponent(packageId, extending.name)" v-text="extending.label"></a>
	// 								</li>
	// 							</ul>
	// 						</blockquote>
	// 					</template>
	//
	// 					<template v-if="usedBy.length">
	// 						<blockquote>
	// 							The {{ component.label }} component is used by:
	// 							<ul class="list-unstyled">
	// 								<li v-for="using in usedBy">
	// 									<a v-link="appHelpers.routeToComponent(packageId, using.name)" v-text="using.label"></a>
	// 								</li>
	// 							</ul>
	// 						</blockquote>
	// 					</template>
	//
	// 					<template v-if="component.components.length">
	// 						<h3>Components</h3>
	// 						<blockquote>
	// 							The {{ component.label }} component is using:
	// 							<ul class="list-unstyled">
	// 								<li v-for="used in component.components">
	// 									<a v-link="appHelpers.routeToComponent(packageId, used.id)" v-text="used.label"></a>
	// 								</li>
	// 							</ul>
	// 						</blockquote>
	// 					</template>
	//
	// 					<template v-if="component.mixins">
	// 						<h3>Mixins</h3>
	// 						<blockquote>
	// 							The {{ component.label }} component extends:
	// 							<ul class="list-unstyled">
	// 								<li v-for="mix in component.mixins">
	// 									<a v-link="appHelpers.routeToComponent(packageId, mix.name)" v-text="mix.label"></a>
	// 								</li>
	// 							</ul>
	// 						</blockquote>
	// 					</template>
	//
	// 					<hr>
	//
	// 					<template v-if="component.slots.length">
	// 						<h3>Slots</h3>
	// 						<blockquote>
	// 							<p>A <strong>slot</strong> is a special attribute that instructs the component's parent how to distribute content.</p>
	// 							<small>You can learn more about <a href="http://vuejs.org/guide/components.html#Content_Distribution_with_Slots">Content Distribution with Slots in Vue.js components</a></small>
	// 						</blockquote>
	// 						<p>The {{ component.label }} component can have the following slot attribute values:</p>
	// 						<template v-for="slot in component.slots">
	// 							<div class="panel panel-default panel-body">
	// 								<h4>{{ slot.name }}</h4>
	// 								<p v-if="slot.description">{{{ slot.description | marked }}}</p>
	// 							</div>
	// 						</template>
	// 						<hr>
	// 					</template>
	//
	// 					<template v-if="component.props.length">
	// 						<h3>Properties</h3>
	// 						<blockquote>
	// 							<p>Properties define how the component expects to receive data from its parent.</p>
	// 							<small>You can learn more about <a href="http://vuejs.org/guide/components.html#Passing_Data_with_Props">Passing Data with Props in Vue.js components</a></small>
	// 						</blockquote>
	// 						<p>The {{ component.label }} component exposes the following properties:</p>
	// 						<template v-for="prop in component.props">
	// 							<div class="panel panel-default panel-body">
	// 								<h4>{{ prop.prop.name }}</h4>
	// 								<template v-if="prop.description">{{{ prop.description.data | marked }}}</template>
	// 								<h5 v-if="prop.prop.type">type: <code>{{ prop.prop.type }}</code></h5>
	// 								<h5 v-if="prop.prop.default">default: <code>{{ prop.prop.default }}</code></h5>
	// 								<h5 v-if="prop.prop.required">required: <code>true</code></h5>
	// 							</div>
	// 						</template>
	// 						<hr>
	// 					</template>
	//
	// 					<template v-if="component.events.length">
	// 						<h3>Event listeners</h3>
	// 						<p>The {{ component.label }} component listens and responds to the following events:</p>
	// 						<template v-for="event in component.events">
	// 							<h4>{{ event.name }}</h4>
	// 							<p v-if="event.description">{{{ event.description | unindent | marked }}}</p>
	// 							<pre><code v-highlight="event.event" lang="javascript"></code></pre>
	// 						</template>
	// 					</template>
	// 				</template>
	//
	// 				<template v-if="!component && !serviceLoading && appState.pkg">
	// 					<template v-else>
	// 						<h1>{{ componentId }}</h1>
	// 						<h3>The component was not found.</h3>
	// 					</template>
	// 				</template>
	//
	// 				<div class="alert alert-default" v-if="serviceLoading && !component">Loading data ...</div>
	// 			</div>
	// 		</tab-pane>
	// 	</tabs>
	// </template>
	//
	// <script>
	exports.default = {
		mixins: [_store2.default],
		filters: {
			separatorLast: function separatorLast($index, $length, separator, lastSeparator) {
				if ($index === $length - 2) {
					return lastSeparator || ' or ';
				}
				if ($index !== $length - 1) {
					return separator || ', ';
				}
			}
		},
		data: function data() {
			return {
				component: null,
				tabId: null,
				appState: _app2.default.state,
				appHelpers: _app2.default.helpers
			};
		},

		computed: {
			componentName: function componentName() {
				return this.$route.params.componentName;
			},
			packageName: function packageName() {
				return this.$route.params.packageName;
			},
			version: function version() {
				return this.$route.params.version;
			},
			components: function components() {
				return this.appState.components;
			},
			extendedBy: function extendedBy() {
				var _this = this;

				if (this.components) {
					return this.components.filter(function (extending) {
						return extending.mixins && extending.mixins.filter(function (mix) {
							return mix.name === _this.component.name;
						}).length > 0;
					});
				}
			},
			usedBy: function usedBy() {
				var _this2 = this;

				if (this.components) {
					return this.components.filter(function (using) {
						return using.components && (0, _keys2.default)(using.components).indexOf((0, _pascalCase2.default)(_this2.component.label)) !== -1;
					});
				}
			},
			tabs: function tabs() {
				return {
					'tabs-demo': this.tabId === 'demo'
				};
			},
			demos: function demos() {
				if (this.component) {
					return this.component.demos;
				}
				return [];
			},
			hasDemos: function hasDemos() {
				return this.demos.length > 0;
			}
		},
		created: function created() {
			var _this3 = this;

			this.store.getComponentVersionByName(this.componentName, this.packageName, this.version).then(function (data) {
				return _this3.component = data;
			});
		},

		events: {
			'shown.tk.tab': function shownTkTab(tabId) {
				this.tabId = tabId;
			}
		},
		watch: {
			component: function component(value) {
				if (value) {
					this.appState.page.title = this.component.label;
				}
			}
		},
		components: {
			Tabs: _themekitVue.Tabs,
			TabPane: _themekitVue.TabPane
		}
	};
	// </script>
	//
	// <style lang="sass">
	// 	.tabbable.tabs-demo {
	// 		position: relative;
	// 		overflow: hidden;
	// 		height: 100%;
	// 		width: 100%;
	// 		margin: 0;
	// 		.tab-content {
	// 			position: relative;
	// 			height: 100%;
	// 			width: 100%;
	// 			padding: 0;
	// 		}
	// 	}
	// 	#demo {
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		right: 0;
	// 		bottom: 0;
	// 		padding: 0;
	// 	}
	// 	iframe {
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// 	.component-name {
	// 		text-transform: capitalize;
	// 	}
	// </style>

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(224), __esModule: true };

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(225);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(15);

	__webpack_require__(226)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(19);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(228);
	var camelCase = __webpack_require__(229);
	var upperCase = __webpack_require__(232);
	    /**
	     * camelCase + UPPERCASE first char
	     */
	    function pascalCase(str){
	        str = toString(str);
	        return camelCase(str).replace(/^[a-z]/, upperCase);
	    }

	    module.exports = pascalCase;



/***/ },

/***/ 228:
/***/ function(module, exports) {

	

	    /**
	     * Typecast a value to a String, using an empty string value for null or
	     * undefined.
	     */
	    function toString(val){
	        return val == null ? '' : val.toString();
	    }

	    module.exports = toString;




/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(228);
	var replaceAccents = __webpack_require__(230);
	var removeNonWord = __webpack_require__(231);
	var upperCase = __webpack_require__(232);
	var lowerCase = __webpack_require__(233);
	    /**
	    * Convert string to camelCase text.
	    */
	    function camelCase(str){
	        str = toString(str);
	        str = replaceAccents(str);
	        str = removeNonWord(str)
	            .replace(/[\-_]/g, ' ') //convert all hyphens and underscores to spaces
	            .replace(/\s[a-z]/g, upperCase) //convert first char of each word to UPPERCASE
	            .replace(/\s+/g, '') //remove spaces
	            .replace(/^[A-Z]/g, lowerCase); //convert first char to lowercase
	        return str;
	    }
	    module.exports = camelCase;



/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(228);
	    /**
	    * Replaces all accented chars with regular ones
	    */
	    function replaceAccents(str){
	        str = toString(str);

	        // verifies if the String has accents and replace them
	        if (str.search(/[\xC0-\xFF]/g) > -1) {
	            str = str
	                    .replace(/[\xC0-\xC5]/g, "A")
	                    .replace(/[\xC6]/g, "AE")
	                    .replace(/[\xC7]/g, "C")
	                    .replace(/[\xC8-\xCB]/g, "E")
	                    .replace(/[\xCC-\xCF]/g, "I")
	                    .replace(/[\xD0]/g, "D")
	                    .replace(/[\xD1]/g, "N")
	                    .replace(/[\xD2-\xD6\xD8]/g, "O")
	                    .replace(/[\xD9-\xDC]/g, "U")
	                    .replace(/[\xDD]/g, "Y")
	                    .replace(/[\xDE]/g, "P")
	                    .replace(/[\xE0-\xE5]/g, "a")
	                    .replace(/[\xE6]/g, "ae")
	                    .replace(/[\xE7]/g, "c")
	                    .replace(/[\xE8-\xEB]/g, "e")
	                    .replace(/[\xEC-\xEF]/g, "i")
	                    .replace(/[\xF1]/g, "n")
	                    .replace(/[\xF2-\xF6\xF8]/g, "o")
	                    .replace(/[\xF9-\xFC]/g, "u")
	                    .replace(/[\xFE]/g, "p")
	                    .replace(/[\xFD\xFF]/g, "y");
	        }
	        return str;
	    }
	    module.exports = replaceAccents;



/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(228);
	    // This pattern is generated by the _build/pattern-removeNonWord.js script
	    var PATTERN = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;

	    /**
	     * Remove non-word chars.
	     */
	    function removeNonWord(str){
	        str = toString(str);
	        return str.replace(PATTERN, '');
	    }

	    module.exports = removeNonWord;



/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(228);
	    /**
	     * "Safer" String.toUpperCase()
	     */
	    function upperCase(str){
	        str = toString(str);
	        return str.toUpperCase();
	    }
	    module.exports = upperCase;



/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(228);
	    /**
	     * "Safer" String.toLowerCase()
	     */
	    function lowerCase(str){
	        str = toString(str);
	        return str.toLowerCase();
	    }

	    module.exports = lowerCase;



/***/ },

/***/ 234:
/***/ function(module, exports) {

	module.exports = "\n<tabs nav-id=\"tabs-navbar\" :class=\"tabs\">\n\t<tab-pane id=\"demo\" label=\"Demo\" v-show=\"hasDemos\" :active=\"hasDemos\" :visible=\"hasDemos\">\n\t\t<iframe v-if=\"hasDemos\" :src=\"demos[0].url\" frameborder=\"0\"></iframe>\n\t</tab-pane>\n\t<tab-pane :active=\"!hasDemos\" icon=\"fa fa-fw fa-file-text-o\" label=\"Docs\">\n\t\t<div class=\"container-fluid docs-container\">\n\t\t\t\n\t\t\t<template v-if=\"component\">\n\t\t\t\t<h1 class=\"component-name\">{{ component.label }}</h1>\n\t\t\t\t<template v-if=\"component.description\">\n\t\t\t\t\t{{{ component.description.data | marked }}}\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"component.requirements.length\">\n\t\t\t\t\t<h3>Requirements</h3>\n\t\t\t\t\t<blockquote class=\"warning\">\n\t\t\t\t\t\tThe {{ component.label }} component <strong>must be used</strong> as a child element of\n\t\t\t\t\t\t<template v-for=\"required in component.requirements\">\n\t\t\t\t\t\t\t<a v-link=\"appHelpers.routeToComponent(packageId, required.name)\" v-text=\"required.label\"></a><span v-text=\"$index | separatorLast component.requirements.length\"></span>\n\t\t\t\t\t\t</template>\n\t\t\t\t\t</blockquote>\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"!component.template && !component.mixins.length\">\n\t\t\t\t\t<h3>Warning</h3>\n\t\t\t\t\t<blockquote class=\"warning\">\n\t\t\t\t\t\tThe {{ component.label }} component does not have a template.\n\t\t\t\t\t\t<template v-if=\"extendedBy.length\">\n\t\t\t\t\t\t\tIt's likely that this component is not meant to be used directly. Instead, you probably want to use one of the components extending {{ component.label }}, below.\n\t\t\t\t\t\t</template>\n\t\t\t\t\t</blockquote>\n\t\t\t\t</template>\n\n\t\t\t\t<h3 v-if=\"extendedBy.length || usedBy.length\">Hierarchy</h3>\n\t\t\t\t<template v-if=\"extendedBy.length\">\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\tThe {{ component.label }} component is extended by:\n\t\t\t\t\t\t<ul class=\"list-unstyled\">\n\t\t\t\t\t\t\t<li v-for=\"extending in extendedBy\">\n\t\t\t\t\t\t\t\t<a v-link=\"appHelpers.routeToComponent(packageId, extending.name)\" v-text=\"extending.label\"></a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</blockquote>\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"usedBy.length\">\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\tThe {{ component.label }} component is used by:\n\t\t\t\t\t\t<ul class=\"list-unstyled\">\n\t\t\t\t\t\t\t<li v-for=\"using in usedBy\">\n\t\t\t\t\t\t\t\t<a v-link=\"appHelpers.routeToComponent(packageId, using.name)\" v-text=\"using.label\"></a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</blockquote>\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"component.components.length\">\n\t\t\t\t\t<h3>Components</h3>\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\tThe {{ component.label }} component is using:\n\t\t\t\t\t\t<ul class=\"list-unstyled\">\n\t\t\t\t\t\t\t<li v-for=\"used in component.components\">\n\t\t\t\t\t\t\t\t<a v-link=\"appHelpers.routeToComponent(packageId, used.id)\" v-text=\"used.label\"></a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</blockquote>\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"component.mixins\">\n\t\t\t\t\t<h3>Mixins</h3>\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\tThe {{ component.label }} component extends:\n\t\t\t\t\t\t<ul class=\"list-unstyled\">\n\t\t\t\t\t\t\t<li v-for=\"mix in component.mixins\">\n\t\t\t\t\t\t\t\t<a v-link=\"appHelpers.routeToComponent(packageId, mix.name)\" v-text=\"mix.label\"></a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</blockquote>\n\t\t\t\t</template>\n\n\t\t\t\t<hr>\n\n\t\t\t\t<template v-if=\"component.slots.length\">\n\t\t\t\t\t<h3>Slots</h3>\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\t<p>A <strong>slot</strong> is a special attribute that instructs the component's parent how to distribute content.</p>\n\t\t\t\t\t\t<small>You can learn more about <a href=\"http://vuejs.org/guide/components.html#Content_Distribution_with_Slots\">Content Distribution with Slots in Vue.js components</a></small>\n\t\t\t\t\t</blockquote>\n\t\t\t\t\t<p>The {{ component.label }} component can have the following slot attribute values:</p>\n\t\t\t\t\t<template v-for=\"slot in component.slots\">\n\t\t\t\t\t\t<div class=\"panel panel-default panel-body\">\n\t\t\t\t\t\t\t<h4>{{ slot.name }}</h4>\n\t\t\t\t\t\t\t<p v-if=\"slot.description\">{{{ slot.description | marked }}}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</template>\n\t\t\t\t\t<hr>\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"component.props.length\">\n\t\t\t\t\t<h3>Properties</h3>\n\t\t\t\t\t<blockquote>\n\t\t\t\t\t\t<p>Properties define how the component expects to receive data from its parent.</p>\n\t\t\t\t\t\t<small>You can learn more about <a href=\"http://vuejs.org/guide/components.html#Passing_Data_with_Props\">Passing Data with Props in Vue.js components</a></small>\n\t\t\t\t\t</blockquote>\n\t\t\t\t\t<p>The {{ component.label }} component exposes the following properties:</p>\n\t\t\t\t\t<template v-for=\"prop in component.props\">\n\t\t\t\t\t\t<div class=\"panel panel-default panel-body\">\n\t\t\t\t\t\t\t<h4>{{ prop.prop.name }}</h4>\n\t\t\t\t\t\t\t<template v-if=\"prop.description\">{{{ prop.description.data | marked }}}</template>\n\t\t\t\t\t\t\t<h5 v-if=\"prop.prop.type\">type: <code>{{ prop.prop.type }}</code></h5>\n\t\t\t\t\t\t\t<h5 v-if=\"prop.prop.default\">default: <code>{{ prop.prop.default }}</code></h5>\n\t\t\t\t\t\t\t<h5 v-if=\"prop.prop.required\">required: <code>true</code></h5>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</template>\n\t\t\t\t\t<hr>\n\t\t\t\t</template>\n\n\t\t\t\t<template v-if=\"component.events.length\">\n\t\t\t\t\t<h3>Event listeners</h3>\n\t\t\t\t\t<p>The {{ component.label }} component listens and responds to the following events:</p>\n\t\t\t\t\t<template v-for=\"event in component.events\">\n\t\t\t\t\t\t<h4>{{ event.name }}</h4>\n\t\t\t\t\t\t<p v-if=\"event.description\">{{{ event.description | unindent | marked }}}</p>\n\t\t\t\t\t\t<pre><code v-highlight=\"event.event\" lang=\"javascript\"></code></pre>\n\t\t\t\t\t</template>\n\t\t\t\t</template>\n\t\t\t</template>\n\n\t\t\t<template v-if=\"!component && !serviceLoading && appState.pkg\">\n\t\t\t\t<template v-else>\n\t\t\t\t\t<h1>{{ componentId }}</h1>\n\t\t\t\t\t<h3>The component was not found.</h3>\n\t\t\t\t</template>\n\t\t\t</template>\n\n\t\t\t<div class=\"alert alert-default\" v-if=\"serviceLoading && !component\">Loading data ...</div>\n\t\t</div>\n\t</tab-pane>\n</tabs>\n";

/***/ }

});
//# sourceMappingURL=3.3.js.map