var mysql = require("mysql");
var row_object = require("row_object");
var pool = mysql.createPool({
  connectionLimit : 2,
  host     : 'localhost',
  user     : 'root',
  password : 'mysql',
  database : 'sjyz'
});

function SqlExecutor() {};

SqlExecutor.insertRow = function(row, callback) {
	var sql = row.toInsertSqlString();
	connection.query(sql, row.fieldValues, function(err, result) {
		if (err) {
			throw err;
		}
		connection.release();
	});
};

SqlExecutor.updateRow = function(row, callback) {
	var sql = row.toUpdateSqlString();
	connection.query(sql, row.fieldValues, function(err, result) {
		if (err) {
			throw err;
		}
		connection.release();
	});
};

SqlExecutor.deleteRow = function(row, callback) {
	var sql = row.toDeleteSqlString();
	connection.query(sql, row.fieldValues, function(err, result) {
		if (err) {
			throw err;
		}
		connection.release();
	});
};

SqlExecutor.findRow = function(row, callback) {
	var sql = row.toFindSqlString();
	connection.query(sql, row.fieldValues, function(query_err, rows, fields) {
		if (err) {
			throw err;
		}
		connection.release();
	});
};

SqlExecutor.queryRows = function(query) {
	var sql = query.toSqlString();
	pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
		}
		connection.query(sql, function(query_err, rows, fields) {
			if (query_err) {
				throw query_err;	
			}
			connection.release();
			if(query.callback && query.callback typeof Function) {
				query.callback(rows, fields);  
			}
	    });
	});
};

module.exports = SqlExecutor;