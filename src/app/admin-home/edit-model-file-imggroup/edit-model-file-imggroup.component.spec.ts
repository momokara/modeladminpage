import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelFileImggroupComponent } from './edit-model-file-imggroup.component';

describe('EditModelFileImggroupComponent', () => {
  let component: EditModelFileImggroupComponent;
  let fixture: ComponentFixture<EditModelFileImggroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelFileImggroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelFileImggroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
