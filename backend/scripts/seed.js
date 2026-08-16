require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Project = require('../models/Project');
const Skill = require('../models/Skill');
const User = require('../models/User');
const Experience = require('../models/Experience');
const Profile = require('../models/Profile');

const projects = [
  {
    title: 'Calculs BTP',
    shortDescription: 'Quantitatifs & devis chantier — application multiplateforme.',
    description:
      "Application multiplateforme de quantitatifs et de devis pour le bâtiment. Client unique Flutter (Android, iOS, Windows, Linux, macOS), API Django REST avec PostgreSQL, synchronisation temps réel via WebSockets (Django Channels). Calculs locaux hors-ligne, sync multi-appareils et conteneurisation Docker.",
    technologies: ['Flutter', 'Dart', 'Django', 'PostgreSQL', 'WebSockets', 'Docker'],
    category: 'mobile',
    image: 'assets/images/calculs-btp.png',
    githubUrl: 'https://github.com/Raumance/calcul_BTP',
    apkUrl: 'https://drive.google.com/file/d/1gBnGgsLj2C_zEWgK9Vw21zneUIMHK1Mp/view?usp=sharing',
    featured: true,
    imageFit: 'contain',
    imageZoom: 100,
    screenshots: ['assets/images/calculs-btp.png']
  },
  {
    title: 'Gaz Delivery',
    shortDescription: 'Application de gestion et de commande de bouteilles de gaz en ligne.',
    description:
      "Application permettant aux utilisateurs de commander des bouteilles de gaz et de suivre leur livraison. Le projet couvre la gestion des commandes, des clients et du stock côté back-office.",
    technologies: ['JavaScript', 'Node.js', 'MongoDB'],
    category: 'web',
    image: 'https://placehold.co/800x500/1b1e27/ffffff?text=Gaz+Delivery',
    githubUrl: 'https://github.com/Raumance/Gaz_Delivery-new',
    featured: true
  },
  {
    title: 'Application CRM',
    shortDescription: 'CRM CarWazPlan — prospects, devis et véhicules.',
    description:
      "CRM CarWazPlan, outil de gestion de la relation client pour un programme de financement automobile. Centralisation des prospects, devis et véhicules, avec authentification (e-mail, Google) et espace de travail dédié.",
    technologies: ['JavaScript', 'Firebase'],
    category: 'web',
    image: 'assets/images/crm.png',
    githubUrl: 'https://github.com/Raumance/Application-CRM',
    demoUrl: 'https://crm-application-e8c6c-d3bf3.web.app',
    featured: true,
    imageFit: 'contain',
    imageZoom: 100,
    screenshots: ['assets/images/crm.png']
  },
  {
    title: "Waz'up",
    shortDescription: 'Marketplace e-commerce multi-rôles — Flutter & Firebase.',
    description:
      "Waz'up — Marketplace e-commerce multi-rôles. Application Flutter, rôle de développeur Flutter / full-stack mobile.\n\nAuth & onboarding : email, Google, inscription téléphone avec OTP (codes hashés, règles Firestore adaptées à l'inscription sans session).\nEspace client : panier / favoris synchronisés, checkout livraison (domicile, showroom, adresse carte + points focaux), frais et totaux dynamiques, commandes et timeline en temps réel.\nPromotions : Black Friday (produits taggés), Crazy Day (% global sur tout le catalogue), Vente Flash (produits flash + countdown).\nBackend Firebase : modélisation Firestore, Cloud Functions (ex. webhook tracking), notifications, sécurité (rules, App Check).\nQualité : audits de production, correction des permission-denied, alignement UI / maquettes.",
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'FCM', 'flutter_map'],
    category: 'mobile',
    image: 'assets/images/Wazup.png',
    githubUrl: 'https://github.com/Raumance/flutter_wazup',
    apkUrl: 'https://drive.google.com/file/d/1qMQXHhtaXE2yOBFblAsjWAL7Do7DaR5g/view?usp=sharing',
    featured: true,
    imageFit: 'contain',
    imageZoom: 100,
    screenshots: ['assets/images/Wazup.png']
  },
  {
    title: "Déploiement d'infrastructure de services",
    shortDescription: 'Infrastructure réseau Linux sécurisée, pilotable via une interface web.',
    description:
      "Déploiement d'une infrastructure réseau sécurisée sous Linux, administrable à distance. Installation et configuration d'un serveur DNS (BIND), d'un annuaire d'entreprise (OpenLDAP), d'un serveur de fichiers (Samba), et d'une solution de messagerie complète (Postfix, Dovecot, Roundcube). Développement d'un panneau d'administration PHP pour piloter les services en temps réel.",
    technologies: ['Linux', 'BIND', 'OpenLDAP', 'Samba', 'Postfix', 'PHP'],
    category: 'web',
    image: 'https://placehold.co/800x500/1b1e27/ffffff?text=Infra+Linux',
    featured: false
  },
  {
    title: 'Talk to Me',
    shortDescription: 'Application mobile et web pour couples — défis, quiz, souvenirs.',
    description:
      "Application personnelle permettant aux couples de partager défis, quiz, souvenirs, calendrier et activités interactives. Développement complet en Flutter avec Firebase Auth, Firestore, Storage et Hosting.",
    technologies: ['Flutter', 'Dart', 'Firebase'],
    category: 'mobile',
    image: 'assets/images/talk-to-me.png',
    demoUrl: 'https://talk-to-me-4eabb.web.app',
    featured: true,
    imageFit: 'contain',
    imageZoom: 100,
    screenshots: ['assets/images/talk-to-me.png']
  },
  {
    title: 'Ovea',
    shortDescription: 'Application Flutter de gestion scolaire — admin, pédagogie, discipline et IA.',
    description:
      "OVEA — Application de Gestion Scolaire. Application Flutter pour la digitalisation complète des processus administratifs, pédagogiques et disciplinaires d'un établissement scolaire.\n\nGestion des utilisateurs : Principal, enseignants, élèves, parents, surveillant général.\nGestion académique : classes, matières, notes, emplois du temps.\nCommunication : chat en temps réel, notifications push, e-mails automatiques.\nDiscipline : suivi des convocations, génération de PDF.\nIntelligence artificielle : chatbot d'assistance et génération automatique d'emplois du temps, avec un backend IA Genkit (TypeScript).",
    technologies: ['Flutter', 'Dart', 'TypeScript', 'Genkit', 'HTML', 'JavaScript'],
    category: 'mobile',
    image: 'assets/images/ovea.png',
    githubUrl: 'https://github.com/Raumance/Ovea',
    apkUrl: 'https://drive.google.com/file/d/1IwVhf_Mpbm3_WStUhKJvhTHEl_F10j8j/view?usp=sharing',
    featured: true,
    imageFit: 'contain',
    imageZoom: 100,
    screenshots: ['assets/images/ovea.png']
  },
  {
    title: 'JavaScript',
    shortDescription: 'Travaux et exercices JavaScript.',
    description: 'Dépôt public javaScript regroupant des travaux et expérimentations en JavaScript.',
    technologies: ['JavaScript'],
    category: 'web',
    image: 'https://placehold.co/800x500/1b1e27/ffffff?text=JavaScript',
    githubUrl: 'https://github.com/Raumance/javaScript',
    featured: false
  },
  {
    title: 'Devoir',
    shortDescription: 'Projet académique publié sur GitHub.',
    description: 'Dépôt public devoir — travaux réalisés dans le cadre de la formation.',
    technologies: ['JavaScript'],
    category: 'web',
    image: 'https://placehold.co/800x500/1b1e27/ffffff?text=Devoir',
    githubUrl: 'https://github.com/Raumance/devoir',
    featured: false
  }
];

