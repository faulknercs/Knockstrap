Knockstrap [![Build Status](https://travis-ci.org/faulknercs/Knockstrap.svg?branch=master)](https://travis-ci.org/faulknercs/Knockstrap)
==========

## ⚠️ Bootstrap versions support ⚠️

__If you need Bootstrap 4 support, you may use [KnockstrapPlus](https://github.com/CloudNimble/KnockstrapPlus) fork. Also, you can try to search for more forks [here](https://github.com/faulknercs/Knockstrap/network).__

I highly appreciate all contributions and feedback, but I don't use Bootstrap nor Knockout anymore, so I don't have any plans to continue development of this project.
This repository is not going to be updated for Bootstrap 4 (and further) and will continue work only with Bootstrap 3. But I continue merging patches with bugfixes for Bootstrap 3 if any appears.

### Description

Knockstrap is binding library for Knockout.js, which provides bindings to Twitter Bootstrap 3 widgets

#### Supported widgets:

- Modal
- Tooltip
- Popover
- Alert
- Progress
- Toggle button
- Radio button
- Checkbox button
- Carousel
- Pagination
- Pager

[Download](https://github.com/faulknercs/Knockstrap/releases/download/v1.4.1/knockstrap-1.4.1.zip)

[Documentation/Examples](http://faulknercs.github.io/Knockstrap/)

### Dependencies

- jQuery (Any compatible with Bootstrap 3 version)
- Twitter Bootstrap 3 (CSS and JavaScript)
- Knockout.js (>=2.3.0)

### Packages

[NuGet](http://www.nuget.org/packages/Knockstrap/) | [Bower](http://bower.io/search/?q=knockstrap) | [npm](https://www.npmjs.org/package/knockstrap)

### CDN

[jsDelivr](https://cdn.jsdelivr.net/npm/knockstrap@1.4.1/build/knockstrap.js)

### Building
#### Building using grunt:

Install node.js and grunt plugin. 

Install all grunt plugins:

	npm install

Then you can build project with:

	grunt

Also, you can specify custom build and temp directories:

	grunt -buildPath=D:/custom/build -tempPath=D:/custom/temp

To build examples use:

	grunt examples

Also, you can specify custom examples directory:

	grunt -examplesPath=D:/custom/examples

To run unit-tests, use:

	grunt jasmine

To run building, tests and minification, use:

	grunt release 

### License: [MIT License](http://www.opensource.org/licenses/mit-license.php)