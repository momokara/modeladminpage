import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAdduserComponent } from './edit-user-adduser.component';

describe('EditUserAdduserComponent', () => {
  let component: EditUserAdduserComponent;
  let fixture: ComponentFixture<EditUserAdduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserAdduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserAdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
