import { TestBed } from '@angular/core/testing';

import { OddsSimulationService } from './odds-simulation.service';

describe('OddsSimulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OddsSimulationService = TestBed.get(OddsSimulationService);
    expect(service).toBeTruthy();
  });
});
