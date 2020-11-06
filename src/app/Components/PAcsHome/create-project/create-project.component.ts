import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from 'src/app/Services/Date/date.service';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  styleUrls: ['./create-project.component.css'],
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent implements OnInit {

  // Array to list the calculated times about the scrum project
  public projectDates: any[];

  // forms Management
  public form: FormGroup;

  // Actual date
  public date: any;

  constructor(private actualDate: DateService, private Pacs: PAcsService, private fb: FormBuilder, private dateService: DateService) {
    this.createForm();
  }

  public ngOnInit() {    
    // Set the actual date
    this.date = this.actualDate.getDate();
  }

  // Set The amount of sprints
  public springsDates() {
    this.projectDates = this.dateService.addDays(this.date, this.form.get('sprints_amount').value, this.form.get('sprints_duration').value,this.form.get('finalization_date').value);
   if (this.projectDates==undefined) {
    this.form.get('sprints_amount').setValue('');
    this.form.get('sprints_duration').setValue('');
   }
  }

  // Creates forms
  public createForm() {
    this.form = this.fb.group({
      creation_date: [{ value: this.actualDate.getDate(), disabled: true }, [Validators.required]],
      finalization_date: ['', [Validators.required]],
      name: ['', [Validators.required]],
      project_description: ['', [Validators.required]],
      sprints_amount: ['', [Validators.required]],
      sprints_duration: ['', [Validators.required]],
    });
  }

  // Form validators
  get nameNoValido() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get finalization_dateNoValido() {
    return this.form.get('finalization_date').invalid && this.form.get('finalization_date').touched;
  }
  get sprints_amountNoValido() {
    return this.form.get('sprints_amount').invalid && this.form.get('sprints_amount').touched;
  }
  get sprints_durationNoValido() {
    return this.form.get('sprints_duration').invalid && this.form.get('sprints_duration').touched;
  }
  get project_descriptionNoValido() {
    return this.form.get('project_description').invalid && this.form.get('project_description').touched;
  }

  // Creates a Project with the rol of scrum master    
  public createProjectScrum() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => { control.markAsTouched(); });
    } else {

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      
      Swal.showLoading();
      this.Pacs.createProject(this.form.get('name').value, this.date, this.form.get('finalization_date').value, this.form.get('sprints_amount').value, this.form.get('project_description').value, 0, this.form.get('sprints_duration').value).subscribe((result) => {
        this.Pacs.stateChange$.emit();
        Swal.close();
        Swal.fire('Registro realizado',
          'La tarea se ha registrado',
          'success');
        this.form.reset();

      }, (error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: error,
          title: 'Error al registrar la tarea',
        });
      });
    }
  }

}
