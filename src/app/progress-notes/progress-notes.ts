import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css'
})
export class ProgressNotes {

  // Create the Progress Notes form
  progressForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl(''),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  // Signal used to display an error message ('' = no message)
  projectCodeError = signal('');

  // Hard-coded project codes and their names
  projectCodes: Record<string, string> = {
    'PPT101': 'Project Progress Tracker',
    'WEB202': 'Website Redesign',
    'APP303': 'Mobile Application Development',
    'DATA404': 'Data Analytics Dashboard'
  };

  // Method called when the user leaves the Project Code field
  onProjectCodeChange(): void {

    // Get the project code entered by the user
    const code = (
      this.progressForm.get('projectCode')?.value || ''
    ).trim().toUpperCase();

    // Find the matching project name using the helper function
    const projectName = this.findProjectName(code);

    // Check whether the project code exists
    if (projectName) {

      // Automatically update the Project Name field
      this.progressForm.get('projectName')?.setValue(projectName);

      // Remove any previous error message
      this.projectCodeError.set('');

    } else {

      // Clear the Project Name field
      this.progressForm.get('projectName')?.setValue('');

      // Display an error only if something was typed
      if (code !== '') {
        this.projectCodeError.set('Project code not found.');
      } else {
        this.projectCodeError.set('');
      }
    }
  }

  // Helper function: returns the project name, or null if not found
  findProjectName(code: string): string | null {
    return this.projectCodes[code] ?? null;
  }

}