'use strict';

var fs = require('fs');

var stream = fs.createReadStream("c:\\users\\vrh\\my documents\\ReallyBigFile.txt");

var content = '';

stream.on('data', function(data){
	content += data;
});

stream.on('end', function(){
	console.log('Retrieved file contents: ' + content);
});

stream.on('error', function(err){
	console.log('OH NO! ' + err);
});