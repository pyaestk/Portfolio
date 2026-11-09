import { memo, useCallback, useEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import { ArrowDown, ArrowUp, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import profilePhoto from "../img/profile-photo.jpg";
import { projects, skills, education, certificates, languages } from "./data/portfolio";

const navigation = ["about", "experience", "work", "github", "skills", "contact"];
const cvHref = `${import.meta.env.BASE_URL}PSTK_CV.pdf`;

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).format(new Date()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;
    const updateGlow = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      section.style.setProperty("--skills-scroll-progress", `${progress * 100}%`);
    };
    updateGlow();
    window.addEventListener("scroll", updateGlow, { passive: true });
    window.addEventListener("resize", updateGlow);
    return () => { window.removeEventListener("scroll", updateGlow); window.removeEventListener("resize", updateGlow); };
  }, []);
  return <span className="clock">BKK <time>{time}</time></span>;
}

function Header() {
  const [active, setActive] = useState("about");
  const dialog = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });
    navigation.forEach((id) => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => dialog.current.close();
  const openMenu = () => dialog.current.showModal();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a href="#about" className="brand" aria-label="Pyae Sone Thant Kyaw home">PSTK<span>©</span></a>
      <Clock />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item, i) => <a href={`#${item}`} key={item} aria-current={active === item ? "location" : undefined}><span>0{i + 1}</span> {item}</a>)}
      </nav>
      <button type="button" className="menu-button" onClick={openMenu} aria-label="Open menu" aria-haspopup="dialog">Menu <Menu size={21} /></button>
    </header>
    <dialog ref={dialog} className="mobile-menu" aria-label="Navigation menu" onClick={(e) => { if (e.target === dialog.current) closeMenu(); }}>
      <div className="menu-heading"><span className="brand">PSTK<span>©</span></span><button type="button" onClick={closeMenu} aria-label="Close menu">Close <X size={21} /></button></div>
      <nav aria-label="Mobile navigation">{navigation.map((item, i) => <a href={`#${item}`} key={item} style={{ "--menu-index": i }} onClick={closeMenu}><span>0{i + 1}</span>{item}</a>)}</nav>
      <Clock />
    </dialog>
  </>;
}

function SectionHeading({ number, label, children }) {
  return <div className="section-heading"><p className="eyebrow">({number}) {label}</p><h2>{children}</h2></div>;
}

function ProjectList() {
  const [open, setOpen] = useState(null);
  return <div className="project-list">
    {projects.map((project, index) => {
      const expanded = open === index;
      return <article className={`project ${expanded ? "is-open" : ""}`} key={project.n}>
        <h3><button className="project-toggle" type="button" id={`project-button-${project.n}`} aria-expanded={expanded} aria-controls={`project-panel-${project.n}`} onClick={() => setOpen(expanded ? null : index)}>
          <span className="project-number">{project.n}</span><span className="project-name">{project.name}<span className="project-kind mobile-kind">{project.kind}</span></span><span className="project-kind desktop-kind">{project.kind}</span><Plus className="project-plus" size={24} aria-hidden="true" />
        </button></h3>
        <div className="project-panel" id={`project-panel-${project.n}`} role="region" aria-labelledby={`project-button-${project.n}`} aria-hidden={!expanded} inert={!expanded ? "" : undefined}>
          <div className="project-panel-clip"><div className="project-panel-content">
          {project.image && <div className={`project-image ${project.n === "04" ? "mobile-project-image" : ""}`} style={{ "--project-color": project.color }}><img src={project.image} alt={`${project.name} application preview`} loading="lazy" /><span className="project-image-caption" aria-hidden="true"><strong>{project.name} screenshot</strong><small>Project images / {project.n}</small></span><span className="project-image-corners" aria-hidden="true" /></div>}
          <div className="project-details"><div className="project-description">{project.desc.map(text => <p key={text}>{text}</p>)}</div><div className="project-stack"><p className="eyebrow muted">Stack</p><p>{project.tags}</p>{project.link && <a className="text-link" href={project.link[1]} target="_blank" rel="noreferrer">{project.link[0]} <ArrowUpRight size={17} /></a>}</div></div>
          </div></div>
        </div>
      </article>;
    })}
  </div>;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("about");
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return <a href="#about" className={`floating-back-to-top ${visible ? "is-visible" : ""}`} aria-label="Back to top" title="Back to top" aria-hidden={!visible} tabIndex={visible ? 0 : -1}><ArrowUp size={22} aria-hidden="true" /></a>;
}

