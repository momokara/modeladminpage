import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmodelpageComponent } from './editmodelpage.component';

describe('EditmodelpageComponent', () => {
  let component: EditmodelpageComponent;
  let fixture: ComponentFixture<EditmodelpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmodelpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmodelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
