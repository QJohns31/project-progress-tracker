import { Routes } from '@angular/router';
import { ProjectCrud } from './project-crud/project-crud';
import { ProjectForm } from './project-form/project-form';
import { ProjectRecords } from './project-records/project-records';

export const routes: Routes = [

   // Home page: shows the earlier weekly components only
  {
    path: '',
    pathMatch: 'full',
    children: []
  },

  // Display all projects
  {
    path: 'projects',
    component: ProjectCrud
  },

  // Add a new project
  {
    path: 'projects/new',
    component: ProjectForm
  },

  // Edit an existing project
  {
    path: 'projects/edit/:id',
    component: ProjectForm
  },

  // Lab 5: single-component CRUD for project records
  {
    path: 'project-records',
    component: ProjectRecords
  }

];
