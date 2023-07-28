import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './auth/login/login.component';
import { DepartementModalComponent } from './sharedConfig/departement-modal/departement-modal.component';







@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    ModalComponent,
    ModalUpdateUserComponent,
    LoginComponent,
    DepartementModalComponent,
 
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


  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
