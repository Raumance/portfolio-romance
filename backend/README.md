# 🚀 Portfolio Romance - API Backend

Backend Node.js / Express sécurisé servant d'API REST pour alimenter le Portfolio Angular. Ce serveur gère la persistance des projets, des compétences, des expériences professionnelles, le système d'authentification de l'administrateur, ainsi que la réception et le traitement des messages de contact avec envoi d'e-mail.

---

## 🛠️ Technologies Utilisées

* **Environnement d'exécution :** [Node.js](https://nodejs.org/)
* **Framework Web :** [Express.js](https://expressjs.com/)
* **Base de données :** [MongoDB](https://www.mongodb.com/) avec l'ODM [Mongoose](https://mongoosejs.com/)
* **Authentification & Sécurité :**
  * `jsonwebtoken` (JWT) pour la gestion des sessions (expiration automatique à 30 min)
  * `bcrypt` pour le hachage sécurisé des mots de passe
  * `helmet` pour la sécurisation des en-têtes HTTP
  * `express-rate-limit` pour la prévention des attaques Brute-Force & DDoS
  * `express-mongo-sanitize` contre les injections NoSQL
  * `xss-clean` contre les attaques Cross-Site Scripting
  * `hpp` contre la pollution des paramètres HTTP
  * `cors` pour l'autorisation des requêtes cross-origin
* **Envoi d'e-mails :** [Nodemailer](https://nodemailer.com/)
* **Validation des données :** `express-validator`

---

## 📂 Architecture du Projet

```text
backend/
├── config/
│   └── db.js                 # Connexion à MongoDB (Mongoose)
│
├── models/
│   ├── Project.js            # Schéma Mongoose pour les projets
│   ├── Skill.js              # Schéma Mongoose pour les compétences
│   ├── Experience.js         # Schéma Mongoose pour le parcours pro
│   ├── Message.js            # Schéma Mongoose pour les messages reçus
│   ├── Profile.js            # Contenu éditable de la page À propos
│   └── User.js               # Schéma Mongoose pour l'administrateur
│
├── controllers/
│   ├── authController.js     # Gestion de la connexion & émission du JWT
│   ├── projectController.js  # CRUD des projets
│   ├── skillController.js    # CRUD des compétences
│   ├── experienceController.js # CRUD des expériences
│   ├── contactController.js  # Traitement des messages & notifications e-mail
│   └── profileController.js  # Contenu À propos
│
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── skillRoutes.js
│   ├── experienceRoutes.js
│   ├── contactRoutes.js
│   └── profileRoutes.js
│
├── scripts/
│   └── seed.js               # Jeu de données initial
│
├── middlewares/
│   ├── auth.js               # Vérification du Token JWT (routes protégées)
│   ├── errorHandler.js       # Gestion centralisée des erreurs
│   ├── inputValidators.js    # Définition des règles de validation (express-validator)
│   └── validate.js           # Middleware d'exécution des règles de validation
│
├── utils/
│   └── sendEmail.js          # Envoi d'e-mail via Nodemailer (formulaire de contact)
│
├── .env                      # Variables d'environnement sensibles (non versionné)
├── .env.example              # Modèle de configuration (versionné)
├── server.js                 # Point d'entrée principal de l'application
├── package.json              # Dépendances et scripts du projet
└── README.md                 # Documentation et présentation du projet
```

---

Configuration & Installation
1. Prérequis
Node.js (v18 ou supérieur)

Instance MongoDB en local ou MongoDB Atlas

2. Cloner et installer les dépendances

cd backend
npm install

Configurer les variables d'environnement
Crée un fichier .env à la racine du dossier backend en recopiant le modèle .env.example :

cp .env.example .env

Lancement du Serveur
Mode Développement (avec Nodemon)

npm run dev
Mode Production

npm run start

Jeu de données initial

npm run seed
# Requiert ADMIN_EMAIL et ADMIN_PASSWORD dans le .env
