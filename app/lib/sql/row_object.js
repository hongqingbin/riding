var mysql = require("mysql");
var RowObject = exports = module.exports = {};
RowObject.RowObject = function(tableName) {
	if(tableName === null || tableName === undefined || tableName === "") {
		throw "tableName is null";
	}
	this.tableName = tableName;
	this.fieldNames = [];
	this.fieldValues = [];
	this.id = null;
	return this;
};

RowObject.getFieldValue = function(fieldName) {
	if(fieldName === null || fieldName === undefined || fieldName === "") {
		throw "fieldName is null";
	}
	var index = this.fieldNames.indexOf(fieldName);
	if(index < 0) {
		throw "fieldName is not exist";
	}
	return this.fieldValues[index];
};

RowObject.setId = function(id) {
	this.id = id;
};

RowObject.setFieldValue = function(fieldName, fieldValue) {
	if(fieldName === null || fieldName === undefined || fieldName === "") {
		throw "fieldName is null";
	}
	if("id" == fieldName) {
		this.id = fieldValue;
	}else {
		var index = this.fieldNames.indexOf(fieldName);
		if(index < 0) {
			this.fieldNames.push(fieldName);
			this.fieldValues.push(fieldValue);
		}else {
			this.fieldValues[index] = fieldValue;
		}
	}
};

RowObject.toInsertSqlString = function() {
	if(this.tableName === null || this.tableName === undefined) {
		throw "tableName is null";
	}
	var sql = "insert into " + this.tableName +" (";
	var lastIndex = this.fieldNames.length - 1;
	for(var index in this.fieldNames) {
		sql = sql + " " + this.fieldNames[index];
		if(index < lastIndex) {
			sql = sql + ","
		}
	}
	lastIndex = this.fieldValues.length - 1;
	sql = sql + " ) values (";
	for(var index in this.fieldValues) {
		sql = sql + " " + "?";
		if(index < lastIndex) {
			sql = sql + ","
		}
	}
	sql = sql + " )";
	return sql;
};

RowObject.toUpdateSqlString = function() {
	if(this.tableName === null || this.tableName === undefined) {
		throw "tableName is null";
	}
	var sql = "update " + this.tableName +" set";
	var lastIndex = this.fieldNames.length - 1;
	for(var index in this.fieldNames) {
		sql = sql + " " + this.fieldNames[index] + "=?";
		if(index < lastIndex) {
			sql = sql + ","
		}
	}
	sql = sql + " where id=" + mysql.escape(this.id);
	return sql;
};


RowObject.toDeleteSqlString = function() {
	if(this.tableName === null || this.tableName === undefined) {
		throw "tableName is null";
	}
	var sql = "delete from " + this.tableName +" where id=" + mysql.escape(this.id);
	return sql;
};

RowObject.toFindSqlString = function() {
	if(this.tableName === null || this.tableName === undefined) {
		throw "tableName is null";
	}
	var sql = "select * from "+this.tableName +" where id=" + mysql.escape(this.id);
	return sql;
};
