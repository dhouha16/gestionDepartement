import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(state, route);
  }

  checkUserLogin(route: any, url: any): boolean {
    if (this.authService.getAuthenticate()) {
      const userRole = localStorage.getItem("ROLE");
      console.log("---",route);
      console.log(url.data);
      console.log(userRole);
      
      if (url.data) {
        if (!url.data.role.includes(userRole)) {
          this.router.navigate(['/dashbord']);
          return false;

        } else {
          return true;
        }
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;

    // if (this.authService.getAuthenticate()) {
    //   const userRole = localStorage.getItem("ROLE");

    //   if (userRole === null) {
    //     // Handle the case where userRole is null
    //     return false; // Or any other appropriate action
    //   }

    //   if (!route.data['role']) return true;

    //   const found = route.data['role']?.filter((elem: any) => userRole.includes(elem));

    //   if (found.length === 0) {
    //     return false;
    //   }

    //   return true;
    // }

    // return false;
  }

}
