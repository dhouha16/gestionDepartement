import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-emplyees',
  templateUrl: './project-emplyees.component.html',
  styleUrls: ['./project-emplyees.component.scss']
})
export class ProjectEmplyeesComponent implements OnInit {
   _departments:any= [];
   _projects:any=[];
   _users:any=[];
   selectedDepartmentId: any;
   selectedProjectId:any;
   myForm: FormGroup;
  constructor(private departementService: DepartementService, private formBuilder: FormBuilder, private projectService:ProjectService) {  
    this.myForm = this.formBuilder.group({
    departement: [null, Validators.required],
  }); }

  ngOnInit(): void {
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

  onDepartmentSelected() {
    // Implement the logic to get the specific list based on the selected department's ID (this.selectedDepartmentId).
    // You can use this ID to make another API call or perform any action you need.
    console.log('Selected department ID: ' + this.selectedDepartmentId);
    this.displayProjectByDepartement(this.selectedDepartmentId);
  
  }

  displayProjectByDepartement(id:any){
    console.log("-------------departement id "+id)
    this.departementService.getProjectsDepartementId(id).subscribe(
      (res: any) => {
        this._projects = res;
         this._projects = res.projects.length > 0 ? res.projects : null;
         console.log(this._projects);
         
        //ou
        // if( res.users.length > 0){
        //   this.listUsersDepartementId =res.users}else{
        //   this.listUsersDepartementId=null}
        console.log(res);
        console.log('all project ------------- ' + JSON.stringify(res));
        console.log('all project ------------- ' + JSON.stringify(this._projects));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onProjectSelected() {
    // Implement the logic to get the specific list based on the selected department's ID (this.selectedDepartmentId).
    // You can use this ID to make another API call or perform any action you need.
    console.log('Selected project ID: ' + this.selectedProjectId);
    this.displayUsersByProject(this.selectedProjectId);
  
  }

  displayUsersByProject(id:any){
    this.projectService.getUsersProject(id).subscribe(
      (res: any) => {
        this._users = res;
         this._users = res.length > 0 ? res : null;
         console.log(this._users);
        //ou
        // if( res.users.length > 0){
        //   this.listUsersDepartementId =res.users}else{
        //   this.listUsersDepartementId=null}
        console.log(res);
        console.log('all project ------------- ' + JSON.stringify(res));
        console.log('all project ------------- ' + JSON.stringify(this._users));
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

}
