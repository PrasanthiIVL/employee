var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/employees',['employees'])


//GET all Employees
router.get('/tasks', function(req,res,next){
	db.employees.find(function(err,employees){
       		if(err){
       			return res.status(500).json({
       				title: "Error occured",
       				error: err
       			});
       		}
       		res.status(200).json({
       			message: "Success",
       			obj : employees
       		});
       });
});

//GET Employee by id
router.get('/task/:id', function(req,res,next){
	db.employees.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, employee){
		if(err){
			return res.status(500).json({
				title: "Error occured",
				error: err
			});
		}
		res.status(200).json({
       			message: "Success",
       			obj : employee
        });
	})
});

//POST Employee
router.post('/task/', function(req,res,next){
	var employee = req.body;
	db.employees.save(employee,function(err, employee){
		if(err){
			return res.status(500).json({
				title: "Error occured",
				error: err
			});
		}
		res.status(200).json({
       			message: "Success",
       			obj : employee
        });
	});
});

//DELETE Employee by id
router.delete('/task/:id', function(req,res,next){
	db.employees.remove({_id: mongojs.ObjectId(req.params.id)},function(err, result){
		if(err){
			return res.status(500).json({
				title: "Error occured",
				error: err
			});
		}
		res.status(200).json({
       			message: "Success",
       			obj : result
        });
	})
});

//UPDATE employee
router.put('/task/:id', function(req,res,next){
	var newEmployee = req.body;

	db.employees.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, employee){
		if(err){
			return res.status(500).json({
				title: "Error occured",
				error: err
			});
		}
		else if(!employee){
			return res.status(500).json({
				title: "No Employee found",
				error: { message : "Ne Employee fond with the id"}
			});
		}
		else{
			newEmployee._id = employee._id;
			db.employees.update({_id: mongojs.ObjectId(req.params.id)},newEmployee,{},function(err, result){
				if(err){
					return res.status(500).json({
						title: "Error occured",
						error: err
					});
				}
				res.status(200).json({
       				message: "Success",
       				obj : result
        		});
			})
		}
	})
	
});


module.exports = router;