import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/Project';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-list-project-tasks-modal',
  templateUrl: './list-project-tasks-modal.component.html',
  styleUrls: ['./list-project-tasks-modal.component.scss']
})
export class ListProjectTasksModalComponent implements OnInit {
  form: FormGroup;
  public show:boolean = true;
  public showTabsArray:any
  users: any = []
  selecteduser: any
  @Input() project: any;
  @Output() projectTasksOutPut: EventEmitter<Project> = new EventEmitter<Project>();
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private taskService: TaskService, private employeeService: EmployeeService) {
    this.form = this.formBuilder.group({
    })
  }

  ngOnInit(): void {
    console.log("----------- display users " + JSON.stringify(this.users))
    this.dispaly()
    this.showitemsTask(this.show)
   
  }
  showitemsTask(show:boolean){
    this.project.tasks.forEach((task:any, index:any) => {
      this.form.addControl(`id_${index}`, new FormControl(task.id));
      this.form.addControl(`description_${index}`, new FormControl({value:task.description, disabled: true}));
      this.form.addControl(`users_${index}`, new FormControl({value:task.users.id, disabled: true}));
      console.log("***",task.users)
    });
  }
  showitemTask(index:number,enable:boolean){
    
    console.log("***")
    this.form = this.formBuilder.group({
      "id":[this.form.value['id_'+index]],
      "description":{value:this.form.value['users_'+index],disabled: true},
      "users":{value:this.form.value['users_'+index],disabled: true}
    })
  //  this.project.tasks.forEach((task:any, index:any) => {

      console.log("***hii *** ",this.form.value['users_'+index])
     
    // });
  }
  dispaly() {
    this.employeeService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
        console.log(this.users,".............................")
        console.log("----------- display users " + JSON.stringify(this.users))
      },
      (err) => {
        console.log(err);
      }
    );
  }
  customSearchFn(term: string, item: any) {
    item.firstName = item.firstName.replace(' ', '');
    term = term.toLocaleLowerCase();
    return item.firstName.toLocaleLowerCase().indexOf(term) > -1;
  }
  onUsersSelected() {
    console.log('Selected user ID: ' + this.selecteduser);
  }
  onupdateTask(index:number,enable:boolean) {
    this.show==false
   
    
    const descriptionControl = this.form.get(`description_${index}`);
    const usersControl = this.form.get(`users_${index}`);
    if (descriptionControl!=null && usersControl!=null) {
    if (enable) {
      descriptionControl.enable();
      usersControl.enable();
    
    } else {
      descriptionControl.disable();
      usersControl.disable();
    }
  }
 
    console.log(this.form.value)
    console.log(this.form.value['description_'+index])
    console.log(this.form.value['id_'+index])
    console.log(this.form.value['users_'+index])
    let data={
      id:this.form.value['id_'+index],
      description:this.form.value['description_'+index],
      users:{
        id:this.form.value['users_'+index]
      }
    }
    console.log("dataTosend",data)
  }
  // update(data:any,index:number){
  //   this.onupdateTask(index)
  //   this.projectTasksOutPut.emit(data);
  // }

}
