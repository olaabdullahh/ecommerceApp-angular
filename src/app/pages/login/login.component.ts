import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, EmailValidator, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 private readonly auth = inject(AuthService)
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)

  isLoading:boolean = false;
errMessage:string =''
success:string = ''

showPassword: boolean = false;
showRePassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

toggleRePasswordVisibility(): void {
  this.showRePassword = !this.showRePassword;
}
  // login:FormGroup = new FormGroup({

  //   email: new FormControl(null , [Validators.required , Validators.email]),
  //   password: new FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
  // })
login:FormGroup = this.formBuilder.group({
  email:[null,[Validators.required , Validators.email] ],
  password:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)] ]
})


  submitLoginForm(): void {
    if (this.login.valid) {

      this.errMessage = '';
      this.success = '';
  
      this.isLoading = true;
      this.auth.sendLoginForm(this.login.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.success = res.message;
            this.errMessage = ''; 
            localStorage.setItem('userToken' , res.token)
            this.auth.saveToken()
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errMessage = err.error.message;
          this.success = '';
          console.log(err);
          this.isLoading = false;
        },
      });
    } else {
      this.login.markAllAsTouched();
    }
  }

}