function Shade({ lit, x, y, scale }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M-6 0h12v16l5 10q-3 6 -6 10L42 112H-42L-5 36q-3 -4 -6 -10l5 -10z"
        fill="url(#shade)"
        stroke={lit ? "rgba(255,214,140,.55)" : "rgba(255,255,255,.12)"}
        strokeWidth="1"
        style={{ transition: "stroke .6s" }}
      />
      <path
        d="M-30 100L-9 40"
        stroke="rgba(255,255,255,.18)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="0"
        cy="112"
        rx="42"
        ry="5"
        fill={lit ? "#ffe3a1" : "#2b2a28"}
        style={{ transition: "fill .5s" }}
      />
    </g>
  );
}

function Bulb({ lit, x, y, scale, pulse, onClick, onKeyDown, label }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={lit}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className="lamp-bulb-button"
        style={{
          cursor: "pointer",
          outline: "none",
          pointerEvents: "auto",
          transformOrigin: "0 0",
          transform: pulse ? "scale(.9) translateY(4px)" : "none",
          transition: "transform .2s cubic-bezier(.3,1.6,.5,1)",
        }}
      >
        <rect x="-26" y="-6" width="52" height="70" fill="#000" opacity={0} />
        {/* socket */}
        <rect x="-8" y="-4" width="16" height="10" rx="1.5" fill="#5a5651" stroke="#0b0b0a" strokeWidth=".8" />
        <rect x="-7" y="1" width="14" height="1.5" fill="#0b0b0a" opacity=".6" />
        {/* glass */}
        <path
          d="M-7 5C-7 12 -17 17 -17 30a17 17 0 0 0 34 0C17 17 7 12 7 5z"
          fill={lit ? "#fff1c7" : "rgba(150,135,105,.2)"}
          stroke={lit ? "#ffe3a1" : "var(--ink)"}
          strokeOpacity={lit ? 1 : 0.28}
          strokeWidth="1.2"
          style={{
            transition: "fill .45s, stroke .45s",
            filter: lit ? "drop-shadow(0 0 10px #ffd98a)" : "none",
          }}
        />
        {/* filament */}
        <path
          d="M-3 6V22l3 -4 3 4V6"
          fill="none"
          stroke={lit ? "#ff9a2e" : "var(--ink)"}
          strokeOpacity={lit ? 1 : 0.4}
          strokeWidth="1.2"
          strokeLinejoin="round"
          style={{ transition: "stroke .45s" }}
        />
        <ellipse cx="-6" cy="26" rx="2.5" ry="6" fill="#fff" opacity={lit ? 0.7 : 0.6} />
      </g>
    </g>
  );
}

