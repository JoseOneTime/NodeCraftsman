'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var MyEmitter = function(){
	this.updateCount = 0;
};

util.inherits(MyEmitter, EventEmitter);

MyEmitter.prototype.update = function(){
	if (this.updateCount < 3){
		this.emit('update');
		this.updateCount++;
		if(this.updateCount === 3){
			this.emit('end');
		}
	}
};

module.exports = MyEmitter;