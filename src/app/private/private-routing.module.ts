import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './sharedLayout/base-layout/base-layout.component';
import { SidbarComponent } from './sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './sharedLayout/header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartementComponent } from './departement/departement.component';

const routes: Routes = [
  {
    path:'dashbord',component:BaseLayoutComponent,children:[
        {
      path:'employee',component:EmployeeComponent
    },
    {
      path:'departement',component:DepartementComponent
    }
    // ,{
    //    path:'header',component:HeaderComponent
    // }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
 }