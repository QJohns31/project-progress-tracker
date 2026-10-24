import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTaskManager } from './project-task-manager';

describe('ProjectTaskManager', () => {
  let component: ProjectTaskManager;
  let fixture: ComponentFixture<ProjectTaskManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTaskManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
