import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // MongoDB CRUD pages load their data in the browser.
  // 'projects/edit/:id' cannot be prerendered because its IDs only exist in MongoDB.
  {
    path: 'projects',
    renderMode: RenderMode.Client
  },
  {
    path: 'projects/new',
    renderMode: RenderMode.Client
  },
  {
    path: 'projects/edit/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'project-records',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
