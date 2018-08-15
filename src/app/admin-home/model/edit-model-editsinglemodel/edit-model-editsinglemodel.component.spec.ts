import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelEditsinglemodelComponent } from './edit-model-editsinglemodel.component';

describe('EditModelEditsinglemodelComponent', () => {
  let component: EditModelEditsinglemodelComponent;
  let fixture: ComponentFixture<EditModelEditsinglemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelEditsinglemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelEditsinglemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
