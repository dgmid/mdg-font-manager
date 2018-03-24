/* curl downloader: https://github.com/hyspace/node-curl-download/blob/master/download.js */

var Download,
	EventEmitter,
	defaultOptions,
	fill,
	getOptionArray,
	spawn,
	__hasProp = {}.hasOwnProperty,
	__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

spawn = require("child_process").spawn;

EventEmitter = require("events").EventEmitter;

defaultOptions = {
	
	createDirs: ['--create-dirs'],
	insecure: ['--insecure'],
	percentage: ['--progress-bar'],
	followRedirect: ['--location']
};

Download = (function(_super) {
	
	__extends(Download, _super);

	function Download(url, dest, options, start) {

		this.url = url != null ? url : null;
		this.dest = dest != null ? dest : null;
		
		if (options == null) {

			options = {};
		}

		if (start == null) {

			start = false;
		}

		fill(options, defaultOptions);
		this.options = getOptionArray(options, this.dest, this.url);
		this.command = 'curl ' + this.options.join(' ');

		if (start) {
		
			this.start();
		}
	}

	Download.prototype.start = function() {

		var download, lastProgress;
		
		if (this.url === null || this.dest === null) {
			
			throw new Error("node-curl-download: Url and destination path must be provided.");
			return;
		}

		lastProgress = 0;
		this._child_process = spawn('curl', this.options);
		download = this;
		
		this._child_process.on('exit', function(code) {
			
			download.emit('end', code);
		});

		this._child_process.stderr.on('data', function(data) {

			var progress;
			data = data.toString('ascii');
			
			if (/\d+(\.\d{1,2})/.test(data)) {

				progress = parseInt(RegExp.lastMatch, 10);
				
				if (lastProgress !== progress && progress >= lastProgress) {
					
					lastProgress = progress;
					download.emit("progress", progress);
				}
			}
		});

		return this._child_process.stdin.end();
	};

	Download.prototype.stop = function() {
		
		this._child_process.kill();
	};

	return Download;

})(EventEmitter);



getOptionArray = function(options, dest, url) {

	var array, key, option;
		array = [];

		for (key in options) {
			
			option = options[key];
			array = array.concat(option);
		}

		array = array.concat(['-o', dest, url]);
		return array;
};

fill = function(dest, src) {
	
	var key, _i, _len, _ref, _results;
	
	_ref = Object.keys(src);
	_results = [];

	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		
		key = _ref[_i];
		
		if (dest[key] === void 0) {

			_results.push(dest[key] = src[key]);
		
		} else {
			
			_results.push(void 0);
		}
	}
	
	return _results;
};


module.exports.Download = Download;
