import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { StorageService } from 'src/app/auth/service/storage.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.scss']
})
export class SidbarComponent implements OnInit {
  title = "CodeSandbox";
  private roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;
  showSimpleUser = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log("++++++++++++++ "+JSON.stringify(this.storageService.getUser()))
    if (this.storageService.getUser()!=null) {
      const user = this.storageService.getUser();
      this.roles = user.role;
       this.showAdmin = this.roles.includes('admin');
      console.log("---showAdmin "+this.showAdmin)
      this.showSimpleUser = this.roles.includes('simple_user');
      console.log("---showSimpleUser "+this.showSimpleUser)
      this.username = user.username;
    }
  }

}
