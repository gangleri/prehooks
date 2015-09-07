'use strict'

var fs = require('fs')
var path = require('path')
var projDir = path.resolve('./', '../..')

var hooks = ['applypatch-msg', 
	'commit-msg', 
	'post-update', 
	'pre-applypatch', 
	'pre-commit', 
	'prepare-commit-msg', 
	'pre-push', 
	'pre-rebase', 
	'update',
  'hook.js']


hooks.forEach(function (name) {
	let hook = path.resolve(projDir, '.git', 'hooks', name)
	if (fs.existsSync(hook)) {
		fs.unlinkSync(hook)
	}
})
