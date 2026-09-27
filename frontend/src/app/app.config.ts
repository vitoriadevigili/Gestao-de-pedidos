import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

const AppTheme = definePreset(Aura, {
  semantic: {
    typography: {
      fontFamily: "'Google Sans Flex', sans-serif",
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: AppTheme,
      },
      license:
        'eyJpZCI6IjViZDlkMmM0LWVhOGQtNDliMC1iYzFkLTkyZTZjMDNlNDdmNyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODI3NzkxMTIsImV4cCI6MTgxNDMxNTExMn0.o1KmwTBtpGzfXukNMPDhjdT7CECKQ4RKtrFwF5u6TBzaqHqZG1C0n_KeaBb8ygBTfqTZ6W5N6TfSraADbrYTAg',
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
