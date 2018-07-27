import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelFileVedioComponent } from './edit-model-file-vedio.component';

describe('EditModelFileVedioComponent', () => {
  let component: EditModelFileVedioComponent;
  let fixture: ComponentFixture<EditModelFileVedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModelFileVedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelFileVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
