import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './sharedLayout/base-layout/base-layout.component';
import { SidbarComponent } from './sharedLayout/sidbar/sidbar.component';
import { HeaderComponent } from './sharedLayout/header/header.component';

const routes: Routes = [
  {
    path:'',component:BaseLayoutComponent,children:[
        // {
    //   path:'',component:SidbarComponent
    // },{
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