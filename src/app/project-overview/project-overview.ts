import { Component } from '@angular/core';

@Component({
  selector: 'app-project-overview',
  imports: [],
  templateUrl: './project-overview.html',
  styleUrl: './project-overview.css'
})
export class ProjectOverview {

  // Project details displayed using interpolation and property binding
  projectName = 'Project Progress Tracker';
  projectCode = 'PPT101';
  description = 'A MEAN-stack application for tracking project milestones, technologies, notes, and tasks.';
  projectManager = 'Quzhan Johnson';
  startDate = '2026-08-17';
  dueDate = '2026-12-04';
  status = 'In Progress';
  percentComplete = 60;

  // Show or hide the project description
  showDescription = true;

  // Toggle the description (event binding)
  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }
}
