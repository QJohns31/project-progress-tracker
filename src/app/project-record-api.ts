import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectRecord, ProjectRecordInput } from './project-record';

// Lab 5: Sends CRUD requests for project records to the Express/MongoDB back end
@Injectable({
  providedIn: 'root'
})
export class ProjectRecordApi {

  private http = inject(HttpClient);

  // Express back end (mongodb-server.js) running on port 8001
  private apiUrl = 'http://localhost:8001/project-records';

  // READ: Retrieve all project records (GET)
  getRecords() {
    return this.http.get<ProjectRecord[]>(this.apiUrl);
  }

  // READ: Retrieve one project record by ID (GET)
  getRecord(id: string) {
    return this.http.get<ProjectRecord>(`${this.apiUrl}/${id}`);
  }

  // CREATE: Add a new project record (POST)
  createRecord(record: ProjectRecordInput) {
    return this.http.post<ProjectRecord>(this.apiUrl, record);
  }

  // UPDATE: Modify an existing project record (PUT)
  updateRecord(id: string, record: Partial<ProjectRecordInput>) {
    return this.http.put<ProjectRecord>(`${this.apiUrl}/${id}`, record);
  }

  // DELETE: Remove a project record (DELETE)
  deleteRecord(id: string) {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
