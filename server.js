require('dotenv').config();
const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Client Resend — nécessite RESEND_API_KEY dans .env (voir .env.example)
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Toutes les données du portfolio sont centralisées ici, à partir du CV.
// Pour mettre à jour le contenu du site, il suffit de modifier cet objet.
const profile = {
  name: 'Djaffar Khanssaou',
  role: 'Développeuse Full Stack — Web, Mobile & Desktop',
  location: 'Dakar, Sénégal',
  email: 'ineskhanssaou2019@gmail.com',
  phone: '+221 71 116 03 86',
  linkedin: 'https://www.linkedin.com/in/khanssaou-djaffar-5b3ba8297/',
  github: 'https://github.com/Djaffarkhanssaou',
  cv: '/files/CV_Djaffar_Khanssaou.pdf',
  tagline: "Je conçois et déploie des applications web, mobiles et desktop sûres, à l'épreuve du temps.",
  summary:
    "Développeuse Full Stack titulaire d'un Master 1 Télécommunications & Réseaux (option Cybersécurité & DevOps), avec plus de 5 ans d'expérience dans la conception, le développement et le déploiement d'applications web, mobiles et desktop performantes et sécurisées. Passionnée par les technologies innovantes, avec une solide expertise dans le déploiement d'applications en environnement cloud et sur serveurs dédiés.",
  photo: '/images/profile.jpg',

  stats: [
    { value: '5+', label: 'ans d\u2019expérience' },
    { value: '10+', label: 'projets livrés' },
    { value: '3', label: 'plateformes — web, mobile, desktop' },
  ],

  experience: [
    {
      role: 'Développeuse Full Stack — Mission à distance',
      period: '4 mois — 2026',
      org: "K'Mdeu Farms — Cameroun",
      points: [
        "Analyse des besoins et conception d'une solution web adaptée aux activités de l'entreprise",
        "Conception et développement d'un site web avec React.js pour l'interface utilisateur",
        "Développement de l'API REST avec Node.js et Express.js",
        "Conception et gestion de la base de données avec PostgreSQL",
        "Intégration des fonctionnalités entre le frontend, l'API et la base de données",
        "Travail en télétravail : suivi du projet, échanges à distance et gestion des tâches de développement",
        "Réalisation de tests, correction des bugs et amélioration des performances et de la fiabilité de l'application",
      ],
    },
    {
      role: 'Stagiaire Développeuse Mobile & Full Stack',
      period: 'Janvier 2026 — Mai 2026',
      org: 'ASV-Sénégal — Liberté 6, Dakar, Sénégal',
      points: [
        "Analyse des besoins fonctionnels et conception de solutions mobiles adaptées aux utilisateurs",
        "Développement d'applications web et mobiles avec intégration d'API REST",
        "Mise en place de fonctionnalités nécessitant fiabilité, sécurité et confidentialité des données",
        "Développement de la plateforme de télémédecine AlloDocta (e-consultation, e-carnet, e-pharmacie)",
        "Réalisation des tests fonctionnels, correction des anomalies et amélioration des performances",
      ],
    },
    {
      role: 'Développeuse Full Stack',
      period: 'Avril 2024 — Septembre 2025',
      org: 'Comex IT Solution — Comores',
      points: [
        "Conception et développement d'applications web et mobiles de bout en bout (front-end et back-end)",
        "Intégration d'API et gestion des bases de données",
        "Mise en place de fonctionnalités backend (authentification, gestion des utilisateurs, logique métier)",
        "Développement d'interfaces utilisateur modernes et responsives",
        "Correction de bugs, optimisation des performances et amélioration continue des applications",
      ],
    },
    {
      role: 'Technicienne Informatique',
      period: 'Février 2023 — Février 2024',
      org: 'Cabinet dentaire — Comores',
      points: [
        "Installation, configuration et mise en service des équipements informatiques",
        "Maintenance préventive et corrective du parc informatique",
        "Conception, développement et administration du logiciel de gestion du cabinet",
        "Assistance technique et support aux utilisateurs",
        "Sauvegarde et sécurisation des données du cabinet",
      ],
    },
    {
      role: 'Stagiaire — Gestion de bases de données',
      period: 'Mars 2020 — Juin 2020',
      org: 'Entreprise — Comores',
      points: [
        "Gestion et mise à jour des bases de données de l'entreprise",
        "Rédaction et exécution de requêtes SQL",
        "Sauvegarde et maintenance des bases de données",
      ],
    },
  ],

  projects: [
    {
      code: '01',
      title: "K'MDEU FARMS SARL — Plateforme web",
      link: 'https://www.kamadeu.com',
      stack: ['React.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      points: [
        "Plateforme web professionnelle réalisée à distance pour une entreprise au Cameroun (en cours de développement)",
        "Interface moderne et responsive avec React.js et Tailwind CSS",
        "Architecture Frontend React.js / API REST Node.js / base de données PostgreSQL",
        "Optimisation de l'interface et de l'expérience utilisateur sur différents supports",
      ],
    },
    {
      code: '02',
      title: 'AlerteApp — Alertes sécurité locale',
      link: 'https://github.com/Djaffarkhanssaou/AlerteApp-mobile',
      stack: ['React Native CLI', 'TypeScript', 'Laravel API REST', 'PostgreSQL'],
      points: [
        "Application mobile de gestion des alertes de sécurité : incendies, agressions, accidents, catastrophes et autres urgences",
        "Carte interactive des alertes (Leaflet / OpenStreetMap) avec marqueurs par gravité",
        "Authentification, notifications et profil utilisateur connectés à une API REST Laravel",
      ],
    },
    {
      code: '03',
      title: 'Terra Nova — Plateforme numérique de la ville',
      link: 'https://github.com/Djaffarkhanssaou/WebCup-2026',
      stack: ['Node.js', 'MySQL', 'Multilingue FR/EN/AR'],
      points: [
        "Plateforme de ville numérique réalisée pour le 24H By Webcup 2026 : services, annonces, alertes, rendez-vous et signalements",
        "Espaces dédiés pour le public, les citoyens, les agents municipaux et l'administration",
        "Interface en français, anglais et arabe, avec réglages d'accessibilité",
        "Sécurité renforcée : protection anti-force brute, journal d'activité, clés d'accès et double vérification",
      ],
    },
    {
      code: '04',
      title: 'SuperA — Gestion des matériaux de construction',
      link: 'https://github.com/Djaffarkhanssaou/SuperA',
      stack: ['Java', 'SQLite'],
      points: [
        "Application desktop de gestion des matériaux de construction pour l'entreprise SuperA",
        "Stockage local des données avec SQLite",
      ],
    },
    {
      code: '05',
      title: 'Commande en ligne — Restauration',
      link: null,
      stack: ['Flutter / Dart', 'Laravel API REST', 'Node.js', 'PostgreSQL'],
      points: [
        "Application mobile de gestion de restauration et de commande en ligne",
        "Backend en Laravel API REST, tableau de bord d'administration en Node.js",
        "Gestion complète des commandes et des produits en temps réel",
        "Actuellement en phase de test sur le Play Store",
      ],
    },
    {
      code: '06',
      title: 'Maarifa Quiz',
      link: null,
      stack: ['Flutter', 'Dart'],
      points: [
        "Application de jeu-quiz pour apprendre la culture et l'histoire des Comores",
        "Questions à choix multiples organisées par thèmes et niveaux de difficulté",
        "Système de score pour suivre sa progression",
        "Actuellement en phase de test sur le Play Store",
      ],
    },
    {
      code: '07',
      title: 'Wunono Docta — Télémédecine',
      link: 'https://wunonodocta.com/',
      stack: ['Télémédecine', 'Mobile', 'API REST'],
      points: [
        "Plateforme de télémédecine manipulant des données utilisateurs sensibles",
        "Modules e-consultation, e-carnet et gestion des informations patients",
        "Conception de l'architecture technique et du modèle de données",
        "Frontend mobile et backend API, avec mise en œuvre des principes de sécurité et de gestion des accès",
      ],
    },
    {
      code: '08',
      title: 'Mise en relation Artisans & Clients',
      link: null,
      stack: ['Web', 'Mobile', 'Full Stack'],
      points: [
        "Application web et mobile facilitant la mise en relation entre artisans et clients",
        "Recherche géolocalisée d'artisans, prise de contact et gestion des demandes de services",
        "Architecture full stack, du cahier des charges au déploiement",
      ],
    },
    {
      code: '09',
      title: 'Plateforme Niveshe',
      link: 'https://niveshe.sahilkom.com/',
      stack: ['Backend', 'Frontend', 'Déploiement'],
      points: [
        "Plateforme web développée de A à Z : gestion et interaction des utilisateurs, backend/frontend complet",
        "Architecture de l'application et structuration de la base de données",
        "Déploiement en production et maintenance évolutive",
      ],
    },
    {
      code: '10',
      title: 'Facturation — AGP Assurances',
      link: 'https://facturation.agpassurances.com/',
      stack: ['Laravel', 'React', 'PostgreSQL'],
      points: [
        "API REST sécurisée en Laravel, interface en React",
        "Gestion des modules de facturation et des opérations métier",
        "Déploiement en production",
      ],
    },
    {
      code: '11',
      title: 'Rendez-vous médical — Cabinet MEDCOM',
      link: 'https://medcom.km/',
      stack: ['HTML/CSS', 'Bootstrap', 'MySQL'],
      points: [
        "Développement front-end responsive (HTML, CSS, Bootstrap)",
        "Base de données MySQL",
        "Système de réservation en ligne pour les patients",
      ],
    },
    {
      code: '12',
      title: 'E-commerce mobile & web (projet de fin de cycle 2023-2024)',
      link: null,
      stack: ['Flutter', 'PHP', 'Node.js', 'Bootstrap', 'MySQL'],
      points: [
        "Application mobile e-commerce, projet de fin de cycle",
        "Mobile en Flutter et PHP, web en Node.js et Bootstrap",
        "Base de données MySQL",
      ],
    },
  ],

  skills: [
    { group: 'Analyse & conception', items: ['Merise', 'UML'] },
    { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Bootstrap', 'Tailwind CSS'] },
    { group: 'Frameworks front', items: ['React.js', 'Angular', 'WordPress'] },
    { group: 'Backend', items: ['PHP', 'Node.js'] },
    { group: 'Desktop', items: ['Java'] },
    { group: 'Frameworks back', items: ['Express.js', 'Symfony', 'Laravel'] },
    { group: 'Mobile', items: ['React Native (CLI & Expo)', 'Flutter/Dart'] },
    { group: 'Temps réel', items: ['Socket.io'] },
    { group: 'Bases de données', items: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL avancé', 'MongoDB', 'Cassandra', 'LDAP', 'Firebase'] },
    { group: 'API & sécurité web', items: ['API REST', 'OWASP', 'JWT'] },
    { group: "Systèmes d'exploitation", items: ['Windows', 'macOS', 'Unix (Ubuntu, Kali Linux)'] },
    { group: 'Virtualisation', items: ['Docker', 'VirtualBox', 'Hyper-V'] },
    { group: 'Réseaux & services', items: ['TCP/IP', 'LAN', 'WAN', 'VPN', 'DNS', 'DHCP', 'VLAN', 'Windows Server', 'SAMBA'] },
    { group: 'Téléphonie IP', items: ['Asterisk', 'Cisco'] },
    { group: 'Sécurité & test', items: ['OWASP ZAP', 'Nmap', 'XAMPP', 'WAMP Server'] },
    { group: 'Collaboration', items: ['Git', 'GitHub'] },
    { group: 'DevOps / Déploiement', items: ['Docker', 'Kubernetes'] },
    { group: 'Design & bureautique', items: ['Figma', 'Canva', 'PostMyWall', 'Adobe Photoshop', 'MS Project', 'MS Office'] },
    { group: 'Environnements de dev', items: ['Sublime Text', 'VS Code', 'Xcode', 'Android Studio'] },
  ],

  education: [
    {
      title: 'Master 1 — Télécommunications & Réseaux (option Cybersécurité & DevOps)',
      period: 'Validé',
      org: 'École Centrale des Logiciels Libres et de Télécommunications (EC2LT)',
    },
    {
      title: "Licence — Administration et sécurité des systèmes d'information",
      period: '2022 — 2023',
      org: "Université des Comores — Mémoire : « Proposition d'une application mobile de e-commerce »",
    },
    {
      title: 'Baccalauréat',
      period: '2019',
      org: 'École Mgueni Baraka — Moroni, Comores',
    },
  ],

  languages: [
    { name: 'Français', level: 'Courant', percent: 100 },
    { name: 'Anglais', level: 'Courant', percent: 100 },
  ],

  interests: ['Lecture', 'Écriture', 'Cuisine', 'Manga & anime'],
};

app.get('/', (req, res) => {
  res.render('index', { profile });
});

// Envoie un e-mail réel via Resend (API HTTPS, fonctionne même quand le SMTP est bloqué)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Champs manquants.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
    console.error('RESEND_API_KEY / CONTACT_TO manquants dans .env');
    return res.status(500).json({ ok: false, error: 'Configuration e-mail manquante côté serveur.' });
  }

  try {
    const { error } = await resend.emails.send({
      // Tant qu'aucun domaine n'est vérifié sur Resend, il faut utiliser cet expéditeur "sandbox".
      // Une fois un domaine vérifié (ex. contact@votredomaine.com), remplacez cette ligne.
      from: process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO,
      reply_to: email,
      subject: `Nouveau message depuis le portfolio — ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Erreur envoi e-mail (Resend) :', error);
      return res.status(500).json({ ok: false, error: "Échec de l'envoi de l'e-mail." });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur envoi e-mail (Resend) :', err);
    res.status(500).json({ ok: false, error: "Échec de l'envoi de l'e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio disponible sur http://localhost:${PORT}`);
});
