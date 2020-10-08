import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  // Observable to asign users asignables
  public userStateChange$ = new EventEmitter<any[]>();

  // Mange the values of the user id and project id
  private userId: string;
  private projectId: string;

  public myAppUrl = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  public getUserId() {
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }
  public setUserId(mail: string) {
    this.userId = mail.replace('@cemex.com', '');
    localStorage.setItem('userId', this.userId);
  }

  // Reads the active project from the user
  public getProjectID() {
    this.projectId = localStorage.getItem('project_id');
    return this.projectId;
  }

  // Http methods//////////////////////////////////////////////////////////////////////////////////

  // list all the available users to asign projects
  public getUsersToAsignProject() {
    const fd = new FormData();
    const value = this.getProjectID();
    fd.append('project_id', value);
    return this.http.post(this.myAppUrl + 'api/users/asignUserProject', fd);
  }

  // list all the available users to asign tasks
  public getUsersToAsignProjectTask() {
    const fd = new FormData();
    const value = this.getProjectID();
    fd.append('project_id', value);
    return this.http.post(this.myAppUrl + 'api/users/asignProjectTaskUser', fd);
  }
}
