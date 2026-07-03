# Portfolio — Djaffar Khanssaou

Portfolio personnel en Node.js (Express + EJS) avec Bootstrap 5.

## Installation

```bash
npm install
npm start
```

Le site est ensuite accessible sur http://localhost:3000

## Structure

```
portfolio/
├── server.js            # Serveur Express + toutes les données du CV
├── views/index.ejs      # Template de la page
├── public/
│   ├── css/style.css    # Design (thème terminal / dev)
│   ├── js/script.js     # Menu mobile, effet terminal, formulaire de contact
│   └── images/profile.jpg
└── package.json
```

## Modifier le contenu

Tout le contenu (expériences, projets, compétences, etc.) se trouve dans
l'objet `profile` en haut de `server.js`. Il suffit de modifier ce fichier —
le HTML se régénère automatiquement au prochain chargement.

## Formulaire de contact

Le formulaire envoie une requête POST à `/api/contact`, qui journalise
actuellement le message dans la console serveur. Pour un envoi réel par
e-mail, on peut brancher Nodemailer dans cette route (ex. avec Gmail SMTP).

## Formulaire de contact (envoi d'e-mail réel)

Le formulaire envoie un vrai e-mail via Gmail grâce à Nodemailer.

1. Copiez `.env.example` en `.env` :
   ```bash
   cp .env.example .env
   ```
2. Sur votre compte Google, activez la validation en 2 étapes, puis générez
   un mot de passe d'application sur
   https://myaccount.google.com/apppasswords
3. Renseignez dans `.env` :
   - `GMAIL_USER` : votre adresse Gmail
   - `GMAIL_APP_PASSWORD` : le mot de passe à 16 caractères généré ci-dessus
   - `CONTACT_TO` : l'adresse qui doit recevoir les messages
4. Redémarrez le serveur (`npm start`)

⚠️ Ne partagez jamais votre fichier `.env` et ne le mettez pas sur GitHub
(il est déjà listé dans `.gitignore`).

## Déploiement

Compatible avec n'importe quel hébergeur Node.js (Render, Railway, VPS,
Heroku...). Définir la variable d'environnement `PORT` si nécessaire
(3000 par défaut).
