import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)
  step:number = 1
verfiEmail:FormGroup = new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email] ),
})
verfiCode:FormGroup = new FormGroup({
  resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6}$/)] ),
})
resetPassword:FormGroup = new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email] ),
  newPassword: new FormControl(null,[Validators.required , Validators.pattern(/^\w{6,}$/)] )
})

verfiEmailSubmit():void{
let emailValue = this.verfiEmail.get('email')?.value;
this.resetPassword.get('email')?.patchValue(emailValue)
this.auth.forgotPassword(this.verfiEmail.value).subscribe({
  next:(res)=>{
    if(res.statusMsg ==='success'){
      this.step = 2
    }
  }
})
}
verfiCodeSubmit():void{

this.auth.resetCode(this.verfiCode.value).subscribe({
  next:(res)=>{
    if(res.status === 'Success'){
      this.step = 3
    }
  },error:(err)=>{
    console.log(err);
    
  }
})
}
resetPasswordSubmit():void{
  this.auth.resetPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
      console.log(res.token);
      
      localStorage.setItem('userToken', res.token)
      this.auth.saveToken()
      this.router.navigate(['/home'])
    }, 
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
