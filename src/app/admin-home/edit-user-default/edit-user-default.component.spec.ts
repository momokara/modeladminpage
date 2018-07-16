import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDefaultComponent } from './edit-user-default.component';

describe('EditUserDefaultComponent', () => {
  let component: EditUserDefaultComponent;
  let fixture: ComponentFixture<EditUserDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
