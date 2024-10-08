import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiDataService } from './api-data.service';

describe('ApiDataService', () => {
  let service: ApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Add this line
      providers: [ApiDataService]  // Ensure the service is provided
    });
    service = TestBed.inject(ApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
