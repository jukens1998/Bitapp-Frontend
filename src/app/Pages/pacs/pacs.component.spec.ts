import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAcsComponent } from './pacs.component';

describe('PAcsComponent', () => {
  let component: PAcsComponent;
  let fixture: ComponentFixture<PAcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
