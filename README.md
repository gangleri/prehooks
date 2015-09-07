# PREHOOKS
An easy way to integrate git hooks and package.json scripts.
I  had originally written [YouShallNotCommit](https://github.com/gangleri/YouShallNotCommit)
but had wanted to clean it up, the ASCII wizard looked cool for a while, I wanted
to support all [Git Hooks](http://www.git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) not just commit. 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Supported Hooks
Prehooks will allow you to use the following git hooks

	* applypatch-msg
	* pre-applypatch
  * post-applypatch
  * pre-commit
  * prepare-commit-msg
  * commit-msg
  * post-commit
  * pre-rebase
  * post-checkout
  * post-merge
  * pre-push
  * pre-receive
  * update
  * post-receive
  * post-update
  * push-to-checkout
  * pre-auto-gc
  * post-rewrite
  * rebase

## Installation
```sh
npm install prehooks --save-dev
```


## Usage
Any script you wish to run should be set up as an npm script. For details on this
please consult the [npm scripts](https://docs.npmjs.com/misc/scripts) and [npm run-script](https://docs.npmjs.com/cli/run-script)

Once you have your scripts defined within the scripts block of package.json you
can start to define your hooks. Hooks are simply an array listing the script
names that you would like to run. For example in this script block we have
defined a script to lint and test the code.

```js
"scripts" : {
	"lint": "",
	"test": ""
}
```

Now suppose you wish to run these scripts before you push changes to the remote
repository, you would use the `pre-push` hook. To use this hook all you have
to do is define a property in package.json called 'pre-push' and assign it
an array of strings corresponding to the names of the scripts you wish to run.

```js
"pre-push": ["lint", "test"]
```

Provided the script can be executed with `npm run-script <name>` you can use it
as a hook. If you want to script to stop git completing its task the  script
should have a non zero exit code. 

This will work for any git hook, simply add a property that matches the name of
the git hook and assign it an array of script names to execute

