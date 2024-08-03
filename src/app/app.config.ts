import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './core/store/app.reducer';
import { UsersEffects } from './core/store/users.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './core/intercepters/loader.interceptor';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CacheInterceptor } from './core/intercepters/cach.interceptor';
import { errorInterceptor } from './core/intercepters/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideStore(appReducer),
    provideEffects([UsersEffects]),
    provideHttpClient(
      withInterceptors([
        loaderInterceptor,
        errorInterceptor,
        CacheInterceptor(),
      ])
    ),
    importProvidersFrom([FormsModule, MatSnackBarModule]),
  ],
};
