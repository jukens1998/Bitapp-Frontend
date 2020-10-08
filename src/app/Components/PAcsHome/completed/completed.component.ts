import { Component, OnInit } from '@angular/core';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  // Manage the status if there is no proyects completed
  public emptyProjects = null;

  // List of all the projects completed
  public projects: any;

  constructor(private PAcs: PAcsService, private router: Router) { }

  public ngOnInit() {

    // observable to wait from changes from cretion of project
    this.PAcs.stateChange$.subscribe(() => {
      this.getProjects();
    });

    // Load the available task of the completed projects
    this.getProjects();
  }

  // Calls the service to get all the completed projects
  public getProjects() {
    this.PAcs.getCompleteProjects().subscribe((result) => {
      this.projects = result;
      if (result != null) {
        this.emptyProjects = 'exists';
      }
    }, (error) => console.error(error));
  }

  // Set the clicked projet as active
  public selectProject(projectName, projectId, creationDate, sprintsAmount, sprintsDuration) {
    localStorage.setItem('project_name', projectName);
    localStorage.setItem('project_id', projectId);
    localStorage.setItem('creationDate', creationDate);
    localStorage.setItem('sprintsAmount', sprintsAmount);
    localStorage.setItem('sprintsDuration', sprintsDuration);
    this.router.navigateByUrl('/PAcs');
  }

}
