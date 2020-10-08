import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserIdService } from '../User/user-id.service';

@Injectable({
  providedIn: 'root',
})
export class BinacleService {
  public myAppUrl = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private userId: UserIdService) {
    this.myAppUrl = baseUrl;
  }
  // Get all the binnacle tasjs
  public getTasks() {
    const fd = new FormData();
    const dato = this.userId.getUserId();
    fd.append('user_id', dato);
    fd.append('responseType', 'text');
    return this.http.post(this.myAppUrl + 'api/tasks/all', fd);
  }
  // Http method to post a binnacle task
  public postTask(name, duration, extraDuration, toolId, activityTypeId, areaId, userId, commentary, taskDescription, taskDate) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('duration', duration);
    fd.append('extra_duration', extraDuration);
    fd.append('tool_id', toolId);
    fd.append('activity_type_id', activityTypeId);
    fd.append('area_id', areaId);
    fd.append('user_id', userId);
    fd.append('commentary', commentary);
    fd.append('task_description', taskDescription);
    fd.append('task_date', taskDate);
    fd.append('ssss', 'text');
    console.log(name, duration, extraDuration, toolId, activityTypeId, areaId, userId);
    return this.http.post(this.myAppUrl + 'api/post/task', fd);
  }
}