const skills = [
  { name: 'Conception et développement de sites web', category: 'Frontend', level: 85, icon: '' },
  { name: 'HTML5 / CSS3', category: 'Frontend', level: 80, icon: 'html5.svg' },
  { name: 'JavaScript', category: 'Frontend', level: 80, icon: 'javascript.svg' },
  { name: 'Angular', category: 'Frontend', level: 70, icon: 'angular.svg' },
  { name: 'Vue.js', category: 'Frontend', level: 55, icon: '' },
  { name: 'React', category: 'Frontend', level: 55, icon: 'react.svg' },
  { name: 'Java', category: 'Backend', level: 60, icon: '' },
  { name: 'Python', category: 'Backend', level: 60, icon: 'python.svg' },
  { name: 'Node.js', category: 'Backend', level: 75, icon: 'nodejs.svg' },
  { name: 'PHP', category: 'Backend', level: 55, icon: 'php.svg' },
  { name: 'Express.js', category: 'Backend', level: 70, icon: 'express.svg' },
  { name: 'Flutter / Dart', category: 'Mobile', level: 80, icon: 'flutter.svg' },
  { name: 'React Native', category: 'Mobile', level: 55, icon: 'react.svg' },
  { name: 'Conception et modélisation de bases de données', category: 'Bases de données', level: 80, icon: '' },
  { name: 'Firebase', category: 'Bases de données', level: 75, icon: 'firebase.svg' },
  { name: 'MongoDB', category: 'Bases de données', level: 65, icon: 'mongodb.svg' },
  { name: 'MySQL / SQL', category: 'Bases de données', level: 65, icon: 'mysql.svg' },
  { name: 'PostgreSQL', category: 'Bases de données', level: 65, icon: '' },
  { name: 'Linux / Réseau', category: 'Outils', level: 60, icon: 'linux.svg' },
  { name: 'Git / GitHub', category: 'Outils', level: 75, icon: 'git.svg' }
];

