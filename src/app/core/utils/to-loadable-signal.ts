import { computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap, type Observable } from 'rxjs';

function withFallback<T>(value: T, fallback: T): T {
  if (Array.isArray(value) && value.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
    return fallback;
  }
  return value;
}

export function toLoadableSignal<T>(source: Observable<T>, fallback: T) {
  const resolved = signal(false);
  const data = toSignal(
    source.pipe(
      map((value) => withFallback(value, fallback)),
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
