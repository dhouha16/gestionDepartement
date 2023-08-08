import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // vérifie si l’utilisateur est authentifié ou non. Encore une fois, aux
  //  fins de l’authentification sans état avec JWT, il s’agit simplement de savoir si le jeton a expiré. 
  //  La classe d’angular2-jwt peut être utilisée pour cela.JwtHelperService
  constructor() {}
  isAuthenticate: boolean = false;

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.isAuthenticate= true;
      return of(true);
    }
    return of(false);
  }
}
