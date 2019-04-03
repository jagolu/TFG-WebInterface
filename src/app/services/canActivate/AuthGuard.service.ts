import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private authService:AuthenticationService, private router:Router) { }

  canActivate(next:ActivatedRouteSnapshot){
    let url = next.url.toString();
    if(url.includes("signUp") && this.authService.IsAuthenticated()) return false;
    if(url.includes("signUp") && !this.authService.IsAuthenticated()) return true;
    if(url.includes("logIn") && this.authService.IsAuthenticated()) return false;
    if(url.includes("logIn") && !this.authService.IsAuthenticated()) return true;
    if(url.includes("emailVerification") && this.authService.IsAuthenticated()) return false;
    if(url.includes("emailVerification") && !this.authService.IsAuthenticated()) return true;
    return this.authService.IsAuthenticated();
  }
}
