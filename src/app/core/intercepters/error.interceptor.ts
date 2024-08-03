import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _snackBar = inject(MatSnackBar);
  const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  const verticalPosition: MatSnackBarVerticalPosition = 'top';
  return next(req).pipe(
    catchError((err) => {
      _snackBar.open('An Error Occurred', 'Ok', {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
      });

      return throwError(() => err);
    })
  );
};
