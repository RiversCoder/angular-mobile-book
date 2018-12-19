import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterScrollComponent } from './better-scroll.component';

describe('BetterScrollComponent', () => {
  let component: BetterScrollComponent;
  let fixture: ComponentFixture<BetterScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetterScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetterScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
