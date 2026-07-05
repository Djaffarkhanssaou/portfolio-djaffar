require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Transporteur Gmail — nécessite GMAIL_USER et GMAIL_APP_PASSWORD dans .env
// (voir .env.example pour la marche à suivre)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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
  cv: '/files/CV_Djaffar_Khanssaou.docx',
  tagline: "Je conçois et déploie des applications web, mobiles et desktop sûres, à l'épreuve du temps.",
  summary:
    "Développeuse Full Stack actuellement en Master 1 Télécommunications & Réseaux (option Cybersécurité & DevOps), avec plus de 5 ans d'expérience dans la conception, le développement et le déploiement d'applications web, mobiles et desktop performantes et sécurisées. Passionnée par les technologies innovantes, avec une solide expertise dans le déploiement d'applications en environnement cloud et sur serveurs dédiés.",
  photo: '/images/profile.jpg',

  stats: [
    { value: '5+', label: 'ans d\u2019expérience' },
    { value: '10+', label: 'projets livrés' },
  ],

  experience: [
    {
      role: 'Développeuse Full Stack (Stage)',
      period: 'Depuis juin 2026 — Présent',
      org: 'ASV-Sénégal — Liberté 6, Dakar, Sénégal',
      points: [
        "Développement d'applications web et mobiles en tant que Full Stack Developer",
        "Conception et implémentation des fonctionnalités front-end et back-end",
        "Intégration d'API et gestion des bases de données",
        "Participation à l'analyse des besoins et à la conception technique des solutions",
        "Correction de bugs, tests et amélioration des performances des applications",
        "Collaboration avec l'équipe technique pour le déploiement et la maintenance des projets",
      ],
    },
    {
      role: 'Développeuse Full Stack',
      period: 'Depuis avril 2025 — Présent',
      org: 'Comex IT Solution — Comores',
      points: [
        "Conception et développement d'applications web et mobiles de bout en bout (front-end et back-end)",
        "Développement et maintenance de sites web et applications mobiles selon les besoins clients",
        "Intégration d'APIs et gestion des bases de données",
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
        "Assistance technique et support aux utilisateurs",
        "Administration et gestion du logiciel de gestion du cabinet dentaire, conçu et développé par mes soins",
        "Suivi des évolutions, correction des anomalies et amélioration continue du logiciel",
        "Sauvegarde et sécurisation des données du cabinet",
      ],
    },
    {
      role: 'Stagiaire — Gestion de bases de données',
      period: 'Mars 2020 — Juin 2020',
      org: null,
      points: [
        "Gestion et mise à jour des bases de données de l'entreprise",
        "Saisie, vérification et correction des données",
        "Rédaction et exécution de requêtes SQL",
        "Sauvegarde et maintenance des bases de données",
        "Participation à l'amélioration de la qualité et de la sécurité des données",
      ],
    },
  ],

  projects: [
    {
      code: '01',
      title: 'Plateforme Niveshe',
      link: 'https://niveshe.sahilkom.com/',
      stack: ['Backend', 'Frontend', 'Déploiement'],
      points: [
        "Plateforme web développée de A à Z (backend/frontend complet)",
        "Architecture de l'application et structuration de la base de données",
        "Déploiement en environnement de production et maintenance évolutive",
      ],
    },
    {
      code: '02',
      title: 'Facturation — AGP Assurances',
      link: 'https://facturation.agpassurances.com/',
      stack: ['Laravel', 'React', 'PostgreSQL'],
      points: [
        "API REST sécurisée en Laravel, interface en React",
        "Gestion des modules de facturation et opérations métier",
        "Déploiement en production",
      ],
    },
    {
      code: '03',
      title: 'Rendez-vous médical — Cabinet MEDCOM',
      link: 'https://medcom.km/',
      stack: ['HTML/CSS', 'Bootstrap', 'MySQL'],
      points: [
        "Développement front-end responsive (HTML, CSS, Bootstrap)",
        "Conception de la base de données MySQL",
        "Système de réservation en ligne",
      ],
    },
    {
      code: '04',
      title: 'Commande en ligne — Restauration',
      link: null,
      stack: ['Flutter', 'Laravel API', 'Node.js', 'PostgreSQL'],
      points: [
        "Application mobile Flutter/Dart + backend Laravel API REST",
        "Interface d'administration en Node.js",
        "Gestion complète des commandes et produits en temps réel",
      ],
    },
    {
      code: '05',
      title: 'E-commerce mobile & web (PFE 2023-2024)',
      link: null,
      stack: ['Flutter', 'PHP', 'Node.js', 'Bootstrap', 'MySQL'],
      points: [
        "Projet de fin de cycle : application mobile e-commerce",
        "Mobile en Flutter/PHP, web en Node.js/Bootstrap",
        "Base de données MySQL",
      ],
    },
  ],

  skills: [
    { group: 'Analyse & conception', items: ['Merise', 'UML'] },
    { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
    { group: 'Frameworks front', items: ['React.js', 'Angular', 'WordPress'] },
    { group: 'Backend', items: ['PHP', 'Node.js'] },
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
      period: 'En cours',
      org: null,
    },
    {
      title: "Licence — Administration et sécurité des systèmes d'information",
      period: '2022 — 2023',
      org: "Université des Comores — Projet de fin de cycle : proposition d'une application mobile e-commerce",
    },
    {
      title: 'Baccalauréat',
      period: '2019',
      org: 'École Muigni Baraka — Moroni, Comores',
    },
  ],

  languages: [
    { name: 'Français', level: 'Courant', percent: 100 },
    { name: 'Anglais', level: 'Notions de base', percent: 35 },
  ],

  interests: ['Lecture', 'Écriture', 'Cuisine', 'Manga & anime'],
};

app.get('/', (req, res) => {
  res.render('index', { profile });
});

// Envoie un e-mail réel via Gmail à chaque soumission du formulaire
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Champs manquants.' });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('GMAIL_USER / GMAIL_APP_PASSWORD manquants dans .env');
    return res.status(500).json({ ok: false, error: 'Configuration e-mail manquante côté serveur.' });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio — ${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nouveau message depuis le portfolio — ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur envoi e-mail :', err);
    res.status(500).json({ ok: false, error: "Échec de l'envoi de l'e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio disponible sur http://localhost:${PORT}`);
});
