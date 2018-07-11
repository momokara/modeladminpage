import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindpswComponent } from './findpsw.component';

describe('FindpswComponent', () => {
  let component: FindpswComponent;
  let fixture: ComponentFixture<FindpswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindpswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindpswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
