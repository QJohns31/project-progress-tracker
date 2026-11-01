import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProjectRecordApi } from './project-record-api';

describe('ProjectRecordApi', () => {
  let service: ProjectRecordApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectRecordApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
