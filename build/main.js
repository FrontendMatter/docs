webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _main = __webpack_require__(3);

	var _main2 = _interopRequireDefault(_main);

	var _router = __webpack_require__(206);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Router requires a component to start
	// The main application
	var Main = _vue2.default.extend({
		replace: false,
		components: { App: _main2.default }
	});

	// Vue router

	// Start
	_router2.default.start(Main, 'body');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(205)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Code/themekit-docs/themekit-docs-app/src/views/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _assign = __webpack_require__(5);

	var _assign2 = _interopRequireDefault(_assign);

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _app = __webpack_require__(20);

	var _app2 = _interopRequireDefault(_app);

	var _store = __webpack_require__(169);

	var _store2 = _interopRequireDefault(_store);

	var _vueAlgolia = __webpack_require__(204);

	var _themekitVue = __webpack_require__(171);

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		mixins: [_store2.default],
		data: function data() {
			return {
				appConfig: _app2.default.config,
				appHelpers: _app2.default.helpers,
				appState: _app2.default.state,
				versions: [],
				selectedVersion: null,
				pages: [],
				components: []
			};
		},

		route: {
			activate: 'pageState'
		},
		computed: {
			page: function page() {
				return this.appState.page;
			},
			packageName: function packageName() {
				return this.$route.params.packageName;
			},
			isPackageView: function isPackageView() {
				return this.packageName !== undefined;
			},
			version: function version() {
				return this.$route.params.version;
			},
			packageId: function packageId() {
				if (this.appState.pkg) {
					return this.appState.pkg.packageIdData.objectID;
				}
			},
			packageVersionId: function packageVersionId() {
				if (this.appState.pkg) {
					return this.appState.pkg.packageVersionIdData.objectID;
				}
			},
			menus: function menus() {
				var _this = this;

				return [{
					heading: 'Pages',
					class: {
						'sm-item-bordered': true,
						'sm-active-button-bg': true,
						'sm-condensed': true
					},
					children: this.pages.map(function (page) {
						return {
							label: page.data.title,
							route: _this.appHelpers.routeToPage(_this.packageName, _this.version, page.packageVersionPageIdData.pageId)
						};
					})
				}, {
					heading: 'Components',
					class: {
						'sm-item-bordered': true,
						'sm-active-button-bg': true,
						'sm-condensed': true
					},
					children: this.components.map(function (component) {
						return {
							label: component.label,
							route: _this.appHelpers.routeToComponent(_this.packageName, _this.version, component.componentIdData.componentName)
						};
					})
				}];
			},
			algoliaIndices: function algoliaIndices() {
				var _this2 = this;

				return [{
					name: 'components',
					label: 'Components',
					transformHit: this.transformComponentHit,
					queryOptions: function () {
						var options = {
							hitsPerPage: 5,
							distinct: true
						};
						if (_this2.isPackageView) {
							options = (0, _assign2.default)({}, options, {
								facets: '*',
								facetFilters: ['packageVersionIdData.packageId: ' + _this2.packageId, 'packageVersionIdData.version: ' + _this2.version]
							});
						}
						return options;
					}()
				}, {
					name: 'packages',
					label: 'Packages',
					transformHit: this.transformPackageHit,
					queryOptions: function () {
						var options = {
							hitsPerPage: 5,
							distinct: true
						};
						return options;
					}()
				}];
			}
		},
		methods: {
			excerpt: function excerpt() {
				return _vue2.default.filter('excerpt').apply(null, [].slice.call(arguments));
			},
			pageState: function pageState() {
				document.title = this.page.title + ' | ' + this.page.appTitle;
			},
			transformComponentHit: function transformComponentHit(hit) {
				hit.route = this.appHelpers.routeToComponent(hit.packageIdData.packageName, hit.packageVersionIdData.version, hit.componentIdData.componentName);
				if (hit.description) {
					hit.description = this.excerpt(hit.description.data);
				}
				return hit;
			},
			transformPackageHit: function transformPackageHit(hit) {
				hit.route = this.appHelpers.routeToPackage(hit.packageIdData.packageName, hit.packageVersionIdData.version);
				hit.label = hit.packageIdData.packageName;
				if (hit.description) {
					hit.description = this.excerpt(hit.description.data);
				}
				return hit;
			},
			updateVersion: function updateVersion() {
				this.selectedVersion = this.version;
				this.getPackage();
			},
			routeVersion: function routeVersion() {
				if (this.selectedVersion && this.version !== this.selectedVersion) {
					this.$router.go({ name: this.$route.name, params: { version: this.selectedVersion } });
				}
			},
			getPackage: function getPackage() {
				var _this3 = this;

				if (this.packageName) {
					return this.store.getPackageVersionByName(this.packageName, this.version).then(function (pkg) {
						return _this3.appState.pkg = pkg;
					});
				}
				this.appState.pkg = null;
			},
			getPackageVersions: function getPackageVersions() {
				var _this4 = this;

				if (this.appState.pkg) {
					this.store.getPackageVersions(this.packageId).then(function (versions) {
						return _this4.versions = versions;
					});
				}
			},
			onPackageChanged: function onPackageChanged() {
				var _this5 = this;

				this.components = [];
				this.pages = [];
				if (this.appState.pkg) {
					this.store.getPackageVersionComponents(this.packageVersionId).then(function (components) {
						return _this5.components = components;
					});
					this.store.getPackageVersionPages(this.packageVersionId).then(function (pages) {
						return _this5.pages = pages;
					});
				}
				this.getPackageVersions();
			}
		},
		created: function created() {
			this.getPackage();
		},

		watch: {
			page: {
				handler: 'pageState',
				deep: true
			},
			packageName: 'getPackage',
			version: 'updateVersion',
			selectedVersion: 'routeVersion',
			'appState.pkg': 'onPackageChanged',
			components: function components(value) {
				this.appState.components = value;
			}
		},
		components: {
			LayoutTransition: _themekitVue.LayoutTransition,
			SidebarTransition: _themekitVue.SidebarTransition,
			SidebarToggleButton: _themekitVue.SidebarToggleButton,
			SidebarMenu: _themekitVue.SidebarMenu,
			SidebarCollapseItem: _themekitVue.SidebarCollapseItem,
			Navbar: _themekitVue.Navbar,
			TabsNav: _themekitVue.TabsNav,
			AlgoliaSearchDropdown: _vueAlgolia.AlgoliaSearchDropdown
		}
	};
	// </script>
	// <template>
	//
	// 	<!-- Layout -->
	// 	<layout-transition>
	//
	// 		<!-- Navbar -->
	// 		<navbar slot="navbar-content" fixed="top" in-content>
	//
	// 			<a v-if="!isPackageView" v-link="appHelpers.routeToPackages()" slot="brand" class="navbar-brand">ThemeKit Docs</a>
	//
	// 			<!-- Sidebar Toggle Button -->
	// 			<sidebar-toggle-button
	// 				v-if="isPackageView"
	// 				slot="sidebar-toggle-button"
	// 				class="toggle pull-left"
	// 				sidebar-id="sidebar"
	// 				icon="fa fa-bars">
	// 			</sidebar-toggle-button>
	//
	// 			<tabs-nav nav-id="tabs-navbar"></tabs-nav>
	//
	// 			<div class="navbar-form navbar-left">
	// 				<algolia-search-dropdown
	// 					:algolia-app-id="appConfig.algolia.appId"
	// 					:algolia-api-key="appConfig.algolia.apiKey"
	// 					:algolia-indices="algoliaIndices">
	// 				</algolia-search-dropdown>
	// 			</div>
	//
	// 		</navbar>
	// 		<!-- // END Navbar -->
	//
	// 		<!-- Sidebar -->
	// 		<sidebar-transition
	// 			:show="isPackageView"
	// 			slot="sidebar"
	// 			position="left"
	// 			sidebar-id="sidebar"
	// 			size="3"
	// 			effect="reveal">
	//
	// 			<a v-link="appHelpers.routeToPackages()" slot="brand" class="sidebar-brand"><i class="fa fa-fw fa-chevron-left"></i> Packages</a>
	//
	// 			<!-- Service Loading -->
	// 			<p v-if="serviceLoading && !appState.pkg" class="sidebar-text">Loading ...</p>
	//
	// 			<template v-if="appState.pkg">
	// 				<!-- Package menu -->
	// 				<div class="sidebar-block bg-white">
	// 					<h4 class="sidebar-category">{{ appState.pkg.packageIdData.packageName }}</h4>
	// 					<p><a v-link="appHelpers.routeToPackage(packageName, version)">Package Overview</a></p>
	// 					<!-- Versions -->
	// 					<div class="form-group" v-if="versions.length">
	// 						<label for="version">Version</label>
	// 						<select id="version" class="form-control" v-model="selectedVersion">
	// 							<option v-for="v in versions" value="{{ v.version }}" :selected="v.version === version">{{ v.version }}</option>
	// 						</select>
	// 					</div>
	// 				</div>
	//
	// 				<!-- Sidebar Menus -->
	// 				<sidebar-menu
	// 					v-for="menu in menus"
	// 					:class="menu.class"
	// 					:heading="menu.heading"
	// 					v-if="menu.children.length">
	//
	// 					<!-- Sidebar Menu Items -->
	// 					<sidebar-collapse-item
	// 						v-for="item in menu.children"
	// 						:model="item">
	// 					</sidebar-collapse-item>
	// 					<!-- // END Sidebar Menu Items -->
	//
	// 				</sidebar-menu>
	// 				<!-- // END Sidebar Menus -->
	//
	// 			</template>
	//
	// 		</sidebar-transition>
	// 		<!-- // END Sidebar -->
	//
	// 		<!-- Content -->
	// 		<router-view></router-view>
	// 		<!-- // END Content -->
	//
	// 	</layout-transition>
	// 	<!-- // END layout -->
	//
	// </template>
	//
	// <script>

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	module.exports = __webpack_require__(10).Object.assign;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(13)});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(14)
	  , toObject = __webpack_require__(15)
	  , IObject  = __webpack_require__(17);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(19)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(16);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(18);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(170)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/mixins/store.vue: named exports in *.vue files are ignored.")}
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Code/themekit-docs/themekit-docs-app/src/mixins/store.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _app = __webpack_require__(20);

	var _app2 = _interopRequireDefault(_app);

	var _themekitVue = __webpack_require__(171);

	var _themekitDocsStore = __webpack_require__(172);

	var _themekitDocsStore2 = _interopRequireDefault(_themekitDocsStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		mixins: [_themekitVue.AlertNotification],
		data: function data() {
			return {
				appConfig: _app2.default.config,
				serviceLoading: false,
				serviceCompleteDebounce: null
			};
		},

		methods: {
			onServiceComplete: function onServiceComplete() {
				var _this = this;

				clearTimeout(this.serviceCompleteDebounce);
				this.serviceCompleteDebounce = setTimeout(function () {
					return _this.serviceLoading = false;
				}, 200);
			},
			onServiceError: function onServiceError(e) {
				this.alertNotificationError(e);
			},
			onServiceLoading: function onServiceLoading() {
				this.serviceLoading = true;
			}
		},
		created: function created() {
			_themekitDocsStore2.default.setRef(this.appConfig.storeFirebaseRef);
			_themekitDocsStore2.default.on('serviceLoading', this.onServiceLoading);
			_themekitDocsStore2.default.on('serviceComplete', this.onServiceComplete);
			_themekitDocsStore2.default.on('serviceError', this.onServiceError);
			this.store = _themekitDocsStore2.default;
		},
		destroyed: function destroyed() {
			_themekitDocsStore2.default.ref.off();
			_themekitDocsStore2.default.removeListener('serviceLoading', this.onServiceLoading);
			_themekitDocsStore2.default.removeListener('serviceComplete', this.onServiceComplete);
			_themekitDocsStore2.default.removeListener('serviceError', this.onServiceError);
			clearTimeout(this.serviceCompleteDebounce);
		}
	};
	// </script>
	// <script>

/***/ },
/* 171 */,
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _firebaseStore = __webpack_require__(173);

	var _firebaseStore2 = _interopRequireDefault(_firebaseStore);

	var _merge = __webpack_require__(181);

	var _merge2 = _interopRequireDefault(_merge);

	var _forOwn = __webpack_require__(188);

	var _forOwn2 = _interopRequireDefault(_forOwn);

	var _camelCase = __webpack_require__(192);

	var _camelCase2 = _interopRequireDefault(_camelCase);

	var _slugify = __webpack_require__(198);

	var _slugify2 = _interopRequireDefault(_slugify);

	var _firebase = __webpack_require__(203);

	var _firebase2 = _interopRequireDefault(_firebase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * ThemeKit Docs App Firebase Store.
	 * @extends {FirebaseStore}
	 */

	var Store = function (_FirebaseStore) {
		_inherits(Store, _FirebaseStore);

		/**
	  * Constructor
	  */

		function Store() {
			_classCallCheck(this, Store);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));
		}

		/*eslint spaced-comment:0*/
		//////////////
		// PACKAGES //
		//////////////

		/**
	  * Slugify version
	  * @param  {String} version The version i.e. 0.1.0
	  * @return {String}         The slugified version
	  */

		_createClass(Store, [{
			key: 'version',
			value: function version(_version) {
				if (_version === undefined) {
					throw new Error('The version is required');
				}
				return (0, _slugify2.default)(_version);
			}

			/**
	   * Get a Firebase reference for package IDs, by package name
	   * @param  {String} packageName 	The package name
	   * @return {Firebase}             	A Firebase reference
	   */

		}, {
			key: 'getRefPackageId',
			value: function getRefPackageId(packageName) {
				return this.getRef('package_id/' + packageName);
			}

			/**
	   * Get a Firebase reference for package ID data
	   * @param  {String} packageId 	The package ID
	   * @return {Firebase}           A Firebase reference
	   */

		}, {
			key: 'getRefPackageIdData',
			value: function getRefPackageIdData(packageId) {
				return this.getRef('package_id_data/' + packageId);
			}

			/**
	   * Get a Firebase reference for package version IDs, by package ID and version
	   * @param  {String} packageId 	The package ID
	   * @param  {String} version   	The package version (optional)
	   * @return {Firebase}           A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionId',
			value: function getRefPackageVersionId(packageId, version) {
				var ref = this.getRef('package_version_id/' + packageId);
				if (version) {
					return ref.child(this.version(version));
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for package version ID data
	   * @param  {String} packageVersionId 	The package version ID data
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionIdData',
			value: function getRefPackageVersionIdData(packageVersionId) {
				return this.getRef('package_version_id_data/' + packageVersionId);
			}

			/**
	   * Get a Firebase reference to package version description data
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionDescriptionData',
			value: function getRefPackageVersionDescriptionData(packageVersionId) {
				return this.getRef('package_version_description_data/' + packageVersionId);
			}

			/**
	   * Get a Firebase reference for package version IDs with description data, by package ID
	   * @param  {String} packageId        	The package ID
	   * @param  {String} packageVersionId 	The package version ID (optional)
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageDescription',
			value: function getRefPackageDescription(packageId, packageVersionId) {
				var ref = this.getRef('package_description/' + packageId);
				if (packageVersionId) {
					return ref.child(packageVersionId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference to package version readme data
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionReadmeData',
			value: function getRefPackageVersionReadmeData(packageVersionId) {
				return this.getRef('package_version_readme_data/' + packageVersionId);
			}

			/**
	   * Get a Firebase reference for package version IDs with readme data, by package ID
	   * @param  {String} packageId        	The package ID
	   * @param  {String} packageVersionId 	The package version ID (optional)
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageReadme',
			value: function getRefPackageReadme(packageId, packageVersionId) {
				var ref = this.getRef('package_readme/' + packageId);
				if (packageVersionId) {
					return ref.child(packageVersionId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for package version data
	   * @param  {String} packageVersionId 	The package version ID (optional)
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionData',
			value: function getRefPackageVersionData(packageVersionId) {
				var ref = this.getRef('package_version_data');
				if (packageVersionId) {
					ref = ref.child(packageVersionId);
				}
				return ref;
			}

			/**
	   * Fetch a package ID by package name
	   * @param  {String} packageName 	The package name
	   * @return {Promise}             	A Promise which resolves the package ID
	   */

		}, {
			key: 'getPackageId',
			value: function getPackageId(packageName) {
				return this.get(this.getRefPackageId(packageName)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch a package ID data
	   * @param  {String} packageId 	The package ID
	   * @return {Promise}           	A Promise
	   */

		}, {
			key: 'getPackageIdData',
			value: function getPackageIdData(packageId) {
				return this.get(this.getRefPackageIdData(packageId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a package ID for package name
	   * @param  {String} packageName 	The package name
	   * @return {Promise} 				A Promise which resolves the package ID
	   */

		}, {
			key: 'setPackageId',
			value: function setPackageId(packageName) {
				var ref = this.getRefPackageId(packageName);
				var packageId = ref.push().key();
				var data = {
					packageName: packageName
				};
				return Promise.all([
				// Package ID
				this.set(ref, packageId),
				// Package ID data
				this.set(this.getRefPackageIdData(packageId), data)]).then(function () {
					return packageId;
				});
			}

			/**
	   * Remove a package ID
	   * @param  {String} packageId 	The package ID
	   * @return {Promise}           	A Promise
	   */

		}, {
			key: 'removePackageId',
			value: function removePackageId(packageId) {
				var _this2 = this;

				return this.getPackageIdData(packageId).then(function (data) {
					return Promise.all([
					// Package ID
					_this2.remove(_this2.getRefPackageId(data.packageName)),
					// Package ID data
					_this2.remove(_this2.getRefPackageIdData(packageId))]);
				});
			}

			/**
	   * Fetch a package version ID, by package ID and version
	   * @param  {String} packageId 	The package ID
	   * @param  {String} version   	The version
	   * @return {Promise}           	A Promise
	   */

		}, {
			key: 'getPackageVersionId',
			value: function getPackageVersionId(packageId, version) {
				return this.get(this.getRefPackageVersionId(packageId, version)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch a package version ID data
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getPackageVersionIdData',
			value: function getPackageVersionIdData(packageVersionId) {
				return this.get(this.getRefPackageVersionIdData(packageVersionId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a package version ID, by package ID and version
	   * @param {String} packageId The package ID
	   * @param {String} version   The version
	   */

		}, {
			key: 'setPackageVersionId',
			value: function setPackageVersionId(packageId, version) {
				var ref = this.getRefPackageVersionId(packageId, version);
				var packageVersionId = ref.push().key();
				var data = {
					packageId: packageId,
					version: version
				};
				return Promise.all([
				// Package version ID
				this.set(ref, packageVersionId),
				// Package version ID data
				this.set(this.getRefPackageVersionIdData(packageVersionId), data)]).then(function () {
					return packageVersionId;
				});
			}

			/**
	   * Remove a package version ID
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'removePackageVersionId',
			value: function removePackageVersionId(packageVersionId) {
				var _this3 = this;

				return this.getPackageVersionIdData(packageVersionId).then(function (data) {
					return Promise.all([
					// Package version ID
					_this3.remove(_this3.getRefPackageVersionId(data.packageId, data.version)),
					// Package version ID data
					_this3.remove(_this3.getRefPackageVersionIdData(packageVersionId))])
					// Maybe remove package ID
					.then(function () {
						// Fetch package ID versions
						return _this3.get(_this3.getRefPackageVersionId(data.packageId)).then(function (snapshot) {
							if (!snapshot.exists()) {
								// Remove package ID
								return _this3.removePackageId(data.packageId);
							}
						});
					});
				});
			}

			/**
	   * Fetch all package version IDs for a package ID
	   * @param  {String} packageId 		The package ID
	   * @return {Promise}           		A Promise
	   */

		}, {
			key: 'getPackageVersionIds',
			value: function getPackageVersionIds(packageId) {
				var _this4 = this;

				return this.get(this.getRefPackageVersionId(packageId)).then(function (snapshot) {
					return _this4.snapshotArray(snapshot);
				});
			}

			/**
	   * Fetch the latest package version ID for a package ID
	   * @param  {String} packageId 		The package ID
	   * @return {Promise}           		A Promise
	   */

		}, {
			key: 'getLatestPackageVersionId',
			value: function getLatestPackageVersionId(packageId) {
				return this.getPackageVersionIds(packageId).then(function (ids) {
					return ids.pop();
				});
			}

			/**
	   * Create or update a package version
	   * @param {String} 	packageName 	The package name
	   * @param {String} 	version     	The version
	   */

		}, {
			key: 'setPackageVersion',
			value: function setPackageVersion(packageName, version) {
				var _this5 = this;

				var description = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
				var readme = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

				// Package ID
				return this.getPackageId(packageName).then(function (packageId) {
					if (!packageId) {
						return _this5.setPackageId(packageName);
					}
					return packageId;
				})
				// Package version ID
				.then(function (packageId) {
					return _this5.getPackageVersionId(packageId, version).then(function (packageVersionId) {
						if (!packageVersionId) {
							return _this5.setPackageVersionId(packageId, version);
						}
						return packageVersionId;
					});
				}).then(function (packageVersionId) {
					return Promise.all([
					// Package version description
					_this5.setPackageVersionDescription(packageVersionId, description),
					// Package version readme
					_this5.setPackageVersionReadme(packageVersionId, readme)]).then(function () {
						return packageVersionId;
					});
				})
				// Package version data
				.then(function (packageVersionId) {
					return _this5.set(_this5.getRefPackageVersionData(packageVersionId), { updated: _firebase2.default.ServerValue.TIMESTAMP }).then(function () {
						return packageVersionId;
					});
				});
			}

			/**
	   * Remove a package version
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise} 					A Promise
	   */

		}, {
			key: 'removePackageVersion',
			value: function removePackageVersion(packageVersionId) {
				var _this6 = this;

				return Promise.all([
				// Package version description
				this.setPackageVersionDescription(packageVersionId, null),
				// Package version readme
				this.setPackageVersionReadme(packageVersionId, null),
				// Package version components
				this.removePackageVersionComponents(packageVersionId),
				// Package pages
				this.removePackageVersionPages(packageVersionId),
				// Package version ID
				this.removePackageVersionId(packageVersionId)]).then(function () {
					return _this6.remove(_this6.getRefPackageVersionData(packageVersionId));
				});
			}

			/**
	   * Create, update or remove a package version description data
	   * @param {String} packageVersionId 	The package version ID
	   * @param {String} description      	The description data (null to remove)
	   */

		}, {
			key: 'setPackageVersionDescription',
			value: function setPackageVersionDescription(packageVersionId, description) {
				var _this7 = this;

				return this.getPackageVersionIdData(packageVersionId).then(function (data) {
					// Package version description data
					var descriptionRef = _this7.getRefPackageVersionDescriptionData(packageVersionId);
					// Package version ID with description data, by package ID
					var packageDescriptionRef = _this7.getRefPackageDescription(data.packageId, packageVersionId);

					// create or update
					if (description) {
						return Promise.all([
						// Package version description data
						_this7.set(descriptionRef, description),
						// Package version ID with description data, by package ID
						_this7.set(packageDescriptionRef, true)]);
					}
					// remove
					return Promise.all([
					// Package version description data
					_this7.remove(descriptionRef),
					// Package version ID with description data, by package ID
					_this7.remove(packageDescriptionRef)]);
				});
			}

			/**
	   * Fetch a package version description
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getPackageVersionDescription',
			value: function getPackageVersionDescription(packageVersionId) {
				var _this8 = this;

				// Package version description data
				return this.get(this.getRefPackageVersionDescriptionData(packageVersionId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var _ret = function () {
							var data = {
								data: snapshot.val()
							};
							// Package version ID data
							return {
								v: _this8.getPackageVersionIdData(packageVersionId).then(function (packageVersionIdData) {
									return (0, _merge2.default)(data, { packageVersionIdData: packageVersionIdData });
								})
								// Package ID data
								.then(function (data) {
									return _this8.getPackageIdData(data.packageVersionIdData.packageId).then(function (packageIdData) {
										return (0, _merge2.default)(data, { packageIdData: packageIdData });
									});
								})
							};
						}();

						if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
					}
					return null;
				});
			}

			/**
	   * Fetch the latest package description
	   * @param  {String} packageId 	The package ID
	   * @return {Promise}           	A Promise
	   */

		}, {
			key: 'getLatestPackageDescription',
			value: function getLatestPackageDescription(packageId) {
				var _this9 = this;

				return this.get(this.getRefPackageDescription(packageId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var latestPackageVersionIdWithDescription = Object.keys(snapshot.val()).pop();
						return _this9.getPackageVersionDescription(latestPackageVersionIdWithDescription);
					}
				});
			}

			/**
	   * Create, update or remove a package version readme data
	   * @param {String} packageVersionId 	The package version ID
	   * @param {String} readme      			The readme data (null to remove)
	   */

		}, {
			key: 'setPackageVersionReadme',
			value: function setPackageVersionReadme(packageVersionId, readme) {
				var _this10 = this;

				return this.getPackageVersionIdData(packageVersionId).then(function (data) {
					// Package version readme data
					var readmeRef = _this10.getRefPackageVersionReadmeData(packageVersionId);
					// Package version ID with readme data, by package ID
					var packageReadmeRef = _this10.getRefPackageReadme(data.packageId, packageVersionId);

					// create or update
					if (readme) {
						return Promise.all([
						// Package version readme data
						_this10.set(readmeRef, readme),
						// Package version ID with readme data, by package ID
						_this10.set(packageReadmeRef, true)]);
					}
					// remove
					return Promise.all([
					// Package version readme data
					_this10.remove(readmeRef),
					// Package version ID with readme data, by package ID
					_this10.remove(packageReadmeRef)]);
				});
			}

			/**
	   * Fetch a package version readme
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getPackageVersionReadme',
			value: function getPackageVersionReadme(packageVersionId) {
				var _this11 = this;

				// Package version readme data
				return this.get(this.getRefPackageVersionReadmeData(packageVersionId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var _ret2 = function () {
							var data = {
								data: snapshot.val()
							};
							// Package version ID data
							return {
								v: _this11.getPackageVersionIdData(packageVersionId).then(function (packageVersionIdData) {
									return (0, _merge2.default)(data, { packageVersionIdData: packageVersionIdData });
								})
								// Package ID data
								.then(function (data) {
									return _this11.getPackageIdData(data.packageVersionIdData.packageId).then(function (packageIdData) {
										return (0, _merge2.default)(data, { packageIdData: packageIdData });
									});
								})
							};
						}();

						if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
					}
					return null;
				});
			}

			/**
	   * Fetch the latest package readme
	   * @param  {String} packageId 	The package ID
	   * @return {Promise}           	A Promise
	   */

		}, {
			key: 'getLatestPackageReadme',
			value: function getLatestPackageReadme(packageId) {
				var _this12 = this;

				return this.get(this.getRefPackageReadme(packageId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var latestPackageVersionIdWithReadme = Object.keys(snapshot.val()).pop();
						return _this12.getPackageVersionReadme(latestPackageVersionIdWithReadme);
					}
				});
			}

			/**
	   * Fetch all packages with latest version
	   * @return {Promise} A Promise which resolves a packages Array.
	   */

		}, {
			key: 'getPackages',
			value: function getPackages() {
				var _this13 = this;

				return this.get('package_id').then(function (snapshot) {
					var packageIDs = _this13.snapshotArray(snapshot);
					// fetch latest versions IDs
					return Promise.all(packageIDs.map(function (packageId) {
						return _this13.getLatestPackageVersionId(packageId);
					}))
					// fetch packages
					.then(function (latestPackageIDs) {
						return Promise.all(latestPackageIDs.map(function (packageVersionId) {
							return _this13.getPackageVersion(packageVersionId);
						}));
					});
				});
			}

			/**
	   * Fetch a package version
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise} 					A Promise which resolves a package Object
	   */

		}, {
			key: 'getPackageVersion',
			value: function getPackageVersion(packageVersionId) {
				var _this14 = this;

				// Package version ID data
				return this.getPackageVersionIdData(packageVersionId).then(function (packageVersionIdData) {
					return { packageVersionIdData: packageVersionIdData };
				})
				// Package ID data
				.then(function (data) {
					return _this14.getPackageIdData(data.packageVersionIdData.packageId).then(function (packageIdData) {
						return (0, _merge2.default)(data, { packageIdData: packageIdData });
					});
				})
				// Package version component count
				.then(function (data) {
					return _this14.getPackageVersionComponentCount(packageVersionId).then(function (count) {
						return data.components = count;
					}).then(function () {
						return data;
					});
				})
				// Package description
				.then(function (data) {
					// Package version description
					return _this14.getPackageVersionDescription(packageVersionId).then(function (description) {
						if (!description) {
							return _this14.getLatestPackageDescription(data.packageIdData.objectID);
						}
						return description;
					}).then(function (description) {
						return (0, _merge2.default)(data, { description: description });
					});
				})
				// Package readme
				.then(function (data) {
					// Package version readme
					return _this14.getPackageVersionReadme(packageVersionId).then(function (readme) {
						if (!readme) {
							return _this14.getLatestPackageReadme(data.packageIdData.objectID);
						}
						return readme;
					}).then(function (readme) {
						return (0, _merge2.default)(data, { readme: readme });
					});
				});
			}

			/**
	   * Fetch a package version by package name and version
	   * @param  {String} packageName 	The package name
	   * @param  {String} version     	The version
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'getPackageVersionByName',
			value: function getPackageVersionByName(packageName, version) {
				var _this15 = this;

				return this.getPackageId(packageName).then(function (packageId) {
					return _this15.getPackageVersionId(packageId, version);
				}).then(function (packageVersionId) {
					return _this15.getPackageVersion(packageVersionId);
				});
			}

			/**
	   * Fetch all versions for a package ID
	   * @param  {String} packageId 	The package ID
	   * @return {Promise}           	A Promise which resolves a packages Array
	   */

		}, {
			key: 'getPackageVersions',
			value: function getPackageVersions(packageId) {
				var _this16 = this;

				return this.getPackageVersionIds(packageId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this16.getPackageVersionIdData(id);
					}));
				});
			}

			///////////////////////
			// PACKAGE LISTENERS //
			///////////////////////

			/**
	   * Listen for child_added events on package version data
	   * Fetches the latest package version
	   * @param  {Function} cb    The complete callback
	   * @param  {Function} error The error callback
	   */

		}, {
			key: 'onPackageAdded',
			value: function onPackageAdded(cb, error) {
				var _this17 = this;

				this.listen(this.getRefPackageVersionData(), 'child_added', function (snapshot) {
					var packageVersionId = snapshot.key();
					_this17.getPackageVersionIdData(packageVersionId).then(function (packageVersionIdData) {
						// Latest package version ID
						_this17.getLatestPackageVersionId(packageVersionIdData.packageId).then(function (latestPackageVersionId) {
							// Package version
							_this17.getPackageVersion(latestPackageVersionId)
							// Complete callback
							.then(function (data) {
								return cb(data);
							});
						});
					});
				}, error);
			}

			/**
	   * Callback for child_added, child_changed event listeners on package version data
	   * @param  {Function} cb       The complete callback
	   * @param  {Object}   snapshot A Firebase snapshot
	   */

		}, {
			key: 'onPackageVersionUpdateCb',
			value: function onPackageVersionUpdateCb(cb, snapshot) {
				this.getPackageVersion(snapshot.key()).then(function (data) {
					return cb(data);
				});
			}

			/**
	   * Listen for child_added events on package version data
	   * Fetches the package version
	   * @param  {Function} cb    	The complete callback
	   * @param  {Function} error 	The error callback
	   */

		}, {
			key: 'onPackageVersionAdded',
			value: function onPackageVersionAdded(cb, error) {
				this.listen(this.getRefPackageVersionData(), 'child_added', this.onPackageVersionUpdateCb.bind(this, cb), error);
			}

			/**
	   * Listen for child_changes events on package version data
	   * Fetches the package version
	   * @param  {Function} cb    	The complete callback
	   * @param  {Function} error 	The error callback
	   */

		}, {
			key: 'onPackageVersionChanged',
			value: function onPackageVersionChanged(cb, error) {
				this.listen(this.getRefPackageVersionData(), 'child_changed', this.onPackageVersionUpdateCb.bind(this, cb), error);
			}

			/**
	   * Listen for child_removed events on package version data
	   * @param  {Function} cb    	The complete callback
	   * @param  {Function} error 	The error callback
	   */

		}, {
			key: 'onPackageVersionRemoved',
			value: function onPackageVersionRemoved(cb, error) {
				this.listen(this.getRefPackageVersionData(), 'child_removed', function (snapshot) {
					return cb(snapshot.key());
				}, error);
			}

			////////////////
			// COMPONENTS //
			////////////////

			/**
	   * Get a Firebase reference for component IDs, by package ID and component name
	   * @param  {String} packageId     	The package ID
	   * @param  {String} componentName 	The component name
	   * @return {Firebase}               A Firebase reference
	   */

		}, {
			key: 'getRefComponentId',
			value: function getRefComponentId(packageId, componentName) {
				return this.getRef('component_id/' + packageId + '/' + componentName);
			}

			/**
	   * Get a Firebase reference for component ID data
	   * @param  {String} componentId 	The component ID
	   * @return {Firebase}             	A Firebase reference
	   */

		}, {
			key: 'getRefComponentIdData',
			value: function getRefComponentIdData(componentId) {
				return this.getRef('component_id_data/' + componentId);
			}

			/**
	   * Get a Firebase reference for component version IDs, by package version ID and component ID
	   * @param  {String} packageVersionId 	The package version ID
	   * @param  {String} componentId      	The component ID
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionId',
			value: function getRefComponentVersionId(packageVersionId, componentId) {
				var ref = this.getRef('component_version_id/' + packageVersionId);
				if (componentId) {
					return ref.child(componentId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for component version ID data
	   * @param  {String} componentVersionId 		The component version ID
	   * @return {Firebase}                    	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionIdData',
			value: function getRefComponentVersionIdData(componentVersionId) {
				var ref = this.getRef('component_version_id_data');
				if (componentVersionId) {
					ref = ref.child(componentVersionId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for component version data
	   * @param  {String} componentVersionId 		The component version ID (optional)
	   * @return {Firebase}                    	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionData',
			value: function getRefComponentVersionData(componentVersionId) {
				var ref = this.getRef('component_version_data');
				if (componentVersionId) {
					ref = ref.child(componentVersionId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference to component version description data
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionDescriptionData',
			value: function getRefComponentVersionDescriptionData(componentVersionId) {
				return this.getRef('component_version_description_data/' + componentVersionId);
			}

			/**
	   * Get a Firebase reference for component version IDs with description data, by component ID
	   * @param  {String} componentId        	The component ID
	   * @param  {String} componentVersionId 	The component version ID (optional)
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefComponentDescription',
			value: function getRefComponentDescription(componentId, componentVersionId) {
				var ref = this.getRef('component_description/' + componentId);
				if (componentVersionId) {
					return ref.child(componentVersionId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for component version IDs by component ID
	   * @param  {String} componentId        		The component ID
	   * @param  {String} componentVersionId 		The component version ID (optional)
	   * @return {Firebase}                    	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersion',
			value: function getRefComponentVersion(componentId, componentVersionId) {
				var ref = this.getRef('component_version/' + componentId);
				if (componentVersionId) {
					return ref.child(componentVersionId);
				}
				return ref;
			}

			/**
	   * Fetch a component ID by package ID and component name
	   * @param  {String} packageId     	The package ID
	   * @param  {String} componentName 	The component name
	   * @return {Promise}               	A Promise
	   */

		}, {
			key: 'getComponentId',
			value: function getComponentId(packageId, componentName) {
				return this.get(this.getRefComponentId(packageId, componentName)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch a component ID data
	   * @param  {String} componentId 	The component ID
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'getComponentIdData',
			value: function getComponentIdData(componentId) {
				return this.get(this.getRefComponentIdData(componentId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a component ID, by package ID and component name
	   * @param {String} packageId     	The package ID
	   * @param {String} componentName 	The component name
	   */

		}, {
			key: 'setComponentId',
			value: function setComponentId(packageId, componentName) {
				var ref = this.getRefComponentId(packageId, componentName);
				var componentId = ref.push().key();
				var data = {
					packageId: packageId,
					componentName: componentName
				};
				return Promise.all([
				// Component ID
				this.set(ref, componentId),
				// Component ID data
				this.set(this.getRefComponentIdData(componentId), data)]).then(function () {
					return componentId;
				});
			}

			/**
	   * Remove a component ID
	   * @param  {String} componentId 	The component ID
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'removeComponentId',
			value: function removeComponentId(componentId) {
				var _this18 = this;

				return this.getComponentIdData(componentId).then(function (data) {
					return Promise.all([
					// Component ID
					_this18.remove(_this18.getRefComponentId(data.packageId, data.componentName)),
					// Component ID data
					_this18.remove(_this18.getRefComponentIdData(componentId))]);
				});
			}

			/**
	   * Fetch a component version ID
	   * @param  {String} packageVersionId 	The package version ID
	   * @param  {String} componentId      	The component ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getComponentVersionId',
			value: function getComponentVersionId(packageVersionId, componentId) {
				return this.get(this.getRefComponentVersionId(packageVersionId, componentId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Remove a component version ID data
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Promise}                    A Promise
	   */

		}, {
			key: 'getComponentVersionIdData',
			value: function getComponentVersionIdData(componentVersionId) {
				return this.get(this.getRefComponentVersionIdData(componentVersionId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a component version ID, by package version ID and component ID
	   * @param {String} packageVersionId 	The package version ID
	   * @param {String} componentId      	The component ID
	   */

		}, {
			key: 'setComponentVersionId',
			value: function setComponentVersionId(packageVersionId, componentId) {
				var ref = this.getRefComponentVersionId(packageVersionId, componentId);
				var componentVersionId = ref.push().key();
				var data = {
					packageVersionId: packageVersionId,
					componentId: componentId
				};
				return Promise.all([
				// Component version ID
				this.set(ref, componentVersionId),
				// Component version ID data
				this.set(this.getRefComponentVersionIdData(componentVersionId), data),
				// Component version IDs by component ID (Component <> Component version)
				this.set(this.getRefComponentVersion(componentId, componentVersionId), true)]).then(function () {
					return componentVersionId;
				});
			}

			/**
	   * Remove a component version ID
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Promise}                    A Promise
	   */

		}, {
			key: 'removeComponentVersionId',
			value: function removeComponentVersionId(componentVersionId) {
				var _this19 = this;

				return this.getComponentVersionIdData(componentVersionId).then(function (data) {
					return Promise.all([
					// Component version ID
					_this19.remove(_this19.getRefComponentVersionId(data.packageVersionId, data.componentId)),
					// Component version ID data
					_this19.remove(_this19.getRefComponentVersionIdData(componentVersionId)),
					// Component version IDs by component ID (Component <> Component version)
					_this19.remove(_this19.getRefComponentVersion(data.componentId, componentVersionId))])
					// Maybe remove component ID
					.then(function () {
						// Component <> Component version
						return _this19.get(_this19.getRefComponentVersion(data.componentId)).then(function (snapshot) {
							if (!snapshot.exists()) {
								// Remove component ID
								return _this19.removeComponentId(data.componentId);
							}
						});
					});
				});
			}

			/**
	   * Create or update a component version
	   * @param {String} packageVersionId The package version ID
	   * @param {String} componentName    The component name
	   * @param {Object} data             The component data
	   */

		}, {
			key: 'setComponentVersion',
			value: function setComponentVersion(packageVersionId, componentName, data) {
				var _this20 = this;

				var description = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

				// Package version ID data
				return this.getPackageVersionIdData(packageVersionId).then(function (packageVersionIdData) {
					var packageId = packageVersionIdData.packageId;
					// Component ID

					return _this20.getComponentId(packageId, componentName).then(function (componentId) {
						if (!componentId) {
							return _this20.setComponentId(packageId, componentName);
						}
						return componentId;
					});
				})
				// Component version ID
				.then(function (componentId) {
					return _this20.getComponentVersionId(packageVersionId, componentId).then(function (componentVersionId) {
						if (!componentVersionId) {
							return _this20.setComponentVersionId(packageVersionId, componentId);
						}
						return componentVersionId;
					});
				})
				// Package version description
				.then(function (componentVersionId) {
					return _this20.setComponentVersionDescription(componentVersionId, description).then(function () {
						return componentVersionId;
					});
				})
				// Component version data
				.then(function (componentVersionId) {
					data.updated = _firebase2.default.ServerValue.TIMESTAMP;
					return _this20.set(_this20.getRefComponentVersionData(componentVersionId), data).then(function () {
						return componentVersionId;
					});
				});
			}

			/**
	   * Fetch a component version by component version ID.
	   * @param  {Firebase} componentVersionId 	The component version ID.
	   * @return {Promise} 						A Promise which resolves an Array of indexes.
	   */

		}, {
			key: 'getComponentVersionById',
			value: function getComponentVersionById(componentVersionId) {
				var _this21 = this;

				return Promise.all([
				// Component version data
				this.get(this.getRefComponentVersionData(componentVersionId)).then(function (snapshot) {
					return snapshot.val();
				}),
				// Component version ID data
				this.getComponentVersionIdData(componentVersionId),
				// Component version props
				this.getComponentVersionProps(componentVersionId)]).then(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 3);

					var data = _ref2[0];
					var componentVersionIdData = _ref2[1];
					var props = _ref2[2];
					return (0, _merge2.default)(data, { componentVersionIdData: componentVersionIdData, props: props });
				}).then(function (data) {
					return Promise.all([
					// Component ID data
					_this21.getComponentIdData(data.componentVersionIdData.componentId),
					// Package version ID data
					_this21.getPackageVersionIdData(data.componentVersionIdData.packageVersionId)]).then(function (_ref3) {
						var _ref4 = _slicedToArray(_ref3, 2);

						var componentIdData = _ref4[0];
						var packageVersionIdData = _ref4[1];
						return (0, _merge2.default)(data, { componentIdData: componentIdData, packageVersionIdData: packageVersionIdData });
					});
				}).then(function (data) {
					return Promise.all([
					// Package ID data
					_this21.getPackageIdData(data.packageVersionIdData.packageId),
					// Component version description
					_this21.getComponentVersionDescription(componentVersionId).then(function (description) {
						// Component description
						if (!description) {
							return _this21.getLatestComponentDescription(data.componentIdData.objectID);
						}
						return description;
					}),
					// Component demos
					_this21.getComponentDemos(data.componentIdData.objectID)]).then(function (_ref5) {
						var _ref6 = _slicedToArray(_ref5, 3);

						var packageIdData = _ref6[0];
						var description = _ref6[1];
						var demos = _ref6[2];
						return (0, _merge2.default)(data, { packageIdData: packageIdData, description: description, demos: demos });
					});
				});
			}

			/**
	   * Fetch a component version by component name, package name and version
	   * @param  {String} componentName 	The component name
	   * @param  {String} packageName   	The package name
	   * @param  {String} version       	The version
	   * @return {Promise}               	A Promise
	   */

		}, {
			key: 'getComponentVersionByName',
			value: function getComponentVersionByName(componentName, packageName, version) {
				var _this22 = this;

				var packageId = undefined;

				// Package ID
				return this.getPackageId(packageName).then(function (pkgId) {
					packageId = pkgId;

					// Package Version ID
					return _this22.getPackageVersionId(packageId, version);
				}).then(function (packageVersionId) {
					// Component ID
					return _this22.getComponentId(packageId, componentName).then(function (componentId) {
						// Component version ID
						return _this22.getComponentVersionId(packageVersionId, componentId);
					})
					// Component version by component version ID
					.then(function (componentVersionId) {
						return _this22.getComponentVersionById(componentVersionId);
					});
				});
			}

			/**
	   * Removes a component from Firebase.
	   * @param  {String} componentVersionId 	The component version ID.
	   * @return {Promise} 					A Promise.
	   */

		}, {
			key: 'removeComponentVersion',
			value: function removeComponentVersion(componentVersionId) {
				return Promise.all([
				// Component version description
				this.setComponentVersionDescription(componentVersionId, null),
				// Component version props
				this.removeComponentVersionProps(componentVersionId),
				// Component version ID
				this.removeComponentVersionId(componentVersionId),
				// Component version data
				this.remove(this.getRefComponentVersionData(componentVersionId))]);
			}

			/**
	   * Create, update or remove a component version description data
	   * @param {String} componentVersionId 	The component version ID
	   * @param {String} description      	The description data (null to remove)
	   */

		}, {
			key: 'setComponentVersionDescription',
			value: function setComponentVersionDescription(componentVersionId, description) {
				var _this23 = this;

				return this.getComponentVersionIdData(componentVersionId).then(function (data) {
					// Component version description data
					var descriptionRef = _this23.getRefComponentVersionDescriptionData(componentVersionId);
					// Component version ID with description data, by component ID
					var componentDescriptionRef = _this23.getRefComponentDescription(data.componentId, componentVersionId);

					// create or update
					if (description) {
						return Promise.all([
						// Component version description data
						_this23.set(descriptionRef, description),
						// Component version ID with description data, by component ID
						_this23.set(componentDescriptionRef, true)]);
					}
					// remove
					return Promise.all([
					// Component version description data
					_this23.remove(descriptionRef),
					// Component version ID with description data, by component ID
					_this23.remove(componentDescriptionRef)]);
				});
			}

			/**
	   * Fetch a component version description
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getComponentVersionDescription',
			value: function getComponentVersionDescription(componentVersionId) {
				var _this24 = this;

				// Component version description data
				return this.get(this.getRefComponentVersionDescriptionData(componentVersionId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var _ret3 = function () {
							var data = {
								data: snapshot.val()
							};
							// Component version ID data
							return {
								v: _this24.getComponentVersionIdData(componentVersionId).then(function (componentVersionIdData) {
									return (0, _merge2.default)(data, { componentVersionIdData: componentVersionIdData });
								})
								// Component ID data
								.then(function (data) {
									return _this24.getComponentIdData(data.componentVersionIdData.componentId).then(function (componentIdData) {
										return (0, _merge2.default)(data, { componentIdData: componentIdData });
									});
								})
								// Package version ID data
								.then(function (data) {
									return _this24.getPackageVersionIdData(data.componentVersionIdData.packageVersionId).then(function (packageVersionIdData) {
										return (0, _merge2.default)(data, { packageVersionIdData: packageVersionIdData });
									});
								})
								// Package ID data
								.then(function (data) {
									return _this24.getPackageIdData(data.packageVersionIdData.packageId).then(function (packageIdData) {
										return (0, _merge2.default)(data, { packageIdData: packageIdData });
									});
								})
							};
						}();

						if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
					}
					return null;
				});
			}

			/**
	   * Fetch the latest component description
	   * @param  {String} componentId 	The component ID
	   * @return {Promise}           		A Promise
	   */

		}, {
			key: 'getLatestComponentDescription',
			value: function getLatestComponentDescription(componentId) {
				var _this25 = this;

				return this.get(this.getRefComponentDescription(componentId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var latestComponentVersionIdWithDescription = Object.keys(snapshot.val()).pop();
						return _this25.getComponentVersionDescription(latestComponentVersionIdWithDescription);
					}
				});
			}

			/**
	   * Get the component versions IDs for a package version from Firebase.
	   * @param  {String} packageVersionId 	The package version ID.
	   * @return {Promise} 					A Promise which resolves an Array.
	   */

		}, {
			key: 'getPackageVersionComponentIds',
			value: function getPackageVersionComponentIds(packageVersionId) {
				var _this26 = this;

				return this.get(this.getRefComponentVersionId(packageVersionId)).then(function (snapshot) {
					if (!snapshot.exists()) {
						return Promise.resolve([]);
					}
					return _this26.snapshotArray(snapshot);
				});
			}

			/**
	   * Get the number of components for a package version.
	   * @param  {String} packageVersionId 	The package version ID.
	   * @return {Promise} 					A Promise which resolves a Number.
	   */

		}, {
			key: 'getPackageVersionComponentCount',
			value: function getPackageVersionComponentCount(packageVersionId) {
				return this.getPackageVersionComponentIds(packageVersionId).then(function (ids) {
					return ids.length;
				});
			}

			/**
	   * Get the components for a package version.
	   * @param  {String} packageVersionId	The package version ID.
	   * @return {Promise} 					A Promise which resolves the components Array.
	   */

		}, {
			key: 'getPackageVersionComponents',
			value: function getPackageVersionComponents(packageVersionId) {
				var _this27 = this;

				return this.getPackageVersionComponentIds(packageVersionId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this27.getComponentVersionById(id);
					}));
				});
			}

			/**
	   * Remove the components belonging to a package version.
	   * @param  {String} packageVersionId	The package version ID.
	   * @return {Promise} 					A Promise.
	   */

		}, {
			key: 'removePackageVersionComponents',
			value: function removePackageVersionComponents(packageVersionId) {
				var _this28 = this;

				return this.getPackageVersionComponentIds(packageVersionId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this28.removeComponentVersion(id);
					}));
				});
			}

			/////////////////////////
			// COMPONENT LISTENERS //
			/////////////////////////

			/**
	   * Listen for child_added events on package version components
	   * @param  {String}   packageVersionId The package version ID
	   * @param  {Function} cb               The complete callback
	   * @param  {Function} error            The error callback
	   */

		}, {
			key: 'onPackageVersionComponentAdded',
			value: function onPackageVersionComponentAdded(packageVersionId, cb, error) {
				var _this29 = this;

				this.listen(this.getRefComponentVersionId(packageVersionId), 'child_added', function (snapshot) {
					_this29.getComponentVersionById(snapshot.val()).then(function (data) {
						return cb(data);
					});
				});
			}

			/**
	   * Remove child_added listener on package version components
	   * @param  {String} packageVersionId The package version ID
	   */

		}, {
			key: 'offPackageVersionComponentAdded',
			value: function offPackageVersionComponentAdded(packageVersionId) {
				this.getRefComponentVersionId(packageVersionId).off('child_added');
			}
		}, {
			key: 'onComponentVersionUpdateCb',
			value: function onComponentVersionUpdateCb(cb, snapshot) {
				this.getComponentVersionById(snapshot.key()).then(function (data) {
					return cb(data);
				});
			}
		}, {
			key: 'onComponentVersionAdded',
			value: function onComponentVersionAdded(cb, error) {
				this.listen(this.getRefComponentVersionData(), 'child_added', this.onComponentVersionUpdateCb.bind(this, cb), error);
			}
		}, {
			key: 'onComponentVersionChanged',
			value: function onComponentVersionChanged(cb, error) {
				this.listen(this.getRefComponentVersionData(), 'child_changed', this.onComponentVersionUpdateCb.bind(this, cb), error);
			}

			/**
	   * Listen for child_removed events on component version IDs
	   * @param  {Function} cb    The complete callback
	   * @param  {Function} error The error callback
	   */

		}, {
			key: 'onComponentVersionRemoved',
			value: function onComponentVersionRemoved(cb, error) {
				this.listen(this.getRefComponentVersionIdData(), 'child_removed', function (snapshot) {
					return cb(snapshot.key());
				}, error);
			}

			/**
	   * Remove child_removed listener on component version IDs
	   */

		}, {
			key: 'offComponentVersionRemoved',
			value: function offComponentVersionRemoved() {
				this.getRefComponentVersionIdData().off('child_removed');
			}

			/////////////////////
			// COMPONENT PROPS //
			/////////////////////

			/**
	   * Get a Firebase reference for component prop IDs, by component ID and prop name
	   * @param  {String} componentId 	The component ID
	   * @param  {String} propName    	The prop name
	   * @return {Firebase}             	A Firebase reference
	   */

		}, {
			key: 'getRefComponentPropId',
			value: function getRefComponentPropId(componentId, propName) {
				return this.getRef('component_prop_id/' + componentId + '/' + propName);
			}

			/**
	   * Get a Firebase reference for component prop ID data
	   * @param  {String} propId 		The component prop ID
	   * @return {Firebase}        	A Firebase reference
	   */

		}, {
			key: 'getRefComponentPropIdData',
			value: function getRefComponentPropIdData(propId) {
				return this.getRef('component_prop_id_data/' + propId);
			}

			/**
	   * Get a Firebase reference for component version prop IDs, by component version ID and prop ID
	   * @param  {String} componentVersionId 		The component version ID
	   * @param  {String} propId             		The prop ID
	   * @return {Firebase}                    	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionPropId',
			value: function getRefComponentVersionPropId(componentVersionId, propId) {
				var ref = this.getRef('component_version_prop_id/' + componentVersionId);
				if (propId) {
					return ref.child(propId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for component version prop IDs, by prop ID
	   * Component prop <> Component version prop relationship
	   * 
	   * @param  {String} propId                 		The component prop ID
	   * @param  {String} componentVersionPropId 		The component version prop ID
	   * @return {Firebase}                        	A Firebase reference
	   */

		}, {
			key: 'getRefComponentProp',
			value: function getRefComponentProp(propId, componentVersionPropId) {
				var ref = this.getRef('component_prop/' + propId);
				if (componentVersionPropId) {
					return ref.child(componentVersionPropId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for component version prop ID data
	   * @param  {String} componentVersionPropId 		The component version prop ID
	   * @return {Firebase}                        	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionPropIdData',
			value: function getRefComponentVersionPropIdData(componentVersionPropId) {
				return this.getRef('component_version_prop_id_data/' + componentVersionPropId);
			}

			/**
	   * Get a Firebase reference for component version prop data
	   * @param  {String} componentVersionPropId 		The component version prop ID
	   * @return {Firebase}                        	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionPropData',
			value: function getRefComponentVersionPropData(componentVersionPropId) {
				return this.getRef('component_version_prop_data/' + componentVersionPropId);
			}

			/**
	   * Get a Firebase reference for component version prop description data
	   * @param  {String} componentVersionPropId 		The component version prop ID
	   * @return {Firebase}                        	A Firebase reference
	   */

		}, {
			key: 'getRefComponentVersionPropDescription',
			value: function getRefComponentVersionPropDescription(componentVersionPropId) {
				return this.getRef('component_version_prop_description_data/' + componentVersionPropId);
			}

			/**
	   * Get a Firebase reference for component version prop IDs with description data, by prop ID
	   * @param  {String} propId 		The prop ID
	   * @return {Firebase}        	A Firebase reference
	   */

		}, {
			key: 'getRefComponentPropDescription',
			value: function getRefComponentPropDescription(propId) {
				return this.getRef('component_prop_description/' + propId);
			}

			/**
	   * Fetch the component prop ID by component ID and prop name
	   * @param  {String} componentId 	The component ID
	   * @param  {String} propName    	The prop name
	   * @return {Promise}             	A Promise which resolves the component prop ID value
	   */

		}, {
			key: 'getComponentPropId',
			value: function getComponentPropId(componentId, propName) {
				return this.get(this.getRefComponentPropId(componentId, propName)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch the component prop ID data
	   * @param  {String} propId 		The component prop ID
	   * @return {Promise}        	A Promise
	   */

		}, {
			key: 'getComponentPropIdData',
			value: function getComponentPropIdData(propId) {
				return this.get(this.getRefComponentPropIdData(propId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a component prop ID by component ID and prop name
	   * @param {String} componentId 		The component ID
	   * @param {String} propName    		The prop name
	   * @return {Promise} 				A Promise which resolves the component prop ID
	   */

		}, {
			key: 'setComponentPropId',
			value: function setComponentPropId(componentId, propName) {
				var ref = this.getRefComponentPropId(componentId, propName);
				var componentPropId = ref.push().key();
				var data = {
					componentId: componentId,
					propName: propName
				};
				return Promise.all([
				// Component prop ID
				this.set(ref, componentPropId),
				// Component prop ID data
				this.set(this.getRefComponentPropIdData(componentPropId), data)]).then(function () {
					return componentPropId;
				});
			}

			/**
	   * Remove component prop ID
	   * @param  {String} propId 	The component prop ID
	   * @return {Promise}        A Promise
	   */

		}, {
			key: 'removeComponentPropId',
			value: function removeComponentPropId(propId) {
				var _this30 = this;

				// Component prop ID data
				return this.getComponentPropIdData(propId).then(function (data) {
					return Promise.all([
					// Remove component prop ID
					_this30.remove(_this30.getRefComponentPropId(data.componentId, data.propName)),
					// Remove component prop ID data
					_this30.remove(_this30.getRefComponentPropIdData(propId))]);
				});
			}

			/**
	   * Fetch the component version prop ID data
	   * @param  {String} componentVersionPropId 		The component version prop ID
	   * @return {Promise}                        	A Promise which resolves the data
	   */

		}, {
			key: 'getComponentVersionPropIdData',
			value: function getComponentVersionPropIdData(componentVersionPropId) {
				return this.get(this.getRefComponentVersionPropIdData(componentVersionPropId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch the component version prop ID by component version ID and prop ID
	   * @param  {String} componentVersionId 		The component version ID
	   * @param  {String} propId             		The prop ID
	   * @return {Promise}                    	A Promise which resolves the component version prop ID
	   */

		}, {
			key: 'getComponentVersionPropId',
			value: function getComponentVersionPropId(componentVersionId, propId) {
				return this.get(this.getRefComponentVersionPropId(componentVersionId, propId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a component version prop ID by component version ID and prop ID
	   * @param {String} componentVersionId 		The component version ID
	   * @param {String} propId             		The prop ID
	   * @return {Promise} 						A Promise which resolves the component version prop ID
	   */

		}, {
			key: 'setComponentVersionPropId',
			value: function setComponentVersionPropId(componentVersionId, propId) {
				var ref = this.getRefComponentVersionPropId(componentVersionId, propId);
				var componentVersionPropId = ref.push().key();
				var data = {
					componentVersionId: componentVersionId,
					propId: propId
				};
				return Promise.all([
				// Component version prop ID
				this.set(ref, componentVersionPropId).then(function () {
					return componentVersionPropId;
				}),
				// Component version prop ID data
				this.set(this.getRefComponentVersionPropIdData(componentVersionPropId), data),
				// Component prop <> Component version prop
				this.set(this.getRefComponentProp(propId, componentVersionPropId), true)]).then(function () {
					return componentVersionPropId;
				});
			}

			/**
	   * Remove a component version prop ID
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'removeComponentVersionPropId',
			value: function removeComponentVersionPropId(componentVersionPropId) {
				var _this31 = this;

				return this.getComponentVersionPropIdData(componentVersionPropId).then(function (data) {
					return Promise.all([
					// Component version prop ID
					_this31.remove(_this31.getRefComponentVersionPropId(data.componentVersionId, data.propId)),
					// Component version prop ID data
					_this31.remove(_this31.getRefComponentVersionPropIdData(componentVersionPropId)),
					// Component prop <> Component version prop
					_this31.remove(_this31.getRefComponentProp(data.propId, componentVersionPropId))])
					// Maybe remove component prop ID
					.then(function () {
						// Component version prop IDs for prop ID
						return _this31.get(_this31.getRefComponentProp(data.propId)).then(function (snapshot) {
							if (!snapshot.exists()) {
								// Remove component prop ID
								return _this31.removeComponentPropId(data.propId);
							}
						});
					});
				});
			}

			/**
	   * Fetch component version prop IDs by component version ID
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Promise}                    A Promise which resolves an Array
	   */

		}, {
			key: 'getComponentVersionPropIds',
			value: function getComponentVersionPropIds(componentVersionId) {
				var _this32 = this;

				return this.get(this.getRefComponentVersionPropId(componentVersionId)).then(function (snapshot) {
					if (!snapshot.exists()) {
						return Promise.resolve([]);
					}
					return _this32.snapshotArray(snapshot);
				});
			}

			/**
	   * Fetch component version prop data
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'getComponentVersionPropData',
			value: function getComponentVersionPropData(componentVersionPropId) {
				return this.get(this.getRefComponentVersionPropData(componentVersionPropId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch the latest component version prop ID with description data
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'getLatestComponentVersionPropIdWithDescription',
			value: function getLatestComponentVersionPropIdWithDescription(componentVersionPropId) {
				var _this33 = this;

				// Component version prop ID data
				return this.getComponentVersionPropIdData(componentVersionPropId).then(function (data) {
					// Component version prop IDs with description data
					return _this33.get(_this33.getRefComponentPropDescription(data.propId)).then(function (snapshot) {
						var ids = snapshot.exists() ? Object.keys(snapshot.val()) : [];
						return ids.length ? ids.pop() : null;
					});
				});
			}

			/**
	   * Fetch description data for the latest component version prop ID with description data
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'getLatestComponentPropDescription',
			value: function getLatestComponentPropDescription(componentVersionPropId) {
				var _this34 = this;

				return this.getLatestComponentVersionPropIdWithDescription(componentVersionPropId).then(function (latestComponentVersionPropId) {
					if (latestComponentVersionPropId) {
						return _this34.getComponentVersionPropDescription(latestComponentVersionPropId);
					}
					return null;
				});
			}

			/**
	   * Fetch description data for component version prop ID
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'getComponentVersionPropDescription',
			value: function getComponentVersionPropDescription(componentVersionPropId) {
				var _this35 = this;

				return this.get(this.getRefComponentVersionPropDescription(componentVersionPropId)).then(function (snapshot) {
					// Component version prop description data
					if (snapshot.exists()) {
						var _ret4 = function () {
							var description = snapshot.val();

							// Component version prop ID data
							return {
								v: _this35.getComponentVersionPropIdData(componentVersionPropId).then(function (componentVersionPropIdData) {
									return {
										data: description,
										componentVersionPropIdData: componentVersionPropIdData
									};
								})
								// Component version ID data
								.then(function (data) {
									return _this35.getComponentVersionIdData(data.componentVersionPropIdData.componentVersionId).then(function (componentVersionIdData) {
										return (0, _merge2.default)(data, { componentVersionIdData: componentVersionIdData });
									});
								})
								// Package version ID data
								.then(function (data) {
									return _this35.getPackageVersionIdData(data.componentVersionIdData.packageVersionId).then(function (packageVersionIdData) {
										return (0, _merge2.default)(data, { packageVersionIdData: packageVersionIdData });
									});
								})
							};
						}();

						if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
					}
				});
			}

			/**
	   * Set or remove description data for the component version prop ID
	   * @param {String} 		componentVersionPropId 	The component version prop ID
	   * @param {String|null} description            	The description data (null to remove)
	   */

		}, {
			key: 'setComponentVersionPropDescription',
			value: function setComponentVersionPropDescription(componentVersionPropId, description) {
				var _this36 = this;

				// Component version prop ID data
				return this.getComponentVersionPropIdData(componentVersionPropId).then(function (data) {
					// Component version prop description
					var ref = _this36.getRefComponentVersionPropDescription(componentVersionPropId);
					// Latest component version prop ID with a description
					var propRef = _this36.getRefComponentPropDescription(data.propId).child(componentVersionPropId);
					// set
					if (description) {
						return Promise.all([
						// Component version prop description
						_this36.set(ref, description),
						// Latest component version prop ID with a description
						_this36.set(propRef, true)]);
					}
					// remove
					return Promise.all([
					// Component version prop description
					_this36.remove(ref),
					// Latest component version prop ID with a description
					_this36.remove(propRef)]);
				});
			}

			/**
	   * Fetch a component prop version
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'getComponentVersionProp',
			value: function getComponentVersionProp(componentVersionPropId) {
				var _this37 = this;

				// Component version prop data
				return this.getComponentVersionPropData(componentVersionPropId).then(function (data) {
					// Component version prop description data
					return _this37.getComponentVersionPropDescription(componentVersionPropId).then(function (description) {
						if (!description) {
							// Fetch the description from the latest component version prop ID with description data
							return _this37.getLatestComponentPropDescription(componentVersionPropId);
						}
						return description;
					}).then(function (description) {
						return (0, _merge2.default)(data, { description: description });
					});
				});
			}

			/**
	   * Create or update a component version prop
	   * @param {String} componentVersionId The component version ID
	   * @param {String} propName           The prop name
	   * @param {String} data               The component version prop data
	   */

		}, {
			key: 'setComponentVersionProp',
			value: function setComponentVersionProp(componentVersionId, propName, data) {
				var _this38 = this;

				data.componentVersionId = componentVersionId;

				// Component ID
				return this.getComponentVersionIdData(componentVersionId).then(function (componentVersionIdData) {
					data.componentId = componentVersionIdData.componentId;
					// Component prop ID
					return _this38.getComponentPropId(data.componentId, propName).then(function (propId) {
						if (!propId) {
							return _this38.setComponentPropId(data.componentId, propName);
						}
						return propId;
					})
					// Component version prop ID
					.then(function (propId) {
						return _this38.getComponentVersionPropId(componentVersionId, propId).then(function (componentVersionPropId) {
							if (!componentVersionPropId) {
								return _this38.setComponentVersionPropId(componentVersionId, propId);
							}
							return componentVersionPropId;
						});
					})
					// Component version prop data
					.then(function (componentVersionPropId) {
						return _this38.set(_this38.getRefComponentVersionPropData(componentVersionPropId), data).then(function () {
							return componentVersionPropId;
						});
					});
				});
			}

			/**
	   * Remove a component version prop
	   * @param  {String} componentVersionPropId 	The component version prop ID
	   * @return {Promise}                        A Promise
	   */

		}, {
			key: 'removeComponentVersionProp',
			value: function removeComponentVersionProp(componentVersionPropId) {
				return Promise.all([
				// Component version prop ID
				this.removeComponentVersionPropId(componentVersionPropId),
				// Component version prop data
				this.remove(this.getRefComponentVersionPropData(componentVersionPropId)),
				// Component version prop description
				this.setComponentVersionPropDescription(componentVersionPropId, null)]);
			}

			/**
	   * Fetch all component version props
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Promise}                    A Promise which resolves an Array
	   */

		}, {
			key: 'getComponentVersionProps',
			value: function getComponentVersionProps(componentVersionId) {
				var _this39 = this;

				return this.getComponentVersionPropIds(componentVersionId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this39.getComponentVersionProp(id);
					}));
				});
			}

			/**
	   * Remove all component version props
	   * @param  {String} componentVersionId 	The component version ID
	   * @return {Promise}                    A Promise
	   */

		}, {
			key: 'removeComponentVersionProps',
			value: function removeComponentVersionProps(componentVersionId) {
				var _this40 = this;

				return this.getComponentVersionPropIds(componentVersionId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this40.removeComponentVersionProp(id);
					}));
				});
			}

			///////////
			// DEMOS //
			///////////

			/**
	   * Get a Firebase reference for component demos
	   * @param  {String} componentId 	The component ID
	   * @return {Firebase}            	A Firebase reference
	   */

		}, {
			key: 'getRefComponentDemo',
			value: function getRefComponentDemo(componentId) {
				return this.getRef('component_demo/' + componentId);
			}

			/**
	   * Fetch demos for component ID
	   * @param  {String} componentId 	The component ID
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'getComponentDemos',
			value: function getComponentDemos(componentId) {
				var _this41 = this;

				return this.get(this.getRefComponentDemo(componentId)).then(function (snapshot) {
					return _this41.snapshotArray(snapshot);
				});
			}

			///////////
			// PAGES //
			///////////

			/**
	   * Get a Firebase reference to page IDs
	   * @param  {String} pageId 		The page ID (optional)
	   * @return {Firebase}        	A Firebase reference
	   */

		}, {
			key: 'getRefPageId',
			value: function getRefPageId(pageId) {
				var ref = this.getRef('page_id');
				if (pageId) {
					return ref.child(pageId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference to page version data
	   * @param  {String} pageVersionId 	The page version ID
	   * @return {Firebase}               A Firebase reference
	   */

		}, {
			key: 'getRefPageVersionData',
			value: function getRefPageVersionData(pageVersionId) {
				return this.getRef('page_version_data/' + pageVersionId);
			}

			/**
	   * Get a Firebase reference for package version page IDs, by package version ID and page ID
	   * @param  {String} packageVersionId 	The package version ID
	   * @param  {String} pageId           	The page ID
	   * @return {Firebase}                  	A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionPageId',
			value: function getRefPackageVersionPageId(packageVersionId, pageId) {
				var ref = this.getRef('package_version_page_id/' + packageVersionId);
				if (pageId) {
					return ref.child(pageId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference for page IDs by package version ID
	   * @param  {String} packageVersionId    The package version ID
	   * @param  {String} pageId 				The page ID
	   * @return {Firebase}                   A Firebase reference
	   */

		}, {
			key: 'getRefPageIdByPackageVersionId',
			value: function getRefPageIdByPackageVersionId(packageVersionId, pageId) {
				return this.getRef('page_id_by_package_version_id/' + packageVersionId + '/' + pageId);
			}

			/**
	   * Get a Firebase reference for package version IDs by page ID
	   * @param  {String} pageId 				The page ID
	   * @param  {String} packageVersionId    The package version ID (optional)
	   * @return {Firebase}                   A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionIdbyPageId',
			value: function getRefPackageVersionIdbyPageId(pageId, packageVersionId) {
				var ref = this.getRef('package_version_id_by_page_id/' + pageId);
				if (packageVersionId) {
					return ref.child(packageVersionId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference to package version page ID data
	   * @param  {String} packageVersionPageId 	The package version page ID
	   * @return {Firebase}                      	A Firebase reference
	   */

		}, {
			key: 'getRefPackageVersionPageIdData',
			value: function getRefPackageVersionPageIdData(packageVersionPageId) {
				return this.getRef('package_version_page_id_data/' + packageVersionPageId);
			}

			/**
	   * Get a Firebase reference to package page version IDs by page ID
	   * @param  {String} pageId               	The page ID
	   * @param  {String} packageVersionPageId 	The package version page ID
	   * @return {Firebase}                      	A Firebase reference
	   */

		}, {
			key: 'getRefPackagePageVersion',
			value: function getRefPackagePageVersion(pageId, packageVersionPageId) {
				var ref = this.getRef('package_page_version/' + pageId);
				if (packageVersionPageId) {
					return ref.child(packageVersionPageId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference to package page version IDs with content data, by page ID
	   * @param  {String} pageId               	The page ID
	   * @param  {String} packageVersionPageId 	The package version page ID (optional)
	   * @return {Firebase}                      	A Firebase reference
	   */

		}, {
			key: 'getRefPackagePageVersionContent',
			value: function getRefPackagePageVersionContent(pageId, packageVersionPageId) {
				var ref = this.getRef('package_page_version_content/' + pageId);
				if (packageVersionPageId) {
					return ref.child(packageVersionPageId);
				}
				return ref;
			}

			/**
	   * Get a Firebase reference to page IDs, by package ID
	   * @param  {String} packageId 	The package ID
	   * @param  {String} pageId    	The page ID (optional)
	   * @return {Firebase}           A Firebase reference
	   */

		}, {
			key: 'getRefPackagePage',
			value: function getRefPackagePage(packageId, pageId) {
				var ref = this.getRef('package_page');
				if (packageId) {
					ref = ref.child(packageId);
				}
				if (pageId) {
					ref = ref.child(pageId);
				}
				return ref;
			}

			/**
	   * Create a unique page ID
	   * @return {Promise} A Promise
	   */

		}, {
			key: 'setPageId',
			value: function setPageId() {
				return this.set(this.getRefPageId().push(), true);
			}

			/**
	   * Create or update page version data
	   * @param {String} pageVersionId 	The page version ID
	   * @param {Promise} data          	A Promise
	   */

		}, {
			key: 'setPageVersion',
			value: function setPageVersion(pageVersionId, data) {
				return this.set(this.getRefPageVersionData(pageVersionId), data);
			}

			/**
	   * Get page version data
	   * @param  {String} pageVersionId 	The page version ID
	   * @return {Promise}               	A Promise
	   */

		}, {
			key: 'getPageVersion',
			value: function getPageVersion(pageVersionId) {
				return this.get(this.getRefPageVersionData(pageVersionId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Remove page version data
	   * @param  {String} pageVersionId 	The page version ID
	   * @return {Promise}               	A Promise
	   */

		}, {
			key: 'removePageVersion',
			value: function removePageVersion(pageVersionId) {
				return this.remove(this.getRefPageVersionData(pageVersionId));
			}

			/**
	   * Fetch package version page ID, by package version ID and page ID
	   * @param  {String} packageVersionId 	The package version ID
	   * @param  {String} pageId           	The page ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getPackageVersionPageId',
			value: function getPackageVersionPageId(packageVersionId, pageId) {
				return this.get(this.getRefPackageVersionPageId(packageVersionId, pageId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Fetch package version page ID data
	   * @param  {String} packageVersionPageId 	The package version page ID
	   * @return {Promise}                      	A Promise
	   */

		}, {
			key: 'getPackageVersionPageIdData',
			value: function getPackageVersionPageIdData(packageVersionPageId) {
				return this.get(this.getRefPackageVersionPageIdData(packageVersionPageId)).then(function (snapshot) {
					return snapshot.val();
				});
			}

			/**
	   * Create a unique package version page ID, by package version ID and page ID
	   * @param  {String}  packageVersionId 	The package version ID
	   * @param  {String}  pageId           	The page ID
	   * @return {Promise} 					A Promise
	   */

		}, {
			key: 'setPackageVersionPageId',
			value: function setPackageVersionPageId(packageVersionId, pageId) {
				var _this42 = this;

				var ref = this.getRefPackageVersionPageId(packageVersionId, pageId);
				var packageVersionPageId = ref.push().key();
				var data = {
					packageVersionId: packageVersionId,
					pageId: pageId
				};
				return Promise.all([
				// Package version page ID
				this.set(ref, packageVersionPageId),
				// Package version page ID data
				this.set(this.getRefPackageVersionPageIdData(packageVersionPageId), data),
				// Package version page IDs by page ID
				this.set(this.getRefPackagePageVersion(pageId, packageVersionPageId), true),
				// Package version <> Page
				this.setPackageVersionPageRelationship(packageVersionId, pageId),
				// Page IDs by package ID
				this.getPackageVersionIdData(packageVersionId).then(function (packageVersionIdData) {
					return _this42.set(_this42.getRefPackagePage(packageVersionIdData.packageId, pageId), true);
				})]).then(function () {
					return packageVersionPageId;
				});
			}

			/**
	   * Remove a package version page ID
	   * @param  {String} packageVersionPageId 	The package version page ID
	   * @return {Promise}                      	A Promise
	   */

		}, {
			key: 'removePackageVersionPageId',
			value: function removePackageVersionPageId(packageVersionPageId) {
				var _this43 = this;

				return this.getPackageVersionPageIdData(packageVersionPageId).then(function (packageVersionPageIdData) {
					return Promise.all([
					// Package version page ID
					_this43.remove(_this43.getRefPackageVersionPageId(packageVersionPageIdData.packageVersionId, packageVersionPageIdData.pageId)),
					// Package version page ID data
					_this43.remove(_this43.getRefPackageVersionPageIdData(packageVersionPageId)),
					// Package version page IDs by page ID
					_this43.remove(_this43.getRefPackagePageVersion(packageVersionPageIdData.pageId, packageVersionPageId)),
					// Package version <> Page
					_this43.removePackageVersionPageRelationship(packageVersionPageIdData.packageVersionId, packageVersionPageIdData.pageId)]).then(function () {
						// Package version page IDs by page ID
						return _this43.get(_this43.getRefPackagePageVersion(packageVersionPageIdData.pageId)).then(function (snapshot) {
							if (!snapshot.exists()) {
								return Promise.all([
								// Page ID
								_this43.remove(_this43.getRefPageId(packageVersionPageIdData.pageId)),
								// Page IDs by package ID
								// Package version page IDs by page ID
								_this43.getPackageVersionIdData(packageVersionPageIdData.packageVersionId).then(function (packageVersionIdData) {
									return _this43.remove(_this43.getRefPackagePage(packageVersionIdData.packageId, packageVersionPageIdData.pageId));
								})]);
							}
						});
					});
				});
			}

			/**
	   * Create or update a package version page, by package version ID and page ID
	   * @param {String} packageVersionId 	The package version ID
	   * @param {String} pageId           	The page ID
	   * @param {Promise} data             	A Promise
	   */

		}, {
			key: 'setPackagePage',
			value: function setPackagePage(packageVersionId, pageId, data) {
				var _this44 = this;

				// Page ID
				return Promise.resolve(pageId).then(function (id) {
					return id ? id : _this44.setPageId();
				}).then(function (id) {
					pageId = id;

					// Package version page ID
					return _this44.getPackageVersionPageId(packageVersionId, pageId).then(function (packageVersionPageId) {
						return !packageVersionPageId ? _this44.setPackageVersionPageId(packageVersionId, pageId) : packageVersionPageId;
					});
				}).then(function (packageVersionPageId) {
					return Promise.all([
					// Package version page data
					_this44.setPageVersion(packageVersionPageId, data),
					// Package version page IDs with content data, by page ID
					_this44.set(_this44.getRefPackagePageVersionContent(pageId, packageVersionPageId), true)]).then(function () {
						return pageId;
					});
				});
			}

			/**
	   * Remove a package version page
	   * @return {Promise} A Promise
	   */

		}, {
			key: 'removePackagePage',
			value: function removePackagePage(packageVersionPageId) {
				var _this45 = this;

				return this.getPackageVersionPageIdData(packageVersionPageId).then(function (data) {
					return Promise.all([
					// Package version page data
					_this45.removePageVersion(packageVersionPageId),
					// Package version page IDs with content data, by page ID
					_this45.remove(_this45.getRefPackagePageVersionContent(data.pageId, packageVersionPageId)),
					// Package version page ID
					_this45.removePackageVersionPageId(packageVersionPageId)]);
				});
			}

			/**
	   * Fetch a page by package version ID and page ID
	   * @return {Promise} A Promise
	   */

		}, {
			key: 'getPackagePage',
			value: function getPackagePage(packageName, version, pageId) {
				var _this46 = this;

				// Package ID
				return this.getPackageId(packageName).then(function (packageId) {
					// Package version ID
					return _this46.getPackageVersionId(packageId, version).then(function (packageVersionId) {
						// Package version page ID
						return _this46.getPackageVersionPageId(packageVersionId, pageId).then(function (id) {
							// Package version page data
							return id ? _this46.getPackagePageVersionById(id) : null;
						});
					});
				}).then(function (data) {
					// Latest package version page ID with content data
					if (!data) {
						return _this46.getLatestPackagePage(pageId);
					}
					return data;
				});
			}

			/**
	   * Set package version <> Page two-way relationship
	   * @param  {String} packageVersionId 	The package version ID
	   * @param  {String} pageId           	The page ID
	   * @return {Promise} 					A Promise
	   */

		}, {
			key: 'setPackageVersionPageRelationship',
			value: function setPackageVersionPageRelationship(packageVersionId, pageId) {
				return Promise.all([
				// Page ID by package version ID
				this.set(this.getRefPageIdByPackageVersionId(packageVersionId, pageId), true),
				// Package version ID by page ID
				this.set(this.getRefPackageVersionIdbyPageId(pageId, packageVersionId), true)]);
			}

			/**
	   * Remove package version <> Page two-way relationship
	   * @param  {String} packageVersionId 	The package version ID
	   * @param  {String} pageId           	The page ID
	   * @return {Promise} 					A Promise
	   */

		}, {
			key: 'removePackageVersionPageRelationship',
			value: function removePackageVersionPageRelationship(packageVersionId, pageId) {
				return Promise.all([
				// Page ID by package version ID
				this.remove(this.getRefPageIdByPackageVersionId(packageVersionId, pageId)),
				// Package version ID by page ID
				this.remove(this.getRefPackageVersionIdbyPageId(pageId, packageVersionId))]);
			}

			/**
	   * Toggle package version <> Page two-way relationship, by package name and version
	   * @param  {String} packageName 	The package name
	   * @param  {String} version     	The package version
	   * @param  {String} pageId      	The page ID
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'togglePackageVersionPage',
			value: function togglePackageVersionPage(packageName, version, pageId) {
				var _this47 = this;

				// Package ID
				return this.getPackageId(packageName).then(function (packageId) {
					// Package version ID
					return _this47.getPackageVersionId(packageId, version).then(function (packageVersionId) {
						// Page ID by package version ID
						return _this47.get(_this47.getRefPageIdByPackageVersionId(packageVersionId, pageId)).then(function (snapshot) {
							// Remove relationship
							if (snapshot.exists()) {
								return _this47.removePackageVersionPageRelationship(packageVersionId, pageId);
							}
							// Set relationship
							return _this47.setPackageVersionPageRelationship(packageVersionId, pageId);
						})
						// Fetch updated page version
						.then(function () {
							return _this47.getPackagePage(packageName, version, pageId);
						});
					});
				});
			}

			/**
	   * Fetch the latest package page version by page ID
	   * @param  {String} pageId 	The page ID
	   * @return {Promise}        A Promise
	   */

		}, {
			key: 'getLatestPackagePage',
			value: function getLatestPackagePage(pageId) {
				var _this48 = this;

				return this.get(this.getRefPackagePageVersionContent(pageId)).then(function (snapshot) {
					if (snapshot.exists()) {
						var latestPackageVersionPageId = Object.keys(snapshot.val()).pop();
						return _this48.getPackagePageVersionById(latestPackageVersionPageId);
					}
					return null;
				});
			}

			/**
	   * Fetch a page by package version page ID
	   * @return {Promise} A Promise
	   */

		}, {
			key: 'getPackagePageVersionById',
			value: function getPackagePageVersionById(packageVersionPageId) {
				var _this49 = this;

				return Promise.all([
				// Page version data
				this.getPageVersion(packageVersionPageId),
				// Package version page ID data
				this.getPackageVersionPageIdData(packageVersionPageId)]).then(function (_ref7) {
					var _ref8 = _slicedToArray(_ref7, 2);

					var data = _ref8[0];
					var packageVersionPageIdData = _ref8[1];

					// Package version ID data
					return _this49.getPackageVersionIdData(packageVersionPageIdData.packageVersionId).then(function (packageVersionIdData) {
						return { data: data, packageVersionPageIdData: packageVersionPageIdData, packageVersionIdData: packageVersionIdData };
					});
				}).then(function (data) {
					return _this49.get(_this49.getRefPackageVersionIdbyPageId(data.packageVersionPageIdData.pageId)).then(function (snapshot) {
						return (0, _merge2.default)(data, { packageVersionId: snapshot.exists() ? Object.keys(snapshot.val()) : [] });
					});
				});
			}

			/**
	   * Fetch package version page IDs by package version ID
	   * @param  {String} packageVersionId 	The package version ID
	   * @return {Promise}                  	A Promise
	   */

		}, {
			key: 'getPackageVersionPageIds',
			value: function getPackageVersionPageIds(packageVersionId) {
				var _this50 = this;

				return this.get(this.getRefPackageVersionPageId(packageVersionId)).then(function (snapshot) {
					return _this50.snapshotArray(snapshot);
				});
			}

			/**
	   * Fetch package version pages
	   * @return {Promise} A Promise which resolves a pages Array
	   */

		}, {
			key: 'getPackageVersionPages',
			value: function getPackageVersionPages(packageVersionId) {
				var _this51 = this;

				return this.getPackageVersionPageIds(packageVersionId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this51.getPackagePageVersionById(id);
					}));
				});
			}

			/**
	   * Fetch package version pages, by package name and version
	   * @param  {String} packageName 	The package name
	   * @param  {String} version     	The package version
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'getPackageVersionPagesByName',
			value: function getPackageVersionPagesByName(packageName, version) {
				var _this52 = this;

				// Package ID
				return this.getPackageId(packageName).then(function (packageId) {
					// Package version ID
					return _this52.getPackageVersionId(packageId, version).then(function (packageVersionId) {
						// Pages
						return _this52.getPackageVersionPages(packageVersionId);
					});
				});
			}

			/**
	   * Fetch package pages by package name
	   * @param  {String} packageName 	The package name
	   * @return {Promise}             	A Promise
	   */

		}, {
			key: 'getPackagePagesByName',
			value: function getPackagePagesByName(packageName, version) {
				var _this53 = this;

				// Package ID
				return this.getPackageId(packageName).then(function (packageId) {
					// Page IDs by package ID
					return _this53.get(_this53.getRefPackagePage(packageId)).then(function (snapshot) {
						var pageIds = Object.keys(snapshot.val() || {});
						return Promise.all(pageIds.map(function (pid) {
							return _this53.getPackagePage(packageName, version, pid);
						}));
					});
				});
			}

			/**
	   * Remove package version pages
	   * @param {String} packageVersionId 	The package version ID
	   * @return {Promise} 					A Promise
	   */

		}, {
			key: 'removePackageVersionPages',
			value: function removePackageVersionPages(packageVersionId) {
				var _this54 = this;

				return this.getPackageVersionPageIds(packageVersionId).then(function (ids) {
					return Promise.all(ids.map(function (id) {
						return _this54.removePackagePage(id);
					}));
				});
			}

			//////////////////////////////
			// PACKAGE PAGES: LISTENERS //
			//////////////////////////////

		}, {
			key: 'onPackagePageAdded',
			value: function onPackagePageAdded(packageName, version, cb, error) {
				var _this55 = this;

				// Package ID
				this.getPackageId(packageName).then(function (packageId) {
					// Page IDs by package ID
					_this55.listen(_this55.getRefPackagePage(packageId), 'child_added', function (snapshot) {
						_this55.getPackagePage(packageName, version, snapshot.key()).then(function (data) {
							return cb(data);
						});
					}, error);
				});
			}
		}, {
			key: 'offPackagePageAdded',
			value: function offPackagePageAdded() {
				this.getRefPackagePage().off('child_added');
			}
		}, {
			key: 'onPackageVersionPageRemoved',
			value: function onPackageVersionPageRemoved(cb, error) {
				this.listen('package_version_page_id', 'child_removed', function (snapshot) {
					var val = snapshot.val();
					var pageId = Object.keys(val).pop();
					var packageVersionPageId = val[pageId];
					cb(packageVersionPageId);
				}, error);
			}
		}, {
			key: 'offPackageVersionPageRemoved',
			value: function offPackageVersionPageRemoved() {
				this.getRef('package_version_page_id').off('child_removed');
			}
		}]);

		return Store;
	}(_firebaseStore2.default);

	var store = new Store();
	exports.default = store;

	module.exports = exports.default;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _firebase = __webpack_require__(174);

	var _firebase2 = _interopRequireDefault(_firebase);

	var _events = __webpack_require__(175);

	var _trim = __webpack_require__(176);

	var _trim2 = _interopRequireDefault(_trim);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Firebase Store
	 * @extends {EventEmitter}
	 */

	var Store = function (_EventEmitter) {
		_inherits(Store, _EventEmitter);

		/**
	  * Constructor
	  */

		function Store(ref) {
			_classCallCheck(this, Store);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));

			if (ref) {
				_this.setRef(ref);
			}
			return _this;
		}

		/**
	  * Set a Firebase reference
	  * @param {string} ref The Firebase URL.
	  */

		_createClass(Store, [{
			key: 'setRef',
			value: function setRef(ref) {
				this.ref_base = ref;
				this.ref = new _firebase2.default(ref);
			}

			/**
	   * Get a Firebase reference for a path
	   * @param  {string} path 	The path.
	   * @return {Firebase}		A Firebase reference.
	   */

		}, {
			key: 'getRef',
			value: function getRef(path) {
				return this.ref.child(path);
			}

			/**
	   * Get the path from a Firebase Reference
	   * @param  {Firebase} ref 	The Firebase reference
	   * @return {string}     	A Firebase path.
	   */

		}, {
			key: 'getPath',
			value: function getPath(ref) {
				return (0, _trim2.default)(ref.toString().replace(this.ref_base, ''), '/');
			}

			/**
	   * Get a Firebase reference from a path.
	   * @param  {string|Firebase} path 	A path or Firebase reference.
	   * @return {Firebase}      			A Firebase reference.
	   */

		}, {
			key: 'pathToRef',
			value: function pathToRef(path) {
				var ref = path;
				if (typeof ref === 'string') {
					ref = this.getRef(path);
				}
				return ref;
			}
		}, {
			key: 'refEventName',
			value: function refEventName(ref, eventName) {
				var path = this.getPath(ref);
				var flat = path.split('/').shift();
				return [flat, eventName].join('.');
			}

			/**
	   * Sets data to a Firebase path.
	   * @param {string} path 		The path to set.
	   * @param {?} data 				The value to set.
	   * @param {string} objectID 	Use an explicit objectID
	   * @return {Promise} 			A Promise.
	   */

		}, {
			key: 'set',
			value: function set(path, data, objectID) {
				var _this2 = this;

				this.emit('serviceLoading');
				return new Promise(function (resolve, reject) {
					var ref = _this2.pathToRef(path);
					if (!objectID) {
						objectID = ref.key();
					}
					if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
						// using Object.assign to also clean up
						// any non-own properties like observers
						data = Object.assign({}, { objectID: objectID }, data);
					}
					try {
						ref.set(data, function (e) {
							if (e) {
								_this2.emit('serviceError', e);
								return reject(e);
							}
							if (data) {
								var eventName = _this2.refEventName(ref, 'changed');
								_this2.emit(eventName, objectID, data);
							}
							resolve(objectID);
							_this2.emit('serviceComplete');
						});
					} catch (e) {
						_this2.emit('serviceError', e);
						return reject(e);
					}
				});
			}

			/**
	   * Removes a path from Firebase.
	   * @param  {string} path 		The path to remove.
	   * @param  {string} objectID 	Use an explicit objectID
	   * @return {Promise}      		A Promise.
	   */

		}, {
			key: 'remove',
			value: function remove(path, objectID) {
				var _this3 = this;

				var ref = this.pathToRef(path);
				if (!objectID) {
					objectID = ref.key();
				}
				var eventName = this.refEventName(ref, 'removed');
				return this.get(path).then(function (snapshot) {
					return _this3.set(path, null).then(function () {
						_this3.emit(eventName, objectID, snapshot.val());
					});
				});
			}

			/**
	   * Retrieve snapshot value once from a Firebase path.
	   * @param {string} path 	The path to retrieve.
	   * @return {Promise} 		A Promise.
	   */

		}, {
			key: 'get',
			value: function get(path) {
				var _this4 = this;

				this.emit('serviceLoading');
				return new Promise(function (resolve, reject) {
					_this4.pathToRef(path).once('value', function (snapshot) {
						resolve(snapshot);
						_this4.emit('serviceComplete');
					}, function (e) {
						reject(e);
						_this4.emit('serviceError', e);
					});
				});
			}

			/**
	   * Convert a Firebase snapshot object to array
	   * @param  {Object} snapshot 	A Firebase snapshot.
	   * @return {Array}
	   */

		}, {
			key: 'snapshotArray',
			value: function snapshotArray(snapshot) {
				var results = snapshot.val();
				var array = [];
				for (var objectID in results) {
					array.push(results[objectID]);
				}
				return array;
			}

			/**
	   * Listen for Firebase data changes.
	   * @param  {string}   path      The Firebase path.
	   * @param  {string}   eventName A valid Firebase event name (i.e. child_added).
	   * @param  {Function} cb        Success callback.
	   * @param  {[type]}   error     Error callback.
	   */

		}, {
			key: 'listen',
			value: function listen(path, eventName, cb, error) {
				var _this5 = this;

				this.pathToRef(path).on(eventName, function (snapshot) {
					cb(snapshot);
					_this5.emit('serviceComplete');
				}, function (e) {
					if (error) {
						error(e);
					}
					_this5.emit('serviceError', e);
				});
			}
		}]);

		return Store;
	}(_events.EventEmitter);

	exports.default = Store;

	module.exports = exports.default;

/***/ },
/* 174 */
/***/ function(module, exports) {

	/*! @license Firebase v2.4.0
	    License: https://www.firebase.com/terms/terms-of-service.html */
	(function() {var h,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.yb=function(){return a.zf?a.zf:a.zf=new a}}
	function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function r(a){return"function"==ca(a)}function ga(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ha(a,b,c){return a.call.apply(a.bind,arguments)}
	function ia(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function u(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return u.apply(null,arguments)}var ja=Date.now||function(){return+new Date};
	function ka(a,b){function c(){}c.prototype=b.prototype;a.nh=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.jh=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function la(a){if(Error.captureStackTrace)Error.captureStackTrace(this,la);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(la,Error);la.prototype.name="CustomError";function v(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function ma(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function na(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function oa(a){var b=0,c;for(c in a)b++;return b}function pa(a){for(var b in a)return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function sa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function ta(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function ua(a,b){var c=ta(a,b,void 0);return c&&a[c]}function va(a){for(var b in a)return!1;return!0}function wa(a){var b={},c;for(c in a)b[c]=a[c];return b}var xa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	function ya(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<xa.length;f++)c=xa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){this.Vd=void 0}
	function Ba(a,b,c){switch(typeof b){case "string":Ca(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ba(a,a.Vd?a.Vd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Ca(f,c),
	c.push(":"),Ba(a,a.Vd?a.Vd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Ca(a,b){b.push('"',a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Da[a]=e+b.toString(16)}),'"')};function Fa(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ja()).toString(36)};var w;a:{var Ga=n.navigator;if(Ga){var Ha=Ga.userAgent;if(Ha){w=Ha;break a}}w=""};function Ia(){this.Ya=-1};function Ja(){this.Ya=-1;this.Ya=64;this.P=[];this.pe=[];this.eg=[];this.Od=[];this.Od[0]=128;for(var a=1;a<this.Ya;++a)this.Od[a]=0;this.ge=this.ec=0;this.reset()}ka(Ja,Ia);Ja.prototype.reset=function(){this.P[0]=1732584193;this.P[1]=4023233417;this.P[2]=2562383102;this.P[3]=271733878;this.P[4]=3285377520;this.ge=this.ec=0};
	function Ka(a,b,c){c||(c=0);var d=a.eg;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.P[0];c=a.P[1];for(var g=a.P[2],k=a.P[3],m=a.P[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),l=1518500249):(f=c^g^k,l=1859775393):60>e?(f=c&g|k&(c|g),l=2400959708):(f=c^g^k,l=3395469782),f=(b<<
	5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.P[0]=a.P[0]+b&4294967295;a.P[1]=a.P[1]+c&4294967295;a.P[2]=a.P[2]+g&4294967295;a.P[3]=a.P[3]+k&4294967295;a.P[4]=a.P[4]+m&4294967295}
	Ja.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Ya,d=0,e=this.pe,f=this.ec;d<b;){if(0==f)for(;d<=c;)Ka(this,a,d),d+=this.Ya;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Ya){Ka(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Ya){Ka(this,e);f=0;break}}this.ec=f;this.ge+=b}};var x=Array.prototype,La=x.indexOf?function(a,b,c){return x.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ma=x.forEach?function(a,b,c){x.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Na=x.filter?function(a,b,c){return x.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?
	a.split(""):a,k=0;k<d;k++)if(k in g){var m=g[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Oa=x.map?function(a,b,c){return x.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Pa=x.reduce?function(a,b,c,d){for(var e=[],f=1,g=arguments.length;f<g;f++)e.push(arguments[f]);d&&(e[0]=u(b,d));return x.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ma(a,function(c,g){e=b.call(d,e,c,g,a)});return e},Qa=x.every?function(a,b,
	c){return x.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ra(a,b){var c=Sa(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Sa(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Ta(a,b){var c=La(a,b);0<=c&&x.splice.call(a,c,1)}function Ua(a,b,c){return 2>=arguments.length?x.slice.call(a,b):x.slice.call(a,b,c)}
	function Va(a,b){a.sort(b||Wa)}function Wa(a,b){return a>b?1:a<b?-1:0};function Xa(a){n.setTimeout(function(){throw a;},0)}var Ya;
	function Za(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==w.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=u(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==w.indexOf("Trident")&&-1==w.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.hb;c.hb=null;a()}};return function(a){d.next={hb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
	document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function $a(a,b){ab||bb();cb||(ab(),cb=!0);db.push(new eb(a,b))}var ab;function bb(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();ab=function(){a.then(fb)}}else ab=function(){var a=fb;!r(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(Ya||(Ya=Za()),Ya(a)):n.setImmediate(a)}}var cb=!1,db=[];[].push(function(){cb=!1;db=[]});
	function fb(){for(;db.length;){var a=db;db=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.yg.call(c.scope)}catch(d){Xa(d)}}}cb=!1}function eb(a,b){this.yg=a;this.scope=b};var gb=-1!=w.indexOf("Opera")||-1!=w.indexOf("OPR"),hb=-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"),ib=-1!=w.indexOf("Gecko")&&-1==w.toLowerCase().indexOf("webkit")&&!(-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE")),jb=-1!=w.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(gb&&n.opera)return a=n.opera.version,r(a)?a():a;ib?b=/rv\:([^\);]+)(\)|;)/:hb?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:jb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(w))?a[1]:"");return hb&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var kb=null,lb=null,mb=null;function nb(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");ob();for(var c=b?lb:kb,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,k=g?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,g||(k=64));d.push(c[t],c[f],c[k],c[l])}return d.join("")}
	function ob(){if(!kb){kb={};lb={};mb={};for(var a=0;65>a;a++)kb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),lb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),mb[lb[a]]=a,62<=a&&(mb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function pb(a,b){this.N=qb;this.Rf=void 0;this.Ba=this.Ha=null;this.yd=this.ye=!1;if(a==rb)sb(this,tb,b);else try{var c=this;a.call(b,function(a){sb(c,tb,a)},function(a){if(!(a instanceof ub))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}sb(c,vb,a)})}catch(d){sb(this,vb,d)}}var qb=0,tb=2,vb=3;function rb(){}pb.prototype.then=function(a,b,c){return wb(this,r(a)?a:null,r(b)?b:null,c)};pb.prototype.then=pb.prototype.then;pb.prototype.$goog_Thenable=!0;
	pb.prototype.cancel=function(a){this.N==qb&&$a(function(){var b=new ub(a);xb(this,b)},this)};function xb(a,b){if(a.N==qb)if(a.Ha){var c=a.Ha;if(c.Ba){for(var d=0,e=-1,f=0,g;g=c.Ba[f];f++)if(g=g.o)if(d++,g==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.N==qb&&1==d?xb(c,b):(d=c.Ba.splice(e,1)[0],yb(c,d,vb,b)))}a.Ha=null}else sb(a,vb,b)}function zb(a,b){a.Ba&&a.Ba.length||a.N!=tb&&a.N!=vb||Ab(a);a.Ba||(a.Ba=[]);a.Ba.push(b)}
	function wb(a,b,c,d){var e={o:null,Hf:null,Jf:null};e.o=new pb(function(a,g){e.Hf=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){g(l)}}:a;e.Jf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof ub?g(b):a(e)}catch(l){g(l)}}:g});e.o.Ha=a;zb(a,e);return e.o}pb.prototype.Yf=function(a){this.N=qb;sb(this,tb,a)};pb.prototype.Zf=function(a){this.N=qb;sb(this,vb,a)};
	function sb(a,b,c){if(a.N==qb){if(a==c)b=vb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.N=1;c.then(a.Yf,a.Zf,a);return}if(ga(c))try{var f=c.then;if(r(f)){Bb(a,c,f);return}}catch(g){b=vb,c=g}}a.Rf=c;a.N=b;a.Ha=null;Ab(a);b!=vb||c instanceof ub||Cb(a,c)}}function Bb(a,b,c){function d(b){f||(f=!0,a.Zf(b))}function e(b){f||(f=!0,a.Yf(b))}a.N=1;var f=!1;try{c.call(b,e,d)}catch(g){d(g)}}
	function Ab(a){a.ye||(a.ye=!0,$a(a.wg,a))}pb.prototype.wg=function(){for(;this.Ba&&this.Ba.length;){var a=this.Ba;this.Ba=null;for(var b=0;b<a.length;b++)yb(this,a[b],this.N,this.Rf)}this.ye=!1};function yb(a,b,c,d){if(c==tb)b.Hf(d);else{if(b.o)for(;a&&a.yd;a=a.Ha)a.yd=!1;b.Jf(d)}}function Cb(a,b){a.yd=!0;$a(function(){a.yd&&Db.call(null,b)})}var Db=Xa;function ub(a){la.call(this,a)}ka(ub,la);ub.prototype.name="cancel";var Eb=Eb||"2.4.0";function y(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function z(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Fb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function Gb(a){var b={};Fb(a,function(a,d){b[a]=d});return b}function Hb(a){return"object"===typeof a&&null!==a};function Ib(a){var b=[];Fb(a,function(a,d){da(d)?Ma(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function Jb(a){var b={};a=a.replace(/^\?/,"").split("&");Ma(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function Kb(a,b){if(!a)throw Lb(b);}function Lb(a){return Error("Firebase ("+Eb+") INTERNAL ASSERT FAILED: "+a)};var Mb=n.Promise||pb;function B(){var a=this;this.reject=this.resolve=null;this.D=new Mb(function(b,c){a.resolve=b;a.reject=c})}function C(a,b){return function(c,d){c?a.reject(c):a.resolve(d);r(b)&&(Nb(a.D),1===b.length?b(c):b(c,d))}}function Nb(a){a.then(void 0,aa)};function Ob(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Pb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function D(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function E(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function F(a,b,c,d){if((!d||p(c))&&!r(c))throw Error(E(a,b,d)+"must be a valid function.");}function Qb(a,b,c){if(p(c)&&(!ga(c)||null===c))throw Error(E(a,b,!0)+"must be a valid context object.");};function Rb(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):za(a)}function G(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ba(new Aa,a,b);a=b.join("")}return a};function Sb(){this.Zd=H}Sb.prototype.j=function(a){return this.Zd.S(a)};Sb.prototype.toString=function(){return this.Zd.toString()};function Tb(){}Tb.prototype.uf=function(){return null};Tb.prototype.Ce=function(){return null};var Ub=new Tb;function Vb(a,b,c){this.bg=a;this.Oa=b;this.Nd=c}Vb.prototype.uf=function(a){var b=this.Oa.Q;if(Wb(b,a))return b.j().T(a);b=null!=this.Nd?new Xb(this.Nd,!0,!1):this.Oa.w();return this.bg.Bc(a,b)};Vb.prototype.Ce=function(a,b,c){var d=null!=this.Nd?this.Nd:Yb(this.Oa);a=this.bg.qe(d,b,1,c,a);return 0===a.length?null:a[0]};function Zb(){this.xb=[]}function $b(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.cc();null===c||f.ea(c.cc())||(a.xb.push(c),c=null);null===c&&(c=new ac(f));c.add(e)}c&&a.xb.push(c)}function bc(a,b,c){$b(a,c);cc(a,function(a){return a.ea(b)})}function dc(a,b,c){$b(a,c);cc(a,function(a){return a.contains(b)||b.contains(a)})}
	function cc(a,b){for(var c=!0,d=0;d<a.xb.length;d++){var e=a.xb[d];if(e)if(e=e.cc(),b(e)){for(var e=a.xb[d],f=0;f<e.xd.length;f++){var g=e.xd[f];if(null!==g){e.xd[f]=null;var k=g.Zb();ec&&fc("event: "+g.toString());gc(k)}}a.xb[d]=null}else c=!1}c&&(a.xb=[])}function ac(a){this.ta=a;this.xd=[]}ac.prototype.add=function(a){this.xd.push(a)};ac.prototype.cc=function(){return this.ta};function J(a,b,c,d){this.type=a;this.Na=b;this.Za=c;this.Oe=d;this.Td=void 0}function hc(a){return new J(ic,a)}var ic="value";function jc(a,b,c,d){this.xe=b;this.be=c;this.Td=d;this.wd=a}jc.prototype.cc=function(){var a=this.be.Mb();return"value"===this.wd?a.path:a.parent().path};jc.prototype.De=function(){return this.wd};jc.prototype.Zb=function(){return this.xe.Zb(this)};jc.prototype.toString=function(){return this.cc().toString()+":"+this.wd+":"+G(this.be.qf())};function kc(a,b,c){this.xe=a;this.error=b;this.path=c}kc.prototype.cc=function(){return this.path};kc.prototype.De=function(){return"cancel"};
	kc.prototype.Zb=function(){return this.xe.Zb(this)};kc.prototype.toString=function(){return this.path.toString()+":cancel"};function Xb(a,b,c){this.A=a;this.ga=b;this.Yb=c}function lc(a){return a.ga}function mc(a){return a.Yb}function nc(a,b){return b.e()?a.ga&&!a.Yb:Wb(a,K(b))}function Wb(a,b){return a.ga&&!a.Yb||a.A.Fa(b)}Xb.prototype.j=function(){return this.A};function oc(a){this.pg=a;this.Gd=null}oc.prototype.get=function(){var a=this.pg.get(),b=wa(a);if(this.Gd)for(var c in this.Gd)b[c]-=this.Gd[c];this.Gd=a;return b};function pc(a,b){this.Vf={};this.hd=new oc(a);this.da=b;var c=1E4+2E4*Math.random();setTimeout(u(this.Of,this),Math.floor(c))}pc.prototype.Of=function(){var a=this.hd.get(),b={},c=!1,d;for(d in a)0<a[d]&&y(this.Vf,d)&&(b[d]=a[d],c=!0);c&&this.da.Ye(b);setTimeout(u(this.Of,this),Math.floor(6E5*Math.random()))};function qc(){this.Hc={}}function rc(a,b,c){p(c)||(c=1);y(a.Hc,b)||(a.Hc[b]=0);a.Hc[b]+=c}qc.prototype.get=function(){return wa(this.Hc)};var sc={},tc={};function uc(a){a=a.toString();sc[a]||(sc[a]=new qc);return sc[a]}function vc(a,b){var c=a.toString();tc[c]||(tc[c]=b());return tc[c]};function L(a,b){this.name=a;this.U=b}function wc(a,b){return new L(a,b)};function xc(a,b){return yc(a.name,b.name)}function zc(a,b){return yc(a,b)};function Ac(a,b,c){this.type=Bc;this.source=a;this.path=b;this.Ja=c}Ac.prototype.$c=function(a){return this.path.e()?new Ac(this.source,M,this.Ja.T(a)):new Ac(this.source,N(this.path),this.Ja)};Ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function Cc(a,b){this.type=Dc;this.source=a;this.path=b}Cc.prototype.$c=function(){return this.path.e()?new Cc(this.source,M):new Cc(this.source,N(this.path))};Cc.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function Ec(a,b){this.Pa=a;this.xa=b?b:Fc}h=Ec.prototype;h.Sa=function(a,b){return new Ec(this.Pa,this.xa.Sa(a,b,this.Pa).$(null,null,!1,null,null))};h.remove=function(a){return new Ec(this.Pa,this.xa.remove(a,this.Pa).$(null,null,!1,null,null))};h.get=function(a){for(var b,c=this.xa;!c.e();){b=this.Pa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function Gc(a,b){for(var c,d=a.xa,e=null;!d.e();){c=a.Pa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.e=function(){return this.xa.e()};h.count=function(){return this.xa.count()};h.Vc=function(){return this.xa.Vc()};h.jc=function(){return this.xa.jc()};h.ka=function(a){return this.xa.ka(a)};
	h.ac=function(a){return new Hc(this.xa,null,this.Pa,!1,a)};h.bc=function(a,b){return new Hc(this.xa,a,this.Pa,!1,b)};h.dc=function(a,b){return new Hc(this.xa,a,this.Pa,!0,b)};h.xf=function(a){return new Hc(this.xa,null,this.Pa,!0,a)};function Hc(a,b,c,d,e){this.Xd=e||null;this.Je=d;this.Ta=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Je?a.left:a.right;else if(0===e){this.Ta.push(a);break}else this.Ta.push(a),a=this.Je?a.right:a.left}
	function Ic(a){if(0===a.Ta.length)return null;var b=a.Ta.pop(),c;c=a.Xd?a.Xd(b.key,b.value):{key:b.key,value:b.value};if(a.Je)for(b=b.left;!b.e();)a.Ta.push(b),b=b.right;else for(b=b.right;!b.e();)a.Ta.push(b),b=b.left;return c}function Jc(a){if(0===a.Ta.length)return null;var b;b=a.Ta;b=b[b.length-1];return a.Xd?a.Xd(b.key,b.value):{key:b.key,value:b.value}}function Kc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Fc;this.right=null!=e?e:Fc}h=Kc.prototype;
	h.$=function(a,b,c,d,e){return new Kc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.e=function(){return!1};h.ka=function(a){return this.left.ka(a)||a(this.key,this.value)||this.right.ka(a)};function Lc(a){return a.left.e()?a:Lc(a.left)}h.Vc=function(){return Lc(this).key};h.jc=function(){return this.right.e()?this.key:this.right.jc()};
	h.Sa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.$(null,null,null,e.left.Sa(a,b,c),null):0===d?e.$(null,b,null,null,null):e.$(null,null,null,null,e.right.Sa(a,b,c));return Mc(e)};function Nc(a){if(a.left.e())return Fc;a.left.ha()||a.left.left.ha()||(a=Oc(a));a=a.$(null,null,null,Nc(a.left),null);return Mc(a)}
	h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ha()||c.left.left.ha()||(c=Oc(c)),c=c.$(null,null,null,c.left.remove(a,b),null);else{c.left.ha()&&(c=Pc(c));c.right.e()||c.right.ha()||c.right.left.ha()||(c=Qc(c),c.left.left.ha()&&(c=Pc(c),c=Qc(c)));if(0===b(a,c.key)){if(c.right.e())return Fc;d=Lc(c.right);c=c.$(d.key,d.value,null,null,Nc(c.right))}c=c.$(null,null,null,null,c.right.remove(a,b))}return Mc(c)};h.ha=function(){return this.color};
	function Mc(a){a.right.ha()&&!a.left.ha()&&(a=Rc(a));a.left.ha()&&a.left.left.ha()&&(a=Pc(a));a.left.ha()&&a.right.ha()&&(a=Qc(a));return a}function Oc(a){a=Qc(a);a.right.left.ha()&&(a=a.$(null,null,null,null,Pc(a.right)),a=Rc(a),a=Qc(a));return a}function Rc(a){return a.right.$(null,null,a.color,a.$(null,null,!0,null,a.right.left),null)}function Pc(a){return a.left.$(null,null,a.color,null,a.$(null,null,!0,a.left.right,null))}
	function Qc(a){return a.$(null,null,!a.color,a.left.$(null,null,!a.left.color,null,null),a.right.$(null,null,!a.right.color,null,null))}function Sc(){}h=Sc.prototype;h.$=function(){return this};h.Sa=function(a,b){return new Kc(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.e=function(){return!0};h.ka=function(){return!1};h.Vc=function(){return null};h.jc=function(){return null};h.ha=function(){return!1};var Fc=new Sc;function Tc(a,b){return a&&"object"===typeof a?(O(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Uc(a,b){var c=new Vc;Wc(a,new P(""),function(a,e){c.rc(a,Xc(e,b))});return c}function Xc(a,b){var c=a.C().J(),c=Tc(c,b),d;if(a.L()){var e=Tc(a.Ea(),b);return e!==a.Ea()||c!==a.C().J()?new Yc(e,Q(c)):a}d=a;c!==a.C().J()&&(d=d.ia(new Yc(c)));a.R(R,function(a,c){var e=Xc(c,b);e!==c&&(d=d.W(a,e))});return d};function Zc(){this.Ac={}}Zc.prototype.set=function(a,b){null==b?delete this.Ac[a]:this.Ac[a]=b};Zc.prototype.get=function(a){return y(this.Ac,a)?this.Ac[a]:null};Zc.prototype.remove=function(a){delete this.Ac[a]};Zc.prototype.Af=!0;function $c(a){this.Ic=a;this.Sd="firebase:"}h=$c.prototype;h.set=function(a,b){null==b?this.Ic.removeItem(this.Sd+a):this.Ic.setItem(this.Sd+a,G(b))};h.get=function(a){a=this.Ic.getItem(this.Sd+a);return null==a?null:Rb(a)};h.remove=function(a){this.Ic.removeItem(this.Sd+a)};h.Af=!1;h.toString=function(){return this.Ic.toString()};function ad(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new $c(b)}}catch(c){}return new Zc}var bd=ad("localStorage"),cd=ad("sessionStorage");function dd(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.ob=b;this.lc=c;this.hh=d;this.Rd=e||"";this.ab=bd.get("host:"+a)||this.host}function ed(a,b){b!==a.ab&&(a.ab=b,"s-"===a.ab.substr(0,2)&&bd.set("host:"+a.host,a.ab))}
	function fd(a,b,c){O("string"===typeof b,"typeof type must == string");O("object"===typeof c,"typeof params must == object");if(b===gd)b=(a.ob?"wss://":"ws://")+a.ab+"/.ws?";else if(b===hd)b=(a.ob?"https://":"http://")+a.ab+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.ab&&(c.ns=a.lc);var d=[];v(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}dd.prototype.toString=function(){var a=(this.ob?"https://":"http://")+this.host;this.Rd&&(a+="<"+this.Rd+">");return a};var id=function(){var a=1;return function(){return a++}}(),O=Kb,jd=Lb;
	function kd(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{ob();for(var c=mb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],g=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==g||null==k||null==m)throw Error();d.push(f<<2|g>>4);64!=k&&(d.push(g<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ua(d,c,
	c+8192));b=a}}return b}catch(l){fc("base64Decode failed: ",l)}return null}function ld(a){var b=Ob(a);a=new Ja;a.update(b);var b=[],c=8*a.ge;56>a.ec?a.update(a.Od,56-a.ec):a.update(a.Od,a.Ya-(a.ec-56));for(var d=a.Ya-1;56<=d;d--)a.pe[d]=c&255,c/=256;Ka(a,a.pe);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.P[d]>>e&255,++c;return nb(b)}
	function md(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+md.apply(null,arguments[c]):"object"===typeof arguments[c]?b+G(arguments[c]):b+arguments[c],b+=" ";return b}var ec=null,nd=!0;
	function od(a,b){Kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?ec=u(console.log,console):"object"===typeof console.log&&(ec=function(a){console.log(a)})),b&&cd.set("logging_enabled",!0)):r(a)?ec=a:(ec=null,cd.remove("logging_enabled"))}function fc(a){!0===nd&&(nd=!1,null===ec&&!0===cd.get("logging_enabled")&&od(!0));if(ec){var b=md.apply(null,arguments);ec(b)}}
	function pd(a){return function(){fc(a,arguments)}}function qd(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+md.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function rd(a){var b=md.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function S(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+md.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function sd(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(q(a)){var m=a.indexOf("//");0<=m&&(g=a.substring(0,m-1),a=a.substring(m+2));m=a.indexOf("/");-1===m&&(m=a.length);b=a.substring(0,m);e="";a=a.substring(m).split("/");for(m=0;m<a.length;m++)if(0<a[m].length){var l=a[m];try{l=decodeURIComponent(l.replace(/\+/g," "))}catch(t){}e+="/"+l}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);m=b.indexOf(":");0<=m&&(f="https"===g||"wss"===g,k=b.substring(m+1),isFinite(k)&&
	(k=String(k)),k=q(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,eh:d,ob:f,scheme:g,bd:e}}function td(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function ud(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function yc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=vd(a),d=vd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function wd(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+G(b));}
	function xd(a){if("object"!==typeof a||null===a)return G(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=G(b[d]),c+=":",c+=xd(a[b[d]]);return c+"}"}function yd(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function zd(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else v(a,b)}
	function Ad(a){O(!td(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var Bd=/^-?\d{1,10}$/;function vd(a){return Bd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function gc(a){try{a()}catch(b){setTimeout(function(){S("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function T(a,b){if(r(a)){var c=Array.prototype.slice.call(arguments,1).slice();gc(function(){a.apply(null,c)})}};function Cd(a){var b={},c={},d={},e="";try{var f=a.split("."),b=Rb(kd(f[0])||""),c=Rb(kd(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(g){}return{kh:b,Ec:c,data:d,ah:e}}function Dd(a){a=Cd(a).Ec;return"object"===typeof a&&a.hasOwnProperty("iat")?z(a,"iat"):null}function Ed(a){a=Cd(a);var b=a.Ec;return!!a.ah&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function Fd(a){this.Y=a;this.g=a.n.g}function Gd(a,b,c,d){var e=[],f=[];Ma(b,function(b){"child_changed"===b.type&&a.g.Dd(b.Oe,b.Na)&&f.push(new J("child_moved",b.Na,b.Za))});Hd(a,e,"child_removed",b,d,c);Hd(a,e,"child_added",b,d,c);Hd(a,e,"child_moved",f,d,c);Hd(a,e,"child_changed",b,d,c);Hd(a,e,ic,b,d,c);return e}function Hd(a,b,c,d,e,f){d=Na(d,function(a){return a.type===c});Va(d,u(a.qg,a));Ma(d,function(c){var d=Id(a,c,f);Ma(e,function(e){e.Qf(c.type)&&b.push(e.createEvent(d,a.Y))})})}
	function Id(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Td=c.wf(b.Za,b.Na,a.g));return b}Fd.prototype.qg=function(a,b){if(null==a.Za||null==b.Za)throw jd("Should only compare child_ events.");return this.g.compare(new L(a.Za,a.Na),new L(b.Za,b.Na))};function Jd(){this.ib={}}
	function Kd(a,b){var c=b.type,d=b.Za;O("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");O(".priority"!==d,"Only non-priority child changes can be tracked.");var e=z(a.ib,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.ib[d]=new J("child_changed",b.Na,d,e.Na);else if("child_removed"==c&&"child_added"==f)delete a.ib[d];else if("child_removed"==c&&"child_changed"==f)a.ib[d]=new J("child_removed",e.Oe,d);else if("child_changed"==c&&
	"child_added"==f)a.ib[d]=new J("child_added",b.Na,d);else if("child_changed"==c&&"child_changed"==f)a.ib[d]=new J("child_changed",b.Na,d,e.Oe);else throw jd("Illegal combination of changes: "+b+" occurred after "+e);}else a.ib[d]=b};function Ld(a){this.g=a}h=Ld.prototype;h.H=function(a,b,c,d,e,f){O(a.Mc(this.g),"A node must be indexed if only a child is updated");e=a.T(b);if(e.S(d).ea(c.S(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?Kd(f,new J("child_removed",e,b)):O(a.L(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Kd(f,new J("child_added",c,b)):Kd(f,new J("child_changed",c,b,e)));return a.L()&&c.e()?a:a.W(b,c).pb(this.g)};
	h.ya=function(a,b,c){null!=c&&(a.L()||a.R(R,function(a,e){b.Fa(a)||Kd(c,new J("child_removed",e,a))}),b.L()||b.R(R,function(b,e){if(a.Fa(b)){var f=a.T(b);f.ea(e)||Kd(c,new J("child_changed",e,b,f))}else Kd(c,new J("child_added",e,b))}));return b.pb(this.g)};h.ia=function(a,b){return a.e()?H:a.ia(b)};h.Ra=function(){return!1};h.$b=function(){return this};function Md(a){this.Fe=new Ld(a.g);this.g=a.g;var b;a.oa?(b=Nd(a),b=a.g.Sc(Od(a),b)):b=a.g.Wc();this.gd=b;a.ra?(b=Pd(a),a=a.g.Sc(Rd(a),b)):a=a.g.Tc();this.Jc=a}h=Md.prototype;h.matches=function(a){return 0>=this.g.compare(this.gd,a)&&0>=this.g.compare(a,this.Jc)};h.H=function(a,b,c,d,e,f){this.matches(new L(b,c))||(c=H);return this.Fe.H(a,b,c,d,e,f)};
	h.ya=function(a,b,c){b.L()&&(b=H);var d=b.pb(this.g),d=d.ia(H),e=this;b.R(R,function(a,b){e.matches(new L(a,b))||(d=d.W(a,H))});return this.Fe.ya(a,d,c)};h.ia=function(a){return a};h.Ra=function(){return!0};h.$b=function(){return this.Fe};function Sd(a){this.ua=new Md(a);this.g=a.g;O(a.la,"Only valid if limit has been set");this.ma=a.ma;this.Nb=!Td(a)}h=Sd.prototype;h.H=function(a,b,c,d,e,f){this.ua.matches(new L(b,c))||(c=H);return a.T(b).ea(c)?a:a.Hb()<this.ma?this.ua.$b().H(a,b,c,d,e,f):Ud(this,a,b,c,e,f)};
	h.ya=function(a,b,c){var d;if(b.L()||b.e())d=H.pb(this.g);else if(2*this.ma<b.Hb()&&b.Mc(this.g)){d=H.pb(this.g);b=this.Nb?b.dc(this.ua.Jc,this.g):b.bc(this.ua.gd,this.g);for(var e=0;0<b.Ta.length&&e<this.ma;){var f=Ic(b),g;if(g=this.Nb?0>=this.g.compare(this.ua.gd,f):0>=this.g.compare(f,this.ua.Jc))d=d.W(f.name,f.U),e++;else break}}else{d=b.pb(this.g);d=d.ia(H);var k,m,l;if(this.Nb){b=d.xf(this.g);k=this.ua.Jc;m=this.ua.gd;var t=Vd(this.g);l=function(a,b){return t(b,a)}}else b=d.ac(this.g),k=this.ua.gd,
	m=this.ua.Jc,l=Vd(this.g);for(var e=0,A=!1;0<b.Ta.length;)f=Ic(b),!A&&0>=l(k,f)&&(A=!0),(g=A&&e<this.ma&&0>=l(f,m))?e++:d=d.W(f.name,H)}return this.ua.$b().ya(a,d,c)};h.ia=function(a){return a};h.Ra=function(){return!0};h.$b=function(){return this.ua.$b()};
	function Ud(a,b,c,d,e,f){var g;if(a.Nb){var k=Vd(a.g);g=function(a,b){return k(b,a)}}else g=Vd(a.g);O(b.Hb()==a.ma,"");var m=new L(c,d),l=a.Nb?Wd(b,a.g):Xd(b,a.g),t=a.ua.matches(m);if(b.Fa(c)){for(var A=b.T(c),l=e.Ce(a.g,l,a.Nb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.Ce(a.g,l,a.Nb);e=null==l?1:g(l,m);if(t&&!d.e()&&0<=e)return null!=f&&Kd(f,new J("child_changed",d,c,A)),b.W(c,d);null!=f&&Kd(f,new J("child_removed",A,c));b=b.W(c,H);return null!=l&&a.ua.matches(l)?(null!=f&&Kd(f,new J("child_added",
	l.U,l.name)),b.W(l.name,l.U)):b}return d.e()?b:t&&0<=g(l,m)?(null!=f&&(Kd(f,new J("child_removed",l.U,l.name)),Kd(f,new J("child_added",d,c))),b.W(c,d).W(l.name,H)):b};function Yd(a,b){this.me=a;this.og=b}function Zd(a){this.X=a}
	Zd.prototype.gb=function(a,b,c,d){var e=new Jd,f;if(b.type===Bc)b.source.Ae?c=$d(this,a,b.path,b.Ja,c,d,e):(O(b.source.tf,"Unknown source."),f=b.source.ef||mc(a.w())&&!b.path.e(),c=ae(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===be)b.source.Ae?c=ce(this,a,b.path,b.children,c,d,e):(O(b.source.tf,"Unknown source."),f=b.source.ef||mc(a.w()),c=de(this,a,b.path,b.children,c,d,f,e));else if(b.type===ee)if(b.Yd)if(b=b.path,null!=c.xc(b))c=a;else{f=new Vb(c,a,d);d=a.Q.j();if(b.e()||".priority"===K(b))lc(a.w())?
	b=c.Aa(Yb(a)):(b=a.w().j(),O(b instanceof fe,"serverChildren would be complete if leaf node"),b=c.Cc(b)),b=this.X.ya(d,b,e);else{var g=K(b),k=c.Bc(g,a.w());null==k&&Wb(a.w(),g)&&(k=d.T(g));b=null!=k?this.X.H(d,g,k,N(b),f,e):a.Q.j().Fa(g)?this.X.H(d,g,H,N(b),f,e):d;b.e()&&lc(a.w())&&(d=c.Aa(Yb(a)),d.L()&&(b=this.X.ya(b,d,e)))}d=lc(a.w())||null!=c.xc(M);c=ge(a,b,d,this.X.Ra())}else c=he(this,a,b.path,b.Ub,c,d,e);else if(b.type===Dc)d=b.path,b=a.w(),f=b.j(),g=b.ga||d.e(),c=ie(this,new je(a.Q,new Xb(f,
	g,b.Yb)),d,c,Ub,e);else throw jd("Unknown operation type: "+b.type);e=qa(e.ib);d=c;b=d.Q;b.ga&&(f=b.j().L()||b.j().e(),g=ke(a),(0<e.length||!a.Q.ga||f&&!b.j().ea(g)||!b.j().C().ea(g.C()))&&e.push(hc(ke(d))));return new Yd(c,e)};
	function ie(a,b,c,d,e,f){var g=b.Q;if(null!=d.xc(c))return b;var k;if(c.e())O(lc(b.w()),"If change path is empty, we must have complete server data"),mc(b.w())?(e=Yb(b),d=d.Cc(e instanceof fe?e:H)):d=d.Aa(Yb(b)),f=a.X.ya(b.Q.j(),d,f);else{var m=K(c);if(".priority"==m)O(1==le(c),"Can't have a priority with additional path components"),f=g.j(),k=b.w().j(),d=d.nd(c,f,k),f=null!=d?a.X.ia(f,d):g.j();else{var l=N(c);Wb(g,m)?(k=b.w().j(),d=d.nd(c,g.j(),k),d=null!=d?g.j().T(m).H(l,d):g.j().T(m)):d=d.Bc(m,
	b.w());f=null!=d?a.X.H(g.j(),m,d,l,e,f):g.j()}}return ge(b,f,g.ga||c.e(),a.X.Ra())}function ae(a,b,c,d,e,f,g,k){var m=b.w();g=g?a.X:a.X.$b();if(c.e())d=g.ya(m.j(),d,null);else if(g.Ra()&&!m.Yb)d=m.j().H(c,d),d=g.ya(m.j(),d,null);else{var l=K(c);if(!nc(m,c)&&1<le(c))return b;var t=N(c);d=m.j().T(l).H(t,d);d=".priority"==l?g.ia(m.j(),d):g.H(m.j(),l,d,t,Ub,null)}m=m.ga||c.e();b=new je(b.Q,new Xb(d,m,g.Ra()));return ie(a,b,c,e,new Vb(e,b,f),k)}
	function $d(a,b,c,d,e,f,g){var k=b.Q;e=new Vb(e,b,f);if(c.e())g=a.X.ya(b.Q.j(),d,g),a=ge(b,g,!0,a.X.Ra());else if(f=K(c),".priority"===f)g=a.X.ia(b.Q.j(),d),a=ge(b,g,k.ga,k.Yb);else{c=N(c);var m=k.j().T(f);if(!c.e()){var l=e.uf(f);d=null!=l?".priority"===me(c)&&l.S(c.parent()).e()?l:l.H(c,d):H}m.ea(d)?a=b:(g=a.X.H(k.j(),f,d,c,e,g),a=ge(b,g,k.ga,a.X.Ra()))}return a}
	function ce(a,b,c,d,e,f,g){var k=b;ne(d,function(d,l){var t=c.o(d);Wb(b.Q,K(t))&&(k=$d(a,k,t,l,e,f,g))});ne(d,function(d,l){var t=c.o(d);Wb(b.Q,K(t))||(k=$d(a,k,t,l,e,f,g))});return k}function oe(a,b){ne(b,function(b,d){a=a.H(b,d)});return a}
	function de(a,b,c,d,e,f,g,k){if(b.w().j().e()&&!lc(b.w()))return b;var m=b;c=c.e()?d:pe(qe,c,d);var l=b.w().j();c.children.ka(function(c,d){if(l.Fa(c)){var I=b.w().j().T(c),I=oe(I,d);m=ae(a,m,new P(c),I,e,f,g,k)}});c.children.ka(function(c,d){var I=!Wb(b.w(),c)&&null==d.value;l.Fa(c)||I||(I=b.w().j().T(c),I=oe(I,d),m=ae(a,m,new P(c),I,e,f,g,k))});return m}
	function he(a,b,c,d,e,f,g){if(null!=e.xc(c))return b;var k=mc(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.ga||nc(m,c))return ae(a,b,c,m.j().S(c),e,f,k,g);if(c.e()){var l=qe;m.j().R(re,function(a,b){l=l.set(new P(a),b)});return de(a,b,c,l,e,f,k,g)}return b}l=qe;ne(d,function(a){var b=c.o(a);nc(m,b)&&(l=l.set(a,m.j().S(b)))});return de(a,b,c,l,e,f,k,g)};function se(){}var te={};function Vd(a){return u(a.compare,a)}se.prototype.Dd=function(a,b){return 0!==this.compare(new L("[MIN_NAME]",a),new L("[MIN_NAME]",b))};se.prototype.Wc=function(){return ue};function ve(a){O(!a.e()&&".priority"!==K(a),"Can't create PathIndex with empty path or .priority key");this.gc=a}ka(ve,se);h=ve.prototype;h.Lc=function(a){return!a.S(this.gc).e()};h.compare=function(a,b){var c=a.U.S(this.gc),d=b.U.S(this.gc),c=c.Gc(d);return 0===c?yc(a.name,b.name):c};
	h.Sc=function(a,b){var c=Q(a),c=H.H(this.gc,c);return new L(b,c)};h.Tc=function(){var a=H.H(this.gc,we);return new L("[MAX_NAME]",a)};h.toString=function(){return this.gc.slice().join("/")};function xe(){}ka(xe,se);h=xe.prototype;h.compare=function(a,b){var c=a.U.C(),d=b.U.C(),c=c.Gc(d);return 0===c?yc(a.name,b.name):c};h.Lc=function(a){return!a.C().e()};h.Dd=function(a,b){return!a.C().ea(b.C())};h.Wc=function(){return ue};h.Tc=function(){return new L("[MAX_NAME]",new Yc("[PRIORITY-POST]",we))};
	h.Sc=function(a,b){var c=Q(a);return new L(b,new Yc("[PRIORITY-POST]",c))};h.toString=function(){return".priority"};var R=new xe;function ye(){}ka(ye,se);h=ye.prototype;h.compare=function(a,b){return yc(a.name,b.name)};h.Lc=function(){throw jd("KeyIndex.isDefinedOn not expected to be called.");};h.Dd=function(){return!1};h.Wc=function(){return ue};h.Tc=function(){return new L("[MAX_NAME]",H)};h.Sc=function(a){O(q(a),"KeyIndex indexValue must always be a string.");return new L(a,H)};h.toString=function(){return".key"};
	var re=new ye;function ze(){}ka(ze,se);h=ze.prototype;h.compare=function(a,b){var c=a.U.Gc(b.U);return 0===c?yc(a.name,b.name):c};h.Lc=function(){return!0};h.Dd=function(a,b){return!a.ea(b)};h.Wc=function(){return ue};h.Tc=function(){return Ae};h.Sc=function(a,b){var c=Q(a);return new L(b,c)};h.toString=function(){return".value"};var Be=new ze;function Ce(){this.Xb=this.ra=this.Pb=this.oa=this.la=!1;this.ma=0;this.Rb="";this.ic=null;this.Bb="";this.fc=null;this.zb="";this.g=R}var De=new Ce;function Td(a){return""===a.Rb?a.oa:"l"===a.Rb}function Od(a){O(a.oa,"Only valid if start has been set");return a.ic}function Nd(a){O(a.oa,"Only valid if start has been set");return a.Pb?a.Bb:"[MIN_NAME]"}function Rd(a){O(a.ra,"Only valid if end has been set");return a.fc}
	function Pd(a){O(a.ra,"Only valid if end has been set");return a.Xb?a.zb:"[MAX_NAME]"}function Ee(a){var b=new Ce;b.la=a.la;b.ma=a.ma;b.oa=a.oa;b.ic=a.ic;b.Pb=a.Pb;b.Bb=a.Bb;b.ra=a.ra;b.fc=a.fc;b.Xb=a.Xb;b.zb=a.zb;b.g=a.g;return b}h=Ce.prototype;h.Le=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="";return b};h.Me=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="l";return b};h.Ne=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="r";return b};
	h.ce=function(a,b){var c=Ee(this);c.oa=!0;p(a)||(a=null);c.ic=a;null!=b?(c.Pb=!0,c.Bb=b):(c.Pb=!1,c.Bb="");return c};h.vd=function(a,b){var c=Ee(this);c.ra=!0;p(a)||(a=null);c.fc=a;p(b)?(c.Xb=!0,c.zb=b):(c.mh=!1,c.zb="");return c};function Fe(a,b){var c=Ee(a);c.g=b;return c}function Ge(a){var b={};a.oa&&(b.sp=a.ic,a.Pb&&(b.sn=a.Bb));a.ra&&(b.ep=a.fc,a.Xb&&(b.en=a.zb));if(a.la){b.l=a.ma;var c=a.Rb;""===c&&(c=Td(a)?"l":"r");b.vf=c}a.g!==R&&(b.i=a.g.toString());return b}
	function He(a){return!(a.oa||a.ra||a.la)}function Ie(a){return He(a)&&a.g==R}function Je(a){var b={};if(Ie(a))return b;var c;a.g===R?c="$priority":a.g===Be?c="$value":a.g===re?c="$key":(O(a.g instanceof ve,"Unrecognized index type!"),c=a.g.toString());b.orderBy=G(c);a.oa&&(b.startAt=G(a.ic),a.Pb&&(b.startAt+=","+G(a.Bb)));a.ra&&(b.endAt=G(a.fc),a.Xb&&(b.endAt+=","+G(a.zb)));a.la&&(Td(a)?b.limitToFirst=a.ma:b.limitToLast=a.ma);return b}h.toString=function(){return G(Ge(this))};function Ke(a,b){this.Ed=a;this.hc=b}Ke.prototype.get=function(a){var b=z(this.Ed,a);if(!b)throw Error("No index defined for "+a);return b===te?null:b};function Le(a,b,c){var d=ma(a.Ed,function(d,f){var g=z(a.hc,f);O(g,"Missing index implementation for "+f);if(d===te){if(g.Lc(b.U)){for(var k=[],m=c.ac(wc),l=Ic(m);l;)l.name!=b.name&&k.push(l),l=Ic(m);k.push(b);return Me(k,Vd(g))}return te}g=c.get(b.name);k=d;g&&(k=k.remove(new L(b.name,g)));return k.Sa(b,b.U)});return new Ke(d,a.hc)}
	function Ne(a,b,c){var d=ma(a.Ed,function(a){if(a===te)return a;var d=c.get(b.name);return d?a.remove(new L(b.name,d)):a});return new Ke(d,a.hc)}var Oe=new Ke({".priority":te},{".priority":R});function Yc(a,b){this.B=a;O(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.ca=b||H;Pe(this.ca);this.Gb=null}var Qe=["object","boolean","number","string"];h=Yc.prototype;h.L=function(){return!0};h.C=function(){return this.ca};h.ia=function(a){return new Yc(this.B,a)};h.T=function(a){return".priority"===a?this.ca:H};h.S=function(a){return a.e()?this:".priority"===K(a)?this.ca:H};h.Fa=function(){return!1};h.wf=function(){return null};
	h.W=function(a,b){return".priority"===a?this.ia(b):b.e()&&".priority"!==a?this:H.W(a,b).ia(this.ca)};h.H=function(a,b){var c=K(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;O(".priority"!==c||1===le(a),".priority must be the last token in a path");return this.W(c,H.H(N(a),b))};h.e=function(){return!1};h.Hb=function(){return 0};h.R=function(){return!1};h.J=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().J()}:this.Ea()};
	h.hash=function(){if(null===this.Gb){var a="";this.ca.e()||(a+="priority:"+Re(this.ca.J())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Ad(this.B):a+this.B;this.Gb=ld(a)}return this.Gb};h.Ea=function(){return this.B};h.Gc=function(a){if(a===H)return 1;if(a instanceof fe)return-1;O(a.L(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=La(Qe,b),e=La(Qe,c);O(0<=d,"Unknown leaf type: "+b);O(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	h.pb=function(){return this};h.Mc=function(){return!0};h.ea=function(a){return a===this?!0:a.L()?this.B===a.B&&this.ca.ea(a.ca):!1};h.toString=function(){return G(this.J(!0))};function fe(a,b,c){this.m=a;(this.ca=b)&&Pe(this.ca);a.e()&&O(!this.ca||this.ca.e(),"An empty node cannot have a priority");this.Ab=c;this.Gb=null}h=fe.prototype;h.L=function(){return!1};h.C=function(){return this.ca||H};h.ia=function(a){return this.m.e()?this:new fe(this.m,a,this.Ab)};h.T=function(a){if(".priority"===a)return this.C();a=this.m.get(a);return null===a?H:a};h.S=function(a){var b=K(a);return null===b?this:this.T(b).S(N(a))};h.Fa=function(a){return null!==this.m.get(a)};
	h.W=function(a,b){O(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ia(b);var c=new L(a,b),d,e;b.e()?(d=this.m.remove(a),c=Ne(this.Ab,c,this.m)):(d=this.m.Sa(a,b),c=Le(this.Ab,c,this.m));e=d.e()?H:this.ca;return new fe(d,e,c)};h.H=function(a,b){var c=K(a);if(null===c)return b;O(".priority"!==K(a)||1===le(a),".priority must be the last token in a path");var d=this.T(c).H(N(a),b);return this.W(c,d)};h.e=function(){return this.m.e()};h.Hb=function(){return this.m.count()};
	var Se=/^(0|[1-9]\d*)$/;h=fe.prototype;h.J=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.R(R,function(f,g){b[f]=g.J(a);c++;e&&Se.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.C().e()&&(b[".priority"]=this.C().J());return b};h.hash=function(){if(null===this.Gb){var a="";this.C().e()||(a+="priority:"+Re(this.C().J())+":");this.R(R,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Gb=""===a?"":ld(a)}return this.Gb};
	h.wf=function(a,b,c){return(c=Te(this,c))?(a=Gc(c,new L(a,b)))?a.name:null:Gc(this.m,a)};function Wd(a,b){var c;c=(c=Te(a,b))?(c=c.Vc())&&c.name:a.m.Vc();return c?new L(c,a.m.get(c)):null}function Xd(a,b){var c;c=(c=Te(a,b))?(c=c.jc())&&c.name:a.m.jc();return c?new L(c,a.m.get(c)):null}h.R=function(a,b){var c=Te(this,a);return c?c.ka(function(a){return b(a.name,a.U)}):this.m.ka(b)};h.ac=function(a){return this.bc(a.Wc(),a)};
	h.bc=function(a,b){var c=Te(this,b);if(c)return c.bc(a,function(a){return a});for(var c=this.m.bc(a.name,wc),d=Jc(c);null!=d&&0>b.compare(d,a);)Ic(c),d=Jc(c);return c};h.xf=function(a){return this.dc(a.Tc(),a)};h.dc=function(a,b){var c=Te(this,b);if(c)return c.dc(a,function(a){return a});for(var c=this.m.dc(a.name,wc),d=Jc(c);null!=d&&0<b.compare(d,a);)Ic(c),d=Jc(c);return c};h.Gc=function(a){return this.e()?a.e()?0:-1:a.L()||a.e()?1:a===we?-1:0};
	h.pb=function(a){if(a===re||sa(this.Ab.hc,a.toString()))return this;var b=this.Ab,c=this.m;O(a!==re,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.ac(wc),f=Ic(c);f;)e=e||a.Lc(f.U),d.push(f),f=Ic(c);d=e?Me(d,Vd(a)):te;e=a.toString();c=wa(b.hc);c[e]=a;a=wa(b.Ed);a[e]=d;return new fe(this.m,this.ca,new Ke(a,c))};h.Mc=function(a){return a===re||sa(this.Ab.hc,a.toString())};
	h.ea=function(a){if(a===this)return!0;if(a.L())return!1;if(this.C().ea(a.C())&&this.m.count()===a.m.count()){var b=this.ac(R);a=a.ac(R);for(var c=Ic(b),d=Ic(a);c&&d;){if(c.name!==d.name||!c.U.ea(d.U))return!1;c=Ic(b);d=Ic(a)}return null===c&&null===d}return!1};function Te(a,b){return b===re?null:a.Ab.get(b.toString())}h.toString=function(){return G(this.J(!0))};function Q(a,b){if(null===a)return H;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);O(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Yc(a,Q(c));if(a instanceof Array){var d=H,e=a;v(e,function(a,b){if(y(e,b)&&"."!==b.substring(0,1)){var c=Q(a);if(c.L()||!c.e())d=
	d.W(b,c)}});return d.ia(Q(c))}var f=[],g=!1,k=a;Fb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=Q(k[a]);b.e()||(g=g||!b.C().e(),f.push(new L(a,b)))}});if(0==f.length)return H;var m=Me(f,xc,function(a){return a.name},zc);if(g){var l=Me(f,Vd(R));return new fe(m,Q(c),new Ke({".priority":l},{".priority":R}))}return new fe(m,Q(c),Oe)}var Ue=Math.log(2);
	function Ve(a){this.count=parseInt(Math.log(a+1)/Ue,10);this.nf=this.count-1;this.ng=a+1&parseInt(Array(this.count+1).join("1"),2)}function We(a){var b=!(a.ng&1<<a.nf);a.nf--;return b}
	function Me(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],t=c?c(l):l;return new Kc(t,l.U,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),A=e(l+1,d),l=a[l],t=c?c(l):l;return new Kc(t,l.U,!1,f,A)}a.sort(b);var f=function(b){function d(b,g){var k=t-b,A=t;t-=b;var A=e(k+1,A),k=a[k],I=c?c(k):k,A=new Kc(I,k.U,g,null,A);f?f.left=A:l=A;f=A}for(var f=null,l=null,t=a.length,A=0;A<b.count;++A){var I=We(b),Qd=Math.pow(2,b.count-(A+1));I?d(Qd,!1):(d(Qd,!1),d(Qd,!0))}return l}(new Ve(a.length));
	return null!==f?new Ec(d||b,f):new Ec(d||b)}function Re(a){return"number"===typeof a?"number:"+Ad(a):"string:"+a}function Pe(a){if(a.L()){var b=a.J();O("string"===typeof b||"number"===typeof b||"object"===typeof b&&y(b,".sv"),"Priority must be a string or number.")}else O(a===we||a.e(),"priority of unexpected type.");O(a===we||a.C().e(),"Priority nodes can't have a priority of their own.")}var H=new fe(new Ec(zc),null,Oe);function Xe(){fe.call(this,new Ec(zc),H,Oe)}ka(Xe,fe);h=Xe.prototype;
	h.Gc=function(a){return a===this?0:1};h.ea=function(a){return a===this};h.C=function(){return this};h.T=function(){return H};h.e=function(){return!1};var we=new Xe,ue=new L("[MIN_NAME]",H),Ae=new L("[MAX_NAME]",we);function je(a,b){this.Q=a;this.ae=b}function ge(a,b,c,d){return new je(new Xb(b,c,d),a.ae)}function ke(a){return a.Q.ga?a.Q.j():null}je.prototype.w=function(){return this.ae};function Yb(a){return a.ae.ga?a.ae.j():null};function Ye(a,b){this.Y=a;var c=a.n,d=new Ld(c.g),c=He(c)?new Ld(c.g):c.la?new Sd(c):new Md(c);this.Nf=new Zd(c);var e=b.w(),f=b.Q,g=d.ya(H,e.j(),null),k=c.ya(H,f.j(),null);this.Oa=new je(new Xb(k,f.ga,c.Ra()),new Xb(g,e.ga,d.Ra()));this.$a=[];this.ug=new Fd(a)}function Ze(a){return a.Y}h=Ye.prototype;h.w=function(){return this.Oa.w().j()};h.kb=function(a){var b=Yb(this.Oa);return b&&(He(this.Y.n)||!a.e()&&!b.T(K(a)).e())?b.S(a):null};h.e=function(){return 0===this.$a.length};h.Tb=function(a){this.$a.push(a)};
	h.nb=function(a,b){var c=[];if(b){O(null==a,"A cancel should cancel all event registrations.");var d=this.Y.path;Ma(this.$a,function(a){(a=a.lf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.$a.length;++f){var g=this.$a[f];if(!g.matches(a))e.push(g);else if(a.yf()){e=e.concat(this.$a.slice(f+1));break}}this.$a=e}else this.$a=[];return c};
	h.gb=function(a,b,c){a.type===be&&null!==a.source.Lb&&(O(Yb(this.Oa),"We should always have a full cache before handling merges"),O(ke(this.Oa),"Missing event cache, even though we have a server cache"));var d=this.Oa;a=this.Nf.gb(d,a,b,c);b=this.Nf;c=a.me;O(c.Q.j().Mc(b.X.g),"Event snap not indexed");O(c.w().j().Mc(b.X.g),"Server snap not indexed");O(lc(a.me.w())||!lc(d.w()),"Once a server snap is complete, it should never go back");this.Oa=a.me;return $e(this,a.og,a.me.Q.j(),null)};
	function af(a,b){var c=a.Oa.Q,d=[];c.j().L()||c.j().R(R,function(a,b){d.push(new J("child_added",b,a))});c.ga&&d.push(hc(c.j()));return $e(a,d,c.j(),b)}function $e(a,b,c,d){return Gd(a.ug,b,c,d?[d]:a.$a)};function bf(a,b,c){this.type=be;this.source=a;this.path=b;this.children=c}bf.prototype.$c=function(a){if(this.path.e())return a=this.children.subtree(new P(a)),a.e()?null:a.value?new Ac(this.source,M,a.value):new bf(this.source,M,a);O(K(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new bf(this.source,N(this.path),this.children)};bf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function cf(a,b){this.f=pd("p:rest:");this.G=a;this.Kb=b;this.Ca=null;this.ba={}}function df(a,b){if(p(b))return"tag$"+b;O(Ie(a.n),"should have a tag if it's not a default query.");return a.path.toString()}h=cf.prototype;
	h.Cf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.wa());var f=df(a,c),g={};this.ba[f]=g;a=Je(a.n);var k=this;ef(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Kb(e,t,!1,c);z(k.ba,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.$f=function(a,b){var c=df(a,b);delete this.ba[c]};h.O=function(a,b){this.Ca=a;var c=Cd(a),d=c.data,c=c.Ec&&c.Ec.exp;b&&b("ok",{auth:d,expires:c})};h.je=function(a){this.Ca=null;a("ok",null)};
	h.Qe=function(){};h.Gf=function(){};h.Md=function(){};h.put=function(){};h.Df=function(){};h.Ye=function(){};
	function ef(a,b,c,d){c=c||{};c.format="export";a.Ca&&(c.auth=a.Ca);var e=(a.G.ob?"https://":"http://")+a.G.host+b+"?"+Ib(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=Rb(f.responseText)}catch(c){S("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
	f.status&&S("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function ff(a){O(da(a)&&0<a.length,"Requires a non-empty array");this.fg=a;this.Rc={}}ff.prototype.ie=function(a,b){var c;c=this.Rc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Dc.apply(c[d].Qa,Array.prototype.slice.call(arguments,1))};ff.prototype.Ib=function(a,b,c){gf(this,a);this.Rc[a]=this.Rc[a]||[];this.Rc[a].push({Dc:b,Qa:c});(a=this.Ee(a))&&b.apply(c,a)};
	ff.prototype.mc=function(a,b,c){gf(this,a);a=this.Rc[a]||[];for(var d=0;d<a.length;d++)if(a[d].Dc===b&&(!c||c===a[d].Qa)){a.splice(d,1);break}};function gf(a,b){O(Ra(a.fg,function(a){return a===b}),"Unknown event: "+b)};var hf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);O(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);O(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function jf(){ff.call(this,["online"]);this.oc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.oc||(a.oc=!0,a.ie("online",!0))},!1);window.addEventListener("offline",function(){a.oc&&(a.oc=!1,a.ie("online",!1))},!1)}}ka(jf,ff);jf.prototype.Ee=function(a){O("online"===a,"Unknown event type: "+a);return[this.oc]};ba(jf);function kf(){ff.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Sb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Sb&&(c.Sb=b,c.ie("visible",b))},!1)}}ka(kf,ff);kf.prototype.Ee=function(a){O("visible"===a,"Unknown event type: "+a);return[this.Sb]};ba(kf);function P(a,b){if(1==arguments.length){this.u=a.split("/");for(var c=0,d=0;d<this.u.length;d++)0<this.u[d].length&&(this.u[c]=this.u[d],c++);this.u.length=c;this.aa=0}else this.u=a,this.aa=b}function lf(a,b){var c=K(a);if(null===c)return b;if(c===K(b))return lf(N(a),N(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function mf(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=yc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function K(a){return a.aa>=a.u.length?null:a.u[a.aa]}function le(a){return a.u.length-a.aa}function N(a){var b=a.aa;b<a.u.length&&b++;return new P(a.u,b)}function me(a){return a.aa<a.u.length?a.u[a.u.length-1]:null}h=P.prototype;
	h.toString=function(){for(var a="",b=this.aa;b<this.u.length;b++)""!==this.u[b]&&(a+="/"+this.u[b]);return a||"/"};h.slice=function(a){return this.u.slice(this.aa+(a||0))};h.parent=function(){if(this.aa>=this.u.length)return null;for(var a=[],b=this.aa;b<this.u.length-1;b++)a.push(this.u[b]);return new P(a,0)};
	h.o=function(a){for(var b=[],c=this.aa;c<this.u.length;c++)b.push(this.u[c]);if(a instanceof P)for(c=a.aa;c<a.u.length;c++)b.push(a.u[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new P(b,0)};h.e=function(){return this.aa>=this.u.length};h.ea=function(a){if(le(this)!==le(a))return!1;for(var b=this.aa,c=a.aa;b<=this.u.length;b++,c++)if(this.u[b]!==a.u[c])return!1;return!0};
	h.contains=function(a){var b=this.aa,c=a.aa;if(le(this)>le(a))return!1;for(;b<this.u.length;){if(this.u[b]!==a.u[c])return!1;++b;++c}return!0};var M=new P("");function nf(a,b){this.Ua=a.slice();this.Ka=Math.max(1,this.Ua.length);this.pf=b;for(var c=0;c<this.Ua.length;c++)this.Ka+=Pb(this.Ua[c]);of(this)}nf.prototype.push=function(a){0<this.Ua.length&&(this.Ka+=1);this.Ua.push(a);this.Ka+=Pb(a);of(this)};nf.prototype.pop=function(){var a=this.Ua.pop();this.Ka-=Pb(a);0<this.Ua.length&&--this.Ka};
	function of(a){if(768<a.Ka)throw Error(a.pf+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ua.length)throw Error(a.pf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+pf(a));}function pf(a){return 0==a.Ua.length?"":"in property '"+a.Ua.join(".")+"'"};function qf(a,b){this.value=a;this.children=b||rf}var rf=new Ec(function(a,b){return a===b?0:a<b?-1:1});function sf(a){var b=qe;v(a,function(a,d){b=b.set(new P(d),a)});return b}h=qf.prototype;h.e=function(){return null===this.value&&this.children.e()};function tf(a,b,c){if(null!=a.value&&c(a.value))return{path:M,value:a.value};if(b.e())return null;var d=K(b);a=a.children.get(d);return null!==a?(b=tf(a,N(b),c),null!=b?{path:(new P(d)).o(b.path),value:b.value}:null):null}
	function uf(a,b){return tf(a,b,function(){return!0})}h.subtree=function(a){if(a.e())return this;var b=this.children.get(K(a));return null!==b?b.subtree(N(a)):qe};h.set=function(a,b){if(a.e())return new qf(b,this.children);var c=K(a),d=(this.children.get(c)||qe).set(N(a),b),c=this.children.Sa(c,d);return new qf(this.value,c)};
	h.remove=function(a){if(a.e())return this.children.e()?qe:new qf(null,this.children);var b=K(a),c=this.children.get(b);return c?(a=c.remove(N(a)),b=a.e()?this.children.remove(b):this.children.Sa(b,a),null===this.value&&b.e()?qe:new qf(this.value,b)):this};h.get=function(a){if(a.e())return this.value;var b=this.children.get(K(a));return b?b.get(N(a)):null};
	function pe(a,b,c){if(b.e())return c;var d=K(b);b=pe(a.children.get(d)||qe,N(b),c);d=b.e()?a.children.remove(d):a.children.Sa(d,b);return new qf(a.value,d)}function vf(a,b){return wf(a,M,b)}function wf(a,b,c){var d={};a.children.ka(function(a,f){d[a]=wf(f,b.o(a),c)});return c(b,a.value,d)}function xf(a,b,c){return yf(a,b,M,c)}function yf(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=K(b);return(a=a.children.get(e))?yf(a,N(b),c.o(e),d):null}
	function zf(a,b,c){Af(a,b,M,c)}function Af(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=K(b);return(a=a.children.get(e))?Af(a,N(b),c.o(e),d):qe}function ne(a,b){Bf(a,M,b)}function Bf(a,b,c){a.children.ka(function(a,e){Bf(e,b.o(a),c)});a.value&&c(b,a.value)}function Cf(a,b){a.children.ka(function(a,d){d.value&&b(a,d.value)})}var qe=new qf(null);qf.prototype.toString=function(){var a={};ne(this,function(b,c){a[b.toString()]=c.toString()});return G(a)};function Df(a,b,c){this.type=ee;this.source=Ef;this.path=a;this.Ub=b;this.Yd=c}Df.prototype.$c=function(a){if(this.path.e()){if(null!=this.Ub.value)return O(this.Ub.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ub.subtree(new P(a));return new Df(M,a,this.Yd)}O(K(this.path)===a,"operationForChild called for unrelated child.");return new Df(N(this.path),this.Ub,this.Yd)};
	Df.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Yd+" affectedTree="+this.Ub+")"};var Bc=0,be=1,ee=2,Dc=3;function Ff(a,b,c,d){this.Ae=a;this.tf=b;this.Lb=c;this.ef=d;O(!d||b,"Tagged queries must be from server.")}var Ef=new Ff(!0,!1,null,!1),Gf=new Ff(!1,!0,null,!1);Ff.prototype.toString=function(){return this.Ae?"user":this.ef?"server(queryID="+this.Lb+")":"server"};function Hf(a){this.Z=a}var If=new Hf(new qf(null));function Jf(a,b,c){if(b.e())return new Hf(new qf(c));var d=uf(a.Z,b);if(null!=d){var e=d.path,d=d.value;b=lf(e,b);d=d.H(b,c);return new Hf(a.Z.set(e,d))}a=pe(a.Z,b,new qf(c));return new Hf(a)}function Kf(a,b,c){var d=a;Fb(c,function(a,c){d=Jf(d,b.o(a),c)});return d}Hf.prototype.Ud=function(a){if(a.e())return If;a=pe(this.Z,a,qe);return new Hf(a)};function Lf(a,b){var c=uf(a.Z,b);return null!=c?a.Z.get(c.path).S(lf(c.path,b)):null}
	function Mf(a){var b=[],c=a.Z.value;null!=c?c.L()||c.R(R,function(a,c){b.push(new L(a,c))}):a.Z.children.ka(function(a,c){null!=c.value&&b.push(new L(a,c.value))});return b}function Nf(a,b){if(b.e())return a;var c=Lf(a,b);return null!=c?new Hf(new qf(c)):new Hf(a.Z.subtree(b))}Hf.prototype.e=function(){return this.Z.e()};Hf.prototype.apply=function(a){return Of(M,this.Z,a)};
	function Of(a,b,c){if(null!=b.value)return c.H(a,b.value);var d=null;b.children.ka(function(b,f){".priority"===b?(O(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Of(a.o(b),f,c)});c.S(a).e()||null===d||(c=c.H(a.o(".priority"),d));return c};function Pf(){this.V=If;this.pa=[];this.Pc=-1}function Qf(a,b){for(var c=0;c<a.pa.length;c++){var d=a.pa[c];if(d.md===b)return d}return null}h=Pf.prototype;
	h.Ud=function(a){var b=Sa(this.pa,function(b){return b.md===a});O(0<=b,"removeWrite called with nonexistent writeId.");var c=this.pa[b];this.pa.splice(b,1);for(var d=c.visible,e=!1,f=this.pa.length-1;d&&0<=f;){var g=this.pa[f];g.visible&&(f>=b&&Rf(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.V=Sf(this.pa,Tf,M),this.Pc=0<this.pa.length?this.pa[this.pa.length-1].md:-1;else if(c.Ja)this.V=this.V.Ud(c.path);else{var k=this;v(c.children,function(a,b){k.V=k.V.Ud(c.path.o(b))})}return!0}return!1};
	h.Aa=function(a,b,c,d){if(c||d){var e=Nf(this.V,a);return!d&&e.e()?b:d||null!=b||null!=Lf(e,M)?(e=Sf(this.pa,function(b){return(b.visible||d)&&(!c||!(0<=La(c,b.md)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||H,e.apply(b)):null}e=Lf(this.V,a);if(null!=e)return e;e=Nf(this.V,a);return e.e()?b:null!=b||null!=Lf(e,M)?(b=b||H,e.apply(b)):null};
	h.Cc=function(a,b){var c=H,d=Lf(this.V,a);if(d)d.L()||d.R(R,function(a,b){c=c.W(a,b)});else if(b){var e=Nf(this.V,a);b.R(R,function(a,b){var d=Nf(e,new P(a)).apply(b);c=c.W(a,d)});Ma(Mf(e),function(a){c=c.W(a.name,a.U)})}else e=Nf(this.V,a),Ma(Mf(e),function(a){c=c.W(a.name,a.U)});return c};h.nd=function(a,b,c,d){O(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.o(b);if(null!=Lf(this.V,a))return null;a=Nf(this.V,a);return a.e()?d.S(b):a.apply(d.S(b))};
	h.Bc=function(a,b,c){a=a.o(b);var d=Lf(this.V,a);return null!=d?d:Wb(c,b)?Nf(this.V,a).apply(c.j().T(b)):null};h.xc=function(a){return Lf(this.V,a)};h.qe=function(a,b,c,d,e,f){var g;a=Nf(this.V,a);g=Lf(a,M);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.pb(f);if(g.e()||g.L())return[];b=[];a=Vd(f);e=e?g.dc(c,f):g.bc(c,f);for(f=Ic(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=Ic(e);return b};
	function Rf(a,b){return a.Ja?a.path.contains(b):!!ta(a.children,function(c,d){return a.path.o(d).contains(b)})}function Tf(a){return a.visible}
	function Sf(a,b,c){for(var d=If,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ja)c.contains(g)?(g=lf(c,g),d=Jf(d,g,f.Ja)):g.contains(c)&&(g=lf(g,c),d=Jf(d,M,f.Ja.S(g)));else if(f.children)if(c.contains(g))g=lf(c,g),d=Kf(d,g,f.children);else{if(g.contains(c))if(g=lf(g,c),g.e())d=Kf(d,M,f.children);else if(f=z(f.children,K(g)))f=f.S(N(g)),d=Jf(d,M,f)}else throw jd("WriteRecord should have .snap or .children");}}return d}function Uf(a,b){this.Qb=a;this.Z=b}h=Uf.prototype;
	h.Aa=function(a,b,c){return this.Z.Aa(this.Qb,a,b,c)};h.Cc=function(a){return this.Z.Cc(this.Qb,a)};h.nd=function(a,b,c){return this.Z.nd(this.Qb,a,b,c)};h.xc=function(a){return this.Z.xc(this.Qb.o(a))};h.qe=function(a,b,c,d,e){return this.Z.qe(this.Qb,a,b,c,d,e)};h.Bc=function(a,b){return this.Z.Bc(this.Qb,a,b)};h.o=function(a){return new Uf(this.Qb.o(a),this.Z)};function Vf(){this.children={};this.pd=0;this.value=null}function Wf(a,b,c){this.Jd=a?a:"";this.Ha=b?b:null;this.A=c?c:new Vf}function Xf(a,b){for(var c=b instanceof P?b:new P(b),d=a,e;null!==(e=K(c));)d=new Wf(e,d,z(d.A.children,e)||new Vf),c=N(c);return d}h=Wf.prototype;h.Ea=function(){return this.A.value};function Yf(a,b){O("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Zf(a)}h.clear=function(){this.A.value=null;this.A.children={};this.A.pd=0;Zf(this)};
	h.zd=function(){return 0<this.A.pd};h.e=function(){return null===this.Ea()&&!this.zd()};h.R=function(a){var b=this;v(this.A.children,function(c,d){a(new Wf(d,b,c))})};function $f(a,b,c,d){c&&!d&&b(a);a.R(function(a){$f(a,b,!0,d)});c&&d&&b(a)}function ag(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new P(null===this.Ha?this.Jd:this.Ha.path()+"/"+this.Jd)};h.name=function(){return this.Jd};h.parent=function(){return this.Ha};
	function Zf(a){if(null!==a.Ha){var b=a.Ha,c=a.Jd,d=a.e(),e=y(b.A.children,c);d&&e?(delete b.A.children[c],b.A.pd--,Zf(b)):d||e||(b.A.children[c]=a.A,b.A.pd++,Zf(b))}};var bg=/[\[\].#$\/\u0000-\u001F\u007F]/,cg=/[\[\].#$\u0000-\u001F\u007F]/,dg=/^[a-zA-Z][a-zA-Z._\-+]+$/;function eg(a){return q(a)&&0!==a.length&&!bg.test(a)}function fg(a){return null===a||q(a)||fa(a)&&!td(a)||ga(a)&&y(a,".sv")}function gg(a,b,c,d){d&&!p(b)||hg(E(a,1,d),b,c)}
	function hg(a,b,c){c instanceof P&&(c=new nf(c,a));if(!p(b))throw Error(a+"contains undefined "+pf(c));if(r(b))throw Error(a+"contains a function "+pf(c)+" with contents: "+b.toString());if(td(b))throw Error(a+"contains "+b.toString()+" "+pf(c));if(q(b)&&b.length>10485760/3&&10485760<Pb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+pf(c)+" ('"+b.substring(0,50)+"...')");if(ga(b)){var d=!1,e=!1;Fb(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!eg(b)))throw Error(a+" contains an invalid key ("+b+") "+pf(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);hg(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+pf(c)+" in addition to actual children.");}}
	function ig(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!eg(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(mf);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function jg(a,b,c){var d=E(a,1,!1);if(!ga(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Fb(b,function(a,b){var k=new P(a);hg(d,b,c.o(k));if(".priority"===me(k)&&!fg(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});ig(d,e)}
	function kg(a,b,c){if(td(c))throw Error(E(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!fg(c))throw Error(E(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function lg(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(E(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function mg(a,b){if(p(b)&&!eg(b))throw Error(E(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function ng(a,b){if(!q(b)||0===b.length||cg.test(b))throw Error(E(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function og(a,b){if(".info"===K(b))throw Error(a+" failed: Can't modify data under /.info/");}function pg(a,b){if(!q(b))throw Error(E(a,1,!1)+"must be a valid credential (a string).");}function qg(a,b,c){if(!q(c))throw Error(E(a,b,!1)+"must be a valid string.");}
	function rg(a,b){qg(a,1,b);if(!dg.test(b))throw Error(E(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function sg(a,b,c,d){if(!d||p(c))if(!ga(c)||null===c)throw Error(E(a,b,d)+"must be a valid object.");}function tg(a,b,c){if(!ga(b)||!y(b,c))throw Error(E(a,1,!1)+'must contain the key "'+c+'"');if(!q(z(b,c)))throw Error(E(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function ug(){this.set={}}h=ug.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return y(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.clear=function(){this.set={}};h.e=function(){return va(this.set)};h.count=function(){return oa(this.set)};function vg(a,b){v(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];v(this.set,function(b,c){a.push(c)});return a};function Vc(){this.m=this.B=null}Vc.prototype.find=function(a){if(null!=this.B)return this.B.S(a);if(a.e()||null==this.m)return null;var b=K(a);a=N(a);return this.m.contains(b)?this.m.get(b).find(a):null};Vc.prototype.rc=function(a,b){if(a.e())this.B=b,this.m=null;else if(null!==this.B)this.B=this.B.H(a,b);else{null==this.m&&(this.m=new ug);var c=K(a);this.m.contains(c)||this.m.add(c,new Vc);c=this.m.get(c);a=N(a);c.rc(a,b)}};
	function wg(a,b){if(b.e())return a.B=null,a.m=null,!0;if(null!==a.B){if(a.B.L())return!1;var c=a.B;a.B=null;c.R(R,function(b,c){a.rc(new P(b),c)});return wg(a,b)}return null!==a.m?(c=K(b),b=N(b),a.m.contains(c)&&wg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function Wc(a,b,c){null!==a.B?c(b,a.B):a.R(function(a,e){var f=new P(b.toString()+"/"+a);Wc(e,f,c)})}Vc.prototype.R=function(a){null!==this.m&&vg(this.m,function(b,c){a(b,c)})};var xg="auth.firebase.com";function yg(a,b,c){this.qd=a||{};this.he=b||{};this.fb=c||{};this.qd.remember||(this.qd.remember="default")}var zg=["remember","redirectTo"];function Ag(a){var b={},c={};Fb(a||{},function(a,e){0<=La(zg,a)?b[a]=e:c[a]=e});return new yg(b,{},c)};function Bg(a,b){this.Ue=["session",a.Rd,a.lc].join(":");this.ee=b}Bg.prototype.set=function(a,b){if(!b)if(this.ee.length)b=this.ee[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Ue,a)};Bg.prototype.get=function(){var a=Oa(this.ee,u(this.Bg,this)),a=Na(a,function(a){return null!==a});Va(a,function(a,c){return Dd(c.token)-Dd(a.token)});return 0<a.length?a.shift():null};Bg.prototype.Bg=function(a){try{var b=a.get(this.Ue);if(b&&b.token)return b}catch(c){}return null};
	Bg.prototype.clear=function(){var a=this;Ma(this.ee,function(b){b.remove(a.Ue)})};function Cg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function Dg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Cg())}function Eg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
	function Fg(a){var b=Cg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function Gg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function Hg(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Ig(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
	function Jg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function Kg(a){var b="";try{a=a.replace(/.*\?/,"");var c=Jb(a);c&&y(c,"__firebase_request_key")&&(b=z(c,"__firebase_request_key"))}catch(d){}return b}function Lg(){var a=sd(xg);return a.scheme+"://"+a.host+"/v2"}function Mg(a){return Lg()+"/"+a+"/auth/channel"};function Ng(a){var b=this;this.hb=a;this.fe="*";Fg(8)?this.Uc=this.Cd=Gg():(this.Uc=window.opener,this.Cd=window);if(!b.Uc)throw"Unable to find relay frame";Hg(this.Cd,"message",u(this.nc,this));Hg(this.Cd,"message",u(this.Ff,this));try{Og(this,{a:"ready"})}catch(c){Hg(this.Uc,"load",function(){Og(b,{a:"ready"})})}Hg(window,"unload",u(this.Mg,this))}function Og(a,b){b=G(b);Fg(8)?a.Uc.doPost(b,a.fe):a.Uc.postMessage(b,a.fe)}
	Ng.prototype.nc=function(a){var b=this,c;try{c=Rb(a.data)}catch(d){}c&&"request"===c.a&&(Ig(window,"message",this.nc),this.fe=a.origin,this.hb&&setTimeout(function(){b.hb(b.fe,c.d,function(a,c){b.mg=!c;b.hb=void 0;Og(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Ng.prototype.Mg=function(){try{Ig(this.Cd,"message",this.Ff)}catch(a){}this.hb&&(Og(this,{a:"error",d:"unknown closed window"}),this.hb=void 0);try{window.close()}catch(b){}};Ng.prototype.Ff=function(a){if(this.mg&&"die"===a.data)try{window.close()}catch(b){}};function Pg(a){this.tc=Fa()+Fa()+Fa();this.Kf=a}Pg.prototype.open=function(a,b){cd.set("redirect_request_id",this.tc);cd.set("redirect_request_id",this.tc);b.requestId=this.tc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+Ib(b);window.location=a};Pg.isAvailable=function(){return!Eg()&&!Dg()};Pg.prototype.Fc=function(){return"redirect"};var Qg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Rg(a){var b=Error(z(Qg,a),a);b.code=a;return b};function Sg(a){var b;(b=!a.window_features)||(b=Cg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
	Sg.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);t&&(t=clearInterval(t));Ig(window,"message",e);Ig(window,"unload",d);if(l&&!a)try{l.close()}catch(b){k.postMessage("die",m)}l=k=void 0}function e(a){if(a.origin===m)try{var b=Rb(a.data);"ready"===b.a?k.postMessage(A,m):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=Fg(8),g,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
	var m=Jg(a);if(m!==Jg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.options.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+Ib(b);var l=window.open(a,this.options.window_name,this.options.window_features);k||(k=l);var t=setInterval(function(){l&&l.closed&&
	(d(!1),c&&(c(Rg("USER_CANCELLED")),c=null))},500),A=G({a:"request",d:b});Hg(window,"unload",d);Hg(window,"message",e)}};
	Sg.isAvailable=function(){var a;if(a="postMessage"in window&&!Eg())(a=Dg()||"undefined"!==typeof navigator&&(!!Cg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=Cg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!Cg().match(/PhantomJS/)};Sg.prototype.Fc=function(){return"popup"};function Tg(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
	Tg.prototype.open=function(a,b,c){function d(){c&&(c(Rg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),g;Hg(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=Rb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Rg("SERVER_ERROR")):c(Rg("NETWORK_ERROR"));c=null;Ig(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+Ib(b),g=null;else{var k=this.options.headers.content_type;
	"application/json"===k&&(g=G(b));"application/x-www-form-urlencoded"===k&&(g=Ib(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};ya(a,this.options.headers);for(var m in a)e.setRequestHeader(m,a[m]);e.send(g)};Tg.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=Cg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||Fg(10);return a};Tg.prototype.Fc=function(){return"json"};function Ug(a){this.tc=Fa()+Fa()+Fa();this.Kf=a}
	Ug.prototype.open=function(a,b,c){function d(){c&&(c(Rg("USER_CANCELLED")),c=null)}var e=this,f=sd(xg),g;b.requestId=this.tc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=Ib(b);(g=window.open(a,"_blank","location=no"))&&r(g.addEventListener)?(g.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var l=document.createElement("a");l.href=a.url;b=l.host===f.host&&"/blank/page.html"===l.pathname;break a}catch(t){}b=!1}b&&(a=Kg(a.url),g.removeEventListener("exit",
	d),g.close(),a=new yg(null,null,{requestId:e.tc,requestKey:a}),e.Kf.requestWithCredential("/auth/session",a,c),c=null)}),g.addEventListener("exit",d)):c(Rg("TRANSPORT_UNAVAILABLE"))};Ug.isAvailable=function(){return Dg()};Ug.prototype.Fc=function(){return"redirect"};function Vg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
	Vg.prototype.open=function(a,b,c){function d(){c&&(c(Rg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;va(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);Ig(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+Ib(b);
	Hg(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Wg(f,a,c)};
	function Wg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Rg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Rg("NETWORK_ERROR"))}},0)}Vg.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
	Vg.prototype.Fc=function(){return"json"};function Xg(a,b,c,d){ff.call(this,["auth_status"]);this.G=a;this.hf=b;this.gh=c;this.Pe=d;this.wc=new Bg(a,[bd,cd]);this.qb=null;this.We=!1;Yg(this)}ka(Xg,ff);h=Xg.prototype;h.Be=function(){return this.qb||null};function Yg(a){cd.get("redirect_request_id")&&Zg(a);var b=a.wc.get();b&&b.token?($g(a,b),a.hf(b.token,function(c,d){ah(a,c,d,!1,b.token,b)},function(b,d){bh(a,"resumeSession()",b,d)})):$g(a,null)}
	function ch(a,b,c,d,e,f){"firebaseio-demo.com"===a.G.domain&&S("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.hf(b,function(f,k){ah(a,f,k,!0,b,c,d||{},e)},function(b,c){bh(a,"auth()",b,c,f)})}function dh(a,b){a.wc.clear();$g(a,null);a.gh(function(a,d){if("ok"===a)T(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;T(b,f)}})}
	function ah(a,b,c,d,e,f,g,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=Ed(e)?e:"",c=null,b&&y(b,"uid")?c=z(b,"uid"):y(f,"uid")&&(c=z(f,"uid")),f.uid=c,c="custom",b&&y(b,"provider")?c=z(b,"provider"):y(f,"provider")&&(c=z(f,"provider")),f.provider=c,a.wc.clear(),Ed(e)&&(g=g||{},c=bd,"sessionOnly"===g.remember&&(c=cd),"none"!==g.remember&&a.wc.set(f,c)),$g(a,f)),T(k,null,f)):(a.wc.clear(),$g(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,T(k,f))}
	function bh(a,b,c,d,e){S(b+" was canceled: "+d);a.wc.clear();$g(a,null);a=Error(d);a.code=c.toUpperCase();T(e,a)}function eh(a,b,c,d,e){fh(a);c=new yg(d||{},{},c||{});gh(a,[Tg,Vg],"/auth/"+b,c,e)}
	function hh(a,b,c,d){fh(a);var e=[Sg,Ug];c=Ag(c);"anonymous"===b||"password"===b?setTimeout(function(){T(d,Rg("TRANSPORT_UNAVAILABLE"))},0):(c.he.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.he.relay_url=Mg(a.G.lc),c.he.requestWithCredential=u(a.uc,a),gh(a,e,"/auth/"+b,c,d))}
	function Zg(a){var b=cd.get("redirect_request_id");if(b){var c=cd.get("redirect_client_options");cd.remove("redirect_request_id");cd.remove("redirect_client_options");var d=[Tg,Vg],b={requestId:b,requestKey:Kg(document.location.hash)},c=new yg(c,{},b);a.We=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}gh(a,d,"/auth/session",c,function(){this.We=!1}.bind(a))}}
	h.ve=function(a,b){fh(this);var c=Ag(a);c.fb._method="POST";this.uc("/users",c,function(a,c){a?T(b,a):T(b,a,c)})};h.Xe=function(a,b){var c=this;fh(this);var d="/users/"+encodeURIComponent(a.email),e=Ag(a);e.fb._method="DELETE";this.uc(d,e,function(a,d){!a&&d&&d.uid&&c.qb&&c.qb.uid&&c.qb.uid===d.uid&&dh(c);T(b,a)})};h.se=function(a,b){fh(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=Ag(a);d.fb._method="PUT";d.fb.password=a.newPassword;this.uc(c,d,function(a){T(b,a)})};
	h.re=function(a,b){fh(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=Ag(a);d.fb._method="PUT";d.fb.email=a.newEmail;d.fb.password=a.password;this.uc(c,d,function(a){T(b,a)})};h.Ze=function(a,b){fh(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=Ag(a);d.fb._method="POST";this.uc(c,d,function(a){T(b,a)})};h.uc=function(a,b,c){ih(this,[Tg,Vg],a,b,c)};
	function gh(a,b,c,d,e){ih(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?ch(a,c.token,c,d.qd,function(a,b){a?T(e,a):T(e,null,b)}):T(e,b||Rg("UNKNOWN_ERROR"))})}
	function ih(a,b,c,d,e){b=Na(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){T(e,Rg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.he),d=Gb(d.fb),d.v="js-"+Eb,d.transport=b.Fc(),d.suppress_status_codes=!0,a=Lg()+"/"+a.G.lc+c,b.open(a,d,function(a,b){if(a)T(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;T(e,c)}else T(e,null,b)}))}
	function $g(a,b){var c=null!==a.qb||null!==b;a.qb=b;c&&a.ie("auth_status",b);a.Pe(null!==b)}h.Ee=function(a){O("auth_status"===a,'initial event must be of type "auth_status"');return this.We?null:[this.qb]};function fh(a){var b=a.G;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===xg)throw Error("This custom Firebase server ('"+a.G.domain+"') does not support delegated login.");};var gd="websocket",hd="long_polling";function jh(a){this.nc=a;this.Qd=[];this.Wb=0;this.te=-1;this.Jb=null}function kh(a,b,c){a.te=b;a.Jb=c;a.te<a.Wb&&(a.Jb(),a.Jb=null)}function lh(a,b,c){for(a.Qd[b]=c;a.Qd[a.Wb];){var d=a.Qd[a.Wb];delete a.Qd[a.Wb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;gc(function(){f.nc(d[e])})}if(a.Wb===a.te){a.Jb&&(clearTimeout(a.Jb),a.Jb(),a.Jb=null);break}a.Wb++}};function mh(a,b,c,d){this.ue=a;this.f=pd(a);this.rb=this.sb=0;this.Xa=uc(b);this.Xf=c;this.Kc=!1;this.Fb=d;this.ld=function(a){return fd(b,hd,a)}}var nh,oh;
	mh.prototype.open=function(a,b){this.mf=0;this.na=b;this.Ef=new jh(a);this.Db=!1;var c=this;this.ub=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.ub=null},Math.floor(3E4));ud(function(){if(!c.Db){c.Wa=new ph(function(a,b,d,k,m){qh(c,arguments);if(c.Wa)if(c.ub&&(clearTimeout(c.ub),c.ub=null),c.Kc=!0,"start"==a)c.id=b,c.Mf=d;else if("close"===a)b?(c.Wa.$d=!1,kh(c.Ef,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){qh(c,arguments);
	lh(c.Ef,a,b)},function(){c.bb()},c.ld);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Wa.ke&&(a.cb=c.Wa.ke);a.v="5";c.Xf&&(a.s=c.Xf);c.Fb&&(a.ls=c.Fb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.ld(a);c.f("Connecting via long-poll to "+a);rh(c.Wa,a,function(){})}})};
	mh.prototype.start=function(){var a=this.Wa,b=this.Mf;a.Fg=this.id;a.Gg=b;for(a.oe=!0;sh(a););a=this.id;b=this.Mf;this.kc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.kc.src=this.ld(c);this.kc.style.display="none";document.body.appendChild(this.kc)};
	mh.isAvailable=function(){return nh||!oh&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.ih)&&!0};h=mh.prototype;h.Hd=function(){};h.fd=function(){this.Db=!0;this.Wa&&(this.Wa.close(),this.Wa=null);this.kc&&(document.body.removeChild(this.kc),this.kc=null);this.ub&&(clearTimeout(this.ub),this.ub=null)};
	h.bb=function(){this.Db||(this.f("Longpoll is closing itself"),this.fd(),this.na&&(this.na(this.Kc),this.na=null))};h.close=function(){this.Db||(this.f("Longpoll is being closed."),this.fd())};h.send=function(a){a=G(a);this.sb+=a.length;rc(this.Xa,"bytes_sent",a.length);a=Ob(a);a=nb(a,!0);a=yd(a,1840);for(var b=0;b<a.length;b++){var c=this.Wa;c.cd.push({Xg:this.mf,fh:a.length,of:a[b]});c.oe&&sh(c);this.mf++}};function qh(a,b){var c=G(b).length;a.rb+=c;rc(a.Xa,"bytes_received",c)}
	function ph(a,b,c,d){this.ld=d;this.lb=c;this.Te=new ug;this.cd=[];this.we=Math.floor(1E8*Math.random());this.$d=!0;this.ke=id();window["pLPCommand"+this.ke]=a;window["pRTLPCB"+this.ke]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||fc("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.jb=a.contentDocument:a.contentWindow?a.jb=a.contentWindow.document:a.document&&(a.jb=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.jb.open(),this.Ga.jb.write(a),this.Ga.jb.close()}catch(f){fc("frame writing exception"),f.stack&&fc(f.stack),fc(f)}}
	ph.prototype.close=function(){this.oe=!1;if(this.Ga){this.Ga.jb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.lb;b&&(this.lb=null,b())};
	function sh(a){if(a.oe&&a.$d&&a.Te.count()<(0<a.cd.length?2:1)){a.we++;var b={};b.id=a.Fg;b.pw=a.Gg;b.ser=a.we;for(var b=a.ld(b),c="",d=0;0<a.cd.length;)if(1870>=a.cd[0].of.length+30+c.length){var e=a.cd.shift(),c=c+"&seg"+d+"="+e.Xg+"&ts"+d+"="+e.fh+"&d"+d+"="+e.of;d++}else break;th(a,b+c,a.we);return!0}return!1}function th(a,b,c){function d(){a.Te.remove(c);sh(a)}a.Te.add(c,1);var e=setTimeout(d,Math.floor(25E3));rh(a,b,function(){clearTimeout(e);d()})}
	function rh(a,b,c){setTimeout(function(){try{if(a.$d){var d=a.Ga.jb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){fc("Long-poll script failed to load: "+b);a.$d=!1;a.close()};a.Ga.jb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var uh=null;"undefined"!==typeof MozWebSocket?uh=MozWebSocket:"undefined"!==typeof WebSocket&&(uh=WebSocket);function vh(a,b,c,d){this.ue=a;this.f=pd(this.ue);this.frames=this.Nc=null;this.rb=this.sb=this.ff=0;this.Xa=uc(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.jf=fd(b,gd,a)}var wh;
	vh.prototype.open=function(a,b){this.lb=b;this.Kg=a;this.f("Websocket connecting to "+this.jf);this.Kc=!1;bd.set("previous_websocket_failure",!0);try{this.La=new uh(this.jf)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.Kc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.bb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.rb+=
	a.length,rc(e.Xa,"bytes_received",a.length),xh(e),null!==e.frames)yh(e,a);else{a:{O(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.ff=b;e.frames=[];a=null;break a}}e.ff=1;e.frames=[]}null!==a&&yh(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};vh.prototype.start=function(){};
	vh.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==uh&&!wh};vh.responsesRequiredToBeHealthy=2;vh.healthyTimeout=3E4;h=vh.prototype;h.Hd=function(){bd.remove("previous_websocket_failure")};function yh(a,b){a.frames.push(b);if(a.frames.length==a.ff){var c=a.frames.join("");a.frames=null;c=Rb(c);a.Kg(c)}}
	h.send=function(a){xh(this);a=G(a);this.sb+=a.length;rc(this.Xa,"bytes_sent",a.length);a=yd(a,16384);1<a.length&&zh(this,String(a.length));for(var b=0;b<a.length;b++)zh(this,a[b])};h.fd=function(){this.Db=!0;this.Nc&&(clearInterval(this.Nc),this.Nc=null);this.La&&(this.La.close(),this.La=null)};h.bb=function(){this.Db||(this.f("WebSocket is closing itself"),this.fd(),this.lb&&(this.lb(this.Kc),this.lb=null))};h.close=function(){this.Db||(this.f("WebSocket is being closed"),this.fd())};
	function xh(a){clearInterval(a.Nc);a.Nc=setInterval(function(){a.La&&zh(a,"0");xh(a)},Math.floor(45E3))}function zh(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(u(a.bb,a),0)}};function Ah(a){Bh(this,a)}var Ch=[mh,vh];function Bh(a,b){var c=vh&&vh.isAvailable(),d=c&&!(bd.Af||!0===bd.get("previous_websocket_failure"));b.hh&&(c||S("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.jd=[vh];else{var e=a.jd=[];zd(Ch,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function Dh(a){if(0<a.jd.length)return a.jd[0];throw Error("No transports available");};function Eh(a,b,c,d,e,f,g){this.id=a;this.f=pd("c:"+this.id+":");this.nc=c;this.Zc=d;this.na=e;this.Re=f;this.G=b;this.Pd=[];this.kf=0;this.Wf=new Ah(b);this.N=0;this.Fb=g;this.f("Connection created");Fh(this)}
	function Fh(a){var b=Dh(a.Wf);a.K=new b("c:"+a.id+":"+a.kf++,a.G,void 0,a.Fb);a.Ve=b.responsesRequiredToBeHealthy||0;var c=Gh(a,a.K),d=Hh(a,a.K);a.kd=a.K;a.ed=a.K;a.F=null;a.Eb=!1;setTimeout(function(){a.K&&a.K.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.Bd=setTimeout(function(){a.Bd=null;a.Eb||(a.K&&102400<a.K.rb?(a.f("Connection exceeded healthy timeout but has received "+a.K.rb+" bytes.  Marking connection healthy."),a.Eb=!0,a.K.Hd()):a.K&&10240<a.K.sb?a.f("Connection exceeded healthy timeout but has sent "+
	a.K.sb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function Hh(a,b){return function(c){b===a.K?(a.K=null,c||0!==a.N?1===a.N&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.G.ab.substr(0,2)&&(bd.remove("host:"+a.G.host),a.G.ab=a.G.host)),a.close()):b===a.F?(a.f("Secondary connection lost."),c=a.F,a.F=null,a.kd!==c&&a.ed!==c||a.close()):a.f("closing an old connection")}}
	function Gh(a,b){return function(c){if(2!=a.N)if(b===a.ed){var d=wd("t",c);c=wd("d",c);if("c"==d){if(d=wd("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Uf=c.s;ed(a.G,f);0==a.N&&(a.K.start(),Ih(a,a.K,d),"5"!==e&&S("Protocol version mismatch detected"),c=a.Wf,(c=1<c.jd.length?c.jd[1]:null)&&Jh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.ed=a.F;for(c=0;c<a.Pd.length;++c)a.Ld(a.Pd[c]);a.Pd=[];Kh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.Re&&(a.Re(c),a.Re=null),a.na=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),ed(a.G,c),1===a.N?a.close():(Lh(a),Fh(a))):"e"===d?qd("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Mh(a),Nh(a)):qd("Unknown control packet command: "+d)}else"d"==d&&a.Ld(c)}else if(b===a.F)if(d=wd("t",c),c=wd("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Oh(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.F.close(),a.kd!==a.F&&a.ed!==a.F||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.Tf--,Oh(a)));else if("d"==d)a.Pd.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}Eh.prototype.Ia=function(a){Ph(this,{t:"d",d:a})};function Kh(a){a.kd===a.F&&a.ed===a.F&&(a.f("cleaning up and promoting a connection: "+a.F.ue),a.K=a.F,a.F=null)}
	function Oh(a){0>=a.Tf?(a.f("Secondary connection is healthy."),a.Eb=!0,a.F.Hd(),a.F.start(),a.f("sending client ack on secondary"),a.F.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.K.send({t:"c",d:{t:"n",d:{}}}),a.kd=a.F,Kh(a)):(a.f("sending ping on secondary."),a.F.send({t:"c",d:{t:"p",d:{}}}))}Eh.prototype.Ld=function(a){Mh(this);this.nc(a)};function Mh(a){a.Eb||(a.Ve--,0>=a.Ve&&(a.f("Primary connection is healthy."),a.Eb=!0,a.K.Hd()))}
	function Jh(a,b){a.F=new b("c:"+a.id+":"+a.kf++,a.G,a.Uf);a.Tf=b.responsesRequiredToBeHealthy||0;a.F.open(Gh(a,a.F),Hh(a,a.F));setTimeout(function(){a.F&&(a.f("Timed out trying to upgrade."),a.F.close())},Math.floor(6E4))}function Ih(a,b,c){a.f("Realtime connection established.");a.K=b;a.N=1;a.Zc&&(a.Zc(c,a.Uf),a.Zc=null);0===a.Ve?(a.f("Primary connection is healthy."),a.Eb=!0):setTimeout(function(){Nh(a)},Math.floor(5E3))}
	function Nh(a){a.Eb||1!==a.N||(a.f("sending ping on primary."),Ph(a,{t:"c",d:{t:"p",d:{}}}))}function Ph(a,b){if(1!==a.N)throw"Connection is not connected";a.kd.send(b)}Eh.prototype.close=function(){2!==this.N&&(this.f("Closing realtime connection."),this.N=2,Lh(this),this.na&&(this.na(),this.na=null))};function Lh(a){a.f("Shutting down all connections");a.K&&(a.K.close(),a.K=null);a.F&&(a.F.close(),a.F=null);a.Bd&&(clearTimeout(a.Bd),a.Bd=null)};function Qh(a,b,c,d){this.id=Rh++;this.f=pd("p:"+this.id+":");this.Bf=this.Ie=!1;this.ba={};this.sa=[];this.ad=0;this.Yc=[];this.qa=!1;this.eb=1E3;this.Id=3E5;this.Kb=b;this.Xc=c;this.Se=d;this.G=a;this.wb=this.Ca=this.Ma=this.Fb=this.$e=null;this.Sb=!1;this.Wd={};this.Wg=0;this.rf=!0;this.Oc=this.Ke=null;Sh(this,0);kf.yb().Ib("visible",this.Ng,this);-1===a.host.indexOf("fblocal")&&jf.yb().Ib("online",this.Lg,this)}var Rh=0,Th=0;h=Qh.prototype;
	h.Ia=function(a,b,c){var d=++this.Wg;a={r:d,a:a,b:b};this.f(G(a));O(this.qa,"sendRequest call when we're not connected not allowed.");this.Ma.Ia(a);c&&(this.Wd[d]=c)};h.Cf=function(a,b,c,d){var e=a.wa(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.ba[f]=this.ba[f]||{};O(Ie(a.n)||!He(a.n),"listen() called for non-default but complete query");O(!this.ba[f][e],"listen() called twice for same path/queryId.");a={I:d,Ad:b,Tg:a,tag:c};this.ba[f][e]=a;this.qa&&Uh(this,a)};
	function Uh(a,b){var c=b.Tg,d=c.path.toString(),e=c.wa();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Ge(c.n),f.t=b.tag);f.h=b.Ad();a.Ia("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&y(k,"w")){var l=z(k,"w");da(l)&&0<=La(l,"no_index")&&S("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.ba[d]&&a.ba[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Vh(a,d,e),b.I&&
	b.I(m,k))})}h.O=function(a,b,c){this.Ca={rg:a,sf:!1,Dc:b,od:c};this.f("Authenticating using credential: "+a);Wh(this);(b=40==a.length)||(a=Cd(a).Ec,b="object"===typeof a&&!0===z(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Id=3E4)};h.je=function(a){delete this.Ca;this.qa&&this.Ia("unauth",{},function(b){a(b.s,b.d)})};
	function Wh(a){var b=a.Ca;a.qa&&b&&a.Ia("auth",{cred:b.rg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Ca===b&&delete a.Ca;b.sf?"ok"!==d&&b.od&&b.od(d,c):(b.sf=!0,b.Dc&&b.Dc(d,c))})}h.$f=function(a,b){var c=a.path.toString(),d=a.wa();this.f("Unlisten called for "+c+" "+d);O(Ie(a.n)||!He(a.n),"unlisten() called for non-default but complete query");if(Vh(this,c,d)&&this.qa){var e=Ge(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Ia("n",c)}};
	h.Qe=function(a,b,c){this.qa?Xh(this,"o",a,b,c):this.Yc.push({bd:a,action:"o",data:b,I:c})};h.Gf=function(a,b,c){this.qa?Xh(this,"om",a,b,c):this.Yc.push({bd:a,action:"om",data:b,I:c})};h.Md=function(a,b){this.qa?Xh(this,"oc",a,null,b):this.Yc.push({bd:a,action:"oc",data:null,I:b})};function Xh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Ia(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.put=function(a,b,c,d){Yh(this,"p",a,b,c,d)};
	h.Df=function(a,b,c,d){Yh(this,"m",a,b,c,d)};function Yh(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.sa.push({action:b,Pf:d,I:e});a.ad++;b=a.sa.length-1;a.qa?Zh(a,b):a.f("Buffering put: "+c)}function Zh(a,b){var c=a.sa[b].action,d=a.sa[b].Pf,e=a.sa[b].I;a.sa[b].Ug=a.qa;a.Ia(c,d,function(d){a.f(c+" response",d);delete a.sa[b];a.ad--;0===a.ad&&(a.sa=[]);e&&e(d.s,d.d)})}
	h.Ye=function(a){this.qa&&(a={c:a},this.f("reportStats",a),this.Ia("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	h.Ld=function(a){if("r"in a){this.f("from server: "+G(a));var b=a.r,c=this.Wd[b];c&&(delete this.Wd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Kb(c.p,c.d,!1,c.t):"m"===b?this.Kb(c.p,c.d,!0,c.t):"c"===b?$h(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Ca,delete this.Ca,c&&c.od&&c.od(a,b)):"sd"===b?this.$e?this.$e(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
	"\nFIREBASE: ")):qd("Unrecognized action received from server: "+G(b)+"\nAre you using the latest client?"))}};h.Zc=function(a,b){this.f("connection ready");this.qa=!0;this.Oc=(new Date).getTime();this.Se({serverTimeOffset:a-(new Date).getTime()});this.Fb=b;if(this.rf){var c={};c["sdk.js."+Eb.replace(/\./g,"-")]=1;Dg()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.Ye(c)}ai(this);this.rf=!1;this.Xc(!0)};
	function Sh(a,b){O(!a.Ma,"Scheduling a connect when we're already connected/ing?");a.wb&&clearTimeout(a.wb);a.wb=setTimeout(function(){a.wb=null;bi(a)},Math.floor(b))}h.Ng=function(a){a&&!this.Sb&&this.eb===this.Id&&(this.f("Window became visible.  Reducing delay."),this.eb=1E3,this.Ma||Sh(this,0));this.Sb=a};h.Lg=function(a){a?(this.f("Browser went online."),this.eb=1E3,this.Ma||Sh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ma&&this.Ma.close())};
	h.If=function(){this.f("data client disconnected");this.qa=!1;this.Ma=null;for(var a=0;a<this.sa.length;a++){var b=this.sa[a];b&&"h"in b.Pf&&b.Ug&&(b.I&&b.I("disconnect"),delete this.sa[a],this.ad--)}0===this.ad&&(this.sa=[]);this.Wd={};ci(this)&&(this.Sb?this.Oc&&(3E4<(new Date).getTime()-this.Oc&&(this.eb=1E3),this.Oc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.eb=this.Id,this.Ke=(new Date).getTime()),a=Math.max(0,this.eb-((new Date).getTime()-this.Ke)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),Sh(this,a),this.eb=Math.min(this.Id,1.3*this.eb));this.Xc(!1)};function bi(a){if(ci(a)){a.f("Making a connection attempt");a.Ke=(new Date).getTime();a.Oc=null;var b=u(a.Ld,a),c=u(a.Zc,a),d=u(a.If,a),e=a.id+":"+Th++;a.Ma=new Eh(e,a.G,b,c,d,function(b){S(b+" ("+a.G.toString()+")");a.Bf=!0},a.Fb)}}h.Cb=function(){this.Ie=!0;this.Ma?this.Ma.close():(this.wb&&(clearTimeout(this.wb),this.wb=null),this.qa&&this.If())};h.vc=function(){this.Ie=!1;this.eb=1E3;this.Ma||Sh(this,0)};
	function $h(a,b,c){c=c?Oa(c,function(a){return xd(a)}).join("$"):"default";(a=Vh(a,b,c))&&a.I&&a.I("permission_denied")}function Vh(a,b,c){b=(new P(b)).toString();var d;p(a.ba[b])?(d=a.ba[b][c],delete a.ba[b][c],0===oa(a.ba[b])&&delete a.ba[b]):d=void 0;return d}function ai(a){Wh(a);v(a.ba,function(b){v(b,function(b){Uh(a,b)})});for(var b=0;b<a.sa.length;b++)a.sa[b]&&Zh(a,b);for(;a.Yc.length;)b=a.Yc.shift(),Xh(a,b.action,b.bd,b.data,b.I)}function ci(a){var b;b=jf.yb().oc;return!a.Bf&&!a.Ie&&b};var U={zg:function(){nh=wh=!0}};U.forceLongPolling=U.zg;U.Ag=function(){oh=!0};U.forceWebSockets=U.Ag;U.$g=function(a,b){a.k.Va.$e=b};U.setSecurityDebugCallback=U.$g;U.bf=function(a,b){a.k.bf(b)};U.stats=U.bf;U.cf=function(a,b){a.k.cf(b)};U.statsIncrementCounter=U.cf;U.ud=function(a){return a.k.ud};U.dataUpdateCount=U.ud;U.Dg=function(a,b){a.k.He=b};U.interceptServerData=U.Dg;U.Jg=function(a){new Ng(a)};U.onPopupOpen=U.Jg;U.Yg=function(a){xg=a};U.setAuthenticationServer=U.Yg;function di(a,b){this.committed=a;this.snapshot=b};function V(a,b){this.dd=a;this.ta=b}V.prototype.cancel=function(a){D("Firebase.onDisconnect().cancel",0,1,arguments.length);F("Firebase.onDisconnect().cancel",1,a,!0);var b=new B;this.dd.Md(this.ta,C(b,a));return b.D};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){D("Firebase.onDisconnect().remove",0,1,arguments.length);og("Firebase.onDisconnect().remove",this.ta);F("Firebase.onDisconnect().remove",1,a,!0);var b=new B;ei(this.dd,this.ta,null,C(b,a));return b.D};
	V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){D("Firebase.onDisconnect().set",1,2,arguments.length);og("Firebase.onDisconnect().set",this.ta);gg("Firebase.onDisconnect().set",a,this.ta,!1);F("Firebase.onDisconnect().set",2,b,!0);var c=new B;ei(this.dd,this.ta,a,C(c,b));return c.D};V.prototype.set=V.prototype.set;
	V.prototype.Ob=function(a,b,c){D("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);og("Firebase.onDisconnect().setWithPriority",this.ta);gg("Firebase.onDisconnect().setWithPriority",a,this.ta,!1);kg("Firebase.onDisconnect().setWithPriority",2,b);F("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new B;fi(this.dd,this.ta,a,b,C(d,c));return d.D};V.prototype.setWithPriority=V.prototype.Ob;
	V.prototype.update=function(a,b){D("Firebase.onDisconnect().update",1,2,arguments.length);og("Firebase.onDisconnect().update",this.ta);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;S("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}jg("Firebase.onDisconnect().update",a,this.ta);F("Firebase.onDisconnect().update",2,b,!0);
	c=new B;gi(this.dd,this.ta,a,C(c,b));return c.D};V.prototype.update=V.prototype.update;function W(a,b,c){this.A=a;this.Y=b;this.g=c}W.prototype.J=function(){D("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.J()};W.prototype.val=W.prototype.J;W.prototype.qf=function(){D("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.J(!0)};W.prototype.exportVal=W.prototype.qf;W.prototype.xg=function(){D("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.xg;
	W.prototype.o=function(a){D("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));ng("Firebase.DataSnapshot.child",a);var b=new P(a),c=this.Y.o(b);return new W(this.A.S(b),c,R)};W.prototype.child=W.prototype.o;W.prototype.Fa=function(a){D("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ng("Firebase.DataSnapshot.hasChild",a);var b=new P(a);return!this.A.S(b).e()};W.prototype.hasChild=W.prototype.Fa;
	W.prototype.C=function(){D("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().J()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){D("Firebase.DataSnapshot.forEach",1,1,arguments.length);F("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.L())return!1;var b=this;return!!this.A.R(this.g,function(c,d){return a(new W(d,b.Y.o(c),R))})};W.prototype.forEach=W.prototype.forEach;
	W.prototype.zd=function(){D("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.L()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.zd;W.prototype.name=function(){S("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");D("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};W.prototype.name=W.prototype.name;W.prototype.key=function(){D("Firebase.DataSnapshot.key",0,0,arguments.length);return this.Y.key()};
	W.prototype.key=W.prototype.key;W.prototype.Hb=function(){D("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Hb()};W.prototype.numChildren=W.prototype.Hb;W.prototype.Mb=function(){D("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.Y};W.prototype.ref=W.prototype.Mb;function hi(a,b,c){this.Vb=a;this.tb=b;this.vb=c||null}h=hi.prototype;h.Qf=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.n.g;return new jc("value",this,new W(a.Na,b.Mb(),c))};h.Zb=function(a){var b=this.vb;if("cancel"===a.De()){O(this.tb,"Raising a cancel event on a listener with no cancel callback");var c=this.tb;return function(){c.call(b,a.error)}}var d=this.Vb;return function(){d.call(b,a.be)}};h.lf=function(a,b){return this.tb?new kc(this,a,b):null};
	h.matches=function(a){return a instanceof hi?a.Vb&&this.Vb?a.Vb===this.Vb&&a.vb===this.vb:!0:!1};h.yf=function(){return null!==this.Vb};function ii(a,b,c){this.ja=a;this.tb=b;this.vb=c}h=ii.prototype;h.Qf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ja};h.lf=function(a,b){return this.tb?new kc(this,a,b):null};
	h.createEvent=function(a,b){O(null!=a.Za,"Child events should have a childName.");var c=b.Mb().o(a.Za);return new jc(a.type,this,new W(a.Na,c,b.n.g),a.Td)};h.Zb=function(a){var b=this.vb;if("cancel"===a.De()){O(this.tb,"Raising a cancel event on a listener with no cancel callback");var c=this.tb;return function(){c.call(b,a.error)}}var d=this.ja[a.wd];return function(){d.call(b,a.be,a.Td)}};
	h.matches=function(a){if(a instanceof ii){if(!this.ja||!a.ja)return!0;if(this.vb===a.vb){var b=oa(a.ja);if(b===oa(this.ja)){if(1===b){var b=pa(a.ja),c=pa(this.ja);return c===b&&(!a.ja[b]||!this.ja[c]||a.ja[b]===this.ja[c])}return na(this.ja,function(b,c){return a.ja[c]===b})}}}return!1};h.yf=function(){return null!==this.ja};function ji(){this.za={}}h=ji.prototype;h.e=function(){return va(this.za)};h.gb=function(a,b,c){var d=a.source.Lb;if(null!==d)return d=z(this.za,d),O(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];v(this.za,function(d){e=e.concat(d.gb(a,b,c))});return e};h.Tb=function(a,b,c,d,e){var f=a.wa(),g=z(this.za,f);if(!g){var g=c.Aa(e?d:null),k=!1;g?k=!0:(g=d instanceof fe?c.Cc(d):H,k=!1);g=new Ye(a,new je(new Xb(g,k,!1),new Xb(d,e,!1)));this.za[f]=g}g.Tb(b);return af(g,b)};
	h.nb=function(a,b,c){var d=a.wa(),e=[],f=[],g=null!=ki(this);if("default"===d){var k=this;v(this.za,function(a,d){f=f.concat(a.nb(b,c));a.e()&&(delete k.za[d],He(a.Y.n)||e.push(a.Y))})}else{var m=z(this.za,d);m&&(f=f.concat(m.nb(b,c)),m.e()&&(delete this.za[d],He(m.Y.n)||e.push(m.Y)))}g&&null==ki(this)&&e.push(new X(a.k,a.path));return{Vg:e,vg:f}};function li(a){return Na(qa(a.za),function(a){return!He(a.Y.n)})}h.kb=function(a){var b=null;v(this.za,function(c){b=b||c.kb(a)});return b};
	function mi(a,b){if(He(b.n))return ki(a);var c=b.wa();return z(a.za,c)}function ki(a){return ua(a.za,function(a){return He(a.Y.n)})||null};function ni(a){this.va=qe;this.mb=new Pf;this.df={};this.qc={};this.Qc=a}function oi(a,b,c,d,e){var f=a.mb,g=e;O(d>f.Pc,"Stacking an older write on top of newer ones");p(g)||(g=!0);f.pa.push({path:b,Ja:c,md:d,visible:g});g&&(f.V=Jf(f.V,b,c));f.Pc=d;return e?pi(a,new Ac(Ef,b,c)):[]}function qi(a,b,c,d){var e=a.mb;O(d>e.Pc,"Stacking an older merge on top of newer ones");e.pa.push({path:b,children:c,md:d,visible:!0});e.V=Kf(e.V,b,c);e.Pc=d;c=sf(c);return pi(a,new bf(Ef,b,c))}
	function ri(a,b,c){c=c||!1;var d=Qf(a.mb,b);if(a.mb.Ud(b)){var e=qe;null!=d.Ja?e=e.set(M,!0):Fb(d.children,function(a,b){e=e.set(new P(a),b)});return pi(a,new Df(d.path,e,c))}return[]}function si(a,b,c){c=sf(c);return pi(a,new bf(Gf,b,c))}function ti(a,b,c,d){d=ui(a,d);if(null!=d){var e=vi(d);d=e.path;e=e.Lb;b=lf(d,b);c=new Ac(new Ff(!1,!0,e,!0),b,c);return wi(a,d,c)}return[]}
	function xi(a,b,c,d){if(d=ui(a,d)){var e=vi(d);d=e.path;e=e.Lb;b=lf(d,b);c=sf(c);c=new bf(new Ff(!1,!0,e,!0),b,c);return wi(a,d,c)}return[]}
	ni.prototype.Tb=function(a,b){var c=a.path,d=null,e=!1;zf(this.va,c,function(a,b){var f=lf(a,c);d=d||b.kb(f);e=e||null!=ki(b)});var f=this.va.get(c);f?(e=e||null!=ki(f),d=d||f.kb(M)):(f=new ji,this.va=this.va.set(c,f));var g;null!=d?g=!0:(g=!1,d=H,Cf(this.va.subtree(c),function(a,b){var c=b.kb(M);c&&(d=d.W(a,c))}));var k=null!=mi(f,a);if(!k&&!He(a.n)){var m=yi(a);O(!(m in this.qc),"View does not exist, but we have a tag");var l=zi++;this.qc[m]=l;this.df["_"+l]=m}g=f.Tb(a,b,new Uf(c,this.mb),d,g);
	k||e||(f=mi(f,a),g=g.concat(Ai(this,a,f)));return g};
	ni.prototype.nb=function(a,b,c){var d=a.path,e=this.va.get(d),f=[];if(e&&("default"===a.wa()||null!=mi(e,a))){f=e.nb(a,b,c);e.e()&&(this.va=this.va.remove(d));e=f.Vg;f=f.vg;b=-1!==Sa(e,function(a){return He(a.n)});var g=xf(this.va,d,function(a,b){return null!=ki(b)});if(b&&!g&&(d=this.va.subtree(d),!d.e()))for(var d=Bi(d),k=0;k<d.length;++k){var m=d[k],l=m.Y,m=Ci(this,m);this.Qc.af(Di(l),Ei(this,l),m.Ad,m.I)}if(!g&&0<e.length&&!c)if(b)this.Qc.de(Di(a),null);else{var t=this;Ma(e,function(a){a.wa();
	var b=t.qc[yi(a)];t.Qc.de(Di(a),b)})}Fi(this,e)}return f};ni.prototype.Aa=function(a,b){var c=this.mb,d=xf(this.va,a,function(b,c){var d=lf(b,a);if(d=c.kb(d))return d});return c.Aa(a,d,b,!0)};function Bi(a){return vf(a,function(a,c,d){if(c&&null!=ki(c))return[ki(c)];var e=[];c&&(e=li(c));v(d,function(a){e=e.concat(a)});return e})}function Fi(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!He(d.n)){var d=yi(d),e=a.qc[d];delete a.qc[d];delete a.df["_"+e]}}}
	function Di(a){return He(a.n)&&!Ie(a.n)?a.Mb():a}function Ai(a,b,c){var d=b.path,e=Ei(a,b);c=Ci(a,c);b=a.Qc.af(Di(b),e,c.Ad,c.I);d=a.va.subtree(d);if(e)O(null==ki(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=vf(d,function(a,b,c){if(!a.e()&&b&&null!=ki(b))return[Ze(ki(b))];var d=[];b&&(d=d.concat(Oa(li(b),function(a){return a.Y})));v(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Qc.de(Di(c),Ei(a,c));return b}
	function Ci(a,b){var c=b.Y,d=Ei(a,c);return{Ad:function(){return(b.w()||H).hash()},I:function(b){if("ok"===b){if(d){var f=c.path;if(b=ui(a,d)){var g=vi(b);b=g.path;g=g.Lb;f=lf(b,f);f=new Cc(new Ff(!1,!0,g,!0),f);b=wi(a,b,f)}else b=[]}else b=pi(a,new Cc(Gf,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.nb(c,null,f)}}}function yi(a){return a.path.toString()+"$"+a.wa()}function vi(a){var b=a.indexOf("$");O(-1!==b&&b<a.length-1,"Bad queryKey.");return{Lb:a.substr(b+1),path:new P(a.substr(0,b))}}function ui(a,b){var c=a.df,d="_"+b;return d in c?c[d]:void 0}function Ei(a,b){var c=yi(b);return z(a.qc,c)}var zi=1;
	function wi(a,b,c){var d=a.va.get(b);O(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new Uf(b,a.mb),null)}function pi(a,b){return Gi(a,b,a.va,null,new Uf(M,a.mb))}function Gi(a,b,c,d,e){if(b.path.e())return Hi(a,b,c,d,e);var f=c.get(M);null==d&&null!=f&&(d=f.kb(M));var g=[],k=K(b.path),m=b.$c(k);if((c=c.children.get(k))&&m)var l=d?d.T(k):null,k=e.o(k),g=g.concat(Gi(a,m,c,l,k));f&&(g=g.concat(f.gb(b,e,d)));return g}
	function Hi(a,b,c,d,e){var f=c.get(M);null==d&&null!=f&&(d=f.kb(M));var g=[];c.children.ka(function(c,f){var l=d?d.T(c):null,t=e.o(c),A=b.$c(c);A&&(g=g.concat(Hi(a,A,f,l,t)))});f&&(g=g.concat(f.gb(b,e,d)));return g};function Ii(a,b){this.G=a;this.Xa=uc(a);this.hd=null;this.fa=new Zb;this.Kd=1;this.Va=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.da=new cf(this.G,u(this.Kb,this)),setTimeout(u(this.Xc,this,!0),0)):this.da=this.Va=new Qh(this.G,u(this.Kb,this),u(this.Xc,this),u(this.Se,this));this.dh=vc(a,u(function(){return new pc(this.Xa,this.da)},this));this.yc=new Wf;
	this.Ge=new Sb;var c=this;this.Fd=new ni({af:function(a,b,f,g){b=[];f=c.Ge.j(a.path);f.e()||(b=pi(c.Fd,new Ac(Gf,a.path,f)),setTimeout(function(){g("ok")},0));return b},de:aa});Ji(this,"connected",!1);this.na=new Vc;this.O=new Xg(a,u(this.da.O,this.da),u(this.da.je,this.da),u(this.Pe,this));this.ud=0;this.He=null;this.M=new ni({af:function(a,b,f,g){c.da.Cf(a,f,b,function(b,e){var f=g(b,e);dc(c.fa,a.path,f)});return[]},de:function(a,b){c.da.$f(a,b)}})}h=Ii.prototype;
	h.toString=function(){return(this.G.ob?"https://":"http://")+this.G.host};h.name=function(){return this.G.lc};function Ki(a){a=a.Ge.j(new P(".info/serverTimeOffset")).J()||0;return(new Date).getTime()+a}function Li(a){a=a={timestamp:Ki(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	h.Kb=function(a,b,c,d){this.ud++;var e=new P(a);b=this.He?this.He(a,b):b;a=[];d?c?(b=ma(b,function(a){return Q(a)}),a=xi(this.M,e,b,d)):(b=Q(b),a=ti(this.M,e,b,d)):c?(d=ma(b,function(a){return Q(a)}),a=si(this.M,e,d)):(d=Q(b),a=pi(this.M,new Ac(Gf,e,d)));d=e;0<a.length&&(d=Mi(this,e));dc(this.fa,d,a)};h.Xc=function(a){Ji(this,"connected",a);!1===a&&Ni(this)};h.Se=function(a){var b=this;zd(a,function(a,d){Ji(b,d,a)})};h.Pe=function(a){Ji(this,"authenticated",a)};
	function Ji(a,b,c){b=new P("/.info/"+b);c=Q(c);var d=a.Ge;d.Zd=d.Zd.H(b,c);c=pi(a.Fd,new Ac(Gf,b,c));dc(a.fa,b,c)}h.Ob=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,lh:c});var e=Li(this);b=Q(b,c);var e=Xc(b,e),f=this.Kd++,e=oi(this.M,a,e,f,!0);$b(this.fa,e);var g=this;this.da.put(a.toString(),b.J(!0),function(b,c){var e="ok"===b;e||S("set at "+a+" failed: "+b);e=ri(g.M,f,!e);dc(g.fa,a,e);Oi(d,b,c)});e=Pi(this,a);Mi(this,e);dc(this.fa,e,[])};
	h.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Li(this),f={};v(b,function(a,b){d=!1;var c=Q(a);f[b]=Xc(c,e)});if(d)fc("update() called with empty data.  Don't do anything."),Oi(c,"ok");else{var g=this.Kd++,k=qi(this.M,a,f,g);$b(this.fa,k);var m=this;this.da.Df(a.toString(),b,function(b,d){var e="ok"===b;e||S("update at "+a+" failed: "+b);var e=ri(m.M,g,!e),f=a;0<e.length&&(f=Mi(m,a));dc(m.fa,f,e);Oi(c,b,d)});b=Pi(this,a);Mi(this,b);dc(this.fa,a,[])}};
	function Ni(a){a.f("onDisconnectEvents");var b=Li(a),c=[];Wc(Uc(a.na,b),M,function(b,e){c=c.concat(pi(a.M,new Ac(Gf,b,e)));var f=Pi(a,b);Mi(a,f)});a.na=new Vc;dc(a.fa,M,c)}h.Md=function(a,b){var c=this;this.da.Md(a.toString(),function(d,e){"ok"===d&&wg(c.na,a);Oi(b,d,e)})};function ei(a,b,c,d){var e=Q(c);a.da.Qe(b.toString(),e.J(!0),function(c,g){"ok"===c&&a.na.rc(b,e);Oi(d,c,g)})}function fi(a,b,c,d,e){var f=Q(c,d);a.da.Qe(b.toString(),f.J(!0),function(c,d){"ok"===c&&a.na.rc(b,f);Oi(e,c,d)})}
	function gi(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(fc("onDisconnect().update() called with empty data.  Don't do anything."),Oi(d,"ok")):a.da.Gf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=Q(c[m]);a.na.rc(b.o(m),l)}Oi(d,e,f)})}function Qi(a,b,c){c=".info"===K(b.path)?a.Fd.Tb(b,c):a.M.Tb(b,c);bc(a.fa,b.path,c)}h.Cb=function(){this.Va&&this.Va.Cb()};h.vc=function(){this.Va&&this.Va.vc()};
	h.bf=function(a){if("undefined"!==typeof console){a?(this.hd||(this.hd=new oc(this.Xa)),a=this.hd.get()):a=this.Xa.get();var b=Pa(ra(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.cf=function(a){rc(this.Xa,a);this.dh.Vf[a]=!0};h.f=function(a){var b="";this.Va&&(b=this.Va.id+":");fc(b,arguments)};
	function Oi(a,b,c){a&&gc(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Ri(a,b,c,d,e){function f(){}a.f("transaction on "+b);var g=new X(a,b);g.Ib("value",f);c={path:b,update:c,I:d,status:null,Lf:id(),gf:e,Sf:0,le:function(){g.mc("value",f)},ne:null,Da:null,rd:null,sd:null,td:null};d=a.M.Aa(b,void 0)||H;c.rd=d;d=c.update(d.J());if(p(d)){hg("transaction failed: Data returned ",d,c.path);c.status=1;e=Xf(a.yc,b);var k=e.Ea()||[];k.push(c);Yf(e,k);"object"===typeof d&&null!==d&&y(d,".priority")?(k=z(d,".priority"),O(fg(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.M.Aa(b)||H).C().J();e=Li(a);d=Q(d,k);e=Xc(d,e);c.sd=d;c.td=e;c.Da=a.Kd++;c=oi(a.M,b,e,c.Da,c.gf);dc(a.fa,b,c);Si(a)}else c.le(),c.sd=null,c.td=null,c.I&&(a=new W(c.rd,new X(a,c.path),R),c.I(null,!1,a))}function Si(a,b){var c=b||a.yc;b||Ti(a,c);if(null!==c.Ea()){var d=Ui(a,c);O(0<d.length,"Sending zero length transaction queue");Qa(d,function(a){return 1===a.status})&&Vi(a,c.path(),d)}else c.zd()&&c.R(function(b){Si(a,b)})}
	function Vi(a,b,c){for(var d=Oa(c,function(a){return a.Da}),e=a.M.Aa(b,d)||H,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];O(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.Sf++;var k=lf(b,g.path),d=d.H(k,g.sd)}d=d.J(!0);a.da.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(ri(a.M,c[f].Da));if(c[f].I){var g=c[f].td,k=new X(a,c[f].path);d.push(u(c[f].I,
	null,null,!0,new W(g,k,R)))}c[f].le()}Ti(a,Xf(a.yc,b));Si(a);dc(a.fa,b,e);for(f=0;f<d.length;f++)gc(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(S("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].ne=d;Mi(a,b)}},e)}function Mi(a,b){var c=Wi(a,b),d=c.path(),c=Ui(a,c);Xi(a,c,d);return d}
	function Xi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Oa(b,function(a){return a.Da}),g=0;g<b.length;g++){var k=b[g],m=lf(c,k.path),l=!1,t;O(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,t=k.ne,e=e.concat(ri(a.M,k.Da,!0));else if(1===k.status)if(25<=k.Sf)l=!0,t="maxretry",e=e.concat(ri(a.M,k.Da,!0));else{var A=a.M.Aa(k.path,f)||H;k.rd=A;var I=b[g].update(A.J());p(I)?(hg("transaction failed: Data returned ",I,k.path),m=Q(I),"object"===typeof I&&null!=
	I&&y(I,".priority")||(m=m.ia(A.C())),A=k.Da,I=Li(a),I=Xc(m,I),k.sd=m,k.td=I,k.Da=a.Kd++,Ta(f,A),e=e.concat(oi(a.M,k.path,I,k.Da,k.gf)),e=e.concat(ri(a.M,A,!0))):(l=!0,t="nodata",e=e.concat(ri(a.M,k.Da,!0)))}dc(a.fa,c,e);e=[];l&&(b[g].status=3,setTimeout(b[g].le,Math.floor(0)),b[g].I&&("nodata"===t?(k=new X(a,b[g].path),d.push(u(b[g].I,null,null,!1,new W(b[g].rd,k,R)))):d.push(u(b[g].I,null,Error(t),!1,null))))}Ti(a,a.yc);for(g=0;g<d.length;g++)gc(d[g]);Si(a)}}
	function Wi(a,b){for(var c,d=a.yc;null!==(c=K(b))&&null===d.Ea();)d=Xf(d,c),b=N(b);return d}function Ui(a,b){var c=[];Yi(a,b,c);c.sort(function(a,b){return a.Lf-b.Lf});return c}function Yi(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.R(function(b){Yi(a,b,c)})}function Ti(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Yf(b,0<c.length?c:null)}b.R(function(b){Ti(a,b)})}
	function Pi(a,b){var c=Wi(a,b).path(),d=Xf(a.yc,b);ag(d,function(b){Zi(a,b)});Zi(a,d);$f(d,function(b){Zi(a,b)});return c}
	function Zi(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)4!==c[g].status&&(2===c[g].status?(O(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].ne="set"):(O(1===c[g].status,"Unexpected transaction status in abort"),c[g].le(),e=e.concat(ri(a.M,c[g].Da,!0)),c[g].I&&d.push(u(c[g].I,null,Error("set"),!1,null))));-1===f?Yf(b,null):c.length=f+1;dc(a.fa,b.path(),e);for(g=0;g<d.length;g++)gc(d[g])}};function $i(){this.sc={};this.ag=!1}$i.prototype.Cb=function(){for(var a in this.sc)this.sc[a].Cb()};$i.prototype.vc=function(){for(var a in this.sc)this.sc[a].vc()};$i.prototype.ze=function(){this.ag=!0};ba($i);$i.prototype.interrupt=$i.prototype.Cb;$i.prototype.resume=$i.prototype.vc;function Y(a,b,c,d){this.k=a;this.path=b;this.n=c;this.pc=d}
	function aj(a){var b=null,c=null;a.oa&&(b=Od(a));a.ra&&(c=Rd(a));if(a.g===re){if(a.oa){if("[MIN_NAME]"!=Nd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.ra){if("[MAX_NAME]"!=Pd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===R){if(null!=b&&!fg(b)||null!=c&&!fg(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(O(a.g instanceof ve||a.g===Be,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function bj(a){if(a.oa&&a.ra&&a.la&&(!a.la||""===a.Rb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function cj(a,b){if(!0===a.pc)throw Error(b+": You can't combine multiple orderBy calls.");}h=Y.prototype;h.Mb=function(){D("Query.ref",0,0,arguments.length);return new X(this.k,this.path)};
	h.Ib=function(a,b,c,d){D("Query.on",2,4,arguments.length);lg("Query.on",a,!1);F("Query.on",2,b,!1);var e=dj("Query.on",c,d);if("value"===a)Qi(this.k,this,new hi(b,e.cancel||null,e.Qa||null));else{var f={};f[a]=b;Qi(this.k,this,new ii(f,e.cancel,e.Qa))}return b};
	h.mc=function(a,b,c){D("Query.off",0,3,arguments.length);lg("Query.off",a,!0);F("Query.off",2,b,!0);Qb("Query.off",3,c);var d=null,e=null;"value"===a?d=new hi(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new ii(e,null,c||null));e=this.k;d=".info"===K(this.path)?e.Fd.nb(this,d):e.M.nb(this,d);bc(e.fa,this.path,d)};
	h.Og=function(a,b){function c(k){f&&(f=!1,e.mc(a,c),b&&b.call(d.Qa,k),g.resolve(k))}D("Query.once",1,4,arguments.length);lg("Query.once",a,!1);F("Query.once",2,b,!0);var d=dj("Query.once",arguments[2],arguments[3]),e=this,f=!0,g=new B;Nb(g.D);this.Ib(a,c,function(b){e.mc(a,c);d.cancel&&d.cancel.call(d.Qa,b);g.reject(b)});return g.D};
	h.Le=function(a){S("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");D("Query.limit",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.n.Le(a);bj(b);return new Y(this.k,this.path,b,this.pc)};
	h.Me=function(a){D("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Me(a),this.pc)};
	h.Ne=function(a){D("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Ne(a),this.pc)};
	h.Pg=function(a){D("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ng("Query.orderByChild",a);cj(this,"Query.orderByChild");var b=new P(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new ve(b);b=Fe(this.n,b);aj(b);return new Y(this.k,this.path,b,!0)};h.Qg=function(){D("Query.orderByKey",0,0,arguments.length);cj(this,"Query.orderByKey");var a=Fe(this.n,re);aj(a);return new Y(this.k,this.path,a,!0)};h.Rg=function(){D("Query.orderByPriority",0,0,arguments.length);cj(this,"Query.orderByPriority");var a=Fe(this.n,R);aj(a);return new Y(this.k,this.path,a,!0)};
	h.Sg=function(){D("Query.orderByValue",0,0,arguments.length);cj(this,"Query.orderByValue");var a=Fe(this.n,Be);aj(a);return new Y(this.k,this.path,a,!0)};h.ce=function(a,b){D("Query.startAt",0,2,arguments.length);gg("Query.startAt",a,this.path,!0);mg("Query.startAt",b);var c=this.n.ce(a,b);bj(c);aj(c);if(this.n.oa)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new Y(this.k,this.path,c,this.pc)};
	h.vd=function(a,b){D("Query.endAt",0,2,arguments.length);gg("Query.endAt",a,this.path,!0);mg("Query.endAt",b);var c=this.n.vd(a,b);bj(c);aj(c);if(this.n.ra)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.pc)};
	h.tg=function(a,b){D("Query.equalTo",1,2,arguments.length);gg("Query.equalTo",a,this.path,!1);mg("Query.equalTo",b);if(this.n.oa)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.ra)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.ce(a,b).vd(a,b)};
	h.toString=function(){D("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.aa;c<a.u.length;c++)""!==a.u[c]&&(b+="/"+encodeURIComponent(String(a.u[c])));return this.k.toString()+(b||"/")};h.wa=function(){var a=xd(Ge(this.n));return"{}"===a?"default":a};
	function dj(a,b,c){var d={cancel:null,Qa:null};if(b&&c)d.cancel=b,F(a,3,d.cancel,!0),d.Qa=c,Qb(a,4,d.Qa);else if(b)if("object"===typeof b&&null!==b)d.Qa=b;else if("function"===typeof b)d.cancel=b;else throw Error(E(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.Mb;Y.prototype.on=Y.prototype.Ib;Y.prototype.off=Y.prototype.mc;Y.prototype.once=Y.prototype.Og;Y.prototype.limit=Y.prototype.Le;Y.prototype.limitToFirst=Y.prototype.Me;
	Y.prototype.limitToLast=Y.prototype.Ne;Y.prototype.orderByChild=Y.prototype.Pg;Y.prototype.orderByKey=Y.prototype.Qg;Y.prototype.orderByPriority=Y.prototype.Rg;Y.prototype.orderByValue=Y.prototype.Sg;Y.prototype.startAt=Y.prototype.ce;Y.prototype.endAt=Y.prototype.vd;Y.prototype.equalTo=Y.prototype.tg;Y.prototype.toString=Y.prototype.toString;var Z={};Z.zc=Qh;Z.DataConnection=Z.zc;Qh.prototype.bh=function(a,b){this.Ia("q",{p:a},b)};Z.zc.prototype.simpleListen=Z.zc.prototype.bh;Qh.prototype.sg=function(a,b){this.Ia("echo",{d:a},b)};Z.zc.prototype.echo=Z.zc.prototype.sg;Qh.prototype.interrupt=Qh.prototype.Cb;Z.dg=Eh;Z.RealTimeConnection=Z.dg;Eh.prototype.sendRequest=Eh.prototype.Ia;Eh.prototype.close=Eh.prototype.close;
	Z.Cg=function(a){var b=Qh.prototype.put;Qh.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Qh.prototype.put=b}};Z.hijackHash=Z.Cg;Z.cg=dd;Z.ConnectionTarget=Z.cg;Z.wa=function(a){return a.wa()};Z.queryIdentifier=Z.wa;Z.Eg=function(a){return a.k.Va.ba};Z.listens=Z.Eg;Z.ze=function(a){a.ze()};Z.forceRestClient=Z.ze;function X(a,b){var c,d,e;if(a instanceof Ii)c=a,d=b;else{D("new Firebase",1,2,arguments.length);d=sd(arguments[0]);c=d.eh;"firebase"===d.domain&&rd(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||rd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.ob||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&S("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
	c=new dd(d.host,d.ob,c,"ws"===d.scheme||"wss"===d.scheme);d=new P(d.bd);e=d.toString();var f;!(f=!q(c.host)||0===c.host.length||!eg(c.lc))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(q(e)&&0!==e.length&&!cg.test(e)));if(f)throw Error(E("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof $i)e=b;else if(q(b))e=$i.yb(),c.Rd=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
	else e=$i.yb();f=c.toString();var g=z(e.sc,f);g||(g=new Ii(c,e.ag),e.sc[f]=g);c=g}Y.call(this,c,d,De,!1);this.then=void 0;this["catch"]=void 0}ka(X,Y);var ej=X,fj=["Firebase"],gj=n;fj[0]in gj||!gj.execScript||gj.execScript("var "+fj[0]);for(var hj;fj.length&&(hj=fj.shift());)!fj.length&&p(ej)?gj[hj]=ej:gj=gj[hj]?gj[hj]:gj[hj]={};X.goOffline=function(){D("Firebase.goOffline",0,0,arguments.length);$i.yb().Cb()};X.goOnline=function(){D("Firebase.goOnline",0,0,arguments.length);$i.yb().vc()};
	X.enableLogging=od;X.ServerValue={TIMESTAMP:{".sv":"timestamp"}};X.SDK_VERSION=Eb;X.INTERNAL=U;X.Context=$i;X.TEST_ACCESS=Z;X.prototype.name=function(){S("Firebase.name() being deprecated. Please use Firebase.key() instead.");D("Firebase.name",0,0,arguments.length);return this.key()};X.prototype.name=X.prototype.name;X.prototype.key=function(){D("Firebase.key",0,0,arguments.length);return this.path.e()?null:me(this.path)};X.prototype.key=X.prototype.key;
	X.prototype.o=function(a){D("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof P))if(null===K(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ng("Firebase.child",b)}else ng("Firebase.child",a);return new X(this.k,this.path.o(a))};X.prototype.child=X.prototype.o;X.prototype.parent=function(){D("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new X(this.k,a)};X.prototype.parent=X.prototype.parent;
	X.prototype.root=function(){D("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};X.prototype.root=X.prototype.root;X.prototype.set=function(a,b){D("Firebase.set",1,2,arguments.length);og("Firebase.set",this.path);gg("Firebase.set",a,this.path,!1);F("Firebase.set",2,b,!0);var c=new B;this.k.Ob(this.path,a,null,C(c,b));return c.D};X.prototype.set=X.prototype.set;
	X.prototype.update=function(a,b){D("Firebase.update",1,2,arguments.length);og("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;S("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}jg("Firebase.update",a,this.path);F("Firebase.update",2,b,!0);c=new B;this.k.update(this.path,a,C(c,b));return c.D};
	X.prototype.update=X.prototype.update;X.prototype.Ob=function(a,b,c){D("Firebase.setWithPriority",2,3,arguments.length);og("Firebase.setWithPriority",this.path);gg("Firebase.setWithPriority",a,this.path,!1);kg("Firebase.setWithPriority",2,b);F("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";var d=new B;this.k.Ob(this.path,a,b,C(d,c));return d.D};X.prototype.setWithPriority=X.prototype.Ob;
	X.prototype.remove=function(a){D("Firebase.remove",0,1,arguments.length);og("Firebase.remove",this.path);F("Firebase.remove",1,a,!0);return this.set(null,a)};X.prototype.remove=X.prototype.remove;
	X.prototype.transaction=function(a,b,c){D("Firebase.transaction",1,3,arguments.length);og("Firebase.transaction",this.path);F("Firebase.transaction",1,a,!1);F("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(E("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new B;r(b)&&Nb(d.D);Ri(this.k,this.path,a,function(a,c,g){a?
	d.reject(a):d.resolve(new di(c,g));r(b)&&b(a,c,g)},c);return d.D};X.prototype.transaction=X.prototype.transaction;X.prototype.Zg=function(a,b){D("Firebase.setPriority",1,2,arguments.length);og("Firebase.setPriority",this.path);kg("Firebase.setPriority",1,a);F("Firebase.setPriority",2,b,!0);var c=new B;this.k.Ob(this.path.o(".priority"),a,null,C(c,b));return c.D};X.prototype.setPriority=X.prototype.Zg;
	X.prototype.push=function(a,b){D("Firebase.push",0,2,arguments.length);og("Firebase.push",this.path);gg("Firebase.push",a,this.path,!0);F("Firebase.push",2,b,!0);var c=Ki(this.k),d=hf(c),c=this.o(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.o(d)});c.then=u(f.then,f);c["catch"]=u(f.then,f,void 0);r(b)&&Nb(f)}return c};X.prototype.push=X.prototype.push;X.prototype.lb=function(){og("Firebase.onDisconnect",this.path);return new V(this.k,this.path)};X.prototype.onDisconnect=X.prototype.lb;
	X.prototype.O=function(a,b,c){S("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");D("Firebase.auth",1,3,arguments.length);pg("Firebase.auth",a);F("Firebase.auth",2,b,!0);F("Firebase.auth",3,b,!0);var d=new B;ch(this.k.O,a,{},{remember:"none"},C(d,b),c);return d.D};X.prototype.auth=X.prototype.O;X.prototype.je=function(a){D("Firebase.unauth",0,1,arguments.length);F("Firebase.unauth",1,a,!0);var b=new B;dh(this.k.O,C(b,a));return b.D};X.prototype.unauth=X.prototype.je;
	X.prototype.Be=function(){D("Firebase.getAuth",0,0,arguments.length);return this.k.O.Be()};X.prototype.getAuth=X.prototype.Be;X.prototype.Ig=function(a,b){D("Firebase.onAuth",1,2,arguments.length);F("Firebase.onAuth",1,a,!1);Qb("Firebase.onAuth",2,b);this.k.O.Ib("auth_status",a,b)};X.prototype.onAuth=X.prototype.Ig;X.prototype.Hg=function(a,b){D("Firebase.offAuth",1,2,arguments.length);F("Firebase.offAuth",1,a,!1);Qb("Firebase.offAuth",2,b);this.k.O.mc("auth_status",a,b)};X.prototype.offAuth=X.prototype.Hg;
	X.prototype.hg=function(a,b,c){D("Firebase.authWithCustomToken",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);pg("Firebase.authWithCustomToken",a);F("Firebase.authWithCustomToken",2,b,!0);sg("Firebase.authWithCustomToken",3,c,!0);var d=new B;ch(this.k.O,a,{},c||{},C(d,b));return d.D};X.prototype.authWithCustomToken=X.prototype.hg;
	X.prototype.ig=function(a,b,c){D("Firebase.authWithOAuthPopup",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);rg("Firebase.authWithOAuthPopup",a);F("Firebase.authWithOAuthPopup",2,b,!0);sg("Firebase.authWithOAuthPopup",3,c,!0);var d=new B;hh(this.k.O,a,c,C(d,b));return d.D};X.prototype.authWithOAuthPopup=X.prototype.ig;
	X.prototype.jg=function(a,b,c){D("Firebase.authWithOAuthRedirect",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);rg("Firebase.authWithOAuthRedirect",a);F("Firebase.authWithOAuthRedirect",2,b,!1);sg("Firebase.authWithOAuthRedirect",3,c,!0);var d=new B,e=this.k.O,f=c,g=C(d,b);fh(e);var k=[Pg],f=Ag(f);"anonymous"===a||"firebase"===a?T(g,Rg("TRANSPORT_UNAVAILABLE")):(cd.set("redirect_client_options",f.qd),gh(e,k,"/auth/"+a,f,g));return d.D};X.prototype.authWithOAuthRedirect=X.prototype.jg;
	X.prototype.kg=function(a,b,c,d){D("Firebase.authWithOAuthToken",2,4,arguments.length);3===arguments.length&&Hb(c)&&(d=c,c=void 0);rg("Firebase.authWithOAuthToken",a);F("Firebase.authWithOAuthToken",3,c,!0);sg("Firebase.authWithOAuthToken",4,d,!0);var e=new B;q(b)?(qg("Firebase.authWithOAuthToken",2,b),eh(this.k.O,a+"/token",{access_token:b},d,C(e,c))):(sg("Firebase.authWithOAuthToken",2,b,!1),eh(this.k.O,a+"/token",b,d,C(e,c)));return e.D};X.prototype.authWithOAuthToken=X.prototype.kg;
	X.prototype.gg=function(a,b){D("Firebase.authAnonymously",0,2,arguments.length);1===arguments.length&&Hb(a)&&(b=a,a=void 0);F("Firebase.authAnonymously",1,a,!0);sg("Firebase.authAnonymously",2,b,!0);var c=new B;eh(this.k.O,"anonymous",{},b,C(c,a));return c.D};X.prototype.authAnonymously=X.prototype.gg;
	X.prototype.lg=function(a,b,c){D("Firebase.authWithPassword",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);sg("Firebase.authWithPassword",1,a,!1);tg("Firebase.authWithPassword",a,"email");tg("Firebase.authWithPassword",a,"password");F("Firebase.authWithPassword",2,b,!0);sg("Firebase.authWithPassword",3,c,!0);var d=new B;eh(this.k.O,"password",a,c,C(d,b));return d.D};X.prototype.authWithPassword=X.prototype.lg;
	X.prototype.ve=function(a,b){D("Firebase.createUser",1,2,arguments.length);sg("Firebase.createUser",1,a,!1);tg("Firebase.createUser",a,"email");tg("Firebase.createUser",a,"password");F("Firebase.createUser",2,b,!0);var c=new B;this.k.O.ve(a,C(c,b));return c.D};X.prototype.createUser=X.prototype.ve;
	X.prototype.Xe=function(a,b){D("Firebase.removeUser",1,2,arguments.length);sg("Firebase.removeUser",1,a,!1);tg("Firebase.removeUser",a,"email");tg("Firebase.removeUser",a,"password");F("Firebase.removeUser",2,b,!0);var c=new B;this.k.O.Xe(a,C(c,b));return c.D};X.prototype.removeUser=X.prototype.Xe;
	X.prototype.se=function(a,b){D("Firebase.changePassword",1,2,arguments.length);sg("Firebase.changePassword",1,a,!1);tg("Firebase.changePassword",a,"email");tg("Firebase.changePassword",a,"oldPassword");tg("Firebase.changePassword",a,"newPassword");F("Firebase.changePassword",2,b,!0);var c=new B;this.k.O.se(a,C(c,b));return c.D};X.prototype.changePassword=X.prototype.se;
	X.prototype.re=function(a,b){D("Firebase.changeEmail",1,2,arguments.length);sg("Firebase.changeEmail",1,a,!1);tg("Firebase.changeEmail",a,"oldEmail");tg("Firebase.changeEmail",a,"newEmail");tg("Firebase.changeEmail",a,"password");F("Firebase.changeEmail",2,b,!0);var c=new B;this.k.O.re(a,C(c,b));return c.D};X.prototype.changeEmail=X.prototype.re;
	X.prototype.Ze=function(a,b){D("Firebase.resetPassword",1,2,arguments.length);sg("Firebase.resetPassword",1,a,!1);tg("Firebase.resetPassword",a,"email");F("Firebase.resetPassword",2,b,!0);var c=new B;this.k.O.Ze(a,C(c,b));return c.D};X.prototype.resetPassword=X.prototype.Ze;})();

	module.exports = Firebase;


/***/ },
/* 175 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(177);
	var WHITE_SPACES = __webpack_require__(178);
	var ltrim = __webpack_require__(179);
	var rtrim = __webpack_require__(180);
	    /**
	     * Remove white-spaces from beginning and end of string.
	     */
	    function trim(str, chars) {
	        str = toString(str);
	        chars = chars || WHITE_SPACES;
	        return ltrim(rtrim(str, chars), chars);
	    }

	    module.exports = trim;



/***/ },
/* 177 */
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
/* 178 */
/***/ function(module, exports) {

	
	    /**
	     * Contains all Unicode white-spaces. Taken from
	     * http://en.wikipedia.org/wiki/Whitespace_character.
	     */
	    module.exports = [
	        ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
	        '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
	        '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
	        '\u205F', '\u3000'
	    ];



/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(177);
	var WHITE_SPACES = __webpack_require__(178);
	    /**
	     * Remove chars from beginning of string.
	     */
	    function ltrim(str, chars) {
	        str = toString(str);
	        chars = chars || WHITE_SPACES;

	        var start = 0,
	            len = str.length,
	            charLen = chars.length,
	            found = true,
	            i, c;

	        while (found && start < len) {
	            found = false;
	            i = -1;
	            c = str.charAt(start);

	            while (++i < charLen) {
	                if (c === chars[i]) {
	                    found = true;
	                    start++;
	                    break;
	                }
	            }
	        }

	        return (start >= len) ? '' : str.substr(start, len);
	    }

	    module.exports = ltrim;



/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(177);
	var WHITE_SPACES = __webpack_require__(178);
	    /**
	     * Remove chars from end of string.
	     */
	    function rtrim(str, chars) {
	        str = toString(str);
	        chars = chars || WHITE_SPACES;

	        var end = str.length - 1,
	            charLen = chars.length,
	            found = true,
	            i, c;

	        while (found && end >= 0) {
	            found = false;
	            i = -1;
	            c = str.charAt(end);

	            while (++i < charLen) {
	                if (c === chars[i]) {
	                    found = true;
	                    end--;
	                    break;
	                }
	            }
	        }

	        return (end >= 0) ? str.substring(0, end + 1) : '';
	    }

	    module.exports = rtrim;



/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(182);
	var deepClone = __webpack_require__(183);
	var isObject = __webpack_require__(190);

	    /**
	     * Deep merge objects.
	     */
	    function merge() {
	        var i = 1,
	            key, val, obj, target;

	        // make sure we don't modify source element and it's properties
	        // objects are passed by reference
	        target = deepClone( arguments[0] );

	        while (obj = arguments[i++]) {
	            for (key in obj) {
	                if ( ! hasOwn(obj, key) ) {
	                    continue;
	                }

	                val = obj[key];

	                if ( isObject(val) && isObject(target[key]) ){
	                    // inception, deep merge objects
	                    target[key] = merge(target[key], val);
	                } else {
	                    // make sure arrays, regexp, date, objects are cloned
	                    target[key] = deepClone(val);
	                }

	            }
	        }

	        return target;
	    }

	    module.exports = merge;




/***/ },
/* 182 */
/***/ function(module, exports) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var clone = __webpack_require__(184);
	var forOwn = __webpack_require__(188);
	var kindOf = __webpack_require__(185);
	var isPlainObject = __webpack_require__(186);

	    /**
	     * Recursively clone native types.
	     */
	    function deepClone(val, instanceClone) {
	        switch ( kindOf(val) ) {
	            case 'Object':
	                return cloneObject(val, instanceClone);
	            case 'Array':
	                return cloneArray(val, instanceClone);
	            default:
	                return clone(val);
	        }
	    }

	    function cloneObject(source, instanceClone) {
	        if (isPlainObject(source)) {
	            var out = {};
	            forOwn(source, function(val, key) {
	                this[key] = deepClone(val, instanceClone);
	            }, out);
	            return out;
	        } else if (instanceClone) {
	            return instanceClone(source);
	        } else {
	            return source;
	        }
	    }

	    function cloneArray(arr, instanceClone) {
	        var out = [],
	            i = -1,
	            n = arr.length,
	            val;
	        while (++i < n) {
	            out[i] = deepClone(arr[i], instanceClone);
	        }
	        return out;
	    }

	    module.exports = deepClone;





/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(185);
	var isPlainObject = __webpack_require__(186);
	var mixIn = __webpack_require__(187);

	    /**
	     * Clone native types.
	     */
	    function clone(val){
	        switch (kindOf(val)) {
	            case 'Object':
	                return cloneObject(val);
	            case 'Array':
	                return cloneArray(val);
	            case 'RegExp':
	                return cloneRegExp(val);
	            case 'Date':
	                return cloneDate(val);
	            default:
	                return val;
	        }
	    }

	    function cloneObject(source) {
	        if (isPlainObject(source)) {
	            return mixIn({}, source);
	        } else {
	            return source;
	        }
	    }

	    function cloneRegExp(r) {
	        var flags = '';
	        flags += r.multiline ? 'm' : '';
	        flags += r.global ? 'g' : '';
	        flags += r.ignoreCase ? 'i' : '';
	        return new RegExp(r.source, flags);
	    }

	    function cloneDate(date) {
	        return new Date(+date);
	    }

	    function cloneArray(arr) {
	        return arr.slice();
	    }

	    module.exports = clone;




/***/ },
/* 185 */
/***/ function(module, exports) {

	

	    var _rKind = /^\[object (.*)\]$/,
	        _toString = Object.prototype.toString,
	        UNDEF;

	    /**
	     * Gets the "kind" of value. (e.g. "String", "Number", etc)
	     */
	    function kindOf(val) {
	        if (val === null) {
	            return 'Null';
	        } else if (val === UNDEF) {
	            return 'Undefined';
	        } else {
	            return _rKind.exec( _toString.call(val) )[1];
	        }
	    }
	    module.exports = kindOf;



/***/ },
/* 186 */
/***/ function(module, exports) {

	

	    /**
	     * Checks if the value is created by the `Object` constructor.
	     */
	    function isPlainObject(value) {
	        return (!!value && typeof value === 'object' &&
	            value.constructor === Object);
	    }

	    module.exports = isPlainObject;




/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(188);

	    /**
	    * Combine properties from all the objects into first one.
	    * - This method affects target object in place, if you want to create a new Object pass an empty object as first param.
	    * @param {object} target    Target Object
	    * @param {...object} objects    Objects to be combined (0...n objects).
	    * @return {object} Target Object.
	    */
	    function mixIn(target, objects){
	        var i = 0,
	            n = arguments.length,
	            obj;
	        while(++i < n){
	            obj = arguments[i];
	            if (obj != null) {
	                forOwn(obj, copyProp, target);
	            }
	        }
	        return target;
	    }

	    function copyProp(val, key){
	        this[key] = val;
	    }

	    module.exports = mixIn;



/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(182);
	var forIn = __webpack_require__(189);

	    /**
	     * Similar to Array/forEach but works over object properties and fixes Don't
	     * Enum bug on IE.
	     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	     */
	    function forOwn(obj, fn, thisObj){
	        forIn(obj, function(val, key){
	            if (hasOwn(obj, key)) {
	                return fn.call(thisObj, obj[key], key, obj);
	            }
	        });
	    }

	    module.exports = forOwn;




/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(182);

	    var _hasDontEnumBug,
	        _dontEnums;

	    function checkDontEnum(){
	        _dontEnums = [
	                'toString',
	                'toLocaleString',
	                'valueOf',
	                'hasOwnProperty',
	                'isPrototypeOf',
	                'propertyIsEnumerable',
	                'constructor'
	            ];

	        _hasDontEnumBug = true;

	        for (var key in {'toString': null}) {
	            _hasDontEnumBug = false;
	        }
	    }

	    /**
	     * Similar to Array/forEach but works over object properties and fixes Don't
	     * Enum bug on IE.
	     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	     */
	    function forIn(obj, fn, thisObj){
	        var key, i = 0;
	        // no need to check if argument is a real object that way we can use
	        // it for arrays, functions, date, etc.

	        //post-pone check till needed
	        if (_hasDontEnumBug == null) checkDontEnum();

	        for (key in obj) {
	            if (exec(fn, obj, key, thisObj) === false) {
	                break;
	            }
	        }


	        if (_hasDontEnumBug) {
	            var ctor = obj.constructor,
	                isProto = !!ctor && obj === ctor.prototype;

	            while (key = _dontEnums[i++]) {
	                // For constructor, if it is a prototype object the constructor
	                // is always non-enumerable unless defined otherwise (and
	                // enumerated above).  For non-prototype objects, it will have
	                // to be defined on this object, since it cannot be defined on
	                // any prototype objects.
	                //
	                // For other [[DontEnum]] properties, check if the value is
	                // different than Object prototype value.
	                if (
	                    (key !== 'constructor' ||
	                        (!isProto && hasOwn(obj, key))) &&
	                    obj[key] !== Object.prototype[key]
	                ) {
	                    if (exec(fn, obj, key, thisObj) === false) {
	                        break;
	                    }
	                }
	            }
	        }
	    }

	    function exec(fn, obj, key, thisObj){
	        return fn.call(thisObj, obj[key], key, obj);
	    }

	    module.exports = forIn;




/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(191);
	    /**
	     */
	    function isObject(val) {
	        return isKind(val, 'Object');
	    }
	    module.exports = isObject;



/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(185);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;



/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	var replaceAccents = __webpack_require__(194);
	var removeNonWord = __webpack_require__(195);
	var upperCase = __webpack_require__(196);
	var lowerCase = __webpack_require__(197);
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
/* 193 */
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
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
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
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	    /**
	     * "Safer" String.toUpperCase()
	     */
	    function upperCase(str){
	        str = toString(str);
	        return str.toUpperCase();
	    }
	    module.exports = upperCase;



/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	    /**
	     * "Safer" String.toLowerCase()
	     */
	    function lowerCase(str){
	        str = toString(str);
	        return str.toLowerCase();
	    }

	    module.exports = lowerCase;



/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	var replaceAccents = __webpack_require__(194);
	var removeNonWord = __webpack_require__(195);
	var trim = __webpack_require__(199);
	    /**
	     * Convert to lower case, remove accents, remove non-word chars and
	     * replace spaces with the specified delimeter.
	     * Does not split camelCase text.
	     */
	    function slugify(str, delimeter){
	        str = toString(str);

	        if (delimeter == null) {
	            delimeter = "-";
	        }
	        str = replaceAccents(str);
	        str = removeNonWord(str);
	        str = trim(str) //should come after removeNonWord
	                .replace(/ +/g, delimeter) //replace spaces with delimeter
	                .toLowerCase();
	        return str;
	    }
	    module.exports = slugify;



/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	var WHITE_SPACES = __webpack_require__(200);
	var ltrim = __webpack_require__(201);
	var rtrim = __webpack_require__(202);
	    /**
	     * Remove white-spaces from beginning and end of string.
	     */
	    function trim(str, chars) {
	        str = toString(str);
	        chars = chars || WHITE_SPACES;
	        return ltrim(rtrim(str, chars), chars);
	    }

	    module.exports = trim;



/***/ },
/* 200 */
/***/ function(module, exports) {

	
	    /**
	     * Contains all Unicode white-spaces. Taken from
	     * http://en.wikipedia.org/wiki/Whitespace_character.
	     */
	    module.exports = [
	        ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
	        '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
	        '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
	        '\u205F', '\u3000'
	    ];



/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	var WHITE_SPACES = __webpack_require__(200);
	    /**
	     * Remove chars from beginning of string.
	     */
	    function ltrim(str, chars) {
	        str = toString(str);
	        chars = chars || WHITE_SPACES;

	        var start = 0,
	            len = str.length,
	            charLen = chars.length,
	            found = true,
	            i, c;

	        while (found && start < len) {
	            found = false;
	            i = -1;
	            c = str.charAt(start);

	            while (++i < charLen) {
	                if (c === chars[i]) {
	                    found = true;
	                    start++;
	                    break;
	                }
	            }
	        }

	        return (start >= len) ? '' : str.substr(start, len);
	    }

	    module.exports = ltrim;



/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(193);
	var WHITE_SPACES = __webpack_require__(200);
	    /**
	     * Remove chars from end of string.
	     */
	    function rtrim(str, chars) {
	        str = toString(str);
	        chars = chars || WHITE_SPACES;

	        var end = str.length - 1,
	            charLen = chars.length,
	            found = true,
	            i, c;

	        while (found && end >= 0) {
	            found = false;
	            i = -1;
	            c = str.charAt(end);

	            while (++i < charLen) {
	                if (c === chars[i]) {
	                    found = true;
	                    end--;
	                    break;
	                }
	            }
	        }

	        return (end >= 0) ? str.substring(0, end + 1) : '';
	    }

	    module.exports = rtrim;



/***/ },
/* 203 */
/***/ function(module, exports) {

	/*! @license Firebase v2.4.0
	    License: https://www.firebase.com/terms/terms-of-service.html */
	(function() {var h,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.yb=function(){return a.zf?a.zf:a.zf=new a}}
	function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function r(a){return"function"==ca(a)}function ga(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ha(a,b,c){return a.call.apply(a.bind,arguments)}
	function ia(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function u(a,b,c){u=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return u.apply(null,arguments)}var ja=Date.now||function(){return+new Date};
	function ka(a,b){function c(){}c.prototype=b.prototype;a.nh=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.jh=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function la(a){if(Error.captureStackTrace)Error.captureStackTrace(this,la);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(la,Error);la.prototype.name="CustomError";function v(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function ma(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function na(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function oa(a){var b=0,c;for(c in a)b++;return b}function pa(a){for(var b in a)return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function sa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function ta(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function ua(a,b){var c=ta(a,b,void 0);return c&&a[c]}function va(a){for(var b in a)return!1;return!0}function wa(a){var b={},c;for(c in a)b[c]=a[c];return b}var xa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	function ya(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<xa.length;f++)c=xa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){this.Vd=void 0}
	function Ba(a,b,c){switch(typeof b){case "string":Ca(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ba(a,a.Vd?a.Vd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Ca(f,c),
	c.push(":"),Ba(a,a.Vd?a.Vd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Ca(a,b){b.push('"',a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Da[a]=e+b.toString(16)}),'"')};function Fa(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ja()).toString(36)};var w;a:{var Ga=n.navigator;if(Ga){var Ha=Ga.userAgent;if(Ha){w=Ha;break a}}w=""};function Ia(){this.Ya=-1};function Ja(){this.Ya=-1;this.Ya=64;this.P=[];this.pe=[];this.eg=[];this.Od=[];this.Od[0]=128;for(var a=1;a<this.Ya;++a)this.Od[a]=0;this.ge=this.ec=0;this.reset()}ka(Ja,Ia);Ja.prototype.reset=function(){this.P[0]=1732584193;this.P[1]=4023233417;this.P[2]=2562383102;this.P[3]=271733878;this.P[4]=3285377520;this.ge=this.ec=0};
	function Ka(a,b,c){c||(c=0);var d=a.eg;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.P[0];c=a.P[1];for(var g=a.P[2],k=a.P[3],m=a.P[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),l=1518500249):(f=c^g^k,l=1859775393):60>e?(f=c&g|k&(c|g),l=2400959708):(f=c^g^k,l=3395469782),f=(b<<
	5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.P[0]=a.P[0]+b&4294967295;a.P[1]=a.P[1]+c&4294967295;a.P[2]=a.P[2]+g&4294967295;a.P[3]=a.P[3]+k&4294967295;a.P[4]=a.P[4]+m&4294967295}
	Ja.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Ya,d=0,e=this.pe,f=this.ec;d<b;){if(0==f)for(;d<=c;)Ka(this,a,d),d+=this.Ya;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Ya){Ka(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Ya){Ka(this,e);f=0;break}}this.ec=f;this.ge+=b}};var x=Array.prototype,La=x.indexOf?function(a,b,c){return x.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ma=x.forEach?function(a,b,c){x.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Na=x.filter?function(a,b,c){return x.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?
	a.split(""):a,k=0;k<d;k++)if(k in g){var m=g[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Oa=x.map?function(a,b,c){return x.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Pa=x.reduce?function(a,b,c,d){for(var e=[],f=1,g=arguments.length;f<g;f++)e.push(arguments[f]);d&&(e[0]=u(b,d));return x.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ma(a,function(c,g){e=b.call(d,e,c,g,a)});return e},Qa=x.every?function(a,b,
	c){return x.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ra(a,b){var c=Sa(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Sa(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Ta(a,b){var c=La(a,b);0<=c&&x.splice.call(a,c,1)}function Ua(a,b,c){return 2>=arguments.length?x.slice.call(a,b):x.slice.call(a,b,c)}
	function Va(a,b){a.sort(b||Wa)}function Wa(a,b){return a>b?1:a<b?-1:0};function Xa(a){n.setTimeout(function(){throw a;},0)}var Ya;
	function Za(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==w.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=u(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==w.indexOf("Trident")&&-1==w.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.hb;c.hb=null;a()}};return function(a){d.next={hb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
	document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function $a(a,b){ab||bb();cb||(ab(),cb=!0);db.push(new eb(a,b))}var ab;function bb(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();ab=function(){a.then(fb)}}else ab=function(){var a=fb;!r(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(Ya||(Ya=Za()),Ya(a)):n.setImmediate(a)}}var cb=!1,db=[];[].push(function(){cb=!1;db=[]});
	function fb(){for(;db.length;){var a=db;db=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.yg.call(c.scope)}catch(d){Xa(d)}}}cb=!1}function eb(a,b){this.yg=a;this.scope=b};var gb=-1!=w.indexOf("Opera")||-1!=w.indexOf("OPR"),hb=-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"),ib=-1!=w.indexOf("Gecko")&&-1==w.toLowerCase().indexOf("webkit")&&!(-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE")),jb=-1!=w.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(gb&&n.opera)return a=n.opera.version,r(a)?a():a;ib?b=/rv\:([^\);]+)(\)|;)/:hb?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:jb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(w))?a[1]:"");return hb&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var kb=null,lb=null,mb=null;function nb(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");ob();for(var c=b?lb:kb,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,k=g?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,g||(k=64));d.push(c[t],c[f],c[k],c[l])}return d.join("")}
	function ob(){if(!kb){kb={};lb={};mb={};for(var a=0;65>a;a++)kb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),lb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),mb[lb[a]]=a,62<=a&&(mb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function pb(a,b){this.N=qb;this.Rf=void 0;this.Ba=this.Ha=null;this.yd=this.ye=!1;if(a==rb)sb(this,tb,b);else try{var c=this;a.call(b,function(a){sb(c,tb,a)},function(a){if(!(a instanceof ub))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}sb(c,vb,a)})}catch(d){sb(this,vb,d)}}var qb=0,tb=2,vb=3;function rb(){}pb.prototype.then=function(a,b,c){return wb(this,r(a)?a:null,r(b)?b:null,c)};pb.prototype.then=pb.prototype.then;pb.prototype.$goog_Thenable=!0;
	pb.prototype.cancel=function(a){this.N==qb&&$a(function(){var b=new ub(a);xb(this,b)},this)};function xb(a,b){if(a.N==qb)if(a.Ha){var c=a.Ha;if(c.Ba){for(var d=0,e=-1,f=0,g;g=c.Ba[f];f++)if(g=g.o)if(d++,g==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.N==qb&&1==d?xb(c,b):(d=c.Ba.splice(e,1)[0],yb(c,d,vb,b)))}a.Ha=null}else sb(a,vb,b)}function zb(a,b){a.Ba&&a.Ba.length||a.N!=tb&&a.N!=vb||Ab(a);a.Ba||(a.Ba=[]);a.Ba.push(b)}
	function wb(a,b,c,d){var e={o:null,Hf:null,Jf:null};e.o=new pb(function(a,g){e.Hf=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){g(l)}}:a;e.Jf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof ub?g(b):a(e)}catch(l){g(l)}}:g});e.o.Ha=a;zb(a,e);return e.o}pb.prototype.Yf=function(a){this.N=qb;sb(this,tb,a)};pb.prototype.Zf=function(a){this.N=qb;sb(this,vb,a)};
	function sb(a,b,c){if(a.N==qb){if(a==c)b=vb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.N=1;c.then(a.Yf,a.Zf,a);return}if(ga(c))try{var f=c.then;if(r(f)){Bb(a,c,f);return}}catch(g){b=vb,c=g}}a.Rf=c;a.N=b;a.Ha=null;Ab(a);b!=vb||c instanceof ub||Cb(a,c)}}function Bb(a,b,c){function d(b){f||(f=!0,a.Zf(b))}function e(b){f||(f=!0,a.Yf(b))}a.N=1;var f=!1;try{c.call(b,e,d)}catch(g){d(g)}}
	function Ab(a){a.ye||(a.ye=!0,$a(a.wg,a))}pb.prototype.wg=function(){for(;this.Ba&&this.Ba.length;){var a=this.Ba;this.Ba=null;for(var b=0;b<a.length;b++)yb(this,a[b],this.N,this.Rf)}this.ye=!1};function yb(a,b,c,d){if(c==tb)b.Hf(d);else{if(b.o)for(;a&&a.yd;a=a.Ha)a.yd=!1;b.Jf(d)}}function Cb(a,b){a.yd=!0;$a(function(){a.yd&&Db.call(null,b)})}var Db=Xa;function ub(a){la.call(this,a)}ka(ub,la);ub.prototype.name="cancel";var Eb=Eb||"2.4.0";function y(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function z(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Fb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function Gb(a){var b={};Fb(a,function(a,d){b[a]=d});return b}function Hb(a){return"object"===typeof a&&null!==a};function Ib(a){var b=[];Fb(a,function(a,d){da(d)?Ma(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function Jb(a){var b={};a=a.replace(/^\?/,"").split("&");Ma(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function Kb(a,b){if(!a)throw Lb(b);}function Lb(a){return Error("Firebase ("+Eb+") INTERNAL ASSERT FAILED: "+a)};var Mb=n.Promise||pb;function B(){var a=this;this.reject=this.resolve=null;this.D=new Mb(function(b,c){a.resolve=b;a.reject=c})}function C(a,b){return function(c,d){c?a.reject(c):a.resolve(d);r(b)&&(Nb(a.D),1===b.length?b(c):b(c,d))}}function Nb(a){a.then(void 0,aa)};function Ob(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Pb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function D(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function E(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function F(a,b,c,d){if((!d||p(c))&&!r(c))throw Error(E(a,b,d)+"must be a valid function.");}function Qb(a,b,c){if(p(c)&&(!ga(c)||null===c))throw Error(E(a,b,!0)+"must be a valid context object.");};function Rb(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):za(a)}function G(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ba(new Aa,a,b);a=b.join("")}return a};function Sb(){this.Zd=H}Sb.prototype.j=function(a){return this.Zd.S(a)};Sb.prototype.toString=function(){return this.Zd.toString()};function Tb(){}Tb.prototype.uf=function(){return null};Tb.prototype.Ce=function(){return null};var Ub=new Tb;function Vb(a,b,c){this.bg=a;this.Oa=b;this.Nd=c}Vb.prototype.uf=function(a){var b=this.Oa.Q;if(Wb(b,a))return b.j().T(a);b=null!=this.Nd?new Xb(this.Nd,!0,!1):this.Oa.w();return this.bg.Bc(a,b)};Vb.prototype.Ce=function(a,b,c){var d=null!=this.Nd?this.Nd:Yb(this.Oa);a=this.bg.qe(d,b,1,c,a);return 0===a.length?null:a[0]};function Zb(){this.xb=[]}function $b(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.cc();null===c||f.ea(c.cc())||(a.xb.push(c),c=null);null===c&&(c=new ac(f));c.add(e)}c&&a.xb.push(c)}function bc(a,b,c){$b(a,c);cc(a,function(a){return a.ea(b)})}function dc(a,b,c){$b(a,c);cc(a,function(a){return a.contains(b)||b.contains(a)})}
	function cc(a,b){for(var c=!0,d=0;d<a.xb.length;d++){var e=a.xb[d];if(e)if(e=e.cc(),b(e)){for(var e=a.xb[d],f=0;f<e.xd.length;f++){var g=e.xd[f];if(null!==g){e.xd[f]=null;var k=g.Zb();ec&&fc("event: "+g.toString());gc(k)}}a.xb[d]=null}else c=!1}c&&(a.xb=[])}function ac(a){this.ta=a;this.xd=[]}ac.prototype.add=function(a){this.xd.push(a)};ac.prototype.cc=function(){return this.ta};function J(a,b,c,d){this.type=a;this.Na=b;this.Za=c;this.Oe=d;this.Td=void 0}function hc(a){return new J(ic,a)}var ic="value";function jc(a,b,c,d){this.xe=b;this.be=c;this.Td=d;this.wd=a}jc.prototype.cc=function(){var a=this.be.Mb();return"value"===this.wd?a.path:a.parent().path};jc.prototype.De=function(){return this.wd};jc.prototype.Zb=function(){return this.xe.Zb(this)};jc.prototype.toString=function(){return this.cc().toString()+":"+this.wd+":"+G(this.be.qf())};function kc(a,b,c){this.xe=a;this.error=b;this.path=c}kc.prototype.cc=function(){return this.path};kc.prototype.De=function(){return"cancel"};
	kc.prototype.Zb=function(){return this.xe.Zb(this)};kc.prototype.toString=function(){return this.path.toString()+":cancel"};function Xb(a,b,c){this.A=a;this.ga=b;this.Yb=c}function lc(a){return a.ga}function mc(a){return a.Yb}function nc(a,b){return b.e()?a.ga&&!a.Yb:Wb(a,K(b))}function Wb(a,b){return a.ga&&!a.Yb||a.A.Fa(b)}Xb.prototype.j=function(){return this.A};function oc(a){this.pg=a;this.Gd=null}oc.prototype.get=function(){var a=this.pg.get(),b=wa(a);if(this.Gd)for(var c in this.Gd)b[c]-=this.Gd[c];this.Gd=a;return b};function pc(a,b){this.Vf={};this.hd=new oc(a);this.da=b;var c=1E4+2E4*Math.random();setTimeout(u(this.Of,this),Math.floor(c))}pc.prototype.Of=function(){var a=this.hd.get(),b={},c=!1,d;for(d in a)0<a[d]&&y(this.Vf,d)&&(b[d]=a[d],c=!0);c&&this.da.Ye(b);setTimeout(u(this.Of,this),Math.floor(6E5*Math.random()))};function qc(){this.Hc={}}function rc(a,b,c){p(c)||(c=1);y(a.Hc,b)||(a.Hc[b]=0);a.Hc[b]+=c}qc.prototype.get=function(){return wa(this.Hc)};var sc={},tc={};function uc(a){a=a.toString();sc[a]||(sc[a]=new qc);return sc[a]}function vc(a,b){var c=a.toString();tc[c]||(tc[c]=b());return tc[c]};function L(a,b){this.name=a;this.U=b}function wc(a,b){return new L(a,b)};function xc(a,b){return yc(a.name,b.name)}function zc(a,b){return yc(a,b)};function Ac(a,b,c){this.type=Bc;this.source=a;this.path=b;this.Ja=c}Ac.prototype.$c=function(a){return this.path.e()?new Ac(this.source,M,this.Ja.T(a)):new Ac(this.source,N(this.path),this.Ja)};Ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function Cc(a,b){this.type=Dc;this.source=a;this.path=b}Cc.prototype.$c=function(){return this.path.e()?new Cc(this.source,M):new Cc(this.source,N(this.path))};Cc.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function Ec(a,b){this.Pa=a;this.xa=b?b:Fc}h=Ec.prototype;h.Sa=function(a,b){return new Ec(this.Pa,this.xa.Sa(a,b,this.Pa).$(null,null,!1,null,null))};h.remove=function(a){return new Ec(this.Pa,this.xa.remove(a,this.Pa).$(null,null,!1,null,null))};h.get=function(a){for(var b,c=this.xa;!c.e();){b=this.Pa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function Gc(a,b){for(var c,d=a.xa,e=null;!d.e();){c=a.Pa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.e=function(){return this.xa.e()};h.count=function(){return this.xa.count()};h.Vc=function(){return this.xa.Vc()};h.jc=function(){return this.xa.jc()};h.ka=function(a){return this.xa.ka(a)};
	h.ac=function(a){return new Hc(this.xa,null,this.Pa,!1,a)};h.bc=function(a,b){return new Hc(this.xa,a,this.Pa,!1,b)};h.dc=function(a,b){return new Hc(this.xa,a,this.Pa,!0,b)};h.xf=function(a){return new Hc(this.xa,null,this.Pa,!0,a)};function Hc(a,b,c,d,e){this.Xd=e||null;this.Je=d;this.Ta=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Je?a.left:a.right;else if(0===e){this.Ta.push(a);break}else this.Ta.push(a),a=this.Je?a.right:a.left}
	function Ic(a){if(0===a.Ta.length)return null;var b=a.Ta.pop(),c;c=a.Xd?a.Xd(b.key,b.value):{key:b.key,value:b.value};if(a.Je)for(b=b.left;!b.e();)a.Ta.push(b),b=b.right;else for(b=b.right;!b.e();)a.Ta.push(b),b=b.left;return c}function Jc(a){if(0===a.Ta.length)return null;var b;b=a.Ta;b=b[b.length-1];return a.Xd?a.Xd(b.key,b.value):{key:b.key,value:b.value}}function Kc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Fc;this.right=null!=e?e:Fc}h=Kc.prototype;
	h.$=function(a,b,c,d,e){return new Kc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.e=function(){return!1};h.ka=function(a){return this.left.ka(a)||a(this.key,this.value)||this.right.ka(a)};function Lc(a){return a.left.e()?a:Lc(a.left)}h.Vc=function(){return Lc(this).key};h.jc=function(){return this.right.e()?this.key:this.right.jc()};
	h.Sa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.$(null,null,null,e.left.Sa(a,b,c),null):0===d?e.$(null,b,null,null,null):e.$(null,null,null,null,e.right.Sa(a,b,c));return Mc(e)};function Nc(a){if(a.left.e())return Fc;a.left.ha()||a.left.left.ha()||(a=Oc(a));a=a.$(null,null,null,Nc(a.left),null);return Mc(a)}
	h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ha()||c.left.left.ha()||(c=Oc(c)),c=c.$(null,null,null,c.left.remove(a,b),null);else{c.left.ha()&&(c=Pc(c));c.right.e()||c.right.ha()||c.right.left.ha()||(c=Qc(c),c.left.left.ha()&&(c=Pc(c),c=Qc(c)));if(0===b(a,c.key)){if(c.right.e())return Fc;d=Lc(c.right);c=c.$(d.key,d.value,null,null,Nc(c.right))}c=c.$(null,null,null,null,c.right.remove(a,b))}return Mc(c)};h.ha=function(){return this.color};
	function Mc(a){a.right.ha()&&!a.left.ha()&&(a=Rc(a));a.left.ha()&&a.left.left.ha()&&(a=Pc(a));a.left.ha()&&a.right.ha()&&(a=Qc(a));return a}function Oc(a){a=Qc(a);a.right.left.ha()&&(a=a.$(null,null,null,null,Pc(a.right)),a=Rc(a),a=Qc(a));return a}function Rc(a){return a.right.$(null,null,a.color,a.$(null,null,!0,null,a.right.left),null)}function Pc(a){return a.left.$(null,null,a.color,null,a.$(null,null,!0,a.left.right,null))}
	function Qc(a){return a.$(null,null,!a.color,a.left.$(null,null,!a.left.color,null,null),a.right.$(null,null,!a.right.color,null,null))}function Sc(){}h=Sc.prototype;h.$=function(){return this};h.Sa=function(a,b){return new Kc(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.e=function(){return!0};h.ka=function(){return!1};h.Vc=function(){return null};h.jc=function(){return null};h.ha=function(){return!1};var Fc=new Sc;function Tc(a,b){return a&&"object"===typeof a?(O(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Uc(a,b){var c=new Vc;Wc(a,new P(""),function(a,e){c.rc(a,Xc(e,b))});return c}function Xc(a,b){var c=a.C().J(),c=Tc(c,b),d;if(a.L()){var e=Tc(a.Ea(),b);return e!==a.Ea()||c!==a.C().J()?new Yc(e,Q(c)):a}d=a;c!==a.C().J()&&(d=d.ia(new Yc(c)));a.R(R,function(a,c){var e=Xc(c,b);e!==c&&(d=d.W(a,e))});return d};function Zc(){this.Ac={}}Zc.prototype.set=function(a,b){null==b?delete this.Ac[a]:this.Ac[a]=b};Zc.prototype.get=function(a){return y(this.Ac,a)?this.Ac[a]:null};Zc.prototype.remove=function(a){delete this.Ac[a]};Zc.prototype.Af=!0;function $c(a){this.Ic=a;this.Sd="firebase:"}h=$c.prototype;h.set=function(a,b){null==b?this.Ic.removeItem(this.Sd+a):this.Ic.setItem(this.Sd+a,G(b))};h.get=function(a){a=this.Ic.getItem(this.Sd+a);return null==a?null:Rb(a)};h.remove=function(a){this.Ic.removeItem(this.Sd+a)};h.Af=!1;h.toString=function(){return this.Ic.toString()};function ad(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new $c(b)}}catch(c){}return new Zc}var bd=ad("localStorage"),cd=ad("sessionStorage");function dd(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.ob=b;this.lc=c;this.hh=d;this.Rd=e||"";this.ab=bd.get("host:"+a)||this.host}function ed(a,b){b!==a.ab&&(a.ab=b,"s-"===a.ab.substr(0,2)&&bd.set("host:"+a.host,a.ab))}
	function fd(a,b,c){O("string"===typeof b,"typeof type must == string");O("object"===typeof c,"typeof params must == object");if(b===gd)b=(a.ob?"wss://":"ws://")+a.ab+"/.ws?";else if(b===hd)b=(a.ob?"https://":"http://")+a.ab+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.ab&&(c.ns=a.lc);var d=[];v(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}dd.prototype.toString=function(){var a=(this.ob?"https://":"http://")+this.host;this.Rd&&(a+="<"+this.Rd+">");return a};var id=function(){var a=1;return function(){return a++}}(),O=Kb,jd=Lb;
	function kd(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{ob();for(var c=mb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],g=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==g||null==k||null==m)throw Error();d.push(f<<2|g>>4);64!=k&&(d.push(g<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ua(d,c,
	c+8192));b=a}}return b}catch(l){fc("base64Decode failed: ",l)}return null}function ld(a){var b=Ob(a);a=new Ja;a.update(b);var b=[],c=8*a.ge;56>a.ec?a.update(a.Od,56-a.ec):a.update(a.Od,a.Ya-(a.ec-56));for(var d=a.Ya-1;56<=d;d--)a.pe[d]=c&255,c/=256;Ka(a,a.pe);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.P[d]>>e&255,++c;return nb(b)}
	function md(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+md.apply(null,arguments[c]):"object"===typeof arguments[c]?b+G(arguments[c]):b+arguments[c],b+=" ";return b}var ec=null,nd=!0;
	function od(a,b){Kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?ec=u(console.log,console):"object"===typeof console.log&&(ec=function(a){console.log(a)})),b&&cd.set("logging_enabled",!0)):r(a)?ec=a:(ec=null,cd.remove("logging_enabled"))}function fc(a){!0===nd&&(nd=!1,null===ec&&!0===cd.get("logging_enabled")&&od(!0));if(ec){var b=md.apply(null,arguments);ec(b)}}
	function pd(a){return function(){fc(a,arguments)}}function qd(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+md.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function rd(a){var b=md.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function S(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+md.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function sd(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(q(a)){var m=a.indexOf("//");0<=m&&(g=a.substring(0,m-1),a=a.substring(m+2));m=a.indexOf("/");-1===m&&(m=a.length);b=a.substring(0,m);e="";a=a.substring(m).split("/");for(m=0;m<a.length;m++)if(0<a[m].length){var l=a[m];try{l=decodeURIComponent(l.replace(/\+/g," "))}catch(t){}e+="/"+l}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);m=b.indexOf(":");0<=m&&(f="https"===g||"wss"===g,k=b.substring(m+1),isFinite(k)&&
	(k=String(k)),k=q(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,eh:d,ob:f,scheme:g,bd:e}}function td(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function ud(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function yc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=vd(a),d=vd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function wd(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+G(b));}
	function xd(a){if("object"!==typeof a||null===a)return G(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=G(b[d]),c+=":",c+=xd(a[b[d]]);return c+"}"}function yd(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function zd(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else v(a,b)}
	function Ad(a){O(!td(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var Bd=/^-?\d{1,10}$/;function vd(a){return Bd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function gc(a){try{a()}catch(b){setTimeout(function(){S("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function T(a,b){if(r(a)){var c=Array.prototype.slice.call(arguments,1).slice();gc(function(){a.apply(null,c)})}};function Cd(a){var b={},c={},d={},e="";try{var f=a.split("."),b=Rb(kd(f[0])||""),c=Rb(kd(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(g){}return{kh:b,Ec:c,data:d,ah:e}}function Dd(a){a=Cd(a).Ec;return"object"===typeof a&&a.hasOwnProperty("iat")?z(a,"iat"):null}function Ed(a){a=Cd(a);var b=a.Ec;return!!a.ah&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function Fd(a){this.Y=a;this.g=a.n.g}function Gd(a,b,c,d){var e=[],f=[];Ma(b,function(b){"child_changed"===b.type&&a.g.Dd(b.Oe,b.Na)&&f.push(new J("child_moved",b.Na,b.Za))});Hd(a,e,"child_removed",b,d,c);Hd(a,e,"child_added",b,d,c);Hd(a,e,"child_moved",f,d,c);Hd(a,e,"child_changed",b,d,c);Hd(a,e,ic,b,d,c);return e}function Hd(a,b,c,d,e,f){d=Na(d,function(a){return a.type===c});Va(d,u(a.qg,a));Ma(d,function(c){var d=Id(a,c,f);Ma(e,function(e){e.Qf(c.type)&&b.push(e.createEvent(d,a.Y))})})}
	function Id(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Td=c.wf(b.Za,b.Na,a.g));return b}Fd.prototype.qg=function(a,b){if(null==a.Za||null==b.Za)throw jd("Should only compare child_ events.");return this.g.compare(new L(a.Za,a.Na),new L(b.Za,b.Na))};function Jd(){this.ib={}}
	function Kd(a,b){var c=b.type,d=b.Za;O("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");O(".priority"!==d,"Only non-priority child changes can be tracked.");var e=z(a.ib,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.ib[d]=new J("child_changed",b.Na,d,e.Na);else if("child_removed"==c&&"child_added"==f)delete a.ib[d];else if("child_removed"==c&&"child_changed"==f)a.ib[d]=new J("child_removed",e.Oe,d);else if("child_changed"==c&&
	"child_added"==f)a.ib[d]=new J("child_added",b.Na,d);else if("child_changed"==c&&"child_changed"==f)a.ib[d]=new J("child_changed",b.Na,d,e.Oe);else throw jd("Illegal combination of changes: "+b+" occurred after "+e);}else a.ib[d]=b};function Ld(a){this.g=a}h=Ld.prototype;h.H=function(a,b,c,d,e,f){O(a.Mc(this.g),"A node must be indexed if only a child is updated");e=a.T(b);if(e.S(d).ea(c.S(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?Kd(f,new J("child_removed",e,b)):O(a.L(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Kd(f,new J("child_added",c,b)):Kd(f,new J("child_changed",c,b,e)));return a.L()&&c.e()?a:a.W(b,c).pb(this.g)};
	h.ya=function(a,b,c){null!=c&&(a.L()||a.R(R,function(a,e){b.Fa(a)||Kd(c,new J("child_removed",e,a))}),b.L()||b.R(R,function(b,e){if(a.Fa(b)){var f=a.T(b);f.ea(e)||Kd(c,new J("child_changed",e,b,f))}else Kd(c,new J("child_added",e,b))}));return b.pb(this.g)};h.ia=function(a,b){return a.e()?H:a.ia(b)};h.Ra=function(){return!1};h.$b=function(){return this};function Md(a){this.Fe=new Ld(a.g);this.g=a.g;var b;a.oa?(b=Nd(a),b=a.g.Sc(Od(a),b)):b=a.g.Wc();this.gd=b;a.ra?(b=Pd(a),a=a.g.Sc(Rd(a),b)):a=a.g.Tc();this.Jc=a}h=Md.prototype;h.matches=function(a){return 0>=this.g.compare(this.gd,a)&&0>=this.g.compare(a,this.Jc)};h.H=function(a,b,c,d,e,f){this.matches(new L(b,c))||(c=H);return this.Fe.H(a,b,c,d,e,f)};
	h.ya=function(a,b,c){b.L()&&(b=H);var d=b.pb(this.g),d=d.ia(H),e=this;b.R(R,function(a,b){e.matches(new L(a,b))||(d=d.W(a,H))});return this.Fe.ya(a,d,c)};h.ia=function(a){return a};h.Ra=function(){return!0};h.$b=function(){return this.Fe};function Sd(a){this.ua=new Md(a);this.g=a.g;O(a.la,"Only valid if limit has been set");this.ma=a.ma;this.Nb=!Td(a)}h=Sd.prototype;h.H=function(a,b,c,d,e,f){this.ua.matches(new L(b,c))||(c=H);return a.T(b).ea(c)?a:a.Hb()<this.ma?this.ua.$b().H(a,b,c,d,e,f):Ud(this,a,b,c,e,f)};
	h.ya=function(a,b,c){var d;if(b.L()||b.e())d=H.pb(this.g);else if(2*this.ma<b.Hb()&&b.Mc(this.g)){d=H.pb(this.g);b=this.Nb?b.dc(this.ua.Jc,this.g):b.bc(this.ua.gd,this.g);for(var e=0;0<b.Ta.length&&e<this.ma;){var f=Ic(b),g;if(g=this.Nb?0>=this.g.compare(this.ua.gd,f):0>=this.g.compare(f,this.ua.Jc))d=d.W(f.name,f.U),e++;else break}}else{d=b.pb(this.g);d=d.ia(H);var k,m,l;if(this.Nb){b=d.xf(this.g);k=this.ua.Jc;m=this.ua.gd;var t=Vd(this.g);l=function(a,b){return t(b,a)}}else b=d.ac(this.g),k=this.ua.gd,
	m=this.ua.Jc,l=Vd(this.g);for(var e=0,A=!1;0<b.Ta.length;)f=Ic(b),!A&&0>=l(k,f)&&(A=!0),(g=A&&e<this.ma&&0>=l(f,m))?e++:d=d.W(f.name,H)}return this.ua.$b().ya(a,d,c)};h.ia=function(a){return a};h.Ra=function(){return!0};h.$b=function(){return this.ua.$b()};
	function Ud(a,b,c,d,e,f){var g;if(a.Nb){var k=Vd(a.g);g=function(a,b){return k(b,a)}}else g=Vd(a.g);O(b.Hb()==a.ma,"");var m=new L(c,d),l=a.Nb?Wd(b,a.g):Xd(b,a.g),t=a.ua.matches(m);if(b.Fa(c)){for(var A=b.T(c),l=e.Ce(a.g,l,a.Nb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.Ce(a.g,l,a.Nb);e=null==l?1:g(l,m);if(t&&!d.e()&&0<=e)return null!=f&&Kd(f,new J("child_changed",d,c,A)),b.W(c,d);null!=f&&Kd(f,new J("child_removed",A,c));b=b.W(c,H);return null!=l&&a.ua.matches(l)?(null!=f&&Kd(f,new J("child_added",
	l.U,l.name)),b.W(l.name,l.U)):b}return d.e()?b:t&&0<=g(l,m)?(null!=f&&(Kd(f,new J("child_removed",l.U,l.name)),Kd(f,new J("child_added",d,c))),b.W(c,d).W(l.name,H)):b};function Yd(a,b){this.me=a;this.og=b}function Zd(a){this.X=a}
	Zd.prototype.gb=function(a,b,c,d){var e=new Jd,f;if(b.type===Bc)b.source.Ae?c=$d(this,a,b.path,b.Ja,c,d,e):(O(b.source.tf,"Unknown source."),f=b.source.ef||mc(a.w())&&!b.path.e(),c=ae(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===be)b.source.Ae?c=ce(this,a,b.path,b.children,c,d,e):(O(b.source.tf,"Unknown source."),f=b.source.ef||mc(a.w()),c=de(this,a,b.path,b.children,c,d,f,e));else if(b.type===ee)if(b.Yd)if(b=b.path,null!=c.xc(b))c=a;else{f=new Vb(c,a,d);d=a.Q.j();if(b.e()||".priority"===K(b))lc(a.w())?
	b=c.Aa(Yb(a)):(b=a.w().j(),O(b instanceof fe,"serverChildren would be complete if leaf node"),b=c.Cc(b)),b=this.X.ya(d,b,e);else{var g=K(b),k=c.Bc(g,a.w());null==k&&Wb(a.w(),g)&&(k=d.T(g));b=null!=k?this.X.H(d,g,k,N(b),f,e):a.Q.j().Fa(g)?this.X.H(d,g,H,N(b),f,e):d;b.e()&&lc(a.w())&&(d=c.Aa(Yb(a)),d.L()&&(b=this.X.ya(b,d,e)))}d=lc(a.w())||null!=c.xc(M);c=ge(a,b,d,this.X.Ra())}else c=he(this,a,b.path,b.Ub,c,d,e);else if(b.type===Dc)d=b.path,b=a.w(),f=b.j(),g=b.ga||d.e(),c=ie(this,new je(a.Q,new Xb(f,
	g,b.Yb)),d,c,Ub,e);else throw jd("Unknown operation type: "+b.type);e=qa(e.ib);d=c;b=d.Q;b.ga&&(f=b.j().L()||b.j().e(),g=ke(a),(0<e.length||!a.Q.ga||f&&!b.j().ea(g)||!b.j().C().ea(g.C()))&&e.push(hc(ke(d))));return new Yd(c,e)};
	function ie(a,b,c,d,e,f){var g=b.Q;if(null!=d.xc(c))return b;var k;if(c.e())O(lc(b.w()),"If change path is empty, we must have complete server data"),mc(b.w())?(e=Yb(b),d=d.Cc(e instanceof fe?e:H)):d=d.Aa(Yb(b)),f=a.X.ya(b.Q.j(),d,f);else{var m=K(c);if(".priority"==m)O(1==le(c),"Can't have a priority with additional path components"),f=g.j(),k=b.w().j(),d=d.nd(c,f,k),f=null!=d?a.X.ia(f,d):g.j();else{var l=N(c);Wb(g,m)?(k=b.w().j(),d=d.nd(c,g.j(),k),d=null!=d?g.j().T(m).H(l,d):g.j().T(m)):d=d.Bc(m,
	b.w());f=null!=d?a.X.H(g.j(),m,d,l,e,f):g.j()}}return ge(b,f,g.ga||c.e(),a.X.Ra())}function ae(a,b,c,d,e,f,g,k){var m=b.w();g=g?a.X:a.X.$b();if(c.e())d=g.ya(m.j(),d,null);else if(g.Ra()&&!m.Yb)d=m.j().H(c,d),d=g.ya(m.j(),d,null);else{var l=K(c);if(!nc(m,c)&&1<le(c))return b;var t=N(c);d=m.j().T(l).H(t,d);d=".priority"==l?g.ia(m.j(),d):g.H(m.j(),l,d,t,Ub,null)}m=m.ga||c.e();b=new je(b.Q,new Xb(d,m,g.Ra()));return ie(a,b,c,e,new Vb(e,b,f),k)}
	function $d(a,b,c,d,e,f,g){var k=b.Q;e=new Vb(e,b,f);if(c.e())g=a.X.ya(b.Q.j(),d,g),a=ge(b,g,!0,a.X.Ra());else if(f=K(c),".priority"===f)g=a.X.ia(b.Q.j(),d),a=ge(b,g,k.ga,k.Yb);else{c=N(c);var m=k.j().T(f);if(!c.e()){var l=e.uf(f);d=null!=l?".priority"===me(c)&&l.S(c.parent()).e()?l:l.H(c,d):H}m.ea(d)?a=b:(g=a.X.H(k.j(),f,d,c,e,g),a=ge(b,g,k.ga,a.X.Ra()))}return a}
	function ce(a,b,c,d,e,f,g){var k=b;ne(d,function(d,l){var t=c.o(d);Wb(b.Q,K(t))&&(k=$d(a,k,t,l,e,f,g))});ne(d,function(d,l){var t=c.o(d);Wb(b.Q,K(t))||(k=$d(a,k,t,l,e,f,g))});return k}function oe(a,b){ne(b,function(b,d){a=a.H(b,d)});return a}
	function de(a,b,c,d,e,f,g,k){if(b.w().j().e()&&!lc(b.w()))return b;var m=b;c=c.e()?d:pe(qe,c,d);var l=b.w().j();c.children.ka(function(c,d){if(l.Fa(c)){var I=b.w().j().T(c),I=oe(I,d);m=ae(a,m,new P(c),I,e,f,g,k)}});c.children.ka(function(c,d){var I=!Wb(b.w(),c)&&null==d.value;l.Fa(c)||I||(I=b.w().j().T(c),I=oe(I,d),m=ae(a,m,new P(c),I,e,f,g,k))});return m}
	function he(a,b,c,d,e,f,g){if(null!=e.xc(c))return b;var k=mc(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.ga||nc(m,c))return ae(a,b,c,m.j().S(c),e,f,k,g);if(c.e()){var l=qe;m.j().R(re,function(a,b){l=l.set(new P(a),b)});return de(a,b,c,l,e,f,k,g)}return b}l=qe;ne(d,function(a){var b=c.o(a);nc(m,b)&&(l=l.set(a,m.j().S(b)))});return de(a,b,c,l,e,f,k,g)};function se(){}var te={};function Vd(a){return u(a.compare,a)}se.prototype.Dd=function(a,b){return 0!==this.compare(new L("[MIN_NAME]",a),new L("[MIN_NAME]",b))};se.prototype.Wc=function(){return ue};function ve(a){O(!a.e()&&".priority"!==K(a),"Can't create PathIndex with empty path or .priority key");this.gc=a}ka(ve,se);h=ve.prototype;h.Lc=function(a){return!a.S(this.gc).e()};h.compare=function(a,b){var c=a.U.S(this.gc),d=b.U.S(this.gc),c=c.Gc(d);return 0===c?yc(a.name,b.name):c};
	h.Sc=function(a,b){var c=Q(a),c=H.H(this.gc,c);return new L(b,c)};h.Tc=function(){var a=H.H(this.gc,we);return new L("[MAX_NAME]",a)};h.toString=function(){return this.gc.slice().join("/")};function xe(){}ka(xe,se);h=xe.prototype;h.compare=function(a,b){var c=a.U.C(),d=b.U.C(),c=c.Gc(d);return 0===c?yc(a.name,b.name):c};h.Lc=function(a){return!a.C().e()};h.Dd=function(a,b){return!a.C().ea(b.C())};h.Wc=function(){return ue};h.Tc=function(){return new L("[MAX_NAME]",new Yc("[PRIORITY-POST]",we))};
	h.Sc=function(a,b){var c=Q(a);return new L(b,new Yc("[PRIORITY-POST]",c))};h.toString=function(){return".priority"};var R=new xe;function ye(){}ka(ye,se);h=ye.prototype;h.compare=function(a,b){return yc(a.name,b.name)};h.Lc=function(){throw jd("KeyIndex.isDefinedOn not expected to be called.");};h.Dd=function(){return!1};h.Wc=function(){return ue};h.Tc=function(){return new L("[MAX_NAME]",H)};h.Sc=function(a){O(q(a),"KeyIndex indexValue must always be a string.");return new L(a,H)};h.toString=function(){return".key"};
	var re=new ye;function ze(){}ka(ze,se);h=ze.prototype;h.compare=function(a,b){var c=a.U.Gc(b.U);return 0===c?yc(a.name,b.name):c};h.Lc=function(){return!0};h.Dd=function(a,b){return!a.ea(b)};h.Wc=function(){return ue};h.Tc=function(){return Ae};h.Sc=function(a,b){var c=Q(a);return new L(b,c)};h.toString=function(){return".value"};var Be=new ze;function Ce(){this.Xb=this.ra=this.Pb=this.oa=this.la=!1;this.ma=0;this.Rb="";this.ic=null;this.Bb="";this.fc=null;this.zb="";this.g=R}var De=new Ce;function Td(a){return""===a.Rb?a.oa:"l"===a.Rb}function Od(a){O(a.oa,"Only valid if start has been set");return a.ic}function Nd(a){O(a.oa,"Only valid if start has been set");return a.Pb?a.Bb:"[MIN_NAME]"}function Rd(a){O(a.ra,"Only valid if end has been set");return a.fc}
	function Pd(a){O(a.ra,"Only valid if end has been set");return a.Xb?a.zb:"[MAX_NAME]"}function Ee(a){var b=new Ce;b.la=a.la;b.ma=a.ma;b.oa=a.oa;b.ic=a.ic;b.Pb=a.Pb;b.Bb=a.Bb;b.ra=a.ra;b.fc=a.fc;b.Xb=a.Xb;b.zb=a.zb;b.g=a.g;return b}h=Ce.prototype;h.Le=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="";return b};h.Me=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="l";return b};h.Ne=function(a){var b=Ee(this);b.la=!0;b.ma=a;b.Rb="r";return b};
	h.ce=function(a,b){var c=Ee(this);c.oa=!0;p(a)||(a=null);c.ic=a;null!=b?(c.Pb=!0,c.Bb=b):(c.Pb=!1,c.Bb="");return c};h.vd=function(a,b){var c=Ee(this);c.ra=!0;p(a)||(a=null);c.fc=a;p(b)?(c.Xb=!0,c.zb=b):(c.mh=!1,c.zb="");return c};function Fe(a,b){var c=Ee(a);c.g=b;return c}function Ge(a){var b={};a.oa&&(b.sp=a.ic,a.Pb&&(b.sn=a.Bb));a.ra&&(b.ep=a.fc,a.Xb&&(b.en=a.zb));if(a.la){b.l=a.ma;var c=a.Rb;""===c&&(c=Td(a)?"l":"r");b.vf=c}a.g!==R&&(b.i=a.g.toString());return b}
	function He(a){return!(a.oa||a.ra||a.la)}function Ie(a){return He(a)&&a.g==R}function Je(a){var b={};if(Ie(a))return b;var c;a.g===R?c="$priority":a.g===Be?c="$value":a.g===re?c="$key":(O(a.g instanceof ve,"Unrecognized index type!"),c=a.g.toString());b.orderBy=G(c);a.oa&&(b.startAt=G(a.ic),a.Pb&&(b.startAt+=","+G(a.Bb)));a.ra&&(b.endAt=G(a.fc),a.Xb&&(b.endAt+=","+G(a.zb)));a.la&&(Td(a)?b.limitToFirst=a.ma:b.limitToLast=a.ma);return b}h.toString=function(){return G(Ge(this))};function Ke(a,b){this.Ed=a;this.hc=b}Ke.prototype.get=function(a){var b=z(this.Ed,a);if(!b)throw Error("No index defined for "+a);return b===te?null:b};function Le(a,b,c){var d=ma(a.Ed,function(d,f){var g=z(a.hc,f);O(g,"Missing index implementation for "+f);if(d===te){if(g.Lc(b.U)){for(var k=[],m=c.ac(wc),l=Ic(m);l;)l.name!=b.name&&k.push(l),l=Ic(m);k.push(b);return Me(k,Vd(g))}return te}g=c.get(b.name);k=d;g&&(k=k.remove(new L(b.name,g)));return k.Sa(b,b.U)});return new Ke(d,a.hc)}
	function Ne(a,b,c){var d=ma(a.Ed,function(a){if(a===te)return a;var d=c.get(b.name);return d?a.remove(new L(b.name,d)):a});return new Ke(d,a.hc)}var Oe=new Ke({".priority":te},{".priority":R});function Yc(a,b){this.B=a;O(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.ca=b||H;Pe(this.ca);this.Gb=null}var Qe=["object","boolean","number","string"];h=Yc.prototype;h.L=function(){return!0};h.C=function(){return this.ca};h.ia=function(a){return new Yc(this.B,a)};h.T=function(a){return".priority"===a?this.ca:H};h.S=function(a){return a.e()?this:".priority"===K(a)?this.ca:H};h.Fa=function(){return!1};h.wf=function(){return null};
	h.W=function(a,b){return".priority"===a?this.ia(b):b.e()&&".priority"!==a?this:H.W(a,b).ia(this.ca)};h.H=function(a,b){var c=K(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;O(".priority"!==c||1===le(a),".priority must be the last token in a path");return this.W(c,H.H(N(a),b))};h.e=function(){return!1};h.Hb=function(){return 0};h.R=function(){return!1};h.J=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().J()}:this.Ea()};
	h.hash=function(){if(null===this.Gb){var a="";this.ca.e()||(a+="priority:"+Re(this.ca.J())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Ad(this.B):a+this.B;this.Gb=ld(a)}return this.Gb};h.Ea=function(){return this.B};h.Gc=function(a){if(a===H)return 1;if(a instanceof fe)return-1;O(a.L(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=La(Qe,b),e=La(Qe,c);O(0<=d,"Unknown leaf type: "+b);O(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	h.pb=function(){return this};h.Mc=function(){return!0};h.ea=function(a){return a===this?!0:a.L()?this.B===a.B&&this.ca.ea(a.ca):!1};h.toString=function(){return G(this.J(!0))};function fe(a,b,c){this.m=a;(this.ca=b)&&Pe(this.ca);a.e()&&O(!this.ca||this.ca.e(),"An empty node cannot have a priority");this.Ab=c;this.Gb=null}h=fe.prototype;h.L=function(){return!1};h.C=function(){return this.ca||H};h.ia=function(a){return this.m.e()?this:new fe(this.m,a,this.Ab)};h.T=function(a){if(".priority"===a)return this.C();a=this.m.get(a);return null===a?H:a};h.S=function(a){var b=K(a);return null===b?this:this.T(b).S(N(a))};h.Fa=function(a){return null!==this.m.get(a)};
	h.W=function(a,b){O(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ia(b);var c=new L(a,b),d,e;b.e()?(d=this.m.remove(a),c=Ne(this.Ab,c,this.m)):(d=this.m.Sa(a,b),c=Le(this.Ab,c,this.m));e=d.e()?H:this.ca;return new fe(d,e,c)};h.H=function(a,b){var c=K(a);if(null===c)return b;O(".priority"!==K(a)||1===le(a),".priority must be the last token in a path");var d=this.T(c).H(N(a),b);return this.W(c,d)};h.e=function(){return this.m.e()};h.Hb=function(){return this.m.count()};
	var Se=/^(0|[1-9]\d*)$/;h=fe.prototype;h.J=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.R(R,function(f,g){b[f]=g.J(a);c++;e&&Se.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.C().e()&&(b[".priority"]=this.C().J());return b};h.hash=function(){if(null===this.Gb){var a="";this.C().e()||(a+="priority:"+Re(this.C().J())+":");this.R(R,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Gb=""===a?"":ld(a)}return this.Gb};
	h.wf=function(a,b,c){return(c=Te(this,c))?(a=Gc(c,new L(a,b)))?a.name:null:Gc(this.m,a)};function Wd(a,b){var c;c=(c=Te(a,b))?(c=c.Vc())&&c.name:a.m.Vc();return c?new L(c,a.m.get(c)):null}function Xd(a,b){var c;c=(c=Te(a,b))?(c=c.jc())&&c.name:a.m.jc();return c?new L(c,a.m.get(c)):null}h.R=function(a,b){var c=Te(this,a);return c?c.ka(function(a){return b(a.name,a.U)}):this.m.ka(b)};h.ac=function(a){return this.bc(a.Wc(),a)};
	h.bc=function(a,b){var c=Te(this,b);if(c)return c.bc(a,function(a){return a});for(var c=this.m.bc(a.name,wc),d=Jc(c);null!=d&&0>b.compare(d,a);)Ic(c),d=Jc(c);return c};h.xf=function(a){return this.dc(a.Tc(),a)};h.dc=function(a,b){var c=Te(this,b);if(c)return c.dc(a,function(a){return a});for(var c=this.m.dc(a.name,wc),d=Jc(c);null!=d&&0<b.compare(d,a);)Ic(c),d=Jc(c);return c};h.Gc=function(a){return this.e()?a.e()?0:-1:a.L()||a.e()?1:a===we?-1:0};
	h.pb=function(a){if(a===re||sa(this.Ab.hc,a.toString()))return this;var b=this.Ab,c=this.m;O(a!==re,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.ac(wc),f=Ic(c);f;)e=e||a.Lc(f.U),d.push(f),f=Ic(c);d=e?Me(d,Vd(a)):te;e=a.toString();c=wa(b.hc);c[e]=a;a=wa(b.Ed);a[e]=d;return new fe(this.m,this.ca,new Ke(a,c))};h.Mc=function(a){return a===re||sa(this.Ab.hc,a.toString())};
	h.ea=function(a){if(a===this)return!0;if(a.L())return!1;if(this.C().ea(a.C())&&this.m.count()===a.m.count()){var b=this.ac(R);a=a.ac(R);for(var c=Ic(b),d=Ic(a);c&&d;){if(c.name!==d.name||!c.U.ea(d.U))return!1;c=Ic(b);d=Ic(a)}return null===c&&null===d}return!1};function Te(a,b){return b===re?null:a.Ab.get(b.toString())}h.toString=function(){return G(this.J(!0))};function Q(a,b){if(null===a)return H;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);O(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Yc(a,Q(c));if(a instanceof Array){var d=H,e=a;v(e,function(a,b){if(y(e,b)&&"."!==b.substring(0,1)){var c=Q(a);if(c.L()||!c.e())d=
	d.W(b,c)}});return d.ia(Q(c))}var f=[],g=!1,k=a;Fb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=Q(k[a]);b.e()||(g=g||!b.C().e(),f.push(new L(a,b)))}});if(0==f.length)return H;var m=Me(f,xc,function(a){return a.name},zc);if(g){var l=Me(f,Vd(R));return new fe(m,Q(c),new Ke({".priority":l},{".priority":R}))}return new fe(m,Q(c),Oe)}var Ue=Math.log(2);
	function Ve(a){this.count=parseInt(Math.log(a+1)/Ue,10);this.nf=this.count-1;this.ng=a+1&parseInt(Array(this.count+1).join("1"),2)}function We(a){var b=!(a.ng&1<<a.nf);a.nf--;return b}
	function Me(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],t=c?c(l):l;return new Kc(t,l.U,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),A=e(l+1,d),l=a[l],t=c?c(l):l;return new Kc(t,l.U,!1,f,A)}a.sort(b);var f=function(b){function d(b,g){var k=t-b,A=t;t-=b;var A=e(k+1,A),k=a[k],I=c?c(k):k,A=new Kc(I,k.U,g,null,A);f?f.left=A:l=A;f=A}for(var f=null,l=null,t=a.length,A=0;A<b.count;++A){var I=We(b),Qd=Math.pow(2,b.count-(A+1));I?d(Qd,!1):(d(Qd,!1),d(Qd,!0))}return l}(new Ve(a.length));
	return null!==f?new Ec(d||b,f):new Ec(d||b)}function Re(a){return"number"===typeof a?"number:"+Ad(a):"string:"+a}function Pe(a){if(a.L()){var b=a.J();O("string"===typeof b||"number"===typeof b||"object"===typeof b&&y(b,".sv"),"Priority must be a string or number.")}else O(a===we||a.e(),"priority of unexpected type.");O(a===we||a.C().e(),"Priority nodes can't have a priority of their own.")}var H=new fe(new Ec(zc),null,Oe);function Xe(){fe.call(this,new Ec(zc),H,Oe)}ka(Xe,fe);h=Xe.prototype;
	h.Gc=function(a){return a===this?0:1};h.ea=function(a){return a===this};h.C=function(){return this};h.T=function(){return H};h.e=function(){return!1};var we=new Xe,ue=new L("[MIN_NAME]",H),Ae=new L("[MAX_NAME]",we);function je(a,b){this.Q=a;this.ae=b}function ge(a,b,c,d){return new je(new Xb(b,c,d),a.ae)}function ke(a){return a.Q.ga?a.Q.j():null}je.prototype.w=function(){return this.ae};function Yb(a){return a.ae.ga?a.ae.j():null};function Ye(a,b){this.Y=a;var c=a.n,d=new Ld(c.g),c=He(c)?new Ld(c.g):c.la?new Sd(c):new Md(c);this.Nf=new Zd(c);var e=b.w(),f=b.Q,g=d.ya(H,e.j(),null),k=c.ya(H,f.j(),null);this.Oa=new je(new Xb(k,f.ga,c.Ra()),new Xb(g,e.ga,d.Ra()));this.$a=[];this.ug=new Fd(a)}function Ze(a){return a.Y}h=Ye.prototype;h.w=function(){return this.Oa.w().j()};h.kb=function(a){var b=Yb(this.Oa);return b&&(He(this.Y.n)||!a.e()&&!b.T(K(a)).e())?b.S(a):null};h.e=function(){return 0===this.$a.length};h.Tb=function(a){this.$a.push(a)};
	h.nb=function(a,b){var c=[];if(b){O(null==a,"A cancel should cancel all event registrations.");var d=this.Y.path;Ma(this.$a,function(a){(a=a.lf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.$a.length;++f){var g=this.$a[f];if(!g.matches(a))e.push(g);else if(a.yf()){e=e.concat(this.$a.slice(f+1));break}}this.$a=e}else this.$a=[];return c};
	h.gb=function(a,b,c){a.type===be&&null!==a.source.Lb&&(O(Yb(this.Oa),"We should always have a full cache before handling merges"),O(ke(this.Oa),"Missing event cache, even though we have a server cache"));var d=this.Oa;a=this.Nf.gb(d,a,b,c);b=this.Nf;c=a.me;O(c.Q.j().Mc(b.X.g),"Event snap not indexed");O(c.w().j().Mc(b.X.g),"Server snap not indexed");O(lc(a.me.w())||!lc(d.w()),"Once a server snap is complete, it should never go back");this.Oa=a.me;return $e(this,a.og,a.me.Q.j(),null)};
	function af(a,b){var c=a.Oa.Q,d=[];c.j().L()||c.j().R(R,function(a,b){d.push(new J("child_added",b,a))});c.ga&&d.push(hc(c.j()));return $e(a,d,c.j(),b)}function $e(a,b,c,d){return Gd(a.ug,b,c,d?[d]:a.$a)};function bf(a,b,c){this.type=be;this.source=a;this.path=b;this.children=c}bf.prototype.$c=function(a){if(this.path.e())return a=this.children.subtree(new P(a)),a.e()?null:a.value?new Ac(this.source,M,a.value):new bf(this.source,M,a);O(K(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new bf(this.source,N(this.path),this.children)};bf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function cf(a,b){this.f=pd("p:rest:");this.G=a;this.Kb=b;this.Ca=null;this.ba={}}function df(a,b){if(p(b))return"tag$"+b;O(Ie(a.n),"should have a tag if it's not a default query.");return a.path.toString()}h=cf.prototype;
	h.Cf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.wa());var f=df(a,c),g={};this.ba[f]=g;a=Je(a.n);var k=this;ef(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Kb(e,t,!1,c);z(k.ba,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.$f=function(a,b){var c=df(a,b);delete this.ba[c]};h.O=function(a,b){this.Ca=a;var c=Cd(a),d=c.data,c=c.Ec&&c.Ec.exp;b&&b("ok",{auth:d,expires:c})};h.je=function(a){this.Ca=null;a("ok",null)};
	h.Qe=function(){};h.Gf=function(){};h.Md=function(){};h.put=function(){};h.Df=function(){};h.Ye=function(){};
	function ef(a,b,c,d){c=c||{};c.format="export";a.Ca&&(c.auth=a.Ca);var e=(a.G.ob?"https://":"http://")+a.G.host+b+"?"+Ib(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=Rb(f.responseText)}catch(c){S("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
	f.status&&S("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function ff(a){O(da(a)&&0<a.length,"Requires a non-empty array");this.fg=a;this.Rc={}}ff.prototype.ie=function(a,b){var c;c=this.Rc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Dc.apply(c[d].Qa,Array.prototype.slice.call(arguments,1))};ff.prototype.Ib=function(a,b,c){gf(this,a);this.Rc[a]=this.Rc[a]||[];this.Rc[a].push({Dc:b,Qa:c});(a=this.Ee(a))&&b.apply(c,a)};
	ff.prototype.mc=function(a,b,c){gf(this,a);a=this.Rc[a]||[];for(var d=0;d<a.length;d++)if(a[d].Dc===b&&(!c||c===a[d].Qa)){a.splice(d,1);break}};function gf(a,b){O(Ra(a.fg,function(a){return a===b}),"Unknown event: "+b)};var hf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);O(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);O(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function jf(){ff.call(this,["online"]);this.oc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.oc||(a.oc=!0,a.ie("online",!0))},!1);window.addEventListener("offline",function(){a.oc&&(a.oc=!1,a.ie("online",!1))},!1)}}ka(jf,ff);jf.prototype.Ee=function(a){O("online"===a,"Unknown event type: "+a);return[this.oc]};ba(jf);function kf(){ff.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Sb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Sb&&(c.Sb=b,c.ie("visible",b))},!1)}}ka(kf,ff);kf.prototype.Ee=function(a){O("visible"===a,"Unknown event type: "+a);return[this.Sb]};ba(kf);function P(a,b){if(1==arguments.length){this.u=a.split("/");for(var c=0,d=0;d<this.u.length;d++)0<this.u[d].length&&(this.u[c]=this.u[d],c++);this.u.length=c;this.aa=0}else this.u=a,this.aa=b}function lf(a,b){var c=K(a);if(null===c)return b;if(c===K(b))return lf(N(a),N(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function mf(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=yc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function K(a){return a.aa>=a.u.length?null:a.u[a.aa]}function le(a){return a.u.length-a.aa}function N(a){var b=a.aa;b<a.u.length&&b++;return new P(a.u,b)}function me(a){return a.aa<a.u.length?a.u[a.u.length-1]:null}h=P.prototype;
	h.toString=function(){for(var a="",b=this.aa;b<this.u.length;b++)""!==this.u[b]&&(a+="/"+this.u[b]);return a||"/"};h.slice=function(a){return this.u.slice(this.aa+(a||0))};h.parent=function(){if(this.aa>=this.u.length)return null;for(var a=[],b=this.aa;b<this.u.length-1;b++)a.push(this.u[b]);return new P(a,0)};
	h.o=function(a){for(var b=[],c=this.aa;c<this.u.length;c++)b.push(this.u[c]);if(a instanceof P)for(c=a.aa;c<a.u.length;c++)b.push(a.u[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new P(b,0)};h.e=function(){return this.aa>=this.u.length};h.ea=function(a){if(le(this)!==le(a))return!1;for(var b=this.aa,c=a.aa;b<=this.u.length;b++,c++)if(this.u[b]!==a.u[c])return!1;return!0};
	h.contains=function(a){var b=this.aa,c=a.aa;if(le(this)>le(a))return!1;for(;b<this.u.length;){if(this.u[b]!==a.u[c])return!1;++b;++c}return!0};var M=new P("");function nf(a,b){this.Ua=a.slice();this.Ka=Math.max(1,this.Ua.length);this.pf=b;for(var c=0;c<this.Ua.length;c++)this.Ka+=Pb(this.Ua[c]);of(this)}nf.prototype.push=function(a){0<this.Ua.length&&(this.Ka+=1);this.Ua.push(a);this.Ka+=Pb(a);of(this)};nf.prototype.pop=function(){var a=this.Ua.pop();this.Ka-=Pb(a);0<this.Ua.length&&--this.Ka};
	function of(a){if(768<a.Ka)throw Error(a.pf+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ua.length)throw Error(a.pf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+pf(a));}function pf(a){return 0==a.Ua.length?"":"in property '"+a.Ua.join(".")+"'"};function qf(a,b){this.value=a;this.children=b||rf}var rf=new Ec(function(a,b){return a===b?0:a<b?-1:1});function sf(a){var b=qe;v(a,function(a,d){b=b.set(new P(d),a)});return b}h=qf.prototype;h.e=function(){return null===this.value&&this.children.e()};function tf(a,b,c){if(null!=a.value&&c(a.value))return{path:M,value:a.value};if(b.e())return null;var d=K(b);a=a.children.get(d);return null!==a?(b=tf(a,N(b),c),null!=b?{path:(new P(d)).o(b.path),value:b.value}:null):null}
	function uf(a,b){return tf(a,b,function(){return!0})}h.subtree=function(a){if(a.e())return this;var b=this.children.get(K(a));return null!==b?b.subtree(N(a)):qe};h.set=function(a,b){if(a.e())return new qf(b,this.children);var c=K(a),d=(this.children.get(c)||qe).set(N(a),b),c=this.children.Sa(c,d);return new qf(this.value,c)};
	h.remove=function(a){if(a.e())return this.children.e()?qe:new qf(null,this.children);var b=K(a),c=this.children.get(b);return c?(a=c.remove(N(a)),b=a.e()?this.children.remove(b):this.children.Sa(b,a),null===this.value&&b.e()?qe:new qf(this.value,b)):this};h.get=function(a){if(a.e())return this.value;var b=this.children.get(K(a));return b?b.get(N(a)):null};
	function pe(a,b,c){if(b.e())return c;var d=K(b);b=pe(a.children.get(d)||qe,N(b),c);d=b.e()?a.children.remove(d):a.children.Sa(d,b);return new qf(a.value,d)}function vf(a,b){return wf(a,M,b)}function wf(a,b,c){var d={};a.children.ka(function(a,f){d[a]=wf(f,b.o(a),c)});return c(b,a.value,d)}function xf(a,b,c){return yf(a,b,M,c)}function yf(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=K(b);return(a=a.children.get(e))?yf(a,N(b),c.o(e),d):null}
	function zf(a,b,c){Af(a,b,M,c)}function Af(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=K(b);return(a=a.children.get(e))?Af(a,N(b),c.o(e),d):qe}function ne(a,b){Bf(a,M,b)}function Bf(a,b,c){a.children.ka(function(a,e){Bf(e,b.o(a),c)});a.value&&c(b,a.value)}function Cf(a,b){a.children.ka(function(a,d){d.value&&b(a,d.value)})}var qe=new qf(null);qf.prototype.toString=function(){var a={};ne(this,function(b,c){a[b.toString()]=c.toString()});return G(a)};function Df(a,b,c){this.type=ee;this.source=Ef;this.path=a;this.Ub=b;this.Yd=c}Df.prototype.$c=function(a){if(this.path.e()){if(null!=this.Ub.value)return O(this.Ub.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ub.subtree(new P(a));return new Df(M,a,this.Yd)}O(K(this.path)===a,"operationForChild called for unrelated child.");return new Df(N(this.path),this.Ub,this.Yd)};
	Df.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Yd+" affectedTree="+this.Ub+")"};var Bc=0,be=1,ee=2,Dc=3;function Ff(a,b,c,d){this.Ae=a;this.tf=b;this.Lb=c;this.ef=d;O(!d||b,"Tagged queries must be from server.")}var Ef=new Ff(!0,!1,null,!1),Gf=new Ff(!1,!0,null,!1);Ff.prototype.toString=function(){return this.Ae?"user":this.ef?"server(queryID="+this.Lb+")":"server"};function Hf(a){this.Z=a}var If=new Hf(new qf(null));function Jf(a,b,c){if(b.e())return new Hf(new qf(c));var d=uf(a.Z,b);if(null!=d){var e=d.path,d=d.value;b=lf(e,b);d=d.H(b,c);return new Hf(a.Z.set(e,d))}a=pe(a.Z,b,new qf(c));return new Hf(a)}function Kf(a,b,c){var d=a;Fb(c,function(a,c){d=Jf(d,b.o(a),c)});return d}Hf.prototype.Ud=function(a){if(a.e())return If;a=pe(this.Z,a,qe);return new Hf(a)};function Lf(a,b){var c=uf(a.Z,b);return null!=c?a.Z.get(c.path).S(lf(c.path,b)):null}
	function Mf(a){var b=[],c=a.Z.value;null!=c?c.L()||c.R(R,function(a,c){b.push(new L(a,c))}):a.Z.children.ka(function(a,c){null!=c.value&&b.push(new L(a,c.value))});return b}function Nf(a,b){if(b.e())return a;var c=Lf(a,b);return null!=c?new Hf(new qf(c)):new Hf(a.Z.subtree(b))}Hf.prototype.e=function(){return this.Z.e()};Hf.prototype.apply=function(a){return Of(M,this.Z,a)};
	function Of(a,b,c){if(null!=b.value)return c.H(a,b.value);var d=null;b.children.ka(function(b,f){".priority"===b?(O(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Of(a.o(b),f,c)});c.S(a).e()||null===d||(c=c.H(a.o(".priority"),d));return c};function Pf(){this.V=If;this.pa=[];this.Pc=-1}function Qf(a,b){for(var c=0;c<a.pa.length;c++){var d=a.pa[c];if(d.md===b)return d}return null}h=Pf.prototype;
	h.Ud=function(a){var b=Sa(this.pa,function(b){return b.md===a});O(0<=b,"removeWrite called with nonexistent writeId.");var c=this.pa[b];this.pa.splice(b,1);for(var d=c.visible,e=!1,f=this.pa.length-1;d&&0<=f;){var g=this.pa[f];g.visible&&(f>=b&&Rf(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.V=Sf(this.pa,Tf,M),this.Pc=0<this.pa.length?this.pa[this.pa.length-1].md:-1;else if(c.Ja)this.V=this.V.Ud(c.path);else{var k=this;v(c.children,function(a,b){k.V=k.V.Ud(c.path.o(b))})}return!0}return!1};
	h.Aa=function(a,b,c,d){if(c||d){var e=Nf(this.V,a);return!d&&e.e()?b:d||null!=b||null!=Lf(e,M)?(e=Sf(this.pa,function(b){return(b.visible||d)&&(!c||!(0<=La(c,b.md)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||H,e.apply(b)):null}e=Lf(this.V,a);if(null!=e)return e;e=Nf(this.V,a);return e.e()?b:null!=b||null!=Lf(e,M)?(b=b||H,e.apply(b)):null};
	h.Cc=function(a,b){var c=H,d=Lf(this.V,a);if(d)d.L()||d.R(R,function(a,b){c=c.W(a,b)});else if(b){var e=Nf(this.V,a);b.R(R,function(a,b){var d=Nf(e,new P(a)).apply(b);c=c.W(a,d)});Ma(Mf(e),function(a){c=c.W(a.name,a.U)})}else e=Nf(this.V,a),Ma(Mf(e),function(a){c=c.W(a.name,a.U)});return c};h.nd=function(a,b,c,d){O(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.o(b);if(null!=Lf(this.V,a))return null;a=Nf(this.V,a);return a.e()?d.S(b):a.apply(d.S(b))};
	h.Bc=function(a,b,c){a=a.o(b);var d=Lf(this.V,a);return null!=d?d:Wb(c,b)?Nf(this.V,a).apply(c.j().T(b)):null};h.xc=function(a){return Lf(this.V,a)};h.qe=function(a,b,c,d,e,f){var g;a=Nf(this.V,a);g=Lf(a,M);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.pb(f);if(g.e()||g.L())return[];b=[];a=Vd(f);e=e?g.dc(c,f):g.bc(c,f);for(f=Ic(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=Ic(e);return b};
	function Rf(a,b){return a.Ja?a.path.contains(b):!!ta(a.children,function(c,d){return a.path.o(d).contains(b)})}function Tf(a){return a.visible}
	function Sf(a,b,c){for(var d=If,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ja)c.contains(g)?(g=lf(c,g),d=Jf(d,g,f.Ja)):g.contains(c)&&(g=lf(g,c),d=Jf(d,M,f.Ja.S(g)));else if(f.children)if(c.contains(g))g=lf(c,g),d=Kf(d,g,f.children);else{if(g.contains(c))if(g=lf(g,c),g.e())d=Kf(d,M,f.children);else if(f=z(f.children,K(g)))f=f.S(N(g)),d=Jf(d,M,f)}else throw jd("WriteRecord should have .snap or .children");}}return d}function Uf(a,b){this.Qb=a;this.Z=b}h=Uf.prototype;
	h.Aa=function(a,b,c){return this.Z.Aa(this.Qb,a,b,c)};h.Cc=function(a){return this.Z.Cc(this.Qb,a)};h.nd=function(a,b,c){return this.Z.nd(this.Qb,a,b,c)};h.xc=function(a){return this.Z.xc(this.Qb.o(a))};h.qe=function(a,b,c,d,e){return this.Z.qe(this.Qb,a,b,c,d,e)};h.Bc=function(a,b){return this.Z.Bc(this.Qb,a,b)};h.o=function(a){return new Uf(this.Qb.o(a),this.Z)};function Vf(){this.children={};this.pd=0;this.value=null}function Wf(a,b,c){this.Jd=a?a:"";this.Ha=b?b:null;this.A=c?c:new Vf}function Xf(a,b){for(var c=b instanceof P?b:new P(b),d=a,e;null!==(e=K(c));)d=new Wf(e,d,z(d.A.children,e)||new Vf),c=N(c);return d}h=Wf.prototype;h.Ea=function(){return this.A.value};function Yf(a,b){O("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Zf(a)}h.clear=function(){this.A.value=null;this.A.children={};this.A.pd=0;Zf(this)};
	h.zd=function(){return 0<this.A.pd};h.e=function(){return null===this.Ea()&&!this.zd()};h.R=function(a){var b=this;v(this.A.children,function(c,d){a(new Wf(d,b,c))})};function $f(a,b,c,d){c&&!d&&b(a);a.R(function(a){$f(a,b,!0,d)});c&&d&&b(a)}function ag(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new P(null===this.Ha?this.Jd:this.Ha.path()+"/"+this.Jd)};h.name=function(){return this.Jd};h.parent=function(){return this.Ha};
	function Zf(a){if(null!==a.Ha){var b=a.Ha,c=a.Jd,d=a.e(),e=y(b.A.children,c);d&&e?(delete b.A.children[c],b.A.pd--,Zf(b)):d||e||(b.A.children[c]=a.A,b.A.pd++,Zf(b))}};var bg=/[\[\].#$\/\u0000-\u001F\u007F]/,cg=/[\[\].#$\u0000-\u001F\u007F]/,dg=/^[a-zA-Z][a-zA-Z._\-+]+$/;function eg(a){return q(a)&&0!==a.length&&!bg.test(a)}function fg(a){return null===a||q(a)||fa(a)&&!td(a)||ga(a)&&y(a,".sv")}function gg(a,b,c,d){d&&!p(b)||hg(E(a,1,d),b,c)}
	function hg(a,b,c){c instanceof P&&(c=new nf(c,a));if(!p(b))throw Error(a+"contains undefined "+pf(c));if(r(b))throw Error(a+"contains a function "+pf(c)+" with contents: "+b.toString());if(td(b))throw Error(a+"contains "+b.toString()+" "+pf(c));if(q(b)&&b.length>10485760/3&&10485760<Pb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+pf(c)+" ('"+b.substring(0,50)+"...')");if(ga(b)){var d=!1,e=!1;Fb(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!eg(b)))throw Error(a+" contains an invalid key ("+b+") "+pf(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);hg(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+pf(c)+" in addition to actual children.");}}
	function ig(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!eg(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(mf);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function jg(a,b,c){var d=E(a,1,!1);if(!ga(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Fb(b,function(a,b){var k=new P(a);hg(d,b,c.o(k));if(".priority"===me(k)&&!fg(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});ig(d,e)}
	function kg(a,b,c){if(td(c))throw Error(E(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!fg(c))throw Error(E(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function lg(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(E(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function mg(a,b){if(p(b)&&!eg(b))throw Error(E(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function ng(a,b){if(!q(b)||0===b.length||cg.test(b))throw Error(E(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function og(a,b){if(".info"===K(b))throw Error(a+" failed: Can't modify data under /.info/");}function pg(a,b){if(!q(b))throw Error(E(a,1,!1)+"must be a valid credential (a string).");}function qg(a,b,c){if(!q(c))throw Error(E(a,b,!1)+"must be a valid string.");}
	function rg(a,b){qg(a,1,b);if(!dg.test(b))throw Error(E(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function sg(a,b,c,d){if(!d||p(c))if(!ga(c)||null===c)throw Error(E(a,b,d)+"must be a valid object.");}function tg(a,b,c){if(!ga(b)||!y(b,c))throw Error(E(a,1,!1)+'must contain the key "'+c+'"');if(!q(z(b,c)))throw Error(E(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function ug(){this.set={}}h=ug.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return y(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.clear=function(){this.set={}};h.e=function(){return va(this.set)};h.count=function(){return oa(this.set)};function vg(a,b){v(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];v(this.set,function(b,c){a.push(c)});return a};function Vc(){this.m=this.B=null}Vc.prototype.find=function(a){if(null!=this.B)return this.B.S(a);if(a.e()||null==this.m)return null;var b=K(a);a=N(a);return this.m.contains(b)?this.m.get(b).find(a):null};Vc.prototype.rc=function(a,b){if(a.e())this.B=b,this.m=null;else if(null!==this.B)this.B=this.B.H(a,b);else{null==this.m&&(this.m=new ug);var c=K(a);this.m.contains(c)||this.m.add(c,new Vc);c=this.m.get(c);a=N(a);c.rc(a,b)}};
	function wg(a,b){if(b.e())return a.B=null,a.m=null,!0;if(null!==a.B){if(a.B.L())return!1;var c=a.B;a.B=null;c.R(R,function(b,c){a.rc(new P(b),c)});return wg(a,b)}return null!==a.m?(c=K(b),b=N(b),a.m.contains(c)&&wg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function Wc(a,b,c){null!==a.B?c(b,a.B):a.R(function(a,e){var f=new P(b.toString()+"/"+a);Wc(e,f,c)})}Vc.prototype.R=function(a){null!==this.m&&vg(this.m,function(b,c){a(b,c)})};var xg="auth.firebase.com";function yg(a,b,c){this.qd=a||{};this.he=b||{};this.fb=c||{};this.qd.remember||(this.qd.remember="default")}var zg=["remember","redirectTo"];function Ag(a){var b={},c={};Fb(a||{},function(a,e){0<=La(zg,a)?b[a]=e:c[a]=e});return new yg(b,{},c)};function Bg(a,b){this.Ue=["session",a.Rd,a.lc].join(":");this.ee=b}Bg.prototype.set=function(a,b){if(!b)if(this.ee.length)b=this.ee[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Ue,a)};Bg.prototype.get=function(){var a=Oa(this.ee,u(this.Bg,this)),a=Na(a,function(a){return null!==a});Va(a,function(a,c){return Dd(c.token)-Dd(a.token)});return 0<a.length?a.shift():null};Bg.prototype.Bg=function(a){try{var b=a.get(this.Ue);if(b&&b.token)return b}catch(c){}return null};
	Bg.prototype.clear=function(){var a=this;Ma(this.ee,function(b){b.remove(a.Ue)})};function Cg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function Dg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Cg())}function Eg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
	function Fg(a){var b=Cg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function Gg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function Hg(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Ig(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
	function Jg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function Kg(a){var b="";try{a=a.replace(/.*\?/,"");var c=Jb(a);c&&y(c,"__firebase_request_key")&&(b=z(c,"__firebase_request_key"))}catch(d){}return b}function Lg(){var a=sd(xg);return a.scheme+"://"+a.host+"/v2"}function Mg(a){return Lg()+"/"+a+"/auth/channel"};function Ng(a){var b=this;this.hb=a;this.fe="*";Fg(8)?this.Uc=this.Cd=Gg():(this.Uc=window.opener,this.Cd=window);if(!b.Uc)throw"Unable to find relay frame";Hg(this.Cd,"message",u(this.nc,this));Hg(this.Cd,"message",u(this.Ff,this));try{Og(this,{a:"ready"})}catch(c){Hg(this.Uc,"load",function(){Og(b,{a:"ready"})})}Hg(window,"unload",u(this.Mg,this))}function Og(a,b){b=G(b);Fg(8)?a.Uc.doPost(b,a.fe):a.Uc.postMessage(b,a.fe)}
	Ng.prototype.nc=function(a){var b=this,c;try{c=Rb(a.data)}catch(d){}c&&"request"===c.a&&(Ig(window,"message",this.nc),this.fe=a.origin,this.hb&&setTimeout(function(){b.hb(b.fe,c.d,function(a,c){b.mg=!c;b.hb=void 0;Og(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Ng.prototype.Mg=function(){try{Ig(this.Cd,"message",this.Ff)}catch(a){}this.hb&&(Og(this,{a:"error",d:"unknown closed window"}),this.hb=void 0);try{window.close()}catch(b){}};Ng.prototype.Ff=function(a){if(this.mg&&"die"===a.data)try{window.close()}catch(b){}};function Pg(a){this.tc=Fa()+Fa()+Fa();this.Kf=a}Pg.prototype.open=function(a,b){cd.set("redirect_request_id",this.tc);cd.set("redirect_request_id",this.tc);b.requestId=this.tc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+Ib(b);window.location=a};Pg.isAvailable=function(){return!Eg()&&!Dg()};Pg.prototype.Fc=function(){return"redirect"};var Qg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Rg(a){var b=Error(z(Qg,a),a);b.code=a;return b};function Sg(a){var b;(b=!a.window_features)||(b=Cg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
	Sg.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);t&&(t=clearInterval(t));Ig(window,"message",e);Ig(window,"unload",d);if(l&&!a)try{l.close()}catch(b){k.postMessage("die",m)}l=k=void 0}function e(a){if(a.origin===m)try{var b=Rb(a.data);"ready"===b.a?k.postMessage(A,m):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=Fg(8),g,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
	var m=Jg(a);if(m!==Jg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.options.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+Ib(b);var l=window.open(a,this.options.window_name,this.options.window_features);k||(k=l);var t=setInterval(function(){l&&l.closed&&
	(d(!1),c&&(c(Rg("USER_CANCELLED")),c=null))},500),A=G({a:"request",d:b});Hg(window,"unload",d);Hg(window,"message",e)}};
	Sg.isAvailable=function(){var a;if(a="postMessage"in window&&!Eg())(a=Dg()||"undefined"!==typeof navigator&&(!!Cg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=Cg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!Cg().match(/PhantomJS/)};Sg.prototype.Fc=function(){return"popup"};function Tg(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
	Tg.prototype.open=function(a,b,c){function d(){c&&(c(Rg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),g;Hg(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=Rb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Rg("SERVER_ERROR")):c(Rg("NETWORK_ERROR"));c=null;Ig(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+Ib(b),g=null;else{var k=this.options.headers.content_type;
	"application/json"===k&&(g=G(b));"application/x-www-form-urlencoded"===k&&(g=Ib(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};ya(a,this.options.headers);for(var m in a)e.setRequestHeader(m,a[m]);e.send(g)};Tg.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=Cg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||Fg(10);return a};Tg.prototype.Fc=function(){return"json"};function Ug(a){this.tc=Fa()+Fa()+Fa();this.Kf=a}
	Ug.prototype.open=function(a,b,c){function d(){c&&(c(Rg("USER_CANCELLED")),c=null)}var e=this,f=sd(xg),g;b.requestId=this.tc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=Ib(b);(g=window.open(a,"_blank","location=no"))&&r(g.addEventListener)?(g.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var l=document.createElement("a");l.href=a.url;b=l.host===f.host&&"/blank/page.html"===l.pathname;break a}catch(t){}b=!1}b&&(a=Kg(a.url),g.removeEventListener("exit",
	d),g.close(),a=new yg(null,null,{requestId:e.tc,requestKey:a}),e.Kf.requestWithCredential("/auth/session",a,c),c=null)}),g.addEventListener("exit",d)):c(Rg("TRANSPORT_UNAVAILABLE"))};Ug.isAvailable=function(){return Dg()};Ug.prototype.Fc=function(){return"redirect"};function Vg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
	Vg.prototype.open=function(a,b,c){function d(){c&&(c(Rg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;va(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);Ig(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+Ib(b);
	Hg(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Wg(f,a,c)};
	function Wg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Rg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Rg("NETWORK_ERROR"))}},0)}Vg.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
	Vg.prototype.Fc=function(){return"json"};function Xg(a,b,c,d){ff.call(this,["auth_status"]);this.G=a;this.hf=b;this.gh=c;this.Pe=d;this.wc=new Bg(a,[bd,cd]);this.qb=null;this.We=!1;Yg(this)}ka(Xg,ff);h=Xg.prototype;h.Be=function(){return this.qb||null};function Yg(a){cd.get("redirect_request_id")&&Zg(a);var b=a.wc.get();b&&b.token?($g(a,b),a.hf(b.token,function(c,d){ah(a,c,d,!1,b.token,b)},function(b,d){bh(a,"resumeSession()",b,d)})):$g(a,null)}
	function ch(a,b,c,d,e,f){"firebaseio-demo.com"===a.G.domain&&S("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.hf(b,function(f,k){ah(a,f,k,!0,b,c,d||{},e)},function(b,c){bh(a,"auth()",b,c,f)})}function dh(a,b){a.wc.clear();$g(a,null);a.gh(function(a,d){if("ok"===a)T(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;T(b,f)}})}
	function ah(a,b,c,d,e,f,g,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=Ed(e)?e:"",c=null,b&&y(b,"uid")?c=z(b,"uid"):y(f,"uid")&&(c=z(f,"uid")),f.uid=c,c="custom",b&&y(b,"provider")?c=z(b,"provider"):y(f,"provider")&&(c=z(f,"provider")),f.provider=c,a.wc.clear(),Ed(e)&&(g=g||{},c=bd,"sessionOnly"===g.remember&&(c=cd),"none"!==g.remember&&a.wc.set(f,c)),$g(a,f)),T(k,null,f)):(a.wc.clear(),$g(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,T(k,f))}
	function bh(a,b,c,d,e){S(b+" was canceled: "+d);a.wc.clear();$g(a,null);a=Error(d);a.code=c.toUpperCase();T(e,a)}function eh(a,b,c,d,e){fh(a);c=new yg(d||{},{},c||{});gh(a,[Tg,Vg],"/auth/"+b,c,e)}
	function hh(a,b,c,d){fh(a);var e=[Sg,Ug];c=Ag(c);"anonymous"===b||"password"===b?setTimeout(function(){T(d,Rg("TRANSPORT_UNAVAILABLE"))},0):(c.he.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.he.relay_url=Mg(a.G.lc),c.he.requestWithCredential=u(a.uc,a),gh(a,e,"/auth/"+b,c,d))}
	function Zg(a){var b=cd.get("redirect_request_id");if(b){var c=cd.get("redirect_client_options");cd.remove("redirect_request_id");cd.remove("redirect_client_options");var d=[Tg,Vg],b={requestId:b,requestKey:Kg(document.location.hash)},c=new yg(c,{},b);a.We=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}gh(a,d,"/auth/session",c,function(){this.We=!1}.bind(a))}}
	h.ve=function(a,b){fh(this);var c=Ag(a);c.fb._method="POST";this.uc("/users",c,function(a,c){a?T(b,a):T(b,a,c)})};h.Xe=function(a,b){var c=this;fh(this);var d="/users/"+encodeURIComponent(a.email),e=Ag(a);e.fb._method="DELETE";this.uc(d,e,function(a,d){!a&&d&&d.uid&&c.qb&&c.qb.uid&&c.qb.uid===d.uid&&dh(c);T(b,a)})};h.se=function(a,b){fh(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=Ag(a);d.fb._method="PUT";d.fb.password=a.newPassword;this.uc(c,d,function(a){T(b,a)})};
	h.re=function(a,b){fh(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=Ag(a);d.fb._method="PUT";d.fb.email=a.newEmail;d.fb.password=a.password;this.uc(c,d,function(a){T(b,a)})};h.Ze=function(a,b){fh(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=Ag(a);d.fb._method="POST";this.uc(c,d,function(a){T(b,a)})};h.uc=function(a,b,c){ih(this,[Tg,Vg],a,b,c)};
	function gh(a,b,c,d,e){ih(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?ch(a,c.token,c,d.qd,function(a,b){a?T(e,a):T(e,null,b)}):T(e,b||Rg("UNKNOWN_ERROR"))})}
	function ih(a,b,c,d,e){b=Na(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){T(e,Rg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.he),d=Gb(d.fb),d.v="js-"+Eb,d.transport=b.Fc(),d.suppress_status_codes=!0,a=Lg()+"/"+a.G.lc+c,b.open(a,d,function(a,b){if(a)T(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;T(e,c)}else T(e,null,b)}))}
	function $g(a,b){var c=null!==a.qb||null!==b;a.qb=b;c&&a.ie("auth_status",b);a.Pe(null!==b)}h.Ee=function(a){O("auth_status"===a,'initial event must be of type "auth_status"');return this.We?null:[this.qb]};function fh(a){var b=a.G;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===xg)throw Error("This custom Firebase server ('"+a.G.domain+"') does not support delegated login.");};var gd="websocket",hd="long_polling";function jh(a){this.nc=a;this.Qd=[];this.Wb=0;this.te=-1;this.Jb=null}function kh(a,b,c){a.te=b;a.Jb=c;a.te<a.Wb&&(a.Jb(),a.Jb=null)}function lh(a,b,c){for(a.Qd[b]=c;a.Qd[a.Wb];){var d=a.Qd[a.Wb];delete a.Qd[a.Wb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;gc(function(){f.nc(d[e])})}if(a.Wb===a.te){a.Jb&&(clearTimeout(a.Jb),a.Jb(),a.Jb=null);break}a.Wb++}};function mh(a,b,c,d){this.ue=a;this.f=pd(a);this.rb=this.sb=0;this.Xa=uc(b);this.Xf=c;this.Kc=!1;this.Fb=d;this.ld=function(a){return fd(b,hd,a)}}var nh,oh;
	mh.prototype.open=function(a,b){this.mf=0;this.na=b;this.Ef=new jh(a);this.Db=!1;var c=this;this.ub=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.ub=null},Math.floor(3E4));ud(function(){if(!c.Db){c.Wa=new ph(function(a,b,d,k,m){qh(c,arguments);if(c.Wa)if(c.ub&&(clearTimeout(c.ub),c.ub=null),c.Kc=!0,"start"==a)c.id=b,c.Mf=d;else if("close"===a)b?(c.Wa.$d=!1,kh(c.Ef,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){qh(c,arguments);
	lh(c.Ef,a,b)},function(){c.bb()},c.ld);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Wa.ke&&(a.cb=c.Wa.ke);a.v="5";c.Xf&&(a.s=c.Xf);c.Fb&&(a.ls=c.Fb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.ld(a);c.f("Connecting via long-poll to "+a);rh(c.Wa,a,function(){})}})};
	mh.prototype.start=function(){var a=this.Wa,b=this.Mf;a.Fg=this.id;a.Gg=b;for(a.oe=!0;sh(a););a=this.id;b=this.Mf;this.kc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.kc.src=this.ld(c);this.kc.style.display="none";document.body.appendChild(this.kc)};
	mh.isAvailable=function(){return nh||!oh&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.ih)&&!0};h=mh.prototype;h.Hd=function(){};h.fd=function(){this.Db=!0;this.Wa&&(this.Wa.close(),this.Wa=null);this.kc&&(document.body.removeChild(this.kc),this.kc=null);this.ub&&(clearTimeout(this.ub),this.ub=null)};
	h.bb=function(){this.Db||(this.f("Longpoll is closing itself"),this.fd(),this.na&&(this.na(this.Kc),this.na=null))};h.close=function(){this.Db||(this.f("Longpoll is being closed."),this.fd())};h.send=function(a){a=G(a);this.sb+=a.length;rc(this.Xa,"bytes_sent",a.length);a=Ob(a);a=nb(a,!0);a=yd(a,1840);for(var b=0;b<a.length;b++){var c=this.Wa;c.cd.push({Xg:this.mf,fh:a.length,of:a[b]});c.oe&&sh(c);this.mf++}};function qh(a,b){var c=G(b).length;a.rb+=c;rc(a.Xa,"bytes_received",c)}
	function ph(a,b,c,d){this.ld=d;this.lb=c;this.Te=new ug;this.cd=[];this.we=Math.floor(1E8*Math.random());this.$d=!0;this.ke=id();window["pLPCommand"+this.ke]=a;window["pRTLPCB"+this.ke]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||fc("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.jb=a.contentDocument:a.contentWindow?a.jb=a.contentWindow.document:a.document&&(a.jb=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.jb.open(),this.Ga.jb.write(a),this.Ga.jb.close()}catch(f){fc("frame writing exception"),f.stack&&fc(f.stack),fc(f)}}
	ph.prototype.close=function(){this.oe=!1;if(this.Ga){this.Ga.jb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.lb;b&&(this.lb=null,b())};
	function sh(a){if(a.oe&&a.$d&&a.Te.count()<(0<a.cd.length?2:1)){a.we++;var b={};b.id=a.Fg;b.pw=a.Gg;b.ser=a.we;for(var b=a.ld(b),c="",d=0;0<a.cd.length;)if(1870>=a.cd[0].of.length+30+c.length){var e=a.cd.shift(),c=c+"&seg"+d+"="+e.Xg+"&ts"+d+"="+e.fh+"&d"+d+"="+e.of;d++}else break;th(a,b+c,a.we);return!0}return!1}function th(a,b,c){function d(){a.Te.remove(c);sh(a)}a.Te.add(c,1);var e=setTimeout(d,Math.floor(25E3));rh(a,b,function(){clearTimeout(e);d()})}
	function rh(a,b,c){setTimeout(function(){try{if(a.$d){var d=a.Ga.jb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){fc("Long-poll script failed to load: "+b);a.$d=!1;a.close()};a.Ga.jb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var uh=null;"undefined"!==typeof MozWebSocket?uh=MozWebSocket:"undefined"!==typeof WebSocket&&(uh=WebSocket);function vh(a,b,c,d){this.ue=a;this.f=pd(this.ue);this.frames=this.Nc=null;this.rb=this.sb=this.ff=0;this.Xa=uc(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.jf=fd(b,gd,a)}var wh;
	vh.prototype.open=function(a,b){this.lb=b;this.Kg=a;this.f("Websocket connecting to "+this.jf);this.Kc=!1;bd.set("previous_websocket_failure",!0);try{this.La=new uh(this.jf)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.Kc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.bb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.rb+=
	a.length,rc(e.Xa,"bytes_received",a.length),xh(e),null!==e.frames)yh(e,a);else{a:{O(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.ff=b;e.frames=[];a=null;break a}}e.ff=1;e.frames=[]}null!==a&&yh(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};vh.prototype.start=function(){};
	vh.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==uh&&!wh};vh.responsesRequiredToBeHealthy=2;vh.healthyTimeout=3E4;h=vh.prototype;h.Hd=function(){bd.remove("previous_websocket_failure")};function yh(a,b){a.frames.push(b);if(a.frames.length==a.ff){var c=a.frames.join("");a.frames=null;c=Rb(c);a.Kg(c)}}
	h.send=function(a){xh(this);a=G(a);this.sb+=a.length;rc(this.Xa,"bytes_sent",a.length);a=yd(a,16384);1<a.length&&zh(this,String(a.length));for(var b=0;b<a.length;b++)zh(this,a[b])};h.fd=function(){this.Db=!0;this.Nc&&(clearInterval(this.Nc),this.Nc=null);this.La&&(this.La.close(),this.La=null)};h.bb=function(){this.Db||(this.f("WebSocket is closing itself"),this.fd(),this.lb&&(this.lb(this.Kc),this.lb=null))};h.close=function(){this.Db||(this.f("WebSocket is being closed"),this.fd())};
	function xh(a){clearInterval(a.Nc);a.Nc=setInterval(function(){a.La&&zh(a,"0");xh(a)},Math.floor(45E3))}function zh(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(u(a.bb,a),0)}};function Ah(a){Bh(this,a)}var Ch=[mh,vh];function Bh(a,b){var c=vh&&vh.isAvailable(),d=c&&!(bd.Af||!0===bd.get("previous_websocket_failure"));b.hh&&(c||S("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.jd=[vh];else{var e=a.jd=[];zd(Ch,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function Dh(a){if(0<a.jd.length)return a.jd[0];throw Error("No transports available");};function Eh(a,b,c,d,e,f,g){this.id=a;this.f=pd("c:"+this.id+":");this.nc=c;this.Zc=d;this.na=e;this.Re=f;this.G=b;this.Pd=[];this.kf=0;this.Wf=new Ah(b);this.N=0;this.Fb=g;this.f("Connection created");Fh(this)}
	function Fh(a){var b=Dh(a.Wf);a.K=new b("c:"+a.id+":"+a.kf++,a.G,void 0,a.Fb);a.Ve=b.responsesRequiredToBeHealthy||0;var c=Gh(a,a.K),d=Hh(a,a.K);a.kd=a.K;a.ed=a.K;a.F=null;a.Eb=!1;setTimeout(function(){a.K&&a.K.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.Bd=setTimeout(function(){a.Bd=null;a.Eb||(a.K&&102400<a.K.rb?(a.f("Connection exceeded healthy timeout but has received "+a.K.rb+" bytes.  Marking connection healthy."),a.Eb=!0,a.K.Hd()):a.K&&10240<a.K.sb?a.f("Connection exceeded healthy timeout but has sent "+
	a.K.sb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function Hh(a,b){return function(c){b===a.K?(a.K=null,c||0!==a.N?1===a.N&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.G.ab.substr(0,2)&&(bd.remove("host:"+a.G.host),a.G.ab=a.G.host)),a.close()):b===a.F?(a.f("Secondary connection lost."),c=a.F,a.F=null,a.kd!==c&&a.ed!==c||a.close()):a.f("closing an old connection")}}
	function Gh(a,b){return function(c){if(2!=a.N)if(b===a.ed){var d=wd("t",c);c=wd("d",c);if("c"==d){if(d=wd("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Uf=c.s;ed(a.G,f);0==a.N&&(a.K.start(),Ih(a,a.K,d),"5"!==e&&S("Protocol version mismatch detected"),c=a.Wf,(c=1<c.jd.length?c.jd[1]:null)&&Jh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.ed=a.F;for(c=0;c<a.Pd.length;++c)a.Ld(a.Pd[c]);a.Pd=[];Kh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.Re&&(a.Re(c),a.Re=null),a.na=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),ed(a.G,c),1===a.N?a.close():(Lh(a),Fh(a))):"e"===d?qd("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Mh(a),Nh(a)):qd("Unknown control packet command: "+d)}else"d"==d&&a.Ld(c)}else if(b===a.F)if(d=wd("t",c),c=wd("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Oh(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.F.close(),a.kd!==a.F&&a.ed!==a.F||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.Tf--,Oh(a)));else if("d"==d)a.Pd.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}Eh.prototype.Ia=function(a){Ph(this,{t:"d",d:a})};function Kh(a){a.kd===a.F&&a.ed===a.F&&(a.f("cleaning up and promoting a connection: "+a.F.ue),a.K=a.F,a.F=null)}
	function Oh(a){0>=a.Tf?(a.f("Secondary connection is healthy."),a.Eb=!0,a.F.Hd(),a.F.start(),a.f("sending client ack on secondary"),a.F.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.K.send({t:"c",d:{t:"n",d:{}}}),a.kd=a.F,Kh(a)):(a.f("sending ping on secondary."),a.F.send({t:"c",d:{t:"p",d:{}}}))}Eh.prototype.Ld=function(a){Mh(this);this.nc(a)};function Mh(a){a.Eb||(a.Ve--,0>=a.Ve&&(a.f("Primary connection is healthy."),a.Eb=!0,a.K.Hd()))}
	function Jh(a,b){a.F=new b("c:"+a.id+":"+a.kf++,a.G,a.Uf);a.Tf=b.responsesRequiredToBeHealthy||0;a.F.open(Gh(a,a.F),Hh(a,a.F));setTimeout(function(){a.F&&(a.f("Timed out trying to upgrade."),a.F.close())},Math.floor(6E4))}function Ih(a,b,c){a.f("Realtime connection established.");a.K=b;a.N=1;a.Zc&&(a.Zc(c,a.Uf),a.Zc=null);0===a.Ve?(a.f("Primary connection is healthy."),a.Eb=!0):setTimeout(function(){Nh(a)},Math.floor(5E3))}
	function Nh(a){a.Eb||1!==a.N||(a.f("sending ping on primary."),Ph(a,{t:"c",d:{t:"p",d:{}}}))}function Ph(a,b){if(1!==a.N)throw"Connection is not connected";a.kd.send(b)}Eh.prototype.close=function(){2!==this.N&&(this.f("Closing realtime connection."),this.N=2,Lh(this),this.na&&(this.na(),this.na=null))};function Lh(a){a.f("Shutting down all connections");a.K&&(a.K.close(),a.K=null);a.F&&(a.F.close(),a.F=null);a.Bd&&(clearTimeout(a.Bd),a.Bd=null)};function Qh(a,b,c,d){this.id=Rh++;this.f=pd("p:"+this.id+":");this.Bf=this.Ie=!1;this.ba={};this.sa=[];this.ad=0;this.Yc=[];this.qa=!1;this.eb=1E3;this.Id=3E5;this.Kb=b;this.Xc=c;this.Se=d;this.G=a;this.wb=this.Ca=this.Ma=this.Fb=this.$e=null;this.Sb=!1;this.Wd={};this.Wg=0;this.rf=!0;this.Oc=this.Ke=null;Sh(this,0);kf.yb().Ib("visible",this.Ng,this);-1===a.host.indexOf("fblocal")&&jf.yb().Ib("online",this.Lg,this)}var Rh=0,Th=0;h=Qh.prototype;
	h.Ia=function(a,b,c){var d=++this.Wg;a={r:d,a:a,b:b};this.f(G(a));O(this.qa,"sendRequest call when we're not connected not allowed.");this.Ma.Ia(a);c&&(this.Wd[d]=c)};h.Cf=function(a,b,c,d){var e=a.wa(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.ba[f]=this.ba[f]||{};O(Ie(a.n)||!He(a.n),"listen() called for non-default but complete query");O(!this.ba[f][e],"listen() called twice for same path/queryId.");a={I:d,Ad:b,Tg:a,tag:c};this.ba[f][e]=a;this.qa&&Uh(this,a)};
	function Uh(a,b){var c=b.Tg,d=c.path.toString(),e=c.wa();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Ge(c.n),f.t=b.tag);f.h=b.Ad();a.Ia("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&y(k,"w")){var l=z(k,"w");da(l)&&0<=La(l,"no_index")&&S("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.ba[d]&&a.ba[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Vh(a,d,e),b.I&&
	b.I(m,k))})}h.O=function(a,b,c){this.Ca={rg:a,sf:!1,Dc:b,od:c};this.f("Authenticating using credential: "+a);Wh(this);(b=40==a.length)||(a=Cd(a).Ec,b="object"===typeof a&&!0===z(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Id=3E4)};h.je=function(a){delete this.Ca;this.qa&&this.Ia("unauth",{},function(b){a(b.s,b.d)})};
	function Wh(a){var b=a.Ca;a.qa&&b&&a.Ia("auth",{cred:b.rg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Ca===b&&delete a.Ca;b.sf?"ok"!==d&&b.od&&b.od(d,c):(b.sf=!0,b.Dc&&b.Dc(d,c))})}h.$f=function(a,b){var c=a.path.toString(),d=a.wa();this.f("Unlisten called for "+c+" "+d);O(Ie(a.n)||!He(a.n),"unlisten() called for non-default but complete query");if(Vh(this,c,d)&&this.qa){var e=Ge(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Ia("n",c)}};
	h.Qe=function(a,b,c){this.qa?Xh(this,"o",a,b,c):this.Yc.push({bd:a,action:"o",data:b,I:c})};h.Gf=function(a,b,c){this.qa?Xh(this,"om",a,b,c):this.Yc.push({bd:a,action:"om",data:b,I:c})};h.Md=function(a,b){this.qa?Xh(this,"oc",a,null,b):this.Yc.push({bd:a,action:"oc",data:null,I:b})};function Xh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Ia(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.put=function(a,b,c,d){Yh(this,"p",a,b,c,d)};
	h.Df=function(a,b,c,d){Yh(this,"m",a,b,c,d)};function Yh(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.sa.push({action:b,Pf:d,I:e});a.ad++;b=a.sa.length-1;a.qa?Zh(a,b):a.f("Buffering put: "+c)}function Zh(a,b){var c=a.sa[b].action,d=a.sa[b].Pf,e=a.sa[b].I;a.sa[b].Ug=a.qa;a.Ia(c,d,function(d){a.f(c+" response",d);delete a.sa[b];a.ad--;0===a.ad&&(a.sa=[]);e&&e(d.s,d.d)})}
	h.Ye=function(a){this.qa&&(a={c:a},this.f("reportStats",a),this.Ia("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	h.Ld=function(a){if("r"in a){this.f("from server: "+G(a));var b=a.r,c=this.Wd[b];c&&(delete this.Wd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Kb(c.p,c.d,!1,c.t):"m"===b?this.Kb(c.p,c.d,!0,c.t):"c"===b?$h(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Ca,delete this.Ca,c&&c.od&&c.od(a,b)):"sd"===b?this.$e?this.$e(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
	"\nFIREBASE: ")):qd("Unrecognized action received from server: "+G(b)+"\nAre you using the latest client?"))}};h.Zc=function(a,b){this.f("connection ready");this.qa=!0;this.Oc=(new Date).getTime();this.Se({serverTimeOffset:a-(new Date).getTime()});this.Fb=b;if(this.rf){var c={};c["sdk.js."+Eb.replace(/\./g,"-")]=1;Dg()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.Ye(c)}ai(this);this.rf=!1;this.Xc(!0)};
	function Sh(a,b){O(!a.Ma,"Scheduling a connect when we're already connected/ing?");a.wb&&clearTimeout(a.wb);a.wb=setTimeout(function(){a.wb=null;bi(a)},Math.floor(b))}h.Ng=function(a){a&&!this.Sb&&this.eb===this.Id&&(this.f("Window became visible.  Reducing delay."),this.eb=1E3,this.Ma||Sh(this,0));this.Sb=a};h.Lg=function(a){a?(this.f("Browser went online."),this.eb=1E3,this.Ma||Sh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ma&&this.Ma.close())};
	h.If=function(){this.f("data client disconnected");this.qa=!1;this.Ma=null;for(var a=0;a<this.sa.length;a++){var b=this.sa[a];b&&"h"in b.Pf&&b.Ug&&(b.I&&b.I("disconnect"),delete this.sa[a],this.ad--)}0===this.ad&&(this.sa=[]);this.Wd={};ci(this)&&(this.Sb?this.Oc&&(3E4<(new Date).getTime()-this.Oc&&(this.eb=1E3),this.Oc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.eb=this.Id,this.Ke=(new Date).getTime()),a=Math.max(0,this.eb-((new Date).getTime()-this.Ke)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),Sh(this,a),this.eb=Math.min(this.Id,1.3*this.eb));this.Xc(!1)};function bi(a){if(ci(a)){a.f("Making a connection attempt");a.Ke=(new Date).getTime();a.Oc=null;var b=u(a.Ld,a),c=u(a.Zc,a),d=u(a.If,a),e=a.id+":"+Th++;a.Ma=new Eh(e,a.G,b,c,d,function(b){S(b+" ("+a.G.toString()+")");a.Bf=!0},a.Fb)}}h.Cb=function(){this.Ie=!0;this.Ma?this.Ma.close():(this.wb&&(clearTimeout(this.wb),this.wb=null),this.qa&&this.If())};h.vc=function(){this.Ie=!1;this.eb=1E3;this.Ma||Sh(this,0)};
	function $h(a,b,c){c=c?Oa(c,function(a){return xd(a)}).join("$"):"default";(a=Vh(a,b,c))&&a.I&&a.I("permission_denied")}function Vh(a,b,c){b=(new P(b)).toString();var d;p(a.ba[b])?(d=a.ba[b][c],delete a.ba[b][c],0===oa(a.ba[b])&&delete a.ba[b]):d=void 0;return d}function ai(a){Wh(a);v(a.ba,function(b){v(b,function(b){Uh(a,b)})});for(var b=0;b<a.sa.length;b++)a.sa[b]&&Zh(a,b);for(;a.Yc.length;)b=a.Yc.shift(),Xh(a,b.action,b.bd,b.data,b.I)}function ci(a){var b;b=jf.yb().oc;return!a.Bf&&!a.Ie&&b};var U={zg:function(){nh=wh=!0}};U.forceLongPolling=U.zg;U.Ag=function(){oh=!0};U.forceWebSockets=U.Ag;U.$g=function(a,b){a.k.Va.$e=b};U.setSecurityDebugCallback=U.$g;U.bf=function(a,b){a.k.bf(b)};U.stats=U.bf;U.cf=function(a,b){a.k.cf(b)};U.statsIncrementCounter=U.cf;U.ud=function(a){return a.k.ud};U.dataUpdateCount=U.ud;U.Dg=function(a,b){a.k.He=b};U.interceptServerData=U.Dg;U.Jg=function(a){new Ng(a)};U.onPopupOpen=U.Jg;U.Yg=function(a){xg=a};U.setAuthenticationServer=U.Yg;function di(a,b){this.committed=a;this.snapshot=b};function V(a,b){this.dd=a;this.ta=b}V.prototype.cancel=function(a){D("Firebase.onDisconnect().cancel",0,1,arguments.length);F("Firebase.onDisconnect().cancel",1,a,!0);var b=new B;this.dd.Md(this.ta,C(b,a));return b.D};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){D("Firebase.onDisconnect().remove",0,1,arguments.length);og("Firebase.onDisconnect().remove",this.ta);F("Firebase.onDisconnect().remove",1,a,!0);var b=new B;ei(this.dd,this.ta,null,C(b,a));return b.D};
	V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){D("Firebase.onDisconnect().set",1,2,arguments.length);og("Firebase.onDisconnect().set",this.ta);gg("Firebase.onDisconnect().set",a,this.ta,!1);F("Firebase.onDisconnect().set",2,b,!0);var c=new B;ei(this.dd,this.ta,a,C(c,b));return c.D};V.prototype.set=V.prototype.set;
	V.prototype.Ob=function(a,b,c){D("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);og("Firebase.onDisconnect().setWithPriority",this.ta);gg("Firebase.onDisconnect().setWithPriority",a,this.ta,!1);kg("Firebase.onDisconnect().setWithPriority",2,b);F("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new B;fi(this.dd,this.ta,a,b,C(d,c));return d.D};V.prototype.setWithPriority=V.prototype.Ob;
	V.prototype.update=function(a,b){D("Firebase.onDisconnect().update",1,2,arguments.length);og("Firebase.onDisconnect().update",this.ta);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;S("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}jg("Firebase.onDisconnect().update",a,this.ta);F("Firebase.onDisconnect().update",2,b,!0);
	c=new B;gi(this.dd,this.ta,a,C(c,b));return c.D};V.prototype.update=V.prototype.update;function W(a,b,c){this.A=a;this.Y=b;this.g=c}W.prototype.J=function(){D("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.J()};W.prototype.val=W.prototype.J;W.prototype.qf=function(){D("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.J(!0)};W.prototype.exportVal=W.prototype.qf;W.prototype.xg=function(){D("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.xg;
	W.prototype.o=function(a){D("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));ng("Firebase.DataSnapshot.child",a);var b=new P(a),c=this.Y.o(b);return new W(this.A.S(b),c,R)};W.prototype.child=W.prototype.o;W.prototype.Fa=function(a){D("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ng("Firebase.DataSnapshot.hasChild",a);var b=new P(a);return!this.A.S(b).e()};W.prototype.hasChild=W.prototype.Fa;
	W.prototype.C=function(){D("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().J()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){D("Firebase.DataSnapshot.forEach",1,1,arguments.length);F("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.L())return!1;var b=this;return!!this.A.R(this.g,function(c,d){return a(new W(d,b.Y.o(c),R))})};W.prototype.forEach=W.prototype.forEach;
	W.prototype.zd=function(){D("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.L()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.zd;W.prototype.name=function(){S("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");D("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};W.prototype.name=W.prototype.name;W.prototype.key=function(){D("Firebase.DataSnapshot.key",0,0,arguments.length);return this.Y.key()};
	W.prototype.key=W.prototype.key;W.prototype.Hb=function(){D("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Hb()};W.prototype.numChildren=W.prototype.Hb;W.prototype.Mb=function(){D("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.Y};W.prototype.ref=W.prototype.Mb;function hi(a,b,c){this.Vb=a;this.tb=b;this.vb=c||null}h=hi.prototype;h.Qf=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.n.g;return new jc("value",this,new W(a.Na,b.Mb(),c))};h.Zb=function(a){var b=this.vb;if("cancel"===a.De()){O(this.tb,"Raising a cancel event on a listener with no cancel callback");var c=this.tb;return function(){c.call(b,a.error)}}var d=this.Vb;return function(){d.call(b,a.be)}};h.lf=function(a,b){return this.tb?new kc(this,a,b):null};
	h.matches=function(a){return a instanceof hi?a.Vb&&this.Vb?a.Vb===this.Vb&&a.vb===this.vb:!0:!1};h.yf=function(){return null!==this.Vb};function ii(a,b,c){this.ja=a;this.tb=b;this.vb=c}h=ii.prototype;h.Qf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ja};h.lf=function(a,b){return this.tb?new kc(this,a,b):null};
	h.createEvent=function(a,b){O(null!=a.Za,"Child events should have a childName.");var c=b.Mb().o(a.Za);return new jc(a.type,this,new W(a.Na,c,b.n.g),a.Td)};h.Zb=function(a){var b=this.vb;if("cancel"===a.De()){O(this.tb,"Raising a cancel event on a listener with no cancel callback");var c=this.tb;return function(){c.call(b,a.error)}}var d=this.ja[a.wd];return function(){d.call(b,a.be,a.Td)}};
	h.matches=function(a){if(a instanceof ii){if(!this.ja||!a.ja)return!0;if(this.vb===a.vb){var b=oa(a.ja);if(b===oa(this.ja)){if(1===b){var b=pa(a.ja),c=pa(this.ja);return c===b&&(!a.ja[b]||!this.ja[c]||a.ja[b]===this.ja[c])}return na(this.ja,function(b,c){return a.ja[c]===b})}}}return!1};h.yf=function(){return null!==this.ja};function ji(){this.za={}}h=ji.prototype;h.e=function(){return va(this.za)};h.gb=function(a,b,c){var d=a.source.Lb;if(null!==d)return d=z(this.za,d),O(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];v(this.za,function(d){e=e.concat(d.gb(a,b,c))});return e};h.Tb=function(a,b,c,d,e){var f=a.wa(),g=z(this.za,f);if(!g){var g=c.Aa(e?d:null),k=!1;g?k=!0:(g=d instanceof fe?c.Cc(d):H,k=!1);g=new Ye(a,new je(new Xb(g,k,!1),new Xb(d,e,!1)));this.za[f]=g}g.Tb(b);return af(g,b)};
	h.nb=function(a,b,c){var d=a.wa(),e=[],f=[],g=null!=ki(this);if("default"===d){var k=this;v(this.za,function(a,d){f=f.concat(a.nb(b,c));a.e()&&(delete k.za[d],He(a.Y.n)||e.push(a.Y))})}else{var m=z(this.za,d);m&&(f=f.concat(m.nb(b,c)),m.e()&&(delete this.za[d],He(m.Y.n)||e.push(m.Y)))}g&&null==ki(this)&&e.push(new X(a.k,a.path));return{Vg:e,vg:f}};function li(a){return Na(qa(a.za),function(a){return!He(a.Y.n)})}h.kb=function(a){var b=null;v(this.za,function(c){b=b||c.kb(a)});return b};
	function mi(a,b){if(He(b.n))return ki(a);var c=b.wa();return z(a.za,c)}function ki(a){return ua(a.za,function(a){return He(a.Y.n)})||null};function ni(a){this.va=qe;this.mb=new Pf;this.df={};this.qc={};this.Qc=a}function oi(a,b,c,d,e){var f=a.mb,g=e;O(d>f.Pc,"Stacking an older write on top of newer ones");p(g)||(g=!0);f.pa.push({path:b,Ja:c,md:d,visible:g});g&&(f.V=Jf(f.V,b,c));f.Pc=d;return e?pi(a,new Ac(Ef,b,c)):[]}function qi(a,b,c,d){var e=a.mb;O(d>e.Pc,"Stacking an older merge on top of newer ones");e.pa.push({path:b,children:c,md:d,visible:!0});e.V=Kf(e.V,b,c);e.Pc=d;c=sf(c);return pi(a,new bf(Ef,b,c))}
	function ri(a,b,c){c=c||!1;var d=Qf(a.mb,b);if(a.mb.Ud(b)){var e=qe;null!=d.Ja?e=e.set(M,!0):Fb(d.children,function(a,b){e=e.set(new P(a),b)});return pi(a,new Df(d.path,e,c))}return[]}function si(a,b,c){c=sf(c);return pi(a,new bf(Gf,b,c))}function ti(a,b,c,d){d=ui(a,d);if(null!=d){var e=vi(d);d=e.path;e=e.Lb;b=lf(d,b);c=new Ac(new Ff(!1,!0,e,!0),b,c);return wi(a,d,c)}return[]}
	function xi(a,b,c,d){if(d=ui(a,d)){var e=vi(d);d=e.path;e=e.Lb;b=lf(d,b);c=sf(c);c=new bf(new Ff(!1,!0,e,!0),b,c);return wi(a,d,c)}return[]}
	ni.prototype.Tb=function(a,b){var c=a.path,d=null,e=!1;zf(this.va,c,function(a,b){var f=lf(a,c);d=d||b.kb(f);e=e||null!=ki(b)});var f=this.va.get(c);f?(e=e||null!=ki(f),d=d||f.kb(M)):(f=new ji,this.va=this.va.set(c,f));var g;null!=d?g=!0:(g=!1,d=H,Cf(this.va.subtree(c),function(a,b){var c=b.kb(M);c&&(d=d.W(a,c))}));var k=null!=mi(f,a);if(!k&&!He(a.n)){var m=yi(a);O(!(m in this.qc),"View does not exist, but we have a tag");var l=zi++;this.qc[m]=l;this.df["_"+l]=m}g=f.Tb(a,b,new Uf(c,this.mb),d,g);
	k||e||(f=mi(f,a),g=g.concat(Ai(this,a,f)));return g};
	ni.prototype.nb=function(a,b,c){var d=a.path,e=this.va.get(d),f=[];if(e&&("default"===a.wa()||null!=mi(e,a))){f=e.nb(a,b,c);e.e()&&(this.va=this.va.remove(d));e=f.Vg;f=f.vg;b=-1!==Sa(e,function(a){return He(a.n)});var g=xf(this.va,d,function(a,b){return null!=ki(b)});if(b&&!g&&(d=this.va.subtree(d),!d.e()))for(var d=Bi(d),k=0;k<d.length;++k){var m=d[k],l=m.Y,m=Ci(this,m);this.Qc.af(Di(l),Ei(this,l),m.Ad,m.I)}if(!g&&0<e.length&&!c)if(b)this.Qc.de(Di(a),null);else{var t=this;Ma(e,function(a){a.wa();
	var b=t.qc[yi(a)];t.Qc.de(Di(a),b)})}Fi(this,e)}return f};ni.prototype.Aa=function(a,b){var c=this.mb,d=xf(this.va,a,function(b,c){var d=lf(b,a);if(d=c.kb(d))return d});return c.Aa(a,d,b,!0)};function Bi(a){return vf(a,function(a,c,d){if(c&&null!=ki(c))return[ki(c)];var e=[];c&&(e=li(c));v(d,function(a){e=e.concat(a)});return e})}function Fi(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!He(d.n)){var d=yi(d),e=a.qc[d];delete a.qc[d];delete a.df["_"+e]}}}
	function Di(a){return He(a.n)&&!Ie(a.n)?a.Mb():a}function Ai(a,b,c){var d=b.path,e=Ei(a,b);c=Ci(a,c);b=a.Qc.af(Di(b),e,c.Ad,c.I);d=a.va.subtree(d);if(e)O(null==ki(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=vf(d,function(a,b,c){if(!a.e()&&b&&null!=ki(b))return[Ze(ki(b))];var d=[];b&&(d=d.concat(Oa(li(b),function(a){return a.Y})));v(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Qc.de(Di(c),Ei(a,c));return b}
	function Ci(a,b){var c=b.Y,d=Ei(a,c);return{Ad:function(){return(b.w()||H).hash()},I:function(b){if("ok"===b){if(d){var f=c.path;if(b=ui(a,d)){var g=vi(b);b=g.path;g=g.Lb;f=lf(b,f);f=new Cc(new Ff(!1,!0,g,!0),f);b=wi(a,b,f)}else b=[]}else b=pi(a,new Cc(Gf,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.nb(c,null,f)}}}function yi(a){return a.path.toString()+"$"+a.wa()}function vi(a){var b=a.indexOf("$");O(-1!==b&&b<a.length-1,"Bad queryKey.");return{Lb:a.substr(b+1),path:new P(a.substr(0,b))}}function ui(a,b){var c=a.df,d="_"+b;return d in c?c[d]:void 0}function Ei(a,b){var c=yi(b);return z(a.qc,c)}var zi=1;
	function wi(a,b,c){var d=a.va.get(b);O(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new Uf(b,a.mb),null)}function pi(a,b){return Gi(a,b,a.va,null,new Uf(M,a.mb))}function Gi(a,b,c,d,e){if(b.path.e())return Hi(a,b,c,d,e);var f=c.get(M);null==d&&null!=f&&(d=f.kb(M));var g=[],k=K(b.path),m=b.$c(k);if((c=c.children.get(k))&&m)var l=d?d.T(k):null,k=e.o(k),g=g.concat(Gi(a,m,c,l,k));f&&(g=g.concat(f.gb(b,e,d)));return g}
	function Hi(a,b,c,d,e){var f=c.get(M);null==d&&null!=f&&(d=f.kb(M));var g=[];c.children.ka(function(c,f){var l=d?d.T(c):null,t=e.o(c),A=b.$c(c);A&&(g=g.concat(Hi(a,A,f,l,t)))});f&&(g=g.concat(f.gb(b,e,d)));return g};function Ii(a,b){this.G=a;this.Xa=uc(a);this.hd=null;this.fa=new Zb;this.Kd=1;this.Va=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.da=new cf(this.G,u(this.Kb,this)),setTimeout(u(this.Xc,this,!0),0)):this.da=this.Va=new Qh(this.G,u(this.Kb,this),u(this.Xc,this),u(this.Se,this));this.dh=vc(a,u(function(){return new pc(this.Xa,this.da)},this));this.yc=new Wf;
	this.Ge=new Sb;var c=this;this.Fd=new ni({af:function(a,b,f,g){b=[];f=c.Ge.j(a.path);f.e()||(b=pi(c.Fd,new Ac(Gf,a.path,f)),setTimeout(function(){g("ok")},0));return b},de:aa});Ji(this,"connected",!1);this.na=new Vc;this.O=new Xg(a,u(this.da.O,this.da),u(this.da.je,this.da),u(this.Pe,this));this.ud=0;this.He=null;this.M=new ni({af:function(a,b,f,g){c.da.Cf(a,f,b,function(b,e){var f=g(b,e);dc(c.fa,a.path,f)});return[]},de:function(a,b){c.da.$f(a,b)}})}h=Ii.prototype;
	h.toString=function(){return(this.G.ob?"https://":"http://")+this.G.host};h.name=function(){return this.G.lc};function Ki(a){a=a.Ge.j(new P(".info/serverTimeOffset")).J()||0;return(new Date).getTime()+a}function Li(a){a=a={timestamp:Ki(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	h.Kb=function(a,b,c,d){this.ud++;var e=new P(a);b=this.He?this.He(a,b):b;a=[];d?c?(b=ma(b,function(a){return Q(a)}),a=xi(this.M,e,b,d)):(b=Q(b),a=ti(this.M,e,b,d)):c?(d=ma(b,function(a){return Q(a)}),a=si(this.M,e,d)):(d=Q(b),a=pi(this.M,new Ac(Gf,e,d)));d=e;0<a.length&&(d=Mi(this,e));dc(this.fa,d,a)};h.Xc=function(a){Ji(this,"connected",a);!1===a&&Ni(this)};h.Se=function(a){var b=this;zd(a,function(a,d){Ji(b,d,a)})};h.Pe=function(a){Ji(this,"authenticated",a)};
	function Ji(a,b,c){b=new P("/.info/"+b);c=Q(c);var d=a.Ge;d.Zd=d.Zd.H(b,c);c=pi(a.Fd,new Ac(Gf,b,c));dc(a.fa,b,c)}h.Ob=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,lh:c});var e=Li(this);b=Q(b,c);var e=Xc(b,e),f=this.Kd++,e=oi(this.M,a,e,f,!0);$b(this.fa,e);var g=this;this.da.put(a.toString(),b.J(!0),function(b,c){var e="ok"===b;e||S("set at "+a+" failed: "+b);e=ri(g.M,f,!e);dc(g.fa,a,e);Oi(d,b,c)});e=Pi(this,a);Mi(this,e);dc(this.fa,e,[])};
	h.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Li(this),f={};v(b,function(a,b){d=!1;var c=Q(a);f[b]=Xc(c,e)});if(d)fc("update() called with empty data.  Don't do anything."),Oi(c,"ok");else{var g=this.Kd++,k=qi(this.M,a,f,g);$b(this.fa,k);var m=this;this.da.Df(a.toString(),b,function(b,d){var e="ok"===b;e||S("update at "+a+" failed: "+b);var e=ri(m.M,g,!e),f=a;0<e.length&&(f=Mi(m,a));dc(m.fa,f,e);Oi(c,b,d)});b=Pi(this,a);Mi(this,b);dc(this.fa,a,[])}};
	function Ni(a){a.f("onDisconnectEvents");var b=Li(a),c=[];Wc(Uc(a.na,b),M,function(b,e){c=c.concat(pi(a.M,new Ac(Gf,b,e)));var f=Pi(a,b);Mi(a,f)});a.na=new Vc;dc(a.fa,M,c)}h.Md=function(a,b){var c=this;this.da.Md(a.toString(),function(d,e){"ok"===d&&wg(c.na,a);Oi(b,d,e)})};function ei(a,b,c,d){var e=Q(c);a.da.Qe(b.toString(),e.J(!0),function(c,g){"ok"===c&&a.na.rc(b,e);Oi(d,c,g)})}function fi(a,b,c,d,e){var f=Q(c,d);a.da.Qe(b.toString(),f.J(!0),function(c,d){"ok"===c&&a.na.rc(b,f);Oi(e,c,d)})}
	function gi(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(fc("onDisconnect().update() called with empty data.  Don't do anything."),Oi(d,"ok")):a.da.Gf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=Q(c[m]);a.na.rc(b.o(m),l)}Oi(d,e,f)})}function Qi(a,b,c){c=".info"===K(b.path)?a.Fd.Tb(b,c):a.M.Tb(b,c);bc(a.fa,b.path,c)}h.Cb=function(){this.Va&&this.Va.Cb()};h.vc=function(){this.Va&&this.Va.vc()};
	h.bf=function(a){if("undefined"!==typeof console){a?(this.hd||(this.hd=new oc(this.Xa)),a=this.hd.get()):a=this.Xa.get();var b=Pa(ra(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.cf=function(a){rc(this.Xa,a);this.dh.Vf[a]=!0};h.f=function(a){var b="";this.Va&&(b=this.Va.id+":");fc(b,arguments)};
	function Oi(a,b,c){a&&gc(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Ri(a,b,c,d,e){function f(){}a.f("transaction on "+b);var g=new X(a,b);g.Ib("value",f);c={path:b,update:c,I:d,status:null,Lf:id(),gf:e,Sf:0,le:function(){g.mc("value",f)},ne:null,Da:null,rd:null,sd:null,td:null};d=a.M.Aa(b,void 0)||H;c.rd=d;d=c.update(d.J());if(p(d)){hg("transaction failed: Data returned ",d,c.path);c.status=1;e=Xf(a.yc,b);var k=e.Ea()||[];k.push(c);Yf(e,k);"object"===typeof d&&null!==d&&y(d,".priority")?(k=z(d,".priority"),O(fg(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.M.Aa(b)||H).C().J();e=Li(a);d=Q(d,k);e=Xc(d,e);c.sd=d;c.td=e;c.Da=a.Kd++;c=oi(a.M,b,e,c.Da,c.gf);dc(a.fa,b,c);Si(a)}else c.le(),c.sd=null,c.td=null,c.I&&(a=new W(c.rd,new X(a,c.path),R),c.I(null,!1,a))}function Si(a,b){var c=b||a.yc;b||Ti(a,c);if(null!==c.Ea()){var d=Ui(a,c);O(0<d.length,"Sending zero length transaction queue");Qa(d,function(a){return 1===a.status})&&Vi(a,c.path(),d)}else c.zd()&&c.R(function(b){Si(a,b)})}
	function Vi(a,b,c){for(var d=Oa(c,function(a){return a.Da}),e=a.M.Aa(b,d)||H,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];O(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.Sf++;var k=lf(b,g.path),d=d.H(k,g.sd)}d=d.J(!0);a.da.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(ri(a.M,c[f].Da));if(c[f].I){var g=c[f].td,k=new X(a,c[f].path);d.push(u(c[f].I,
	null,null,!0,new W(g,k,R)))}c[f].le()}Ti(a,Xf(a.yc,b));Si(a);dc(a.fa,b,e);for(f=0;f<d.length;f++)gc(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(S("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].ne=d;Mi(a,b)}},e)}function Mi(a,b){var c=Wi(a,b),d=c.path(),c=Ui(a,c);Xi(a,c,d);return d}
	function Xi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Oa(b,function(a){return a.Da}),g=0;g<b.length;g++){var k=b[g],m=lf(c,k.path),l=!1,t;O(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,t=k.ne,e=e.concat(ri(a.M,k.Da,!0));else if(1===k.status)if(25<=k.Sf)l=!0,t="maxretry",e=e.concat(ri(a.M,k.Da,!0));else{var A=a.M.Aa(k.path,f)||H;k.rd=A;var I=b[g].update(A.J());p(I)?(hg("transaction failed: Data returned ",I,k.path),m=Q(I),"object"===typeof I&&null!=
	I&&y(I,".priority")||(m=m.ia(A.C())),A=k.Da,I=Li(a),I=Xc(m,I),k.sd=m,k.td=I,k.Da=a.Kd++,Ta(f,A),e=e.concat(oi(a.M,k.path,I,k.Da,k.gf)),e=e.concat(ri(a.M,A,!0))):(l=!0,t="nodata",e=e.concat(ri(a.M,k.Da,!0)))}dc(a.fa,c,e);e=[];l&&(b[g].status=3,setTimeout(b[g].le,Math.floor(0)),b[g].I&&("nodata"===t?(k=new X(a,b[g].path),d.push(u(b[g].I,null,null,!1,new W(b[g].rd,k,R)))):d.push(u(b[g].I,null,Error(t),!1,null))))}Ti(a,a.yc);for(g=0;g<d.length;g++)gc(d[g]);Si(a)}}
	function Wi(a,b){for(var c,d=a.yc;null!==(c=K(b))&&null===d.Ea();)d=Xf(d,c),b=N(b);return d}function Ui(a,b){var c=[];Yi(a,b,c);c.sort(function(a,b){return a.Lf-b.Lf});return c}function Yi(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.R(function(b){Yi(a,b,c)})}function Ti(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Yf(b,0<c.length?c:null)}b.R(function(b){Ti(a,b)})}
	function Pi(a,b){var c=Wi(a,b).path(),d=Xf(a.yc,b);ag(d,function(b){Zi(a,b)});Zi(a,d);$f(d,function(b){Zi(a,b)});return c}
	function Zi(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)4!==c[g].status&&(2===c[g].status?(O(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].ne="set"):(O(1===c[g].status,"Unexpected transaction status in abort"),c[g].le(),e=e.concat(ri(a.M,c[g].Da,!0)),c[g].I&&d.push(u(c[g].I,null,Error("set"),!1,null))));-1===f?Yf(b,null):c.length=f+1;dc(a.fa,b.path(),e);for(g=0;g<d.length;g++)gc(d[g])}};function $i(){this.sc={};this.ag=!1}$i.prototype.Cb=function(){for(var a in this.sc)this.sc[a].Cb()};$i.prototype.vc=function(){for(var a in this.sc)this.sc[a].vc()};$i.prototype.ze=function(){this.ag=!0};ba($i);$i.prototype.interrupt=$i.prototype.Cb;$i.prototype.resume=$i.prototype.vc;function Y(a,b,c,d){this.k=a;this.path=b;this.n=c;this.pc=d}
	function aj(a){var b=null,c=null;a.oa&&(b=Od(a));a.ra&&(c=Rd(a));if(a.g===re){if(a.oa){if("[MIN_NAME]"!=Nd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.ra){if("[MAX_NAME]"!=Pd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===R){if(null!=b&&!fg(b)||null!=c&&!fg(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(O(a.g instanceof ve||a.g===Be,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function bj(a){if(a.oa&&a.ra&&a.la&&(!a.la||""===a.Rb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function cj(a,b){if(!0===a.pc)throw Error(b+": You can't combine multiple orderBy calls.");}h=Y.prototype;h.Mb=function(){D("Query.ref",0,0,arguments.length);return new X(this.k,this.path)};
	h.Ib=function(a,b,c,d){D("Query.on",2,4,arguments.length);lg("Query.on",a,!1);F("Query.on",2,b,!1);var e=dj("Query.on",c,d);if("value"===a)Qi(this.k,this,new hi(b,e.cancel||null,e.Qa||null));else{var f={};f[a]=b;Qi(this.k,this,new ii(f,e.cancel,e.Qa))}return b};
	h.mc=function(a,b,c){D("Query.off",0,3,arguments.length);lg("Query.off",a,!0);F("Query.off",2,b,!0);Qb("Query.off",3,c);var d=null,e=null;"value"===a?d=new hi(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new ii(e,null,c||null));e=this.k;d=".info"===K(this.path)?e.Fd.nb(this,d):e.M.nb(this,d);bc(e.fa,this.path,d)};
	h.Og=function(a,b){function c(k){f&&(f=!1,e.mc(a,c),b&&b.call(d.Qa,k),g.resolve(k))}D("Query.once",1,4,arguments.length);lg("Query.once",a,!1);F("Query.once",2,b,!0);var d=dj("Query.once",arguments[2],arguments[3]),e=this,f=!0,g=new B;Nb(g.D);this.Ib(a,c,function(b){e.mc(a,c);d.cancel&&d.cancel.call(d.Qa,b);g.reject(b)});return g.D};
	h.Le=function(a){S("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");D("Query.limit",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.n.Le(a);bj(b);return new Y(this.k,this.path,b,this.pc)};
	h.Me=function(a){D("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Me(a),this.pc)};
	h.Ne=function(a){D("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.la)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Ne(a),this.pc)};
	h.Pg=function(a){D("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ng("Query.orderByChild",a);cj(this,"Query.orderByChild");var b=new P(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new ve(b);b=Fe(this.n,b);aj(b);return new Y(this.k,this.path,b,!0)};h.Qg=function(){D("Query.orderByKey",0,0,arguments.length);cj(this,"Query.orderByKey");var a=Fe(this.n,re);aj(a);return new Y(this.k,this.path,a,!0)};h.Rg=function(){D("Query.orderByPriority",0,0,arguments.length);cj(this,"Query.orderByPriority");var a=Fe(this.n,R);aj(a);return new Y(this.k,this.path,a,!0)};
	h.Sg=function(){D("Query.orderByValue",0,0,arguments.length);cj(this,"Query.orderByValue");var a=Fe(this.n,Be);aj(a);return new Y(this.k,this.path,a,!0)};h.ce=function(a,b){D("Query.startAt",0,2,arguments.length);gg("Query.startAt",a,this.path,!0);mg("Query.startAt",b);var c=this.n.ce(a,b);bj(c);aj(c);if(this.n.oa)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new Y(this.k,this.path,c,this.pc)};
	h.vd=function(a,b){D("Query.endAt",0,2,arguments.length);gg("Query.endAt",a,this.path,!0);mg("Query.endAt",b);var c=this.n.vd(a,b);bj(c);aj(c);if(this.n.ra)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.pc)};
	h.tg=function(a,b){D("Query.equalTo",1,2,arguments.length);gg("Query.equalTo",a,this.path,!1);mg("Query.equalTo",b);if(this.n.oa)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.ra)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.ce(a,b).vd(a,b)};
	h.toString=function(){D("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.aa;c<a.u.length;c++)""!==a.u[c]&&(b+="/"+encodeURIComponent(String(a.u[c])));return this.k.toString()+(b||"/")};h.wa=function(){var a=xd(Ge(this.n));return"{}"===a?"default":a};
	function dj(a,b,c){var d={cancel:null,Qa:null};if(b&&c)d.cancel=b,F(a,3,d.cancel,!0),d.Qa=c,Qb(a,4,d.Qa);else if(b)if("object"===typeof b&&null!==b)d.Qa=b;else if("function"===typeof b)d.cancel=b;else throw Error(E(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.Mb;Y.prototype.on=Y.prototype.Ib;Y.prototype.off=Y.prototype.mc;Y.prototype.once=Y.prototype.Og;Y.prototype.limit=Y.prototype.Le;Y.prototype.limitToFirst=Y.prototype.Me;
	Y.prototype.limitToLast=Y.prototype.Ne;Y.prototype.orderByChild=Y.prototype.Pg;Y.prototype.orderByKey=Y.prototype.Qg;Y.prototype.orderByPriority=Y.prototype.Rg;Y.prototype.orderByValue=Y.prototype.Sg;Y.prototype.startAt=Y.prototype.ce;Y.prototype.endAt=Y.prototype.vd;Y.prototype.equalTo=Y.prototype.tg;Y.prototype.toString=Y.prototype.toString;var Z={};Z.zc=Qh;Z.DataConnection=Z.zc;Qh.prototype.bh=function(a,b){this.Ia("q",{p:a},b)};Z.zc.prototype.simpleListen=Z.zc.prototype.bh;Qh.prototype.sg=function(a,b){this.Ia("echo",{d:a},b)};Z.zc.prototype.echo=Z.zc.prototype.sg;Qh.prototype.interrupt=Qh.prototype.Cb;Z.dg=Eh;Z.RealTimeConnection=Z.dg;Eh.prototype.sendRequest=Eh.prototype.Ia;Eh.prototype.close=Eh.prototype.close;
	Z.Cg=function(a){var b=Qh.prototype.put;Qh.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Qh.prototype.put=b}};Z.hijackHash=Z.Cg;Z.cg=dd;Z.ConnectionTarget=Z.cg;Z.wa=function(a){return a.wa()};Z.queryIdentifier=Z.wa;Z.Eg=function(a){return a.k.Va.ba};Z.listens=Z.Eg;Z.ze=function(a){a.ze()};Z.forceRestClient=Z.ze;function X(a,b){var c,d,e;if(a instanceof Ii)c=a,d=b;else{D("new Firebase",1,2,arguments.length);d=sd(arguments[0]);c=d.eh;"firebase"===d.domain&&rd(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||rd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.ob||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&S("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
	c=new dd(d.host,d.ob,c,"ws"===d.scheme||"wss"===d.scheme);d=new P(d.bd);e=d.toString();var f;!(f=!q(c.host)||0===c.host.length||!eg(c.lc))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(q(e)&&0!==e.length&&!cg.test(e)));if(f)throw Error(E("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof $i)e=b;else if(q(b))e=$i.yb(),c.Rd=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
	else e=$i.yb();f=c.toString();var g=z(e.sc,f);g||(g=new Ii(c,e.ag),e.sc[f]=g);c=g}Y.call(this,c,d,De,!1);this.then=void 0;this["catch"]=void 0}ka(X,Y);var ej=X,fj=["Firebase"],gj=n;fj[0]in gj||!gj.execScript||gj.execScript("var "+fj[0]);for(var hj;fj.length&&(hj=fj.shift());)!fj.length&&p(ej)?gj[hj]=ej:gj=gj[hj]?gj[hj]:gj[hj]={};X.goOffline=function(){D("Firebase.goOffline",0,0,arguments.length);$i.yb().Cb()};X.goOnline=function(){D("Firebase.goOnline",0,0,arguments.length);$i.yb().vc()};
	X.enableLogging=od;X.ServerValue={TIMESTAMP:{".sv":"timestamp"}};X.SDK_VERSION=Eb;X.INTERNAL=U;X.Context=$i;X.TEST_ACCESS=Z;X.prototype.name=function(){S("Firebase.name() being deprecated. Please use Firebase.key() instead.");D("Firebase.name",0,0,arguments.length);return this.key()};X.prototype.name=X.prototype.name;X.prototype.key=function(){D("Firebase.key",0,0,arguments.length);return this.path.e()?null:me(this.path)};X.prototype.key=X.prototype.key;
	X.prototype.o=function(a){D("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof P))if(null===K(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ng("Firebase.child",b)}else ng("Firebase.child",a);return new X(this.k,this.path.o(a))};X.prototype.child=X.prototype.o;X.prototype.parent=function(){D("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new X(this.k,a)};X.prototype.parent=X.prototype.parent;
	X.prototype.root=function(){D("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};X.prototype.root=X.prototype.root;X.prototype.set=function(a,b){D("Firebase.set",1,2,arguments.length);og("Firebase.set",this.path);gg("Firebase.set",a,this.path,!1);F("Firebase.set",2,b,!0);var c=new B;this.k.Ob(this.path,a,null,C(c,b));return c.D};X.prototype.set=X.prototype.set;
	X.prototype.update=function(a,b){D("Firebase.update",1,2,arguments.length);og("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;S("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}jg("Firebase.update",a,this.path);F("Firebase.update",2,b,!0);c=new B;this.k.update(this.path,a,C(c,b));return c.D};
	X.prototype.update=X.prototype.update;X.prototype.Ob=function(a,b,c){D("Firebase.setWithPriority",2,3,arguments.length);og("Firebase.setWithPriority",this.path);gg("Firebase.setWithPriority",a,this.path,!1);kg("Firebase.setWithPriority",2,b);F("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";var d=new B;this.k.Ob(this.path,a,b,C(d,c));return d.D};X.prototype.setWithPriority=X.prototype.Ob;
	X.prototype.remove=function(a){D("Firebase.remove",0,1,arguments.length);og("Firebase.remove",this.path);F("Firebase.remove",1,a,!0);return this.set(null,a)};X.prototype.remove=X.prototype.remove;
	X.prototype.transaction=function(a,b,c){D("Firebase.transaction",1,3,arguments.length);og("Firebase.transaction",this.path);F("Firebase.transaction",1,a,!1);F("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(E("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new B;r(b)&&Nb(d.D);Ri(this.k,this.path,a,function(a,c,g){a?
	d.reject(a):d.resolve(new di(c,g));r(b)&&b(a,c,g)},c);return d.D};X.prototype.transaction=X.prototype.transaction;X.prototype.Zg=function(a,b){D("Firebase.setPriority",1,2,arguments.length);og("Firebase.setPriority",this.path);kg("Firebase.setPriority",1,a);F("Firebase.setPriority",2,b,!0);var c=new B;this.k.Ob(this.path.o(".priority"),a,null,C(c,b));return c.D};X.prototype.setPriority=X.prototype.Zg;
	X.prototype.push=function(a,b){D("Firebase.push",0,2,arguments.length);og("Firebase.push",this.path);gg("Firebase.push",a,this.path,!0);F("Firebase.push",2,b,!0);var c=Ki(this.k),d=hf(c),c=this.o(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.o(d)});c.then=u(f.then,f);c["catch"]=u(f.then,f,void 0);r(b)&&Nb(f)}return c};X.prototype.push=X.prototype.push;X.prototype.lb=function(){og("Firebase.onDisconnect",this.path);return new V(this.k,this.path)};X.prototype.onDisconnect=X.prototype.lb;
	X.prototype.O=function(a,b,c){S("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");D("Firebase.auth",1,3,arguments.length);pg("Firebase.auth",a);F("Firebase.auth",2,b,!0);F("Firebase.auth",3,b,!0);var d=new B;ch(this.k.O,a,{},{remember:"none"},C(d,b),c);return d.D};X.prototype.auth=X.prototype.O;X.prototype.je=function(a){D("Firebase.unauth",0,1,arguments.length);F("Firebase.unauth",1,a,!0);var b=new B;dh(this.k.O,C(b,a));return b.D};X.prototype.unauth=X.prototype.je;
	X.prototype.Be=function(){D("Firebase.getAuth",0,0,arguments.length);return this.k.O.Be()};X.prototype.getAuth=X.prototype.Be;X.prototype.Ig=function(a,b){D("Firebase.onAuth",1,2,arguments.length);F("Firebase.onAuth",1,a,!1);Qb("Firebase.onAuth",2,b);this.k.O.Ib("auth_status",a,b)};X.prototype.onAuth=X.prototype.Ig;X.prototype.Hg=function(a,b){D("Firebase.offAuth",1,2,arguments.length);F("Firebase.offAuth",1,a,!1);Qb("Firebase.offAuth",2,b);this.k.O.mc("auth_status",a,b)};X.prototype.offAuth=X.prototype.Hg;
	X.prototype.hg=function(a,b,c){D("Firebase.authWithCustomToken",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);pg("Firebase.authWithCustomToken",a);F("Firebase.authWithCustomToken",2,b,!0);sg("Firebase.authWithCustomToken",3,c,!0);var d=new B;ch(this.k.O,a,{},c||{},C(d,b));return d.D};X.prototype.authWithCustomToken=X.prototype.hg;
	X.prototype.ig=function(a,b,c){D("Firebase.authWithOAuthPopup",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);rg("Firebase.authWithOAuthPopup",a);F("Firebase.authWithOAuthPopup",2,b,!0);sg("Firebase.authWithOAuthPopup",3,c,!0);var d=new B;hh(this.k.O,a,c,C(d,b));return d.D};X.prototype.authWithOAuthPopup=X.prototype.ig;
	X.prototype.jg=function(a,b,c){D("Firebase.authWithOAuthRedirect",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);rg("Firebase.authWithOAuthRedirect",a);F("Firebase.authWithOAuthRedirect",2,b,!1);sg("Firebase.authWithOAuthRedirect",3,c,!0);var d=new B,e=this.k.O,f=c,g=C(d,b);fh(e);var k=[Pg],f=Ag(f);"anonymous"===a||"firebase"===a?T(g,Rg("TRANSPORT_UNAVAILABLE")):(cd.set("redirect_client_options",f.qd),gh(e,k,"/auth/"+a,f,g));return d.D};X.prototype.authWithOAuthRedirect=X.prototype.jg;
	X.prototype.kg=function(a,b,c,d){D("Firebase.authWithOAuthToken",2,4,arguments.length);3===arguments.length&&Hb(c)&&(d=c,c=void 0);rg("Firebase.authWithOAuthToken",a);F("Firebase.authWithOAuthToken",3,c,!0);sg("Firebase.authWithOAuthToken",4,d,!0);var e=new B;q(b)?(qg("Firebase.authWithOAuthToken",2,b),eh(this.k.O,a+"/token",{access_token:b},d,C(e,c))):(sg("Firebase.authWithOAuthToken",2,b,!1),eh(this.k.O,a+"/token",b,d,C(e,c)));return e.D};X.prototype.authWithOAuthToken=X.prototype.kg;
	X.prototype.gg=function(a,b){D("Firebase.authAnonymously",0,2,arguments.length);1===arguments.length&&Hb(a)&&(b=a,a=void 0);F("Firebase.authAnonymously",1,a,!0);sg("Firebase.authAnonymously",2,b,!0);var c=new B;eh(this.k.O,"anonymous",{},b,C(c,a));return c.D};X.prototype.authAnonymously=X.prototype.gg;
	X.prototype.lg=function(a,b,c){D("Firebase.authWithPassword",1,3,arguments.length);2===arguments.length&&Hb(b)&&(c=b,b=void 0);sg("Firebase.authWithPassword",1,a,!1);tg("Firebase.authWithPassword",a,"email");tg("Firebase.authWithPassword",a,"password");F("Firebase.authWithPassword",2,b,!0);sg("Firebase.authWithPassword",3,c,!0);var d=new B;eh(this.k.O,"password",a,c,C(d,b));return d.D};X.prototype.authWithPassword=X.prototype.lg;
	X.prototype.ve=function(a,b){D("Firebase.createUser",1,2,arguments.length);sg("Firebase.createUser",1,a,!1);tg("Firebase.createUser",a,"email");tg("Firebase.createUser",a,"password");F("Firebase.createUser",2,b,!0);var c=new B;this.k.O.ve(a,C(c,b));return c.D};X.prototype.createUser=X.prototype.ve;
	X.prototype.Xe=function(a,b){D("Firebase.removeUser",1,2,arguments.length);sg("Firebase.removeUser",1,a,!1);tg("Firebase.removeUser",a,"email");tg("Firebase.removeUser",a,"password");F("Firebase.removeUser",2,b,!0);var c=new B;this.k.O.Xe(a,C(c,b));return c.D};X.prototype.removeUser=X.prototype.Xe;
	X.prototype.se=function(a,b){D("Firebase.changePassword",1,2,arguments.length);sg("Firebase.changePassword",1,a,!1);tg("Firebase.changePassword",a,"email");tg("Firebase.changePassword",a,"oldPassword");tg("Firebase.changePassword",a,"newPassword");F("Firebase.changePassword",2,b,!0);var c=new B;this.k.O.se(a,C(c,b));return c.D};X.prototype.changePassword=X.prototype.se;
	X.prototype.re=function(a,b){D("Firebase.changeEmail",1,2,arguments.length);sg("Firebase.changeEmail",1,a,!1);tg("Firebase.changeEmail",a,"oldEmail");tg("Firebase.changeEmail",a,"newEmail");tg("Firebase.changeEmail",a,"password");F("Firebase.changeEmail",2,b,!0);var c=new B;this.k.O.re(a,C(c,b));return c.D};X.prototype.changeEmail=X.prototype.re;
	X.prototype.Ze=function(a,b){D("Firebase.resetPassword",1,2,arguments.length);sg("Firebase.resetPassword",1,a,!1);tg("Firebase.resetPassword",a,"email");F("Firebase.resetPassword",2,b,!0);var c=new B;this.k.O.Ze(a,C(c,b));return c.D};X.prototype.resetPassword=X.prototype.Ze;})();

	module.exports = Firebase;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueAlgolia=t():e.VueAlgolia=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(91),o=r(i),s={AlgoliaSearchDropdown:o["default"]};s.install=function(e){},"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),t["default"]=s,e.exports=t["default"]},function(e,t,n){var r=n(29),i=n(6),o=n(4),s="[object Array]",a=Object.prototype,l=a.toString,u=r(Array,"isArray"),c=u||function(e){return o(e)&&i(e.length)&&l.call(e)==s};e.exports=c},function(e,t){function n(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}e.exports=n},function(e,t,n){function r(e){return i(e)?e:Object(e)}var i=n(2);e.exports=r},function(e,t){function n(e){return!!e&&"object"==typeof e}e.exports=n},function(e,t,n){function r(e){return null!=e&&o(i(e))}var i=n(28),o=n(6);e.exports=r},function(e,t){function n(e){return"number"==typeof e&&e>-1&&e%1==0&&r>=e}var r=9007199254740991;e.exports=n},function(e,t,n){function r(e,t,n){var r=a(e)?i:s;return t=o(t,n,3),r(e,t)}var i=n(52),o=n(55),s=n(59),a=n(1);e.exports=r},function(e,t,n){function r(e,t,n){if("function"!=typeof e)return i;if(void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,i){return e.call(t,n,r,i)};case 4:return function(n,r,i,o){return e.call(t,n,r,i,o)};case 5:return function(n,r,i,o,s){return e.call(t,n,r,i,o,s)}}return function(){return e.apply(t,arguments)}}var i=n(36);e.exports=r},function(e,t,n){var r=n(29),i=n(5),o=n(2),s=n(79),a=r(Object,"keys"),l=a?function(e){var t=null==e?void 0:e.constructor;return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&i(e)?s(e):o(e)?a(e):[]}:s;e.exports=l},function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function i(){var e=arguments,n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),!n)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var i=0,o=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(i++,"%c"===e&&(o=i))}),e.splice(o,0,r),e}function o(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(n){}}function a(){var e;try{e=t.storage.debug}catch(n){}return e}function l(){try{return window.localStorage}catch(e){}}t=e.exports=n(47),t.log=o,t.formatArgs=i,t.save=s,t.load=a,t.useColors=r,t.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:l(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){return JSON.stringify(e)},t.enable(a())},function(e,t,n){function r(e){return o(e)&&i(e)&&a.call(e,"callee")&&!l.call(e,"callee")}var i=n(5),o=n(4),s=Object.prototype,a=s.hasOwnProperty,l=s.propertyIsEnumerable;e.exports=r},function(e,t,n){"use strict";function r(e,t){var r=n(18),i=this;"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):i.stack=(new Error).stack||"Cannot get a stacktrace, browser is too old",this.name=this.constructor.name,this.message=e||"Unknown error",t&&r(t,function(e,t){i[t]=e})}function i(e,t){function n(){var n=Array.prototype.slice.call(arguments,0);"string"!=typeof n[0]&&n.unshift(t),r.apply(this,n),this.name="AlgoliaSearch"+e+"Error"}return o(n,r),n}var o=n(13);o(r,Error),e.exports={AlgoliaSearchError:r,UnparsableJSON:i("UnparsableJSON","Could not parse the incoming response as JSON, see err.more for details"),RequestTimeout:i("RequestTimeout","Request timedout before getting a response"),Network:i("Network","Network issue, see err.more for details"),JSONPScriptFail:i("JSONPScriptFail","<script> was loaded but did not call our provided callback"),JSONPScriptError:i("JSONPScriptError","<script> unable to load due to an `error` event on it"),Unknown:i("Unknown","Unknown error occured")}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t){function n(e,t){for(var n=-1,r=e.length;++n<r&&t(e[n],n,e)!==!1;);return e}e.exports=n},function(e,t){function n(e,t){return e="number"==typeof e||r.test(e)?+e:-1,t=null==t?i:t,e>-1&&e%1==0&&t>e}var r=/^\d+$/,i=9007199254740991;e.exports=n},function(e,t,n){function r(e){return o(e)&&i(e.length)&&!!A[j.call(e)]}var i=n(6),o=n(4),s="[object Arguments]",a="[object Array]",l="[object Boolean]",u="[object Date]",c="[object Error]",d="[object Function]",p="[object Map]",f="[object Number]",h="[object Object]",v="[object RegExp]",_="[object Set]",m="[object String]",b="[object WeakMap]",g="[object ArrayBuffer]",y="[object Float32Array]",x="[object Float64Array]",w="[object Int8Array]",E="[object Int16Array]",T="[object Int32Array]",S="[object Uint8Array]",k="[object Uint8ClampedArray]",C="[object Uint16Array]",O="[object Uint32Array]",A={};A[y]=A[x]=A[w]=A[E]=A[T]=A[S]=A[k]=A[C]=A[O]=!0,A[s]=A[a]=A[g]=A[l]=A[u]=A[c]=A[d]=A[p]=A[f]=A[h]=A[v]=A[_]=A[m]=A[b]=!1;var R=Object.prototype,j=R.toString;e.exports=r},function(e,t,n){function r(e){if(null==e)return[];l(e)||(e=Object(e));var t=e.length;t=t&&a(t)&&(o(e)||i(e))&&t||0;for(var n=e.constructor,r=-1,u="function"==typeof n&&n.prototype===e,d=Array(t),p=t>0;++r<t;)d[r]=r+"";for(var f in e)p&&s(f,t)||"constructor"==f&&(u||!c.call(e,f))||d.push(f);return d}var i=n(11),o=n(1),s=n(15),a=n(6),l=n(2),u=Object.prototype,c=u.hasOwnProperty;e.exports=r},function(e,t,n){var r=n(14),i=n(22),o=n(71),s=o(r,i);e.exports=s},function(e,t){function n(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}e.exports=n},function(e,t,n){function r(e,t,n,h,v,_,m){var g;if(n&&(g=v?n(e,h,v):n(e)),void 0!==g)return g;if(!p(e))return e;var y=d(e);if(y){if(g=l(e),!t)return i(e,g)}else{var w=P.call(e),E=w==b;if(w!=x&&w!=f&&(!E||v))return M[w]?u(e,w,t):v?e:{};if(g=c(E?{}:e),!t)return s(g,e)}_||(_=[]),m||(m=[]);for(var T=_.length;T--;)if(_[T]==e)return m[T];return _.push(e),m.push(g),(y?o:a)(e,function(i,o){g[o]=r(i,t,n,o,e,_,m)}),g}var i=n(19),o=n(14),s=n(54),a=n(24),l=n(76),u=n(77),c=n(78),d=n(1),p=n(2),f="[object Arguments]",h="[object Array]",v="[object Boolean]",_="[object Date]",m="[object Error]",b="[object Function]",g="[object Map]",y="[object Number]",x="[object Object]",w="[object RegExp]",E="[object Set]",T="[object String]",S="[object WeakMap]",k="[object ArrayBuffer]",C="[object Float32Array]",O="[object Float64Array]",A="[object Int8Array]",R="[object Int16Array]",j="[object Int32Array]",I="[object Uint8Array]",N="[object Uint8ClampedArray]",D="[object Uint16Array]",L="[object Uint32Array]",M={};M[f]=M[h]=M[k]=M[v]=M[_]=M[C]=M[O]=M[A]=M[R]=M[j]=M[y]=M[x]=M[w]=M[T]=M[I]=M[N]=M[D]=M[L]=!0,M[m]=M[b]=M[g]=M[E]=M[S]=!1;var K=Object.prototype,P=K.toString;e.exports=r},function(e,t){function n(e,t,n){n||(n={});for(var r=-1,i=t.length;++r<i;){var o=t[r];n[o]=e[o]}return n}e.exports=n},function(e,t,n){var r=n(24),i=n(69),o=i(r);e.exports=o},function(e,t,n){var r=n(70),i=r();e.exports=i},function(e,t,n){function r(e,t){return i(e,t,o)}var i=n(23),o=n(9);e.exports=r},function(e,t,n){function r(e,t,n){if(null!=e){void 0!==n&&n in i(e)&&(t=[n]);for(var r=0,o=t.length;null!=e&&o>r;)e=e[t[r++]];return r&&r==o?e:void 0}}var i=n(3);e.exports=r},function(e,t,n){function r(e,t,n,a,l,u){return e===t?!0:null==e||null==t||!o(e)&&!s(t)?e!==e&&t!==t:i(e,t,r,n,a,l,u)}var i=n(57),o=n(2),s=n(4);e.exports=r},function(e,t){function n(e){return function(t){return null==t?void 0:t[e]}}e.exports=n},function(e,t,n){var r=n(27),i=r("length");e.exports=i},function(e,t,n){function r(e,t){var n=null==e?void 0:e[t];return i(n)?n:void 0}var i=n(82);e.exports=r},function(e,t,n){function r(e,t,n){if(!s(n))return!1;var r=typeof t;if("number"==r?i(n)&&o(t,n.length):"string"==r&&t in n){var a=n[t];return e===e?e===a:a!==a}return!1}var i=n(5),o=n(15),s=n(2);e.exports=r},function(e,t,n){function r(e,t){var n=typeof e;if("string"==n&&a.test(e)||"number"==n)return!0;if(i(e))return!1;var r=!s.test(e);return r||null!=t&&e in o(t)}var i=n(1),o=n(3),s=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,a=/^\w*$/;e.exports=r},function(e,t,n){function r(e){return e===e&&!i(e)}var i=n(2);e.exports=r},function(e,t,n){function r(e){if(o(e))return e;var t=[];return i(e).replace(s,function(e,n,r,i){t.push(r?i.replace(a,"$1"):n||e)}),t}var i=n(66),o=n(1),s=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,a=/\\(\\)?/g;e.exports=r},function(e,t,n){function r(e,t,n,r){return t&&"boolean"!=typeof t&&s(e,t,n)?t=!1:"function"==typeof t&&(r=n,n=t,t=!1),"function"==typeof n?i(e,t,o(n,r,3)):i(e,t)}var i=n(20),o=n(8),s=n(30);e.exports=r},function(e,t,n){var r=n(62),i=n(68),o=i(r);e.exports=o},function(e,t){function n(e){return e}e.exports=n},function(e,t,n){!function(t,n){e.exports=n()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}(function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))switch(typeof e[t]){case"function":break;case"object":e[t]=function(t){var n=t.slice(1),r=e[t[0]];return function(e,t,i){r.apply(this,[e,t,i].concat(n))}}(e[t]);break;default:e[t]=e[e[t]]}return e}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(148),o=r(i),s=n(149),a=r(s),l=n(150),u=r(l),c=n(151),d=r(c),p=n(152),f=r(p),h=n(153),v=r(h),_=n(5),m=r(_),b=n(154),g=r(b),y=n(20),x=r(y),w=n(12),E=r(w),T=n(21),S=r(T),k=n(155),C=r(k),O=n(6),A=r(O),R=n(156),j=r(R),I=n(22),N=r(I),D=n(157),L=r(D),M=n(23),K=r(M),P=n(158),$=r(P),B=n(159),U=r(B),q=n(24),z=r(q),V=n(167),F=r(V),H=n(25),W=r(H),G=n(160),X=r(G),Q=n(161),J=r(Q),Y=n(162),Z=r(Y),ee=n(163),te=r(ee),ne=n(13),re=r(ne),ie=n(164),oe=r(ie),se=n(165),ae=r(se),le=n(166),ue=r(le),ce=n(26),de=r(ce),pe=n(27),fe=r(pe),he=n(28),ve=r(he),_e=n(64),me=r(_e),be=n(63),ge=r(be),ye=n(168),xe=r(ye),we={AlertNotification:o["default"],CarouselItem:a["default"],Carousel:u["default"],CoverBanner:d["default"],CoverLink:f["default"],CoverOverlay:v["default"],Cover:m["default"],DropdownAreaList:g["default"],DropdownArea:x["default"],DropdownListItem:E["default"],DropdownMenu:S["default"],DropdownSearch:C["default"],Dropdown:A["default"],ExpandablePanel:j["default"],Expandable:N["default"],LayoutTransition:L["default"],Layout:K["default"],Modal:$["default"],Navbar:U["default"],SidebarToggleButton:z["default"],SidebarTransition:F["default"],Sidebar:W["default"],SidebarCollapseItem:X["default"],SidebarDropdownController:J["default"],SidebarDropdownItem:Z["default"],SidebarFeed:te["default"],SidebarMenuItem:re["default"],SidebarMenu:oe["default"],SidebarTabPane:ae["default"],SidebarTabs:ue["default"],TabPane:de["default"],TabsNav:fe["default"],Tabs:ve["default"]};we.install=function(e){e.directive("scrollable",me["default"]),e.directive("highlight",ge["default"]),e.use(xe["default"])},"undefined"!=typeof window&&window.Vue&&window.Vue.use(we),t["default"]=we,e.exports=t["default"]},function(e,t,n){function r(e,t,n){o(e,function(r,o){return i(e,o)?t.call(n,e[o],o,e):void 0})}var i=n(11),o=n(107);e.exports=r},function(e,t){function n(e){return null==e?"":e.toString()}e.exports=n},function(e,t,n){function r(e,t){(!i(e)||0>=e)&&(e=8),(!o(t)||t.length<1)&&(t=a);for(var n="",r=t.length-1;e--;)n+=t[s(0,r)];return n}var i=n(104),o=n(106),s=n(113),a="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";e.exports=r},function(e,t,n){function r(e,t){return i(e)===t}var i=n(10);e.exports=r},function(e,t,n){var r,i;n(80),r=n(36),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(95),r=n(42),i=n(130),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t){!function(e){var t=0,n=null;e.fn.resetBreakpoints=function(){e(window).unbind("resize"),n&&clearInterval(n),t=0},e.fn.setBreakpoints=function(r){var i=jQuery.extend({distinct:!0,breakpoints:new Array(320,480,768,1024)},r);n=setInterval(function(){var n=e(window).width(),r=!1;for(var o in i.breakpoints.sort(function(e,t){return t-e})){if(!r&&n>=i.breakpoints[o]&&t<i.breakpoints[o]){if(i.distinct){for(var s in i.breakpoints.sort(function(e,t){return t-e}))e("body").hasClass("breakpoint-"+i.breakpoints[s])&&(e("body").removeClass("breakpoint-"+i.breakpoints[s]),e(window).trigger("exitBreakpoint"+i.breakpoints[s]));r=!0}e("body").addClass("breakpoint-"+i.breakpoints[o]),e(window).trigger("enterBreakpoint"+i.breakpoints[o])}n<i.breakpoints[o]&&t>=i.breakpoints[o]&&(e("body").removeClass("breakpoint-"+i.breakpoints[o]),e(window).trigger("exitBreakpoint"+i.breakpoints[o])),i.distinct&&n>=i.breakpoints[o]&&n<i.breakpoints[o-1]&&t>n&&t>0&&!e("body").hasClass("breakpoint-"+i.breakpoints[o])&&(e("body").addClass("breakpoint-"+i.breakpoints[o]),e(window).trigger("enterBreakpoint"+i.breakpoints[o]))}t!=n&&(t=n)},250)}}(jQuery)},function(e,t,n){var r,i;!function(){function n(e,t){function r(){return y=e.charAt(++w),y||""}function i(t){var n="",i=w;return t&&a(),n=e.charAt(w+1)||"",w=i-1,r(),n}function o(t){for(var n=w;r();)if("\\"===y)r();else{if(-1!==t.indexOf(y))break;if("\n"===y)break}return e.substring(n,w+1)}function s(e){var t=w,n=o(e);return w=t-1,r(),n}function a(){for(var e="";x.test(i());)r(),e+=y;return e}function l(){var e="";for(y&&x.test(y)&&(e=y);x.test(r());)e+=y;return e}function u(t){var n=w;for(t="/"===i(),r();r();){if(!t&&"*"===y&&"/"===i()){r();break}if(t&&"\n"===y)return e.substring(n,w)}return e.substring(n,w)+y}function c(t){return e.substring(w-t.length,w).toLowerCase()===t}function d(){for(var t=0,n=w+1;n<e.length;n++){var r=e.charAt(n);if("{"===r)return!0;if("("===r)t+=1;else if(")"===r){if(0==t)return!1;t-=1}else if(";"===r||"}"===r)return!1}return!1}function p(){k++,T+=S}function f(){k--,T=T.slice(0,-h)}t=t||{},e=e||"",e=e.replace(/\r\n|[\r\u2028\u2029]/g,"\n");var h=t.indent_size||4,v=t.indent_char||" ",_=void 0===t.selector_separator_newline?!0:t.selector_separator_newline,m=void 0===t.end_with_newline?!1:t.end_with_newline,b=void 0===t.newline_between_rules?!0:t.newline_between_rules,g=t.eol?t.eol:"\n";"string"==typeof h&&(h=parseInt(h,10)),t.indent_with_tabs&&(v="	",h=1),g=g.replace(/\\r/,"\r").replace(/\\n/,"\n");var y,x=/^\s+$/,w=-1,E=0,T=e.match(/^[\t ]*/)[0],S=new Array(h+1).join(v),k=0,C=0,O={};O["{"]=function(e){O.singleSpace(),A.push(e),O.newLine()},O["}"]=function(e){O.newLine(),A.push(e),O.newLine()},O._lastCharWhitespace=function(){return x.test(A[A.length-1])},O.newLine=function(e){A.length&&(e||"\n"===A[A.length-1]||O.trim(),A.push("\n"),T&&A.push(T))},O.singleSpace=function(){A.length&&!O._lastCharWhitespace()&&A.push(" ")},O.preserveSingleSpace=function(){M&&O.singleSpace()},O.trim=function(){for(;O._lastCharWhitespace();)A.pop()};for(var A=[],R=!1,j=!1,I=!1,N="",D="";;){var L=l(),M=""!==L,K=-1!==L.indexOf("\n");if(D=N,N=y,!y)break;if("/"===y&&"*"===i()){var P=0===k;(K||P)&&O.newLine(),A.push(u()),O.newLine(),P&&O.newLine(!0)}else if("/"===y&&"/"===i())K||"{"===D||O.trim(),O.singleSpace(),A.push(u()),O.newLine();else if("@"===y){O.preserveSingleSpace(),A.push(y);var $=s(": ,;{}()[]/='\"");$.match(/[ :]$/)&&(r(),$=o(": ").replace(/\s$/,""),A.push($),O.singleSpace()),$=$.replace(/\s$/,""),$ in n.NESTED_AT_RULE&&(C+=1,$ in n.CONDITIONAL_GROUP_RULE&&(I=!0))}else"#"===y&&"{"===i()?(O.preserveSingleSpace(),A.push(o("}"))):"{"===y?"}"===i(!0)?(a(),r(),O.singleSpace(),A.push("{}"),O.newLine(),b&&0===k&&O.newLine(!0)):(p(),O["{"](y),I?(I=!1,R=k>C):R=k>=C):"}"===y?(f(),O["}"](y),R=!1,j=!1,C&&C--,b&&0===k&&O.newLine(!0)):":"===y?(a(),!R&&!I||c("&")||d()?":"===i()?(r(),A.push("::")):A.push(":"):(j=!0,A.push(":"),O.singleSpace())):'"'===y||"'"===y?(O.preserveSingleSpace(),A.push(o(y))):";"===y?(j=!1,A.push(y),O.newLine()):"("===y?c("url")?(A.push(y),a(),r()&&(")"!==y&&'"'!==y&&"'"!==y?A.push(o(")")):w--)):(E++,O.preserveSingleSpace(),A.push(y),a()):")"===y?(A.push(y),E--):","===y?(A.push(y),a(),_&&!j&&1>E?O.newLine():O.singleSpace()):"]"===y?A.push(y):"["===y?(O.preserveSingleSpace(),A.push(y)):"="===y?(a(),y="=",A.push(y)):(O.preserveSingleSpace(),A.push(y))}var B="";return T&&(B+=T),B+=A.join("").replace(/[\r\n\t ]+$/,""),m&&(B+="\n"),"\n"!=g&&(B=B.replace(/[\n]/g,g)),B}n.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},n.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0},r=[],i=function(){return{css_beautify:n}}.apply(t,r),!(void 0!==i&&(e.exports=i))}()},function(e,t,n){var r,i;!function(){function n(e,t){for(var n=0;n<t.length;n+=1)if(t[n]===e)return!0;return!1}function o(e){return e.replace(/^\s+|\s+$/g,"")}function s(e){return e.replace(/^\s+/g,"")}function a(e,t){"use strict";var n=new l(e,t);return n.beautify()}function l(e,t){"use strict";function r(e,t){var n=0;e&&(n=e.indentation_level,!z.just_added_newline()&&e.line_indent_level>n&&(n=e.line_indent_level));var r={mode:t,parent:e,last_text:e?e.last_text:"",last_word:e?e.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:n,line_indent_level:e?e.line_indent_level:n,start_line_index:z.get_line_number(),ternary_depth:0};return r}function i(e){var t=e.newlines,n=te.keep_array_indentation&&g(Q.mode);if(n)for(r=0;t>r;r+=1)u(r>0);else if(te.max_preserve_newlines&&t>te.max_preserve_newlines&&(t=te.max_preserve_newlines),te.preserve_newlines&&e.newlines>1){u();for(var r=1;t>r;r+=1)u(!0)}H=e,ee[H.type]()}function a(e){e=e.replace(/\x0d/g,"");for(var t=[],n=e.indexOf("\n");-1!==n;)t.push(e.substring(0,n)),e=e.substring(n+1),n=e.indexOf("\n");return e.length&&t.push(e),t}function l(e){if(e=void 0===e?!1:e,!z.just_added_newline())if(te.preserve_newlines&&H.wanted_newline||e)u(!1,!0);else if(te.wrap_line_length){var t=z.current_line.get_character_count()+H.text.length+(z.space_before_token?1:0);t>=te.wrap_line_length&&u(!1,!0)}}function u(e,t){if(!t&&";"!==Q.last_text&&","!==Q.last_text&&"="!==Q.last_text&&"TK_OPERATOR"!==W)for(;Q.mode===f.Statement&&!Q.if_block&&!Q.do_block;)x();z.add_new_line(e)&&(Q.multiline_frame=!0)}function h(){z.just_added_newline()&&(te.keep_array_indentation&&g(Q.mode)&&H.wanted_newline?(z.current_line.push(H.whitespace_before),z.space_before_token=!1):z.set_indent(Q.indentation_level)&&(Q.line_indent_level=Q.indentation_level))}function v(e){return z.raw?void z.add_raw_token(H):(te.comma_first&&"TK_COMMA"===W&&z.just_added_newline()&&","===z.previous_line.last()&&(z.previous_line.pop(),h(),z.add_token(","),z.space_before_token=!0),e=e||H.text,h(),void z.add_token(e))}function _(){Q.indentation_level+=1}function m(){Q.indentation_level>0&&(!Q.parent||Q.indentation_level>Q.parent.indentation_level)&&(Q.indentation_level-=1)}function b(e){Q?(Y.push(Q),J=Q):J=r(null,e),Q=r(J,e)}function g(e){return e===f.ArrayLiteral}function y(e){return n(e,[f.Expression,f.ForInitializer,f.Conditional])}function x(){Y.length>0&&(J=Q,Q=Y.pop(),J.mode===f.Statement&&z.remove_redundant_indentation(J))}function w(){return Q.parent.mode===f.ObjectLiteral&&Q.mode===f.Statement&&(":"===Q.last_text&&0===Q.ternary_depth||"TK_RESERVED"===W&&n(Q.last_text,["get","set"]))}function E(){return"TK_RESERVED"===W&&n(Q.last_text,["var","let","const"])&&"TK_WORD"===H.type||"TK_RESERVED"===W&&"do"===Q.last_text||"TK_RESERVED"===W&&"return"===Q.last_text&&!H.wanted_newline||"TK_RESERVED"===W&&"else"===Q.last_text&&("TK_RESERVED"!==H.type||"if"!==H.text)||"TK_END_EXPR"===W&&(J.mode===f.ForInitializer||J.mode===f.Conditional)||"TK_WORD"===W&&Q.mode===f.BlockStatement&&!Q.in_case&&"--"!==H.text&&"++"!==H.text&&"function"!==G&&"TK_WORD"!==H.type&&"TK_RESERVED"!==H.type||Q.mode===f.ObjectLiteral&&(":"===Q.last_text&&0===Q.ternary_depth||"TK_RESERVED"===W&&n(Q.last_text,["get","set"]))?(b(f.Statement),_(),"TK_RESERVED"===W&&n(Q.last_text,["var","let","const"])&&"TK_WORD"===H.type&&(Q.declaration_statement=!0),w()||l("TK_RESERVED"===H.type&&n(H.text,["do","for","if","while"])),!0):!1}function T(e,t){for(var n=0;n<e.length;n++){var r=o(e[n]);if(r.charAt(0)!==t)return!1}return!0}function S(e,t){for(var n,r=0,i=e.length;i>r;r++)if(n=e[r],n&&0!==n.indexOf(t))return!1;return!0}function k(e){return n(e,["case","return","do","if","throw","else"])}function C(e){var t=V+(e||0);return 0>t||t>=ne.length?null:ne[t]}function O(){E();var e=f.Expression;if("["===H.text){if("TK_WORD"===W||")"===Q.last_text)return"TK_RESERVED"===W&&n(Q.last_text,F.line_starters)&&(z.space_before_token=!0),b(e),v(),_(),void(te.space_in_paren&&(z.space_before_token=!0));e=f.ArrayLiteral,g(Q.mode)&&("["===Q.last_text||","===Q.last_text&&("]"===G||"}"===G))&&(te.keep_array_indentation||u())}else"TK_RESERVED"===W&&"for"===Q.last_text?e=f.ForInitializer:"TK_RESERVED"===W&&n(Q.last_text,["if","while"])&&(e=f.Conditional);";"===Q.last_text||"TK_START_BLOCK"===W?u():"TK_END_EXPR"===W||"TK_START_EXPR"===W||"TK_END_BLOCK"===W||"."===Q.last_text?l(H.wanted_newline):"TK_RESERVED"===W&&"("===H.text||"TK_WORD"===W||"TK_OPERATOR"===W?"TK_RESERVED"===W&&("function"===Q.last_word||"typeof"===Q.last_word)||"*"===Q.last_text&&"function"===G?te.space_after_anon_function&&(z.space_before_token=!0):"TK_RESERVED"!==W||!n(Q.last_text,F.line_starters)&&"catch"!==Q.last_text||te.space_before_conditional&&(z.space_before_token=!0):z.space_before_token=!0,"("===H.text&&"TK_RESERVED"===W&&"await"===Q.last_word&&(z.space_before_token=!0),"("===H.text&&("TK_EQUALS"===W||"TK_OPERATOR"===W)&&(w()||l()),b(e),v(),te.space_in_paren&&(z.space_before_token=!0),_()}function A(){for(;Q.mode===f.Statement;)x();Q.multiline_frame&&l("]"===H.text&&g(Q.mode)&&!te.keep_array_indentation),te.space_in_paren&&("TK_START_EXPR"!==W||te.space_in_empty_paren?z.space_before_token=!0:(z.trim(),z.space_before_token=!1)),"]"===H.text&&te.keep_array_indentation?(v(),x()):(x(),v()),z.remove_redundant_indentation(J),Q.do_while&&J.mode===f.Conditional&&(J.mode=f.Expression,Q.do_block=!1,Q.do_while=!1)}function R(){var e=C(1),t=C(2);b(t&&(":"===t.text&&n(e.type,["TK_STRING","TK_WORD","TK_RESERVED"])||n(e.text,["get","set"])&&n(t.type,["TK_WORD","TK_RESERVED"]))?n(G,["class","interface"])?f.BlockStatement:f.ObjectLiteral:f.BlockStatement);var r=!e.comments_before.length&&"}"===e.text,i=r&&"function"===Q.last_word&&"TK_END_EXPR"===W;"expand"===te.brace_style||"none"===te.brace_style&&H.wanted_newline?"TK_OPERATOR"!==W&&(i||"TK_EQUALS"===W||"TK_RESERVED"===W&&k(Q.last_text)&&"else"!==Q.last_text)?z.space_before_token=!0:u(!1,!0):"TK_OPERATOR"!==W&&"TK_START_EXPR"!==W?"TK_START_BLOCK"===W?u():z.space_before_token=!0:g(J.mode)&&","===Q.last_text&&("}"===G?z.space_before_token=!0:u()),v(),_()}function j(){for(;Q.mode===f.Statement;)x();var e="TK_START_BLOCK"===W;"expand"===te.brace_style?e||u():e||(g(Q.mode)&&te.keep_array_indentation?(te.keep_array_indentation=!1,u(),te.keep_array_indentation=!0):u()),x(),v()}function I(){if("TK_RESERVED"===H.type&&Q.mode!==f.ObjectLiteral&&n(H.text,["set","get"])&&(H.type="TK_WORD"),"TK_RESERVED"===H.type&&Q.mode===f.ObjectLiteral){var e=C(1);":"==e.text&&(H.type="TK_WORD")}if(E()||!H.wanted_newline||y(Q.mode)||"TK_OPERATOR"===W&&"--"!==Q.last_text&&"++"!==Q.last_text||"TK_EQUALS"===W||!te.preserve_newlines&&"TK_RESERVED"===W&&n(Q.last_text,["var","let","const","set","get"])||u(),Q.do_block&&!Q.do_while){if("TK_RESERVED"===H.type&&"while"===H.text)return z.space_before_token=!0,v(),z.space_before_token=!0,void(Q.do_while=!0);u(),Q.do_block=!1}if(Q.if_block)if(Q.else_block||"TK_RESERVED"!==H.type||"else"!==H.text){for(;Q.mode===f.Statement;)x();Q.if_block=!1,Q.else_block=!1}else Q.else_block=!0;if("TK_RESERVED"===H.type&&("case"===H.text||"default"===H.text&&Q.in_case_statement))return u(),(Q.case_body||te.jslint_happy)&&(m(),Q.case_body=!1),v(),Q.in_case=!0,void(Q.in_case_statement=!0);if("TK_RESERVED"===H.type&&"function"===H.text&&((n(Q.last_text,["}",";"])||z.just_added_newline()&&!n(Q.last_text,["[","{",":","=",","]))&&(z.just_added_blankline()||H.comments_before.length||(u(),u(!0))),"TK_RESERVED"===W||"TK_WORD"===W?"TK_RESERVED"===W&&n(Q.last_text,["get","set","new","return","export","async"])?z.space_before_token=!0:"TK_RESERVED"===W&&"default"===Q.last_text&&"export"===G?z.space_before_token=!0:u():"TK_OPERATOR"===W||"="===Q.last_text?z.space_before_token=!0:(Q.multiline_frame||!y(Q.mode)&&!g(Q.mode))&&u()),("TK_COMMA"===W||"TK_START_EXPR"===W||"TK_EQUALS"===W||"TK_OPERATOR"===W)&&(w()||l()),"TK_RESERVED"===H.type&&n(H.text,["function","get","set"]))return v(),void(Q.last_word=H.text);if(Z="NONE","TK_END_BLOCK"===W?"TK_RESERVED"===H.type&&n(H.text,["else","catch","finally"])?"expand"===te.brace_style||"end-expand"===te.brace_style||"none"===te.brace_style&&H.wanted_newline?Z="NEWLINE":(Z="SPACE",z.space_before_token=!0):Z="NEWLINE":"TK_SEMICOLON"===W&&Q.mode===f.BlockStatement?Z="NEWLINE":"TK_SEMICOLON"===W&&y(Q.mode)?Z="SPACE":"TK_STRING"===W?Z="NEWLINE":"TK_RESERVED"===W||"TK_WORD"===W||"*"===Q.last_text&&"function"===G?Z="SPACE":"TK_START_BLOCK"===W?Z="NEWLINE":"TK_END_EXPR"===W&&(z.space_before_token=!0,Z="NEWLINE"),"TK_RESERVED"===H.type&&n(H.text,F.line_starters)&&")"!==Q.last_text&&(Z="else"===Q.last_text||"export"===Q.last_text?"SPACE":"NEWLINE"),"TK_RESERVED"===H.type&&n(H.text,["else","catch","finally"]))if("TK_END_BLOCK"!==W||"expand"===te.brace_style||"end-expand"===te.brace_style||"none"===te.brace_style&&H.wanted_newline)u();else{z.trim(!0);var t=z.current_line;"}"!==t.last()&&u(),z.space_before_token=!0}else"NEWLINE"===Z?"TK_RESERVED"===W&&k(Q.last_text)?z.space_before_token=!0:"TK_END_EXPR"!==W?"TK_START_EXPR"===W&&"TK_RESERVED"===H.type&&n(H.text,["var","let","const"])||":"===Q.last_text||("TK_RESERVED"===H.type&&"if"===H.text&&"else"===Q.last_text?z.space_before_token=!0:u()):"TK_RESERVED"===H.type&&n(H.text,F.line_starters)&&")"!==Q.last_text&&u():Q.multiline_frame&&g(Q.mode)&&","===Q.last_text&&"}"===G?u():"SPACE"===Z&&(z.space_before_token=!0);v(),Q.last_word=H.text,"TK_RESERVED"===H.type&&"do"===H.text&&(Q.do_block=!0),"TK_RESERVED"===H.type&&"if"===H.text&&(Q.if_block=!0)}function N(){for(E()&&(z.space_before_token=!1);Q.mode===f.Statement&&!Q.if_block&&!Q.do_block;)x();v()}function D(){E()?z.space_before_token=!0:"TK_RESERVED"===W||"TK_WORD"===W?z.space_before_token=!0:"TK_COMMA"===W||"TK_START_EXPR"===W||"TK_EQUALS"===W||"TK_OPERATOR"===W?w()||l():u(),v()}function L(){E(),Q.declaration_statement&&(Q.declaration_assignment=!0),z.space_before_token=!0,v(),z.space_before_token=!0}function M(){return Q.declaration_statement?(y(Q.parent.mode)&&(Q.declaration_assignment=!1),v(),void(Q.declaration_assignment?(Q.declaration_assignment=!1,u(!1,!0)):(z.space_before_token=!0,te.comma_first&&l()))):(v(),void(Q.mode===f.ObjectLiteral||Q.mode===f.Statement&&Q.parent.mode===f.ObjectLiteral?(Q.mode===f.Statement&&x(),u()):(z.space_before_token=!0,te.comma_first&&l())))}function K(){if(E(),"TK_RESERVED"===W&&k(Q.last_text))return z.space_before_token=!0,void v();if("*"===H.text&&"TK_DOT"===W)return void v();if(":"===H.text&&Q.in_case)return Q.case_body=!0,_(),v(),u(),void(Q.in_case=!1);if("::"===H.text)return void v();"TK_OPERATOR"===W&&l();var e=!0,t=!0;n(H.text,["--","++","!","~"])||n(H.text,["-","+"])&&(n(W,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||n(Q.last_text,F.line_starters)||","===Q.last_text)?(e=!1,t=!1,!H.wanted_newline||"--"!==H.text&&"++"!==H.text||u(!1,!0),";"===Q.last_text&&y(Q.mode)&&(e=!0),"TK_RESERVED"===W?e=!0:"TK_END_EXPR"===W?e=!("]"===Q.last_text&&("--"===H.text||"++"===H.text)):"TK_OPERATOR"===W&&(e=n(H.text,["--","-","++","+"])&&n(Q.last_text,["--","-","++","+"]),n(H.text,["+","-"])&&n(Q.last_text,["--","++"])&&(t=!0)),Q.mode!==f.BlockStatement&&Q.mode!==f.Statement||"{"!==Q.last_text&&";"!==Q.last_text||u()):":"===H.text?0===Q.ternary_depth?e=!1:Q.ternary_depth-=1:"?"===H.text?Q.ternary_depth+=1:"*"===H.text&&"TK_RESERVED"===W&&"function"===Q.last_text&&(e=!1,t=!1),z.space_before_token=z.space_before_token||e,v(),z.space_before_token=t}function P(){if(z.raw)return z.add_raw_token(H),void(H.directives&&"end"===H.directives.preserve&&(te.test_output_raw||(z.raw=!1)));if(H.directives)return u(!1,!0),v(),"start"===H.directives.preserve&&(z.raw=!0),void u(!1,!0);if(!p.newline.test(H.text)&&!H.wanted_newline)return z.space_before_token=!0,v(),void(z.space_before_token=!0);var e,t=a(H.text),n=!1,r=!1,i=H.whitespace_before,o=i.length;for(u(!1,!0),t.length>1&&(T(t.slice(1),"*")?n=!0:S(t.slice(1),i)&&(r=!0)),v(t[0]),e=1;e<t.length;e++)u(!1,!0),n?v(" "+s(t[e])):r&&t[e].length>o?v(t[e].substring(o)):z.add_token(t[e]);u(!1,!0)}function $(){H.wanted_newline?u(!1,!0):z.trim(!0),z.space_before_token=!0,v(),u(!1,!0)}function B(){E(),"TK_RESERVED"===W&&k(Q.last_text)?z.space_before_token=!0:l(")"===Q.last_text&&te.break_chained_methods),v()}function U(){v(),"\n"===H.text[H.text.length-1]&&u()}function q(){for(;Q.mode===f.Statement;)x()}var z,V,F,H,W,G,X,Q,J,Y,Z,ee,te,ne=[],re="";for(ee={TK_START_EXPR:O,TK_END_EXPR:A,TK_START_BLOCK:R,TK_END_BLOCK:j,TK_WORD:I,TK_RESERVED:I,TK_SEMICOLON:N,TK_STRING:D,TK_EQUALS:L,TK_OPERATOR:K,TK_COMMA:M,TK_BLOCK_COMMENT:P,TK_COMMENT:$,TK_DOT:B,TK_UNKNOWN:U,TK_EOF:q},t=t?t:{},te={},void 0!==t.braces_on_own_line&&(te.brace_style=t.braces_on_own_line?"expand":"collapse"),te.brace_style=t.brace_style?t.brace_style:te.brace_style?te.brace_style:"collapse","expand-strict"===te.brace_style&&(te.brace_style="expand"),te.indent_size=t.indent_size?parseInt(t.indent_size,10):4,te.indent_char=t.indent_char?t.indent_char:" ",te.eol=t.eol?t.eol:"\n",te.preserve_newlines=void 0===t.preserve_newlines?!0:t.preserve_newlines,te.break_chained_methods=void 0===t.break_chained_methods?!1:t.break_chained_methods,te.max_preserve_newlines=void 0===t.max_preserve_newlines?0:parseInt(t.max_preserve_newlines,10),te.space_in_paren=void 0===t.space_in_paren?!1:t.space_in_paren,te.space_in_empty_paren=void 0===t.space_in_empty_paren?!1:t.space_in_empty_paren,te.jslint_happy=void 0===t.jslint_happy?!1:t.jslint_happy,te.space_after_anon_function=void 0===t.space_after_anon_function?!1:t.space_after_anon_function,te.keep_array_indentation=void 0===t.keep_array_indentation?!1:t.keep_array_indentation,te.space_before_conditional=void 0===t.space_before_conditional?!0:t.space_before_conditional,te.unescape_strings=void 0===t.unescape_strings?!1:t.unescape_strings,te.wrap_line_length=void 0===t.wrap_line_length?0:parseInt(t.wrap_line_length,10),te.e4x=void 0===t.e4x?!1:t.e4x,te.end_with_newline=void 0===t.end_with_newline?!1:t.end_with_newline,te.comma_first=void 0===t.comma_first?!1:t.comma_first,te.test_output_raw=void 0===t.test_output_raw?!1:t.test_output_raw,te.jslint_happy&&(te.space_after_anon_function=!0),t.indent_with_tabs&&(te.indent_char="	",te.indent_size=1),te.eol=te.eol.replace(/\\r/,"\r").replace(/\\n/,"\n"),
	X="";te.indent_size>0;)X+=te.indent_char,te.indent_size-=1;var ie=0;if(e&&e.length){for(;" "===e.charAt(ie)||"	"===e.charAt(ie);)re+=e.charAt(ie),ie+=1;e=e.substring(ie)}W="TK_START_BLOCK",G="",z=new c(X,re),z.raw=te.test_output_raw,Y=[],b(f.BlockStatement),this.beautify=function(){var t,n;for(F=new d(e,te,X),ne=F.tokenize(),V=0;t=C();){for(var r=0;r<t.comments_before.length;r++)i(t.comments_before[r]);i(t),G=Q.last_text,W=t.type,Q.last_text=t.text,V+=1}return n=z.get_code(),te.end_with_newline&&(n+="\n"),"\n"!=te.eol&&(n=n.replace(/[\n]/g,te.eol)),n}}function u(e){var t=0,n=-1,r=[],i=!0;this.set_indent=function(r){t=e.baseIndentLength+r*e.indent_length,n=r},this.get_character_count=function(){return t},this.is_empty=function(){return i},this.last=function(){return this._empty?null:r[r.length-1]},this.push=function(e){r.push(e),t+=e.length,i=!1},this.pop=function(){var e=null;return i||(e=r.pop(),t-=e.length,i=0===r.length),e},this.remove_indent=function(){n>0&&(n-=1,t-=e.indent_length)},this.trim=function(){for(;" "===this.last();)r.pop(),t-=1;i=0===r.length},this.toString=function(){var t="";return this._empty||(n>=0&&(t=e.indent_cache[n]),t+=r.join("")),t}}function c(e,t){t=t||"",this.indent_cache=[t],this.baseIndentLength=t.length,this.indent_length=e.length,this.raw=!1;var n=[];this.baseIndentString=t,this.indent_string=e,this.previous_line=null,this.current_line=null,this.space_before_token=!1,this.add_outputline=function(){this.previous_line=this.current_line,this.current_line=new u(this),n.push(this.current_line)},this.add_outputline(),this.get_line_number=function(){return n.length},this.add_new_line=function(e){return 1===this.get_line_number()&&this.just_added_newline()?!1:e||!this.just_added_newline()?(this.raw||this.add_outputline(),!0):!1},this.get_code=function(){var e=n.join("\n").replace(/[\r\n\t ]+$/,"");return e},this.set_indent=function(e){if(n.length>1){for(;e>=this.indent_cache.length;)this.indent_cache.push(this.indent_cache[this.indent_cache.length-1]+this.indent_string);return this.current_line.set_indent(e),!0}return this.current_line.set_indent(0),!1},this.add_raw_token=function(e){for(var t=0;t<e.newlines;t++)this.add_outputline();this.current_line.push(e.whitespace_before),this.current_line.push(e.text),this.space_before_token=!1},this.add_token=function(e){this.add_space_before_token(),this.current_line.push(e)},this.add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&this.current_line.push(" "),this.space_before_token=!1},this.remove_redundant_indentation=function(e){if(!e.multiline_frame&&e.mode!==f.ForInitializer&&e.mode!==f.Conditional)for(var t=e.start_line_index,r=n.length;r>t;)n[t].remove_indent(),t++},this.trim=function(r){for(r=void 0===r?!1:r,this.current_line.trim(e,t);r&&n.length>1&&this.current_line.is_empty();)n.pop(),this.current_line=n[n.length-1],this.current_line.trim();this.previous_line=n.length>1?n[n.length-2]:null},this.just_added_newline=function(){return this.current_line.is_empty()},this.just_added_blankline=function(){if(this.just_added_newline()){if(1===n.length)return!0;var e=n[n.length-2];return e.is_empty()}return!1}}function d(e,t,r){function i(e){if(!e.match(E))return null;var t={};T.lastIndex=0;for(var n=T.exec(e);n;)t[n[1]]=n[2],n=T.exec(e);return t}function s(){var r,s=[];if(f=0,v="",b>=g)return["","TK_EOF"];var E;E=m.length?m[m.length-1]:new h("TK_START_BLOCK","{");var T=e.charAt(b);for(b+=1;n(T,l);){if(p.newline.test(T)?("\n"!==T||"\r"!==e.charAt(b-2))&&(f+=1,s=[]):s.push(T),b>=g)return["","TK_EOF"];T=e.charAt(b),b+=1}if(s.length&&(v=s.join("")),u.test(T)){var C=!0,O=!0,A=u;for("0"===T&&g>b&&/[Xx]/.test(e.charAt(b))?(C=!1,O=!1,T+=e.charAt(b),b+=1,A=c):(T="",b-=1);g>b&&A.test(e.charAt(b));)T+=e.charAt(b),b+=1,C&&g>b&&"."===e.charAt(b)&&(T+=e.charAt(b),b+=1,C=!1),O&&g>b&&/[Ee]/.test(e.charAt(b))&&(T+=e.charAt(b),b+=1,g>b&&/[+-]/.test(e.charAt(b))&&(T+=e.charAt(b),b+=1),O=!1,C=!1);return[T,"TK_WORD"]}if(p.isIdentifierStart(e.charCodeAt(b-1))){if(g>b)for(;p.isIdentifierChar(e.charCodeAt(b))&&(T+=e.charAt(b),b+=1,b!==g););return"TK_DOT"===E.type||"TK_RESERVED"===E.type&&n(E.text,["set","get"])||!n(T,y)?[T,"TK_WORD"]:"in"===T?[T,"TK_OPERATOR"]:[T,"TK_RESERVED"]}if("("===T||"["===T)return[T,"TK_START_EXPR"];if(")"===T||"]"===T)return[T,"TK_END_EXPR"];if("{"===T)return[T,"TK_START_BLOCK"];if("}"===T)return[T,"TK_END_BLOCK"];if(";"===T)return[T,"TK_SEMICOLON"];if("/"===T){var R="";if("*"===e.charAt(b)){b+=1,x.lastIndex=b;var j=x.exec(e);R="/*"+j[0],b+=j[0].length;var I=i(R);return I&&"start"===I.ignore&&(S.lastIndex=b,j=S.exec(e),R+=j[0],b+=j[0].length),R=R.replace(p.lineBreak,"\n"),[R,"TK_BLOCK_COMMENT",I]}if("/"===e.charAt(b)){b+=1,w.lastIndex=b;var j=w.exec(e);return R="//"+j[0],b+=j[0].length,[R,"TK_COMMENT"]}}if("`"===T||"'"===T||'"'===T||("/"===T||t.e4x&&"<"===T&&e.slice(b-1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/))&&("TK_RESERVED"===E.type&&n(E.text,["return","case","throw","else","do","typeof","yield"])||"TK_END_EXPR"===E.type&&")"===E.text&&E.parent&&"TK_RESERVED"===E.parent.type&&n(E.parent.text,["if","while","for"])||n(E.type,["TK_COMMENT","TK_START_EXPR","TK_START_BLOCK","TK_END_BLOCK","TK_OPERATOR","TK_EQUALS","TK_EOF","TK_SEMICOLON","TK_COMMA"]))){var N=T,D=!1,L=!1;if(r=T,"/"===N)for(var M=!1;g>b&&(D||M||e.charAt(b)!==N)&&!p.newline.test(e.charAt(b));)r+=e.charAt(b),D?D=!1:(D="\\"===e.charAt(b),"["===e.charAt(b)?M=!0:"]"===e.charAt(b)&&(M=!1)),b+=1;else if(t.e4x&&"<"===N){var K=/<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,P=e.slice(b-1),$=K.exec(P);if($&&0===$.index){for(var B=$[2],U=0;$;){var q=!!$[1],z=$[2],V=!!$[$.length-1]||"![CDATA["===z.slice(0,8);if(z!==B||V||(q?--U:++U),0>=U)break;$=K.exec(P)}var F=$?$.index+$[0].length:P.length;return P=P.slice(0,F),b+=F-1,P=P.replace(p.lineBreak,"\n"),[P,"TK_STRING"]}}else for(;g>b&&(D||e.charAt(b)!==N&&("`"===N||!p.newline.test(e.charAt(b))));)(D||"`"===N)&&p.newline.test(e.charAt(b))?("\r"===e.charAt(b)&&"\n"===e.charAt(b+1)&&(b+=1),r+="\n"):r+=e.charAt(b),D?(("x"===e.charAt(b)||"u"===e.charAt(b))&&(L=!0),D=!1):D="\\"===e.charAt(b),b+=1;if(L&&t.unescape_strings&&(r=a(r)),g>b&&e.charAt(b)===N&&(r+=N,b+=1,"/"===N))for(;g>b&&p.isIdentifierStart(e.charCodeAt(b));)r+=e.charAt(b),b+=1;return[r,"TK_STRING"]}if("#"===T){if(0===m.length&&"!"===e.charAt(b)){for(r=T;g>b&&"\n"!==T;)T=e.charAt(b),r+=T,b+=1;return[o(r)+"\n","TK_UNKNOWN"]}var H="#";if(g>b&&u.test(e.charAt(b))){do T=e.charAt(b),H+=T,b+=1;while(g>b&&"#"!==T&&"="!==T);return"#"===T||("["===e.charAt(b)&&"]"===e.charAt(b+1)?(H+="[]",b+=2):"{"===e.charAt(b)&&"}"===e.charAt(b+1)&&(H+="{}",b+=2)),[H,"TK_WORD"]}}if("<"===T&&("?"===e.charAt(b)||"%"===e.charAt(b))){k.lastIndex=b-1;var W=k.exec(e);if(W)return T=W[0],b+=T.length-1,T=T.replace(p.lineBreak,"\n"),[T,"TK_STRING"]}if("<"===T&&"<!--"===e.substring(b-1,b+3)){for(b+=3,T="<!--";!p.newline.test(e.charAt(b))&&g>b;)T+=e.charAt(b),b++;return _=!0,[T,"TK_COMMENT"]}if("-"===T&&_&&"-->"===e.substring(b-1,b+2))return _=!1,b+=2,["-->","TK_COMMENT"];if("."===T)return[T,"TK_DOT"];if(n(T,d)){for(;g>b&&n(T+e.charAt(b),d)&&(T+=e.charAt(b),b+=1,!(b>=g)););return","===T?[T,"TK_COMMA"]:"="===T?[T,"TK_EQUALS"]:[T,"TK_OPERATOR"]}return[T,"TK_UNKNOWN"]}function a(e){for(var t,n=!1,r="",i=0,o="",s=0;n||i<e.length;)if(t=e.charAt(i),i++,n){if(n=!1,"x"===t)o=e.substr(i,2),i+=2;else{if("u"!==t){r+="\\"+t;continue}o=e.substr(i,4),i+=4}if(!o.match(/^[0123456789abcdefABCDEF]+$/))return e;if(s=parseInt(o,16),s>=0&&32>s){r+="x"===t?"\\x"+o:"\\u"+o;continue}if(34===s||39===s||92===s)r+="\\"+String.fromCharCode(s);else{if("x"===t&&s>126&&255>=s)return e;r+=String.fromCharCode(s)}}else"\\"===t?n=!0:r+=t;return r}var l="\n\r	 ".split(""),u=/[0-9]/,c=/[0123456789abcdefABCDEF]/,d="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: => <%= <% %> <?= <? ?>".split(" ");this.line_starters="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");var f,v,_,m,b,g,y=this.line_starters.concat(["do","in","else","get","set","new","catch","finally","typeof","yield","async","await"]),x=/([\s\S]*?)((?:\*\/)|$)/g,w=/([^\n\r\u2028\u2029]*)/g,E=/\/\* beautify( \w+[:]\w+)+ \*\//g,T=/ (\w+)[:](\w+)/g,S=/([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,k=/((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;this.tokenize=function(){g=e.length,b=0,_=!1,m=[];for(var t,n,r,i=null,o=[],a=[];!n||"TK_EOF"!==n.type;){for(r=s(),t=new h(r[1],r[0],f,v);"TK_COMMENT"===t.type||"TK_BLOCK_COMMENT"===t.type||"TK_UNKNOWN"===t.type;)"TK_BLOCK_COMMENT"===t.type&&(t.directives=r[2]),a.push(t),r=s(),t=new h(r[1],r[0],f,v);a.length&&(t.comments_before=a,a=[]),"TK_START_BLOCK"===t.type||"TK_START_EXPR"===t.type?(t.parent=n,o.push(i),i=t):("TK_END_BLOCK"===t.type||"TK_END_EXPR"===t.type)&&i&&("]"===t.text&&"["===i.text||")"===t.text&&"("===i.text||"}"===t.text&&"{"===i.text)&&(t.parent=i.parent,i=o.pop()),m.push(t),n=t}return m}}var p={};!function(e){var t="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",n="̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿",r=new RegExp("["+t+"]"),i=new RegExp("["+t+n+"]");e.newline=/[\n\r\u2028\u2029]/,e.lineBreak=/\r\n|[\n\r\u2028\u2029]/g,e.isIdentifierStart=function(e){return 65>e?36===e:91>e?!0:97>e?95===e:123>e?!0:e>=170&&r.test(String.fromCharCode(e))},e.isIdentifierChar=function(e){return 48>e?36===e:58>e?!0:65>e?!1:91>e?!0:97>e?95===e:123>e?!0:e>=170&&i.test(String.fromCharCode(e))}}(p);var f={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"},h=function(e,t,n,r,i,o){this.type=e,this.text=t,this.comments_before=[],this.newlines=n||0,this.wanted_newline=n>0,this.whitespace_before=r||"",this.parent=null,this.directives=null};r=[],i=function(){return{js_beautify:a}}.apply(t,r),!(void 0!==i&&(e.exports=i))}()},function(e,t){function n(e){return null===e?"Null":e===r?"Undefined":i.exec(o.call(e))[1]}var r,i=/^\[object (.*)\]$/,o=Object.prototype.toString;e.exports=n},function(e,t){function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=n},function(e,t,n){var r,i;r=n(39),i=n(127),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(53),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t){var n=e.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(e,t){function n(e){return!!e&&"object"==typeof e&&e.constructor===Object}e.exports=n},function(e,t){e.exports=2147483647},function(e,t){e.exports=-2147483648},function(e,t,n){function r(e,t){for(var n=-1,r=e.length;++n<r;)if(s(e[n],t))return!0;return!1}function i(e,t){for(var n=-1,i=t.length;++n<i;)if(!r(e,t[n]))return!1;return!0}function o(e,t){var n=!0;return a(t,function(t,r){return s(e[r],t)?void 0:n=!1}),n}function s(e,t){return e&&"object"==typeof e?l(e)&&l(t)?i(e,t):o(e,t):e===t}var a=n(1),l=n(103);e.exports=s},function(e,t,n){function r(e){return e=i(e),e=o(e),e=s(e).replace(/[\-_]/g," ").replace(/\s[a-z]/g,a).replace(/\s+/g,"").replace(/^[A-Z]/g,l)}var i=n(2),o=n(117),s=n(116),a=n(118),l=n(115);e.exports=r},function(e,t,n){var r,i;n(81),r=n(38),i=n(126),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(82),r=n(40),i=n(128),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(83),r=n(44),i=n(132),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(84),r=n(46),i=n(134),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(57),i=n(143),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(92),r=n(59),i=n(144),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(60),i=n(145),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(61),i=n(146),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(93),r=n(62),i=n(147),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t){!function(e,t,n,r){function i(){var t=e('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>'),n=0,r=0;return e("body").append(t),n=e(t).innerWidth(),r=e("div",t).innerWidth(),t.remove(),n-r}function o(t,n){this.el=t,this.$el=e(t),this.$track,this.$scrollbar,this.dragOffset,this.flashTimeout,this.$contentEl=this.$el,this.$scrollContentEl=this.$el,this.scrollDirection="vert",this.scrollOffsetAttr="scrollTop",this.sizeAttr="height",this.scrollSizeAttr="scrollHeight",this.offsetAttr="top",this.options=e.extend({},o.DEFAULTS,n),this.init()}SCROLLBAR_WIDTH=i(),o.DEFAULTS={wrapContent:!0,autoHide:!0},o.prototype.init=function(){return 0===SCROLLBAR_WIDTH?void this.$el.css("overflow","auto"):(("horizontal"===this.$el.data("simplebar-direction")||this.$el.hasClass("simplebar horizontal"))&&(this.scrollDirection="horiz",this.scrollOffsetAttr="scrollLeft",this.sizeAttr="width",this.scrollSizeAttr="scrollWidth",this.offsetAttr="left"),this.options.wrapContent&&this.$el.wrapInner('<div class="simplebar-scroll-content"><div class="simplebar-content"></div></div>'),this.$contentEl=this.$el.find(".simplebar-content"),this.$el.prepend('<div class="simplebar-track"><div class="simplebar-scrollbar"></div></div>'),this.$track=this.$el.find(".simplebar-track"),this.$scrollbar=this.$el.find(".simplebar-scrollbar"),this.$scrollContentEl=this.$el.find(".simplebar-scroll-content"),this.resizeScrollContent(),this.options.autoHide&&this.$el.on("mouseenter",e.proxy(this.flashScrollbar,this)),this.$scrollbar.on("mousedown",e.proxy(this.startDrag,this)),this.$scrollContentEl.on("scroll",e.proxy(this.startScroll,this)),this.resizeScrollbar(),void(this.options.autoHide||this.showScrollbar()))},o.prototype.startDrag=function(t){t.preventDefault();var r=t.pageY;"horiz"===this.scrollDirection&&(r=t.pageX),this.dragOffset=r-this.$scrollbar.offset()[this.offsetAttr],e(n).on("mousemove",e.proxy(this.drag,this)),e(n).on("mouseup",e.proxy(this.endDrag,this))},o.prototype.drag=function(e){e.preventDefault();var t=e.pageY,n=null,r=null,i=null;"horiz"===this.scrollDirection&&(t=e.pageX),n=t-this.$track.offset()[this.offsetAttr]-this.dragOffset,r=n/this.$track[this.sizeAttr](),i=r*this.$contentEl[0][this.scrollSizeAttr],this.$scrollContentEl[this.scrollOffsetAttr](i)},o.prototype.endDrag=function(){e(n).off("mousemove",this.drag),e(n).off("mouseup",this.endDrag)},o.prototype.resizeScrollbar=function(){if(0!==SCROLLBAR_WIDTH){var e=this.$contentEl[0][this.scrollSizeAttr],t=this.$scrollContentEl[this.scrollOffsetAttr](),n=this.$track[this.sizeAttr](),r=n/e,i=Math.round(r*t)+2,o=Math.floor(r*(n-2))-2;e>n?("vert"===this.scrollDirection?this.$scrollbar.css({top:i,height:o}):this.$scrollbar.css({left:i,width:o}),this.$track.show()):this.$track.hide()}},o.prototype.startScroll=function(e){this.$el.trigger(e),this.flashScrollbar()},o.prototype.flashScrollbar=function(){this.resizeScrollbar(),this.showScrollbar()},o.prototype.showScrollbar=function(){this.$scrollbar.addClass("visible"),this.options.autoHide&&("number"==typeof this.flashTimeout&&t.clearTimeout(this.flashTimeout),this.flashTimeout=t.setTimeout(e.proxy(this.hideScrollbar,this),1e3))},o.prototype.hideScrollbar=function(){this.$scrollbar.removeClass("visible"),"number"==typeof this.flashTimeout&&t.clearTimeout(this.flashTimeout)},o.prototype.resizeScrollContent=function(){var e=/firefox/i.test(navigator.userAgent);e&&("vert"===this.scrollDirection?(this.$scrollContentEl.width(this.$el.width()+SCROLLBAR_WIDTH),this.$scrollContentEl.height(this.$el.height())):(this.$scrollContentEl.width(this.$el.width()),this.$scrollContentEl.height(this.$el.height()+SCROLLBAR_WIDTH)))},o.prototype.recalculate=function(){this.resizeScrollContent(),this.resizeScrollbar()},o.prototype.getScrollElement=function(){return this.$scrollContentEl},o.prototype.getContentElement=function(){return this.$contentEl},e(t).on("load",function(){e("[data-simplebar-direction]").each(function(){e(this).simplebar()})});var s=e.fn.simplebar;e.fn.simplebar=function(t){var n,i=arguments;return"undefined"==typeof t||"object"==typeof t?this.each(function(){e.data(this,"simplebar")||e.data(this,"simplebar",new o(this,t))}):"string"==typeof t?(this.each(function(){var r=e.data(this,"simplebar");r instanceof o&&"function"==typeof r[t]&&(n=r[t].apply(r,Array.prototype.slice.call(i,1))),"destroy"===t&&e.data(this,"simplebar",null)}),n!==r?n:this):void 0},e.fn.simplebar.Constructor=o,e.fn.simplebar.noConflict=function(){return e.fn.simplebar=s,this}}(jQuery,window,document)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={partials:{alert:'\n			<button class="close" data-dismiss="alert">&times;</button>\n			<template v-if="alertNotificationModel.type === \'error\'">\n				<h4>{{ alertNotificationErrorMsg }}</h4>\n				<pre v-text="alertNotificationModel.message | json" class="m-b-0"></pre>\n			</template>\n			<template v-else>\n				{{ alertNotificationModel.message }}\n			</template>\n		'},data:function(){return{alertNotificationModel:null,alertNotificationDebounce:null}},props:{timeout:{type:Boolean,"default":!0},timeoutDelay:{type:Number,"default":5e3,coerce:function(e){return Number(e)}},fixed:{type:Boolean}},computed:{alertNotificationClass:function(){return{"alert-notification":!0,"alert-success":"success"===this.alertNotificationModel.type,"alert-danger":"error"===this.alertNotificationModel.type,"alert-warning":"warning"===this.alertNotificationModel.type,"alert-info":"info"===this.alertNotificationModel.type,"alert-default":!this.alertNotificationModel.type,"alert-notification-fixed":this.fixed}},alertNotificationErrorMsg:function(){return this.alertNotificationModel.message.message||"Error"}},methods:{alertNotification:function(e,t,n){clearTimeout(this.alertNotificationDebounce);var r=this.$root;this.alertNotificationDebounce=setTimeout(function(){r.$broadcast("alert-notification",{message:e,type:t})},n||0)},alertNotificationSuccess:function(e,t){this.alertNotification(e,"success",t)},alertNotificationError:function(e,t){this.alertNotification(e,"error",t)},alertNotificationInfo:function(e,t){this.alertNotification(e,"info",t)}},destroyed:function(){clearTimeout(this.alertNotificationDebounce)},events:{"alert-notification":function(e){var t=this;return this.alertNotificationModel=e,"error"!==e.type&&this.timeout&&setTimeout(function(){t.alertNotificationModel=null},this.timeoutDelay),!0}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{active:{type:Boolean}},ready:function(){this.$dispatch("item.tk.carousel",this)}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=r(i);t["default"]={props:{indicators:{type:Boolean,"default":!0},controls:{type:Boolean,"default":!0}},data:function(){return{items:[]}},computed:{carouselId:function(){return(0,o["default"])()}},events:{"item.tk.carousel":function(e){this.items.push(e)}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),o=r(i);t["default"]={mixins:[o["default"]],props:{bannerTitle:{type:String},bannerText:{type:String},hover:{type:Boolean,"default":!1},overlayFull:{type:Boolean,"default":!1}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),o=r(i);t["default"]={mixins:[o["default"]],props:{label:{type:String},labelSm:{type:String},labelXs:{type:String},link:{type:Object}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),o=r(i);t["default"]={mixins:[o["default"]]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});try{n(7)}catch(r){}t["default"]={name:"cover",data:function(){return{layoutTimer:null}},methods:{aspectRatioFit:function(e,t,n,r){var i=n/e,o=r/t,s=e,a=t;return t/r>e/n?(s=n,a=t*i):(s=e*o,a=r),{width:s,height:a}},cover:function i(){var e=this,t=$(this.$els.image);if(t){var i=$(this.$els.cover),n=i.find("> .overlay"),r=n.filter(function(){return $(this).is(".overlay-hover")||$(this).is(".overlay-full")});i.removeAttr("style"),t.is("img")&&n.css("height","auto");var o,s,a={top:parseInt($(document.body).css("padding-top"),10),bottom:parseInt($(document.body).css("padding-bottom"),10)},l=$(".st-cnt-inner"),u=l.length?l:$(window),c=u.innerHeight()-(a.top+a.bottom),d=!1;if(i.is('[class*="height"]'))i.height()>c&&i.height(c),o=t.width(),s=t.height(),t.removeAttr("style"),t.css(e.aspectRatioFit(t.width(),t.height(),i.width(),i.height())),d=o!==t.width()||s!==t.height(),d&&e.$dispatch("layout.tk.isotope",e);else{var p=i.height();o=t.width(),s=t.height(),t.removeAttr("style");var f=t.height();if(n.length){var h=n.innerHeight();h>f&&(f=h),(n.is(".overlay-hover")||n.is(".overlay-full"))&&(f=t.height())}f>c&&(f=c),n.length&&r.innerHeight(f),i.height(f),t.css(e.aspectRatioFit(t.width(),t.height(),i.width(),i.height())),d=p!==i.height(),d||(d=o!==t.width()||s!==t.height()),d&&e.$dispatch("layout.tk.isotope",e)}}},initCover:function(){var e=this,t=$(this.$els.image);return t?"undefined"==typeof $.loadImage?this.cover():void $.loadImage(t.attr("src")).done(function(t){e.cover()}):this.cover()},handleCover:function(){clearTimeout(this.layoutTimer),this.layoutTimer=setTimeout(this.cover,10)}},ready:function(){this.initCover(),window.addEventListener("resize",this.handleCover)},events:{"layout.tk.isotope":function(){this.handleCover()}},beforeDestroy:function(){window.removeEventListener("resize",this.handleCover)},computed:{coverClass:function(){return{cover:!0,overlay:!0,hover:this.hover,"cover-image-full":this.imageFull}},overlayClass:function(){var e={overlay:!0,"overlay-full":this.overlayFull,"overlay-hover":this.hover};return this.overlayBg&&(e["overlay-bg-"+this.overlayBg]=!0),e}},props:{src:{type:String,required:!0},hover:{type:Boolean,"default":!0},imageFull:{type:Boolean,"default":!0},overlayFull:{type:Boolean,"default":!0},overlayBg:{type:String,"default":"white-strong"}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(20),o=r(i),s=n(12),a=r(s);t["default"]={mixins:[o["default"]],components:{DropdownListItem:a["default"]}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i);t["default"]={partials:{toggle:'\n			<a href="#" @click.prevent :class="btnClass">\n				<i class="dropdown-menu-icon" v-if="icon" :class="icon"></i>\n				<span>{{ label }}</span>\n			</a>\n		',dropdownMenuContent:'\n			<div v-if="header" class="dropdown-header">{{ header }}</div>\n			<template v-if="height">\n				<div v-scrollable :style="scrollHeight">\n					<slot></slot>\n				</div>\n			</template>\n			<template v-else>\n				<slot></slot>\n			</template>\n			<slot name="footer">\n				<div v-if="footer">\n					{{ footer }}\n				</div>\n			</slot>	\n		'},props:{label:{type:String,required:!0},icon:{type:String},btnClass:{type:String},"class":{type:String},dropdownMenuClass:{type:String},height:{type:Number},header:{type:String},footer:{type:String}},components:{Dropdown:o["default"]},computed:{scrollHeight:function(){return this.height?{maxHeight:this.height+"px"}:void 0}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=r(i);t["default"]={mixins:[o["default"]]}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),o=r(i),s=n(18),a=r(s);t["default"]={name:"dropdown-menu",props:{model:{type:Object},openEvent:{"default":"click"},ariaRole:{type:String,"default":"menu"},ariaItemRole:{type:String,"default":"menuitem"}},computed:{hasChildren:function(){return"undefined"!=typeof this.model.children},isSubmenu:function(){return this.hasChildren&&this.model.children.length>0},routeActive:function(){return this.$route&&this.model.route&&(0,a["default"])(this.$route,this.model.route)},active:function(){return this.routeActive===!0||this.model.active===!0}},methods:{closeMenuTree:function(){this.$broadcast("close.tk.dropdown",this,!0)},ariaExpanded:function(e){this.isSubmenu&&this.$els.toggle.setAttribute("aria-expanded",e)}},components:{DropdownListItem:o["default"]}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=r(i),s=n(6),a=r(s);t["default"]={partials:{search:'\n			<input type="text" \n				:id="searchBoxId"\n				:placeholder="placeholder"\n				class="form-control"\n				v-model="searchValue"\n				:debounce="debounce"\n				aria-haspopup="true" />\n		',results:'\n			<ul class="search-dd dropdown-menu" role="listbox">	\n				<template v-for="result in results">\n					<template v-if="result.hits.length > 0">\n						<li class="dropdown-header" v-if="result.indice.label">{{ result.indice.label }}</li>\n						<partial name="hits"></partial>\n					</template>\n				</template>\n			</ul>\n		',hits:'\n			<li class="dropdown" v-for="hit in result.hits" aria-role="option" v-link-active>\n				<partial name="hit"></partial>\n			</li>\n		',hit:'\n			<a class="dropdown-menu-button search-dd-hit" v-link="hit.route">\n				<i class="dropdown-menu-icon" v-if="hit.icon" :class="hit.icon"></i>\n				<span class="search-dd-hit-label">{{ hit.label }}</span>\n				<span class="search-dd-hit-description" v-if="hit.description">{{ hit.description }}</span>\n			</a>\n		'},data:function(){return{searchValue:null}},props:{placeholder:{type:String,"default":"Search ..."},debounce:{type:Number,"default":300},results:{type:Array,"default":function(){return[]}}},computed:{searchBoxId:function(){return"search-box-"+(0,o["default"])()},searchBox:function(){return document.querySelector("#"+this.searchBoxId)},dropdown:function(){return this.$els.dropdown}},methods:{keydown:function(e){var t=[38,40,27];if(-1!==t.indexOf(e.which)){e.preventDefault(),e.stopPropagation();var n=38===e.which,r=40===e.which,i=27===e.which,o=this.searchValue,s=this.dropdown,a=$.makeArray(s.querySelectorAll("li:not(.disabled) .search-dd-hit")).filter(function(e){return e.offsetWidth||e.offsetHeight});if(!o&&!i||o&&i)return i&&e.target.focus(),void(this.searchValue=null);if(a.length){var l=a.indexOf(e.target);n&&0===l&&(l=a.length),n&&l>0&&l--,r&&l===a.length-1?l=0:r&&l<a.length-1&&l++,0>l&&(l=0),a[l].focus()}}},openDropdown:function(){this.$broadcast("open.tk.dropdown")},closeDropdown:function(){this.$broadcast("close.tk.dropdown",null,!0)}},ready:function(){this.searchBox.addEventListener("keydown",this.keydown),this.dropdown.querySelector('[role="listbox"]').addEventListener("keydown",this.keydown)},beforeDestroy:function(){this.searchBox.removeEventListener("keydown",this.keydown),this.dropdown.querySelector('[role="listbox"]').removeEventListener("keydown",this.keydown)},watch:{searchValue:function(e){e?(this.openDropdown(),this.searchBox.setAttribute("aria-expanded","true")):(this.closeDropdown(),this.searchBox.setAttribute("aria-expanded","false"))}},components:{Dropdown:a["default"]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={data:function(){return{open:!1}},props:{isSubmenu:{type:Boolean},active:{type:Boolean},openEvent:{"default":"click"},"class":{type:String},ariaRole:{type:String}},computed:{containerClass:function(){var e={dropdown:!0,active:this.active,hasSubmenu:this.isSubmenu,open:this.open};return this["class"]&&(e[this["class"]]=!0),e}},methods:{toggle:function(e){/input|textarea/i.test(e.target.tagName)||(this.open=!this.open,e.stopPropagation())},show:function(){this.open=!0},hide:function(){this.open=!1},rootHide:function(e){this.$el&&!/input|textarea/i.test(e.target.tagName)&&(e.target===this.$el||this.$el.contains(e.target)||this.hide())},getTree:function(e){var t=[];return e&&e.$options.name&&-1!==e.$options.name.indexOf("dropdown")&&(t.push(e),e.$parent)?t.concat(this.getTree(e.$parent)):t},emit:function(e){this.$dispatch(e+".tk.dropdown",this)},propagate:function(e){return e?!0:!1}},ready:function(){"click"===this.openEvent?this.$el.addEventListener("click",this.toggle):"mouseenter"===this.openEvent&&(this.$el.addEventListener("mouseenter",this.show),this.$el.addEventListener("mouseleave",this.hide))},beforeDestroy:function(){"click"===this.openEvent?this.$el.removeEventListener("click",this.toggle):"mouseenter"===this.openEvent&&(this.$el.removeEventListener("mouseenter",this.show),this.$el.removeEventListener("mouseleave",this.hide))},watch:{open:function(e){e?(this.$broadcast("close.tk.dropdown",this),this.$root.$broadcast("close.tk.dropdown",this.getTree(this),!0),this.$root.$el.addEventListener("click",this.rootHide),this.emit("opened")):(this.$root.$el.removeEventListener("click",this.rootHide),this.emit("closed"))}},events:{"close.tk.dropdown":function(e,t){return e=e&&Array.isArray(e)&&-1!==e.indexOf(this),(e=e||e===this)?this.propagate(t):(this.hide(),this.propagate(t))},"open.tk.dropdown":function(){this.show()}}}},function(e,t,n){
	"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(22),o=r(i);t["default"]={mixins:[o["default"]]}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"expandable",props:{open:{type:Boolean},contentSize:{type:String},indicatorColor:{type:String}},computed:{expandableClass:function(){var e={"expandable-open":this.open};return this.indicatorColor&&(e["expandable-indicator-"+this.indicatorColor]=!0),e},contentClass:function(){var e={};return this.contentSize&&(e["expandable-content-"+this.contentSize]=!0),e}},methods:{toggle:function(e){e&&e.currentTarget!==this.$els.indicator&&this.open||(this.open=!this.open)}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(23),o=r(i);t["default"]={name:"layout-transition",mixins:[o["default"]],methods:{enableSidebarTransitions:function(){this.$el.classList.add("st-la")},disableSidebarTransitions:function(){this.$el.classList.remove("st-la")},filterAnimating:function(e){return e.filter(function(e){return e.animating&&e.sidebarTransitionsEnabled()&&e.isAnimating()})},queueOpenSidebar:function(e){clearInterval(this.queueOpenInterval),this.queueOpenInterval=setInterval(function(){var t=this.filterAnimating(this.getSidebarsExcept(e));t.length||(this.openSidebar(e),clearInterval(this.queueOpenInterval))}.bind(this),50)}},ready:function(){this.$off("toggle.tk.sidebar",this.toggleSidebar),this.$on("toggle.tk.sidebar",this.queueToggleSidebar),this.enableSidebarTransitions()},beforeDestroy:function(){this.$off("toggle.tk.sidebar",this.queueToggleSidebar),this.disableSidebarTransitions(),clearInterval(this.queueOpenInterval)},events:{"open-sidebar.tk.layout":function(e){this.queueOpenSidebar(e)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"layout",data:function(){return{queue:[]}},methods:{registerSidebar:function(e){this.queue.push(e)},unregisterSidebar:function(e){this.queue=this.getSidebarsExcept(e.sidebarId)},getSidebar:function(e){var t=this.queue.filter(function(t){return t.sidebarId===e});return t.length?t[0]:!1},getSidebarsExcept:function(e){return this.queue.filter(function(t){return t.sidebarId!==e})},filterVisible:function(e){return e.filter(function(e){return e.isVisible===!0})},toggleSidebar:function(e){var t=this.getSidebar(e);t&&t.toggle()},openSidebar:function(e){var t=this.getSidebar(e);t&&t.open()},onOpenSidebar:function(){this.$el.classList.add("sh-si")},onCloseSidebar:function(e){this.filterVisible(this.getSidebarsExcept(e)).length||this.$el.classList.remove("sh-si")},queueToggleSidebar:function(e){var t=this.getSidebar(e);return t?(clearInterval(this.queueToggleInterval),this.queueToggleInterval=setInterval(function(){var t=this.filterVisible(this.getSidebarsExcept(e));t.length||(this.toggleSidebar(e),clearInterval(this.queueToggleInterval))}.bind(this),50),void this.getSidebarsExcept(e).forEach(function(e){e.close()})):!0},enableScrollableContent:function(){var e=["html","body",this.$el];e.forEach(function(e){var t="string"==typeof e?document.querySelector(e):e;t.style.overflow="hidden",t.style.height="100%"})},disableScrollableContent:function(){var e=["html","body"];e.forEach(function(e){var t="string"==typeof e?document.querySelector(e):e;t.removeAttribute("style")})},emitIsotopeLayout:function(){this.$broadcast("layout.tk.isotope",this)}},beforeDestroy:function(){clearInterval(this.queueToggleInterval),this.$off("toggle.tk.sidebar",this.toggleSidebar),this.disableScrollableContent()},ready:function(){this.$root.$broadcast("context.tk.layout",this),this.$on("toggle.tk.sidebar",this.toggleSidebar),this.enableScrollableContent()},events:{"register-sidebar.tk.layout":function(e){this.registerSidebar(e),this.$broadcast("ready.tk.sidebar",e)},"unregister-sidebar.tk.layout":function(e){this.unregisterSidebar(e)},"open-sidebar.tk.layout":function(e){this.openSidebar(e)},"show.tk.sidebar":function(){this.onOpenSidebar()},"change.tk.sidebar":function(){this.emitIsotopeLayout()},"hidden.tk.sidebar":function(e){this.onCloseSidebar(e.sidebarId)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={data:function(){return{hasAbort:{save:!1}}},props:{id:{type:String,required:!0},title:{type:String,"default":"Modal title"},header:{type:Boolean,"default":!0},footer:{type:Boolean,"default":!0},fade:{type:Boolean},slide:{type:Boolean},slideDirection:{type:String,"default":"down",validator:function(e){return-1!==["left","right","up","down"].indexOf(e)}},sidebar:{type:Boolean},sidebarSize:{type:String,"default":"3",validator:function(e){return-1!==["1","2","3"].indexOf(e)}},sidebarSizeXs:{type:String,"default":"1",validator:function(e){return-1!==["1","2","3"].indexOf(e)}},grow:{type:Boolean},overlay:{type:Boolean},backdrop:{type:String},panel:{type:Boolean},size:{type:String,validator:function(e){return-1!==["small","large"].indexOf(e)}}},computed:{isFade:function(){return this.fade||this.slide||this.sidebar},computedSlideDirection:function(){return this.sidebar&&-1===["left","right"].indexOf(this.slideDirection)?"left":this.slideDirection},slideDirectionClass:function(){return"slide-"+this.computedSlideDirection},modalClass:function(){var e={modal:!0,fade:this.isFade,grow:this.grow,"modal-overlay":this.overlay};return(this.sidebar||this.slide)&&(e[this.slideDirectionClass]=!0),this.backdrop&&(e["modal-backdrop-"+this.backdrop]=!0),this.panel&&(e["modal-panel-default"]=!0),e},dialog:function(){var e={};return this.sidebar&&(e.sidebar=!0,e[this.computedSlideDirection]=!0,e["si-offset-0"]=!0,e["si-si-"+this.sidebarSize]=!0,e["si-si-xs-"+this.sidebarSizeXs]=!0),e},content:function(){var e={"modal-sm":"small"===this.size,"h-center":"small"===this.size,"modal-lg":"large"===this.size};return e},element:function(){return document.querySelector("#"+this.id)}},methods:{setupEvents:function(){var e=this;$(this.element).on("show.bs.modal",this.showBackdrop).on("hidden.bs.modal",this.hideBackdrop);var t=["show","hide","shown","hidden"];t.forEach(function(t){$(e.element).on(t+".bs.modal",function(){e.emit.call(e,t)})})},showBackdrop:function(){this.backdrop&&$("body").addClass("modal-backdrop-"+this.backdrop)},hideBackdrop:function(){this.backdrop&&$("body").removeClass("modal-backdrop-"+this.backdrop)},emit:function(e){this.hasAbort[e]=!1,this.$dispatch(e+".tk.modal",this)},save:function(){this.emit("save")},modal:function(e){$(this.element).modal(e)},show:function(){this.modal("show")},hide:function(){this.modal("hide")},abort:function(e){this.hasAbort[e]=!0},next:function(e){this.hasAbort[e]=!1}},beforeDestroy:function(){$(".modal-backdrop").remove()},ready:function(){this.emit("ready"),this.setupEvents(),$("body").hasClass("modal-open")&&this.show()},events:{"save.tk.modal":function(e){e.id!==this.id||this.hasAbort.save||this.hide()}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=r(i);try{n(7)}catch(s){}t["default"]={data:function(){return{id:"navbar-"+(0,o["default"])()}},props:{skin:{type:String,required:!1},fixed:{type:String,required:!1},"static":{type:String,required:!1},absolute:{type:String,required:!1},size:{type:String,required:!1},inContent:{type:Boolean}},computed:{navbarClass:function(){var e={};return this.skin?e["navbar-skin-"+this.skin]=!0:e["navbar-default"]=!0,this.fixed&&(e["navbar-fixed-"+this.fixed]=!0),this["static"]&&(e["navbar-static-"+this["static"]]=!0),this.absolute&&(e["navbar-absolute-"+this.absolute]=!0),this.size&&(e["navbar-size-"+this.size]=!0),e}},methods:{layout:function(){return $(this.$el).parents(".la-co:first")},addInContentLayoutClass:function(){this.layout().addClass("navbar-content")},removeInContentLayoutClass:function(){this.layout().removeClass("navbar-content")},enableInContent:function(){this.addInContentLayoutClass()},inContentSlot:function(){return $(this.$el).is('[slot="navbar-content"]')},enableFixed:function(){"top"===this.fixed&&this.layout().addClass("ls-top-navbar")},disableFixed:function(){this.layout().removeClass("ls-top-navbar")},sidebarTransitionsEnabled:function(){return this.layout().hasClass("st-la")},breakpoints:function a(e){$(window)[e?"off":"on"]("enterBreakpoint320",function(){this.lastFixed=this.fixed,this.fixed="top",this.sidebarTransitionsEnabled()&&this.inContentSlot()||(this.lastInContent=this.inContent,this.inContent=!1)}.bind(this));var a=[480,768,992,1200,1600];a.forEach(function(t){$(window)[e?"off":"on"]("enterBreakpoint"+t,function(){"undefined"!=typeof this.lastFixed&&(this.fixed=this.lastFixed),"undefined"!=typeof this.lastInContent&&(this.inContent=this.lastInContent)}.bind(this))},this)}},ready:function(){this.inContent&&this.enableInContent(),this.fixed&&this.enableFixed(),this.inContentSlot()&&!this.inContent&&(this.inContent=!0),this.breakpoints()},watch:{inContent:function(e){return e?this.enableInContent():void this.removeInContentLayoutClass()},fixed:function(e){return e?this.enableFixed():void this.disableFixed()}},beforeDestroy:function(){this.removeInContentLayoutClass(),this.disableFixed(),this.breakpoints(!0)}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),o=r(i);t["default"]={name:"sidebar-collapse-item",mixins:[o["default"]],methods:{item:function(){return $(this.$el)},menuButton:function(){return $(this.$els.menuButton)},submenuButton:function(){return $(this.$els.submenuButton)},submenuElement:function(){return $(this.$els.submenuElement)},initCollapse:function(){var e=this;this.submenuElement().on("show.bs.collapse",function(t){t.stopPropagation(),$(this).parents("ul:first").find("> li.open > ul").collapse("hide"),e.open=!0}),this.submenuElement().on("hidden.bs.collapse",function(t){t.stopPropagation(),e.open=!1})},removeCollapse:function(){this.submenuButton().off(),this.submenuElement().off(),this.submenuElement().removeClass("in"),this.submenuButton().removeClass("collapsed")},emitActive:function(){this.active&&this.$dispatch("active.tk.sidebar-collapse-item",this)}},ready:function(){this.initCollapse(),this.emitActive()},beforeDestroy:function(){this.removeCollapse()},watch:{active:function(){this.emitActive()}},events:{"active.tk.sidebar-collapse-item":function(e){return this.isSubmenu&&(this.open=!0),!0},"add-event-listener.tk.sidebar-menu-item":function(e){this[this.isSubmenu?"submenuButton":"menuButton"]().on(e.event,e.listener)},"remove-event-listener.tk.sidebar-menu-item":function(e){this[this.isSubmenu?"submenuButton":"menuButton"]().off(e.event,e.listener)}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(21),o=r(i);t["default"]={data:function(){return{dropdown:null,dropdownContainerOffsetTop:null}},computed:{dropdownMenuStyle:function(){var e=this.dropdown.offsetTop-this.dropdownContainerOffsetTop+"px",t={left:"100%",top:e};return"right"===this.position&&(t.left="auto",t.right="100%"),t}},methods:{dropdownContainer:function(){return $(this.$els.dropdownContainer)},onReceiveDropdown:function(e){this.dropdown=e},closeDropdown:function(){this.dropdown&&(this.dropdown=null)},closeDropdownItems:function(e){this.$parent.$broadcast("close.tk.sidebar-dropdown-item",e?e.submenuId:null)}},ready:function(){this.$parent.$on("dropdown.tk.sidebar",this.onReceiveDropdown),this.$parent.$el.addEventListener("mouseleave",this.closeDropdown)},beforeDestroy:function(){this.$parent.$off("dropdown.tk.sidebar",this.onReceiveDropdown),this.$parent.$el.removeEventListener("mouseleave",this.closeDropdown)},watch:{dropdown:function(e){var t=this;this.closeDropdownItems(e),e&&this.$nextTick(function(){t.dropdownContainerOffsetTop=t.dropdownContainer().offset().top})}},events:{"scrolling.tk.sidebar":function(e){e&&(this.dropdown=null)},"ready.tk.sidebar-menu-item":function(e){"sidebar-dropdown-item"!==e.$options.name&&e.$el.addEventListener("mouseenter",this.closeDropdown)},"destroy.tk.sidebar-menu-item":function(e){"sidebar-dropdown-item"!==e.$options.name&&e.$el.removeEventListener("mouseenter",this.closeDropdown)}},components:{DropdownMenu:o["default"]}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),o=r(i);t["default"]={name:"sidebar-dropdown-item",mixins:[o["default"]],methods:{item:function(){return $(this.$el)},emitDropdown:function(e){this.$dispatch("dropdown.tk.sidebar",e)},emitDropdownOpen:function(){this.open=!0,this.emitDropdown({submenuId:this.submenuId,model:this.model,offsetTop:this.item().offset().top})},emitDropdownClose:function(){this.emitDropdown(null)}},events:{"close.tk.sidebar-dropdown-item":function(e){this.open&&e!==this.submenuId&&(this.open=!1)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{heading:{type:String},icon:{type:String,"default":"fa fa-fw fa-bell"},model:{type:Array}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=r(i),s=n(18),a=r(s);t["default"]={name:"sidebar-menu-item",data:function(){return{open:!1}},props:{model:{type:Object}},computed:{submenuId:function(){return this.isSubmenu?"sm-"+(0,o["default"])():null},isSubmenu:function(){return this.model.children&&this.model.children.length},routeActive:function(){return this.$route&&this.model.route&&(0,a["default"])(this.$route,this.model.route)},active:function(){return this.routeActive||this.model.active}},beforeDestroy:function(){this.$dispatch("destroy.tk.sidebar-menu-item",this)},ready:function(){this.$dispatch("ready.tk.sidebar-menu-item",this)}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{icons:{type:String},heading:{type:String},"class":{type:Object}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(26),o=r(i);t["default"]={mixins:[o["default"]],props:{scrollable:{type:Boolean,"default":!0}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(28),o=r(i);t["default"]={mixins:[o["default"]],computed:{sidebarTabsClass:function(){var e=this.tabsClass;return e["sidebar-tabbable"]=!0,e}},ready:function(){this.$dispatch("scrollable.tk.sidebar",!1)}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={data:function(){return{active:!1}},props:{sidebarId:{type:String,required:!0},icon:{type:String},label:{type:String}},computed:{buttonClass:function(){var e={active:this.active};return e}},methods:{button:function(){return $(this.$el)},toggle:function(){this.$dispatch("toggle.tk.sidebar",this.sidebarId)},hasParentNavbar:function(){return"navbar"===this.$parent.$options.name},show:function(e){this.sidebarId===e.sidebarId&&(this.active=!0,this.button().closest("li").addClass("active"))},hide:function(e){this.sidebarId===e.sidebarId&&(this.active=!1,this.button().closest("li").removeClass("active"))}},events:{"show.tk.sidebar":function(e){this.show(e)},"hide.tk.sidebar":function(e){this.hide(e)},"shown.tk.sidebar":function(e){this.show(e)},"hidden.tk.sidebar":function(e){this.hide(e)}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(25),o=r(i),s=n(19),a=r(s);t["default"]={name:"sidebar-transition",mixins:[o["default"]],data:function(){return{sidebarTransitions:!1,animating:!1,duration:500}},props:{effect:{type:String,validator:function(e){var t=["reveal","slide-in","slide-along","slide-out-reverse","scale-up","fall-down","push","push-3d-rotate-in","push-3d-rotate-out","push-3d-rotate-delay"];return-1!==t.indexOf(e)}},overlay:{type:Boolean}},computed:{sidebarClass:function(){var e=this.sidebarBaseClass;return this.sidebarTransitionsEnabled()&&(e[this.sidebarEffectClass]=!0),e},layoutSidebarTransitionClasses:function(){var e=[];return this.size&&e.push(this.layoutSidebarTransitionClass(this.direction,this.size)),this.screens.forEach(function(t){var n=(0,a["default"])("size-"+t);this[n]&&e.push(this.layoutSidebarTransitionClass(this.direction,this[n],t))},this),e.join(" ")},sidebarEffectClass:function(){return"st-"+this.effect},toggleLayoutClasses:function(){if("auto"!==this.toggleLayout)return this.toggleLayout.split(",").join(" ");var e=new RegExp("si-"+this.direction+"(\\S+)","ig"),t=this.layout().get(0).className.match(e);return null!==t&&t.length?t.join(" "):!1}},methods:{container:function(){return this.layout().find(".st-co:first")},sidebarTransitionsEnabled:function(){return this.effect?this.layout().hasClass("st-la"):!1},layoutSidebarTransitionClass:function(e,t,n){var r="st-effect-";return r+=e,r+=t,n&&(r+="-"+n),r},isAnimating:function(){return this.sidebarTransitionsEnabled()?this.animating:!1},onOpen:function(){this.sidebarTransitionsEnabled()?(this.emit("show"),this.addLayoutClasses(),this.onEnter()):o["default"].methods.onOpen.call(this)},onClose:function(){this.sidebarTransitionsEnabled()?(this.emit("hide"),this.onLeave()):o["default"].methods.onClose.call(this)},onEnter:function(){clearTimeout(this.leaveTimer),this.layout().addClass(this.layoutSidebarTransitionClasses),this.toggleLayout&&this.layout().addClass(this.toggleLayoutClasses),this.sidebar().addClass(this.sidebarEffectClass),this.container().addClass(this.sidebarEffectClass),this.overlay&&this.container().addClass("st-pu-overlay"),this.isVisible=!0,this.enterTimer=setTimeout(function(){this.container().addClass("st-menu-open"),this.sidebar().find(".simplebar").simplebar("recalculate")}.bind(this),10),this.animating=!1,this.animatingTimer=setTimeout(function(){this.animating=!1,this.emit("change"),this.emit("shown")}.bind(this),this.duration),this.doneTimer=setTimeout(function(){this.container().addClass("st-done")}.bind(this),this.duration+140)},onLeave:function(){clearTimeout(this.enterTimer),clearTimeout(this.animatingTimer),clearTimeout(this.doneTimer),this.container().removeClass("st-menu-open st-done"),this.animating=!0,this.leaveTimer=setTimeout(function(){this.removeLayoutClasses(),this.container().get(0).className="st-co",this.layout().removeClass(this.layoutSidebarTransitionClasses),this.toggleLayout&&this.layout().removeClass(this.toggleLayoutClasses),this.isVisible=!1,this.animating=!1,this.emit("change"),this.emit("hidden")}.bind(this),this.duration)}},beforeDestroy:function(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),clearTimeout(this.animatingTimer),clearTimeout(this.doneTimer),this.removeLayoutClasses(),this.layout().removeClass(this.layoutSidebarTransitionClasses),this.toggleLayout&&this.layout().removeClass(this.toggleLayoutClasses)},watch:{direction:function(e,t){t&&this.layout().removeClass(this.layoutSidebarTransitionClass(t,this.size)),this.show&&this.layout().addClass(this.layoutSidebarTransitionClasses)},size:function(e,t){t&&this.layout().removeClass(this.layoutSidebarTransitionClass(this.direction,t)),this.show&&this.layout().addClass(this.layoutSidebarTransitionClasses)}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(24),o=r(i);n(7);var s=n(19),a=r(s),l=n(108),u=r(l),c=n(111),d=r(c),p=n(1),f=r(p),h=["1","2","3"],v=["xs","sm","md","lg"],_={320:[],480:["xs","xs-up"],768:["sm","sm-up"],992:["md","md-up"],1200:["lg","lg-up"],1600:["xl","xl-up"]},m=(0,u["default"])(_).map(function(e){return parseInt(e,10)}),b=[];(0,d["default"])(_).forEach(function(e){b.push.apply(b,e)}),t["default"]={name:"sidebar",data:function(){return{scrolling:!1,sizes:h,screens:v,isVisible:!1,offsetValue:null,visibleNotProvided:"sm-up"}},props:{scrollable:{type:Boolean,"default":!0},position:{type:String,"default":"left"},size:{type:String,validator:function(e){return-1!==h.indexOf(e)}},sizeXs:{type:String,validator:function(e){return-1!==h.indexOf(e)}},sizeSm:{type:String,validator:function(e){return-1!==h.indexOf(e)}},sizeMd:{type:String,validator:function(e){return-1!==h.indexOf(e)}},sizeLg:{type:String,validator:function(e){return-1!==h.indexOf(e)}},visible:{type:String,validator:function(e){var t=e.split(" ");return t.filter(function(e){return-1!==b.indexOf(e)}).length},coerce:function(e){if(e){var t=e.split(" ");return t.filter(function(e){return-1!==b.indexOf(e)}).join(" ")}}},offset:{type:String},toggleBar:{type:Boolean},sidebarId:{type:String,"default":"sidebar"},toggleLayout:{type:String},show:{type:Boolean},mini:{type:Boolean},reveal:{type:Boolean},miniRevealSize:{type:String,"default":"2",validator:function(e){return-1!==["2","3"].indexOf(e)}}},computed:{sidebarSizeClasses:function(){var e=[];return this.size&&e.push(this.sidebarSizeClass(this.size)),v.forEach(function(t){var n=(0,a["default"])("size-"+t);this[n]&&e.push(this.sidebarSizeClass(this[n],t))},this),e},layoutClasses:function(){var e=[];return this.offsetValue?e.push("sidebar-"+this.direction+"-sum-"+this.size+this.offsetValue):(this.size&&e.push(this.layoutClass(this.direction,this.size)),v.forEach(function(t){var n=(0,a["default"])("size-"+t);this[n]&&e.push(this.layoutClass(this.direction,this[n],t))},this)),e},visibleOptions:function(){return this.visible?this.visible.split(" "):[]},sidebarVisibleClass:function(){return this.visibleOptions.map(function(e){return"sidebar-visible-"+e})},sidebarBaseClass:function(){var e={sidebar:!0,"sidebar-mini":this.mini&&!this.reveal,"sidebar-mini-reveal":this.mini&&this.reveal,"si-vi":this.isVisible};return this.miniRevealSize&&(e["sidebar-mini-reveal-size-"+this.miniRevealSize]=this.mini&&this.reveal),this.sidebarVisibleClass.forEach(function(t){e[t]=!0}),this.sidebarSizeClasses.forEach(function(t){e[t]=!0},this),e[this.position]=!0,this.offsetValue&&(e["sidebar-offset-"+this.offsetValue]=!0),this.scrolling&&(e.scrolling=!0),e},sidebarClass:function(){return this.sidebarBaseClass},direction:function(){return this.position.charAt(0)}},methods:{sidebar:function(){return $(this.$el)},layout:function(){return this.sidebar().parents(".la-co:first")},sidebarTransitionsEnabled:function(){return this.layout().hasClass("st-la")},layoutClass:function(e,t,n){var r="si-";return r+=e,r+=t,n&&(r+="-"+n),r},sidebarSizeClass:function(e,t){var n="si-si";return t&&(n+="-"+t),n+="-"+e},breakpoints:function(e){var t=this;"undefined"!=typeof $.fn.setBreakpoints&&$(window).setBreakpoints({breakpoints:m}),$(window)[e?"off":"on"]("enterBreakpoint320",this.close),$(window)[e?"off":"on"]("enterBreakpoint480",this.close),(0,f["default"])(_,function(n,r,i){t.visibleOptions.forEach(function(i){if(-1!==n.indexOf(i)){var o=-1!==i.indexOf("up"),s=m.filter(function(e){return e>r}),a=m.filter(function(e){return r>e});a.forEach(function(n){$(window)[e?"off":"on"]("enterBreakpoint"+n,t.close)},t),o?(s.unshift(r),s.forEach(function(n){$(window)[e?"off":"on"]("enterBreakpoint"+n,t.queueOpen)},t)):($(window)[e?"off":"on"]("enterBreakpoint"+r,t.queueOpen),s.forEach(function(n){$(window)[e?"off":"on"]("enterBreakpoint"+n,t.close)},t))}},t)})},resetBreakpoints:function(){this.breakpoints(!0)},open:function(){return this.show?this.onOpen():void(this.show=!0)},close:function(){this.show=!1},toggle:function(){this.show=!this.show},queueOpen:function(){var e=this;setTimeout(function(){e.$dispatch("open-sidebar.tk.layout",e.sidebarId)},10)},onOpen:function(){this.emit("show"),this.addLayoutClasses(),this.isVisible=!0,this.emit("shown"),this.emit("change")},onClose:function(){this.emit("hide"),this.removeLayoutClasses(),this.isVisible=!1,this.emit("hidden"),this.emit("change")},emit:function(e){this.$dispatch(e+".tk.sidebar",this),this.$parent.$broadcast(e+".tk.sidebar",this)},addLayoutClasses:function(){this.layout().addClass(this.layoutClasses.join(" "))},removeLayoutClasses:function(e){this.layout().removeClass((e||this.layoutClasses).join(" "))},setOffsetValue:function(e){this.removeLayoutClasses(),this.offsetValue=e.show?e.size:null,this.show&&this.addLayoutClasses()},registerSidebar:function(){this.$dispatch("register-sidebar.tk.layout",this)},unregisterSidebar:function(){this.$dispatch("unregister-sidebar.tk.layout",this)}},ready:function(){var e=this;this.registerSidebar(),this.mini&&(this.size="1"),this.$nextTick(function(){e.visibleOptions.length||e.sidebarTransitionsEnabled()||(e.visible=e.visibleNotProvided),e.breakpoints(),e.show&&e.onOpen()})},beforeDestroy:function(){this.removeLayoutClasses(),this.unregisterSidebar(),this.resetBreakpoints()},watch:{show:function(e){this[e?"onOpen":"onClose"]()},scrolling:function(e){this.$broadcast("scrolling.tk.sidebar",e)},direction:function(e,t){t&&this.removeLayoutClasses([this.layoutClass(t,this.size)]),this.show&&this.addLayoutClasses()},size:function(e,t){t&&this.removeLayoutClasses([this.layoutClass(this.direction,t)]),this.show&&this.addLayoutClasses(),"1"!==e&&this.mini&&(this.mini=!1)},mini:function(e){e?this.size="1":"1"===this.size&&(this.size="2")}},events:{"scrolling.tk.scrollable":function(){this.scrolling||(this.scrolling=!0)},"end-scrolling.tk.scrollable":function(){this.scrolling&&(this.scrolling=!1)},"ready.tk.sidebar":function(e){this.offset===e.sidebarId&&this.setOffsetValue(e)},"change.tk.sidebar":function(e){this.offset===e.sidebarId&&this.setOffsetValue(e)},"scrollable.tk.sidebar":function(e){this.scrollable=e},"ready.tk.sidebar-menu-item":function(e){this.$broadcast("ready.tk.sidebar-menu-item",e)},"destroy.tk.sidebar-menu-item":function(e){this.$broadcast("destroy.tk.sidebar-menu-item",e)}},components:{SidebarToggleButton:o["default"]}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),o=r(i);t["default"]={props:{active:{type:Boolean},scrollable:{type:Boolean},icon:{type:String},label:{type:String,required:!0},id:{type:String},visible:{type:Boolean,"default":!0}},computed:{tabId:function(){return this.id?this.id:"tab-"+(0,o["default"])()},modifiers:function(){return["active","label","icon","visible"]}},methods:{emit:function(){this.$dispatch("tab-pane.tk.tabs",this)}},created:function(){var e=this;this.emit(),this.modifiers.forEach(function(t){e.$watch(t,e.emit)})},events:{"shown.tk.tab":function(e){return this.tabId===e&&this.$broadcast("layout.tk.isotope",this),!0}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(65),o=r(i);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{tabs:{type:Array,"default":function(){return[]}},navId:{type:String,required:!0},responsive:{type:Boolean}},methods:{isNavbar:function(){return"navbar"===this.$parent.$options.name},emit:function(e,t){var n=t.target.getAttribute("href").split("#")[1];this.$root.$broadcast(e+".tk.tab",n)},showActive:function(){this.active&&$('[href="#'+this.active.tabId+'"]').tab("show")}},computed:{navClass:function(){var e={nav:!0,"nav-tabs":!this.isNavbar(),"navbar-nav":this.isNavbar()};return this.responsive&&(e["tabs-responsive-"+this.responsive]=!0),e},active:function(){return this.tabs.find(function(e){return e.active===!0})},events:function(){return["show","shown","hide","hidden"]},visibleTabs:function(){return this.tabs.filter(function(e){return e.visible===!0})}},ready:function(){var e=this;this.events.forEach(function(t){$(e.$el).on(t+".bs.tab",'[data-toggle="tab"]',e.emit.bind(e,t))}),this.showActive()},beforeDestroy:function(){var e=this;this.events.forEach(function(t){$(e.$el).off(t+".bs.tab",'[data-toggle="tab"]',e.emit.bind(e,t))})},watch:{active:"showActive"},events:{"tabs-nav-item.tk.tabs":function(e){var t=this;if(this.navId===e.navId){var n=this.tabs.find(function(t){return t.tabId===e.tab.tabId});n?this.tabs.map(function(n,r){n.tabId===e.tab.tabId&&(t.tabs[r]=(0,o["default"])({},t.tabs[r],e.tab))}):this.tabs.push(e.tab)}},"tabs-nav-destroy.tk.tabs":function(e){this.navId===e&&(this.tabs=[])}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(27),o=r(i);t["default"]={props:{tabs:{type:Array,"default":function(){return[]}},responsive:{type:String},stacked:{type:Boolean,"default":!1},align:{type:String,"default":"left"},vertical:{type:Boolean},navId:{type:String}},computed:{tabsClass:function(){var e={tabbable:!0};return this.tabsWithIcons.length===this.tabsWithoutLabels.length&&(e["tabs-icons"]=!0),this.stacked&&(e["tabs-blocks"]=!0),this.vertical?(e["tabs-vertical"]=!0,-1!==["left","right"].indexOf(this.align)&&(e["tabs-"+this.align]=!0)):"center"===this.align&&(e["tabs-center-h"]=!0),e},tabsWithIcons:function(){return this.tabs.filter(function(e){return"undefined"!=typeof e.icon})},tabsWithoutLabels:function(){return this.tabs.filter(function(e){return"undefined"==typeof e.label})}},events:{"tab-pane.tk.tabs":function(e){var t=this.tabs.find(function(t){return t.tabId===e.tabId});t||this.tabs.push(e),this.navId&&this.$root.$broadcast("tabs-nav-item.tk.tabs",{navId:this.navId,tab:e})}},beforeDestroy:function(){this.navId&&this.$root.$broadcast("tabs-nav-destroy.tk.tabs",this.navId)},components:{TabsNav:o["default"]}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(96),o=r(i),s=n(98),a=r(s),l=n(97),u=r(l),c=n(99),d=r(c),p=n(109),f=r(p);o["default"].registerLanguage("xml",a["default"]),o["default"].registerLanguage("javascript",u["default"]),t["default"]={params:["lang"],beautify:function(e,t){return"undefined"!=typeof d["default"]&&this.params.lang?"html"===this.params.lang?d["default"].html(e,(0,f["default"])({max_preserve_newlines:1},t)):"javascript"===this.params.lang?d["default"].js(e,(0,f["default"])({max_preserve_new_lines:2},t)):e:e},bind:function(){this.params.lang&&this.el.classList.add(this.params.lang)},update:function(e){e&&(this.el.innerText=this.beautify(e,{wrap_attributes:"force"})),"undefined"!=typeof o["default"]&&o["default"].highlightBlock(this.el)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});try{n(29)}catch(r){}t["default"]={params:{horizontal:{type:Boolean}},bind:function(){var e=this;$(this.el).addClass("simplebar"),this.params.horizontal&&$(this.el).addClass("horizontal");var t=this.vm;$(this.el).simplebar(),$(this.el).simplebar().on("scroll",function(){var e=$(this),n=e.simplebar("getScrollElement").scrollTop();t.$dispatch("scrolling.tk.scrollable",n),clearTimeout(this.scrollTimer),this.scrollTimer=setTimeout(function(){var n=e.simplebar("getScrollElement").scrollTop();t.$dispatch("end-scrolling.tk.scrollable",n)},100)}),t.$on("scrollTo.tk.scrollable",function(t){var n=document.querySelector(t);n&&$(e.el).simplebar("getScrollElement").animate({scrollTop:n.offsetTop})})},unbind:function(){$(this.el).simplebar().off("scroll")}}},function(e,t,n){e.exports={"default":n(66),__esModule:!0}},function(e,t,n){n(78),e.exports=n(14).Object.assign},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(67);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(73),i=n(14),o=n(69),s="prototype",a=function(e,t,n){var l,u,c,d=e&a.F,p=e&a.G,f=e&a.S,h=e&a.P,v=e&a.B,_=e&a.W,m=p?i:i[t]||(i[t]={}),b=p?r:f?r[t]:(r[t]||{})[s];
	p&&(n=t);for(l in n)u=!d&&b&&l in b,u&&l in m||(c=u?b[l]:n[l],m[l]=p&&"function"!=typeof b[l]?n[l]:v&&u?o(c,r):_&&b[l]==c?function(e){var t=function(t){return this instanceof e?new e(t):e(t)};return t[s]=e[s],t}(c):h&&"function"==typeof c?o(Function.call,c):c,h&&((m[s]||(m[s]={}))[l]=c))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,e.exports=a},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){var r=n(68);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t){var n=Object;e.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(e,t,n){var r=n(75),i=n(77),o=n(74);e.exports=n(72)(function(){var e=Object.assign,t={},n={},r=Symbol(),i="abcdefghijklmnopqrst";return t[r]=7,i.split("").forEach(function(e){n[e]=e}),7!=e({},t)[r]||Object.keys(e({},n)).join("")!=i})?function(e,t){for(var n=i(e),s=arguments,a=s.length,l=1,u=r.getKeys,c=r.getSymbols,d=r.isEnum;a>l;)for(var p,f=o(s[l++]),h=c?u(f).concat(c(f)):u(f),v=h.length,_=0;v>_;)d.call(f,p=h[_++])&&(n[p]=f[p]);return n}:Object.assign},function(e,t,n){var r=n(70);e.exports=function(e){return Object(r(e))}},function(e,t,n){var r=n(71);r(r.S+r.F,"Object",{assign:n(76)})},function(e,t){},79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,function(e,t,n){!function(e){e(t)}(function(e){function t(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function n(e){return e.nodeName.toLowerCase()}function r(e,t){var n=e&&e.exec(t);return n&&0==n.index}function i(e){return/^(no-?highlight|plain|text)$/i.test(e)}function o(e){var t,n,r,o=e.className+" ";if(o+=e.parentNode?e.parentNode.className:"",n=/\blang(?:uage)?-([\w-]+)\b/i.exec(o))return y(n[1])?n[1]:"no-highlight";for(o=o.split(/\s+/),t=0,r=o.length;r>t;t++)if(y(o[t])||i(o[t]))return o[t]}function s(e,t){var n,r={};for(n in e)r[n]=e[n];if(t)for(n in t)r[n]=t[n];return r}function a(e){var t=[];return function r(e,i){for(var o=e.firstChild;o;o=o.nextSibling)3==o.nodeType?i+=o.nodeValue.length:1==o.nodeType&&(t.push({event:"start",offset:i,node:o}),i=r(o,i),n(o).match(/br|hr|img|input/)||t.push({event:"stop",offset:i,node:o}));return i}(e,0),t}function l(e,r,i){function o(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function s(e){function r(e){return" "+e.nodeName+'="'+t(e.value)+'"'}c+="<"+n(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function a(e){c+="</"+n(e)+">"}function l(e){("start"==e.event?s:a)(e.node)}for(var u=0,c="",d=[];e.length||r.length;){var p=o();if(c+=t(i.substr(u,p[0].offset-u)),u=p[0].offset,p==e){d.reverse().forEach(a);do l(p.splice(0,1)[0]),p=o();while(p==e&&p.length&&p[0].offset==u);d.reverse().forEach(s)}else"start"==p[0].event?d.push(p[0].node):d.pop(),l(p.splice(0,1)[0])}return c+t(i.substr(u))}function u(e){function t(e){return e&&e.source||e}function n(n,r){return new RegExp(t(n),"m"+(e.case_insensitive?"i":"")+(r?"g":""))}function r(i,o){if(!i.compiled){if(i.compiled=!0,i.keywords=i.keywords||i.beginKeywords,i.keywords){var a={},l=function(t,n){e.case_insensitive&&(n=n.toLowerCase()),n.split(" ").forEach(function(e){var n=e.split("|");a[n[0]]=[t,n[1]?Number(n[1]):1]})};"string"==typeof i.keywords?l("keyword",i.keywords):Object.keys(i.keywords).forEach(function(e){l(e,i.keywords[e])}),i.keywords=a}i.lexemesRe=n(i.lexemes||/\b\w+\b/,!0),o&&(i.beginKeywords&&(i.begin="\\b("+i.beginKeywords.split(" ").join("|")+")\\b"),i.begin||(i.begin=/\B|\b/),i.beginRe=n(i.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(i.endRe=n(i.end)),i.terminator_end=t(i.end)||"",i.endsWithParent&&o.terminator_end&&(i.terminator_end+=(i.end?"|":"")+o.terminator_end)),i.illegal&&(i.illegalRe=n(i.illegal)),void 0===i.relevance&&(i.relevance=1),i.contains||(i.contains=[]);var u=[];i.contains.forEach(function(e){e.variants?e.variants.forEach(function(t){u.push(s(e,t))}):u.push("self"==e?i:e)}),i.contains=u,i.contains.forEach(function(e){r(e,i)}),i.starts&&r(i.starts,o);var c=i.contains.map(function(e){return e.beginKeywords?"\\.?("+e.begin+")\\.?":e.begin}).concat([i.terminator_end,i.illegal]).map(t).filter(Boolean);i.terminators=c.length?n(c.join("|"),!0):{exec:function(){return null}}}}r(e)}function c(e,n,i,o){function s(e,t){for(var n=0;n<t.contains.length;n++)if(r(t.contains[n].beginRe,e))return t.contains[n]}function a(e,t){if(r(e.endRe,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.endsWithParent?a(e.parent,t):void 0}function l(e,t){return!i&&r(t.illegalRe,e)}function p(e,t){var n=g.case_insensitive?t[0].toLowerCase():t[0];return e.keywords.hasOwnProperty(n)&&e.keywords[n]}function f(e,t,n,r){var i=r?"":x.classPrefix,o='<span class="'+i,s=n?"":"</span>";return o+=e+'">',o+t+s}function h(){if(!T.keywords)return t(C);var e="",n=0;T.lexemesRe.lastIndex=0;for(var r=T.lexemesRe.exec(C);r;){e+=t(C.substr(n,r.index-n));var i=p(T,r);i?(O+=i[1],e+=f(i[0],t(r[0]))):e+=t(r[0]),n=T.lexemesRe.lastIndex,r=T.lexemesRe.exec(C)}return e+t(C.substr(n))}function v(){var e="string"==typeof T.subLanguage;if(e&&!w[T.subLanguage])return t(C);var n=e?c(T.subLanguage,C,!0,S[T.subLanguage]):d(C,T.subLanguage.length?T.subLanguage:void 0);return T.relevance>0&&(O+=n.relevance),e&&(S[T.subLanguage]=n.top),f(n.language,n.value,!1,!0)}function _(){return void 0!==T.subLanguage?v():h()}function m(e,n){var r=e.className?f(e.className,"",!0):"";e.returnBegin?(k+=r,C=""):e.excludeBegin?(k+=t(n)+r,C=""):(k+=r,C=n),T=Object.create(e,{parent:{value:T}})}function b(e,n){if(C+=e,void 0===n)return k+=_(),0;var r=s(n,T);if(r)return k+=_(),m(r,n),r.returnBegin?0:n.length;var i=a(T,n);if(i){var o=T;o.returnEnd||o.excludeEnd||(C+=n),k+=_();do T.className&&(k+="</span>"),O+=T.relevance,T=T.parent;while(T!=i.parent);return o.excludeEnd&&(k+=t(n)),C="",i.starts&&m(i.starts,""),o.returnEnd?0:n.length}if(l(n,T))throw new Error('Illegal lexeme "'+n+'" for mode "'+(T.className||"<unnamed>")+'"');return C+=n,n.length||1}var g=y(e);if(!g)throw new Error('Unknown language: "'+e+'"');u(g);var E,T=o||g,S={},k="";for(E=T;E!=g;E=E.parent)E.className&&(k=f(E.className,"",!0)+k);var C="",O=0;try{for(var A,R,j=0;T.terminators.lastIndex=j,A=T.terminators.exec(n),A;)R=b(n.substr(j,A.index-j),A[0]),j=A.index+R;for(b(n.substr(j)),E=T;E.parent;E=E.parent)E.className&&(k+="</span>");return{relevance:O,value:k,language:e,top:T}}catch(I){if(-1!=I.message.indexOf("Illegal"))return{relevance:0,value:t(n)};throw I}}function d(e,n){n=n||x.languages||Object.keys(w);var r={relevance:0,value:t(e)},i=r;return n.forEach(function(t){if(y(t)){var n=c(t,e,!1);n.language=t,n.relevance>i.relevance&&(i=n),n.relevance>r.relevance&&(i=r,r=n)}}),i.language&&(r.second_best=i),r}function p(e){return x.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,t){return t.replace(/\t/g,x.tabReplace)})),x.useBR&&(e=e.replace(/\n/g,"<br>")),e}function f(e,t,n){var r=t?E[t]:n,i=[e.trim()];return e.match(/\bhljs\b/)||i.push("hljs"),-1===e.indexOf(r)&&i.push(r),i.join(" ").trim()}function h(e){var t=o(e);if(!i(t)){var n;x.useBR?(n=document.createElementNS("http://www.w3.org/1999/xhtml","div"),n.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):n=e;var r=n.textContent,s=t?c(t,r,!0):d(r),u=a(n);if(u.length){var h=document.createElementNS("http://www.w3.org/1999/xhtml","div");h.innerHTML=s.value,s.value=l(u,a(h),r)}s.value=p(s.value),e.innerHTML=s.value,e.className=f(e.className,t,s.language),e.result={language:s.language,re:s.relevance},s.second_best&&(e.second_best={language:s.second_best.language,re:s.second_best.relevance})}}function v(e){x=s(x,e)}function _(){if(!_.called){_.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,h)}}function m(){addEventListener("DOMContentLoaded",_,!1),addEventListener("load",_,!1)}function b(t,n){var r=w[t]=n(e);r.aliases&&r.aliases.forEach(function(e){E[e]=t})}function g(){return Object.keys(w)}function y(e){return e=(e||"").toLowerCase(),w[e]||w[E[e]]}var x={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},w={},E={};return e.highlight=c,e.highlightAuto=d,e.fixMarkup=p,e.highlightBlock=h,e.configure=v,e.initHighlighting=_,e.initHighlightingOnLoad=m,e.registerLanguage=b,e.listLanguages=g,e.getLanguage=y,e.inherit=s,e.IDENT_RE="[a-zA-Z]\\w*",e.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",e.NUMBER_RE="\\b\\d+(\\.\\d+)?",e.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BINARY_NUMBER_RE="\\b(0b[01]+)",e.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},e.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},e.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.COMMENT=function(t,n,r){var i=e.inherit({className:"comment",begin:t,end:n,contains:[]},r||{});return i.contains.push(e.PHRASAL_WORDS_MODE),i.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),i},e.C_LINE_COMMENT_MODE=e.COMMENT("//","$"),e.C_BLOCK_COMMENT_MODE=e.COMMENT("/\\*","\\*/"),e.HASH_COMMENT_MODE=e.COMMENT("#","$"),e.NUMBER_MODE={className:"number",begin:e.NUMBER_RE,relevance:0},e.C_NUMBER_MODE={className:"number",begin:e.C_NUMBER_RE,relevance:0},e.BINARY_NUMBER_MODE={className:"number",begin:e.BINARY_NUMBER_RE,relevance:0},e.CSS_NUMBER_MODE={className:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},e.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}]},e.TITLE_MODE={className:"title",begin:e.IDENT_RE,relevance:0},e.UNDERSCORE_TITLE_MODE={className:"title",begin:e.UNDERSCORE_IDENT_RE,relevance:0},e})},function(e,t){e.exports=function(e){return{aliases:["js"],keywords:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},contains:[{className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},{className:"meta",begin:/^#!/,end:/$/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,{className:"subst",begin:"\\$\\{",end:"\\}"}]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"number",variants:[{begin:"\\b(0[bB][01]+)"},{begin:"\\b(0[oO][0-7]+)"},{begin:e.C_NUMBER_RE}],relevance:0},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.REGEXP_MODE,{begin:/</,end:/>\s*[);\]]/,relevance:0,subLanguage:"xml"}],relevance:0},{className:"function",beginKeywords:"function",end:/\{/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/[A-Za-z$_][0-9A-Za-z$_]*/}),{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]}],illegal:/\[|%/},{begin:/\$[(.]/},{begin:"\\."+e.IDENT_RE,relevance:0},{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"constructor",end:/\{/,excludeEnd:!0}],illegal:/#(?!!)/}}},function(e,t){e.exports=function(e){var t="[A-Za-z0-9\\._:-]+",n={begin:/<\?(php)?(?!\w)/,end:/\?>/,subLanguage:"php"},r={endsWithParent:!0,illegal:/</,relevance:0,contains:[n,{className:"attr",begin:t,relevance:0},{begin:"=",relevance:0,contains:[{className:"string",contains:[n],variants:[{begin:/"/,end:/"/},{begin:/'/,end:/'/},{begin:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],case_insensitive:!0,contains:[{className:"meta",begin:"<!DOCTYPE",end:">",relevance:10,contains:[{begin:"\\[",end:"\\]"}]},e.COMMENT("<!--","-->",{relevance:10}),{begin:"<\\!\\[CDATA\\[",end:"\\]\\]>",relevance:10},{className:"tag",begin:"<style(?=\\s|>|$)",end:">",keywords:{name:"style"},contains:[r],starts:{end:"</style>",returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:"<script(?=\\s|>|$)",end:">",keywords:{name:"script"},contains:[r],starts:{end:"</script>",returnEnd:!0,subLanguage:["actionscript","javascript","handlebars","xml"]}},n,{className:"meta",begin:/<\?\w+/,end:/\?>/,relevance:10},{className:"tag",begin:"</?",end:"/?>",contains:[{className:"name",begin:/[^\/><\s]+/,relevance:0},r]}]}}},function(e,t,n){function r(e,t,n){var r=function(t,n){return e.js_beautify(t,n)};return r.js=e.js_beautify,r.css=t.css_beautify,r.html=n.html_beautify,r.js_beautify=e.js_beautify,r.css_beautify=t.css_beautify,r.html_beautify=n.html_beautify,r}var i,o;i=[n(9),n(8),n(100)],o=function(e,t,n){return r(e,t,n)}.apply(t,i),!(void 0!==o&&(e.exports=o))},function(e,t,n){var r,i;!function(){function o(e){return e.replace(/^\s+/g,"")}function s(e){return e.replace(/\s+$/g,"")}function a(e,t,n,r){function i(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=l,this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),extra_liners:y,in_array:function(e,t){for(var n=0;n<t.length;n++)if(e===t[n])return!0;return!1}},this.is_whitespace=function(e){for(var t=0;t<e.length;e++)if(!this.Utils.in_array(e.charAt(t),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var e="";if(e=this.input.charAt(this.pos),this.Utils.in_array(e,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(e,this.Utils.whitespace);)h&&"\n"===e&&this.newlines<=v&&(this.newlines+=1),this.pos++,e=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(e){this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,e),this.print_indentation(e)):(this.line_char_count++,e.push(" "))},this.get_content=function(){for(var e="",t=[];"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];if(this.traverse_whitespace())this.space_or_wrap(t);else{if(_){var n=this.input.substr(this.pos,3);if("{{#"===n||"{{/"===n)break;if("{{!"===n)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"===this.input.substr(this.pos,2)&&"{{else}}"===this.get_tag(!0))break}e=this.input.charAt(this.pos),this.pos++,this.line_char_count++,t.push(e)}}return t.length?t.join(""):""},this.get_contents_to=function(e){if(this.pos===this.input.length)return["","TK_EOF"];var t="",n=new RegExp("</"+e+"\\s*>","igm");n.lastIndex=this.pos;var r=n.exec(this.input),i=r?r.index:this.input.length;return this.pos<i&&(t=this.input.substring(this.pos,i),this.pos=i),t},this.record_tag=function(e){this.tags[e+"count"]?(this.tags[e+"count"]++,this.tags[e+this.tags[e+"count"]]=this.indent_level):(this.tags[e+"count"]=1,this.tags[e+this.tags[e+"count"]]=this.indent_level),this.tags[e+this.tags[e+"count"]+"parent"]=this.tags.parent,this.tags.parent=e+this.tags[e+"count"]},this.retrieve_tag=function(e){if(this.tags[e+"count"]){for(var t=this.tags.parent;t&&e+this.tags[e+"count"]!==t;)t=this.tags[t+"parent"];t&&(this.indent_level=this.tags[e+this.tags[e+"count"]],this.tags.parent=this.tags[t+"parent"]),delete this.tags[e+this.tags[e+"count"]+"parent"],delete this.tags[e+this.tags[e+"count"]],1===this.tags[e+"count"]?delete this.tags[e+"count"]:this.tags[e+"count"]--}},this.indent_to_tag=function(e){if(this.tags[e+"count"]){for(var t=this.tags.parent;t&&e+this.tags[e+"count"]!==t;)t=this.tags[t+"parent"];t&&(this.indent_level=this.tags[e+this.tags[e+"count"]])}},this.get_tag=function(e){var t,n,r,i="",o=[],s="",a=!1,l=!0,u=this.pos,d=this.line_char_count;e=void 0!==e?e:!1;do{if(this.pos>=this.input.length)return e&&(this.pos=u,this.line_char_count=d),o.length?o.join(""):["","TK_EOF"];if(i=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(i,this.Utils.whitespace))a=!0;else{if(("'"===i||'"'===i)&&(i+=this.get_unformatted(i),a=!0),"="===i&&(a=!1),o.length&&"="!==o[o.length-1]&&">"!==i&&a){if(this.space_or_wrap(o),a=!1,!l&&"force"===m&&"/"!==i){this.print_newline(!0,o),this.print_indentation(o);for(var p=0;b>p;p++)o.push(c)}for(var h=0;h<o.length;h++)if(" "===o[h]){l=!1;break}}if(_&&"<"===r&&i+this.input.charAt(this.pos)==="{{"&&(i+=this.get_unformatted("}}"),o.length&&" "!==o[o.length-1]&&"<"!==o[o.length-1]&&(i=" "+i),a=!0),"<"!==i||r||(t=this.pos-1,r="<"),_&&!r&&o.length>=2&&"{"===o[o.length-1]&&"{"===o[o.length-2]&&(t="#"===i||"/"===i||"!"===i?this.pos-3:this.pos-2,r="{"),this.line_char_count++,o.push(i),o[1]&&("!"===o[1]||"?"===o[1]||"%"===o[1])){o=[this.get_comment(t)];break}if(_&&o[1]&&"{"===o[1]&&o[2]&&"!"===o[2]){o=[this.get_comment(t)];break}if(_&&"{"===r&&o.length>2&&"}"===o[o.length-2]&&"}"===o[o.length-1])break}}while(">"!==i);var v,g,y=o.join("");v=-1!==y.indexOf(" ")?y.indexOf(" "):"{"===y.charAt(0)?y.indexOf("}"):y.indexOf(">"),g="<"!==y.charAt(0)&&_?"#"===y.charAt(2)?3:2:1;var x=y.substring(g,v).toLowerCase();return"/"===y.charAt(y.length-2)||this.Utils.in_array(x,this.Utils.single_token)?e||(this.tag_type="SINGLE"):_&&"{"===y.charAt(0)&&"else"===x?e||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(x,f)?(s=this.get_unformatted("</"+x+">",y),o.push(s),n=this.pos-1,this.tag_type="SINGLE"):"script"===x&&(-1===y.search("type")||y.search("type")>-1&&y.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)>-1)?e||(this.record_tag(x),this.tag_type="SCRIPT"):"style"===x&&(-1===y.search("type")||y.search("type")>-1&&y.search("text/css")>-1)?e||(this.record_tag(x),this.tag_type="STYLE"):"!"===x.charAt(0)?e||(this.tag_type="SINGLE",this.traverse_whitespace()):e||("/"===x.charAt(0)?(this.retrieve_tag(x.substring(1)),this.tag_type="END"):(this.record_tag(x),"html"!==x.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(o),this.Utils.in_array(x,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!==this.output[this.output.length-2]&&this.print_newline(!0,this.output))),e&&(this.pos=u,this.line_char_count=d),o.join("")},this.get_comment=function(e){var t="",n=">",r=!1;for(this.pos=e,input_char=this.input.charAt(this.pos),this.pos++;this.pos<=this.input.length&&(t+=input_char,t.charAt(t.length-1)!==n.charAt(n.length-1)||-1===t.indexOf(n));)!r&&t.length<10&&(0===t.indexOf("<![if")?(n="<![endif]>",r=!0):0===t.indexOf("<![cdata[")?(n="]]>",r=!0):0===t.indexOf("<![")?(n="]>",r=!0):0===t.indexOf("<!--")?(n="-->",r=!0):0===t.indexOf("{{!")?(n="}}",r=!0):0===t.indexOf("<?")?(n="?>",r=!0):0===t.indexOf("<%")&&(n="%>",r=!0)),input_char=this.input.charAt(this.pos),this.pos++;return t},this.get_unformatted=function(e,t){if(t&&-1!==t.toLowerCase().indexOf(e))return"";var n="",r="",i=0,o=!0;do{if(this.pos>=this.input.length)return r;if(n=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(n,this.Utils.whitespace)){if(!o){this.line_char_count--;continue}if("\n"===n||"\r"===n){r+="\n",this.line_char_count=0;continue}}r+=n,this.line_char_count++,o=!0,_&&"{"===n&&r.length&&"{"===r.charAt(r.length-2)&&(r+=this.get_unformatted("}}"),i=r.length)}while(-1===r.toLowerCase().indexOf(e,i));return r},this.get_token=function(){var e;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var t=this.last_token.substr(7);return e=this.get_contents_to(t),"string"!=typeof e?e:[e,"TK_"+t]}if("CONTENT"===this.current_mode)return e=this.get_content(),"string"!=typeof e?e:[e,"TK_CONTENT"];if("TAG"===this.current_mode){if(e=this.get_tag(),"string"!=typeof e)return e;var n="TK_TAG_"+this.tag_type;return[e,n]}},this.get_full_indent=function(e){return e=this.indent_level+e||0,1>e?"":Array(e+1).join(this.indent_string)},this.is_unformatted=function(e,t){if(!this.Utils.in_array(e,t))return!1;if("a"!==e.toLowerCase()||!this.Utils.in_array("a",t))return!0;var n=this.get_tag(!0),r=(n||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!r||this.Utils.in_array(r,t)?!0:!1},this.printer=function(e,t,n,r,i){this.input=e||"",this.input=this.input.replace(/\r\n|[\r\u2028\u2029]/g,"\n"),this.output=[],this.indent_character=t,this.indent_string="",this.indent_size=n,this.brace_style=i,this.indent_level=0,this.wrap_line_length=r,this.line_char_count=0;for(var a=0;a<this.indent_size;a++)this.indent_string+=this.indent_character;this.print_newline=function(e,t){this.line_char_count=0,t&&t.length&&(e||"\n"!==t[t.length-1])&&("\n"!==t[t.length-1]&&(t[t.length-1]=s(t[t.length-1])),t.push("\n"))},this.print_indentation=function(e){for(var t=0;t<this.indent_level;t++)e.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(e){(!this.is_whitespace(e)||this.output.length)&&((e||""!==e)&&this.output.length&&"\n"===this.output[this.output.length-1]&&(this.print_indentation(this.output),e=o(e)),this.print_token_raw(e))},this.print_token_raw=function(e){this.newlines>0&&(e=s(e)),e&&""!==e&&(e.length>1&&"\n"===e.charAt(e.length-1)?(this.output.push(e.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(e));for(var t=0;t<this.newlines;t++)this.print_newline(t>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var a,l,u,c,d,p,f,h,v,_,m,b,g,y,x;for(t=t||{},void 0!==t.wrap_line_length&&0!==parseInt(t.wrap_line_length,10)||void 0===t.max_char||0===parseInt(t.max_char,10)||(t.wrap_line_length=t.max_char),l=void 0===t.indent_inner_html?!1:t.indent_inner_html,u=void 0===t.indent_size?4:parseInt(t.indent_size,10),c=void 0===t.indent_char?" ":t.indent_char,p=void 0===t.brace_style?"collapse":t.brace_style,d=0===parseInt(t.wrap_line_length,10)?32786:parseInt(t.wrap_line_length||250,10),f=t.unformatted||["a","span","img","bdo","em","strong","dfn","code","samp","kbd","var","cite","abbr","acronym","q","sub","sup","tt","i","b","big","small","u","s","strike","font","ins","del","pre","address","dt","h1","h2","h3","h4","h5","h6"],h=void 0===t.preserve_newlines?!0:t.preserve_newlines,v=h?isNaN(parseInt(t.max_preserve_newlines,10))?32786:parseInt(t.max_preserve_newlines,10):0,_=void 0===t.indent_handlebars?!1:t.indent_handlebars,m=void 0===t.wrap_attributes?"auto":t.wrap_attributes,b=void 0===t.wrap_attributes_indent_size?u:parseInt(t.wrap_attributes_indent_size,10)||u,g=void 0===t.end_with_newline?!1:t.end_with_newline,y="object"==typeof t.extra_liners&&t.extra_liners?t.extra_liners.concat():"string"==typeof t.extra_liners?t.extra_liners.split(","):"head,body,/html".split(","),x=t.eol?t.eol:"\n",t.indent_with_tabs&&(c="	",u=1),x=x.replace(/\\r/,"\r").replace(/\\n/,"\n"),a=new i,a.printer(e,c,u,d,p);;){var w=a.get_token();if(a.token_text=w[0],a.token_type=w[1],"TK_EOF"===a.token_type)break;switch(a.token_type){case"TK_TAG_START":a.print_newline(!1,a.output),a.print_token(a.token_text),a.indent_content&&(a.indent(),a.indent_content=!1),a.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":a.print_newline(!1,a.output),a.print_token(a.token_text),a.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===a.last_token&&""===a.last_text){var E=a.token_text.match(/\w+/)[0],T=null;a.output.length&&(T=a.output[a.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null===T||T[1]!==E&&!a.Utils.in_array(T[1],f))&&a.print_newline(!1,a.output)}a.print_token(a.token_text),a.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var S=a.token_text.match(/^\s*<([a-z-]+)/i);S&&a.Utils.in_array(S[1],f)||a.print_newline(!1,a.output),a.print_token(a.token_text),a.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":a.print_token(a.token_text),a.indent_content&&(a.indent(),a.indent_content=!1),a.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":a.print_token(a.token_text),a.current_mode="TAG";break;case"TK_CONTENT":a.print_token(a.token_text),a.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==a.token_text){a.print_newline(!1,a.output);var k,C=a.token_text,O=1;"TK_SCRIPT"===a.token_type?k="function"==typeof n&&n:"TK_STYLE"===a.token_type&&(k="function"==typeof r&&r),"keep"===t.indent_scripts?O=0:"separate"===t.indent_scripts&&(O=-a.indent_level);var A=a.get_full_indent(O);if(k){var R=function(){this.eol="\n"};R.prototype=t;var j=new R;C=k(C.replace(/^\s*/,A),j)}else{var I=C.match(/^\s*/)[0],N=I.match(/[^\n\r]*$/)[0].split(a.indent_string).length-1,D=a.get_full_indent(O-N);C=C.replace(/^\s*/,A).replace(/\r\n|\r|\n/g,"\n"+D).replace(/\s+$/,"")}C&&(a.print_token_raw(C),a.print_newline(!0,a.output))}a.current_mode="TAG";break;default:""!==a.token_text&&a.print_token(a.token_text)}a.last_token=a.token_type,a.last_text=a.token_text}var L=a.output.join("").replace(/[\r\n\t ]+$/,"");return g&&(L+="\n"),"\n"!=x&&(L=L.replace(/[\n]/g,x)),L}r=[n,n(9),n(8)],i=function(e){var t=n(9),r=n(8);return{html_beautify:function(e,n){return a(e,n,t.js_beautify,r.css_beautify)}}}.apply(t,r),!(void 0!==i&&(e.exports=i))}()},function(e,t,n){function r(e){switch(l(e)){case"Object":return i(e);case"Array":return a(e);case"RegExp":return o(e);case"Date":return s(e);default:return e}}function i(e){return u(e)?c({},e):e}function o(e){var t="";return t+=e.multiline?"m":"",t+=e.global?"g":"",t+=e.ignoreCase?"i":"",new RegExp(e.source,t)}function s(e){return new Date(+e)}function a(e){return e.slice()}var l=n(10),u=n(15),c=n(110);e.exports=r},function(e,t,n){function r(e,t){switch(l(e)){case"Object":return i(e,t);case"Array":return o(e,t);default:return s(e)}}function i(e,t){if(u(e)){var n={};return a(e,function(e,n){this[n]=r(e,t)},n),n}return t?t(e):e}function o(e,t){for(var n=[],i=-1,o=e.length;++i<o;)n[i]=r(e[i],t);return n}var s=n(101),a=n(1),l=n(10),u=n(15);e.exports=r},function(e,t,n){var r=n(4),i=Array.isArray||function(e){return r(e,"Array")};e.exports=i},function(e,t,n){function r(e){return i(e,"Number")}var i=n(4);e.exports=r},function(e,t,n){function r(e){return i(e,"Object")}var i=n(4);e.exports=r},function(e,t,n){function r(e){return i(e,"String")}var i=n(4);e.exports=r},function(e,t,n){function r(){a=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],s=!0;for(var e in{toString:null})s=!1}function i(e,t,n){var i,u=0;null==s&&r();for(i in e)if(o(t,e,i,n)===!1)break;if(s)for(var c=e.constructor,d=!!c&&e===c.prototype;(i=a[u++])&&("constructor"===i&&(d||!l(e,i))||e[i]===Object.prototype[i]||o(t,e,i,n)!==!1););}function o(e,t,n,r){return e.call(r,t[n],n,t)}var s,a,l=n(11);e.exports=i},function(e,t,n){var r=n(1),i=Object.keys||function(e){var t=[];return r(e,function(e,n){t.push(n)}),t};e.exports=i},function(e,t,n){function r(){var e,t,n,a,l=1;for(a=o(arguments[0]);n=arguments[l++];)for(e in n)i(n,e)&&(t=n[e],s(t)&&s(a[e])?a[e]=r(a[e],t):a[e]=o(t));return a}var i=n(11),o=n(102),s=n(105);e.exports=r},function(e,t,n){function r(e,t){for(var n,r=0,s=arguments.length;++r<s;)n=arguments[r],null!=n&&o(n,i,e);return e}function i(e,t){this[t]=e}var o=n(1);e.exports=r},function(e,t,n){function r(e){var t=[];return i(e,function(e,n){t.push(e)}),t}var i=n(1);e.exports=r},function(e,t,n){function r(e,t){return e=null==e?o:e,t=null==t?s:t,e+(t-e)*i()}var i=n(114),o=n(17),s=n(16);e.exports=r},function(e,t,n){function r(e,t){return e=null==e?i:~~e,t=null==t?o:~~t,Math.round(s(e-.5,t+.499999999999))}var i=n(17),o=n(16),s=n(112);e.exports=r},function(e,t){function n(){return n.get()}n.get=Math.random,e.exports=n},function(e,t,n){function r(e){return e=i(e),e.toLowerCase()}var i=n(2);e.exports=r},function(e,t,n){function r(e){return e=i(e),e.replace(o,"")}var i=n(2),o=/[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;e.exports=r},function(e,t,n){function r(e){return e=i(e),e.search(/[\xC0-\xFF]/g)>-1&&(e=e.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),e}var i=n(2);e.exports=r},function(e,t,n){function r(e){return e=i(e),e.toUpperCase()}var i=n(2);e.exports=r},function(e,t){e.exports='<div class=alert :class=alertNotificationClass v-if="alertNotificationModel && !fixed"><partial name=alert></partial></div><div class=alert :class=alertNotificationClass v-if="alertNotificationModel && fixed" v-transfer-dom><partial name=alert></partial></div>'},function(e,t){e.exports="<div class=item :class=\"{ 'active': active }\"><slot></slot></div>"},function(e,t){e.exports='<div id="{{ carouselId }}" class="carousel slide"><ol v-if="indicators && items.length>1" class=carousel-indicators><li v-for="item in items" :data-target="\'#\' + carouselId" :data-slide-to=$index :class="{ \'active\': item.active }"></li></ol><div class=carousel-inner role=listbox><slot></slot></div><template v-if="controls && items.length>1"><a class="left carousel-control" href="#{{ carouselId }}" role=button data-slide=prev><span class="glyphicon glyphicon-chevron-left" aria-hidden=true></span> <span class=sr-only>Previous</span></a> <a class="right carousel-control" href="#{{ carouselId }}" role=button data-slide=next><span class="glyphicon glyphicon-chevron-right" aria-hidden=true></span> <span class=sr-only>Next</span></a></template></div>'},function(e,t){e.exports='<div v-el:cover :class=coverClass><img v-el:image :src="src"><div :class=overlayClass><div class=v-bottom><div class=container-fluid><div class=page-section><h1 class="text-h1 text-overlay margin-v-0-10">{{ bannerTitle }}</h1><p class="lead text-overlay">{{ bannerText }}</p></div></div></div></div></div>'},function(e,t){e.exports='<div v-el:cover :class=coverClass><img v-el:image :src=src :alt="label"> <a v-link=link :class=overlayClass><span class=v-center><span class=text-h1 v-if=label>{{ label }}</span> <span class=text-h2 v-if=labelSm>{{ labelSm }}</span> <span class=text-h3 v-if=labelXs>{{ labelXs }}</span></span></a></div>'},function(e,t){e.exports='<div v-el:cover :class=coverClass><img v-el:image :src="src"><div :class=overlayClass><span class=v-center><slot></slot></span> <span class=v-top><slot name=top></slot></span> <span class=v-bottom><slot name=bottom></slot></span></div></div>';
	},function(e,t){e.exports="<dropdown-list-item :class=class><partial name=toggle></partial><ul class=dropdown-menu :class=dropdownMenuClass @click.stop><partial name=dropdown-menu-content></partial></ul></dropdown-list-item>"},function(e,t){e.exports="<dropdown :class=class><partial name=toggle></partial><div class=dropdown-menu :class=dropdownMenuClass @click.stop><partial name=dropdown-menu-content></partial></div></dropdown>"},function(e,t){e.exports="<li :class=containerClass :aria-role=ariaRole><slot></slot></li>"},function(e,t){e.exports='<dropdown-list-item :is-submenu=isSubmenu :active=active :open-event=openEvent :aria-role=ariaItemRole @opened.tk.dropdown="ariaExpanded(\'true\')" @closed.tk.dropdown="ariaExpanded(\'false\')"><template><template v-if=isSubmenu><a class=dropdown-menu-button href=# @click.prevent v-el:toggle><i class=dropdown-menu-icon v-if=model.icon :class=model.icon></i> <span>{{ model.label }}</span></a><ul class="dropdown-menu dropdown-submenu" :role=ariaRole><dropdown-menu v-for="child in model.children" :model=child :aria-role=ariaRole :aria-item-role=ariaItemRole></dropdown-menu></ul></template><template v-else><a class=dropdown-menu-button v-link=model.route @click=closeMenuTree><i class=dropdown-menu-icon v-if=model.icon :class=model.icon></i> <span>{{ model.label }}</span></a></template></template></dropdown-list-item>'},function(e,t){e.exports='<dropdown class=form-group v-el:dropdown @closed.tk.dropdown="searchValue=null"><partial name=search></partial><partial name=results></partial></dropdown>'},function(e,t){e.exports="<div :class=containerClass :aria-role=ariaRole><slot></slot></div>"},function(e,t){e.exports='<div class="panel panel-default"><div class="panel-body expandable expandable-trigger" :class=expandableClass v-on:click=toggle><div class=expandable-content :class=contentClass><slot></slot><div class=expandable-indicator v-on:click.stop=toggle($event) v-el:indicator><i></i></div></div></div></div>'},function(e,t){e.exports='<div class="expandable expandable-trigger" :class=expandableClass v-on:click=toggle><div class=expandable-content :class=contentClass><slot></slot><div class=expandable-indicator v-on:click.stop=toggle($event) v-el:indicator><i></i></div></div></div>'},function(e,t){e.exports="<div class=la-co><div class=st-co><slot name=navbar></slot><slot name=sidebar></slot><div class=st-pu><slot name=sidebar-push></slot><div class=st-cnt><div class=la-cnt><slot name=navbar-content></slot><div v-scrollable><slot></slot></div></div></div></div></div></div>"},function(e,t){e.exports="<div class=la-co><slot name=navbar></slot><slot name=sidebar></slot><div class=la-cnt v-scrollable><slot></slot></div></div>"},function(e,t){e.exports='<div :class=modalClass :id=id v-if=true v-transfer-dom><div class=modal-dialog :class=dialog><div class=v-cell><div class=modal-content :class=content><div class=modal-header v-if=header><button type=button class=close data-dismiss=modal><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button><h4 class=modal-title>{{ title }}</h4></div><div class=modal-body><slot name=body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam atque consequuntur dolore fugiat fugit hic in ipsam iure magnam maxime quaerat, quam qui repellat repellendus temporibus vel vitae voluptate!</slot></div><div class=modal-footer v-if=footer><button type=button class="btn btn-default" data-dismiss=modal>Close</button> <button type=button class="btn btn-primary" @click=save>Save</button></div></div></div></div></div>'},function(e,t){e.exports='<nav class=navbar v-bind:class=navbarClass><div class=container-fluid><div class=navbar-header><slot name=sidebar-toggle-button></slot><slot name=brand></slot><button type=button class=navbar-toggle data-toggle=collapse data-target="#collapse{{ id }}"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button></div><div class="navbar-collapse collapse" id="collapse{{ id }}"><slot></slot></div></div></nav>'},function(e,t){e.exports='<li class=sidebar-menu-item :class="{ active: active, \'hasSubmenu\': isSubmenu, open: open }"><template v-if=isSubmenu><a class=sidebar-menu-button v-el:submenu-button :href="\'#\' + submenuId" data-toggle=collapse :aria-expanded=open><i class=sidebar-menu-icon v-if=model.icon :class=model.icon></i> <span>{{ model.label }}</span></a><ul class="sidebar-submenu collapse" v-el:submenu-element :id=submenuId :class="{ \'in\': open }"><sidebar-collapse-item v-for="child in model.children" :model=child></sidebar-collapse-item></ul></template><template v-else><a class=sidebar-menu-button v-el:menu-button v-link=model.route><i class=sidebar-menu-icon v-if=model.icon :class=model.icon></i> <span>{{ model.label }}</span></a></template></li>'},function(e,t){e.exports='<template v-if=dropdown><div class=dropdown-container v-el:dropdown-container><ul><li class=dropdown :class="{ open: dropdown }" style="overflow: visible"><ul class=dropdown-menu :style=dropdownMenuStyle><dropdown-menu v-for="dd in dropdown.model.children" @click="dropdown=null" :model=dd></dropdown-menu></ul></li></ul></div></template>'},function(e,t){e.exports="<li class=sidebar-menu-item :class=\"{ active: active, 'hasSubmenu': isSubmenu, open: open }\"><template v-if=isSubmenu><a class=sidebar-menu-button :href=\"'#' + submenuId\" @mouseenter=emitDropdownOpen><i class=sidebar-menu-icon v-if=model.icon :class=model.icon></i> <span>{{ model.label }}</span></a></template><template v-else><a class=sidebar-menu-button v-link=model.route><i class=sidebar-menu-icon v-if=model.icon :class=model.icon></i> <span>{{ model.label }}</span></a></template></li>"},function(e,t){e.exports='<template v-if=items.length><h4 class=sidebar-category v-if=heading>{{ heading }}</h4><div class=sidebar-block><div class=sidebar-feed><div class="media sidebar-feed-item sidebar-feed-unread" v-for="item in model"><span v-if=item.unread class="sidebar-feed-status pull-right"><i class="fa fa-circle"></i></span> <span v-if=icon class=pull-left><i class="{{ icon }}"></i></span><div class=media-body><a v-link=item.user.route>{{ item.user.name }}</a> {{ item.action }} <span class=time>{{ item.time }}</span></div></div></div></div></template>'},function(e,t){e.exports="<h4 class=sidebar-category v-if=heading>{{ heading }}</h4><ul class=sidebar-menu :class=class><slot></slot></ul>"},function(e,t){e.exports='<div class=split-vertical><slot name=brand></slot><div class=sidebar-block :class=sidebarTabsClass v-show=tabs.length><tabs-nav v-if=!navId :responsive=responsive :tabs=tabs></tabs-nav></div><div class=split-vertical-body><div class=split-vertical-cell><div class="tab-content sidebar-tab-content"><slot></slot></div></div></div></div>'},function(e,t){e.exports='<a href=# @click.stop.prevent=toggle :class=buttonClass><i v-if=icon class="{{ icon }}"></i> <span v-if=label>{{ label }}</span></a>'},function(e,t){e.exports="<div v-show=isVisible :class=sidebarClass><div v-if=scrollable v-scrollable><slot></slot></div><slot v-else></slot><sidebar-toggle-button v-if=toggleBar :sidebar-id=sidebarId class=sidebar-toggle-bar></sidebar-toggle-button><slot name=root></slot></div>"},function(e,t){e.exports='<div class=tab-pane :class="{ active: active }" :id=tabId><template v-if=scrollable><div v-scrollable><slot></slot></div></template><template v-else><slot></slot></template></div>'},function(e,t){e.exports='<ul :class=navClass v-show="visibleTabs.length > 1"><li v-for="tab in tabs" v-show=tab.visible><a href="#{{ tab.tabId }}" data-toggle=tab><i v-if=tab.icon :class=tab.icon></i><template v-if=tab.label>{{ tab.label }}</template></a></li></ul>'},function(e,t){e.exports="<div v-show=tabs.length :class=tabsClass><tabs-nav v-if=!navId :responsive=responsive :tabs=tabs></tabs-nav><div class=tab-content><slot></slot></div></div>"},function(e,t,n){var r,i;n(79),r=n(30),i=n(119),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(31),i=n(120),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(32),i=n(121),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(33),i=n(122),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(34),i=n(123),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(35),i=n(124),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(37),i=n(125),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(94),r=n(41),i=n(129),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(43),i=n(131),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(45),i=n(133),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(85),r=n(47),i=n(135),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(86),r=n(48),i=n(136),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(49),i=n(137),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(87),r=n(50),i=n(138),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(51),i=n(139),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(88),r=n(52),i=n(140),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(89),r=n(54),i=n(141),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;r=n(55),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(90),r=n(56),i=n(142),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){var r,i;n(91),r=n(58),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t,n){!function(t,n){!(e.exports={install:n})}(this,function(e,t){var n=t&&t.name||"transferDom";n=e.util.hyphenate(n);var r=e.FragmentFactory,i=e.util.remove,o=e.util.createAnchor;e.compiler.terminalDirectives.push(n),e.directive(n,{priority:2e3,bind:function(){var e=this.el;if(e.__vue__)console.warn('v-transfer-dom="'+this.expression+'" cannot be used on an instance root element.');else{var t=this.arg?document.getElementById(this.arg):document.body;this.anchor=o("v-transfer-dom"),t.appendChild(this.anchor),i(this.el);var n=new r(this.vm,e);this.frag=n.create(this._host,this._scope,this._frag),this.frag.before(this.anchor)}},unbind:function(){this.frag.remove(),i(this.anchor)}})})}]))})},function(e,t){function n(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*c;case"days":case"day":case"d":return n*u;case"hours":case"hour":case"hrs":case"hr":case"h":return n*l;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function r(e){return e>=u?Math.round(e/u)+"d":e>=l?Math.round(e/l)+"h":e>=a?Math.round(e/a)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function i(e){return o(e,u,"day")||o(e,l,"hour")||o(e,a,"minute")||o(e,s,"second")||e+" ms"}function o(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var s=1e3,a=60*s,l=60*a,u=24*l,c=365.25*u;e.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t["long"]?i(e):r(e)}},function(e,t,n){"use strict";function r(e,t,r){var o=n(10)("algoliasearch"),s=n(34),a=n(1),l=n(7),u="Usage: algoliasearch(applicationID, apiKey, opts)";if(!e)throw new d.AlgoliaSearchError("Please provide an application ID. "+u);if(!t)throw new d.AlgoliaSearchError("Please provide an API key. "+u);this.applicationID=e,this.apiKey=t;var c=[this.applicationID+"-1.algolianet.com",this.applicationID+"-2.algolianet.com",this.applicationID+"-3.algolianet.com"];this.hosts={read:[],write:[]},this.hostIndex={read:0,write:0},r=r||{};var p=r.protocol||"https:",f=void 0===r.timeout?2e3:r.timeout;if(/:$/.test(p)||(p+=":"),"http:"!==r.protocol&&"https:"!==r.protocol)throw new d.AlgoliaSearchError("protocol must be `http:` or `https:` (was `"+r.protocol+"`)");r.hosts?a(r.hosts)?(this.hosts.read=s(r.hosts),this.hosts.write=s(r.hosts)):(this.hosts.read=s(r.hosts.read),this.hosts.write=s(r.hosts.write)):(this.hosts.read=[this.applicationID+"-dsn.algolia.net"].concat(c),this.hosts.write=[this.applicationID+".algolia.net"].concat(c)),this.hosts.read=l(this.hosts.read,i(p)),this.hosts.write=l(this.hosts.write,i(p)),this.requestTimeout=f,this.extraHeaders=[],this.cache=r._cache||{},this._ua=r._ua,this._useCache=void 0===r._useCache||r._cache?!0:r._useCache,this._setTimeout=r._setTimeout,o("init done, %j",this)}function i(e){return function(t){return e+"//"+t.toLowerCase()}}function o(){var e="Not implemented in this environment.\nIf you feel this is a mistake, write to support@algolia.com";throw new d.AlgoliaSearchError(e)}function s(e,t){var n=e.toLowerCase().replace(".","").replace("()","");return"algoliasearch: `"+e+"` was replaced by `"+t+"`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#"+n}function a(e,t){t(e,0)}function l(e,t){function n(){return r||(console.log(t),r=!0),e.apply(this,arguments)}var r=!1;return n}function u(e){if(void 0===Array.prototype.toJSON)return JSON.stringify(e);var t=Array.prototype.toJSON;delete Array.prototype.toJSON;var n=JSON.stringify(e);return Array.prototype.toJSON=t,n}function c(e){return function(t,n,r){if("function"==typeof t&&"object"==typeof n||"object"==typeof r)throw new d.AlgoliaSearchError("index.search usage is index.search(query, params, cb)");0===arguments.length||"function"==typeof t?(r=t,t=""):(1===arguments.length||"function"==typeof n)&&(r=n,n=void 0),"object"==typeof t&&null!==t?(n=t,t=void 0):(void 0===t||null===t)&&(t="");var i="";return void 0!==t&&(i+=e+"="+encodeURIComponent(t)),void 0!==n&&(i=this.as._getSearchParams(n,i)),this._search(i,r)}}e.exports=r;var d=n(12);r.prototype={deleteIndex:function(e,t){return this._jsonRequest({method:"DELETE",url:"/1/indexes/"+encodeURIComponent(e),hostType:"write",callback:t})},moveIndex:function(e,t,n){var r={operation:"move",destination:t};return this._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(e)+"/operation",body:r,hostType:"write",callback:n})},copyIndex:function(e,t,n){var r={operation:"copy",destination:t};return this._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(e)+"/operation",body:r,hostType:"write",callback:n})},getLogs:function(e,t,n){return 0===arguments.length||"function"==typeof e?(n=e,e=0,t=10):(1===arguments.length||"function"==typeof t)&&(n=t,t=10),this._jsonRequest({method:"GET",url:"/1/logs?offset="+e+"&length="+t,hostType:"read",callback:n})},listIndexes:function(e,t){var n="";return void 0===e||"function"==typeof e?t=e:n="?page="+e,this._jsonRequest({method:"GET",url:"/1/indexes"+n,hostType:"read",callback:t})},initIndex:function(e){return new this.Index(this,e)},listUserKeys:function(e){return this._jsonRequest({method:"GET",url:"/1/keys",hostType:"read",callback:e})},getUserKeyACL:function(e,t){return this._jsonRequest({method:"GET",url:"/1/keys/"+e,hostType:"read",callback:t})},deleteUserKey:function(e,t){return this._jsonRequest({method:"DELETE",url:"/1/keys/"+e,hostType:"write",callback:t})},addUserKey:function(e,t,r){var i=n(1),o="Usage: client.addUserKey(arrayOfAcls[, params, callback])";if(!i(e))throw new Error(o);(1===arguments.length||"function"==typeof t)&&(r=t,t=null);var s={acl:e};return t&&(s.validity=t.validity,s.maxQueriesPerIPPerHour=t.maxQueriesPerIPPerHour,s.maxHitsPerQuery=t.maxHitsPerQuery,s.indexes=t.indexes,s.description=t.description,t.queryParameters&&(s.queryParameters=this._getSearchParams(t.queryParameters,"")),s.referers=t.referers),this._jsonRequest({method:"POST",url:"/1/keys",body:s,hostType:"write",callback:r})},addUserKeyWithValidity:l(function(e,t,n){return this.addUserKey(e,t,n)},s("client.addUserKeyWithValidity()","client.addUserKey()")),updateUserKey:function(e,t,r,i){var o=n(1),s="Usage: client.updateUserKey(key, arrayOfAcls[, params, callback])";if(!o(t))throw new Error(s);(2===arguments.length||"function"==typeof r)&&(i=r,r=null);var a={acl:t};return r&&(a.validity=r.validity,a.maxQueriesPerIPPerHour=r.maxQueriesPerIPPerHour,a.maxHitsPerQuery=r.maxHitsPerQuery,a.indexes=r.indexes,a.description=r.description,r.queryParameters&&(a.queryParameters=this._getSearchParams(r.queryParameters,"")),a.referers=r.referers),this._jsonRequest({method:"PUT",url:"/1/keys/"+e,body:a,hostType:"write",callback:i})},setSecurityTags:function(e){if("[object Array]"===Object.prototype.toString.call(e)){for(var t=[],n=0;n<e.length;++n)if("[object Array]"===Object.prototype.toString.call(e[n])){for(var r=[],i=0;i<e[n].length;++i)r.push(e[n][i]);t.push("("+r.join(",")+")")}else t.push(e[n]);e=t.join(",")}this.securityTags=e},setUserToken:function(e){this.userToken=e},startQueriesBatch:l(function(){this._batch=[]},s("client.startQueriesBatch()","client.search()")),addQueryInBatch:l(function(e,t,n){this._batch.push({indexName:e,query:t,params:n})},s("client.addQueryInBatch()","client.search()")),clearCache:function(){this.cache={}},sendQueriesBatch:l(function(e){return this.search(this._batch,e)},s("client.sendQueriesBatch()","client.search()")),setRequestTimeout:function(e){e&&(this.requestTimeout=parseInt(e,10))},search:function(e,t){var r=n(1),i=n(7),o="Usage: client.search(arrayOfQueries[, callback])";if(!r(e))throw new Error(o);var s=this,a={requests:i(e,function(e){var t="";return void 0!==e.query&&(t+="query="+encodeURIComponent(e.query)),{indexName:e.indexName,params:s._getSearchParams(e.params,t)}})},l=i(a.requests,function(e,t){return t+"="+encodeURIComponent("/1/indexes/"+encodeURIComponent(e.indexName)+"?"+e.params)}).join("&");return this._jsonRequest({cache:this.cache,method:"POST",url:"/1/indexes/*/queries",body:a,hostType:"read",fallback:{method:"GET",url:"/1/indexes/*",body:{params:l}},callback:t})},batch:function(e,t){var r=n(1),i="Usage: client.batch(operations[, callback])";if(!r(e))throw new Error(i);return this._jsonRequest({method:"POST",url:"/1/indexes/*/batch",body:{requests:e},hostType:"write",callback:t})},destroy:o,enableRateLimitForward:o,disableRateLimitForward:o,useSecuredAPIKey:o,disableSecuredAPIKey:o,generateSecuredApiKey:o,Index:function(e,t){this.indexName=t,this.as=e,this.typeAheadArgs=null,this.typeAheadValueOption=null,this.cache={}},setExtraHeader:function(e,t){this.extraHeaders.push({name:e.toLowerCase(),value:t})},addAlgoliaAgent:function(e){this._ua+=";"+e},_jsonRequest:function(e){function t(n,a){function f(e){var t=e&&e.body&&e.body.message&&e.body.status||e.statusCode||e&&e.body&&200;i("received response: statusCode: %s, computed statusCode: %d, headers: %j",e.statusCode,t,e.headers);var n=200===t||201===t,r=!n&&4!==Math.floor(t/100)&&1!==Math.floor(t/100);if(s._useCache&&n&&o&&(o[_]=e.responseText),n)return e.body;if(r)return l+=1,v();var a=new d.AlgoliaSearchError(e.body&&e.body.message);return s._promise.reject(a)}function h(r){return i("error: %s, stack: %s",r.message,r.stack),r instanceof d.AlgoliaSearchError||(r=new d.Unknown(r&&r.message,r)),l+=1,r instanceof d.Unknown||r instanceof d.UnparsableJSON||l>=s.hosts[e.hostType].length&&(c||!p)?s._promise.reject(r):(s.hostIndex[e.hostType]=++s.hostIndex[e.hostType]%s.hosts[e.hostType].length,r instanceof d.RequestTimeout?v():(c||(l=1/0),t(n,a)))}function v(){return s.hostIndex[e.hostType]=++s.hostIndex[e.hostType]%s.hosts[e.hostType].length,a.timeout=s.requestTimeout*(l+1),t(n,a)}var _;if(s._useCache&&(_=e.url),s._useCache&&r&&(_+="_body_"+a.body),s._useCache&&o&&void 0!==o[_])return i("serving response from cache"),s._promise.resolve(JSON.parse(o[_]));if(l>=s.hosts[e.hostType].length)return!p||c?(i("could not get any response"),s._promise.reject(new d.AlgoliaSearchError("Cannot connect to the AlgoliaSearch API. Send an email to support@algolia.com to report and resolve the issue. Application id was: "+s.applicationID))):(i("switching to fallback"),l=0,a.method=e.fallback.method,a.url=e.fallback.url,a.jsonBody=e.fallback.body,a.jsonBody&&(a.body=u(a.jsonBody)),a.timeout=s.requestTimeout*(l+1),s.hostIndex[e.hostType]=0,c=!0,t(s._request.fallback,a));var m=s.hosts[e.hostType][s.hostIndex[e.hostType]]+a.url,b={body:a.body,jsonBody:a.jsonBody,method:a.method,headers:s._computeRequestHeaders(),timeout:a.timeout,debug:i};return i("method: %s, url: %s, headers: %j, timeout: %d",b.method,m,b.headers,b.timeout),n===s._request.fallback&&i("using fallback"),n.call(s,m,b).then(f,h)}var r,i=n(10)("algoliasearch:"+e.url),o=e.cache,s=this,l=0,c=!1,p=s._request.fallback&&e.fallback;void 0!==e.body&&(r=u(e.body)),i("request start");var f=t(s._request,{url:e.url,method:e.method,body:r,jsonBody:e.body,timeout:s.requestTimeout*(l+1)});return e.callback?void f.then(function(t){a(function(){e.callback(null,t)},s._setTimeout||setTimeout)},function(t){a(function(){e.callback(t)},s._setTimeout||setTimeout)}):f},_getSearchParams:function(e,t){if(void 0===e||null===e)return t;for(var n in e)null!==n&&void 0!==e[n]&&e.hasOwnProperty(n)&&(t+=""===t?"":"&",t+=n+"="+encodeURIComponent("[object Array]"===Object.prototype.toString.call(e[n])?u(e[n]):e[n]));return t},_computeRequestHeaders:function(){var e=n(18),t={"x-algolia-api-key":this.apiKey,"x-algolia-application-id":this.applicationID,"x-algolia-agent":this._ua};return this.userToken&&(t["x-algolia-usertoken"]=this.userToken),this.securityTags&&(t["x-algolia-tagfilters"]=this.securityTags),this.extraHeaders&&e(this.extraHeaders,function(e){t[e.name]=e.value}),t}},r.prototype.Index.prototype={clearCache:function(){this.cache={}},addObject:function(e,t,n){var r=this;return(1===arguments.length||"function"==typeof t)&&(n=t,t=void 0),this.as._jsonRequest({method:void 0!==t?"PUT":"POST",url:"/1/indexes/"+encodeURIComponent(r.indexName)+(void 0!==t?"/"+encodeURIComponent(t):""),body:e,hostType:"write",callback:n})},addObjects:function(e,t){var r=n(1),i="Usage: index.addObjects(arrayOfObjects[, callback])";if(!r(e))throw new Error(i);for(var o=this,s={requests:[]},a=0;a<e.length;++a){var l={action:"addObject",body:e[a]};s.requests.push(l)}return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(o.indexName)+"/batch",body:s,hostType:"write",callback:t})},getObject:function(e,t,n){var r=this;(1===arguments.length||"function"==typeof t)&&(n=t,t=void 0);var i="";if(void 0!==t){i="?attributes=";for(var o=0;o<t.length;++o)0!==o&&(i+=","),i+=t[o]}return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(r.indexName)+"/"+encodeURIComponent(e)+i,hostType:"read",callback:n})},getObjects:function(e,t,r){var i=n(1),o=n(7),s="Usage: index.getObjects(arrayOfObjectIDs[, callback])";if(!i(e))throw new Error(s);var a=this;(1===arguments.length||"function"==typeof t)&&(r=t,t=void 0);var l={requests:o(e,function(e){var n={indexName:a.indexName,objectID:e};return t&&(n.attributesToRetrieve=t.join(",")),n})};return this.as._jsonRequest({method:"POST",url:"/1/indexes/*/objects",hostType:"read",body:l,callback:r})},partialUpdateObject:function(e,t,n){(1===arguments.length||"function"==typeof t)&&(n=t,t=void 0);var r=this,i="/1/indexes/"+encodeURIComponent(r.indexName)+"/"+encodeURIComponent(e.objectID)+"/partial";return t===!1&&(i+="?createIfNotExists=false"),this.as._jsonRequest({method:"POST",url:i,body:e,hostType:"write",callback:n})},partialUpdateObjects:function(e,t){var r=n(1),i="Usage: index.partialUpdateObjects(arrayOfObjects[, callback])";if(!r(e))throw new Error(i);for(var o=this,s={requests:[]},a=0;a<e.length;++a){var l={action:"partialUpdateObject",objectID:e[a].objectID,body:e[a]};s.requests.push(l)}return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(o.indexName)+"/batch",body:s,hostType:"write",callback:t})},saveObject:function(e,t){var n=this;return this.as._jsonRequest({method:"PUT",url:"/1/indexes/"+encodeURIComponent(n.indexName)+"/"+encodeURIComponent(e.objectID),body:e,hostType:"write",callback:t})},saveObjects:function(e,t){var r=n(1),i="Usage: index.saveObjects(arrayOfObjects[, callback])";if(!r(e))throw new Error(i);for(var o=this,s={requests:[]},a=0;a<e.length;++a){var l={action:"updateObject",objectID:e[a].objectID,body:e[a]};s.requests.push(l)}return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(o.indexName)+"/batch",body:s,hostType:"write",callback:t})},deleteObject:function(e,t){if("function"==typeof e||"string"!=typeof e&&"number"!=typeof e){var n=new d.AlgoliaSearchError("Cannot delete an object without an objectID");return t=e,"function"==typeof t?t(n):this.as._promise.reject(n)}var r=this;return this.as._jsonRequest({method:"DELETE",url:"/1/indexes/"+encodeURIComponent(r.indexName)+"/"+encodeURIComponent(e),hostType:"write",callback:t})},deleteObjects:function(e,t){var r=n(1),i=n(7),o="Usage: index.deleteObjects(arrayOfObjectIDs[, callback])";if(!r(e))throw new Error(o);var s=this,a={requests:i(e,function(e){return{action:"deleteObject",objectID:e,body:{objectID:e}}})};return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(s.indexName)+"/batch",body:a,hostType:"write",callback:t})},deleteByQuery:function(e,t,r){function i(e){if(0===e.nbHits)return e;var t=d(e.hits,function(e){return e.objectID});return p.deleteObjects(t).then(o).then(s)}function o(e){return p.waitTask(e.taskID)}function s(){return p.deleteByQuery(e,t)}function l(){a(function(){r(null)},f._setTimeout||setTimeout)}function u(e){a(function(){r(e)},f._setTimeout||setTimeout)}var c=n(34),d=n(7),p=this,f=p.as;1===arguments.length||"function"==typeof t?(r=t,t={}):t=c(t),t.attributesToRetrieve="objectID",t.hitsPerPage=1e3,t.distinct=!1,this.clearCache();var h=this.search(e,t).then(i);return r?void h.then(l,u):h},search:c("query"),similarSearch:c("similarQuery"),browse:function(e,t,r){var i,o,s=n(35),a=this;0===arguments.length||1===arguments.length&&"function"==typeof arguments[0]?(i=0,r=arguments[0],e=void 0):"number"==typeof arguments[0]?(i=arguments[0],"number"==typeof arguments[1]?o=arguments[1]:"function"==typeof arguments[1]&&(r=arguments[1],o=void 0),e=void 0,t=void 0):"object"==typeof arguments[0]?("function"==typeof arguments[1]&&(r=arguments[1]),t=arguments[0],e=void 0):"string"==typeof arguments[0]&&"function"==typeof arguments[1]&&(r=arguments[1],t=void 0),t=s({},t||{},{page:i,hitsPerPage:o,query:e});var l=this.as._getSearchParams(t,"");return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/browse?"+l,hostType:"read",callback:r})},browseFrom:function(e,t){return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/browse?cursor="+encodeURIComponent(e),hostType:"read",callback:t})},browseAll:function(e,t){function r(e){if(!a._stopped){var t;t=void 0!==e?"cursor="+encodeURIComponent(e):c,l._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(u.indexName)+"/browse?"+t,hostType:"read",callback:i})}}function i(e,t){return a._stopped?void 0:e?void a._error(e):(a._result(t),void 0===t.cursor?void a._end():void r(t.cursor))}"object"==typeof e&&(t=e,e=void 0);var o=n(35),s=n(40),a=new s,l=this.as,u=this,c=l._getSearchParams(o({},t||{},{query:e}),"");return r(),a},ttAdapter:function(e){var t=this;return function(n,r,i){var o;o="function"==typeof i?i:r,t.search(n,e,function(e,t){return e?void o(e):void o(t.hits)})}},waitTask:function(e,t){function n(){return c._jsonRequest({method:"GET",hostType:"read",url:"/1/indexes/"+encodeURIComponent(u.indexName)+"/task/"+e}).then(function(e){l++;var t=o*l*l;return t>s&&(t=s),"published"!==e.status?c._promise.delay(t).then(n):e})}function r(e){a(function(){t(null,e)},c._setTimeout||setTimeout)}function i(e){a(function(){t(e)},c._setTimeout||setTimeout)}var o=100,s=5e3,l=0,u=this,c=u.as,d=n();return t?void d.then(r,i):d},clearIndex:function(e){var t=this;return this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(t.indexName)+"/clear",hostType:"write",callback:e})},getSettings:function(e){var t=this;return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(t.indexName)+"/settings",hostType:"read",callback:e})},setSettings:function(e,t){var n=this;return this.as._jsonRequest({method:"PUT",url:"/1/indexes/"+encodeURIComponent(n.indexName)+"/settings",hostType:"write",body:e,callback:t})},listUserKeys:function(e){var t=this;return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(t.indexName)+"/keys",hostType:"read",callback:e})},getUserKeyACL:function(e,t){var n=this;return this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(n.indexName)+"/keys/"+e,hostType:"read",callback:t})},deleteUserKey:function(e,t){var n=this;return this.as._jsonRequest({method:"DELETE",url:"/1/indexes/"+encodeURIComponent(n.indexName)+"/keys/"+e,hostType:"write",callback:t})},addUserKey:function(e,t,r){var i=n(1),o="Usage: index.addUserKey(arrayOfAcls[, params, callback])";if(!i(e))throw new Error(o);(1===arguments.length||"function"==typeof t)&&(r=t,t=null);var s={acl:e};return t&&(s.validity=t.validity,s.maxQueriesPerIPPerHour=t.maxQueriesPerIPPerHour,s.maxHitsPerQuery=t.maxHitsPerQuery,s.description=t.description,t.queryParameters&&(s.queryParameters=this.as._getSearchParams(t.queryParameters,"")),s.referers=t.referers),this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/keys",body:s,hostType:"write",callback:r})},addUserKeyWithValidity:l(function(e,t,n){return this.addUserKey(e,t,n)},s("index.addUserKeyWithValidity()","index.addUserKey()")),updateUserKey:function(e,t,r,i){var o=n(1),s="Usage: index.updateUserKey(key, arrayOfAcls[, params, callback])";if(!o(t))throw new Error(s);(2===arguments.length||"function"==typeof r)&&(i=r,r=null);var a={acl:t
	};return r&&(a.validity=r.validity,a.maxQueriesPerIPPerHour=r.maxQueriesPerIPPerHour,a.maxHitsPerQuery=r.maxHitsPerQuery,a.description=r.description,r.queryParameters&&(a.queryParameters=this.as._getSearchParams(r.queryParameters,"")),a.referers=r.referers),this.as._jsonRequest({method:"PUT",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/keys/"+e,body:a,hostType:"write",callback:i})},_search:function(e,t){return this.as._jsonRequest({cache:this.cache,method:"POST",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/query",body:{params:e},hostType:"read",fallback:{method:"GET",url:"/1/indexes/"+encodeURIComponent(this.indexName),body:{params:e}},callback:t})},as:null,indexName:null,typeAheadArgs:null,typeAheadValueOption:null}},function(e,t,n){"use strict";function r(){}e.exports=r;var i=n(13),o=n(49).EventEmitter;i(r,o),r.prototype.stop=function(){this._stopped=!0,this._clean()},r.prototype._end=function(){this.emit("end"),this._clean()},r.prototype._error=function(e){this.emit("error",e),this._clean()},r.prototype._result=function(e){this.emit("result",e)},r.prototype._clean=function(){this.removeAllListeners("stop"),this.removeAllListeners("end"),this.removeAllListeners("error"),this.removeAllListeners("result")}},function(e,t,n){"use strict";function r(e,t,o){var s=n(80),a=n(42);return o=s(o||{}),void 0===o.protocol&&(o.protocol=a()),o._ua=o._ua||r.ua,new i(e,t,o)}function i(){a.apply(this,arguments)}e.exports=r;var o=n(13),s=window.Promise||n(48).Promise,a=n(39),l=n(12),u=n(43),c=n(44);"development"==={NODE_ENV:"production"}.APP_ENV&&n(10).enable("algoliasearch*"),r.version=n(45),r.ua="Algolia for vanilla JavaScript "+r.version,window.__algolia={debug:n(10),algoliasearch:r};var d={hasXMLHttpRequest:"XMLHttpRequest"in window,hasXDomainRequest:"XDomainRequest"in window,cors:"withCredentials"in new XMLHttpRequest,timeout:"timeout"in new XMLHttpRequest};o(i,a),i.prototype._request=function(e,t){return new s(function(n,r){function i(){if(!c){d.timeout||clearTimeout(a);var e;try{e={body:JSON.parse(f.responseText),responseText:f.responseText,statusCode:f.status,headers:f.getAllResponseHeaders&&f.getAllResponseHeaders()||{}}}catch(t){e=new l.UnparsableJSON({more:f.responseText})}e instanceof l.UnparsableJSON?r(e):n(e)}}function o(e){c||(d.timeout||clearTimeout(a),r(new l.Network({more:e})))}function s(){d.timeout||(c=!0,f.abort()),r(new l.RequestTimeout)}if(!d.cors&&!d.hasXDomainRequest)return void r(new l.Network("CORS not supported"));e=u(e,t.headers);var a,c,p=t.body,f=d.cors?new XMLHttpRequest:new XDomainRequest;f instanceof XMLHttpRequest?f.open(t.method,e,!0):f.open(t.method,e),d.cors&&(p&&("POST"===t.method?f.setRequestHeader("content-type","application/x-www-form-urlencoded"):f.setRequestHeader("content-type","application/json")),f.setRequestHeader("accept","application/json")),f.onprogress=function(){},f.onload=i,f.onerror=o,d.timeout?(f.timeout=t.timeout,f.ontimeout=s):a=setTimeout(s,t.timeout),f.send(p)})},i.prototype._request.fallback=function(e,t){return e=u(e,t.headers),new s(function(n,r){c(e,t,function(e,t){return e?void r(e):void n(t)})})},i.prototype._promise={reject:function(e){return s.reject(e)},resolve:function(e){return s.resolve(e)},delay:function(e){return new s(function(t){setTimeout(t,e)})}}},function(e,t){"use strict";function n(){var e=window.document.location.protocol;return"http:"!==e&&"https:"!==e&&(e="http:"),e}e.exports=n},function(e,t,n){"use strict";function r(e,t){return e+=/\?/.test(e)?"&":"?",e+i.encode(t)}e.exports=r;var i=n(90)},function(e,t,n){"use strict";function r(e,t,n){function r(){t.debug("JSONP: success"),v||d||(v=!0,c||(t.debug("JSONP: Fail. Script loaded but did not call the callback"),a(),n(new i.JSONPScriptFail)))}function s(){("loaded"===this.readyState||"complete"===this.readyState)&&r()}function a(){clearTimeout(_),f.onload=null,f.onreadystatechange=null,f.onerror=null,p.removeChild(f);try{delete window[h],delete window[h+"_loaded"]}catch(e){window[h]=null,window[h+"_loaded"]=null}}function l(){t.debug("JSONP: Script timeout"),d=!0,a(),n(new i.RequestTimeout)}function u(){t.debug("JSONP: Script error"),v||d||(a(),n(new i.JSONPScriptError))}if("GET"!==t.method)return void n(new Error("Method "+t.method+" "+e+" is not supported by JSONP."));t.debug("JSONP: start");var c=!1,d=!1;o+=1;var p=document.getElementsByTagName("head")[0],f=document.createElement("script"),h="algoliaJSONP_"+o,v=!1;window[h]=function(e){try{delete window[h]}catch(t){window[h]=void 0}d||(c=!0,a(),n(null,{body:e}))},e+="&callback="+h,t.jsonBody&&t.jsonBody.params&&(e+="&"+t.jsonBody.params);var _=setTimeout(l,t.timeout);f.onreadystatechange=s,f.onload=r,f.onerror=u,f.async=!0,f.defer=!0,f.src=e,p.appendChild(f)}e.exports=r;var i=n(12),o=0},function(e,t){"use strict";e.exports="3.11.0"},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(41),o=r(i),s=n(37);t["default"]={mixins:[s.DropdownSearch],data:function(){return{searchValue:null,indices:{}}},props:{algoliaAppId:{type:String,required:!0},algoliaApiKey:{type:String,required:!0},algoliaIndices:{type:Array,required:!0},algoliaQueryOptions:{type:Object,"default":function(){return{hitsPerPage:5}}},algoliaTransformHit:{type:Function,"default":function(){return function(e){return e}}}},methods:{indiceHits:function(e){var t=this.results.find(function(t){return t.indice.name===e});return t?t.hits:[]},search:function(e){var t=this;this.results=[],e&&this.algoliaIndices.forEach(function(n){var r=t.algoliaQueryOptions;void 0!==n.queryOptions&&(r=n.queryOptions),t.indices[n.name].search(e,r).then(function(e){var r=t.algoliaTransformHit;void 0!==n.transformHit&&(r=n.transformHit),t.results.push({indice:n,hits:e.hits.map(r)})})})}},compiled:function(){var e=this;this.client=(0,o["default"])(this.algoliaAppId,this.algoliaApiKey),this.algoliaIndices.forEach(function(t){e.indices[t.name]=e.client.initIndex(t.name)})},watch:{searchValue:"search"}}},function(e,t,n){function r(){return t.colors[c++%t.colors.length]}function i(e){function n(){}function i(){var e=i,n=+new Date,o=n-(u||n);e.diff=o,e.prev=u,e.curr=n,u=n,null==e.useColors&&(e.useColors=t.useColors()),null==e.color&&e.useColors&&(e.color=r());var s=Array.prototype.slice.call(arguments);s[0]=t.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(n,r){if("%%"===n)return n;a++;var i=t.formatters[r];if("function"==typeof i){var o=s[a];n=i.call(e,o),s.splice(a,1),a--}return n}),"function"==typeof t.formatArgs&&(s=t.formatArgs.apply(e,s));var l=i.log||t.log||console.log.bind(console);l.apply(e,s)}n.enabled=!1,i.enabled=!0;var o=t.enabled(e)?i:n;return o.namespace=e,o}function o(e){t.save(e);for(var n=(e||"").split(/[\s,]+/),r=n.length,i=0;r>i;i++)n[i]&&(e=n[i].replace(/\*/g,".*?"),"-"===e[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))}function s(){t.enable("")}function a(e){var n,r;for(n=0,r=t.skips.length;r>n;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;r>n;n++)if(t.names[n].test(e))return!0;return!1}function l(e){return e instanceof Error?e.stack||e.message:e}t=e.exports=i,t.coerce=l,t.disable=s,t.enable=o,t.enabled=a,t.humanize=n(38),t.names=[],t.skips=[],t.formatters={};var u,c=0},function(e,t,n){var r;(function(e,i,o){/*!
		 * @overview es6-promise - a tiny implementation of Promises/A+.
		 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
		 * @license   Licensed under MIT license
		 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
		 * @version   3.0.2
		 */
	(function(){"use strict";function s(e){return"function"==typeof e||"object"==typeof e&&null!==e}function a(e){return"function"==typeof e}function l(e){return"object"==typeof e&&null!==e}function u(e){W=e}function c(e){J=e}function d(){return function(){e.nextTick(_)}}function p(){return function(){H(_)}}function f(){var e=0,t=new ee(_),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function h(){var e=new MessageChannel;return e.port1.onmessage=_,function(){e.port2.postMessage(0)}}function v(){return function(){setTimeout(_,1)}}function _(){for(var e=0;Q>e;e+=2){var t=re[e],n=re[e+1];t(n),re[e]=void 0,re[e+1]=void 0}Q=0}function m(){try{var e=n(94);return H=e.runOnLoop||e.runOnContext,p()}catch(t){return v()}}function b(){}function g(){return new TypeError("You cannot resolve a promise with itself")}function y(){return new TypeError("A promises callback cannot return that same promise.")}function x(e){try{return e.then}catch(t){return ae.error=t,ae}}function w(e,t,n,r){try{e.call(t,n,r)}catch(i){return i}}function E(e,t,n){J(function(e){var r=!1,i=w(n,t,function(n){r||(r=!0,t!==n?k(e,n):O(e,n))},function(t){r||(r=!0,A(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&i&&(r=!0,A(e,i))},e)}function T(e,t){t._state===oe?O(e,t._result):t._state===se?A(e,t._result):R(t,void 0,function(t){k(e,t)},function(t){A(e,t)})}function S(e,t){if(t.constructor===e.constructor)T(e,t);else{var n=x(t);n===ae?A(e,ae.error):void 0===n?O(e,t):a(n)?E(e,t,n):O(e,t)}}function k(e,t){e===t?A(e,g()):s(t)?S(e,t):O(e,t)}function C(e){e._onerror&&e._onerror(e._result),j(e)}function O(e,t){e._state===ie&&(e._result=t,e._state=oe,0!==e._subscribers.length&&J(j,e))}function A(e,t){e._state===ie&&(e._state=se,e._result=t,J(C,e))}function R(e,t,n,r){var i=e._subscribers,o=i.length;e._onerror=null,i[o]=t,i[o+oe]=n,i[o+se]=r,0===o&&e._state&&J(j,e)}function j(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,i,o=e._result,s=0;s<t.length;s+=3)r=t[s],i=t[s+n],r?D(n,r,i,o):i(o);e._subscribers.length=0}}function I(){this.error=null}function N(e,t){try{return e(t)}catch(n){return le.error=n,le}}function D(e,t,n,r){var i,o,s,l,u=a(n);if(u){if(i=N(n,r),i===le?(l=!0,o=i.error,i=null):s=!0,t===i)return void A(t,y())}else i=r,s=!0;t._state!==ie||(u&&s?k(t,i):l?A(t,o):e===oe?O(t,i):e===se&&A(t,i))}function L(e,t){try{t(function(t){k(e,t)},function(t){A(e,t)})}catch(n){A(e,n)}}function M(e,t){var n=this;n._instanceConstructor=e,n.promise=new e(b),n._validateInput(t)?(n._input=t,n.length=t.length,n._remaining=t.length,n._init(),0===n.length?O(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&O(n.promise,n._result))):A(n.promise,n._validationError())}function K(e){return new ue(this,e).promise}function P(e){function t(e){k(i,e)}function n(e){A(i,e)}var r=this,i=new r(b);if(!X(e))return A(i,new TypeError("You must pass an array to race.")),i;for(var o=e.length,s=0;i._state===ie&&o>s;s++)R(r.resolve(e[s]),void 0,t,n);return i}function $(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(b);return k(n,e),n}function B(e){var t=this,n=new t(b);return A(n,e),n}function U(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function z(e){this._id=he++,this._state=void 0,this._result=void 0,this._subscribers=[],b!==e&&(a(e)||U(),this instanceof z||q(),L(this,e))}function V(){var e;if("undefined"!=typeof i)e=i;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(e.Promise=ve)}var F;F=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var H,W,G,X=F,Q=0,J=({}.toString,function(e,t){re[Q]=e,re[Q+1]=t,Q+=2,2===Q&&(W?W(_):G())}),Y="undefined"!=typeof window?window:void 0,Z=Y||{},ee=Z.MutationObserver||Z.WebKitMutationObserver,te="undefined"!=typeof e&&"[object process]"==={}.toString.call(e),ne="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,re=new Array(1e3);G=te?d():ee?f():ne?h():void 0===Y?m():v();var ie=void 0,oe=1,se=2,ae=new I,le=new I;M.prototype._validateInput=function(e){return X(e)},M.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},M.prototype._init=function(){this._result=new Array(this.length)};var ue=M;M.prototype._enumerate=function(){for(var e=this,t=e.length,n=e.promise,r=e._input,i=0;n._state===ie&&t>i;i++)e._eachEntry(r[i],i)},M.prototype._eachEntry=function(e,t){var n=this,r=n._instanceConstructor;l(e)?e.constructor===r&&e._state!==ie?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(r.resolve(e),t):(n._remaining--,n._result[t]=e)},M.prototype._settledAt=function(e,t,n){var r=this,i=r.promise;i._state===ie&&(r._remaining--,e===se?A(i,n):r._result[t]=n),0===r._remaining&&O(i,r._result)},M.prototype._willSettleAt=function(e,t){var n=this;R(e,void 0,function(e){n._settledAt(oe,t,e)},function(e){n._settledAt(se,t,e)})};var ce=K,de=P,pe=$,fe=B,he=0,ve=z;z.all=ce,z.race=de,z.resolve=pe,z.reject=fe,z._setScheduler=u,z._setAsap=c,z._asap=J,z.prototype={constructor:z,then:function(e,t){var n=this,r=n._state;if(r===oe&&!e||r===se&&!t)return this;var i=new this.constructor(b),o=n._result;if(r){var s=arguments[r-1];J(function(){D(r,i,s,o)})}else R(n,i,e,t);return i},"catch":function(e){return this.then(null,e)}};var _e=V,me={Promise:ve,polyfill:_e};n(92).amd?(r=function(){return me}.call(t,n,t,o),!(void 0!==r&&(o.exports=r))):"undefined"!=typeof o&&o.exports?o.exports=me:"undefined"!=typeof this&&(this.ES6Promise=me),_e()}).call(this)}).call(t,n(87),function(){return this}(),n(93)(e))},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function i(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!i(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,i,a,l,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(o(n))for(a=Array.prototype.slice.call(arguments,1),u=n.slice(),i=u.length,l=0;i>l;l++)u[l].apply(this,a);return!0},n.prototype.addListener=function(e,t){var i;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(i=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,i,s,a;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){i=a;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t){function n(e){var t=e?e.length:0;return t?e[t-1]:void 0}e.exports=n},function(e,t){function n(e,t){if("function"!=typeof e)throw new TypeError(r);return t=i(void 0===t?e.length-1:+t||0,0),function(){for(var n=arguments,r=-1,o=i(n.length-t,0),s=Array(o);++r<o;)s[r]=n[t+r];switch(t){case 0:return e.call(this,s);case 1:return e.call(this,n[0],s);case 2:return e.call(this,n[0],n[1],s)}var a=Array(t+1);for(r=-1;++r<t;)a[r]=n[r];return a[t]=s,e.apply(this,a)}}var r="Expected a function",i=Math.max;e.exports=n},function(e,t){function n(e,t){for(var n=-1,r=e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}e.exports=n},function(e,t){function n(e,t){for(var n=-1,r=e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}e.exports=n},function(e,t,n){function r(e,t){return null==t?e:i(t,o(t),e)}var i=n(21),o=n(9);e.exports=r},function(e,t,n){function r(e,t,n){var r=typeof e;return"function"==r?void 0===t?e:s(e,t,n):null==e?a:"object"==r?i(e):void 0===t?l(e):o(e,t)}var i=n(60),o=n(61),s=n(8),a=n(36),l=n(86);e.exports=r},function(e,t,n){function r(e,t){return i(e,t,o)}var i=n(23),o=n(17);e.exports=r},function(e,t,n){function r(e,t,n,r,p,v,_){var m=a(e),b=a(t),g=c,y=c;m||(g=h.call(e),g==u?g=d:g!=d&&(m=l(e))),b||(y=h.call(t),y==u?y=d:y!=d&&(b=l(t)));var x=g==d,w=y==d,E=g==y;if(E&&!m&&!x)return o(e,t,g);if(!p){var T=x&&f.call(e,"__wrapped__"),S=w&&f.call(t,"__wrapped__");if(T||S)return n(T?e.value():e,S?t.value():t,r,p,v,_)}if(!E)return!1;v||(v=[]),_||(_=[]);for(var k=v.length;k--;)if(v[k]==e)return _[k]==t;v.push(e),_.push(t);var C=(m?i:s)(e,t,n,r,p,v,_);return v.pop(),_.pop(),C}var i=n(72),o=n(73),s=n(74),a=n(1),l=n(16),u="[object Arguments]",c="[object Array]",d="[object Object]",p=Object.prototype,f=p.hasOwnProperty,h=p.toString;e.exports=r},function(e,t,n){function r(e,t,n){var r=t.length,s=r,a=!n;if(null==e)return!s;for(e=o(e);r--;){var l=t[r];if(a&&l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++r<s;){l=t[r];var u=l[0],c=e[u],d=l[1];if(a&&l[2]){if(void 0===c&&!(u in e))return!1}else{var p=n?n(c,d,u):void 0;if(!(void 0===p?i(d,c,n,!0):p))return!1}}return!0}var i=n(26),o=n(3);e.exports=r},function(e,t,n){function r(e,t){var n=-1,r=o(e)?Array(e.length):[];return i(e,function(e,i,o){r[++n]=t(e,i,o)}),r}var i=n(22),o=n(5);e.exports=r},function(e,t,n){function r(e){var t=o(e);if(1==t.length&&t[0][2]){var n=t[0][0],r=t[0][1];return function(e){return null==e?!1:e[n]===r&&(void 0!==r||n in s(e))}}return function(e){return i(e,t)}}var i=n(58),o=n(75),s=n(3);e.exports=r},function(e,t,n){function r(e,t){var n=a(e),r=l(e)&&u(t),f=e+"";return e=p(e),function(a){if(null==a)return!1;var l=f;if(a=d(a),(n||!r)&&!(l in a)){if(a=1==e.length?a:i(a,s(e,0,-1)),null==a)return!1;l=c(e),a=d(a)}return a[l]===t?void 0!==t||l in a:o(t,a[l],void 0,!0)}}var i=n(25),o=n(26),s=n(65),a=n(1),l=n(31),u=n(32),c=n(50),d=n(3),p=n(33);e.exports=r},function(e,t,n){function r(e,t,n,p,f){if(!l(e))return e;var h=a(t)&&(s(t)||c(t)),v=h?void 0:d(t);return i(v||t,function(i,s){if(v&&(s=i,i=t[s]),u(i))p||(p=[]),f||(f=[]),o(e,t,s,r,n,p,f);else{var a=e[s],l=n?n(a,i,s,e,t):void 0,c=void 0===l;c&&(l=i),void 0===l&&(!h||s in e)||!c&&(l===l?l===a:a!==a)||(e[s]=l)}}),e}var i=n(14),o=n(63),s=n(1),a=n(5),l=n(2),u=n(4),c=n(16),d=n(9);e.exports=r},function(e,t,n){function r(e,t,n,r,d,p,f){for(var h=p.length,v=t[n];h--;)if(p[h]==v)return void(e[n]=f[h]);var _=e[n],m=d?d(_,v,n,e,t):void 0,b=void 0===m;b&&(m=v,a(v)&&(s(v)||u(v))?m=s(_)?_:a(_)?i(_):[]:l(v)||o(v)?m=o(_)?c(_):l(_)?_:{}:b=!1),p.push(v),f.push(m),b?e[n]=r(m,v,d,p,f):(m===m?m!==_:_===_)&&(e[n]=m)}var i=n(19),o=n(11),s=n(1),a=n(5),l=n(83),u=n(16),c=n(84);e.exports=r},function(e,t,n){function r(e){var t=e+"";return e=o(e),function(n){return i(n,e,t)}}var i=n(25),o=n(33);e.exports=r},function(e,t){function n(e,t,n){var r=-1,i=e.length;t=null==t?0:+t||0,0>t&&(t=-t>i?0:i+t),n=void 0===n||n>i?i:+n||0,0>n&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var o=Array(i);++r<i;)o[r]=e[r+t];return o}e.exports=n},function(e,t){function n(e){return null==e?"":e+""}e.exports=n},function(e,t){(function(t){function n(e){var t=new r(e.byteLength),n=new i(t);return n.set(new i(e)),t}var r=t.ArrayBuffer,i=t.Uint8Array;e.exports=n}).call(t,function(){return this}())},function(e,t,n){function r(e){return s(function(t,n){var r=-1,s=null==t?0:n.length,a=s>2?n[s-2]:void 0,l=s>2?n[2]:void 0,u=s>1?n[s-1]:void 0;for("function"==typeof a?(a=i(a,u,5),s-=2):(a="function"==typeof u?u:void 0,s-=a?1:0),l&&o(n[0],n[1],l)&&(a=3>s?void 0:a,s=1);++r<s;){var c=n[r];c&&e(t,c,a)}return t})}var i=n(8),o=n(30),s=n(51);e.exports=r},function(e,t,n){function r(e,t){return function(n,r){var a=n?i(n):0;if(!o(a))return e(n,r);for(var l=t?a:-1,u=s(n);(t?l--:++l<a)&&r(u[l],l,u)!==!1;);return n}}var i=n(28),o=n(6),s=n(3);e.exports=r},function(e,t,n){function r(e){return function(t,n,r){for(var o=i(t),s=r(t),a=s.length,l=e?a:-1;e?l--:++l<a;){var u=s[l];if(n(o[u],u,o)===!1)break}return t}}var i=n(3);e.exports=r},function(e,t,n){function r(e,t){return function(n,r,s){return"function"==typeof r&&void 0===s&&o(n)?e(n,r):t(n,i(r,s,3))}}var i=n(8),o=n(1);e.exports=r},function(e,t,n){function r(e,t,n,r,o,s,a){var l=-1,u=e.length,c=t.length;if(u!=c&&!(o&&c>u))return!1;for(;++l<u;){var d=e[l],p=t[l],f=r?r(o?p:d,o?d:p,l):void 0;if(void 0!==f){if(f)continue;return!1}if(o){if(!i(t,function(e){return d===e||n(d,e,r,o,s,a)}))return!1}else if(d!==p&&!n(d,p,r,o,s,a))return!1}return!0}var i=n(53);e.exports=r},function(e,t){function n(e,t,n){switch(n){case r:case i:return+e==+t;case o:return e.name==t.name&&e.message==t.message;case s:return e!=+e?t!=+t:e==+t;case a:case l:return e==t+""}return!1}var r="[object Boolean]",i="[object Date]",o="[object Error]",s="[object Number]",a="[object RegExp]",l="[object String]";e.exports=n},function(e,t,n){function r(e,t,n,r,o,a,l){var u=i(e),c=u.length,d=i(t),p=d.length;if(c!=p&&!o)return!1;for(var f=c;f--;){var h=u[f];if(!(o?h in t:s.call(t,h)))return!1}for(var v=o;++f<c;){h=u[f];var _=e[h],m=t[h],b=r?r(o?m:_,o?_:m,h):void 0;if(!(void 0===b?n(_,m,r,o,a,l):b))return!1;v||(v="constructor"==h)}if(!v){var g=e.constructor,y=t.constructor;if(g!=y&&"constructor"in e&&"constructor"in t&&!("function"==typeof g&&g instanceof g&&"function"==typeof y&&y instanceof y))return!1}return!0}var i=n(9),o=Object.prototype,s=o.hasOwnProperty;e.exports=r},function(e,t,n){function r(e){for(var t=o(e),n=t.length;n--;)t[n][2]=i(t[n][1]);return t}var i=n(32),o=n(85);e.exports=r},function(e,t){function n(e){var t=e.length,n=new e.constructor(t);return t&&"string"==typeof e[0]&&i.call(e,"index")&&(n.index=e.index,n.input=e.input),n}var r=Object.prototype,i=r.hasOwnProperty;e.exports=n},function(e,t,n){function r(e,t,n){var r=e.constructor;switch(t){case c:return i(e);case o:case s:return new r(+e);case d:case p:case f:case h:case v:case _:case m:case b:case g:var x=e.buffer;return new r(n?i(x):x,e.byteOffset,e.length);case a:case u:return new r(e);case l:var w=new r(e.source,y.exec(e));w.lastIndex=e.lastIndex}return w}var i=n(67),o="[object Boolean]",s="[object Date]",a="[object Number]",l="[object RegExp]",u="[object String]",c="[object ArrayBuffer]",d="[object Float32Array]",p="[object Float64Array]",f="[object Int8Array]",h="[object Int16Array]",v="[object Int32Array]",_="[object Uint8Array]",m="[object Uint8ClampedArray]",b="[object Uint16Array]",g="[object Uint32Array]",y=/\w*$/;e.exports=r},function(e,t){function n(e){var t=e.constructor;return"function"==typeof t&&t instanceof t||(t=Object),new t}e.exports=n},function(e,t,n){function r(e){for(var t=l(e),n=t.length,r=n&&e.length,u=!!r&&a(r)&&(o(e)||i(e)),d=-1,p=[];++d<n;){var f=t[d];(u&&s(f,r)||c.call(e,f))&&p.push(f)}return p}var i=n(11),o=n(1),s=n(15),a=n(6),l=n(17),u=Object.prototype,c=u.hasOwnProperty;e.exports=r},function(e,t,n){function r(e,t,n){return"function"==typeof t?i(e,!0,o(t,n,3)):i(e,!0)}var i=n(20),o=n(8);e.exports=r},function(e,t,n){function r(e){return i(e)&&a.call(e)==o}var i=n(2),o="[object Function]",s=Object.prototype,a=s.toString;e.exports=r},function(e,t,n){function r(e){return null==e?!1:i(e)?c.test(l.call(e)):o(e)&&s.test(e)}var i=n(81),o=n(4),s=/^\[object .+?Constructor\]$/,a=Object.prototype,l=Function.prototype.toString,u=a.hasOwnProperty,c=RegExp("^"+l.call(u).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=r},function(e,t,n){function r(e){var t;if(!s(e)||c.call(e)!=a||o(e)||!u.call(e,"constructor")&&(t=e.constructor,"function"==typeof t&&!(t instanceof t)))return!1;var n;return i(e,function(e,t){n=t}),void 0===n||u.call(e,n)}var i=n(56),o=n(11),s=n(4),a="[object Object]",l=Object.prototype,u=l.hasOwnProperty,c=l.toString;e.exports=r},function(e,t,n){function r(e){return i(e,o(e))}var i=n(21),o=n(17);e.exports=r},function(e,t,n){function r(e){e=o(e);for(var t=-1,n=i(e),r=n.length,s=Array(r);++t<r;){var a=n[t];s[t]=[a,e[a]]}return s}var i=n(9),o=n(3);e.exports=r},function(e,t,n){function r(e){return s(e)?i(e):o(e)}var i=n(27),o=n(64),s=n(31);e.exports=r},function(e,t){function n(){u=!1,s.length?l=s.concat(l):c=-1,l.length&&r()}function r(){if(!u){var e=setTimeout(n);u=!0;for(var t=l.length;t;){for(s=l,l=[];++c<t;)s&&s[c].run();c=-1,t=l.length}s=null,u=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function o(){}var s,a=e.exports={},l=[],u=!1,c=-1;a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new i(e,t)),1!==l.length||u||setTimeout(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=o,a.addListener=o,a.once=o,a.off=o,a.removeListener=o,a.removeAllListeners=o,a.emit=o,a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},function(e,t){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,r,i){t=t||"&",r=r||"=";var o={};if("string"!=typeof e||0===e.length)return o;var s=/\+/g;e=e.split(t);var a=1e3;i&&"number"==typeof i.maxKeys&&(a=i.maxKeys);var l=e.length;a>0&&l>a&&(l=a);for(var u=0;l>u;++u){var c,d,p,f,h=e[u].replace(s,"%20"),v=h.indexOf(r);v>=0?(c=h.substr(0,v),d=h.substr(v+1)):(c=h,d=""),p=decodeURIComponent(c),f=decodeURIComponent(d),n(o,p)?Array.isArray(o[p])?o[p].push(f):o[p]=[o[p],f]:o[p]=f}return o}},function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,i){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(i){var o=encodeURIComponent(n(i))+r;return Array.isArray(e[i])?e[i].map(function(e){return o+encodeURIComponent(n(e))}).join(t):o+encodeURIComponent(n(e[i]))}).join(t):i?encodeURIComponent(n(i))+r+encodeURIComponent(n(e)):""}},function(e,t,n){"use strict";t.decode=t.parse=n(88),t.encode=t.stringify=n(89)},function(e,t,n){var r,i;r=n(46),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options:e.exports).template=i)},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){}])});

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = "\n\n<!-- Layout -->\n<layout-transition>\n\n\t<!-- Navbar -->\n\t<navbar slot=\"navbar-content\" fixed=\"top\" in-content>\n\n\t\t<a v-if=\"!isPackageView\" v-link=\"appHelpers.routeToPackages()\" slot=\"brand\" class=\"navbar-brand\">ThemeKit Docs</a>\n\t\t\n\t\t<!-- Sidebar Toggle Button -->\n\t\t<sidebar-toggle-button\n\t\t\tv-if=\"isPackageView\"\n\t\t\tslot=\"sidebar-toggle-button\"\n\t\t\tclass=\"toggle pull-left\"\n\t\t\tsidebar-id=\"sidebar\"\n\t\t\ticon=\"fa fa-bars\">\n\t\t</sidebar-toggle-button>\n\n\t\t<tabs-nav nav-id=\"tabs-navbar\"></tabs-nav>\n\n\t\t<div class=\"navbar-form navbar-left\">\n\t\t\t<algolia-search-dropdown\n\t\t\t\t:algolia-app-id=\"appConfig.algolia.appId\"\n\t\t\t\t:algolia-api-key=\"appConfig.algolia.apiKey\"\n\t\t\t\t:algolia-indices=\"algoliaIndices\">\n\t\t\t</algolia-search-dropdown>\n\t\t</div>\n\t\t\n\t</navbar>\n\t<!-- // END Navbar -->\n\n\t<!-- Sidebar -->\n\t<sidebar-transition \n\t\t:show=\"isPackageView\"\n\t\tslot=\"sidebar\"\n\t\tposition=\"left\"\n\t\tsidebar-id=\"sidebar\"\n\t\tsize=\"3\"\n\t\teffect=\"reveal\">\n\n\t\t<a v-link=\"appHelpers.routeToPackages()\" slot=\"brand\" class=\"sidebar-brand\"><i class=\"fa fa-fw fa-chevron-left\"></i> Packages</a>\n\n\t\t<!-- Service Loading -->\n\t\t<p v-if=\"serviceLoading && !appState.pkg\" class=\"sidebar-text\">Loading ...</p>\n\n\t\t<template v-if=\"appState.pkg\">\n\t\t\t<!-- Package menu -->\n\t\t\t<div class=\"sidebar-block bg-white\">\n\t\t\t\t<h4 class=\"sidebar-category\">{{ appState.pkg.packageIdData.packageName }}</h4>\n\t\t\t\t<p><a v-link=\"appHelpers.routeToPackage(packageName, version)\">Package Overview</a></p>\n\t\t\t\t<!-- Versions -->\n\t\t\t\t<div class=\"form-group\" v-if=\"versions.length\">\n\t\t\t\t\t<label for=\"version\">Version</label>\n\t\t\t\t\t<select id=\"version\" class=\"form-control\" v-model=\"selectedVersion\">\n\t\t\t\t\t\t<option v-for=\"v in versions\" value=\"{{ v.version }}\" :selected=\"v.version === version\">{{ v.version }}</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<!-- Sidebar Menus -->\n\t\t\t<sidebar-menu \n\t\t\t\tv-for=\"menu in menus\" \n\t\t\t\t:class=\"menu.class\" \n\t\t\t\t:heading=\"menu.heading\"\n\t\t\t\tv-if=\"menu.children.length\">\n\t\t\t\t\n\t\t\t\t<!-- Sidebar Menu Items -->\n\t\t\t\t<sidebar-collapse-item \n\t\t\t\t\tv-for=\"item in menu.children\" \n\t\t\t\t\t:model=\"item\">\n\t\t\t\t</sidebar-collapse-item>\n\t\t\t\t<!-- // END Sidebar Menu Items -->\n\n\t\t\t</sidebar-menu>\n\t\t\t<!-- // END Sidebar Menus -->\n\n\t\t</template>\n\n\t</sidebar-transition>\n\t<!-- // END Sidebar -->\n\n\t<!-- Content -->\n\t<router-view></router-view>\n\t<!-- // END Content -->\n\n</layout-transition>\n<!-- // END layout -->\n\n";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(207);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);

	var router = new _vueRouter2.default({
		linkActiveClass: 'active'
	});

	router.map({
		'/': {
			name: 'packages',
			component: function component(resolve) {
				__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(208)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
			}
		},
		'/package/:packageName/:version': {
			name: 'package',
			component: function component(resolve) {
				__webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(216)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
			}
		},
		'/package/:packageName/:version/component/:componentName': {
			name: 'component',
			component: function component(resolve) {
				__webpack_require__.e/* require */(3, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(219)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
			}
		},
		'/package/:packageName/:version/page/:pageId': {
			name: 'page',
			component: function component(resolve) {
				__webpack_require__.e/* require */(4, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(235)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
			}
		}
	});

	router.beforeEach(function () {
		window.scrollTo(0, 0);
	});

	router.redirect({
		'*': '/'
	});

	exports.default = router;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.11
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return decodeURIComponent(part);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path) {
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        queryParams = this.parseQueryString(queryString);
	      }

	      path = decodeURI(path);

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  RouteRecognizer.VERSION = '0.1.9';

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn(msg) {
	    /* istanbul ignore next */
	    if (window.console) {
	      console.warn('[vue-router] ' + msg);
	      if (!exports$1.Vue || exports$1.Vue.config.debug) {
	        console.warn(new Error('warning stack trace:').stack);
	      }
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root) {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = decodeURI(location.pathname + location.search);
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    this.router = router;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    Vue.directive('link-active', {
	      priority: 1001,
	      bind: function bind() {
	        this.el.__v_link_active = true;
	      }
	    });

	    Vue.directive('link', {
	      priority: 1000,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check if active classes should be applied to a different element
	        this.activeEl = this.el;
	        var parent = this.el.parentNode;
	        while (parent) {
	          if (parent.__v_link_active) {
	            this.activeEl = parent;
	            break;
	          }
	          parent = parent.parentNode;
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            this.router.go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router._stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router._stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        this.updateClasses(route.path);
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path) {
	        var el = this.activeEl;
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass !== activeClass) {
	          removeClass(el, this.prevActiveClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            addClass(el, activeClass);
	          } else {
	            removeClass(el, activeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            addClass(el, activeClass);
	          } else {
	            removeClass(el, activeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this._stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype._stringifyPath = function _stringifyPath(path) {
	      var fullPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          if (path.query) {
	            params.queryParams = path.query;
	          }
	          fullPath = this._recognizer.generate(path.name, params);
	        } else if (path.path) {
	          fullPath = path.path;
	          if (path.query) {
	            var query = this._recognizer.generateQueryString(path.query);
	            if (fullPath.indexOf('?') > -1) {
	              fullPath += '&' + query.slice(1);
	            } else {
	              fullPath += query;
	            }
	          }
	        }
	      } else {
	        fullPath = path ? path + '' : '';
	      }
	      return encodeURI(fullPath);
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ }
]);
//# sourceMappingURL=main.js.map