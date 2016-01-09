'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _merge = require('mout/object/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageDb = function () {
	function PackageDb(ref) {
		_classCallCheck(this, PackageDb);

		this.ref = new _firebase2.default(ref);
		this.packages = this.ref.child('packages');
		this.components = this.ref.child('components');
	}

	_createClass(PackageDb, [{
		key: 'set',
		value: function set(type, name, data) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_this[type].child(name).set(data, function (e) {
					if (e) {
						return reject(e);
					}
					resolve();
				});
			});
		}
	}, {
		key: 'setPackage',
		value: function setPackage(name, data) {
			return this.set('packages', name, data);
		}
	}, {
		key: 'removePackage',
		value: function removePackage(name) {
			return this.setPackage(name, null);
		}
	}, {
		key: 'getComponent',
		value: function getComponent(name, cb, error) {
			var _this2 = this;

			this.components.child(name).once('value', function (snapshot) {
				_this2.onSyncComponent(snapshot.val(), cb, error, true);
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'setComponent',
		value: function setComponent(name, data) {
			return this.set('components', name, data);
		}
	}, {
		key: 'removeComponent',
		value: function removeComponent(name) {
			return this.setComponent(name, null);
		}
	}, {
		key: 'onPackageAdded',
		value: function onPackageAdded(cb, error) {
			var _this3 = this;

			this.packages.on('child_added', function (snapshot) {
				var name = snapshot.key();
				var packageData = snapshot.val();
				packageData.components = [];
				_this3.onPackageComponentAdded(name, function (data) {
					packageData.components.push(data);
				});
				_this3.onPackageComponentRemoved(name, function (name) {
					packageData.components = packageData.components.filter(function (c) {
						return c.name !== name;
					});
				});
				cb(packageData);
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'onPackageRemoved',
		value: function onPackageRemoved(cb, error) {
			this.packages.on('child_removed', function (snapshot) {
				cb(snapshot.key());
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'onPackageNone',
		value: function onPackageNone(cb, error) {
			this.packages.once('value', function (snapshot) {
				if (!snapshot.exists()) {
					cb();
				}
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'onPackageComponentAdded',
		value: function onPackageComponentAdded(packageName, cb, error) {
			var _this4 = this;

			this.components.orderByChild('packages/' + packageName).on('child_added', function (snapshot) {
				_this4.onSyncComponent(snapshot.val(), cb, error, true);
			}, function (e) {
				if (error) {
					error(e);
				}
			});
			this.ref.child('sync/components').orderByChild('packages/' + packageName).on('child_added', function (snapshot) {
				_this4.onSyncComponent(snapshot.val(), cb, error);
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'onSyncComponent',
		value: function onSyncComponent(component, cb, error, sync) {
			var path = 'components/' + component.name;
			if (sync) {
				path = 'sync/' + path;
			}
			this.ref.child(path).once('value', function (snapshot) {
				if (!snapshot.exists()) {
					return cb(component);
				}
				var data = snapshot.val();
				cb((0, _merge2.default)(data, component));
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'onPackageComponentRemoved',
		value: function onPackageComponentRemoved(packageName, cb, error) {
			this.components.orderByChild('packages/' + packageName).on('child_removed', function (snapshot) {
				cb(snapshot.key());
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'onPackageComponentNone',
		value: function onPackageComponentNone(packageName, cb, error) {
			this.components.once('value', function (snapshot) {
				if (!snapshot.exists()) {
					cb();
				}
			}, function (e) {
				if (error) {
					error(e);
				}
			});
		}
	}, {
		key: 'offline',
		value: function offline() {
			_firebase2.default.goOffline();
		}
	}]);

	return PackageDb;
}();

exports.default = PackageDb;

module.exports = exports.default;