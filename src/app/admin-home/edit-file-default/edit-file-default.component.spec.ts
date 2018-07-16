import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileDefaultComponent } from './edit-file-default.component';

describe('EditFileDefaultComponent', () => {
  let component: EditFileDefaultComponent;
  let fixture: ComponentFixture<EditFileDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFileDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFileDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
