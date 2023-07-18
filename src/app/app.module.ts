import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartementComponent } from './departement/departement.component';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './sharedConfig/confirm-dialog/confirm-dialog.component';
import { ModalComponent } from './sharedConfig/modal/modal.component';
import { Routes } from '@angular/router';
import { PrivateModule } from './private/private.module';
import { BaseLayoutComponent } from './private/sharedLayout/base-layout/base-layout.component';
import { SidbarComponent } from './private/sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './private/sharedLayout/header/header.component';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartementComponent,
    ConfirmDialogComponent,
    ModalComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    PrivateModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
