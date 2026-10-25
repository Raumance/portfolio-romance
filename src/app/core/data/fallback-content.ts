import { Experience } from '../models/experience.model';
import { Skill } from '../models/skill.model';

export const FALLBACK_SKILLS: Skill[] = [
  { _id: 'fb-web', name: 'Conception et développement de sites web', category: 'Frontend', level: 85, icon: '' },
  { _id: 'fb-html', name: 'HTML5 / CSS3', category: 'Frontend', level: 80, icon: 'html5.svg' },
  { _id: 'fb-js', name: 'JavaScript', category: 'Frontend', level: 80, icon: 'javascript.svg' },
  { _id: 'fb-angular', name: 'Angular', category: 'Frontend', level: 70, icon: 'angular.svg' },
  { _id: 'fb-vue', name: 'Vue.js', category: 'Frontend', level: 55, icon: '' },
  { _id: 'fb-react', name: 'React', category: 'Frontend', level: 55, icon: 'react.svg' },
  { _id: 'fb-java', name: 'Java', category: 'Backend', level: 60, icon: '' },
  { _id: 'fb-python', name: 'Python', category: 'Backend', level: 60, icon: 'python.svg' },
  { _id: 'fb-node', name: 'Node.js', category: 'Backend', level: 75, icon: 'nodejs.svg' },
  { _id: 'fb-php', name: 'PHP', category: 'Backend', level: 55, icon: 'php.svg' },
  { _id: 'fb-express', name: 'Express.js', category: 'Backend', level: 70, icon: 'express.svg' },
  { _id: 'fb-flutter', name: 'Flutter / Dart', category: 'Mobile', level: 80, icon: 'flutter.svg' },
  { _id: 'fb-rn', name: 'React Native', category: 'Mobile', level: 55, icon: 'react.svg' },
  { _id: 'fb-db', name: 'Conception et modélisation de bases de données', category: 'Bases de données', level: 80, icon: '' },
  { _id: 'fb-firebase', name: 'Firebase', category: 'Bases de données', level: 75, icon: 'firebase.svg' },
  { _id: 'fb-mongo', name: 'MongoDB', category: 'Bases de données', level: 65, icon: 'mongodb.svg' },
  { _id: 'fb-mysql', name: 'MySQL / SQL', category: 'Bases de données', level: 65, icon: 'mysql.svg' },
  { _id: 'fb-pg', name: 'PostgreSQL', category: 'Bases de données', level: 65, icon: '' },
  { _id: 'fb-linux', name: 'Linux / Réseau', category: 'Outils', level: 60, icon: 'linux.svg' },
  { _id: 'fb-git', name: 'Git / GitHub', category: 'Outils', level: 75, icon: 'git.svg' }
];

export const FALLBACK_EXPERIENCES: Experience[] = [
  {
    _id: 'fb-licence',
    title: 'Licence professionnelle — Développement informatique',
    institution: "Institut National de la Poste des Technologies de l'Information et de la Communication, Libreville",
    type: 'Formation',
    startDate: '2025-10-01',
    description:
      "Cycle licence en cours. Conception d'applications web et mobiles, bases de données, et approfondissement de la stack JavaScript / TypeScript."
  },
  {
    _id: 'fb-dts',
    title: 'Diplôme de Technicien Supérieur',
    institution: "Institut National de la Poste des Technologies de l'Information et de la Communication, Libreville",
    type: 'Formation',
    startDate: '2022-10-01',
    endDate: '2025-07-01',
    description:
      'Diplôme obtenu en 2025. Parcours DTS en développement informatique : programmation, bases de données, réseaux et projets applicatifs.'
  },
  {
    _id: 'fb-bac',
    title: 'Baccalauréat technique F4 — Génie civil',
    institution: 'Lycée technique national Omar Bongo, Libreville',
    type: 'Formation',
    startDate: '2019-09-01',
    endDate: '2022-07-01',
    description: 'Diplôme obtenu en 2022. Baccalauréat technique de type F4, option génie civil.'
  },
  {
    _id: 'fb-bep',
    title: "Brevet d'études professionnelles industrielles — Dessin construction de bâtiment",
    institution: 'Lycée technique Bernard Obiang, Oyem',
    type: 'Formation',
    startDate: '2017-09-01',
    endDate: '2019-07-01',
    description: 'Diplôme obtenu en 2019. Formation en dessin et construction de bâtiment.'
  },
  {
    _id: 'fb-wazup',
    title: "Développeur mobile — Waz'up",
    institution: "Waz'up",
    type: 'Expérience',
    startDate: '2025-01-01',
    description:
      "Stage développeur Flutter / full-stack mobile : marketplace e-commerce multi-rôles (auth OTP, panier, checkout, promotions, Cloud Functions, Firestore rules). En cours (2025–2026)."
  }
];
