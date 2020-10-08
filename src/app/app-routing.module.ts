import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { AuthGuard } from './Guards/auth.guard';
import { BinnacleComponent } from './Pages/binnacle/binnacle.component';
import { PAcsComponent } from './Pages/pacs/pacs.component';
import { PacsHomeComponent } from './Pages/pacs-home/pacs-home.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { RegisterComponent } from './Pages/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pacsHome', component: PacsHomeComponent, canActivate: [AuthGuard] },
  { path: 'Bitacora', component: BinnacleComponent, canActivate: [AuthGuard] },
  { path: 'PAcs', component: PAcsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'createUser', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
