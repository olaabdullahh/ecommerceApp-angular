import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, EmailValidator, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)

  isLoading:boolean = false;
errMessage:string =''
success:string = ''
  register:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null , [Validators.required]),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators:[this.confirmPassword]})



  submitRegisterForm(): void {
    if (this.register.valid) {

      this.errMessage = '';
      this.success = '';
  
      this.isLoading = true;
      this.auth.sendRegisterForm(this.register.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            console.log(res);
            this.success = res.message;
            this.errMessage = ''; 
            
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errMessage = err.error.message;
          this.success = '';
          console.log(err.error);
          this.isLoading = false;
        },
      });
    } else {
      this.register.markAllAsTouched();
    }
  }

  confirmPassword(group:AbstractControl){
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;
    return pass === rePass ? null : {mismatsh: true}
  }


  
}
