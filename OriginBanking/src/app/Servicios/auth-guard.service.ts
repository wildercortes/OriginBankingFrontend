import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private accountService: AccountService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.accountService.IsLogged()) {
      return true;
    } else {
      this.router.navigate(['/Tarjeta']);
      return false;
    }
  }
}