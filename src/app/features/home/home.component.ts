import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutPreviewComponent } from './components/about-preview/about-preview.component';
import { TechStackBannerComponent } from './components/tech-stack-banner/tech-stack-banner.component';
import { SkillsPreviewComponent } from './components/skills-preview/skills-preview.component';
import { PortfolioPreviewComponent } from './components/portfolio-preview/portfolio-preview.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    AboutPreviewComponent,
    TechStackBannerComponent,
    SkillsPreviewComponent,
    PortfolioPreviewComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
