import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsSimulationComponent } from './odds-simulation.component';

describe('OddsSimulationComponent', () => {
  let component: OddsSimulationComponent;
  let fixture: ComponentFixture<OddsSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddsSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
