import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppngModule{}
