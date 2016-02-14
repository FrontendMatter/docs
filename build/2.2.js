webpackJsonp([2],{

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(217)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/package/package.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(218)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Code/themekit-docs/themekit-docs-app/src/views/package/package.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _app = __webpack_require__(20);

	var _app2 = _interopRequireDefault(_app);

	var _store = __webpack_require__(169);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="container-fluid docs-container">
	// 		<template v-if="appState.pkg">
	// 			<h1>{{ appState.pkg.packageIdData.packageName }}</h1>
	// 			<template v-if="appState.pkg.description">
	// 				{{{ appState.pkg.description.data | marked }}}
	// 			</template>
	// 			<template v-if="appState.pkg.readme">
	// 				{{{ appState.pkg.readme.data | marked }}}
	// 			</template>
	// 		</template>
	//
	// 		<template v-if="!appState.pkg && !serviceLoading">
	// 			<template v-else>
	// 				<h1>{{ packageName }}</h1>
	// 				<h3>The package was not found.</h3>
	// 			</template>
	// 		</template>
	//
	// 		<div class="alert alert-default" v-if="serviceLoading && !appState.pkg">Loading data ...</div>
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
		mixins: [_store2.default],
		data: function data() {
			return {
				appState: _app2.default.state
			};
		},

		computed: {
			packageName: function packageName() {
				return this.$route.params.packageName;
			},
			version: function version() {
				return this.$route.params.version;
			}
		},
		methods: {
			updateTitle: function updateTitle() {
				this.appState.page.title = this.packageName + ' (' + this.version + ')';
			}
		},
		created: function created() {
			this.updateTitle();
		},

		watch: {
			'packageName': 'updateTitle',
			'version': 'updateTitle'
		}
	};
	// </script>

/***/ },

/***/ 218:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"container-fluid docs-container\">\n\t<template v-if=\"appState.pkg\">\n\t\t<h1>{{ appState.pkg.packageIdData.packageName }}</h1>\n\t\t<template v-if=\"appState.pkg.description\">\n\t\t\t{{{ appState.pkg.description.data | marked }}}\n\t\t</template>\n\t\t<template v-if=\"appState.pkg.readme\">\n\t\t\t{{{ appState.pkg.readme.data | marked }}}\n\t\t</template>\n\t</template>\n\n\t<template v-if=\"!appState.pkg && !serviceLoading\">\n\t\t<template v-else>\n\t\t\t<h1>{{ packageName }}</h1>\n\t\t\t<h3>The package was not found.</h3>\n\t\t</template>\n\t</template>\n\n\t<div class=\"alert alert-default\" v-if=\"serviceLoading && !appState.pkg\">Loading data ...</div>\n</div>\n";

/***/ }

});
//# sourceMappingURL=2.2.js.map