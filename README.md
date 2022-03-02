# Match Lines

> GitHub Action to match lines against a matcher

## Usage
The following example workflow step will check for file: `foo/bar` against a matcher
```yaml
- name: Match Lines
  uses: paypay/match-lines-action
  with:
    target_file: 'foo/bar'
    matcher: |
      app1:1\.[0-4]\.0
      app2:1\.0\.0
  ...
```

### Example target file `foo/bar`
```text
# This is a Gradle generated file for dependency locking.
# Manual edits can break the build and are not advised.
# This file is expected to be part of source control.
com.company1:app1:1.0.0=compileClasspath,runtimeClasspath
com.company1:app1:1.1.0=compileClasspath,runtimeClasspath
com.company1:app2:1.0.0=compileClasspath,runtimeClasspath
com.company2:app3:1.0.0=compileClasspath,runtimeClasspath
...
```

## Options ⚙️

The following input variables options can/must be configured:

|Input variable|Necessity|Description|Default|
|----|----|----|----|
|`target_file`|Required|File to be checked.||
|`matcher`|Required|Multiline with [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).||
|`allow_failure`|Optional|Makes the Action fail on matching lines.|`false`|

## Outputs
- `match_count`: Count of matched lines.

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```
