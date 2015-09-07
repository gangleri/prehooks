#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')
var childproc = require('child_process')

var pkg = require('../../package.json')
var hookName = path.basename(process.argv[1])
var hooks = pkg[hookName]
var numHooks = hooks.length -1

var results = {}
var complete = 0
var exitCode = 0

var reportSummary = function reportSummary () {
	Object.keys(results).forEach(function(r) {
		console.log('%s\t\t%s', r, results[r])
	})

	process.exit(exitCode)
}

// script entry
if (!hooks || hooks.length === 0) { process.exit(0) }

hooks.forEach(function (script) {
	childproc.execFile('npm', ['run-script', script], function scriptClose (err, stdout, stderr) {
		complete += 1

		if (err) {
			exitCode = 1
			results[script] = 'FAIL' 
			return
		}

		results[script] = 'PASS'
		console.log(script)
		console.log(stdout)

		if (complete === numHooks) { return reportSummary() }
	})
})

