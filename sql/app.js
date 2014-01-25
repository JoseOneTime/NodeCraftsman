'use strict';

var mysql = require('mysql'),
http = require('http'),
url = require('url'),
querystring = require('querystring');

var port = 8888;
http.createServer(handleRequest).listen(port);
console.log('Listening on port ' + port);

// this is obviously a shitty way to do this
function handleRequest(request, response){
	var pageContent = '<html>' +
		'<head>' + 
		'<meta http-equiv="Content-Type" ' +
		'content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/add" method="post">' +
		'<input type="text" name="content">' +
		'<input type="submit" value="Add content" />' +
		'</form>' +
		'<div>' +
		'<strong>Content in database:</strong>' +
		'<pre>' +
		'DBCONTENT' +
		'</pre>' +
		'<div>' +
		'<form action="/" method="get">' +
		'<input type="text" name="q">' +
		'<input type="submit" value="Filter content" />' +
		'</form>' +
		'</body>' +
		'</html>';
	var pathname = url.parse(request.url).pathname;

	if (pathname == '/add') {
		var requestBody = '';
		var postParameters;

		request.on('data', function(data){
			requestBody += data;
		});

		request.on('end', function(){
			postParameters = querystring.parse(requestBody);
			addContentToDatabase(postParameters.content, function(){
				// Redirect back to homepage when the database has finished
				// adding the new content to the database
				response.writeHead(302, {'Location' : '/'});
				response.end();
			});
		});
	} else {
		// User wants to read data from the db (GET req to '/')
		// The text to use for filtering is in GET param 'q'
		var filter = querystring.parse(url.parse(request.url).query).q;
		getContentsFromDatabase(filter,function(contents){
			response.writeHead(200, {'Content-Type': 'text/html'});
			// Poor man's templating system: Replace "DBCONTENT" in HTML
			// with the actual content from the DB
			response.write(pageContent.replace('DBCONTENT', contents));
			response.end();
		});
	}
}

var connectToDatabase = function(){
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'bacarach',
		database: 'node'
	});
};

// route: '/'
// retrieves contents from DB; applies LIKE filter if none is supplied
function getContentsFromDatabase(filter, callback){
	var connection = connectToDatabase();
	var query;
	var resultsAsString = '';

	if (filter){
		query = connection.query('SELECT id, content FROM test ' +
			'WHERE content LIKE ?', filter);
	} else {
		query = connection.query('SELECT id, content FROM test');
	}

	query.on('error', function(err){
		console.log('DB ERROR!:');
		console.log(err);
	});

	query.on('result', function(result){
		resultsAsString += 'id: ' + result.id;
		resultsAsString += ', content: ' + result.content;
		resultsAsString += '\n';
	});

	query.on('end', function(result){
		connection.end();
		callback(resultsAsString);
	});
}

// route: '/add'
// inserts the supplied string as a new content entry
function addContentToDatabase(content, callback){
	var connection = connectToDatabase();
	connection.query('INSERT INTO test (content) ' +
		'VALUES (?)', content,
		function(err){
			if (err) {
				console.log('Could not insert content "' + content +
					'" into database.');
			}
			callback();
		});
}