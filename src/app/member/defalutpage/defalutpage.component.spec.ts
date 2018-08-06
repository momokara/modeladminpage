import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefalutpageComponent } from './defalutpage.component';

describe('DefalutpageComponent', () => {
  let component: DefalutpageComponent;
  let fixture: ComponentFixture<DefalutpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefalutpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefalutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
