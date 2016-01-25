webpackJsonp([1],{

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(188)
	__vue_script__ = __webpack_require__(192)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/packages/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(196)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Code/themekit-docs/themekit-docs-app/src/views/packages/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(189);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(191)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/style-import-loader/index.js?config=sassImportLoader!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/style-import-loader/index.js?config=sassImportLoader!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(190)();
	// imports


	// module
	exports.push([module.id, ".panel-package {\n  cursor: pointer; }\n", ""]);

	// exports


/***/ },

/***/ 190:
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

/***/ 191:
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

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _app = __webpack_require__(3);

	var _app2 = _interopRequireDefault(_app);

	var _store = __webpack_require__(152);

	var _store2 = _interopRequireDefault(_store);

	var _vueIsotope = __webpack_require__(193);

	var _crop = __webpack_require__(194);

	var _crop2 = _interopRequireDefault(_crop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//
	// 	<div class="container-fluid docs-container">
	//
	// 		<!-- Service Loading -->
	// 		<div class="alert alert-default" v-if="serviceLoading">Loading ...</div>
	//
	// 		<!-- Display list -->
	// 		<isotope v-if="!serviceLoading && packages.length">
	// 			<isotope-item class="col-md-4" v-for="package in packages">
	// 				<div class="panel panel-default panel-package" v-link="appHelpers.routeToPackage(package.name)">
	// 					<div class="panel-heading">
	// 						<h4 class="panel-title">
	// 							{{ package.name }}
	// 						</h4>
	// 					</div>
	// 					<template v-if="package.content">
	// 						<div class="panel-body">
	// 							{{ package.content | excerpt 60 }}
	// 						</div>
	// 						<hr>
	// 					</template>
	// 					<div class="panel-body text-center">
	// 						<strong>{{ package.components }}</strong> components
	// 					</div>
	// 				</div>
	// 			</isotope-item>
	// 		</isotope>
	//
	// 		<!-- No packages -->
	// 		<div class="alert alert-default" v-if="!serviceLoading && !packages.length">
	// 			No packages to display.
	// 		</div>
	//
	// 	</div>
	//
	// </template>
	//
	// <script>
	exports.default = {
		mixins: [_store2.default],
		filters: {
			excerpt: function excerpt(value, length) {
				return (0, _crop2.default)(value, length || 30);
			}
		},
		data: function data() {
			return {
				packages: [],
				appHelpers: _app2.default.helpers
			};
		},
		created: function created() {
			var _this = this;

			this.store.getPackages().then(function (packages) {
				_this.packages = packages;
			});
		},

		components: {
			Isotope: _vueIsotope.Isotope,
			IsotopeItem: _vueIsotope.IsotopeItem
		}
	};
	// </script>
	//
	// <style lang="sass">
	// 	.panel-package {
	// 		cursor: pointer;
	// 	}
	// </style>

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueIsotope=e():t.VueIsotope=e()}(this,function(){return function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(28),r=o(n),s=i(27),a=o(s),h={Isotope:r["default"],IsotopeItem:a["default"]};h.install=function(t){},"undefined"!=typeof window&&window.Vue&&window.Vue.use(h),e["default"]=h,t.exports=e["default"]},function(t,e,i){var o=!1;(function(){/*!
		 * getSize v1.2.2
		 * measure size of elements
		 * MIT license
		 */
	!function(e,n){"use strict";function r(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function s(){}function a(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=p.length;i>e;e++){var o=p[e];t[o]=0}return t}function h(t){function i(){if(!l){l=!0;var i=e.getComputedStyle;if(s=function(){var t=i?function(t){return i(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||u("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),i}}(),h=t("boxSizing")){var o=document.createElement("div");o.style.width="200px",o.style.padding="1px 2px 3px 4px",o.style.borderStyle="solid",o.style.borderWidth="1px 2px 3px 4px",o.style[h]="border-box";var n=document.body||document.documentElement;n.appendChild(o);var a=s(o);c=200===r(a.width),n.removeChild(o)}}}function o(t){if(i(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var e=s(t);if("none"===e.display)return a();var o={};o.width=t.offsetWidth,o.height=t.offsetHeight;for(var u=o.isBorderBox=!(!h||!e[h]||"border-box"!==e[h]),l=0,f=p.length;f>l;l++){var d=p[l],m=e[d];m=n(t,m);var y=parseFloat(m);o[d]=isNaN(y)?0:y}var g=o.paddingLeft+o.paddingRight,v=o.paddingTop+o.paddingBottom,_=o.marginLeft+o.marginRight,x=o.marginTop+o.marginBottom,w=o.borderLeftWidth+o.borderRightWidth,I=o.borderTopWidth+o.borderBottomWidth,z=u&&c,L=r(e.width);L!==!1&&(o.width=L+(z?0:g+w));var E=r(e.height);return E!==!1&&(o.height=E+(z?0:v+I)),o.innerWidth=o.width-(g+w),o.innerHeight=o.height-(v+I),o.outerWidth=o.width+_,o.outerHeight=o.height+x,o}}function n(t,i){if(e.getComputedStyle||-1===i.indexOf("%"))return i;var o=t.style,n=o.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),o.left=i,i=o.pixelLeft,o.left=n,s&&(r.left=s),i}var s,h,c,l=!1;return o}var u="undefined"==typeof console?s:function(t){console.error(t)},p=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof o&&o.amd?o(["get-style-property/get-style-property"],h):t.exports=h(i(5))}(window)}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * Outlayer v1.4.2
		 * the brains and guts of a layout library
		 * MIT license
		 */
	!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(t,i,o,r,s){return n(e,t,i,o,r,s)}):t.exports=n(e,i(8),i(9),i(1),i(4),i(21))}(window,function(t,e,i,o,n,r){"use strict";function s(t,e){var i=n.getQueryElement(t);if(!i)return void(a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++p;this.element.outlayerGUID=o,c[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var a=t.console,h=t.jQuery,u=function(){},p=0,c={};return s.namespace="outlayer",s.Item=r,s.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},n.extend(s.prototype,i.prototype),s.prototype.option=function(t){n.extend(this.options,t)},s.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},s.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},s.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},s.prototype._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},s.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},s.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},s.prototype._init=s.prototype.layout,s.prototype._resetLayout=function(){this.getSize()},s.prototype.getSize=function(){this.size=o(this.element)},s.prototype._getMeasurement=function(t,e){var i,r=this.options[t];r?("string"==typeof r?i=this.element.querySelector(r):n.isElement(r)&&(i=r),this[t]=i?o(i)[e]:r):this[t]=0},s.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},s.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},s.prototype._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){for(var i=[],o=0,n=t.length;n>o;o++){var r=t[o],s=this._getItemLayoutPosition(r);s.item=r,s.isInstant=e||r.isLayoutInstant,i.push(s)}this._processLayoutQueue(i)}},s.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},s.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},s.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},s.prototype._postLayout=function(){this.resizeContainer()},s.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},s.prototype._getContainerSize=u,s.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},s.prototype._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){s++,s===r&&i()}var n=this,r=e.length;if(!e||!r)return void i();for(var s=0,a=0,h=e.length;h>a;a++){var u=e[a];u.once(t,o)}},s.prototype.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},s.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},s.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},s.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},s.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n.removeFrom(this.stamps,o),this.unignore(o)}},s.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},s.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},s.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},s.prototype._manageStamp=u,s.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,n=o(t),r={left:e.left-i.left-n.marginLeft,top:e.top-i.top-n.marginTop,right:i.right-e.right-n.marginRight,bottom:i.bottom-e.bottom-n.marginBottom};return r},s.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.prototype.bindResize=function(){this.isResizeBound||(e.bind(t,"resize",this),this.isResizeBound=!0)},s.prototype.unbindResize=function(){this.isResizeBound&&e.unbind(t,"resize",this),this.isResizeBound=!1},s.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},s.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},s.prototype.needsResizeLayout=function(){var t=o(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},s.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},s.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},s.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},s.prototype.reveal=function(t){this._emitCompleteOnItems("reveal",t);for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.reveal()}},s.prototype.hide=function(t){this._emitCompleteOnItems("hide",t);for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.hide()}},s.prototype.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},s.prototype.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},s.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},s.prototype.getItems=function(t){t=n.makeArray(t);for(var e=[],i=0,o=t.length;o>i;i++){var r=t[i],s=this.getItem(r);s&&e.push(s)}return e},s.prototype.remove=function(t){var e=this.getItems(t);if(this._emitCompleteOnItems("remove",e),e&&e.length)for(var i=0,o=e.length;o>i;i++){var r=e[i];r.remove(),n.removeFrom(this.items,r)}},s.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize();var n=this.element.outlayerGUID;delete c[n],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},s.create=function(t,e){function i(){s.apply(this,arguments)}return Object.create?i.prototype=Object.create(s.prototype):n.extend(i.prototype,s.prototype),i.prototype.constructor=i,i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.prototype.settings={},i.namespace=t,i.data=s.data,i.Item=function(){r.apply(this,arguments)},i.Item.prototype=new r,n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i},s.Item=r,s})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["get-size/get-size","outlayer/outlayer"],n):t.exports=n(i(1),i(2))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["doc-ready/doc-ready","matches-selector/matches-selector"],function(t,i){return n(e,t,i)}):t.exports=n(e,i(13),i(7))}(window,function(t,e,i){"use strict";var o={};o.extend=function(t,e){for(var i in e)t[i]=e[i];return t},o.modulo=function(t,e){return(t%e+e)%e};var n=Object.prototype.toString;o.isArray=function(t){return"[object Array]"==n.call(t)},o.makeArray=function(t){var e=[];if(o.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0,n=t.length;n>i;i++)e.push(t[i]);else e.push(t);return e},o.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1},o.removeFrom=function(t,e){var i=o.indexOf(t,e);-1!=i&&t.splice(i,1)},o.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1==t.nodeType&&"string"==typeof t.nodeName},o.setText=function(){function t(t,i){e=e||(void 0!==document.documentElement.textContent?"textContent":"innerText"),t[e]=i}var e;return t}(),o.getParent=function(t,e){for(;t!=document.body;)if(t=t.parentNode,i(t,e))return t},o.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},o.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.filterFindElements=function(t,e){t=o.makeArray(t);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r];if(o.isElement(a))if(e){i(a,e)&&n.push(a);for(var h=a.querySelectorAll(e),u=0,p=h.length;p>u;u++)n.push(h[u])}else n.push(a)}return n},o.debounceMethod=function(t,e,i){var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];t&&clearTimeout(t);var e=arguments,r=this;this[n]=setTimeout(function(){o.apply(r,e),delete r[n]},i||100)}},o.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var r=t.console;return o.htmlInit=function(i,n){e(function(){for(var e=o.toDashed(n),s=document.querySelectorAll(".js-"+e),a="data-"+e+"-options",h=0,u=s.length;u>h;h++){var p,c=s[h],l=c.getAttribute(a);try{p=l&&JSON.parse(l)}catch(f){r&&r.error("Error parsing "+a+" on "+c.nodeName.toLowerCase()+(c.id?"#"+c.id:"")+": "+f);continue}var d=new i(c,p),m=t.jQuery;m&&m.data(c,n,d)}})},o})}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * getStyleProperty v1.0.4
		 * original by kangax
		 * http://perfectionkills.com/feature-testing-css-properties/
		 * MIT license
		 */
	!function(e){"use strict";function i(t){if(t){if("string"==typeof r[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,i=0,o=n.length;o>i;i++)if(e=n[i]+t,"string"==typeof r[e])return e}}var n="Webkit Moz ms Ms O".split(" "),r=document.documentElement.style;"function"==typeof o&&o.amd?o(function(){return i}):t.exports=i}(window)}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,i){"use strict";"function"==typeof o&&o.amd?o(i):t.exports=i()}(window,function(){"use strict";function t(e){for(var i in t.defaults)this[i]=t.defaults[i];for(i in e)this[i]=e[i]}var e=window.Packery=function(){};return e.Rect=t,t.defaults={x:0,y:0,width:0,height:0},t.prototype.contains=function(t){var e=t.width||0,i=t.height||0;return this.x<=t.x&&this.y<=t.y&&this.x+this.width>=t.x+e&&this.y+this.height>=t.y+i},t.prototype.overlaps=function(t){var e=this.x+this.width,i=this.y+this.height,o=t.x+t.width,n=t.y+t.height;return this.x<o&&e>t.x&&this.y<n&&i>t.y},t.prototype.getMaximalFreeRects=function(e){if(!this.overlaps(e))return!1;var i,o=[],n=this.x+this.width,r=this.y+this.height,s=e.x+e.width,a=e.y+e.height;return this.y<e.y&&(i=new t({x:this.x,y:this.y,width:this.width,height:e.y-this.y}),o.push(i)),n>s&&(i=new t({x:s,y:this.y,width:n-s,height:this.height}),o.push(i)),r>a&&(i=new t({x:this.x,y:a,width:this.width,height:r-a}),o.push(i)),this.x<e.x&&(i=new t({x:this.x,y:this.y,width:e.x-this.x,height:this.height}),o.push(i)),o},t.prototype.canFit=function(t){return this.width>=t.width&&this.height>=t.height},t})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e){"use strict";function i(t,e){return t[h](e)}function n(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function r(t,e){n(t);for(var i=t.parentNode.querySelectorAll(e),o=0,r=i.length;r>o;o++)if(i[o]===t)return!0;return!1}function s(t,e){return n(t),i(t,e)}var a,h=function(){if(e.matches)return"matches";if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,o=t.length;o>i;i++){var n=t[i],r=n+"MatchesSelector";if(e[r])return r}}();if(h){var u=document.createElement("div"),p=i(u,"div");a=p?i:s}else a=r;"function"==typeof o&&o.amd?o(function(){return a}):t.exports=a}(Element.prototype)}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * eventie v1.0.6
		 * event binding helper
		 *   eventie.bind( elem, 'click', myFn )
		 *   eventie.unbind( elem, 'click', myFn )
		 * MIT license
		 */
	!function(e){"use strict";function i(t){var i=e.event;return i.target=i.target||i.srcElement||t,i}var n=document.documentElement,r=function(){};n.addEventListener?r=function(t,e,i){t.addEventListener(e,i,!1)}:n.attachEvent&&(r=function(t,e,o){t[e+o]=o.handleEvent?function(){var e=i(t);o.handleEvent.call(o,e)}:function(){var e=i(t);o.call(t,e)},t.attachEvent("on"+e,t[e+o])});var s=function(){};n.removeEventListener?s=function(t,e,i){t.removeEventListener(e,i,!1)}:n.detachEvent&&(s=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var a={bind:r,unbind:s};"function"==typeof o&&o.amd?o(a):t.exports=a}(window)}).call(window)},function(t,e){var i=!1;(function(){(function(){"use strict";function e(){}function o(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function n(t){return function(){return this[t].apply(this,arguments)}}var r=e.prototype,s=this,a=s.EventEmitter;r.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},r.flattenListeners=function(t){var e,i=[];for(e=0;e<t.length;e+=1)i.push(t[e].listener);return i},r.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},r.addListener=function(t,e){var i,n=this.getListenersAsObject(t),r="object"==typeof e;for(i in n)n.hasOwnProperty(i)&&-1===o(n[i],e)&&n[i].push(r?e:{listener:e,once:!1});return this},r.on=n("addListener"),r.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},r.once=n("addOnceListener"),r.defineEvent=function(t){return this.getListeners(t),this},r.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},r.removeListener=function(t,e){var i,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(i=o(r[n],e),-1!==i&&r[n].splice(i,1));return this},r.off=n("removeListener"),r.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},r.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},r.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},r.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},r.removeAllListeners=n("removeEvent"),r.emitEvent=function(t,e){var i,o,n,r,s,a=this.getListenersAsObject(t);for(r in a)if(a.hasOwnProperty(r))for(i=a[r].slice(0),n=i.length;n--;)o=i[n],o.once===!0&&this.removeListener(t,o.listener),s=o.listener.apply(this,e||[]),s===this._getOnceReturnValue()&&this.removeListener(t,o.listener);return this},r.trigger=n("emitEvent"),r.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},r.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},r._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},r._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return s.EventEmitter=a,e},"function"==typeof i&&i.amd?i(function(){return e}):"object"==typeof t&&t.exports?t.exports=e:s.EventEmitter=e}).call(this)}).call(window)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={ready:function(){this.$dispatch("ready.tk.isotope-item",this)},beforeDestroy:function(){this.$dispatch("destroy.tk.isotope-item",this)}}},function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(14),r=o(n);i(19),e["default"]={data:function(){return{isotope:null,resizeTimer:null}},props:{layoutMode:{type:String,"default":"packery"},itemSelector:{type:String,"default":".item"}},methods:{broadcast:function(){this.$broadcast("layout.tk.isotope")},handleResize:function(){this.$nextTick(function(){this.isotope.layout()})},debouncedResize:function(){clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(this.handleResize,10)},init:function(){this.$el.classList.add("isotope"),this.isotope=new r["default"](this.$el,{layoutMode:this.layoutMode,itemSelector:this.itemSelector,percentPosition:!0,transitionDuration:0,isResizeBound:!1}),this.isotope.on("layoutComplete",this.broadcast),window.addEventListener("resize",this.debouncedResize)},destroy:function(){this.isotope&&(this.isotope.off("layoutComplete",this.broadcast),window.removeEventListener("resize",this.debouncedResize),this.isotope.destroy())}},ready:function(){this.init()},beforeDestroy:function(){this.destroy()},events:{"ready.tk.isotope-item":function(t){this.isotope&&this.isotope.insert(t.$el)},"destroy.tk.isotope-item":function(t){this.isotope&&(this.isotope.remove(t.$el),this.isotope.layout())},"layout.tk.isotope":function(t){this.isotope&&t&&t!==this&&this.handleResize()}}}},function(t,e,i){var o=!1;(function(){/*!
		 * classie v1.0.1
		 * class helper functions
		 * from bonzo https://github.com/ded/bonzo
		 * MIT license
		 * 
		 * classie.has( elem, 'my-class' ) -> true/false
		 * classie.add( elem, 'my-new-class' )
		 * classie.remove( elem, 'my-unwanted-class' )
		 * classie.toggle( elem, 'my-class' )
		 */
	!function(e){"use strict";function i(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function n(t,e){var i=r(t,e)?a:s;i(t,e)}var r,s,a;"classList"in document.documentElement?(r=function(t,e){return t.classList.contains(e)},s=function(t,e){t.classList.add(e)},a=function(t,e){t.classList.remove(e)}):(r=function(t,e){return i(e).test(t.className)},s=function(t,e){r(t,e)||(t.className=t.className+" "+e)},a=function(t,e){t.className=t.className.replace(i(e)," ")});var h={hasClass:r,addClass:s,removeClass:a,toggleClass:n,has:r,add:s,remove:a,toggle:n};"function"==typeof o&&o.amd?o(h):t.exports=h}(window)}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * docReady v1.0.3
		 * Cross browser DOMContentLoaded event emitter
		 * MIT license
		 */
	!function(e){"use strict";function n(t){"function"==typeof t&&(n.isReady?t():h.push(t))}function r(t){var e="readystatechange"===t.type&&"complete"!==a.readyState;if(!n.isReady&&!e){n.isReady=!0;for(var i=0,o=h.length;o>i;i++){var r=h[i];r()}}}function s(t){return t.bind(a,"DOMContentLoaded",r),t.bind(a,"readystatechange",r),t.bind(e,"load",r),n}var a=e.document,h=[];n.isReady=!1,"function"==typeof o&&o.amd?(n.isReady="function"==typeof requirejs,o(["eventie/eventie"],s)):t.exports=s(i(8))}(window)}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * Isotope v2.2.2
		 *
		 * Licensed GPLv3 for open source use
		 * or Isotope Commercial License for commercial use
		 *
		 * http://isotope.metafizzy.co
		 * Copyright 2015 Metafizzy
		 */
	!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","./item","./layout-mode","./layout-modes/masonry","./layout-modes/fit-rows","./layout-modes/vertical"],function(t,i,o,r,s,a){return n(e,t,i,o,r,s,a)}):t.exports=n(e,i(2),i(1),i(7),i(4),i(15),i(3),i(17),i(16),i(18))}(window,function(t,e,i,o,n,r,s){"use strict";function a(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],h=o.sortData[s];if(a>h||h>a){var u=void 0!==e[s]?e[s]:e,p=u?1:-1;return(a>h?1:-1)*p}}return 0}}var h=t.jQuery,u=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},p=document.documentElement,c=p.textContent?function(t){return t.textContent}:function(t){return t.innerText},l=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});l.Item=r,l.LayoutMode=s,l.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in s.modes)this._initLayoutMode(t)},l.prototype.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l.prototype._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0,o=t.length;o>i;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l.prototype._initLayoutMode=function(t){var e=s.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?void this.arrange():void this._layout()},l.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.prototype.arrange=function(t){function e(){o.reveal(i.needReveal),o.hide(i.needHide)}this.option(t),this._getIsInstant();var i=this._filter(this.items);this.filteredItems=i.matches;var o=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(e):e(),this._sort(),this._layout()},l.prototype._init=l.prototype.arrange,l.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},l.prototype._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l.prototype._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],r=this._getFilterTest(e),s=0,a=t.length;a>s;s++){var h=t[s];if(!h.isIgnored){var u=r(h);u&&i.push(h),u&&h.isHidden?o.push(h):u||h.isHidden||n.push(h)}}return{matches:i,needReveal:o,needHide:n}},l.prototype._getFilterTest=function(t){return h&&this.options.isJQueryFiltering?function(e){return h(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.prototype.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l.prototype._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&e>i;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=u(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),a=l.sortDataParsers[i[1]];return t=a?function(t){return t&&a(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&c(i)}}return t}();l.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},l.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l.prototype._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},l.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},l.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l.prototype._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e).matches;for(i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var d=l.prototype.remove;return l.prototype.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);d.call(this,t);var i=e&&e.length;if(i)for(var o=0;i>o;o++){var r=e[o];n.removeFrom(this.filteredItems,r)}},l.prototype.shuffle=function(){for(var t=0,e=this.items.length;e>t;t++){var i=this.items[t];i.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},l.prototype.getFilteredItemElements=function(){for(var t=[],e=0,i=this.filteredItems.length;i>e;e++)t.push(this.filteredItems[e].element);return t},l})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["outlayer/outlayer"],n):t.exports=n(i(2))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var i=e.prototype.destroy;return e.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},e})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["../layout-mode"],n):t.exports=n(i(3))}(window,function(t){"use strict";var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},e.prototype._getContainerSize=function(){return{height:this.maxY}},e})}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * Masonry layout mode
		 * sub-classes Masonry
		 * http://masonry.desandro.com
		 */
	!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["../layout-mode","masonry/masonry"],n):t.exports=n(i(3),i(20))}(window,function(t,e){"use strict";function i(t,e){for(var i in e)t[i]=e[i];return t}var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;i(o.prototype,e.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var h=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,h.apply(this,arguments)},o})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["../layout-mode"],n):t.exports=n(i(3))}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e})}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * Packery layout mode v1.1.3
		 * sub-classes Packery
		 * http://packery.metafizzy.co
		 */
	!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["isotope/js/layout-mode","packery/js/packery","get-size/get-size"],n):t.exports=n(i(3),i(24),i(1))}(window,function(t,e,i){"use strict";function o(t,e){for(var i in e)t[i]=e[i];return t}var n=t.create("packery"),r=n.prototype._getElementOffset,s=n.prototype._getMeasurement;o(n.prototype,e.prototype),n.prototype._getElementOffset=r,n.prototype._getMeasurement=s;var a=n.prototype._resetLayout;n.prototype._resetLayout=function(){this.packer=this.packer||new e.Packer,a.apply(this,arguments)};var h=n.prototype._getItemLayoutPosition;n.prototype._getItemLayoutPosition=function(t){return t.rect=t.rect||new e.Rect,h.call(this,t)};var u=n.prototype._manageStamp;return n.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},n.prototype.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t,o=this.options.isHorizontal?"innerHeight":"innerWidth";return e&&t[o]!=this.size[o]},n})}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * Masonry v3.3.2
		 * Cascading grid layout library
		 * http://masonry.desandro.com
		 * MIT License
		 * by David DeSandro
		 */
	!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],n):t.exports=n(i(2),i(1),i(4))}(window,function(t,e,i){"use strict";var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,r=n/o,s=o-n%o,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i.indexOf(r,s),h={x:this.columnWidth*a,y:s},u=s+t.size.outerHeight,p=this.cols+1-r.length,c=0;p>c;c++)this.colYs[a+c]=u;return h},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var h=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,u=s;a>=u;u++)this.colYs[u]=Math.max(h,this.colYs[u])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(t,i,o,r){return n(e,t,i,o,r)}):t.exports=n(e,i(9),i(1),i(5),i(4))}(window,function(t,e,i,o,n){"use strict";function r(t){for(var e in t)return!1;return e=null,!0}function s(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function a(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var h=t.getComputedStyle,u=h?function(t){return h(t,null)}:function(t){return t.currentStyle},p=o("transition"),c=o("transform"),l=p&&c,f=!!o("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[p],m=["transform","transition","transitionDuration","transitionProperty"],y=function(){for(var t={},e=0,i=m.length;i>e;e++){var n=m[e],r=o(n);r&&r!==n&&(t[n]=r)}return t}();n.extend(s.prototype,e.prototype),s.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},s.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.prototype.getSize=function(){this.size=i(this.element)},s.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=y[i]||i;e[o]=t[i]}},s.prototype.getPosition=function(){var t=u(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=t[i?"left":"right"],r=t[o?"top":"bottom"],s=this.layout.size,a=-1!=n.indexOf("%")?parseFloat(n)/100*s.width:parseInt(n,10),h=-1!=r.indexOf("%")?parseFloat(r)/100*s.height:parseInt(r,10);a=isNaN(a)?0:a,h=isNaN(h)?0:h,a-=i?s.paddingLeft:s.paddingRight,h-=o?s.paddingTop:s.paddingBottom,this.position.x=a,this.position.y=h},s.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={},o=e.isOriginLeft?"paddingLeft":"paddingRight",n=e.isOriginLeft?"left":"right",r=e.isOriginLeft?"right":"left",s=this.position.x+t[o];i[n]=this.getXValue(s),i[r]="";var a=e.isOriginTop?"paddingTop":"paddingBottom",h=e.isOriginTop?"top":"bottom",u=e.isOriginTop?"bottom":"top",p=this.position.y+t[a];i[h]=this.getYValue(p),i[u]="",this.css(i),this.emitEvent("layout",[this])},s.prototype.getXValue=function(t){var e=this.layout.options;return e.percentPosition&&!e.isHorizontal?t/this.layout.size.width*100+"%":t+"px"},s.prototype.getYValue=function(t){var e=this.layout.options;return e.percentPosition&&e.isHorizontal?t/this.layout.size.height*100+"%":t+"px"},s.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-o,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},s.prototype.getTranslate=function(t,e){var i=this.layout.options;return t=i.isOriginLeft?t:-t,e=i.isOriginTop?e:-e,f?"translate3d("+t+"px, "+e+"px, 0)":"translate("+t+"px, "+e+"px)"},s.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},s.prototype.moveTo=l?s.prototype._transitionTo:s.prototype.goTo,s.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},s.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},s.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var g="opacity,"+a(y.transform||"transform");s.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:g,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},s.prototype.transition=s.prototype[p?"_transition":"_nonTransition"],s.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},s.prototype.onotransitionend=function(t){this.ontransitionend(t)};var v={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};s.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=v[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],r(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd){var o=e.onEnd[i];o.call(this),delete e.onEnd[i]}this.emitEvent("transitionEnd",[this])}},s.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},s.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var _={transitionProperty:"",transitionDuration:""};return s.prototype.removeTransitionStyles=function(){this.css(_)},s.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},s.prototype.remove=function(){if(!p||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var t=this;this.once("transitionEnd",function(){t.removeElem()}),this.hide()},s.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},s.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},s.prototype.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},s.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},s.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},s.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},s})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["get-style-property/get-style-property","outlayer/outlayer","./rect"],n):t.exports=n(i(5),i(2),i(6))}(window,function(t,e,i){"use strict";var o=t("transform"),n=function(){e.Item.apply(this,arguments)};n.prototype=new e.Item;var r=n.prototype._create;return n.prototype._create=function(){r.call(this),this.rect=new i,this.placeRect=new i},n.prototype.dragStart=function(){this.getPosition(),this.removeTransitionStyles(),this.isTransitioning&&o&&(this.element.style[o]="none"),this.getSize(),this.isPlacing=!0,this.needsPositioning=!1,this.positionPlaceRect(this.position.x,this.position.y),this.isTransitioning=!1,this.didDrag=!1},n.prototype.dragMove=function(t,e){this.didDrag=!0;var i=this.layout.size;t-=i.paddingLeft,e-=i.paddingTop,this.positionPlaceRect(t,e)},n.prototype.dragStop=function(){this.getPosition();var t=this.position.x!=this.placeRect.x,e=this.position.y!=this.placeRect.y;this.needsPositioning=t||e,this.didDrag=!1},n.prototype.positionPlaceRect=function(t,e,i){this.placeRect.x=this.getPlaceRectCoord(t,!0),this.placeRect.y=this.getPlaceRectCoord(e,!1,i)},n.prototype.getPlaceRectCoord=function(t,e,i){var o=e?"Width":"Height",n=this.size["outer"+o],r=this.layout[e?"columnWidth":"rowHeight"],s=this.layout.size["inner"+o];e||(s=Math.max(s,this.layout.maxY),this.layout.rowHeight||(s-=this.layout.gutter));var a;if(r){r+=this.layout.gutter,s+=e?this.layout.gutter:0,t=Math.round(t/r);var h;h=this.layout.options.isHorizontal?e?"ceil":"floor":e?"floor":"ceil";var u=Math[h](s/r);u-=Math.ceil(n/r),a=u}else a=s-n;return t=i?t:Math.min(t,a),t*=r||1,Math.max(0,t)},n.prototype.copyPlaceRectPosition=function(){this.rect.x=this.placeRect.x,this.rect.y=this.placeRect.y},n.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},n})}).call(window)},function(t,e,i){var o=!1;(function(){!function(e,n){"use strict";if("function"==typeof o&&o.amd)o(["./rect"],n);else{t.exports=n(i(6))}}(window,function(t){"use strict";function e(t,e,i){this.width=t||0,this.height=e||0,this.sortDirection=i||"downwardLeftToRight",this.reset()}e.prototype.reset=function(){this.spaces=[],this.newSpaces=[];var e=new t({x:0,y:0,width:this.width,height:this.height});this.spaces.push(e),this.sorter=i[this.sortDirection]||i.downwardLeftToRight},e.prototype.pack=function(t){for(var e=0,i=this.spaces.length;i>e;e++){var o=this.spaces[e];if(o.canFit(t)){this.placeInSpace(t,o);break}}},e.prototype.placeInSpace=function(t,e){t.x=e.x,t.y=e.y,this.placed(t)},e.prototype.placed=function(t){for(var e=[],i=0,o=this.spaces.length;o>i;i++){var n=this.spaces[i],r=n.getMaximalFreeRects(t);r?e.push.apply(e,r):e.push(n)}this.spaces=e,this.mergeSortSpaces()},e.prototype.mergeSortSpaces=function(){e.mergeRects(this.spaces),this.spaces.sort(this.sorter)},e.prototype.addSpace=function(t){this.spaces.push(t),this.mergeSortSpaces()},e.mergeRects=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];if(o){var n=t.slice(0);n.splice(e,1);for(var r=0,s=0,a=n.length;a>s;s++){var h=n[s],u=e>s?0:1;o.contains(h)&&(t.splice(s+u-r,1),r++)}}}return t};var i={downwardLeftToRight:function(t,e){return t.y-e.y||t.x-e.x},rightwardTopToBottom:function(t,e){return t.x-e.x||t.y-e.y}};return e})}).call(window)},function(t,e,i){var o=!1;(function(){/*!
		 * Packery v1.4.3
		 * bin-packing layout library
		 *
		 * Licensed GPLv3 for open source use
		 * or Flickity Commercial License for commercial use
		 *
		 * http://packery.metafizzy.co
		 * Copyright 2015 Metafizzy
		 */
	!function(e,n){"use strict";"function"==typeof o&&o.amd?o(["classie/classie","get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],n):t.exports=n(i(12),i(1),i(2),i(6),i(23),i(22))}(window,function(t,e,i,o,n,r){"use strict";function s(t,e){return t.position.y-e.position.y||t.position.x-e.position.x}function a(t,e){return t.position.x-e.position.x||t.position.y-e.position.y}o.prototype.canFit=function(t){return this.width>=t.width-1&&this.height>=t.height-1};var h=i.create("packery");return h.Item=r,h.prototype._create=function(){i.prototype._create.call(this),this.packer=new n,this.stamp(this.options.stamped);var t=this;this.handleDraggabilly={dragStart:function(){t.itemDragStart(this.element)},dragMove:function(){t.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){t.itemDragEnd(this.element)}},this.handleUIDraggable={start:function(e,i){i&&t.itemDragStart(e.currentTarget)},drag:function(e,i){i&&t.itemDragMove(e.currentTarget,i.position.left,i.position.top)},stop:function(e,i){i&&t.itemDragEnd(e.currentTarget)}}},h.prototype._resetLayout=function(){this.getSize(),this._getMeasurements();var t=this.packer;this.options.isHorizontal?(t.width=Number.POSITIVE_INFINITY,t.height=this.size.innerHeight+this.gutter,t.sortDirection="rightwardTopToBottom"):(t.width=this.size.innerWidth+this.gutter,t.height=Number.POSITIVE_INFINITY,t.sortDirection="downwardLeftToRight"),t.reset(),this.maxY=0,this.maxX=0},h.prototype._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},h.prototype._getItemLayoutPosition=function(t){return this._packItem(t),t.rect},h.prototype._packItem=function(t){this._setRectSize(t.element,t.rect),this.packer.pack(t.rect),this._setMaxXY(t.rect)},h.prototype._setMaxXY=function(t){this.maxX=Math.max(t.x+t.width,this.maxX),this.maxY=Math.max(t.y+t.height,this.maxY)},h.prototype._setRectSize=function(t,i){var o=e(t),n=o.outerWidth,r=o.outerHeight;(n||r)&&(n=this._applyGridGutter(n,this.columnWidth),r=this._applyGridGutter(r,this.rowHeight)),i.width=Math.min(n,this.packer.width),i.height=Math.min(r,this.packer.height)},h.prototype._applyGridGutter=function(t,e){if(!e)return t+this.gutter;e+=this.gutter;var i=t%e,o=i&&1>i?"round":"ceil";return t=Math[o](t/e)*e},h.prototype._getContainerSize=function(){return this.options.isHorizontal?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},h.prototype._manageStamp=function(t){var e,i=this.getItem(t);if(i&&i.isPlacing)e=i.placeRect;else{var n=this._getElementOffset(t);e=new o({x:this.options.isOriginLeft?n.left:n.right,y:this.options.isOriginTop?n.top:n.bottom})}this._setRectSize(t,e),this.packer.placed(e),this._setMaxXY(e)},h.prototype.sortItemsByPosition=function(){var t=this.options.isHorizontal?a:s;this.items.sort(t)},h.prototype.fit=function(t,e,i){var o=this.getItem(t);o&&(this._getMeasurements(),this.stamp(o.element),o.getSize(),o.isPlacing=!0,e=void 0===e?o.rect.x:e,i=void 0===i?o.rect.y:i,o.positionPlaceRect(e,i,!0),this._bindFitEvents(o),o.moveTo(o.placeRect.x,o.placeRect.y),this.layout(),this.unstamp(o.element),this.sortItemsByPosition(),o.isPlacing=!1,o.copyPlaceRectPosition())},h.prototype._bindFitEvents=function(t){function e(){o++,2==o&&i.dispatchEvent("fitComplete",null,[t])}var i=this,o=0;t.on("layout",function(){return e(),!0}),this.on("layoutComplete",function(){return e(),!0})},h.prototype.resize=function(){var t=e(this.element),i=this.size&&t,o=this.options.isHorizontal?"innerHeight":"innerWidth";i&&t[o]==this.size[o]||this.layout()},h.prototype.itemDragStart=function(t){this.stamp(t);var e=this.getItem(t);e&&e.dragStart()},h.prototype.itemDragMove=function(t,e,i){function o(){r.layout(),delete r.dragTimeout}var n=this.getItem(t);n&&n.dragMove(e,i);var r=this;this.clearDragTimeout(),this.dragTimeout=setTimeout(o,40)},h.prototype.clearDragTimeout=function(){this.dragTimeout&&clearTimeout(this.dragTimeout)},h.prototype.itemDragEnd=function(e){var i,o=this.getItem(e);if(o&&(i=o.didDrag,o.dragStop()),!o||!i&&!o.needsPositioning)return void this.unstamp(e);t.add(o.element,"is-positioning-post-drag");var n=this._getDragEndLayoutComplete(e,o);o.needsPositioning?(o.on("layout",n),o.moveTo(o.placeRect.x,o.placeRect.y)):o&&o.copyPlaceRectPosition(),this.clearDragTimeout(),this.on("layoutComplete",n),this.layout()},h.prototype._getDragEndLayoutComplete=function(e,i){var o=i&&i.needsPositioning,n=0,r=o?2:1,s=this;return function(){return n++,n!=r?!0:(i&&(t.remove(i.element,"is-positioning-post-drag"),i.isPlacing=!1,i.copyPlaceRectPosition()),s.unstamp(e),s.sortItemsByPosition(),o&&s.dispatchEvent("dragItemPositioned",null,[i]),!0)}},h.prototype.bindDraggabillyEvents=function(t){t.on("dragStart",this.handleDraggabilly.dragStart),t.on("dragMove",this.handleDraggabilly.dragMove),t.on("dragEnd",this.handleDraggabilly.dragEnd)},h.prototype.bindUIDraggableEvents=function(t){t.on("dragstart",this.handleUIDraggable.start).on("drag",this.handleUIDraggable.drag).on("dragstop",this.handleUIDraggable.stop)},h.Rect=o,h.Packer=n,h})}).call(window)},function(t,e){t.exports='<div class="item col-xs-12"><slot></slot></div>'},function(t,e){t.exports="<div class=row><slot></slot></div>"},function(t,e,i){var o,n;o=i(10),n=i(25),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options:t.exports).template=n)},function(t,e,i){var o,n;o=i(11),n=i(26),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options:t.exports).template=n)}])});

/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(168);
	var truncate = __webpack_require__(195);
	    /**
	     * Truncate string at full words.
	     */
	     function crop(str, maxChars, append) {
	         str = toString(str);
	         return truncate(str, maxChars, append, true);
	     }

	     module.exports = crop;



/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(168);
	var trim = __webpack_require__(176);
	    /**
	     * Limit number of chars.
	     */
	    function truncate(str, maxChars, append, onlyFullWords){
	        str = toString(str);
	        append = append || '...';
	        maxChars = onlyFullWords? maxChars + 1 : maxChars;

	        str = trim(str);
	        if(str.length <= maxChars){
	            return str;
	        }
	        str = str.substr(0, maxChars - append.length);
	        //crop at last space or remove trailing whitespace
	        str = onlyFullWords? str.substr(0, str.lastIndexOf(' ')) : trim(str);
	        return str + append;
	    }
	    module.exports = truncate;



/***/ },

/***/ 196:
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"container-fluid docs-container\">\n\n\t<!-- Service Loading -->\n\t<div class=\"alert alert-default\" v-if=\"serviceLoading\">Loading ...</div>\n\t\n\t<!-- Display list -->\n\t<isotope v-if=\"!serviceLoading && packages.length\">\n\t\t<isotope-item class=\"col-md-4\" v-for=\"package in packages\">\n\t\t\t<div class=\"panel panel-default panel-package\" v-link=\"appHelpers.routeToPackage(package.name)\">\n\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t<h4 class=\"panel-title\">\n\t\t\t\t\t\t{{ package.name }}\n\t\t\t\t\t</h4>\n\t\t\t\t</div>\n\t\t\t\t<template v-if=\"package.content\">\n\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t{{ package.content | excerpt 60 }}\n\t\t\t\t\t</div>\n\t\t\t\t\t<hr>\n\t\t\t\t</template>\n\t\t\t\t<div class=\"panel-body text-center\">\n\t\t\t\t\t<strong>{{ package.components }}</strong> components\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</isotope-item>\n\t</isotope>\n\n\t<!-- No packages -->\n\t<div class=\"alert alert-default\" v-if=\"!serviceLoading && !packages.length\">\n\t\tNo packages to display.\n\t</div>\n\t\n</div>\n\n";

/***/ }

});
//# sourceMappingURL=1.1.js.map