import { Component } from '@angular/core';

@Component({
  selector: 'app-tech-stack-banner',
  imports: [],
  templateUrl: './tech-stack-banner.component.html',
  styleUrl: './tech-stack-banner.component.scss',
})
export class TechStackBannerComponent {
  stacks = ['Angular', 'Node.js', 'MongoDB', 'Python', 'React', 'Flutter'];
}
