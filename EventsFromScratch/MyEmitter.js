'use strict';

var MyEmitter = function(){
	this.callbacks = {};
};

MyEmitter.prototype.on = function(eventType, callback){
	this.callbacks[eventType] = callback;
};

MyEmitter.prototype.update = function(){
	if(this.callbacks['updated']){
		this.callbacks['updated']();
	}
};

module.exports = MyEmitter;