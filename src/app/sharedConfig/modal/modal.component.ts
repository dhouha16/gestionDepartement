import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/models/Departement';
import { User } from 'src/app/models/Users';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  myForm: FormGroup;
  _users:any= [];
  _departments:any= [];
  @Input() public departement: any;
  @Output() addUser: EventEmitter<User> = new EventEmitter<User>();
  closeResult="";
  title = 'appBootstrap';
  isOpen = false;
  private element: any;
  constructor(public activeModal: NgbActiveModal, private employeeService: EmployeeService,  private departementService:DepartementService,private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      departement: [null, Validators.required],
      status: [false]
    });
  }

  ngOnInit() {
    console.log("-----------"+JSON.stringify(this.departement));
    if (this.departement && Array.isArray(this.departement)) {
      this.departement.forEach((department: any) => {
        console.log("****"+department.firstName);
      });
    }
}

// dispalyDepartement() {
//   this.departementService.getAllDepartement().subscribe(
//     (res: any) => {
//       this._departments = res;
//       console.log(res);
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
// }

onSubmit(){
  console.log(this.myForm.value)
  console.log(this.myForm.controls['firstName'].value);
  console.log(this.myForm.controls['status'].value);

  const user:User={
    // "id":this.myForm.controls['id'].value,
    "firstName":this.myForm.controls['firstName'].value,
    "lastName":this.myForm.controls['lastName'].value,
    "email":this.myForm.controls['email'].value,
    "departement":{id:Number(this.myForm.controls['departement'].value)},
    "status":this.myForm.controls['status'].value,
  }
  this.addUser.emit(user);


}
/***** */
//  save(data:any){
//   this.activeModal.close(data);
//   this.onSubmit();
//  }
/***** */

// passDateFromModal(): void {
//   let modalData = { from: 'edupala', message: 'Back from modal' };
//   this.addUser.emit(modalData);
//   this.activeModal.dismiss();
// }

}
