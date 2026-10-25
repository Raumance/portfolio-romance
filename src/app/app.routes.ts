import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: {
      title: 'Romance Nguema — Développeur web et mobile à Libreville',
      titleAbsolute: true,
      description:
        'Romance Nguema, développeur web et mobile à Libreville (Gabon). Portfolio d’applications Angular, Node.js, MongoDB et Flutter.'
    }
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    data: {
      title: 'À propos',
      description:
        'Parcours de Romance Nguema, développeur full-stack à Libreville : formation INPTIC, projets MEAN et applications Flutter.'
    }
  },
  {
    path: 'competences',
    loadComponent: () => import('./features/skills/skills.component').then((m) => m.SkillsComponent),
    data: {
      title: 'Compétences',
      description:
        'Compétences de Romance Nguema, développeur à Libreville : Angular, Node.js, MongoDB, Flutter, TypeScript et outils.'
    }
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./features/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
    data: {
      title: 'Portfolio',
      description:
        'Portfolio de Romance Nguema à Libreville : applications web et mobiles — Ovea, Waz’up, Calculs BTP, Talk to Me.'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      title: 'Contact',
      description:
        'Contacter Romance Nguema, développeur web et mobile à Libreville, pour un stage, une alternance ou une mission.'
    }
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./features/legal/legal.component').then((m) => m.LegalComponent),
    data: {
      title: 'Mentions légales',
      description: 'Mentions légales du site portfolio de Romance Nguema.'
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    data: { title: 'Administration' }
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    data: {
      title: 'Page introuvable',
      description: 'Cette page n’existe pas sur le portfolio de Romance Nguema.',
      robots: 'noindex, nofollow'
    }
  }
];
