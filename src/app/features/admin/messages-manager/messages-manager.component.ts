import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ContactService } from '../../../core/services/contact.service';
import { AdminInboxService } from '../../../core/services/admin-inbox.service';
import { AdminNoticeService } from '../../../core/services/admin-notice.service';
import { ContactMessage } from '../../../core/models/message.model';

@Component({
  selector: 'app-messages-manager',
  imports: [DatePipe],
  templateUrl: './messages-manager.component.html',
  styleUrl: '../projects-manager/projects-manager.component.scss'
})
export class MessagesManagerComponent {
  private contactService = inject(ContactService);
  private inbox = inject(AdminInboxService);
  private notice = inject(AdminNoticeService);

  query = signal('');
  selectedId = signal<string | null>(null);

  messages = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.inbox.messages();
    if (!q) {
      return list;
    }
    return list.filter((message) =>
      `${message.name} ${message.email} ${message.subject} ${message.message}`.toLowerCase().includes(q)
    );
  });

  selectedMessage = computed(() => this.inbox.messages().find((message) => message._id === this.selectedId()) ?? null);
  unreadCount = computed(() => this.inbox.unreadCount());

  selectMessage(message: ContactMessage): void {
    this.selectedId.set(message._id);
    if (message.read) {
      return;
    }

    this.inbox.replace({ ...message, read: true });
    this.contactService.markAsRead(message._id).subscribe({
      next: (updated) => this.inbox.replace(updated),
      error: () => this.inbox.refresh()
    });
  }

  replyTo(message: ContactMessage): void {
    const subject = encodeURIComponent(`Re: ${message.subject}`);
    window.open(`mailto:${message.email}?subject=${subject}`, '_self');
  }

  deleteMessage(message: ContactMessage): void {
    if (!confirm(`Supprimer le message de ${message.name} ?`)) return;
    this.contactService.delete(message._id).subscribe({
      next: () => {
        this.inbox.remove(message._id);
        if (this.selectedId() === message._id) {
          this.selectedId.set(null);
        }
        this.notice.success('Message supprimé.');
      },
      error: () => this.notice.error('Suppression impossible.')
    });
  }
}
