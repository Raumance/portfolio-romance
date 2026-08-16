import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./projects-manager/projects-manager.component').then((m) => m.ProjectsManagerComponent)
      },
      {
        path: 'skills',
        loadComponent: () => import('./skills-manager/skills-manager.component').then((m) => m.SkillsManagerComponent)
      },
      {
        path: 'experiences',
        loadComponent: () => import('./experiences-manager/experiences-manager.component').then((m) => m.ExperiencesManagerComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile-manager/profile-manager.component').then((m) => m.ProfileManagerComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./messages-manager/messages-manager.component').then((m) => m.MessagesManagerComponent)
      }
    ]
  }
];
