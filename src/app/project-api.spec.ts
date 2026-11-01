import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProjectApi } from './project-api';

describe('ProjectApi', () => {
  let service: ProjectApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
