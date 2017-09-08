import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

	userSignUp: User;

	userSignIn: User;

  	signInForm: FormGroup;  

  	signUpForm: FormGroup;

  	password2: string;

  	signUpMessage = "";

  	myClass = 'green';
	

	constructor(
  	  private authService: AuthService,
  	  private router: Router,
      private fb: FormBuilder,
		){}

	ngOnInit(){
		this.userSignIn =  new User("","","");
		this.resetSignInForm();
		this.userSignUp =  new User("","","");
		this.resetSignUpForm();
	}

	resetUserSignIn(){
		this.userSignIn =  new User("","","");
	}

	resetSignInForm(){
	    this.signInForm = this.fb.group({
	      'email': [this.userSignIn.email, Validators.compose([Validators.required, 
	      									Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/)])],
	      'password': [this.userSignIn.password, Validators.required]
	    });
	  }

	signin(){
		this.authService.signin(this.userSignIn).subscribe( data => {
			// console.log(data);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.userId);
			this.router.navigateByUrl('/employee');
		}, (err) => {
			console.log(err);
		});		
		this.resetUserSignIn();
		this.resetSignInForm;
	}

	resetUserSignUp(){
		this.userSignUp =  new User("","","");
	}

	resetSignUpForm(){
	    this.signUpForm = this.fb.group({
	      'email': [this.userSignUp.email, Validators.compose([Validators.required, 
	      									Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/)])],
	      'password': [this.userSignUp.password, Validators.required],
	      'password2': [""]
	    });
	  }

	addUser(){
		if(this.userSignUp.password == this.password2){
			this.authService.addUser(this.userSignUp).subscribe( (user:User) => {
				console.log(user);
				this.signUpMessage = "Successfully Registered. Please Sign-in to continue";
				this.myClass = 'green';
			}, (err) => {
				console.log(err);
				this.signUpMessage = "Couldn't Register. Please try again";
				this.myClass = 'red';
			});	
		}
		else{
			this.signUpMessage = "Retype password didn't match the given password";
		}				
		this.resetUserSignUp();
		this.resetSignUpForm();
	}


}