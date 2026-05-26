import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <--- שינוי כאן

bootstrapApplication(AppComponent, appConfig) // <--- שינוי כאן
  .catch((err) => console.error(err));