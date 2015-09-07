'use strict'

var fs = require('fs')
var path = require('path')
var projDir = path.resolve('./', '../..')

console.dir(projDir)

if (fs.existsSync(projDir + '.git') === false) {
	console.log('Unable to find .git directory. Unable to install hooks')
	process.exit(1)
}

var rs = fs.createReadStream(__dirname + '/hook.js')
var dest = path.resolve(projDir, '.git', 'hook.js')
var ws = fs.createWriteStream(dest, {mode: '0755'})

['commit-msg', 'pre-commit', 'pre-push'].forEach(function(hook) {
	fs.fs.symlinkSync(dest, path.resolve(projDir, '.git', hook))
})

