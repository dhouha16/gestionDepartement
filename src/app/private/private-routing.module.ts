import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './sharedLayout/base-layout/base-layout.component';
import { SidbarComponent } from './sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './sharedLayout/header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartementComponent } from './departement/departement.component';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEmplyeesComponent } from './project-emplyees/project-emplyees.component';
import { AuthGuard } from '../guard/auth.guard';
import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';
const routes: Routes = [
  {
    path: 'dashbord', component: BaseLayoutComponent, children: [
      {
        path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin'
            , 'simple_user'
          ]
        }
      },
      {
        path: 'departement', component: DepartementComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin'
          ]
        }
      },
      {
        path: 'project', component: ProjectComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin'
          ]
        }
      }
      , {
        path: 'schedule', component: ScheduleEmployeeComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin'
          ]
        }
      }, {
        path: 'projectEmployee', component: ProjectEmplyeesComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin' , 'simple_user'
          ]
        }
      },
       {
        path: 'contact', component: MapComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin' , 'simple_user'
          ]
        }
      },
    
       {
        path: 'Calendar', component: CalendarComponent, canActivate: [AuthGuard],
        data: {
          role: ['admin' , 'simple_user'
          ]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}