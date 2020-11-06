import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  constructor() { }

  // Manage the date values
  public getDate() {
    const date = new Date();
    const actualDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
    return actualDate;
  }

  // Format Date
  public formatDate(date) {
    const actualDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
    return actualDate;
  }
  // To sum up days to a Date object
  public addDays(creationDate: any, amountOfSprints: number, sprintsDuration: number, finalization_date: string) {
    let springDuoDates;
    const date = new Date(creationDate);
    const sprintsDates: any[] = [];
    for (let i = 0; i < amountOfSprints; i++) {
      springDuoDates = new Array(2);
      springDuoDates[0] = new Date(date.setDate(date.getDate()));
      springDuoDates[1] = new Date(date.setDate(date.getDate() + sprintsDuration));

      var projectEndDate = new Date(finalization_date);
      if (Date.parse(springDuoDates[1]) >Number( Date.parse(finalization_date))+18000000) {
        Swal.fire(
          '¿ Las fechas estan bien ?',
          'por favor verifica la fecha limite que aplicaste, parece que algo anda mal',
          'question'
        )
        return;
      } else {
        sprintsDates.push(springDuoDates);
      }
    }
    return sprintsDates;
  }

  // Actual  Sprint********************
  public actuallSprint(datos: any[]) {
    let sprint: string;
    for (let i = 0; i < datos.length; i++) {
      if (this.formatDate(datos[i][0]) <= this.getDate() /* && this.getDate() <= this.formatDate(datos[i][1])*/) {
        sprint = 'Sprint #' + i;
      }
    }
    return sprint;
  }
}
