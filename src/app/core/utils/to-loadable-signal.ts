import { computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap, type Observable } from 'rxjs';

export function toLoadableSignal<T>(source: Observable<T>, fallback: T) {
  const resolved = signal(false);
  const data = toSignal(
    source.pipe(
      tap(() => resolved.set(true)),
      catchError(() => {
        resolved.set(true);
        return of(fallback);
      })
    ),
    { initialValue: fallback }
  );

  return {
    data,
    isLoading: computed(() => !resolved())
  };
}
