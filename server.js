var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');

var index = require('./routes/index');
var employee = require('./routes/employee');
var auth = require('./routes/auth');


var port = 3000;

var app = express();

//View engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

//Body parse MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api/employee', employee);
app.use('/api/auth', auth);


app.listen(port, function(){
	console.log("Server is starting on: "+ port);
});
