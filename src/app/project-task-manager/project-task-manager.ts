import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet, NgClass, NgStyle } from '@angular/common';
import { TaskStatusImage } from '../task-status-image';

@Component({
  selector: 'app-project-task-manager',
  imports: [
    FormsModule,
    NgTemplateOutlet,
    NgClass,
    NgStyle,
    TaskStatusImage
  ],
  templateUrl: './project-task-manager.html',
  styleUrl: './project-task-manager.css'
})
export class ProjectTaskManager {

  // Step 3: Logical condition
  taskName = 'Design User Interface';

  taskCompleted = false;

  // Step 7: Multiple conditions using @switch
  taskStatus = 'In Progress';

  // Step 9: Display project tasks using @for
  tasks = [
    'Design User Interface',
    'Create Database',
    'Develop API',
    'Test Application'
  ];

  // Step 10: Add new project tasks dynamically
  newTask = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  // Step 11: JSON parsing and displaying team members
  teamMembersJSON = `[
    { "firstName": "John", "lastName": "Dow" },
    { "firstName": "Ann", "lastName": "Smith" },
    { "firstName": "Joan", "lastName": "Doe" }
  ]`;

  teamMembers = JSON.parse(this.teamMembersJSON);

  // Step 12: Understanding ng-template
  showReviewMessage = false;
}
