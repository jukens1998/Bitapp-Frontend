import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsLengthComponent } from './Components/CanvaReports/projects-length/projects-length.component';
import { TasksPerMonthComponent } from './Components/CanvaReports/tasks-per-month/tasks-per-month.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AsignComponent } from './Components/PAcs/asign/asign.component';
import { DocumentsComponent } from './Components/Pacs/documents/documents.component';
import { TasksDoneComponent } from './Components/PAcs/tasks-done/tasks-done.component';
import { TasksToDoComponent } from './Components/PAcs/tasks-to-do/tasks-to-do.component';
import { TasksComponent } from './Components/PAcs/tasks/tasks.component';
import { AssignedProjectsComponent } from './Components/PAcsHome/assigned-projects/assigned-projects.component';
import { CompletedComponent } from './Components/PAcsHome/completed/completed.component';
import { CreateProjectComponent } from './Components/PAcsHome/create-project/create-project.component';
import { ScrumProjectsComponent } from './Components/PAcsHome/scrum-projects/scrum-projects.component';
import { BinnacleComponent } from './Pages/binnacle/binnacle.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { PacsHomeComponent } from './Pages/pacs-home/pacs-home.component';
import { PAcsComponent } from './Pages/pacs/pacs.component';
import { ReportsComponent } from './Pages/reports/reports.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DailyReportComponent } from './Components/CanvaReports/daily-report/daily-report.component';

@NgModule({
  declarations: [
    ReportsComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    BinnacleComponent,
    PAcsComponent,
    PacsHomeComponent,
    TasksComponent,
    TasksToDoComponent,
    TasksDoneComponent,
    AsignComponent,
    AssignedProjectsComponent,
    ScrumProjectsComponent,
    CreateProjectComponent,
    DocumentsComponent,
    CompletedComponent,
    TasksPerMonthComponent,
    ProjectsLengthComponent,
    RegisterComponent,
    DailyReportComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
