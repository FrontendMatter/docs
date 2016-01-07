var express = require('express')
var path = require('path')
var app = express()
var server = require('http').Server(app)
var cors = require('cors')
app.use(cors())

// static assets
var publicPath = path.resolve(__dirname, 'dist')
app.use(express.static(publicPath))

var router = express.Router()
var fs = require('fs')
var resolve = require('resolve')

// API
router.get('/', function(req, res) {
	var packagePath = req.query.path || 'themekit-vue'
	packagePath = path.join(packagePath, 'dist/docs.js')
	var resolvePackagePath = resolve.sync(packagePath, {
    	basedir: process.cwd(),
    	paths: [
    		process.cwd(),
    		path.resolve(__dirname)
    	]
    })
	var packageContent = fs.readFileSync(resolvePackagePath, 'utf-8')
    res.send(packageContent)
});
app.use('/api', router)

// start the server
server.listen(3000, 'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    var address = 'http://' + host + ':' + port

    console.log('Express listening at ' + address)
    require('openurl').open(address)
})