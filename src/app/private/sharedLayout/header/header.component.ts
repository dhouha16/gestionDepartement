import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { StorageService } from 'src/app/auth/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
user:any;
  constructor(private storageService: StorageService, private auhService:AuthService) { }

  ngOnInit(): void {
    this.user=this.storageService.getUser()
  }

  logout(){
    this.auhService.logout();
  }

}
