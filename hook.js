#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')
var childproc = require('child_Process')

var pkg = require('../../package.json')
var hookName = "pre-commit"
var hooks = pkg[hookName]

var results = {}
var complete = 0
var exitCode = 0


var reportSummary = function reportSummary () {
	if (exitCode === 0) { return }
}


// script entry
if (!hooks || hooks.length === 0) { process.exit(0) }

hooks.forEach(function (script) {
	childproc.execFile('npm', ['run-script', script], function scriptClose (err, stdout, stderr) {
		complete += 1

		if (err) {
			exitCode = 1
			results[script] = false
			return
		}

		results[script] = true
		console.log(script)
		console.log(stdout)

		if (complete === hooks.length -1) { return reportSummary() }
	})
})

