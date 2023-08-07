import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { Project } from 'src/app/models/Project';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
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
//////////////////////////// project//////////////////////
createProject(project:Project){
  return this.http.post(this.path + '/project',project)
}

getUsersProject(id:any) {
  return this.http
    .get(this.path + '/project/users/'+id)
    .pipe(retry(0), catchError(this.traitementErreur));
}



}
