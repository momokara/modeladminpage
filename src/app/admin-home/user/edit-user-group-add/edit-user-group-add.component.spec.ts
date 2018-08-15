import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserGroupAddComponent } from './edit-user-group-add.component';

describe('EditUserGroupAddComponent', () => {
  let component: EditUserGroupAddComponent;
  let fixture: ComponentFixture<EditUserGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
