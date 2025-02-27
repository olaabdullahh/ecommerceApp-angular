import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const id = inject(PLATFORM_ID)
let router=  inject(Router)
if(isPlatformBrowser(id)){
  if(localStorage.getItem("userToken") !== null){
    
    return true;
  }
  else{
    router.navigate(['/login'])
  return false;
  }
} 
else return false
 
};
