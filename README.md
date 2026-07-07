<<<<<<< HEAD
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

Le formulaire envoie un vrai e-mail via l'API HTTPS de **Resend** (et non
via SMTP — beaucoup d'hébergeurs gratuits comme Render bloquent le SMTP
sortant, ce qui laisse le formulaire bloqué sur "Envoi en cours...").

1. Copiez `.env.example` en `.env` :
   ```bash
   cp .env.example .env
   ```
2. Créez un compte gratuit sur https://resend.com (3000 e-mails/mois gratuits)
3. Dans le dashboard Resend, allez dans **API Keys** → **Create API Key**,
   copiez la clé générée (commence par `re_`)
4. Renseignez dans `.env` :
   - `RESEND_API_KEY` : la clé copiée
   - `CONTACT_TO` : l'adresse qui doit recevoir les messages
5. Redémarrez le serveur (`npm start`)

Sans domaine vérifié sur Resend, les e-mails partent depuis l'adresse de
test `onboarding@resend.dev` — c'est normal et suffisant pour recevoir les
messages. Si vous possédez un nom de domaine, vous pouvez le vérifier dans
Resend puis définir `RESEND_FROM` pour envoyer depuis votre propre adresse.

⚠️ Ne partagez jamais votre fichier `.env` et ne le mettez pas sur GitHub
(il est déjà listé dans `.gitignore`).

## Déploiement

Compatible avec n'importe quel hébergeur Node.js (Render, Railway, VPS,
Heroku...). Définir la variable d'environnement `PORT` si nécessaire
(3000 par défaut).
=======

# Portfolio — Djaffar Khanssaou

Développeur Full Stack Node.js
>>>>>>> 170311aa59b5cca500fa69a040d5f1335eff710d
