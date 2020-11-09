import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';

@Component({
  selector: 'app-scrum-projects',
  styleUrls: ['./scrum-projects.component.css'],
  templateUrl: './scrum-projects.component.html',
})
export class ScrumProjectsComponent implements OnInit {
  public emptyProjects = null;
  public projectsScrum: any;
  constructor(private PAcs: PAcsService, private router: Router) { }

  public ngOnInit() {
    // observable to wait from changes from cretion of project
    this.PAcs.stateChange$.subscribe(() => {
      this.getProjects();
    });
    
    // Load the available task of the selected project
    this.getProjects();
  }
  public getProjects() {
    this.PAcs.getScrumMasterProjects().subscribe((result) => {
      this.projectsScrum = result;
      console.log(result);
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
