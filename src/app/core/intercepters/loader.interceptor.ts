import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let _loaderService = inject(LoaderService);
  _loaderService.showLoader();
  return next(req).pipe(finalize(() => _loaderService.hideLoader()));
};
