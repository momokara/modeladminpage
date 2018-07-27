import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelFilehomeComponent } from './edit-model-filehome.component';

describe('EditModelFilehomeComponent', () => {
  let component: EditModelFilehomeComponent;
  let fixture: ComponentFixture<EditModelFilehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelFilehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelFilehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
