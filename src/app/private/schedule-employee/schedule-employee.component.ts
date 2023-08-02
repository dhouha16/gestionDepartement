import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from 'src/app/shared/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrls: ['./schedule-employee.component.scss']
})
export class ScheduleEmployeeComponent implements OnInit {
  myForm: FormGroup;
 public _departments:any= [];
 public _usersdepartments:any= [];
//  public listUsersDepartementId:any= [];
 public selectedDepartmentId: any;
 showMyContainer: boolean = false;
 id: any;
 status: any;

  constructor(private departementService: DepartementService, private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      departement: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.showMyContainer =!this.showMyContainer;
    this.displayDepartement();
  }

  displayDepartement() {
    this.departementService.getAllDepartement().subscribe(
      (res: any) => {
        this._departments = res;
        console.log(res);
        console.log('all departement ------------- ' + JSON.stringify(res));
        console.log('all departement ------------- ' + JSON.stringify(this._departments));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  customSearchFn(term: string, item:any) {
    item.firstName = item.firstName.replace(' ','');
    term = term.toLocaleLowerCase();
    return item.firstName.toLocaleLowerCase().indexOf(term) > -1;
  }

  onDepartmentSelected() {
    // Implement the logic to get the specific list based on the selected department's ID (this.selectedDepartmentId).
    // You can use this ID to make another API call or perform any action you need.
    console.log('Selected department ID: ' + this.selectedDepartmentId);
    this.showMyContainer=true;
    this.getUserDepartementId(this.selectedDepartmentId);
  
  }

  getUserDepartementId(id:any){
    this.departementService.getUserDepartementId(id).subscribe(
      (res: any) => {
        this._usersdepartments = res;
        this._usersdepartments = res.users.length > 0 ? res : null;
        //ou
        // if( res.users.length > 0){
        //   this.listUsersDepartementId =res.users}else{
        //   this.listUsersDepartementId=null}
        console.log(res);
        console.log('all departement ------------- ' + JSON.stringify(res));
        console.log('all departement ------------- ' + JSON.stringify(this._usersdepartments));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  validerPresence(id:any) {
    const _listePresenceUpdated: { users: {id:any, status: any }[] } = { users: [] };
    console.log(this._usersdepartments);

    this._usersdepartments.users.forEach((elem: any) => {
      _listePresenceUpdated.users.push({
        id:elem.id,
        status: elem.status,
      });
     
    });
    console.log("elem --- "+ JSON.stringify(_listePresenceUpdated) )
    // Rest of your code (if any)
    this.departementService
      .updateUserDepartementId( this.selectedDepartmentId,_listePresenceUpdated)
      .subscribe(() => {
       console.log('La liste modifiée avec succès', 'succés!');
   
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      } ,
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        console.log(err);
      });
   
  }
 
  
  
  
  
    // Rest of your code (if any)
  
  // updateUsersDepartement(id:any){
  //   const _listePresenceUpdated = { assiduites: [] };
  //   this._usersdepartments.users.forEach((elem) => {
  //     _listePresenceUpdated.assiduites.push({
  //       id: elem.id,
  //       etat: elem.etat,
  //       justification: '--',
  //     });
  //   });
  //   this.sheduleServ
  //     .updatePresenceListMaster(_listePresenceUpdated, this.id)
  //     .subscribe(() => {
  //       this.toastr.success('La liste modifiée avec succès', 'succés!');
  //     });
  // }

}
