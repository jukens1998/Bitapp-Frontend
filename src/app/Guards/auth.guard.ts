import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../Services/auth/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private fireAuth: FirebaseAuthService, private router: Router) { }
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    if ( this.fireAuth.logInState() ) {
      return this.fireAuth.logInState();
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
