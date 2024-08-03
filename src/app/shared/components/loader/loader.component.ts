import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: ` @if (loading$()) {
    <div class="splash-screen">
      <div class="splash-loader"></div>
      <img class="splash-logo" src="assets/images/logos/maidcss_white.png" />
    </div>
    }`,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loading$ = inject(LoaderService).isLoading$;
}
