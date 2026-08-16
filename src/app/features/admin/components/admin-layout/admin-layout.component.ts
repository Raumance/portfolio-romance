import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AdminInboxService } from '../../../../core/services/admin-inbox.service';
import { AdminNoticeService } from '../../../../core/services/admin-notice.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly inbox = inject(AdminInboxService);
  readonly notice = inject(AdminNoticeService);

  constructor() {
    this.inbox.startPolling();
    inject(DestroyRef).onDestroy(() => this.inbox.stopPolling());
  }

  logout(): void {
    this.inbox.stopPolling();
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
