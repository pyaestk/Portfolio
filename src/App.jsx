import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Server,
  Smartphone,
  Wrench,
  X,
} from "lucide-react";
import bgVideo from "../img/background-vid.mp4";
import bangkokTransit from "../img/bangkok-transit-preview.png";
import futureResidency from "../img/project1-thumbnail-min.png";
import chronosense from "../img/project2-thumbnail-min.png";
import potterVerse from "../img/android-project1-thumbnail.png";
import suitCase from "../img/android-project2-thumbnail.png";
import profilePhoto from "../img/profile-photo.jpg";

const cvHref = `${import.meta.env.BASE_URL}CV.pdf`;

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const roleWords = [
  "Software Developer",
  "Android Developer",
  "Computer Science MSc Student",
];

const profileFacts = [
  {
    label: "Current role",
    value: "Freelance Android Developer",
    detail: "Building Kotlin and Java apps with Firebase, REST APIs, MVVM, and Compose.",
  },
  {
    label: "Work range",
    value: "Mobile, web, backend, and data",
    detail: "React, FastAPI, Spring Boot, Docker, Python analytics, and SQL/MongoDB.",
  },
];

const experience = [
  {
    role: "Freelance Android Developer",
    company: "Remote clients",
    period: "Mar 2025 - Current",
    details: [
      "Develop custom Android applications using Kotlin and Java with MVVM, clean code principles, Jetpack Compose, and View-based UI.",
      "Integrate Firebase, REST APIs, and third-party libraries into practical client solutions.",
      "Design responsive mobile interfaces following Material Design and collaborate remotely through delivery.",
    ],
  },
];

const projects = [
  {
    title: "Bangkok Transit",
    type: "Public railway transportation platform",
    description:
      "Responsive map-based trip planning UI connected with backend APIs for route and station information.",
    tags: ["React", "REST APIs", "UI/UX", "Maps", "Python", "FastAPI", "MySQL", "Docker", "Nginx"],
    image: bangkokTransit,
    imageVariant: "wide",
    action: "Live demo",
    href: "https://bangkokrailway.teraz.tech/",
  },
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
    title: "Suit-Case",
    type: "Android application",
    description: "Android travel packing manager for organizing trip items and preparation lists.",
    tags: ["Kotlin", "Firebase", "Android"],
    image: suitCase,
    href: "https://github.com/pyaestk/Suit-Case",
    action: "Source code",
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
    title: "Student Performance Analysis",
    type: "Machine learning and statistical testing",
    description:
      "Cleaned education datasets, engineered features, tested hypotheses, trained models, and visualized performance trends.",
    tags: ["Python", "Pandas", "Scikit-learn", "Statistics", "Data Visualization", "Machine Learning", "Hypothesis Testing"],
  },
  {
    title: "Secure Authentication",
    type: "Security-focused Android app",
    description:
      "Password hashing, email verification, OTP-based two-factor authentication, bot protection, validation, and login timeout controls.",
    tags: ["Android", "Security", "OTP", "Authentication", "Kotlin", "HCaptcha", "Firebase", "2FA", "Password Hashing"],
    action: "Source code",
    href: "https://github.com/pyaestk/Secure-Authentication"
  },
];

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    items: ["Java", "Kotlin", "Python", "JavaScript", "Dart", "SQL"],
  },
  {
    title: "Frontend",
    icon: Smartphone,
    items: ["React.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["FastAPI", "Spring Boot", "RESTful APIs", "Authentication", "Authorization"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    items: ["Android", "Jetpack Compose", "Flutter", "MVVM", "Clean Architecture"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["Pandas", "NumPy", "Scikit-learn", "Data Visualization", "Machine Learning"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["GitHub", "Firebase", "Postman", "SonarQube", "Figma", "Docker", "Nginx"],
  },
];

const education = [
  {
    date: "Expected Aug 2027",
    title: "Master of Science: Computer Science",
    place: "Mahidol University - Thailand",
  },
  {
    date: "Feb 2025",
    title: "Bachelor of Science: Computer Systems Engineering",
    place: "University of Sunderland - United Kingdom",
  },
  {
    date: "13 Feb 2024",
    title: "Pearson BTEC Higher National Diploma in Computing",
    place: "GUSTO College - Myanmar",
    note: "Final Grade: Distinction",
  },
  {
    date: "Graduated in 2020",
    title: "Highschool Diploma",
    place: "Great Crown Private Highschool - Myanmar",
  },
];

const certificates = [
  "Android App Development with Kotlin - Udemy",
  "Create REST APIs with Spring and Java - Codecademy",
  "Learn Docker - Boot.dev",
  "Learn CI/CD with GitHub Actions, Docker and Go Course - Boot.dev",
  "CS50's Introduction to Computer Science - Harvard University",
  "Learn Java - Codecademy",
  "Exploring Networking with Cisco Packet Tracer",
];

