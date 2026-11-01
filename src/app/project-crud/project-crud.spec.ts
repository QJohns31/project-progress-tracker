import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ProjectCrud } from './project-crud';

describe('ProjectCrud', () => {
  let component: ProjectCrud;
  let fixture: ComponentFixture<ProjectCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCrud],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
