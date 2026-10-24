import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // withNoHttpTransferCache() makes the browser send its own GET /milestones request,
    // so it appears in Chrome DevTools (Network tab) instead of being reused from server-side rendering.
    provideClientHydration(withNoHttpTransferCache()),
    // Register HttpClient so services can talk to the Express back end.
    // withFetch() is recommended because this project uses server-side rendering (SSR).
    provideHttpClient(withFetch())
  ]
};
