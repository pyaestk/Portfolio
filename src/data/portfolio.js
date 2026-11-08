import bangkokTransit from "../../img/bangkok-transit-preview.png";
import courtConnect from "../../img/courtconnect-thumbnail.png";
import suitCase from "../../img/android-project2-thumbnail.png";
import futureResidency from "../../img/project1-thumbnail-min.png";
import chronosense from "../../img/project2-thumbnail-min.png";
import potterVerse from "../../img/android-project1-thumbnail.png";
export const projects = [
  { n: '01', name: 'Bangkok Transit', kind: 'Public railway platform', desc: ['Developed responsive UI for a map-based railway navigation and trip planning platform.', 'Integrated frontend components with backend APIs to display routes and station information.'], tags: 'React.js, REST APIs, Maps, FastAPI', image: bangkokTransit, color: '#9fb8d8', link: ['Live demo', 'https://bangkoktransit.onrender.com'] },
  { n: '02', name: 'Court Connect', kind: 'Mahidol badminton club system', desc: ['Integrated frontend components with backend APIs to support court bookings, player sessions, wallet payments, and payment proof submission.', 'Collaborated on LINE integration and backend API workflows for smoother player and organizer experiences.'], tags: 'React.js, REST APIs, LINE, Docker', image: courtConnect, color: '#b7d3a8', link: ['Live demo', 'https://cconnect.tspdigital.solutions'] },
  { n: '03', name: 'GradMUSU', kind: 'Graduate Student Union event platform', desc: ['Developed a platform for graduate students to manage profiles, register for events, join waitlists, and check in using QR codes.', 'Built organizer and admin workflows for event management, conditional registration forms, and post-event evaluations.'], tags: 'Full-stack, QR check-in, Admin tools', color: '#e8c48f' },
  { n: '04', name: 'Suit Case', kind: 'Travel packing list Android app', desc: ['Developed an Android app for creating and managing trip-based packing lists.', 'Implemented login, cloud sync, photo uploads, swipe actions, and shake-to-pack interaction.'], tags: 'Kotlin, Jetpack Compose, Firebase', image: suitCase, color: '#d9b3c9', link: ['Source on GitHub', 'https://github.com/pyaestk/Suit-Case'] },
  { n: '05', name: 'Student Performance Analysis', kind: 'Machine learning & statistical testing', desc: ['Analyzed student laboratory and examination performance to identify factors influencing academic outcomes.', 'Developed machine learning models to predict performance and evaluate key predictors, visualizing trends to support data-driven educational decisions.'], tags: 'Python, Pandas, Scikit-learn, Statistics', color: '#c4c8e8' },
  { n: '06', name: 'Line Follower Garbage Truck', kind: 'IoT autonomous robot', desc: ['Led development of an IoT-enabled robotic waste collection system.', 'Implemented line-following navigation, obstacle detection, and automated waste collection, with remote monitoring and control through Blynk.'], tags: 'IoT, Embedded, Blynk', color: '#e8a9a0', link: ['Watch demo', 'https://youtu.be/Z_S7mKZLvr8?si=AIdOmpmlI5uHrAkM&t=96'] },
]

export const skills = [
  ['Languages', ['Java', 'Kotlin', 'Python', 'JavaScript', 'TypeScript', 'Dart', 'SQL']],
  ['Frontend', ['React.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap']],
  ['Backend', ['FastAPI', 'Express.js', 'Spring Boot', 'RESTful APIs']],
  ['Mobile', ['Android (Kotlin)', 'Jetpack Compose', 'Flutter', 'MVVM', 'Clean Architecture']],
  ['DevOps', ['Docker', 'Linux (Ubuntu)', 'Nginx', 'GitHub Actions', 'DigitalOcean']],
  ['Data science', ['Pandas', 'NumPy', 'Scikit-learn', 'Data Visualization', 'Statistical Analysis', 'Machine Learning']],
]

export const moreProjects = [
  {
    title: "Future Residency",
    type: "Responsive web design",
    description: "Classic real-estate website design with responsive pages and Bootstrap components.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: futureResidency,
    href: "https://pyaestk.github.io/Future-residency/",
    action: "Live demo",
  },
  {
    title: "Potter Verse",
    type: "Android application",
    description: "Android app that gives users information about the Harry Potter universe.",
    tags: ["Kotlin", "Room", "Android"],
    image: potterVerse,
    href: "https://github.com/pyaestk/PotterVerse",
    action: "Source code",
  },
  {
    title: "Chronosense",
    type: "Responsive web design",
    description: "Modern watch business website with product-focused presentation and clean layouts.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: chronosense,
    href: "https://pyaestk.github.io/chronosense/",
    action: "Live demo",
  },
  {
    title: "Cake Store App",
    type: "Android e-commerce application",
    description:
      "Authentication, cart management, checkout, and order tracking built with Firebase, Coroutines, StateFlow, and Koin.",
    tags: ["Kotlin", "Firebase", "StateFlow", "Koin", "MVVM", "Jetpack Compose", "Clean Architecture"],
    action: "Source code",
    href: "https://github.com/pyaestk/Cake-Store-App"
  },
  {
    title: "Expense Tracker",
    type: "Personal finance application",
    description:
      "Income, expense, budget, preferences, and analytics features with local persistence and reactive UI updates.",
    tags: ["Android", "Persistence", "Analytics", "MVVM", "Jetpack Compose", "Kotlin", "Room", "StateFlow", "Clean Architecture"],
    action: "Source code",
    href: "https://github.com/pyaestk/Expenses-Tracker"
  },
  {
    title: "Secure Authentication",
    type: "Security-focused Android app",
    description:
      "Password hashing, email verification, OTP-based two-factor authentication, bot protection, validation, and login timeout controls.",
    tags: ["Android", "Security", "OTP", "Authentication", "Kotlin", "HCaptcha", "Firebase", "2FA", "Password Hashing"],
    action: "Source code",
    href: "https://github.com/pyaestk/Secure-Authentication"
  }
];

export const education = [
  {
    "date": "Expected Aug 2027",
    "title": "Master of Science: Computer Science",
    "place": "Mahidol University — Thailand"
  },
  {
    "date": "Feb 2025",
    "title": "Bachelor of Science: Computer System Engineering",
    "place": "University of Sunderland — United Kingdom"
  }
];

export const certificates = [
  "Android App Development with Kotlin – Udemy",
  "Create REST APIs with Spring and Java – Codecademy",
  "CS50's Introduction to Computer Science – Harvard University",
  "Exploring Networking with Cisco Packet Tracer",
  "Learn CI/CD with GitHub Actions, Docker and Go – Boot.dev"
];

export const languages = [
  {
    "language": "English",
    "level": "Full professional"
  },
  {
    "language": "Burmese",
    "level": "Native or bilingual"
  },
  {
    "language": "Thai",
    "level": "Elementary"
  }
];
