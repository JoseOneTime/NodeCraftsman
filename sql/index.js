'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'bacarach'
});

connection.query(
	'SELECT "foo" AS first_field, "bar" as second_field',
	function(err, results, fields){
		if (err){
			console.log(err);
		} else {
			console.log(results);
		}
		connection.end();
	}
);