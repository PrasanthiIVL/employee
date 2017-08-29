var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employees');

var Schema = mongoose.Schema;
var employeeSchema = new Schema({
	firstName:String,
	lastName:String,
	salary: Number
});

var Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;