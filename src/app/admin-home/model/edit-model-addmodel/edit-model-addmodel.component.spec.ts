import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelAddmodelComponent } from './edit-model-addmodel.component';

describe('EditModelAddmodelComponent', () => {
  let component: EditModelAddmodelComponent;
  let fixture: ComponentFixture<EditModelAddmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelAddmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelAddmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
