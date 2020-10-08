import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BinacleService } from 'src/app/Services/BinacleServices/binacle-services.service';
import { DateService } from 'src/app/Services/Date/date.service';
import { UserIdService } from 'src/app/Services/User/user-id.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-binnacle',
  styleUrls: ['./binnacle.component.css'],
  templateUrl: './binnacle.component.html',
})
export class BinnacleComponent implements OnInit {

  // user variables
  public userId = '...';

  // mange the inicio tareas state
  public disableBtn = true;

  // Mangae the lunch time button state
  public disableBtnLunch;

  // forms Management
  public form: FormGroup;

  // Global time variables
  public globalhour: any = `00`;
  public globalminute: any = `00`;
  public globalamPm: any = 'MM';
  public time: string;

  // chronometer time variables
  public chronohours: any = `00`;
  public chronominutes: any = `00`;
  public chronoseconds: any = `00`;
  private chronoInterval: any;

  // global tasks Variables
  public tasks: any;
  public taskTime = 0;
  public taskTimeExtraDuration = 0;
  public totalTaskTime = 0;

  // constructor
  constructor(private Binnacle: BinacleService, private fb: FormBuilder, private userIdService: UserIdService, public router: Router, private date: DateService) {
    this.createForm();
  }

  public ngOnInit(): void {
    // gets the actual state of the lunch button
    this.disableBtnLunch = localStorage.getItem('Lunch');

    // Set the actual date
    this.date.getDate();

    // set the value of the user id
    this.userId = this.userIdService.getUserId();

    // gets all the tasks from the database
    this.getTasks();

    // update the time every second
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);
  }

  // forms Management functions
  public createForm() {
    this.form = this.fb.group({
      activity_type_id: ['', [Validators.required]],
      area_id: ['', [Validators.required]],
      commentary: ['', [Validators.required]],
      extra_duration: ['', [Validators.required]],
      name: ['', [Validators.required]],
      task_description: ['', [Validators.required]],
      tool_id: ['', [Validators.required]],
    });
  }

  // Validations
  get nameNoValido() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get extra_durationNoValido() {
    return this.form.get('extra_duration').invalid && this.form.get('extra_duration').touched;
  }
  get tool_idNoValido() {
    return this.form.get('tool_id').invalid && this.form.get('tool_id').touched;
  }
  get activity_type_idNoValido() {
    return this.form.get('activity_type_id').invalid && this.form.get('activity_type_id').touched;
  }
  get area_idNoValido() {
    return this.form.get('area_id').invalid && this.form.get('area_id').touched;
  }
  get commentaryNoValido() {
    return this.form.get('commentary').invalid && this.form.get('commentary').touched;
  }
  get task_descriptionNoValido() {
    return this.form.get('task_description').invalid && this.form.get('task_description').touched;
  }

  // forms Management ends *******************************************

  // Tasks management
  public createTask() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => { control.markAsTouched(); });
    } else {
      this.timeToMinutes();
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
      this.Binnacle.postTask(this.form.get('name').value, this.taskTimeExtraDuration, this.form.get('extra_duration').value, this.form.get('tool_id').value, this.form.get('activity_type_id').value, this.form.get('area_id').value, this.userId, this.form.get('commentary').value, this.form.get('task_description').value, this.date.getDate()).subscribe((result) => {
        // success events
        Swal.close();
        Swal.fire('Registro realizado',
          'La tarea se ha registrado',
          'success');
        // setting amount of time whe the proces is success
        this.totalTime();
        // eneable or disable th play button
        this.playButton(true);
        // cleaning the form after a post
        $('#exampleModal').modal('hide');
        this.form.reset();
        console.log(result);
        this.getTasks();
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: err,
          title: 'Error al registrar la tarea',
        });
      });
    }
  }
  public getTasks() {
    this.Binnacle.getTasks().subscribe((result) => {
      this.tasks = result;
    }, (error) => console.error(error));
  }

  // Update the time every time this fucntions is called, and set some rules to the time format
  public updateDate(date: Date) {
    const hours = date.getHours();
    this.globalamPm = hours >= 12 ? 'PM' : 'AM';
    this.globalhour = hours % 12;
    this.globalhour = this.globalhour ? this.globalhour : 12;
    this.globalhour = this.globalhour < 10 ? '0' + this.globalhour : this.globalhour;
    // minutes
    const minutes = date.getMinutes();
    this.globalminute = minutes < 10 ? '0' + minutes : minutes.toString();
    this.time = this.globalhour + ':' + this.globalminute + this.globalamPm;

  }

  // updates the task chronometer and gives some time format
  public taskChronometer() {
    this.chronoseconds++;
    if (this.chronoseconds < 10) { this.chronoseconds = `0` + this.chronoseconds; }
    if (this.chronoseconds > 59) {
      this.chronoseconds = `00`;
      this.chronominutes++;
      if (this.chronominutes < 10) { this.chronominutes = `0` + this.chronominutes; }
    }
    if (this.chronominutes > 59) {
      this.chronominutes = `00`;
      this.chronohours++;
      if (this.chronohours < 10) { this.chronohours = `0` + this.chronohours; }
    }
  }

  // manage the playButton state
  public playButton(state) {
    this.disableBtn = state;
  }

  // manage the state of the chronometer
  public playChronometer() {
    // update the chronometer every second
    this.chronoInterval = setInterval(() => {
      this.taskChronometer();
    }, 1000);
    this.playButton(false);
  }
  // Pause the chronometer
  public pauseChronometer() {
    this.playButton(true);
    clearInterval(this.chronoInterval);
    this.timeToMinutes();
  }
  // Pause the chronometer on the lunch status
  public pauseChronometerLunch() {
    this.pauseChronometer();
    this.disableBtnLunch = false;
    $('#staticBackdrop').modal('show');
  }

  //Reset the time on the chronometer
  public resetChronometer() {
    clearInterval(this.chronoInterval);
    this.chronohours = '00';
    this.chronominutes = '00';
    this.chronoseconds = '00';
  }

  // Turns the time to minutes
  public timeToMinutes() {
    this.taskTime = Number(this.chronohours) * 60;
    this.taskTime += Number(this.chronominutes);
    this.taskTimeExtraDuration = Number(this.taskTime) + Number(this.form.get('extra_duration').value);
  }

  //Calculate the total amount of time
  public totalTime() {
    this.totalTaskTime += Number(this.taskTimeExtraDuration);
    this.taskTime = 0;
    this.resetChronometer();
  }

  // Lunch state
  public lunchState() {
    localStorage.setItem('Lunch', 'false');
    this.disableBtnLunch = localStorage.getItem('Lunch');
  }

  // End journey state
  public endJourneyModal() {
    $('#journeyEndModal').modal('show');
  }
  public endJourney() {
    localStorage.setItem('Lunch', 'true');
    $('#journeyEndModal').modal('hide');
    this.router.navigateByUrl('/login');
  }
}
