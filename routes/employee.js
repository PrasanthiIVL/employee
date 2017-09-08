var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Employee = require('../models/employee')

//GET all Employees
router.get('/', function(req,res,next){
    try{
    	Employee
    			.find({})
    			.exec(function(err, employees){
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
    }catch(err){
    	console.log(err);
    	return res.status(500).json({
			title: "Error occured",
			error: err
		});
    }
});


//GET Employee by id
router.get('/:id', function(req,res,next){
	try{
		Employee
				.findById(req.params.id)
				.exec(function(err,employee){
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
	}catch(err){
    	console.log(err);
    	return res.status(500).json({
			title: "Error occured",
			error: err
		});
    }
});


router.use('/', function(req,res,next){
	jwt.verify(req.query.token, 'secret', function(err,decoded){
		if(err){
			return res.status(401).json({
				title: "Not Authrnticated"
			});
		}
		next(); 
	})
})

//POST Employee
router.post('/', function(req,res,next){
	var employee = new Employee({
							firstName:req.body.firstName,
							lastName:req.body.lastName,
							salary:req.body.salary});
	try{
		employee.save(function(err,employee){
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
	}catch(err){
    	console.log(err);
    	return res.status(500).json({
			title: "Error occured",
			error: err
		});
    }
});

//DELETE Employee by id
router.delete('/:id', function(req,res,next){
	try{
		Employee
				.findByIdAndRemove(req.params.id)
				.exec(function(err, result){
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
	}catch(err){
    	console.log(err);
    	return res.status(500).json({
			title: "Error occured",
			error: err
		});
    }
});

//UPDATE employee
router.put('/:id', function(req,res,next){
	var newEmployee = new Employee(req.body);
	var id = req.params.id;
	try{
		Employee
				.findById(id)
				.exec(function(err,employee){
					if(err){
						return res.status(500).json({
							title: "Error occured",
							error: err
						});
					}
					else if(!employee){
						return res.status(500).json({
							title: "No Employee found",
							error: { message : "No Employee fond with the id"}
						});
					}
					else{
						employee.firstName = newEmployee.firstName;
						employee.lastName = newEmployee.lastName;
						employee.salary = newEmployee.salary;
						employee.save(function(err,employee){
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
					}
				})
		
	}catch(err){
    	console.log(err);
    	return res.status(500).json({
			title: "Error occured",
			error: err
		});
    }	
});


module.exports = router;