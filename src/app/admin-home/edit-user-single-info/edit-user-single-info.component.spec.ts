import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSingleInfoComponent } from './edit-user-single-info.component';

describe('EditUserSingleInfoComponent', () => {
  let component: EditUserSingleInfoComponent;
  let fixture: ComponentFixture<EditUserSingleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserSingleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSingleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
