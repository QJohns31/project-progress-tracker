import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { ProjectRecordApi } from '../project-record-api';
import { ProjectRecord } from '../project-record';

// Due date must be on or after the start date
function dueAfterStart(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const due = group.get('dueDate')?.value;
  return start && due && due < start ? { dueBeforeStart: true } : null;
}

// Lab 5: One component that creates, reads (list + details), updates, and deletes project records
@Component({
  selector: 'app-project-records',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './project-records.html',
  styleUrl: './project-records.css'
})
export class ProjectRecords implements OnInit {

  private fb = inject(FormBuilder);
  private api = inject(ProjectRecordApi);

  // Dropdown options
  statuses = ['Not Started', 'In Progress', 'On Hold', 'Completed'];
  priorities = ['Low', 'Medium', 'High'];

  // Component state (signals update the view automatically)
  records = signal<ProjectRecord[]>([]);
  selectedRecord = signal<ProjectRecord | null>(null);
  editingId = signal<string | null>(null);
  pendingDeleteId = signal<string | null>(null);
  loading = signal(false);
  message = signal('');
  errorMessage = signal('');

  // Project record form: eight input fields
  recordForm = this.fb.nonNullable.group({
    projectCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3,4}\d{3}$/)]],
    projectName: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    projectManager: ['', Validators.required],
    startDate: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['Not Started', Validators.required],
    priority: ['Medium', Validators.required]
  }, { validators: dueAfterStart });

  ngOnInit(): void {
    this.loadRecords();
  }

  // READ (all): GET /project-records
  loadRecords(): void {
    this.loading.set(true);
    this.api.getRecords().subscribe({
      next: data => {
        this.records.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.showError('Unable to load project records. Is the Express/MongoDB server running?', err);
      }
    });
  }

  // READ (one): GET /project-records/:id
  viewRecord(id: string): void {
    this.api.getRecord(id).subscribe({
      next: record => this.selectedRecord.set(record),
      error: err => this.showError('Unable to load the project details.', err)
    });
  }

  closeDetails(): void {
    this.selectedRecord.set(null);
  }

  // Load a record into the form for editing
  startEdit(record: ProjectRecord): void {
    this.editingId.set(record._id);
    this.recordForm.setValue({
      projectCode: record.projectCode,
      projectName: record.projectName,
      description: record.description,
      projectManager: record.projectManager,
      startDate: record.startDate.substring(0, 10),
      dueDate: record.dueDate.substring(0, 10),
      status: record.status,
      priority: record.priority
    });
    this.clearMessages();
  }

  cancelEdit(): void {
    this.resetForm();
    this.clearMessages();
  }

  // CREATE (POST) or UPDATE (PUT), depending on whether a record is being edited
  onSubmit(): void {
    if (this.recordForm.invalid) {
      this.recordForm.markAllAsTouched();
      return;
    }

    const data = this.recordForm.getRawValue();
    data.projectCode = data.projectCode.toUpperCase();
    const id = this.editingId();

    if (id) {
      this.api.updateRecord(id, data).subscribe({
        next: updated => {
          this.records.update(list => list.map(r => (r._id === id ? updated : r)));
          if (this.selectedRecord()?._id === id) {
            this.selectedRecord.set(updated);
          }
          this.resetForm();
          this.showMessage(`Project "${updated.projectName}" updated successfully.`);
        },
        error: err => this.showError('Update failed.', err)
      });
    } else {
      this.api.createRecord(data).subscribe({
        next: saved => {
          this.records.update(list => [saved, ...list]);
          this.resetForm();
          this.showMessage(`Project "${saved.projectName}" saved successfully.`);
        },
        error: err => this.showError('Save failed.', err)
      });
    }
  }

  // DELETE step 1: ask for confirmation
  askDelete(id: string): void {
    this.pendingDeleteId.set(id);
  }

  cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  // DELETE step 2: DELETE /project-records/:id
  confirmDelete(record: ProjectRecord): void {
    this.api.deleteRecord(record._id).subscribe({
      next: () => {
        this.records.update(list => list.filter(r => r._id !== record._id));
        if (this.selectedRecord()?._id === record._id) {
          this.selectedRecord.set(null);
        }
        if (this.editingId() === record._id) {
          this.resetForm();
        }
        this.pendingDeleteId.set(null);
        this.showMessage(`Project "${record.projectName}" deleted.`);
      },
      error: err => this.showError('Delete failed.', err)
    });
  }

  // True when a field has been touched and is invalid
  invalid(field: string): boolean {
    const control = this.recordForm.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  private resetForm(): void {
    this.editingId.set(null);
    this.recordForm.reset();
  }

  private showMessage(text: string): void {
    this.errorMessage.set('');
    this.message.set(text);
  }

  private showError(text: string, err: unknown): void {
    console.error(text, err);
    this.message.set('');
    this.errorMessage.set(text);
  }

  private clearMessages(): void {
    this.message.set('');
    this.errorMessage.set('');
  }
}
