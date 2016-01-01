var express = require('express')
var app = express()
var server = require('http').Server(app)
var router = express.Router()
var path = require('path')
var glob = require('glob')
var hyphenate = require('mout/string/hyphenate')
var unhyphenate = require('mout/string/unhyphenate')
var properCase = require('mout/string/properCase')
var pascalCase = require('mout/string/pascalCase')
var forOwn = require('mout/object/forOwn')
var cors = require('cors')
app.use(cors())

var node_modules = path.resolve(__dirname, 'node_modules')

router.route('/components')
	.get(function(req, res) {
		glob('themekit-vue/src/vue/components/**/*.vue', {
			cwd: node_modules
		}, function (err, files) {
			var components = [];
			files.forEach((file) => {
				var id = file.split(path.sep).pop().split('.vue').shift()
				components.push({
					id: id,
					label: properCase(unhyphenate(id)),
					path: file
				})
			})
			res.json(components);
		})
	});

var MockBrowser = require('mock-browser').mocks.MockBrowser
var AbstractBrowser = require('mock-browser').delegates.AbstractBrowser

router.route('/components/:id')
	.get(function(req, res) {

		var win = MockBrowser.createWindow()
		var browser = new AbstractBrowser({
			window: win
		})
		var doc = browser.getDocument()
		global.window = win
		global.document = doc

		var id = req.params.id
		var propertyName = pascalCase(id)
		var package = require('themekit-vue')
		var component = package[propertyName]

		var props = []
		forOwn(component.props, (prop, name) => {
			props.push({
				name: hyphenate(name),
				type: prop.type.name,
				default: prop.default,
				required: prop.required
			})
		})

		var events = []
		forOwn(component.events, (event, name) => {
			events.push({
				name: name,
				event: event.toString()
			})
		})

		return res.json({
			id: id,
			label: properCase(unhyphenate(id)),
			props: props,
			events: events
		})
	});

app.use('/api', router);
server.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    var address = 'http://' + host + ':' + port;

    console.log('Express listening at ' + address);
});