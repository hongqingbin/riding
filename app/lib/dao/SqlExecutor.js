var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit : 2,
  host     : 'localhost',
  user     : 'root',
  password : 'mysql',
  database : 'sjyz'
});

var SqlExecutor = {};

SqlExecutor.insertRow = function(row, callback) {
	
};

SqlExecutor.updateRow = function(row, callback) {
	
};

SqlExecutor.deleteRow = function(row, callback) {
	
};

SqlExecutor.findRow = function(row, callback) {
  pool.getConnection(function(err, connection) {
	  if (err) {
		throw err;
	  }   
	  connection.query('SELECT * FROM :tablename where recid=:recid', {tablename:row.tablename, recid:row.recid}, function(query_err, rows, fields) {
		if (query_err) {
		  throw query_err;	
		}
		connection.release();
		if(callback && callback typeof Function) {
		  callback(rows, fields);  
		}
	  });
  });
};

SqlExecutor.queryRows = function(query, callback) {
  pool.getConnection(function(err, connection) {
	if (err) {
	  throw err;
	}   
	connection.query(query.sql, query.condition, function(query_err, rows, fields) {
	  if (query_err) {
	    throw query_err;	
	  }
	  connection.release();
	  if(callback && callback typeof Function) {
		callback(rows, fields);  
	  }
	});
  });
};


module.exports = SqlExecutor;