import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelGroupComponent } from './edit-model-group.component';

describe('EditModelGroupComponent', () => {
  let component: EditModelGroupComponent;
  let fixture: ComponentFixture<EditModelGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
