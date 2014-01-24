'use strict';

var MyEmitter = require('./MyEmitter');

describe('MyEmitter', function(){
	
	it('"update" func should fire "update" event', function(){
		var myEmitter = new MyEmitter();
		var updatedEventWasFired = false;

		myEmitter.on('update', function(){
			updatedEventWasFired = true;
		});

		myEmitter.update();

		expect(updatedEventWasFired).toBe(true);
	});
	
	it('should fire "end" event after "update" has been called 3x', function(){
		var myEmitter = new MyEmitter();
		var endEventWasFired = false;
		var endEventWasFiredAgain = false;
		var updatedEventWasFiredAfterEndEvent = false;

		myEmitter.on('end', function(){
			if (endEventWasFired) {
				endEventWasFiredAgain = true;
			} else {
				endEventWasFired = true;
			}
		});

		myEmitter.update();
		myEmitter.update();
		myEmitter.update();

		myEmitter.on('update', function(){
			updatedEventWasFiredAfterEndEvent = true;
		});

		expect(endEventWasFired).toBe(true);

		myEmitter.update();

		expect(endEventWasFiredAgain).toBe(false);
		expect(updatedEventWasFiredAfterEndEvent).toBe(false);
	});

});