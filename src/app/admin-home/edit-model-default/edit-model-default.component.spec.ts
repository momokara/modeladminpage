import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelDefaultComponent } from './edit-model-default.component';

describe('EditModelDefaultComponent', () => {
  let component: EditModelDefaultComponent;
  let fixture: ComponentFixture<EditModelDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
