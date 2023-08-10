import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './sharedConfig/confirm-dialog/confirm-dialog.component';
import { ModalComponent } from './sharedConfig/modal/modal.component';
import { Routes } from '@angular/router';
import { PrivateModule } from './private/private.module';
import { BaseLayoutComponent } from './private/sharedLayout/base-layout/base-layout.component';
import { SidbarComponent } from './private/sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './private/sharedLayout/header/header.component';
import { ModalUpdateUserComponent } from './sharedConfig/modal-update-user/modal-update-user.component';

import { DepartementModalComponent } from './sharedConfig/departement-modal/departement-modal.component';
import { ProjectModalComponent } from './sharedConfig/project-modal/project-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddTasksModalComponent } from './sharedConfig/add-tasks-modal/add-tasks-modal.component';
import { ListProjectTasksModalComponent } from './sharedConfig/list-project-tasks-modal/list-project-tasks-modal.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BasicAuthInterceptor } from './shared/interceptor/basic-auth.interceptor';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    ModalComponent,
    ModalUpdateUserComponent,
    DepartementModalComponent,
    ProjectModalComponent,
    AddTasksModalComponent,
    ListProjectTasksModalComponent,
    LoginComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    PrivateModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
