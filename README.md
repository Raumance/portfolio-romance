# Portfolio Romance Nguema

Site portfolio MEAN (MongoDB, Express, Angular, Node.js) de **Romance Nguema** (NGUEMA Raumance), développeur web et mobile.

- GitHub : [github.com/Raumance](https://github.com/Raumance)
- LinkedIn : [linkedin.com/in/romance-nguema-760b732a0](https://www.linkedin.com/in/romance-nguema-760b732a0/)

## Stack

| Couche | Technologies |
| --- | --- |
| Frontend | Angular 21, TypeScript, RxJS, Reactive Forms, SCSS |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, Nodemailer |
| Base | MongoDB (locale ou Atlas) |
| Sécurité | Helmet, CORS, rate-limit, mongo-sanitize, express-validator |

## Prérequis

- Node.js 18+
- MongoDB local ou un cluster Atlas

## Installation

```bash
npm install
cd backend
npm install
cp .env.example .env
```

Renseigner `backend/.env` (`MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, SMTP).

## Lancement

```bash
# API (depuis backend/)
npm run dev

# Données initiales (projets, compétences, parcours, profil, admin)
npm run seed

# Frontend (à la racine)
npm start
```

Le frontend tourne sur `http://localhost:4200`, l'API sur `http://localhost:5000`.

## Médias

- Portrait : `src/assets/images/NGUEMA.jpeg`
- CV : dépose un PDF dans `src/assets/cv-romance-nguema.pdf`, ou envoie-le depuis `/admin/profile`
- Images de projets : upload depuis `/admin/projects` (Multer, dossier `backend/uploads`)

## Pages publiques

- `/` Accueil
- `/a-propos` Parcours, soft skills, CV
- `/competences` Compétences par catégorie
- `/portfolio` et `/portfolio/:id` Projets filtrables
- `/contact` Formulaire + coordonnées
- `/mentions-legales`

Le blog (`/blog`) est prévu en version 2 et n'est pas inclus.

## Administration

Espace protégé par JWT : `/admin`

- CRUD projets, compétences, parcours
- Édition du contenu « À propos » (sans modifier le code)
- Consultation des messages de contact

## Variables d'environnement (backend)

Voir `backend/.env.example`. Ne jamais versionner le fichier `.env`.

## Build de production

```bash
ng build
cd backend && npm start
```
