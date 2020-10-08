import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPerMonthComponent } from './tasks-per-month.component';

describe('TasksPerMonthComponent', () => {
  let component: TasksPerMonthComponent;
  let fixture: ComponentFixture<TasksPerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksPerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
