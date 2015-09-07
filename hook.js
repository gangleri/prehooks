'use strict'

var path = require('path')
var childproc = require('child_process')

var pkg = require('../../package.json')
var hookName = path.basename(process.argv[1])
var hooks = pkg[hookName]
if (hooks === undefined) { process.exit(0) }

var numHooks = hooks.length
var results = {}
var complete = 0
var exitCode = 0

var reportSummary = function reportSummary () {
  console.log('script\t\tstatus')
  Object.keys(results).forEach(function (r) {
    console.log('%s\t\t%s', r, results[r])
  })

  process.exit(exitCode)
}

if (!hooks || hooks.length === 0) { process.exit(0) }

hooks.forEach(function (script) {
  childproc.execFile('npm', ['run-script', script], function scriptClose (err, stdout, stderr) {
    complete += 1

    if (err) {
      exitCode = 1
      results[script] = '\x1B[31mFAIL\x1B[39m'
    } else {
      results[script] = '\x1B[32mPASS\x1B[39m'
    }

    console.log(script)
    console.log(stdout)

    if (complete === numHooks) { return reportSummary() }
  })
})
