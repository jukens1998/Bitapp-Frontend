import { Component, OnInit } from '@angular/core';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';

@Component({
  selector: 'app-tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {

  // Var to manage th state of tasks
  public taskEmpty;

  // Array than contains the doing tasks
  public doingStateTasks: any[] = null;

  constructor(private Pacs: PAcsService) {
  }

  public ngOnInit() {

    // List the active tasks per user_id and project_id active
    this.list();

    // Subscribe to changes
    this.Pacs.stateChange$.subscribe(() => {
      this.list();
    });

  }

  // list tasks service
  public list() {
    this.doingStateTasks = this.Pacs.listTasks('Realizando');

  }

  // Update a PAcs task from the active project
  public updateTaskState(status: any, packTaskId: any) {
    this.Pacs.updatePAcsTaskState(status, packTaskId);
  }

}
