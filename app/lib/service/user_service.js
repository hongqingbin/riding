var sqlExecutor = require("../sql/sql_executor");
var rowObject = require("../sql/row_object");
var queryDefine = require("../sql/query_define");
var UserService = exports = module.exports = {};
UserService.registerUser = function(userJson, callback) {
	var row = rowObject.RowObject("rider_user");
	row.setFieldValue("telephone", userJson.telephone);
	row.setFieldValue("email", userJson.email);
	row.setFieldValue("name", userJson.name);
	row.setFieldValue("min_name", userJson.min_name);
	sqlExecutor.insertRow(row, function(result) {
		if (result.insertId > 0) {
			callback(userJson);
		}
	});
};

UserService.findUser = function(id, callback) {
	var row = rowObject.RowObject("rider_user");
	row.setId(id);
	sqlExecutor.findRow(row, function(rows, fields) {
		var user = {};
		if (rows.length > 0) {
			for (var index in fields) {
				user[fields[index].name] = rows[0][fields[index].name];
			}
		}
		callback(user);
	});
};

UserService.listAllUser = function(callback) {
	var query = queryDefine.QueryDefine("rider_user");
	query.addSelectFieldName("name");
	query.addSelectFieldName("telephone");
	query.addSelectFieldName("email");
	sqlExecutor.queryRows(query, function(rows, fields) {
		var users = [];
		if (rows.length > 0) {
			for (var rowIndex in rows) {
				var user = {};
				for (var index in fields) {
					user[fields[index].name] = rows[rowIndex][fields[index].name];
				}
				users.push(user);
			}
			callback(users);
		}
	});

};