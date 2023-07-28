import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/models/Departement';
import { User } from 'src/app/models/Users';
import { DepartementService } from 'src/app/shared/services/departement.service';
import { DepartementModalComponent } from 'src/app/sharedConfig/departement-modal/departement-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  _department:any;
  constructor(private departementService:DepartementService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dispaly()
  }
  dispaly() {
    this.departementService.getAllDepartement().subscribe(
      (res: any) => {
        this._department = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
deleteDepatement(departement:any){
  console.log(departement);
  Swal.fire({
    title: "Êtes-vous sûr de supprimer ?",
    text: " nom d'employee : " + departement?.firstName ,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, supprimez-le!",
    cancelButtonText: "Annuler",
  }).then((result) => {
    if (result.value) {
      this.departementService.deleteDepartement(departement?.id).subscribe(
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

addDepartement(departement: Departement) {
  this.departementService.createDepartement(departement).subscribe(
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

getDepartementById(id:any){
  this.departementService.getDepartementById(id).subscribe(
    (res: any) => {
      this._department = res;
      console.log(res)
    },
    (err) => {
      console.log(err);
    }
  );
}
updateDepartement(departement:any){
  this.departementService.updateDepartement(departement,departement.id).subscribe(  
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



openModal(_department:any) {
  console.log(this._department);
  const modalRef = this.modalService.open(DepartementModalComponent, {
    size: 'md',
    centered: true,
    windowClass: 'dark-modal'
  });
  modalRef.componentInstance.departement = _department;
  
  //set modalCloseResult to empty string
  //  this.modalCloseResult = '';

modalRef.componentInstance.departementOutPut.subscribe((data: any) => {
  if(data?.id==null)
    this.addDepartement(data)
    else
    this.updateDepartement(data)

    this.modalService.dismissAll();
 
console.log("++++++++++++++++++ "+_department?.id)

});
}
}
