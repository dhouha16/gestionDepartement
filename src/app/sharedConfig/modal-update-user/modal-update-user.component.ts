import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/models/Departement';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-modal-update-user',
  templateUrl: './modal-update-user.component.html',
  styleUrls: ['./modal-update-user.component.scss']
})
export class ModalUpdateUserComponent implements OnInit {
  myForm: FormGroup;
  @Input() public departement: any;
  @Input() public user: any;
  @Output() updateUser: EventEmitter<User> = new EventEmitter<User>();


  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      departement: [null, Validators.required],
      status: [false]
    });
   }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      departement: [this.user.departement, Validators.required],
      status: [this.user.status]
    });
  }
  // passDateFromModal(): void {
  //   let modalData = { from: 'edupala', message: 'Back from modal' };
  //   this.updateUser.emit(modalData);
  //   this.activeModal.dismiss();
  // }

  onUpdate(idUser:any){
    console.log(this.myForm.value)
    console.log(this.myForm.controls['firstName'].value);
    console.log(this.myForm.controls['status'].value);
  
    const user:any={
      "id":this.user.id,
      "firstName":this.myForm.controls['firstName'].value,
      "lastName":this.myForm.controls['lastName'].value,
      "email":this.myForm.controls['email'].value,
      "departement":{id:Number(this.myForm.controls['departement'].value)},
      "status":this.myForm.controls['status'].value,
    }
    this.updateUser.emit(user);
    console.log("---------------------- update")
  }
  


}
