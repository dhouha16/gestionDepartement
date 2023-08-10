import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of  } from 'rxjs';
import { User } from 'src/app/models/Users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = environment.path;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private userSubject: BehaviorSubject<User | null>;

  constructor( private httpClient: HttpClient, private router:Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));

  }
  isAuthenticate: boolean = false;


  // login(email: string, password: string): Observable<boolean> {
  //   if (email === 'admin@gmail.com' && password === 'admin') {
  //     this.isAuthenticate= true;
  //     return of(true);
  //   }
  //   return of(false);
  // }

  identify(payload:any ): Observable<any> {
    const params = new HttpParams()
    .set('login', payload.login)
    .set('password',payload.password )

   

    return this.httpClient.post(this.path +"/login",
      params,{ observe: 'response' }
    );
  }
  setAuthenticate(isAuthenticate:boolean){
      this.isAuthenticate=isAuthenticate;
  }
  getAuthenticate(){
    return !!localStorage.getItem("JWT")
    // or
  //   if(localStorage.getItem("JWT"))
  //   return true;
  // else return false
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('JWT');
    localStorage.removeItem('ROLE');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}
}
