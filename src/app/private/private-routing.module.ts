import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './sharedLayout/base-layout/base-layout.component';
import { SidbarComponent } from './sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './sharedLayout/header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartementComponent } from './departement/departement.component';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path:'dashbord',component:BaseLayoutComponent,children:[
        {
      path:'employee',component:EmployeeComponent
    },
    {
      path:'departement',component:DepartementComponent
    }
    ,{
       path:'schedule',component:ScheduleEmployeeComponent
    },{
      path:'project',component:ProjectComponent
   }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
 }