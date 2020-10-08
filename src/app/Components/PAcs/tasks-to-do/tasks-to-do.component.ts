import { Component, OnInit } from '@angular/core';
import { PAcsService } from 'src/app/Services/PAcs/pacs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-to-do',
  styleUrls: ['./tasks-to-do.component.css'],
  templateUrl: './tasks-to-do.component.html',
})
export class TasksToDoComponent implements OnInit {

  public esperaStateTasks: any[];
  constructor(private pacs: PAcsService) {
  }

  public ngOnInit() {
    // List the active tasks per user_id and project_id active
    this.list();
    // Subscruibe to changes
    this.pacs.stateChange$.subscribe(() => {
      this.list();
    });
  }

  // list service
  public list() {
    this.esperaStateTasks = this.pacs.listTasks('Espera');
  }
  // update a PAcs task from the active project
  public updateTaskState(status, packTaskId) {
    this.pacs.updatePAcsTaskState(status, packTaskId);
  }
}
