import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelGroupAddComponent } from './edit-model-group-add.component';

describe('EditModelGroupAddComponent', () => {
  let component: EditModelGroupAddComponent;
  let fixture: ComponentFixture<EditModelGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
