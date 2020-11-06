import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserIdService } from '../User/user-id.service';

@Injectable({
  providedIn: 'root',
})
export class PAcsService {
  public stateChange$ = new EventEmitter<any[]>();

  public myAppUrl = '';
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private user: UserIdService
  ) {
    this.myAppUrl = baseUrl;
  }

  // Http methods//////////////////////////////////////////////////////////////////////////////////

  // gets all the active projects
  public getProjects() {
    const fd = new FormData();
    const userId = this.user.getUserId();
    fd.append('user_id', userId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/projects/all', fd);
  }

  // gets all the projects with scrum master rol
  public getScrumMasterProjects() {
    const fd = new FormData();
    const userId = this.user.getUserId();
    fd.append('scrum_master', userId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/projects/allScrum', fd);
  }

  // gets all the completed projects
  public getCompleteProjects() {
    const fd = new FormData();
    return this.http.get(this.myAppUrl + 'api/projects/allComplete');
  }

  // Create a project as scrum master name, scrum_master, creation_date, finalization_date, sprints_amount, project_description, complete
  public createProject(
    name,
    creationDate,
    finalizationDate,
    sprintsAmount,
    projectDescription,
    complete,
    sprintsDuration
  ) {
    const fd = new FormData();
    const scrumMaster = this.user.getUserId();
    fd.append('name', name);
    fd.append('scrum_master', scrumMaster);
    fd.append('creation_date', creationDate);
    fd.append('finalization_date', finalizationDate);
    fd.append('sprints_amount', sprintsAmount);
    fd.append('project_description', projectDescription);
    fd.append('complete', complete);
    fd.append('sprints_duration', sprintsDuration);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/projectScrum/create', fd);
  }

  // Magane all the process about PAcs task
  // Create a new task from the active project
  public createPAcsTask(
    name,
    creationDate,
    taskDescription,
    priorityPoints,
    sprintLocation,
    status
  ) {
    const fd = new FormData();
    const projectId = this.user.getProjectID();
    fd.append('name', name);
    fd.append('creation_date', creationDate);
    fd.append('task_description', taskDescription);
    fd.append('priority_points', priorityPoints);
    fd.append('sprint_location', sprintLocation);
    fd.append('status', status);
    fd.append('project_id', projectId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/ProjectTask/create', fd);
  }

  // Gets all tasks
  public getPAcsTask() {
    const fd = new FormData();
    const user = this.user.getUserId();
    const projectId = this.user.getProjectID();
    fd.append('user_id', user);
    fd.append('project_id', projectId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/ProjectTask/read', fd);
  }

  // Gets the list of available task to asign
  public listTaskToAsign() {
    const fd = new FormData();
    const projectId = this.user.getProjectID();
    fd.append('project_id', projectId);
    fd.append('responseType', 'text');
    return this.http.post(
      this.myAppUrl + 'api/ProjectTask/listTaskToAsign',
      fd
    );
  }

  // Actualiza el estado de una tarea
  public updateTask(status, pacsTaskId) {
    const fd = new FormData();
    fd.append('status', status);
    fd.append('pacs_task_id', pacsTaskId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/ProjectTask/update', fd);
  }

  // Set an user a project
  public setUserProject(userId) {
    const projectId = this.user.getProjectID();
    const fd = new FormData();
    fd.append('project_id', projectId);
    fd.append('user_id', userId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/Project/setUser', fd);
  }

  // Set an user a task project // por finalizar**************************************
  public setUserTaskProject(taskID, userId) {
    const fd = new FormData();
    fd.append('pacs_task_id', taskID);
    fd.append('user_id', userId);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/ProjectTask/setUser', fd);
  }

  // Documents upload
  public uploadDocuments(documentName, objFile, url, projectName, projectId) {
    const fd = new FormData();
    fd.append('documentName', documentName);
    fd.append('files', objFile, url);
    fd.append('projectName', projectName);
    fd.append('projectId', projectId);
    fd.append('Content-Type', 'multipart/form-data');
    fd.append('Accept', 'application/json');
    return this.http.post(this.myAppUrl + 'api/documents/upload', fd);
  }
  // Documents download
  public downloadDocuments(url) {
    const fd = new FormData();
    fd.append('url', url);
    return this.http.post(this.myAppUrl + 'api/documents/download', fd, {
      responseType: 'blob',
    });
  }

  // List all the documents that refers from an especific project
  public documentList() {
    const fd = new FormData();
    const project_id = localStorage.getItem('project_id');
    fd.append('project_id', project_id);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/documents/documentList', fd);
  }

  // 
  public projectState() {
    const fd = new FormData();
    const project_id = localStorage.getItem('project_id');
    fd.append('project_id', project_id);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/project/status', fd);
  }
  // Http methods ends //////////////////////////////////////////////////////////////////////////////////

  // update a PAcs task from the active project
  public updatePAcsTaskState(status, packTaskId) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();
    this.updateTask(status, packTaskId).subscribe(
      () => {
        this.stateChange$.emit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          text: 'Se ha realizado el cambio de estado',
          title: 'Se ha cambiado la tarea',
        });
      },
      (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: err,
          title: 'Error al registrar la tarea',
        });
        console.log(err);
      }
    );
  }

  public listTasks(status) {
    const StateTasks: any[] = [];
    this.getPAcsTask().subscribe(
      (result) => {
        try {
          const arrayTasks = Object.values(result);
          for (let index = 0; index < arrayTasks.length; index++) {
            if (status === arrayTasks[index]['5']) {
              StateTasks.push(arrayTasks[index]);
            } else {
            }
          }
        } catch (error) {
          console.log(
            'There is an object empty, also check the master db to recognize another issue'+error
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
    return StateTasks;
  }
}
