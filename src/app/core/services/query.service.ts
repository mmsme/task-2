import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private router: Router) {}

  buildQuery(model: Object) {
    let query: NavigationExtras = {
      queryParams: model,
    };

    let queryTree = this.router.createUrlTree([''], query);
    let queryUrl = this.router.serializeUrl(queryTree).substring(1);

    return queryUrl;
  }
}
