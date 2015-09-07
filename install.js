'use strict'

var fs = require('fs')
var path = require('path')
var projDir = path.resolve('./', '../..')

if (fs.existsSync(projDir + '/.git') === false) {
  console.log('Unable to find .git directory. Unable to install hooks')
  process.exit(1)
}

var hookFile = path.resolve(projDir, '.git', 'hooks', 'hook.js')
fs.createReadStream(__dirname + '/hook.js').pipe(fs.createWriteStream(hookFile, {mode: '0755'}))

var hooks = ['applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-receive',
  'update',
  'post-receive',
  'post-update',
  'push-to-checkout',
  'pre-auto-gc',
  'post-rewrite',
  'rebase']

hooks.forEach(function (hook) {
  fs.symlinkSync(hookFile, path.resolve(projDir, '.git', 'hooks', hook))
})
