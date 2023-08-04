import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/Project';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-add-tasks-modal',
  templateUrl: './add-tasks-modal.component.html',
  styleUrls: ['./add-tasks-modal.component.scss']
})
export class AddTasksModalComponent implements OnInit {
  form: FormGroup;
  @Input()  project: any;
  @Output() projectTasksOutPut: EventEmitter<Project> = new EventEmitter<Project>();
  selecteduser:any
  users:any=[]

  constructor(private formBuilder: FormBuilder,public activeModal: NgbActiveModal,private taskService:TaskService,private employeeService:EmployeeService) {
    this.form = this.formBuilder.group({
      tasks: this.formBuilder.array([this.getTasksItem()])
    })
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      
      tasks: this.formBuilder.array([this.getTasksItem()])
    });
    this.dispaly() 
  }

  /**
   * Getter for album item as FormArray
   */
  get tasks() {
    return this.form.get("tasks") as FormArray;
  }

  /**
   * Add a song item to existing form array
   */
  addTasks() {
    this.tasks.push(this.getTasksItem());
  }

  /**
   * Remove a albums item from the form array
   * @param index - index of the song item to be removed
   */
  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  /**
   * Initialize the form
   */
  private initForm() {
    console.log("on nit ++++ "+this.project)
    
  }

  /**
   * Create a form group for Album
   */
  private getTasksItem() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      users: this.selecteduser,
      // songs: this.formBuilder.array([this.getSongItem()])
    });
  }

  customSearchFn(term: string, item:any) {
    item.firstName = item.firstName.replace(' ','');
    term = term.toLocaleLowerCase();
    return item.firstName.toLocaleLowerCase().indexOf(term) > -1;
  }

  dispaly() {
    this.employeeService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
        console.log(res)
        console.log("----------- display users "+JSON.stringify(this.users))
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(){
    console.log(this.form.value)
    const project:Project={
      "tasks":this.form.value.tasks
    }
    console.log("departement on submit ------ "+JSON.stringify(project.tasks))
    this.projectTasksOutPut.emit(project);
  }


}
