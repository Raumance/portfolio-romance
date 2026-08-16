import { Component } from '@angular/core';

interface SocialLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-social-links',
  imports: [],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {
  links: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/Raumance' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/romance-nguema-760b732a0/' }
  ];
}
