import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsHomeComponent } from './pacs-home.component';

describe('PacsHomeComponent', () => {
  let component: PacsHomeComponent;
  let fixture: ComponentFixture<PacsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
