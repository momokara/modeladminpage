import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelFileVideoComponent } from './edit-model-file-video.component';

describe('EditModelFileVideoComponent', () => {
  let component: EditModelFileVideoComponent;
  let fixture: ComponentFixture<EditModelFileVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelFileVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelFileVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
