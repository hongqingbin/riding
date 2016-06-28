var mysql = require("mysql");
var row_object = require("./row_object");
var pool = mysql.createPool({
  connectionLimit : 2,
  host     : 'localhost',
  user     : 'root',
  password : 'mysql',
  database : 'rider'
});
var SqlExecutor = exports = module.exports = {};

SqlExecutor.insertRow = function(row, callback) {
	var sql = row.toInsertSqlString();
	console.log(sql);
	pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
		}
		connection.beginTransaction(function(err) {
			if (err) { throw err; }
			connection.query(sql, row.fieldValues, function(err2, result) {
				if (err2) {
					return connection.rollback(function() {
						throw err2;
					});
				}
				connection.commit(function(err) {
					if (err) {
						return connection.rollback(function() {
							throw err;
						});
					}
					console.log('success!');
				});
				connection.release();
				if(callback) {
					callback(err2, result);
				}
			});
		});
	});
};

SqlExecutor.updateRow = function(row, callback) {
	var sql = row.toUpdateSqlString();
	pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
		}
		connection.query(sql, row.fieldValues, function(err2, result) {
			if (err2) {
				throw err2;
			}
			connection.release();
			if(callback) {
				callback(err2, result);
			}
		});
	});
	
};

SqlExecutor.deleteRow = function(row, callback) {
	var sql = row.toDeleteSqlString();
	pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
		}
		connection.query(sql, function(err2, result) {
			if (err2) {
				throw err2;
			}
			connection.release();
			if(callback) {
				callback(err2, result);
			}
		});
	});
	
};

SqlExecutor.findRow = function(row, callback) {
	var sql = row.toFindSqlString();
	
	pool.getConnection(function(err, connection) {
		if (err) {
			throw err;
		}
		connection.query(sql, function(err2, rows, fields) {
			if (err2) {
				throw err2;
			}
			connection.release();
			if(callback) {
				callback(rows, fields);
			}
		});
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
			if(query.callback) {
				query.callback(rows, fields);  
			}
		});
	});
};
