Knockstrap
==========

### Description

Knockstrap is binding library for Knockout.js, which provides bindings to Twitter Bootstrap widgets

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

[Download](https://github.com/faulknercs/Knockstrap/releases/download/v0.3.0/knockstrap-0.3.0.zip)

[Documentation/Examples](http://faulknercs.github.io/Knockstrap/examples.html)

### Dependencies

- jQuery
- Twitter Bootstrap 3
- Knockout.js

### Packages

[NuGet](http://www.nuget.org/packages/Knockstrap/) | [Bower](http://bower.io/search/?q=knockstrap) | [Jam](http://jamjs.org/packages/#/details/knockstrap) | [npm](https://www.npmjs.org/package/knockstrap)

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