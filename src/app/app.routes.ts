import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: {
      title: 'Accueil',
      description: 'Portfolio de Romance Nguema, développeur full-stack — Angular, Node.js, MongoDB, Flutter.'
    }
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    data: {
      title: 'À propos',
      description: 'Parcours, formation et soft skills de Romance Nguema, étudiant développeur à Bessieux / INPTIC.'
    }
  },
  {
    path: 'competences',
    loadComponent: () => import('./features/skills/skills.component').then((m) => m.SkillsComponent),
    data: {
      title: 'Compétences',
      description: 'Compétences techniques de Romance Nguema : frontend, backend, bases de données, mobile et outils.'
    }
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./features/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
    data: {
      title: 'Portfolio',
      description: 'Projets web et mobile de Romance Nguema, filtrables par catégorie et technologie.'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      title: 'Contact',
      description: 'Contacter Romance Nguema pour un stage, une alternance ou une mission.'
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
    data: { title: 'Page introuvable' }
  }
];
