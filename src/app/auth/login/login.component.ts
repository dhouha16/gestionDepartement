import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean = false;
  isValidUser: boolean = false;
  form: FormGroup = new FormGroup({});
  toast: any
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

 
  onLogin() {

    localStorage.clear();
    const user:any={
      // "id":this.myForm.controls['id'].value,
      "login":this.form.controls['login'].value,
      "password":this.form.controls['password'].value,
    }

    console.log("------- "+this.form.controls['login'].value)
    this.authService.identify(user)
      .subscribe(resp => {
        if(resp){
          localStorage.setItem("JWT",resp.body.acess_token)
          localStorage.setItem("USERNAME",resp.body.userName)
          localStorage.setItem("ROLE",resp.body.role)
          let user = {"acess_token":localStorage.getItem("JWT"),
          "userName":localStorage.getItem("USERNAME"),
          "role":localStorage.getItem("ROLE")
         };
         localStorage.setItem("USER",JSON.stringify(user))
          this.authService.setAuthenticate(true)
          
          this.router.navigateByUrl("/dashbord")
          this.loginSuccess(resp?.body?.username);
        }
      }, err => {
        
       this.loginError()

      })
  }

  loginError() {
    this.toastr.error('SVP!!', 'Vérifier Vos Données', {
      timeOut: 2000
    });
  }
  
  loginSuccess(username:any) {
    this.toastr.success(username, 'Bienvenue', {
      timeOut: 3000
    });
  }
}
