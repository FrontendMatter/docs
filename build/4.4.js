webpackJsonp([4],{

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(236)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/views/package/page.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(237)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Code/themekit-docs/themekit-docs-app/src/views/package/page.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 236:
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
	// 		<template v-if="page">
	// 			<h1>{{ page.data.title }}</h1>
	// 			<template v-if="page.data.content">
	// 				{{{ page.data.content | marked }}}
	// 			</template>
	// 		</template>
	//
	// 		<template v-if="!page && !serviceLoading && appState.pkg">
	// 			<template v-else>
	// 				<h1>{{ pageId }}</h1>
	// 				<h3>The page was not found.</h3>
	// 			</template>
	// 		</template>
	//
	// 		<div class="alert alert-default" v-if="serviceLoading && !page">Loading data ...</div>
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
		mixins: [_store2.default],
		data: function data() {
			return {
				page: null,
				appState: _app2.default.state
			};
		},

		computed: {
			pageId: function pageId() {
				return this.$route.params.pageId;
			},
			packageName: function packageName() {
				return this.$route.params.packageName;
			},
			version: function version() {
				return this.$route.params.version;
			}
		},
		methods: {
			getPage: function getPage() {
				var _this = this;

				this.page = null;
				this.store.getPackagePage(this.packageName, this.version, this.pageId).then(function (page) {
					return _this.page = page;
				});
			}
		},
		created: function created() {
			this.getPage();
		},

		watch: {
			page: function page(value) {
				if (value) {
					this.appState.page.title = this.page.data.title;
				}
			},

			'packageName': 'getPage',
			'version': 'getPage'
		}
	};
	// </script>

/***/ },

/***/ 237:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"container-fluid docs-container\">\n\t<template v-if=\"page\">\n\t\t<h1>{{ page.data.title }}</h1>\n\t\t<template v-if=\"page.data.content\">\n\t\t\t{{{ page.data.content | marked }}}\n\t\t</template>\n\t</template>\n\n\t<template v-if=\"!page && !serviceLoading && appState.pkg\">\n\t\t<template v-else>\n\t\t\t<h1>{{ pageId }}</h1>\n\t\t\t<h3>The page was not found.</h3>\n\t\t</template>\n\t</template>\n\n\t<div class=\"alert alert-default\" v-if=\"serviceLoading && !page\">Loading data ...</div>\n</div>\n";

/***/ }

});
//# sourceMappingURL=4.4.js.map