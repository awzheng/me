/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SocialLinks from "./components/SocialLinks";
import GoldenRatioImage from "./components/GoldenRatioImage";

const Chevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="sidebar-chevron"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const AppIcon = ({ src, alt }: { src: string; alt: string }) => (
  <div className="sidebar-icon">
    <img src={src} alt={alt} draggable={false} />
  </div>
);

export default function Home() {
  return (
    <main>
      <div className="page-grid">

        {/* ── Left Column: Sticky Sidebar ──────────────────── */}
        <div className="left-col">
          <header className="header">
            <h1>Andrew Zheng</h1>
            <SocialLinks />
          </header>

          {/* Education */}
          <section className="section" id="education">

            {/* University of Waterloo */}
            <Link
              href="https://uwaterloo.ca/electrical-computer-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <AppIcon src="/images/icons/waterloo-logo.jpg" alt="University of Waterloo" />
              <div className="sidebar-text">
                <span className="sidebar-title">University of Waterloo</span>
                <span className="sidebar-subtitle">Computer Engineering</span>
              </div>
              <Chevron />
            </Link>
          </section>

          {/* Experience */}
          <section className="section" id="about">
            <h2>Experience</h2>

            {/* Miovision*/}
            <Link
              href="https://miovision.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <AppIcon src="/images/icons/miovision.png" alt="Miovision" />
              <div className="sidebar-text">
                <span className="sidebar-title">Miovision</span>
                <span className="sidebar-subtitle">S26 Software Engineering Intern</span>
              </div>
              <Chevron />
            </Link>

            {/* Rocketry*/}
            <Link
              href="https://www.waterloorocketry.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <AppIcon src="/images/icons/rocketry.png" alt="Waterloo Rocketry" />
              <div className="sidebar-text">
                <span className="sidebar-title">Waterloo Rocketry</span>
                <span className="sidebar-subtitle">Embedded Systems Developer</span>
              </div>
              <Chevron />
            </Link>

            {/* Case Contest Coach */}
            <Link
              href="https://www.decadirect.org/articles/congratulations-to-the-2024-deca-icdc-competitive-event-champions"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <AppIcon src="/images/icons/case.png" alt="Case Contest Coach" />
              <div className="sidebar-text">
                <span className="sidebar-title">Self-Employed</span>
                <span className="sidebar-subtitle">Case Contest Coach · $10K revenue</span>
              </div>
              <Chevron />
            </Link>

            {/* DECA ICDC 2024 */}
            {/* <Link
              href="https://www.decadirect.org/articles/congratulations-to-the-2024-deca-icdc-competitive-event-champions"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item"
            >
              <AppIcon src="/images/icons/deca.png" alt="DECA ICDC 2024" />
              <div className="sidebar-text">
                <span className="sidebar-title">DECA ICDC 2024</span>
                <span className="sidebar-subtitle">1st Place Glass · BTDM</span>
              </div>
              <Chevron />
            </Link> */}
          </section>



          <footer className="footer">
            {/* Golden Ratio decorative image */}
            <GoldenRatioImage />
            Designed by Andrew Zheng in Markham<br />Made in Waterloo
          </footer>
        </div>

        {/* ── Right Column: Scrollable Main Content ────────── */}
        <div className="right-col" id="projects">

          {/* Sticky Discover Header */}
          <header className="projects-header">
            <span className="projects-header-title">Projects</span>
          </header>

          {/* Hero Banner — inset to card width (2rem each side), pulled up
               so Discover header overlays the top edge via negative margin. */}
          <div style={{ padding: '0 2rem', marginTop: '-3rem' }}>
            <img
              src="/images/blindsighted.jpeg"
              alt="Blindsighted"
              draggable={false}
              style={{
                display: 'block',
                width: '100%',
                aspectRatio: '21 / 9',
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: '0.75rem',
              }}
            />
          </div>

          {/* Projects Grid */}
          <div style={{ padding: '1.5rem 2rem 2.5rem' }}>
            {/* <h3 style={{ marginBottom: '1rem' }}>Projects</h3> */}
            <div className="project-grid">

              {/* Allocate */}
              <div className="project-card">
                <a
                  href="https://github.com/awzheng/Allocate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <div
                    className="project-card-image"
                    style={{ background: 'linear-gradient(135deg, #1a2d4f 0%, #0096ff 100%)' }}
                  >
                    <img className="project-card-thumbnail" src="/images/project-thumbnails/allocate.png" alt="Allocate" draggable={false} />
                  </div>
                </a>
                <div className="project-card-text">
                  {/* <span className="project-card-category">Golang · MongoDB · Rest API</span> */}
                  <a
                    href="https://github.com/awzheng/Allocate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >Allocate</a>
                  <span className="project-card-subtitle">Proactive macOS CPU Core Manager</span>
                </div>
              </div>

              {/* SageWall */}
              <div className="project-card">
                <a
                  href="https://github.com/awzheng/SageWall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <div
                    className="project-card-image"
                    style={{ background: 'linear-gradient(135deg, #1a3a38 0%, #3dbdb6 100%)' }}
                  >
                    <img className="project-card-thumbnail" src="/images/project-thumbnails/sagewall.png" alt="SageWall" draggable={false} />
                  </div>
                </a>
                <div className="project-card-text">
                  {/* <span className="project-card-category">AWS · Python · Machine Learning</span> */}
                  <a
                    href="https://github.com/awzheng/SageWall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >SageWall</a>
                  <span className="project-card-subtitle">MLOps Cloud Security System</span>
                </div>
              </div>

              {/* CrawlStars */}
              <div className="project-card">
                <a
                  href="https://github.com/awzheng/CrawlStars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <div
                    className="project-card-image"
                    style={{ background: 'linear-gradient(135deg, #4f1a2f 0%, #c9953e 100%)' }}
                  >
                    <img className="project-card-thumbnail" src="/images/project-thumbnails/crawlstars.png" alt="CrawlStars" draggable={false} />
                  </div>
                </a>
                <div className="project-card-text">
                  {/* <span className="project-card-category">Golang · MongoDB · Rest API</span> */}
                  <a
                    href="https://github.com/awzheng/CrawlStars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >CrawlStars</a>
                  <span className="project-card-subtitle">Concurrent Search Engine</span>
                </div>
              </div>

              {/* Autotoon */}
              <div className="project-card">
                <a
                  href="https://github.com/awzheng/Autotoon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <div
                    className="project-card-image"
                    style={{ background: 'linear-gradient(135deg, #2d1b4e 0%, #c44dce 100%)' }}
                  >
                    <img className="project-card-thumbnail" src="/images/project-thumbnails/autotoon.png" alt="Autotoon" draggable={false} />
                  </div>
                </a>
                <div className="project-card-text">
                  {/* <span className="project-card-category">Generative AI</span> */}
                  <a
                    href="https://github.com/awzheng/Autotoon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >Autotoon</a>
                  <span className="project-card-subtitle">PDF-to-Manga AI Illustrator</span>
                </div>
              </div>

              {/* Remote Arming Board */}
              <div className="project-card">
                <a
                  href="https://github.com/waterloo-rocketry/canhw/tree/ra_respin_2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <div
                    className="project-card-image"
                    style={{ background: 'linear-gradient(135deg, #3b1200 0%, #e05c1a 100%)' }}
                  >
                    <span style={{ fontSize: '2.25rem' }}>🚀</span>
                  </div>
                </a>
                <div className="project-card-text">
                  {/* <span className="project-card-category">Hardware · Embedded</span> */}
                  <a
                    href="https://github.com/waterloo-rocketry/canhw/tree/ra_respin_2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >Remote Arming PCB</a>
                  <span className="project-card-subtitle">Waterloo Rocketry</span>
                </div>
              </div>

              {/* EMG Fabric Bionic Arm */}
              <div className="project-card">
                <a
                  href="https://github.com/awzheng/emg-fabric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-image-link"
                >
                  <div
                    className="project-card-image"
                    style={{ background: 'linear-gradient(135deg, #0d2b1b 0%, #28a36e 100%)' }}
                  >
                    <span style={{ fontSize: '2.25rem' }}>🦾</span>
                  </div>
                </a>
                <div className="project-card-text">
                  {/* <span className="project-card-category">Hardware · PCB</span> */}
                  <a
                    href="https://github.com/awzheng/emg-fabric"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >EMG Fabric Bionic Arm PCB</a>
                  <span className="project-card-subtitle">UW Biomechatronics</span>
                </div>
              </div>

              {/* Portfolio */}
              {/* <div className="project-card">
                <div className="project-card-image" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #6c63ff 100%)' }}>
                  <span style={{ fontSize: '2.25rem' }}>📚</span>
                </div>
                <div className="project-card-text">
                  <span className="project-card-category">Design</span>
                  <a
                    href="https://docs.google.com/presentation/d/1IPV0oED7ZA_3K-oapaJplcr2cA3jqUmWFoVdGyBQ99s/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-title"
                  >Portfolio</a>
                  <span className="project-card-subtitle">Design & project portfolio</span>
                </div>
              </div> */}

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
