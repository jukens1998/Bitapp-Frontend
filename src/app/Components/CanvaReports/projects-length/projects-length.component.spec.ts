import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsLengthComponent } from './projects-length.component';

describe('ProjectsLengthComponent', () => {
  let component: ProjectsLengthComponent;
  let fixture: ComponentFixture<ProjectsLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
