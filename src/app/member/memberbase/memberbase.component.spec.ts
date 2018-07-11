import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberbaseComponent } from './memberbase.component';

describe('MemberbaseComponent', () => {
  let component: MemberbaseComponent;
  let fixture: ComponentFixture<MemberbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
