import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

const URLS_PUBLICAS = [
  `${environment.api.url}/auth/login`,
  `${environment.api.url}/auth/cadastro`,
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.api.url) || URLS_PUBLICAS.includes(req.url)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.obterToken();

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
