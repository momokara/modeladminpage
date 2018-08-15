import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelGroupEditComponent } from './edit-model-group-edit.component';

describe('EditModelGroupEditComponent', () => {
  let component: EditModelGroupEditComponent;
  let fixture: ComponentFixture<EditModelGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
