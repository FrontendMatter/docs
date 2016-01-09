var PackageDb = require('./lib/services/package')
var packageService = new PackageDb('https://popping-fire-3177.firebaseio.com/sync')
var componentFormatter = require('./lib/component-formatter')
var Promise = require('es6-promise').Promise

var packageName = process.argv[2] || 'themekit-vue'
var packageContent = require(packageName)

var forOwn = require('mout/object/forOwn')
var queue = []

forOwn(packageContent, function (data, name) {
	var component = componentFormatter(name, packageContent)
	component.packages = {}
	component.packages[packageName] = true
	queue.push(packageService.setComponent(component.name, component))
})

Promise.all(queue).then(function() {
	console.log('saved to firebase: ' + packageService.components)
	process.exit(1)
})
.catch(function (e) {
	console.log(e)
	process.exit(1)
})