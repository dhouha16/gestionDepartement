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
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectComponent } from './project/project.component';
import { ProjectEmplyeesComponent } from './project-emplyees/project-emplyees.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';


@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    LeafletModule,
 
  // Add any other required modules
  ],
  declarations: [
    SidbarComponent,
    HeaderComponent,
    BaseLayoutComponent,
    FooterComponent,
    EmployeeComponent,
    DepartementComponent,
    ScheduleEmployeeComponent,
    ProjectComponent,
    ProjectEmplyeesComponent,
    MapComponent
    
    // Declare your private component here
  ],
  exports: [
    BaseLayoutComponent // Export the component you want to make accessible outside the module
  ],

})
export class PrivateModule { }
