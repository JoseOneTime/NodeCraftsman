'use strict';

var fs = require('fs');

var stream = fs.createReadStream("c:\\users\\vrh\\my documents\\BigFile.txt");

stream.on('data', function(data){
	console.log('Received data: ' + data);
});

stream.on('end', function(){
	console.log('Reached EOF');
});