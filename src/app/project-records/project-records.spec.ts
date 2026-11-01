import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProjectRecords } from './project-records';

describe('ProjectRecords', () => {
  let component: ProjectRecords;
  let fixture: ComponentFixture<ProjectRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRecords],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have eight form fields', () => {
    expect(Object.keys(component.recordForm.controls).length).toBe(8);
  });
});
