import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../core/models/project.model';
import { ProjectService } from '../../../../core/services/project.service';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { toLoadableSignal } from '../../../../core/utils/to-loadable-signal';

@Component({
  selector: 'app-portfolio-preview',
  imports: [RouterLink, ProjectCardComponent, LoaderComponent],
  templateUrl: './portfolio-preview.component.html',
  styleUrl: './portfolio-preview.component.scss'
})
export class PortfolioPreviewComponent {
  private projectService = inject(ProjectService);
  private loaded = toLoadableSignal<Project[]>(this.projectService.getAll(), []);
  private allProjects = this.loaded.data;
  readonly isLoading = this.loaded.isLoading;

  private fallbackFeaturedProjects: Project[] = [
    {
      _id: 'ovea-fallback',
      title: 'Ovea',
      shortDescription: 'Application Flutter de gestion scolaire — admin, pédagogie, discipline et IA.',
      description:
        "OVEA — Application de Gestion Scolaire. Application Flutter pour la digitalisation complète des processus administratifs, pédagogiques et disciplinaires d'un établissement scolaire.",
      technologies: ['Flutter', 'Dart', 'TypeScript', 'Genkit', 'HTML', 'JavaScript'],
      category: 'mobile',
      image: 'assets/images/ovea.png',
      githubUrl: 'https://github.com/Raumance/Ovea',
      apkUrl: 'https://drive.google.com/file/d/1IwVhf_Mpbm3_WStUhKJvhTHEl_F10j8j/view?usp=sharing',
      featured: true,
      imageFit: 'contain',
      imageZoom: 100
    },
    {
      _id: 'calculs-btp-fallback',
      title: 'Calculs BTP',
      shortDescription: 'Quantitatifs & devis chantier — application multiplateforme.',
      description:
        "Application multiplateforme de quantitatifs et de devis pour le bâtiment. Client unique Flutter (Android, iOS, Windows, Linux, macOS), API Django REST avec PostgreSQL, synchronisation temps réel via WebSockets (Django Channels).",
      technologies: ['Flutter', 'Dart', 'Django', 'PostgreSQL', 'WebSockets', 'Docker'],
      category: 'mobile',
      image: 'assets/images/calculs-btp.png',
      githubUrl: 'https://github.com/Raumance/calcul_BTP',
      apkUrl: 'https://drive.google.com/file/d/1gBnGgsLj2C_zEWgK9Vw21zneUIMHK1Mp/view?usp=sharing',
      featured: true,
      imageFit: 'contain',
      imageZoom: 100
    },
    {
      _id: 'wazup-fallback',
      title: "Waz'up",
      shortDescription: 'Marketplace e-commerce multi-rôles — Flutter & Firebase.',
      description:
        "Waz'up — Marketplace e-commerce multi-rôles. Application Flutter, rôle de développeur Flutter / full-stack mobile.",
      technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'FCM', 'flutter_map'],
      category: 'mobile',
      image: 'assets/images/Wazup.png',
      githubUrl: 'https://github.com/Raumance/flutter_wazup',
      apkUrl: 'https://drive.google.com/file/d/1qMQXHhtaXE2yOBFblAsjWAL7Do7DaR5g/view?usp=sharing',
      featured: true,
      imageFit: 'contain',
      imageZoom: 100
    },
    {
      _id: 'talk-to-me-fallback',
      title: 'Talk to Me',
      shortDescription: 'Application mobile & web pour couples — défis, quiz, souvenirs.',
      description:
        "Application personnelle permettant aux couples de partager défis, quiz, souvenirs, calendrier et activités interactives. Développement complet en Flutter avec Firebase Auth, Firestore, Storage et Hosting. Synchronisation en temps réel, système de code d'invitation, règles de sécurité Firestore et gestion avancée des sessions de couple.",
      technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'Firebase Hosting', 'Provider', 'Google Sign-In'],
      category: 'mobile',
      image: 'assets/images/talk-to-me.png',
      demoUrl: 'https://talk-to-me-4eabb.web.app',
      featured: true,
      imageFit: 'contain',
      imageZoom: 100
    }
  ];

  featuredProjects = computed(() => {
    const mergedProjects = [...this.allProjects(), ...this.fallbackFeaturedProjects];
    const uniqueProjects = new Map<string, Project>();

    for (const project of mergedProjects) {
      const key = project.title.trim().toLowerCase();
      if (!uniqueProjects.has(key)) {
        uniqueProjects.set(key, project);
      }
    }

    const featured = Array.from(uniqueProjects.values()).filter((project) => project.featured);
    const pinnedTitles = ['Ovea', 'Calculs BTP', "Waz'up"];
    const pinned = pinnedTitles
      .map((title) => featured.find((project) => project.title === title))
      .filter((project): project is Project => Boolean(project));
    const others = featured.filter((project) => !pinnedTitles.includes(project.title));

    return [...pinned, ...others].slice(0, 4);
  });
}
