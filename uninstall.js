'use strict'

var fs = require('fs')
var path = require('path')
var projDir = path.resolve('./', '../..')

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
  'rebase',
  'hook.js']

hooks.forEach(function (name) {
  let hook = path.resolve(projDir, '.git', 'hooks', name)
  if (fs.existsSync(hook)) {
    fs.unlinkSync(hook)
  }
})
