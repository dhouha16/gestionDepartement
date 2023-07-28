import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Departement } from 'src/app/models/Departement';
@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  path = environment.path;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  /**
   * Option http
   */
  createRequestOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  /**
   * traitement Erreur
   * @param erreur
   */
  traitementErreur(erreur: HttpErrorResponse) {
    if (erreur.error instanceof ErrorEvent) {
      console.log('Une erreur s est produite', erreur.error.message);
    } else
      console.error(
        'code renvoyé par le backen ' +
          erreur.status +
          +'le corps était : ' +
          JSON.stringify(erreur.error)
      );
    return throwError(
      'quelque chose est arrivé ; Veuillez reessayer plus tard'
    );
  }
///////////////////Departement///////////////////////

getAllDepartement() {
  return this.http
    .get(this.path + '/departement')
    .pipe(retry(0), catchError(this.traitementErreur));
}
deleteDepartement(id: number ){
  return this.http.delete(this.path + '/departement/'+id)
}
createDepartement(departement:Departement){
  return this.http.post(this.path + '/departement',departement)
}
updateDepartement(data: any, id: any) {
  const options = this.createRequestOptions();
  return this.http
    .put<any>(this.path + '/departement/'+id, data,{headers: options})
    .pipe(retry(0), catchError(this.traitementErreur));
}
getDepartementById(id:any) {
  return this.http
    .get(this.path + '/departement/'+id)
    .pipe(retry(0), catchError(this.traitementErreur));
}
getUserDepartementId(id:any){
  return this.http
  .get(this.path + '/departement/users/'+id)
  .pipe(retry(0), catchError(this.traitementErreur));
}

}
