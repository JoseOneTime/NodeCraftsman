'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'bacarach',
	database : 'node'
});

connection.query(
	'SELECT id, content FROM test',
	function(err, results, fields){
		if (err){
			console.log(err);
		} else {
			console.log(results);
		}
		connection.end();
	}
);