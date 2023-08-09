import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  USER_KEY:any 
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    user = {"acess_token":localStorage.getItem("JWT"),
               "userName":localStorage.getItem("USERNAME"),
               "role":localStorage.getItem("ROLE")
              };
    localStorage.setItem("USER",user)
  }

  public getUser(): any {
    const user = localStorage.getItem("USER");
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

}
