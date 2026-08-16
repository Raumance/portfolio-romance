import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminNoticeService {
  message = signal<string | null>(null);
  kind = signal<'ok' | 'error'>('ok');
  private timer?: ReturnType<typeof setTimeout>;

  success(text: string): void {
    this.show(text, 'ok');
  }

  error(text: string): void {
    this.show(text, 'error');
  }

  private show(text: string, kind: 'ok' | 'error'): void {
    this.message.set(text);
    this.kind.set(kind);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.message.set(null), 3200);
  }
}
