import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';
import { SIDEBAR_LIST } from '../../../core/data/side-bar-list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatBadgeModule,
    OverlayModule,
    MatListModule,
    RouterOutlet,
    RouterLinkActive,
    LayoutModule,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  isOpen = false;
  sideBarToggle = false;
  list = SIDEBAR_LIST;
  sideBarMode: MatDrawerMode = 'side';

  constructor(
    breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result.matches) {
          this.sideBarMode = 'over';
          this.sideBarToggle = false;
        } else {
          this.sideBarMode = 'side';
          this.sideBarToggle = true;
        }
      });
  }
}
