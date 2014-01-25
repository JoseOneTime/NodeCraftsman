'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'bacarach'
});

connection.query('CREATE DATABASE node', function(err){
	if (err) {
		console.log('Could not create db "node".');
	}
});

connection.query('USE node', function(err){
	if (err){
		console.log('Could not switch to db "node".');
	}
});

connection.query('CREATE TABLE test ' +
	'(id INT(11) AUTO_INCREMENT, ' + 
	' content VARCHAR(255), ' +
	' PRIMARY KEY(id))',
	function(err){
		if (err) {
			console.log('Could not create table "test".');
		}
	}
);

connection.query('INSERT INTO test (content) VALUES ("Hello")');
connection.query('INSERT INTO test (content) VALUES ("World")');
connection.end();