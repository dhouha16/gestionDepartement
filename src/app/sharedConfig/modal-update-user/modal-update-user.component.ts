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
    if(this.user)
    this.myForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      departement: [this.user.departement.id, Validators.required],
      status: [this.user.status]
    });
    // this.departement = this.departement.filter((w: any) => {
    //   console.log("w.id ---------------- " + w.id);
    //   console.log("user.departement.id ---------------- " + this.user.departement.id);
    //   return w.id !== this.user.departement.id;
    // });
    console.log('departement',this.departement);

  }

  onUpdate(idUser:any){
    console.log(this.myForm.value)
    console.log(this.myForm.controls['firstName'].value);
    console.log(this.myForm.controls['status'].value);
  
    const user:User={
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
