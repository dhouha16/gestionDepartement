import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/Project';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { AddTasksModalComponent } from 'src/app/sharedConfig/add-tasks-modal/add-tasks-modal.component';
import { ListProjectTasksModalComponent } from 'src/app/sharedConfig/list-project-tasks-modal/list-project-tasks-modal.component';
import { ProjectModalComponent } from 'src/app/sharedConfig/project-modal/project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  myForm: FormGroup;
  _project:any;
  _department:any;
  public _projectDepartments:any
public _departments:any= [];
public selectedDepartmentId:any;

constructor(private formBuilder:FormBuilder,private departementService:DepartementService,private modalService: NgbModal,private projectService:ProjectService, private taskService:TaskService) {
  this.myForm = this.formBuilder.group({
    departement: [null, Validators.required],
  });
}

  ngOnInit(): void {
    this.dispaly()
  }

  dispaly() {
    this.departementService.getAllDepartement().subscribe(
      (res: any) => {
        this._departments = res;
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
    // this.showMyContainer=true;
    this.getProjectDepartementId(this.selectedDepartmentId);
  }

  getProjectDepartementId(id:any){
    this.departementService.getProjectsDepartementId(id).subscribe(
      (res: any) => {
        this._projectDepartments = res;
        this._projectDepartments = res.projects.length > 0 ? res : null;
        //ou
        // if( res.users.length > 0){
        //   this.listUsersDepartementId =res.users}else{
        //   this.listUsersDepartementId=null}
        console.log(res);
        console.log('all departement ------------- ' + JSON.stringify(res));
        console.log('all departement ------------- ' + JSON.stringify(this._projectDepartments));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  postProject(project: Project){
    this.projectService.createProject(project).subscribe((res)=>{
      alert("project added")
      console.log(res); 
      this.getProjectDepartementId(this.selectedDepartmentId)

    });
  }
  openaddModalDepartementProject(data:any){
    const modalRef = this.modalService.open(ProjectModalComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.componentInstance._projectDepartmentsId = this.selectedDepartmentId;

  modalRef.componentInstance.projectOutPut.subscribe((data: any) => {
       this.postProject(data)
      this.modalService.dismissAll();
  });
  }
  openaddTasksModal(_project:any){
    const modalRef = this.modalService.open(AddTasksModalComponent, {
      size: 'md',
      centered: true,
      windowClass: 'dark-modal'
    });
    this._project=_project;
    console.log("project --------- "+JSON.stringify(_project))
    modalRef.componentInstance.project = _project
    modalRef.componentInstance.projectTasksOutPut.subscribe((data: any) => {
      this.postTasksProject(data)
     this.modalService.dismissAll();
 });

  }

  postTasksProject(project: Project){
    alert("hiiiiiiiiiiii"+this._project.id)
    this.taskService.createTasks(project,this._project.id).subscribe((res)=>{
      alert("tasks added")
      console.log(res); 
      this.getProjectDepartementId(this.selectedDepartmentId)

    });
  }
  openListTasksModal(_project:any){
    const modalRef = this.modalService.open(ListProjectTasksModalComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.componentInstance.project = _project
    modalRef.componentInstance.projectTasksOutPut.subscribe((data: any) => {
      this.updateProjectTask(data)
      this.modalService.dismissAll();
    });
  }

  updateProjectTask(data:any){
    this.taskService.updateTask(data,data.id).subscribe((res)=>{
      alert("tasks updated")
      console.log(res); 
      this.getProjectDepartementId(this.selectedDepartmentId)

    });
  }

}
