import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },{
    path: 'login',
    component: LoginComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule {
 }
