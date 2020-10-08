import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateService } from 'src/app/Services/Date/date.service';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-pacs',
  styleUrls: ['./pacs.component.css'],
  templateUrl: './pacs.component.html',
})
export class PAcsComponent implements OnInit {

  // Finished project active button status
  disabledFinish: boolean = true;
  // Load the available task of the selected project
  public projectDateArray: any[];
  // Var to manage data from the active project
  public projectName: string;
  public actualSprint;
  public springdates;

  // Var to manage the actual date
  public actualDate: any;
  // forms Management
  public form: FormGroup;

  constructor(private date: DateService, private pacs: PAcsService, private fb: FormBuilder, private router: Router) {
    this.createForm();
    // Calculate all the dates refered to a project
    this.projectDates();
  }

  public ngOnInit(): void {
    this.actualSprint = this.date.actuallSprint(this.projectDateArray);

    // gets the data of the actual project
    this.dataProject();

    // Gets the actual date
    this.actualDate = this.date.getDate();

    // Spring Data
    this.sprintData();
  }

  changeCheck(event) {
    this.disabledFinish = !this.disabledFinish;
  }
  // Creates an array to iterate the actual amount of sprints
  sprints(): any[] {
    const n = Number(localStorage.getItem('sprintsAmount'));
    return Array(n);
  }
  // Gets data about project / actual sprint sprints range
  public sprintData() {
    localStorage.getItem('creationDate');
    localStorage.getItem('sprintsAmount');
    localStorage.getItem('sprintsDuration');
  }

  // Creates the form name, creation_date, task_description, priority_points, sprint_location, status, project_id
  public createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      priority_points: ['', [Validators.required]],
      sprint_location: ['', [Validators.required]],
      status: ['', [Validators.required]],
      task_description: ['', [Validators.required]],
    });
  }

  // Manage all the times relate to the scrum plan
  public sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  public projectDates() {
    this.projectDateArray = this.date.addDays(localStorage.getItem('creationDate'), parseInt(localStorage.getItem('sprintsAmount'), 0),
      parseInt(localStorage.getItem('sprintsDuration'), 0));
  }
  public createPacsTask() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => { control.markAsTouched(); });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
      // Creates the form name, creation_date, task_description, priority_points, sprint_location, status, project_id
      this.pacs.createPAcsTask(this.form.get('name').value, this.actualDate, this.form.get('task_description').value, this.form.get('priority_points').value, this.form.get('sprint_location').value, this.form.get('status').value).subscribe((result) => {
        // success events
        this.pacs.stateChange$.emit();
        Swal.close();
        Swal.fire('Registro realizado',
          'La tarea se ha registrado',
          'success');
        // cleaning the form after a post
        $('#exampleModal').modal('hide');
        this.form.reset();
        console.log(result);
        // this.getTasks(); to get the object and set pacs tasks
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la tarea',
        });
      });
    }
  }

  //Change the status of the active project to complete
  public projectStatus() {
    this.pacs.projectState().subscribe((result) => {
      this.router.navigateByUrl('/pacsHome');
    });
  }

  // Validations
  get nameNoValido() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get task_descriptionNoValido() {
    return this.form.get('task_description').invalid && this.form.get('task_description').touched;
  }
  get priority_pointsNoValido() {
    return this.form.get('priority_points').invalid && this.form.get('priority_points').touched;
  }
  get sprint_locationNoValido() {
    return this.form.get('sprint_location').invalid && this.form.get('sprint_location').touched;
  }
  get statusNoValido() {
    return this.form.get('status').invalid && this.form.get('status').touched;
  }

  // set all the variables to manage the values of the actul project
  public dataProject() {
    this.projectName = localStorage.getItem('project_name');
  }
}
