import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-page-loader',
  imports: [],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isNavigating = signal(false);
  showOverlay = signal(false);

  constructor() {
    let overlayTimer: ReturnType<typeof setTimeout> | undefined;

    const hideSplash = () => document.getElementById('app-splash')?.classList.add('is-done');
    const stopNavigation = () => {
      if (overlayTimer) {
        clearTimeout(overlayTimer);
        overlayTimer = undefined;
      }
      this.isNavigating.set(false);
      this.showOverlay.set(false);
      hideSplash();
    };

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isNavigating.set(true);
        overlayTimer = setTimeout(() => {
          if (this.isNavigating()) {
            this.showOverlay.set(true);
          }
        }, 140);
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        stopNavigation();
      }
    });

    afterNextRender(() => {
      if (this.router.navigated) {
        hideSplash();
      }
    });

    const splashFallback = setTimeout(hideSplash, 4000);
    this.destroyRef.onDestroy(() => clearTimeout(splashFallback));
  }
}
