function RowObject(table) {
	if(table === null || table === undefined || table === "") {
		throw "table is null";
	}
	this.table = table;
	this.fieldNames = [];
	this.fieldValues = [];
}

RowObject.prototype.getFieldValue = function(fieldName) {
	if(fieldName === null || fieldName === undefined || fieldName === "") {
		throw "fieldName is null";
	}
	var index = this.fieldNames.indexOf(fieldName);
	if(index < 0) {
		throw "fieldName is not exist";
	}
	return this.fieldValues[index];
};

RowObject.prototype.setFieldValue = function(fieldName, fieldValue) {
	if(fieldName === null || fieldName === undefined || fieldName === "") {
		throw "fieldName is null";
	}
	var index = this.fieldNames.indexOf(fieldName);
	if(index < 0) {
		this.fieldNames.push(fieldName);
		this.fieldValues.push(fieldValue);
	}else {
		this.fieldValues[index] = fieldValue;
	}
};

module.exports = RowObject;