const Lamps = memo(function Lamps({ dark, onToggle }) {
  const [kick, setKick] = useState(0);
  const [pull, setPull] = useState(false);
  const click = () => {
    setPull(true);
    setKick((k) => k + 1);
    setTimeout(() => setPull(false), 220);
    onToggle();
  };
  const keyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      click();
    }
  };
  return (
    <div className="lamps-wrapper" aria-label="Room lighting controls">
      <svg
        viewBox="0 -48 380 628"
        className="lamps-svg"
        style={{ transformOrigin: "50% 0" }}
      >
        <defs>
          <linearGradient id="shade" x1="0" x2="1">
            <stop offset="0" stopColor="#3a3835" />
            <stop offset=".45" stopColor="#1a1918" />
            <stop offset="1" stopColor="#0b0b0a" />
          </linearGradient>
          <linearGradient id="cone" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ffd98a" stopOpacity=".75" />
            <stop offset=".5" stopColor="#ffd98a" stopOpacity=".2" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="halo">
            <stop offset="0" stopColor="#ffd98a" stopOpacity=".9" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* lamp B (shorter, behind) */}
        <g
          key={`b${kick}`}
          className="lamp-swing lamp-click-target"
          role="button"
          tabIndex={0}
          aria-label={dark ? "Turn the lights off" : "Turn the lights on"}
          aria-pressed={dark}
          onClick={click}
          onKeyDown={keyDown}
          style={{
            transformOrigin: "236px 0",
            animationDelay: ".12s",
            "--amp": "5deg",
          }}
        >
          <line x1="236" y1="-48" x2="236" y2="214" stroke="rgba(160,145,110,.72)" strokeWidth="2.5" />
          <g
            className={dark ? "lamp-on" : ""}
            style={{ opacity: dark ? 1 : 0, transition: "opacity .5s" }}
          >
            <polygon points="206,294 266,294 366,560 106,560" fill="url(#cone)" />
            <ellipse cx="236" cy="292" rx="46" ry="26" fill="url(#halo)" />
          </g>
          <Shade lit={dark} x={236} y={214} scale={0.72} />
          <Bulb lit={dark} x={236} y={291} scale={0.9} pulse={pull} />
        </g>

        {/* lamp A (tall, with pull chain) */}
        <g
          key={`a${kick}`}
          className="lamp-swing lamp-click-target"
          role="button"
          tabIndex={0}
          aria-label={dark ? "Turn the lights off" : "Turn the lights on"}
          aria-pressed={dark}
          onClick={click}
          onKeyDown={keyDown}
          style={{
            transformOrigin: "110px 0",
            "--amp": "7deg",
          }}
        >
          <line x1="110" y1="-48" x2="110" y2="120" stroke="rgba(160,145,110,.72)" strokeWidth="2.5" />
          <g
            className={dark ? "lamp-on" : ""}
            style={{ opacity: dark ? 1 : 0, transition: "opacity .5s" }}
          >
            <polygon points="68,232 152,232 290,560 -70,560" fill="url(#cone)" />
            <ellipse cx="110" cy="250" rx="64" ry="38" fill="url(#halo)" />
          </g>
          <Shade lit={dark} x={110} y={120} scale={1} />
          <Bulb lit={dark} x={110} y={228} scale={1.25} pulse={pull} />
        </g>
      </svg>
    </div>
  );
});

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined" && document.documentElement.dataset.theme) {
      return document.documentElement.dataset.theme;
    }
    try {
      const saved = localStorage.getItem("portfolio-theme") || localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch {
      /* ignore */
    }
    return "dark";
  });

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theming");
    setTheme((current) => (current === "light" ? "dark" : "light"));
    setTimeout(() => root.classList.remove("theming"), 900);
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("portfolio-theme", theme);
      localStorage.setItem("theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [theme]);
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!motionPreference.matches) {
          const animation = entry.target.animate(
            [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 700, easing: "cubic-bezier(.16, 1, .3, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".section-heading, .section-summary, .experience-row, .project-list, .github-panel, .skill-row, .credentials > div, .contact-summary, .contact-email, .contact-links").forEach(element => observer.observe(element));
    const stopAnimations = () => { if (motionPreference.matches) animations.forEach(animation => animation.cancel()); };
    motionPreference.addEventListener("change", stopAnimations);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", stopAnimations);
      animations.forEach(animation => animation.cancel());
    };
  }, []);
  return <div className="site-shell">
    <Header />
    <main className="page-frame" id="main">
      <section className="hero" id="about">
        <div
          className="hero-ambient-glow"
          style={{ opacity: theme === "dark" ? 1 : 0 }}
          aria-hidden="true"
        />
        <Lamps dark={theme === "dark"} onToggle={toggleTheme} />
        <div className="hero-intro">
          <div className="profile-intro"><img className="profile-image" src={profilePhoto} alt="Pyae Sone Thant Kyaw" fetchpriority="high" width="224" height="280" /><p>Computer Science master's student building full-stack web and native Android apps, from intuitive UI and robust REST APIs to automated CI/CD deployment.</p></div>
        </div>
        <h1>Pyae Sone<br /><em>Thant</em> Kyaw</h1>
        <div className="hero-meta">
          <p><span>Role</span>Software Developer</p><p><span>Based in</span>Bangkok, Thailand</p><p><span>Focus</span>Web, Mobile, AI, DevOps</p>
          <div className="hero-actions"><a className="button primary" href={cvHref} download="PyaeSone_ThantKyaw_CV.pdf">Download CV <ArrowDown size={15} /></a><a className="button secondary" href="#work">Work <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <section className="section experience" id="experience">
        <SectionHeading number="01" label="Experience">Shipping <em>complete</em> products, end to end.</SectionHeading>
        <p className="section-summary">Proven track record delivering production platforms for campus organizations, indie mobile apps, and freelance clients.</p>
        <article className="experience-row"><p className="eyebrow">Feb 2025 — Now</p><div><h3>Freelance Software Developer</h3><p className="eyebrow muted">Self-employed</p></div><ul>{[
          "Developed web platforms for university initiatives and student sports clubs, integrating booking, payment workflows, and tournament management.",
          "Architected and published indie Android applications with Kotlin and Jetpack Compose, featuring offline-first storage and cloud sync.",
          "Configured CI/CD pipelines using GitHub Actions, Docker, and Nginx on Ubuntu servers to automate testing, build, and production deployments.",
        ].map(text => <li key={text}><span aria-hidden="true">+</span>{text}</li>)}</ul></article>
      </section>

      <div className="marquee" role="img" aria-label="Build clean software, keep learning, ship it."><div className="marquee-track" aria-hidden="true">{[0, 1].map(key => <span key={key}>Build clean software <span>✦</span> keep learning <span>✦</span> ship it <span>✦</span> </span>)}</div></div>

      <section className="section" id="work">
        <span id="projects" className="anchor-alias" />
        <SectionHeading number="02" label="Selected work">My projects</SectionHeading>
        <ProjectList />
      </section>

      <section className="section" id="github">
        <SectionHeading number="03" label="GitHub">Code, in the <em>open.</em></SectionHeading>
        <div className="github-panel"><div className="calendar-scroll"><GitHubCalendar username="pyaestk" colorScheme={theme} blockSize={11} blockMargin={4} blockRadius={2} fontSize={11} style={{ fontFamily: "var(--mono)", margin: "0 auto" }} theme={{ light: ["#e0dfd6", "#c7e0ce", "#8dc9a2", "#3ddc84", "#168348"], dark: ["#252d28", "#254b34", "#317b4d", "#37b96b", "#3ddc84"] }} errorMessage="GitHub activity is unavailable right now. Visit my profile to see recent work." /></div><a className="text-link" href="https://github.com/pyaestk" target="_blank" rel="noreferrer">View profile <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="section" id="skills">
        <SectionHeading number="04" label="Skills">Full-stack, mobile & <em>DevOps.</em></SectionHeading>
        <dl className="skills-list">{skills.map(([label, items], rowIndex) => <div className="skill-row" key={label}><dt className="eyebrow">{label}</dt><dd className="skills-flow" style={{ "--wave-delay": `${-rowIndex * 0.8}s` }}>{items.map(item => <span key={item}>{item}</span>)}</dd></div>)}</dl>
      </section>

      <section className="credentials section" aria-label="Education, certificates and languages"><div><h2 className="eyebrow credential-heading">(05) Education</h2>{education.map(item => <article className="education-row" key={item.title}><p className="eyebrow muted">{item.date}</p><div><h3>{item.title}</h3><p>{item.place}</p>{item.note && <p>{item.note}</p>}</div></article>)}</div><div><h2 className="eyebrow credential-heading">(06) Certificates & languages</h2><ul className="certificates">{certificates.map(item => <li key={item}>{item}</li>)}</ul><dl className="language-list">{languages.map(item => <div key={item.language}><dt>{item.language}</dt><dd>{item.level}</dd></div>)}</dl></div></section>
    </main>

    <div className="marquee" role="img" aria-label="Build clean software, keep learning, ship it."><div className="marquee-track" aria-hidden="true">{[0, 1].map(key => <span key={key}>Build clean software <span>✦</span> keep learning <span>✦</span> ship it <span>✦</span> </span>)}</div></div>

    <footer className="contact page-frame" id="contact"><p className="eyebrow">(07) Contact</p><p className="contact-summary">Open to freelance Android work, web collaboration, backend integration, and early-career software developer opportunities.</p><a className="contact-email" href="mailto:pyaesonethantkyaw205@gmail.com">pyaesonethantkyaw205<br />@gmail.com <ArrowUpRight aria-hidden="true" /></a><div className="contact-links">
      <a href="https://github.com/pyaestk" target="_blank" rel="noreferrer">GitHub ↗<span>github.com/pyaestk</span></a><a href="https://linkedin.com/in/pyaestk" target="_blank" rel="noreferrer">LinkedIn ↗<span>linkedin.com/in/pyaestk</span></a><a href="https://pyaestk.dev" target="_blank" rel="noreferrer">Website ↗<span>pyaestk.dev</span></a><a href="tel:+66610525441">Phone<span>(+66) 0610525441</span></a><p>Location<span>Bangkok, Thailand</span></p>
    </div><div className="footer-bottom"><p>© {new Date().getFullYear()} Pyae Sone Thant Kyaw</p></div></footer>
    <BackToTop />
  </div>;
}
