import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicIndicatorComponent } from './economic-indicator.component';

describe('EconomicIndicatorComponent', () => {
  let component: EconomicIndicatorComponent;
  let fixture: ComponentFixture<EconomicIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EconomicIndicatorComponent]
    });
    fixture = TestBed.createComponent(EconomicIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
