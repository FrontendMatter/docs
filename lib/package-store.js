'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _merge = require('mout/object/merge');

var _merge2 = _interopRequireDefault(_merge);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * PackageStore Firebase Service.
 * @extends {EventEmitter}
 */

var PackageStore = function (_EventEmitter) {
	_inherits(PackageStore, _EventEmitter);

	/**
  * Constructor
  */

	function PackageStore(ref) {
		_classCallCheck(this, PackageStore);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PackageStore).call(this));

		if (ref) {
			_this.setRef(ref);
		}

		/**
   * Package components two-way relationship
   */
		_this.on('component.added', function (componentName, data) {
			for (var packageName in data.packages) {
				_this.setPackageComponent(packageName, componentName, true);
			}
		});
		_this.on('component.removed', function (componentName, data) {
			for (var packageName in data.packages) {
				_this.setPackageComponent(packageName, componentName, null);
			}
		});
		return _this;
	}

	/**
  * Set a Firebase reference
  * @param {string} ref The Firebase URL.
  */

	_createClass(PackageStore, [{
		key: 'setRef',
		value: function setRef(ref) {
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
   * Get a Firebase query reference for fetching components.
   * @param  {boolean} sync 	Use the sync index.
   * @return {Firebase}		A Firebase reference.
   */

	}, {
		key: 'getComponentsRef',
		value: function getComponentsRef(sync) {
			var ref = 'components';
			if (sync) {
				ref = 'sync/' + ref;
			}
			return this.ref.child(ref);
		}

		/**
   * Get a Firebase query reference for fetching a component.
   * @param {string} name 	The component name.
   * @param  {boolean} sync 	Use the sync index.
   * @return {Firebase} 		A Firebase reference.
   */

	}, {
		key: 'getComponentRef',
		value: function getComponentRef(name, sync) {
			return this.getComponentsRef(sync).child(name);
		}

		/**
   * Sets data to a Firebase path.
   * @param {string} path 	The path to set.
   * @param {?} data 			The value to set.
   * @return {Promise} 		A Promise.
   */

	}, {
		key: 'set',
		value: function set(path, data) {
			var _this2 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				_this2.getRef(path).set(data, function (e) {
					if (e) {
						reject(e);
						_this2.emit('serviceError', e);
						return;
					}
					resolve();
					_this2.emit('serviceComplete');
				});
			});
		}

		/**
   * Saves package data to Firebase.
   * @param {string} name 	The package name.
   * @param {?} data 			The data (null to remove the package).
   * @return {Promise} 		A Promise.
   */

	}, {
		key: 'setPackage',
		value: function setPackage(name, data) {
			return this.set('packages/' + name, data);
		}

		/**
   * Removes a package from Firebase.
   * @param  {string} name 	The package name.
   * @return {Promise} 		A Promise.
   */

	}, {
		key: 'removePackage',
		value: function removePackage(name) {
			return this.setPackage(name, null);
		}

		/**
   * Saves component data to Firebase.
   * @param {string} name 	The component name.
   * @param {?} data 			The data (null to remove the component).
   * @param {boolean} sync 	Use the sync index.
   * @return {Promise} 		A Promise.
   */

	}, {
		key: 'setComponent',
		value: function setComponent(name, data, sync) {
			var _this3 = this;

			var path = 'components/' + name;
			if (sync) {
				path = 'sync/' + path;
			}
			if (!data) {
				return this.getComponent(name).then(function (_ref) {
					var component = _ref.component;

					return _this3.set(path, data).then(function () {
						_this3.emit('component.removed', name, component);
					});
				});
			}
			return this.set(path, data).then(function () {
				_this3.emit('component.added', name, data);
			});
		}

		/**
   * Removes a component from Firebase.
   * @param  {string} name 	The component name.
   * @param {boolean} sync 	Use the sync index.
   * @return {Promise} 		A Promise.
   */

	}, {
		key: 'removeComponent',
		value: function removeComponent(name, sync) {
			return this.setComponent(name, null, sync);
		}

		/**
   * Package components two-way relationship
   * @param {string} packageName   	The package name.
   * @param {string} componentName 	The component name.
   * @param {boolean|null} data 		The data (boolean or null to remove)
   */

	}, {
		key: 'setPackageComponent',
		value: function setPackageComponent(packageName, componentName, data) {
			return this.set('packages/' + packageName + '/components/' + componentName, data);
		}

		/**
   * Format package Object
   * @param  {Object} packageData The package Object.
   * @return {Object}             The formatted package Object.
   */

	}, {
		key: 'packageFormatter',
		value: function packageFormatter(packageData) {
			var components = Object.keys(packageData.components || {}) || [];
			packageData.components = components;
			return packageData;
		}

		/**
   * Get packages from Firebase.
   * @return {Promise} A Promise which resolves a packages Array.
   */

	}, {
		key: 'getPackages',
		value: function getPackages() {
			var _this4 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				_this4.getRef('packages').once('value', function (snapshot) {
					var packages = snapshot.val();
					var packagesArray = [];
					for (var name in packages) {
						packagesArray.push(_this4.packageFormatter(packages[name]));
					}
					resolve(packagesArray);
					_this4.emit('serviceComplete');
				}, function (e) {
					reject(e);
					_this4.emit('serviceError', e);
				});
			});
		}

		/**
   * Get a package from Firebase.
   * @param {string} packageName 	The package name.
   * @return {Promise} 			A Promise which resolves a package Object.
   */

	}, {
		key: 'getPackage',
		value: function getPackage(packageName) {
			var _this5 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				_this5.getRef('packages/' + packageName).once('value', function (snapshot) {
					resolve(_this5.packageFormatter(snapshot.val()));
					_this5.emit('serviceComplete');
				}, function (e) {
					reject(e);
					_this5.emit('serviceError', e);
				});
			});
		}

		/**
   * Get the components for a package from Firebase.
   * @return {Promise} A Promise which resolves a components Array.
   */

	}, {
		key: 'getPackageComponents',
		value: function getPackageComponents(packageName) {
			var _this6 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				var components = [];
				Promise.all([_this6.syncPackageComponents(packageName), _this6.syncPackageComponents(packageName, true)]).then(function (indexes) {
					indexes.forEach(function (index) {
						index.forEach(function (_ref2) {
							var merge = _ref2.merge;

							var exists = components.find(function (c) {
								return c.name === merge.name;
							});
							if (!exists) {
								components.push(merge);
							}
						});
					});
					resolve(components);
					_this6.emit('serviceComplete');
				}).catch(function (e) {
					reject(e);
					_this6.emit('serviceError', e);
				});
			});
		}

		/**
   * Get a Firebase query reference for fetching a package components.
   * @param  {string} packageName		The package name.
   * @param  {boolean} sync 			Use the sync index.
   * @return {Firebase} 				A Firebase reference.
   */

	}, {
		key: 'getPackageComponentsRef',
		value: function getPackageComponentsRef(packageName, sync) {
			return this.getComponentsRef(sync).orderByChild('packages/' + packageName).startAt(true).endAt(true);
		}

		/**
   * Get package components indexes.
   * @param  {string} packageName The Firebase reference.
   * @param  {boolean} sync 		Use the sync index.
   * @return {Promise} 			A Promise which resolves an Array of indexes for each package component.
   */

	}, {
		key: 'syncPackageComponents',
		value: function syncPackageComponents(packageName, sync) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				_this7.getPackageComponentsRef(packageName, sync).once('value', function (snapshot) {
					var components = snapshot.val();
					var componentsArray = components ? Object.keys(components) : [];
					var syncPackageComponents = componentsArray.map(function (component) {
						return _this7.syncComponentIndex(components[component], !sync);
					});
					resolve(Promise.all(syncPackageComponents));
				}, function (e) {
					reject(e);
				});
			});
		}

		/**
   * Get a component.
   * @param {string} name 	The component name
   * @return {Promise} 		A Promise which resolves a component Object.
   */

	}, {
		key: 'getComponent',
		value: function getComponent(name) {
			return this.syncComponent(name);
		}

		/**
   * Get component indexes.
   * @param  {Firebase} name 	The component name.
   * @return {Promise} 		A Promise which resolves an Array of indexes.
   */

	}, {
		key: 'syncComponent',
		value: function syncComponent(name) {
			var _this8 = this;

			this.emit('serviceLoading');
			return Promise.all([this.getComponentValue(name), this.getComponentValue(name, true)]).then(function (values) {
				return Promise.all(values.map(function (component) {
					return _this8.syncComponentIndex(component.data, !component.sync);
				}));
			}).then(function (indexes) {
				var componentData = null;
				for (var i = 0; i <= indexes.length; i++) {
					if (!indexes[i]) {
						indexes.splice(i, 1);
					}
				}
				indexes.forEach(function (data) {
					componentData = data;
				});
				_this8.emit('serviceComplete');
				return componentData;
			}).catch(function (e) {
				return _this8.emit('serviceError', e);
			});
		}

		/**
   * Get a component data
   * @param  {string} name The component name
   * @param  {boolean} sync Use the 'sync' index
   * @return {Promise}      A Promise which resolves an Object containing the
   * component data and the 'sync' param value
   */

	}, {
		key: 'getComponentValue',
		value: function getComponentValue(name, sync) {
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				_this9.getComponentRef(name, sync).once('value', function (snapshot) {
					resolve({
						data: snapshot.val(),
						sync: sync
					});
					_this9.emit('serviceComplete');
				}, function (e) {
					reject(e);
					_this9.emit('serviceError', e);
				});
			});
		}

		/**
   * Get the 'sync' or 'components' index for a component.
   * @param  {Object} component 	The component.
   * @param  {boolean} sync 		Enable to get the 'sync' index when the component
   * Object comes from the 'components' index
   * @return {Promise} 			A Promise which resolves the index Object.
   */

	}, {
		key: 'syncComponentIndex',
		value: function syncComponentIndex(component, sync) {
			var _this10 = this;

			this.emit('serviceLoading');
			return new Promise(function (resolve, reject) {
				if (!component) {
					return resolve();
				}
				_this10.getComponentRef(component.name, sync).once('value', function (snapshot) {
					if (!snapshot.exists()) {
						_this10.emit('serviceComplete');
						if (sync) {
							return resolve({
								component: component,
								sync: null,
								merge: component
							});
						}
						return resolve({
							component: null,
							sync: component,
							merge: component
						});
					}
					var data = snapshot.val();
					_this10.emit('serviceComplete');
					if (sync) {
						return resolve({
							component: component,
							sync: data,
							merge: (0, _merge2.default)(data, component)
						});
					}
					resolve({
						component: data,
						sync: component,
						merge: (0, _merge2.default)(component, data)
					});
				}, function (e) {
					reject(e);
					_this10.emit('serviceError', e);
				});
			});
		}
	}, {
		key: 'onPackageAdded',
		value: function onPackageAdded(cb, error) {
			var _this11 = this;

			this.getRef('packages').on('child_added', function (snapshot) {
				cb(snapshot.val());
				_this11.emit('serviceComplete');
			}, function (e) {
				if (error) {
					error(e);
				}
				_this11.emit('serviceError', e);
			});
		}
	}, {
		key: 'onPackageRemoved',
		value: function onPackageRemoved(cb, error) {
			var _this12 = this;

			this.getRef('packages').on('child_removed', function (snapshot) {
				cb(snapshot.key());
				_this12.emit('serviceComplete');
			}, function (e) {
				if (error) {
					error(e);
				}
				_this12.emit('serviceError', e);
			});
		}
	}, {
		key: 'onPackageComponentAdded',
		value: function onPackageComponentAdded(packageName, cb, error) {
			var _this13 = this;

			this.getPackageComponentsRef(packageName).on('child_added', function (snapshot) {
				_this13.syncComponentIndex(snapshot.val(), true).then(function (index) {
					cb(index);
				}).catch(function (e) {
					if (error) {
						error(e);
					}
				});
			}, function (e) {
				if (error) {
					error(e);
				}
				_this13.emit('serviceError', e);
			});
			this.getPackageComponentsRef(packageName, true).on('child_added', function (snapshot) {
				_this13.syncComponentIndex(snapshot.val()).then(function (index) {
					cb(index);
				}).catch(function (e) {
					if (error) {
						error(e);
					}
				});
			}, function (e) {
				if (error) {
					error(e);
				}
				_this13.emit('serviceError', e);
			});
		}
	}, {
		key: 'onPackageComponentRemoved',
		value: function onPackageComponentRemoved(packageName, cb, error) {
			var _this14 = this;

			this.getPackageComponentsRef(packageName).on('child_removed', function (snapshot) {
				cb(snapshot.key());
				_this14.emit('serviceComplete');
			}, function (e) {
				if (error) {
					error(e);
				}
				_this14.emit('serviceError', e);
			});
		}
	}, {
		key: 'onComponentUpdate',
		value: function onComponentUpdate(eventType, cb, error) {
			var _this15 = this;

			this.getComponentsRef().on(eventType, function (snapshot) {
				_this15.syncComponentIndex(snapshot.val(), true).then(function (index) {
					cb(index);
				}).catch(function (e) {
					if (error) {
						error(e);
					}
				});
			}, function (e) {
				if (error) {
					error(e);
				}
				_this15.emit('serviceError', e);
			});
			this.getComponentsRef(true).on(eventType, function (snapshot) {
				_this15.syncComponentIndex(snapshot.val()).then(function (index) {
					cb(index);
				}).catch(function (e) {
					if (error) {
						error(e);
					}
				});
			}, function (e) {
				if (error) {
					error(e);
				}
				_this15.emit('serviceError', e);
			});
		}
	}, {
		key: 'onComponentAdded',
		value: function onComponentAdded(cb, error) {
			this.onComponentUpdate('child_added', cb, error);
		}
	}, {
		key: 'onComponentChanged',
		value: function onComponentChanged(cb, error) {
			this.onComponentUpdate('child_changed', cb, error);
		}
	}, {
		key: 'onComponentRemoved',
		value: function onComponentRemoved(cb, error) {
			var _this16 = this;

			this.getComponentsRef().on('child_removed', function (snapshot) {
				cb(snapshot.key());
				_this16.emit('serviceComplete');
			}, function (e) {
				if (error) {
					error(e);
				}
				_this16.emit('serviceError', e);
			});
		}
	}]);

	return PackageStore;
}(_events.EventEmitter);

var store = new PackageStore();
exports.default = store;

module.exports = exports.default;