const languages = [
  { language: "Burmese", level: "Native or Bilingual" },
  { language: "English", level: "Native or Bilingual" },
  { language: "Thai", level: "Limited Working" },
];

function useTyping(words) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let timerId;

    const tick = () => {
      const word = words[wordIndex % words.length];

      if (isDeleting) {
        letterIndex -= 1;
        setTypedText(word.slice(0, letterIndex));
      } else {
        letterIndex += 1;
        setTypedText(word.slice(0, letterIndex));
      }

      if (!isDeleting && letterIndex === word.length) {
        isDeleting = true;
        timerId = window.setTimeout(tick, 1200);
        return;
      }

      if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex += 1;
      }

      timerId = window.setTimeout(tick, isDeleting ? 36 : 68);
    };

    timerId = window.setTimeout(tick, 420);
    return () => window.clearTimeout(timerId);
  }, [words]);

  return typedText;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const projectsContainerRef = useRef(null);
  const typedText = useTyping(roleWords);

  const scrollProjects = (direction) => {
    if (projectsContainerRef.current) {
      const card = projectsContainerRef.current.querySelector(".project-card");
      const cardWidth = card ? card.offsetWidth + 20 : 360;
      projectsContainerRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <video className="background-video" autoPlay loop muted playsInline aria-hidden="true">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="background-shade" aria-hidden="true" />

      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand-mark" href="#home" aria-label="Pyae Sone Thant Kyaw home">
            PSTK
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`site-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section section-frame" id="home">
          <div className="hero-copy">
            <p className="eyebrow" data-reveal style={{ "--reveal-delay": "100ms" }}>
              Bangkok, Thailand
            </p>
            <h1 data-reveal style={{ "--reveal-delay": "200ms" }}>
              Pyae Sone
              <span>Thant Kyaw</span>
            </h1>
            <p className="role-line" data-reveal style={{ "--reveal-delay": "300ms" }}>
              Hi, I am <span>{typedText}</span>
            </p>
            <p className="hero-summary" data-reveal style={{ "--reveal-delay": "400ms" }}>
              A 22-year-old Master's student in Computer Science and freelance Android developer
              building practical, clean, and responsive software across mobile, web, backend, and
              data-focused projects.
            </p>

            <div className="hero-actions" data-reveal style={{ "--reveal-delay": "500ms" }}>
              <a className="button button-primary" href={cvHref} download="PyaeSone_ThantKyaw_CV.pdf">
                <Download size={18} />
                Download CV
              </a>
              <a className="button button-secondary" href="#projects">
                <ArrowUpRight size={18} />
                View projects
              </a>
            </div>
          </div>

          <div className="hero-photo-wrapper" data-reveal style={{ "--reveal-delay": "350ms" }}>
            <div className="hero-photo-glow" aria-hidden="true" />
            <figure className="hero-photo">
              <img src={profilePhoto} alt="Pyae Sone Thant Kyaw portrait" />
              <figcaption className="photo-caption">
                <span>Pyae Sone Thant Kyaw</span>
                <strong>Software & Mobile Developer</strong>
              </figcaption>
            </figure>
          </div>

          <a href="#experience" className="scroll-indicator" aria-label="Scroll down to Experience" data-reveal style={{ "--reveal-delay": "600ms" }}>
            <span>Scroll down</span>
            <ChevronDown size={18} className="scroll-arrow" />
          </a>
        </section>

        <section className="profile-section section-frame" aria-label="Profile snapshot">
          <div className="profile-panel" data-reveal style={{ "--reveal-delay": "100ms" }}>
            <p className="eyebrow">Profile snapshot</p>
            <h2>Practical software work across Android and web.</h2>
            <p>
              Currently combining freelance Android delivery with graduate study in computer
              science, with a growing stack across frontend, backend, cloud, and data analysis.
            </p>
            <div className="profile-tags">
              <span>Kotlin</span>
              <span>React</span>
              <span>FastAPI</span>
              <span>Firebase</span>
            </div>
          </div>

          <div className="profile-facts" aria-label="Profile highlights" data-reveal style={{ "--reveal-delay": "250ms" }}>
            {profileFacts.map((item, index) => (
              <div className="profile-fact" key={item.label} style={{ "--reveal-delay": `${index * 120}ms` }}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section section-frame" id="experience">
          <SectionIntro
            label="Experience"
            title="Building Android apps with practical delivery in mind."
          />

          <div className="experience-grid">
            {experience.map((item, index) => (
              <article className="experience-card" key={item.role} data-reveal style={{ "--reveal-delay": `${index * 120}ms` }}>
                <div className="card-icon">
                  <Briefcase size={22} />
                </div>
                <div>
                  <p className="card-kicker">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="company">{item.company}</p>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-frame" id="projects">
          <div className="section-heading-row">
            <SectionIntro
              label="Projects"
              title="My work across mobile, web, analytics, and engineering tooling."
            />
            <div className="carousel-controls-group">
              <div className="carousel-nav-btns">
                <button
                  type="button"
                  className="carousel-btn"
                  onClick={() => scrollProjects("left")}
                  aria-label="Previous projects"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="carousel-btn"
                  onClick={() => scrollProjects("right")}
                  aria-label="Next projects"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <a href="https://github.com/pyaestk" target="_blank" rel="noreferrer" className="github-link-btn">
                <Github size={18} />
                GitHub profile
              </a>
            </div>
          </div>

          <div className="projects-carousel-container">
            <div className="projects-carousel-track" ref={projectsContainerRef}>
              {projects.map((project, index) => (
                <article
                  className={`project-card ${project.image ? "has-image" : ""} ${project.imageVariant === "wide" ? "wide-preview" : ""
                    }`}
                  key={project.title}
                  data-reveal
                  style={{ "--reveal-delay": `${(index % 3) * 100}ms` }}
                >
                  {project.image ? (
                    <div className="project-image-wrapper">
                      <img src={project.image} alt={`${project.title} project preview`} />
                    </div>
                  ) : null}
                  <div className="project-card-body">
                    <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                    <p className="card-kicker">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <TagList tags={project.tags} />
                    {project.href ? (
                      <a className="project-action" href={project.href} target="_blank" rel="noreferrer">
                        {project.action}
                        <ExternalLink size={16} />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-frame" id="skills">
          <SectionIntro
            label="Skills"
            title="A broader stack, still grounded in Android and software fundamentals."
            text="React, Spring Boot, FastAPI, Docker, data analysis, and CI/CD now sit beside Kotlin, Java, Firebase, and clean architecture."
          />

          <div className="skills-grid">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article className="skill-card" key={group.title} data-reveal style={{ "--reveal-delay": `${(index % 3) * 100}ms` }}>
                  <div className="skill-heading">
                    <Icon size={21} />
                    <h3>{group.title}</h3>
                  </div>
                  <TagList tags={group.items} />
                </article>
              );
            })}
          </div>
        </section>

        <section className="split-section section-frame">
          <div className="panel-column" data-reveal style={{ "--reveal-delay": "100ms" }}>
            <SectionMiniHeading icon={GraduationCap} label="Education" />
            <div className="timeline-list">
              {education.map((item, index) => (
                <article className="timeline-item" key={item.title} style={{ "--reveal-delay": `${index * 100}ms` }}>
                  <span>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  {item.note ? <strong>{item.note}</strong> : null}
                </article>
              ))}
            </div>
          </div>

          <div className="panel-column" data-reveal style={{ "--reveal-delay": "250ms" }}>
            <SectionMiniHeading icon={Award} label="Certificates" />
            <ul className="certificate-list">
              {certificates.map((certificate) => (
                <li key={certificate}>{certificate}</li>
              ))}
            </ul>

            <div className="language-panel">
              <h3>Languages</h3>
              {languages.map((item) => (
                <p key={item.language}>
                  <strong>{item.language}</strong>
                  <span>{item.level}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-frame" id="contact">
          <div className="contact-copy" data-reveal style={{ "--reveal-delay": "100ms" }}>
            <p className="eyebrow">Contact</p>
            <h2>Let's build something clean, useful, and thoughtfully engineered.</h2>
            <p>
              I am open to freelance Android work, web collaboration, backend integration, and
              early-career software developer opportunities.
            </p>
          </div>

          <div className="contact-grid" data-reveal style={{ "--reveal-delay": "250ms" }}>
            <ContactLink icon={Mail} label="Email" href="mailto:pyaesonethantkyaw205@gmail.com">
              pyaesonethantkyaw205@gmail.com
            </ContactLink>
            <ContactLink icon={Github} label="GitHub" href="https://github.com/pyaestk">
              github.com/pyaestk
            </ContactLink>
            <ContactLink icon={Linkedin} label="LinkedIn" href="https://linkedin.com/in/pyaestk">
              linkedin.com/in/pyaestk
            </ContactLink>
            <ContactLink icon={Phone} label="Phone" href="tel:+660610525441">
              (+66) 0610525441
            </ContactLink>
            <div className="contact-link">
              <MapPin size={20} />
              <span>Location</span>
              <strong>Bangkok, Thailand</strong>
            </div>
          </div>
        </section>
      </main>

      <button
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        onClick={scrollToTop}
        type="button"
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

function SectionIntro({ label, title, text }) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function SectionMiniHeading({ icon: Icon, label }) {
  return (
    <div className="mini-heading">
      <Icon size={22} />
      <h2>{label}</h2>
    </div>
  );
}

function TagList({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function ContactLink({ icon: Icon, label, href, children }) {
  const isExternal = href.startsWith("http");

  return (
    <a
      className="contact-link"
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      <Icon size={20} />
      <span>{label}</span>
      <strong>{children}</strong>
    </a>
  );
}

export default App;
