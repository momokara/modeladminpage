import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoListComponent } from './edit-video-list.component';

describe('EditVideoListComponent', () => {
  let component: EditVideoListComponent;
  let fixture: ComponentFixture<EditVideoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVideoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
