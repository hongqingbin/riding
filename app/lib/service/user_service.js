var sql_executor = require("../sql/sql_executor");
var row_object = require("../sql/row_object");
var UserService = exports = module.exports = {};
UserService.registerUser = function(userJson) {
	var row = row_object.RowObject("rider_user");
	row.setFieldValue("telephone", userJson.telephone);
	row.setFieldValue("email", userJson.email);
	row.setFieldValue("name", userJson.name);
	row.setFieldValue("min_name", userJson.min_name);
	sql_executor.insertRow(row);
};


