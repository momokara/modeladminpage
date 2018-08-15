import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserGroupEditComponent } from './edit-user-group-edit.component';

describe('EditUserGroupEditComponent', () => {
  let component: EditUserGroupEditComponent;
  let fixture: ComponentFixture<EditUserGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
