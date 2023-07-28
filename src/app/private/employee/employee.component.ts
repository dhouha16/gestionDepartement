import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder,Validators } from '@angular/forms';




import Swal from "sweetalert2";

//import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { User } from 'src/app/models/Users';
import { ModalComponent } from 'src/app/sharedConfig/modal/modal.component';
import { ModalUpdateUserComponent } from 'src/app/sharedConfig/modal-update-user/modal-update-user.component';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  myForm: FormGroup;
  _users:any= [];
  _departments:any= [];
  _user:any;
  // status:boolean=false;
  isCreatedForm:boolean=false;
  title = 'appBootstrap';
  
  closeResult="";
  modalCloseResult: string | undefined;


 // statusCheck: { [key: string]: boolean } = {};
  constructor(public activeModal: NgbActiveModal, private employeeService: EmployeeService, private formBuilder:FormBuilder, private departementService:DepartementService, private modalService: NgbModal) { 
    this.myForm = new FormGroup({
      // Initialize form controls here
    });
 //   this.statusCheck['status'] = false;
  }

  ngOnInit(): void {
    this.dispaly()
    this.dispalyDepartement()
    this.myForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
       departement:[null,Validators.required],
       status: [false]

      
    })
  }

  dispaly() {
    this.employeeService.getAllUsers().subscribe(
      (res: any) => {
        this._users = res;
        console.log(res)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  dispalyDepartement() {
    this.departementService.getAllDepartement().subscribe(
      (res: any) => {
        this._departments = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createForm(){
    this.isCreatedForm=true
  }
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
    console.log(user);
    this.employeeService.createUser(user).subscribe((res)=>{
      alert("user added")
      console.log(res); 
      this.dispaly()

    });
  }
  userDelete(user:any){
    console.log(user);
    Swal.fire({
      title: "Êtes-vous sûr de supprimer ?",
      text: " nom d'employee : " + user?.firstName +" "+user.lastName,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.value) {
        this.employeeService.UserDelete(user?.id).subscribe(
          (data) => {
            if (data != null) {
              Swal.fire("Supprimé!", "le droit a été supprimé.", "success");
              this.dispaly();
            }
          },
          (err) => {
            console.log(err);
            if (err.status == 400) {
             if( err?.error.message == "error"){
              this.swalError();
             }
            } else {
              console.log(err);
              
            }
          }
        );
      }
    });
    }
 

    swalError() {
      Swal.fire({
        icon: "error",
        title: "Un problème est survenu!",
        text: "l'uilisateur est déja existe",
      });
    }
   

    openModal() {
      console.log(this._departments);
      const modalRef = this.modalService.open(ModalComponent, {
        size: 'md',
        centered: true,
        windowClass: 'dark-modal'
      });
      modalRef.componentInstance.departement = this._departments;
      //set modalCloseResult to empty string
      //  this.modalCloseResult = '';

    modalRef.componentInstance.addUser.subscribe((data: any) => {
      if(data){
        
       
        this.addUser(data)
        this.modalService.dismissAll();
        
      }
    console.log(data)

    });
    }
    addUser(user: User) {
      this.employeeService.createUser(user).subscribe(
        (res) => {
          //alert("User added");
          console.log(res);
          this.dispaly();
        },
        (err) => {
          console.log(err);
        }
      );
    }

    getUserById(id:number){
      this.employeeService.getUserById(id).subscribe(
        (res: any) => {
          this._user = res;
          console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );
    }
  

    openUpdateModalUser(_user:any) {
      const modalRef = this.modalService.open(ModalUpdateUserComponent);
      modalRef.componentInstance.user = _user;
      modalRef.componentInstance.departement = this._departments;
      //set modalCloseResult to empty string
      // this.modalCloseResult = '';
  
      modalRef.componentInstance.updateUser.subscribe((data: any) => {
        this.updateUser(data)
        this.modalCloseResult = data;
        this.modalService.dismissAll();
      });
    }

    updateUser(user:any){
      this.employeeService.updateUser(user,user.id).subscribe(  
        (res) => {
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
          //alert("User added");
          console.log(res);
          this.dispaly();
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(err);
        }
      );
    }

}
   
    






 
    
