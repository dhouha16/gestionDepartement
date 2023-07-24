import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/shared/services/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  _department:any= [];
  constructor(private departementService:DepartementService) { }

  ngOnInit(): void {
    this.dispaly()
  }
  dispaly() {
    this.departementService.getAllDepartement().subscribe(
      (res: any) => {
        this._department = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
