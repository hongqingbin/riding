var sql_executor = require("../sql/sql_executor");
var row_object = require("../sql/row_object");
var query_define = require("../sql/query_define");
var UserService = exports = module.exports = {};
UserService.registerUser = function(userJson, callback) {
	var row = row_object.RowObject("rider_user");
	row.setFieldValue("telephone", userJson.telephone);
	row.setFieldValue("email", userJson.email);
	row.setFieldValue("name", userJson.name);
	row.setFieldValue("min_name", userJson.min_name);
	sql_executor.insertRow(row, function(result) {
		if(result.insertId > 0) {
			callback(userJson);
		}
	});
};

UserService.findUser = function(id, callback) {
	var row = row_object.RowObject("rider_user");
	row.setId(id);
	sql_executor.findRow(row, function(rows, fields) {
		var user = {};
		if(rows.length > 0) {
			for(var index in fields) {
				user[fields[index].name] = rows[0][fields[index].name];
			}
		}
		callback(user);
	});
};

UserService.listAllUser = function(callback) {
	var query = query_define.QueryDefine("rider_user");
	query.addSelectFieldName("name");
	query.addSelectFieldName("telephone");
	query.addSelectFieldName("email");
	sql_executor.queryRows(query, function(rows, fields) {
		var users = [];
		if(rows.length > 0) {
			for(var rowIndex in rows) {
				var user = {};
				for(var index in fields) {
					user[fields[index].name] = rows[rowIndex][fields[index].name];
				}
				users.push(user);
			}
			callback(users);
		}
	});
	
};


