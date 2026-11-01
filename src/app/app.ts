import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectOverview } from './project-overview/project-overview';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { TechnologyChecklist } from './technology-checklist/technology-checklist';
import { ProgressNotes } from './progress-notes/progress-notes';
import { ProjectTaskManager } from './project-task-manager/project-task-manager';
import { MilestoneApi } from './milestone-api/milestone-api';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ProjectOverview,
    MilestoneTracker,
    TechnologyChecklist,
    ProgressNotes,
    ProjectTaskManager,
    MilestoneApi
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
