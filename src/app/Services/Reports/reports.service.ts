import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public myAppUrl = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  // Gets all the projects to  show on the reports area
  public projectsReport() {
    const fd = new FormData();
    return this.http.post(this.myAppUrl + 'api/report/projects', fd);
  }
}
