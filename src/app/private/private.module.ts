import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidbarComponent } from './sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './sharedLayout/header/header.component';
import { BaseLayoutComponent } from './sharedLayout/base-layout/base-layout.component';
import { Routes } from '@angular/router';
import { PrivateRoutingModule } from './private-routing.module';
import { FooterComponent } from './sharedLayout/footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartementComponent } from './departement/departement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule

  // Add any other required modules
  ],
  declarations: [
    SidbarComponent,
    HeaderComponent,
    BaseLayoutComponent,
    FooterComponent,
    EmployeeComponent,
    DepartementComponent,
    // Declare your private component here
  ],
  exports: [
    BaseLayoutComponent // Export the component you want to make accessible outside the module
  ]
})
export class PrivateModule { }