const experiences = [
  {
    title: 'Licence professionnelle — Développement informatique',
    institution: "Institut National de la Poste des Technologies de l'Information et de la Communication, Libreville",
    type: 'Formation',
    startDate: new Date('2025-10-01'),
    description:
      "Cycle licence en cours. Conception d'applications web et mobiles, bases de données, et approfondissement de la stack JavaScript / TypeScript."
  },
  {
    title: 'Diplôme de Technicien Supérieur',
    institution: "Institut National de la Poste des Technologies de l'Information et de la Communication, Libreville",
    type: 'Formation',
    startDate: new Date('2022-10-01'),
    endDate: new Date('2025-07-01'),
    description:
      "Diplôme obtenu en 2025. Parcours DTS en développement informatique : programmation, bases de données, réseaux et projets applicatifs."
  },
  {
    title: 'Baccalauréat technique F4 — Génie civil',
    institution: 'Lycée technique national Omar Bongo, Libreville',
    type: 'Formation',
    startDate: new Date('2019-09-01'),
    endDate: new Date('2022-07-01'),
    description:
      "Diplôme obtenu en 2022. Baccalauréat technique de type F4, option génie civil."
  },
  {
    title: "Brevet d'études professionnelles industrielles — Dessin construction de bâtiment",
    institution: 'Lycée technique Bernard Obiang, Oyem',
    type: 'Formation',
    startDate: new Date('2017-09-01'),
    endDate: new Date('2019-07-01'),
    description:
      "Diplôme obtenu en 2019. Formation en dessin et construction de bâtiment."
  },
  {
    title: "Développeur mobile — Waz'up",
    institution: "Waz'up",
    type: 'Expérience',
    startDate: new Date('2025-01-01'),
    description:
      "Stage développeur Flutter / full-stack mobile : marketplace e-commerce multi-rôles (auth OTP, panier, checkout, promotions, Cloud Functions, Firestore rules). En cours (2025–2026)."
  }
];

const profile = {
  headline: 'Étudiant développeur, curieux et rigoureux',
  introduction:
    "Actuellement en formation en développement informatique, je conçois des applications web et mobiles de bout en bout — de la base de données à l'interface.",
  bio: "Je m'appelle Romance Nguema, développeur web, mobile et logiciel. Passionné par le développement d'applications web et mobiles ainsi que par la conception de bases de données, je suis actuellement en Licence professionnelle à l'Institut National de la Poste des Technologies de l'Information et de la Communication, après un Diplôme de Technicien Supérieur dans le même établissement.\n\nJe recherche des opportunités me permettant de mettre en œuvre mes compétences techniques dans un environnement innovant, tout en continuant à approfondir mon expertise sur de nouvelles technologies.",
  softSkills: ['Curiosité', 'Rigueur', 'Autonomie', 'Travail en équipe', 'Communication'],
  interests: ['Développement mobile', 'Open source', 'Infrastructures Linux', 'Stack MEAN'],
  cvUrl: 'assets/cv-romance-nguema.pdf'
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connecté à MongoDB pour le seed');

  await Project.deleteMany({});
  await Skill.deleteMany({});
  await Experience.deleteMany({});
  await Profile.deleteMany({});

  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  await Experience.insertMany(experiences);
  await Profile.create(profile);
  console.log(`${projects.length} projets, ${skills.length} compétences, ${experiences.length} expériences et 1 profil insérés.`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existingAdmin = await User.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    if (!existingAdmin) {
      await User.create({ email: adminEmail, password: hashedPassword });
      console.log(`Compte admin créé pour ${adminEmail}.`);
    } else {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`Compte admin synchronisé pour ${adminEmail}.`);
    }
  } else {
    console.warn('ADMIN_EMAIL / ADMIN_PASSWORD absents du .env : aucun compte admin créé.');
  }

  await mongoose.disconnect();
  console.log('Seed terminé.');
}

seed().catch((err) => {
  console.error('Erreur pendant le seed :', err);
  process.exit(1);
});
