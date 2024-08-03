import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private apiCount = 0;
  private isLoadingSignal = signal<boolean>(false);
  isLoading$ = computed(this.isLoadingSignal);

  constructor() {}

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSignal.set(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSignal.set(false);
    }
  }
}
