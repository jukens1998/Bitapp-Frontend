import { Component, OnInit } from '@angular/core';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';

@Component({
  selector: 'app-tasks-done',
  styleUrls: ['./tasks-done.component.css'],
  templateUrl: './tasks-done.component.html',
})
export class TasksDoneComponent implements OnInit {
  public DoneStateTasks: any[];
  constructor(private pacs: PAcsService) {
  }

  public ngOnInit() {

    // List the active tasks per user_id and project_id active
    this.list();

    // Subscribe to changes
    this.pacs.stateChange$.subscribe(() => {
      this.list();
    });

  }

  // list service
  public list() {
    this.DoneStateTasks = this.pacs.listTasks('Finalizado');
  }
  
  // update a PAcs task from the active project
  public updateTaskState(status, packTaskId) {
    this.pacs.updatePAcsTaskState(status, packTaskId);
  }
}
