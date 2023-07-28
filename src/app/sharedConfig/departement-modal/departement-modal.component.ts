import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from 'src/app/shared/services/departement.service';


@Component({
  selector: 'app-departement-modal',
  templateUrl: './departement-modal.component.html',
  styleUrls: ['./departement-modal.component.scss']
})
export class DepartementModalComponent implements OnInit {
  myForm: FormGroup;
  @Input() public departement: any;
  @Output() departementOutPut: EventEmitter<Departement> = new EventEmitter<Departement>();
  constructor(public activeModal: NgbActiveModal, private departementService:DepartementService,private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    console.log("ng on init dep " + JSON.stringify(this.departement))
    if(this.departement)
    this.myForm = this.formBuilder.group({
      id:this.departement?.id,
      firstName: [this.departement.firstName, Validators.required],
    });
  }
  onSubmit(){
    const departement:Departement={
      "id":this.departement?.id,
      "firstName":this.myForm.controls['firstName'].value,
    }
    console.log("departement on submit ------ "+departement.firstName)
    console.log("departement on submit ------ "+departement?.id)
    this.departementOutPut.emit(departement);

  }

}
