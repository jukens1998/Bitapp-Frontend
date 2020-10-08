import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumProjectsComponent } from './scrum-projects.component';

describe('ScrumProjectsComponent', () => {
  let component: ScrumProjectsComponent;
  let fixture: ComponentFixture<ScrumProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
