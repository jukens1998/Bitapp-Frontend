import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';
import { UserIdService } from 'src/app/Services/User/user-id.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asign',
  styleUrls: ['./asign.component.css'],
  templateUrl: './asign.component.html',
})
export class AsignComponent implements OnInit {

  // var to manage the available users to asign
  public usersProject;
  public tasksAsign;

  // var to manage the available users to asign
  public usersProjectTask;

  // Var to manage data from the active project
  public projectName: string;
  private projectId;

  // Var to manage forms
  public formProject: FormGroup;
  public formTask: FormGroup;

  constructor(private Pacs: PAcsService, private fb: FormBuilder, private User: UserIdService) {
    // Create the formProject
    this.createFormProject();
    this.createFormTask();
    // Set all the values from task and users asignables
    this.readsUserProject();
    this.readsUserProjectTasks();
    this.listTaskAsign();
  }

  public ngOnInit() {
    // Gets the data project from the local storage
    this.dataProject();

    // Observable from users avaliables
    this.Pacs.stateChange$.subscribe(() => {
      this.readsUserProject();
      this.readsUserProjectTasks();
      this.listTaskAsign();
    });
  }

  // Creates formProject
  public createFormProject() {
    this.formProject = this.fb.group({
      userProject: ['', [Validators.required]],
    });
  }
  // Creates formProject
  public createFormTask() {
    this.formTask = this.fb.group({
      taskToAsign: ['',[Validators.required]],
      userTask: ['', [Validators.required]],
    });
  }

  // Gets the activeproject data
  public dataProject() {
    this.projectName = localStorage.getItem('project_name');
    this.projectId = localStorage.getItem('project_id');
  }

  // asign an user to an active project
  public asignUserProject() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();
    this.Pacs.setUserProject(this.formProject.get('userProject').value).subscribe(() => {
      // Observable emmits
      this.Pacs.stateChange$.emit();
      Swal.close();
      Swal.fire({
        icon: 'success',
        text: 'Se ha realizado el registro',
        title: 'Se ha asignado al usuario',
      });
      this.formProject.reset();
    }, (error) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        text: error,
        title: 'Error al asignar el proyecto',
      });
      console.log(error);
    });
  }

  // Asign an user to an active project
  public asignUserTaskProject() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();
    this.Pacs.setUserTaskProject(this.formTask.get('taskToAsign').value, this.formTask.get('userTask').value).subscribe((result) => {

      // Observable Emmits
      this.Pacs.stateChange$.emit();
      Swal.close();
      Swal.fire({
        icon: 'success',
        text: 'Se ha realizado el registro',
        title: 'Se ha asignado al usuario',
      });

      this.formTask.reset();

    }, (error) => {

      Swal.close();
      Swal.fire({
        icon: 'error',
        text: error,
        title: 'Error al asignar el proyecto',
      });

    });
  }

  // reads all the users available to asign to a project
  public readsUserProject() {
    this.User.getUsersToAsignProject().subscribe((result) => {
      this.usersProject = result;
    });
  }

  // reads all the users available to asign to a project task
  public readsUserProjectTasks() {
    this.User.getUsersToAsignProjectTask().subscribe((result) => {
      this.usersProjectTask = result;
    });
  }

  // reads all the users available to asign to a project task
  public listTaskAsign() {
    this.Pacs.listTaskToAsign().subscribe((result) => {
      this.tasksAsign = result;
    });
  }
}
