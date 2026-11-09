import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(0);
  return <div className="project-list">
    {projects.map((project, index) => {
      const expanded = open === index;
      return <article className={`project ${expanded ? "is-open" : ""}`} key={project.n}>
        <h3><button className="project-toggle" type="button" id={`project-button-${project.n}`} aria-expanded={expanded} aria-controls={`project-panel-${project.n}`} onClick={() => setOpen(expanded ? null : index)}>
          <span className="project-number">{project.n}</span><span className="project-name">{project.name}<span className="project-kind mobile-kind">{project.kind}</span></span><span className="project-kind desktop-kind">{project.kind}</span><Plus className="project-plus" size={24} aria-hidden="true" />
        </button></h3>
        <div className="project-panel" id={`project-panel-${project.n}`} role="region" aria-labelledby={`project-button-${project.n}`} aria-hidden={!expanded} inert={!expanded ? "" : undefined}>
          <div className="project-panel-clip"><div className="project-panel-content">
          {project.image && <div className={`project-image ${project.n === "04" ? "mobile-project-image" : ""}`} style={{ backgroundColor: project.color }}><img src={project.image} alt={`${project.name} application preview`} loading="lazy" /></div>}
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

export default function App() {
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
        <div className="hero-intro">
          <div className="profile-intro"><img className="profile-image" src={profilePhoto} alt="Pyae Sone Thant Kyaw" fetchpriority="high" width="224" height="280" /><p>Computer Science master's student building full-stack web and native Android apps, from intuitive UI and robust REST APIs to automated CI/CD deployment.</p></div>
          <a href="#contact" className="availability" aria-label="Available for freelance work. Get in touch."><svg className="availability-ring" viewBox="0 0 100 100" aria-hidden="true">
            <defs><path id="availability-circle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" /></defs>
            <text><textPath href="#availability-circle">AVAILABLE FOR FREELANCE · AVAILABLE FOR FREELANCE ·</textPath></text>
          </svg><span className="availability-arrow" aria-hidden="true">↘</span></a>
        </div>
        <h1>Pyae Sone<br /><em>Thant</em> Kyaw</h1>
        <div className="hero-meta">
          <p><span>Role</span>Software Developer</p><p><span>Based in</span>Bangkok, Thailand</p><p><span>Focus</span>React, Kotlin, FastAPI, Spring Boot</p>
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

      <section className="section" id="work">
        <span id="projects" className="anchor-alias" />
        <SectionHeading number="02" label="Selected work">My projects</SectionHeading>
        <ProjectList />
      </section>

      <section className="section" id="github">
        <SectionHeading number="03" label="GitHub">Code, in the <em>open.</em></SectionHeading>
        <div className="github-panel"><div className="calendar-scroll"><GitHubCalendar username="pyaestk" colorScheme="light" blockSize={11} blockMargin={4} blockRadius={2} fontSize={11} style={{ fontFamily: "var(--mono)", margin: "0 auto" }} theme={{ light: ["#e0dfd6", "#c7e0ce", "#8dc9a2", "#3ddc84", "#168348"] }} errorMessage="GitHub activity is unavailable right now. Visit my profile to see recent work." /></div><a className="text-link" href="https://github.com/pyaestk" target="_blank" rel="noreferrer">View profile <ArrowUpRight size={16} /></a></div>
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
