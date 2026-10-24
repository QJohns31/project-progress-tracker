import { Component } from '@angular/core';

// Structure of a milestone kept inside this component
interface TrackerMilestone {
  title: string;
  dueDate: string;
  completed: boolean;
}

@Component({
  imports: [],
  selector: 'app-milestone-tracker',
  styleUrl: './milestone-tracker.css',
  templateUrl: './milestone-tracker.html',
})
export class MilestoneTracker {

  // Milestones stored in the component (lost on browser refresh)
  milestones: TrackerMilestone[] = [
    { title: 'Project Setup', dueDate: '2026-08-31', completed: true },
    { title: 'Create Angular Components', dueDate: '2026-09-14', completed: true },
    { title: 'Implement Reactive Forms', dueDate: '2026-10-05', completed: true },
    { title: 'Develop Express Backend', dueDate: '2026-10-26', completed: false },
    { title: 'Connect MongoDB', dueDate: '2026-11-09', completed: false }
  ];

  // Mark a milestone complete or incomplete
  toggleMilestone(milestone: TrackerMilestone): void {
    milestone.completed = !milestone.completed;
  }

  // Count completed milestones
  get completedCount(): number {
    return this.milestones.filter(m => m.completed).length;
  }
}
