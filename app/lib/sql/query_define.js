var mysql = require("mysql");

var QueryDefine = exports = module.exports = {};

QueryDefine.QueryDefine = function (tableName) {
	this.tableName = tableName;
	this.fieldNames = [];
	this.paramNames = [];
	this.paramOperators = [];
	this.paramValues = [];
	return this;
};

QueryDefine.addSelectFieldName = function(fieldName) {
	if(fieldName === null || fieldName === undefined || fieldName === "") {
		throw "fieldName is null";
	}
	var index = this.fieldNames.indexOf(fieldName);
	if(index < 0) {
		this.fieldNames.push(fieldName);
	}
};

QueryDefine.addConditionParam = function(name, value, operator) {
	if(name === null || name === undefined || name === "") {
		throw "name is null";
	}
	var index = this.paramNames.indexOf(name);
	var escapeVal = null;
	if(value) {
		escapeVal = mysql.escape(value);
	}
	if(index < 0) {
		this.paramNames.push(name);
		this.paramValues.push(escapeVal);
		this.paramOperators.push(operator);
	}else {
		this.paramValues[index] = escapeVal;
		this.paramOperators[index] = operator;
	}
};


QueryDefine.toSqlString = function() {
	if(this.tableName === null || this.tableName === undefined) {
		throw "tableName is null";
	}
	var sql = "select";
	var lastIndex = this.fieldNames.length - 1;
	for(var index in this.fieldNames) {
		sql = sql + " " + this.fieldNames[index];
		if(index < lastIndex) {
			sql = sql + ","
		}
	}
	sql = sql + " from " + this.tableName;
	if(this.paramNames.length > 0) {
		lastIndex = this.paramNames.length - 1;
		sql = sql + " where ";
		for(var index in this.paramNames) {
			sql = sql + " " + this.paramNames[index];
			if(this.paramValues[index] === null || this.paramValues[index] === undefined) {
				sql = sql + " is null";
			}else {
				sql = sql + "=" + this.paramValues[index];
			}
			if(index < lastIndex) {
				sql = sql + " and";
			}
		}
	}
	return sql;
};