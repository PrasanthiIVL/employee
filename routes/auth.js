var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

//Add User
router.post('/signup', function(req,res,next){
	var newUser = new User({
							email:req.body.email,
							password: bcrypt.hashSync(req.body.password, 10)
						});
	try{
		User
		.findOne({'email': newUser.email})
		.exec(function(err, user){
			if(err){
				return res.status(500).json({
						title: "Error occured",
						error: err
					});
			}

			if(user){
				return res.status(500).json({
					message: "User Exists"
				});
			}

			newUser.save(function(err,newUser){
				if(err){
					return res.status(500).json({
						title: "Error occured",
						error: err
					});
				}
				res.status(200).json({
		       			message: "Success",
		       			obj : newUser
		        });
			})			
			
		});
	}catch(err){
    	console.log(err);
    	return res.status(500).json({
			title: "Error occured",
			error: err
		});
    }
});

//Sign in
router.post('/signin', function(req,res,next){
	try{
		User
		.findOne({'email': req.body.email})
		.exec(function(err, user){
			if(err){
				return res.status(500).json({
						title: "Error occured",
						error: err
					});
			}

			if(!user){
				return res.status(500).json({ 
					title : "Login Failed",
					message: "Invalid Credentials"
				});
			}

			if(!bcrypt.compareSync(req.body.password, user.password)){
				return res.status(500).json({ 
					title : "Login Failed",
					message: "Invalid Credentials"
				});
			}		

			var token = jwt.sign({user: user}, 'secret', {expiresIn : 7200 });
			// console.log(token);
			res.status(200).json({
	       			message: "Login Success",
	       			obj : {
	       				token: token,
	       				userId: user._id
	       			}
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




module.exports = router;