import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/Project';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  form: FormGroup;
  users:any=[]
  @Input()  _projectDepartmentsId: any;
  @Output() projectOutPut: EventEmitter<Project> = new EventEmitter<Project>();
   selecteduserId:any

  itemsList: Project[] = [];


  constructor(private formBuilder: FormBuilder,public activeModal: NgbActiveModal,private employeeService:EmployeeService) { 
    this.form = this.formBuilder.group({
      departement: ["", Validators.required],
      description: ["", Validators.required],
      tasks: this.formBuilder.array([this.getTasksItem()])
    })
    
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      departement: [this._projectDepartmentsId, Validators.required],
      description: ["", Validators.required],
      tasks: this.formBuilder.array([this.getTasksItem()])
    });
    console.log("coucou",this._projectDepartmentsId);
    this.dispaly();
    console.log( this.form.value);
    
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
    console.log("on nit ++++ "+this._projectDepartmentsId)
    
  }

  /**
   * Create a form group for Album
   */
  private getTasksItem() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      users: this.selecteduserId,
      // songs: this.formBuilder.array([this.getSongItem()])
    });
  }

  customSearchFn(term: string, item:any) {
    item.firstName = item.firstName.replace(' ','');
    term = term.toLocaleLowerCase();
    return item.firstName.toLocaleLowerCase().indexOf(term) > -1;
  }

  onUsersSelected(){
    console.log('Selected user ID: ' + this.selecteduserId);
    console.log('Selected department ID: ' + this._projectDepartmentsId);
  }

  onSubmit(){
    console.log(this.form.value)
    const project:Project={
      "description":this.form.controls['description'].value,
      "departement":{id:Number(this.form.controls['departement'].value)},
      "tasks":this.form.value.tasks
    }
    console.log("departement on submit ------ "+project.description)
    console.log("departement on submit ------ "+JSON.stringify(project.tasks))
    this.projectOutPut.emit(project);
  }
}
