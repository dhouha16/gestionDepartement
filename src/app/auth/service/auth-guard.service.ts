import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  isAuthenticate: boolean = false;
  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.isAuthenticate = true;
      return of(true);
    }
    return of(false);
  }
}
