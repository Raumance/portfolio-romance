import { Injectable, computed, inject, signal } from '@angular/core';
import { ContactService } from './contact.service';
import { ContactMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class AdminInboxService {
  private contactService = inject(ContactService);
  private timer?: ReturnType<typeof setInterval>;

  messages = signal<ContactMessage[]>([]);
  unreadCount = computed(() => this.messages().filter((message) => !message.read).length);

  startPolling(): void {
    if (this.timer) {
      return;
    }
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 12000);
  }

  stopPolling(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  refresh(): void {
    this.contactService.getAll().subscribe({
      next: (messages) => this.messages.set(messages),
      error: () => undefined
    });
  }

  replace(message: ContactMessage): void {
    this.messages.update((list) => list.map((item) => (item._id === message._id ? message : item)));
  }

  remove(id: string): void {
    this.messages.update((list) => list.filter((item) => item._id !== id));
  }
}
