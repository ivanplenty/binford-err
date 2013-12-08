var Q = require('q');

var Err = function(httpStatus, code, message, innerErr){
	this.httpStatus = httpStatus;
	this.code = code;
	this.message = message;
	this.innerErr = innerErr;
};

Err.prototype.isBinford = true;

module.exports.isBinford = function(err){
	return (err && err.isBinford);
}

module.exports.reject = function(err){
	Q.fcall(function(){
		throw err;
	});
};

module.exports.msg = function(msg){
	return new Err(500, "GENERIC", msg);
};

module.exports.build = function(options){
	options = options || {};
	return new Err(
		options.httpStatus,
		options.code,
		options.message,
		options.innerErr
	);
};

module.exports.Err = Err;
