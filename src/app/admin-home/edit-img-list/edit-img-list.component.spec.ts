import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImgListComponent } from './edit-img-list.component';

describe('EditImgListComponent', () => {
  let component: EditImgListComponent;
  let fixture: ComponentFixture<EditImgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
