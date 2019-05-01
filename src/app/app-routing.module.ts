import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HealthworkindexComponent } from './healthworkindex/healthworkindex.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "app-user-dashboard/:user",
    component: UserDashboardComponent
  },
  {
    path: "app-healthworkindex",
    component: HealthworkindexComponent
  },
  {
    path: '',
    redirectTo: "/app-login",
    pathMatch: 'full'
  },
  {
    path: "app-login",
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
