import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleUserInfoComponent } from './edit-single-user-info.component';

describe('EditSingleUserInfoComponent', () => {
  let component: EditSingleUserInfoComponent;
  let fixture: ComponentFixture<EditSingleUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSingleUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
