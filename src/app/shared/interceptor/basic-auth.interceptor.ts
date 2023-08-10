import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.service';
import { StorageService } from 'src/app/auth/service/storage.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
 
  constructor(private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        // const user = this.storageService.getUser();
        
        const isLoggedIn = localStorage.getItem("JWT");
        const isApiUrl = request.url.startsWith(environment.path);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${localStorage.getItem("JWT")}`
                }
            });
        }
        return next.handle(request);
    }
}
