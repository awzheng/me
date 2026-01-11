import SocialLinks from "./components/SocialLinks";
import TypeWriter from "./components/TypeWriter";
import TypewriterHover from "./components/TypewriterHover";

export default function Home() {
  // Customizable word list for the typing animation
  const typingWords = [
    "UWaterloo",
    "Comp Eng",
    "System Design",
    "Guitar",
    "Bodybuilding",
    "Lofi Records",
    "Ninja Creami",
    "Psychology",
    "Markham",
  ];

  return (
    <main>
      <TypewriterHover />
      <div className="background-layer" aria-hidden="true"></div>
      <div className="content-card">
        {/* Header */}
        <header className="header">
          <h1 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>awzheng.me</h1>
          <SocialLinks />
        </header>

        {/* About Section */}
        <section id="about" className="section">
          <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Andrew ❤️ <TypeWriter
              words={typingWords}
              typingSpeed={80}
              deleteSpeed={60}
              delayAfterTyping={2000}
              delayAfterDeleting={0}
            />
          </p>

          {/* Currently */}
          <h3>Currently</h3>
          <ul className="experience-list">
            <li>
              Computer Engineering @ <a href="https://uwaterloo.ca/electrical-computer-engineering/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>University of Waterloo</strong></a>
            </li>
          </ul>

          {/* Previously */}
          <h3 style={{ marginTop: '2rem' }}>Previously</h3>
          <ul className="experience-list">
            <li>
              <span
                className="typewriter-hover"
                data-hover-text=" + 5-figures in revenue"
              >
                <strong>Case Contest Coach</strong>, self-employed
              </span>
            </li>
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h3>Projects</h3>
          <ul className="project-list">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" fill="#4ECDC4" style={{ width: '1.8em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25em' }}>
                <polygon points="0,0 40,0 40,12 32,20 40,28 32,36 40,50 0,50" />
                <polygon points="52,0 88,0 88,18 82,25 88,32 88,50 52,50 52,32 58,25 52,18" />
                <polygon points="100,0 136,0 136,18 130,25 136,32 136,50 100,50 100,32 106,25 100,18" />
                <polygon points="148,0 188,0 188,50 148,50 148,36 156,28 148,20 156,12 148,0" />
              </svg>
              <a href="https://github.com/awzheng/SageWall" target="_blank" rel="noopener noreferrer" className="typewriter-hover" data-hover-text=' built with AWS SageMaker' style={{ color: 'var(--accent)' }}><strong><u>SageWall</u></strong>, an ML Cloud Security System</a>
            </li>
            <li>
              🌟 <a href="https://github.com/awzheng/CrawlStars" target="_blank" rel="noopener noreferrer" className="typewriter-hover" data-hover-text=' built with Golang' style={{ color: 'var(--accent)' }}><strong><u>CrawlStars</u></strong>, a Concurrent Web Crawler + Search Engine</a>
            </li>
            <li>
              📖 <a href="https://github.com/awzheng/Mangaroo" target="_blank" rel="noopener noreferrer" className="typewriter-hover" data-hover-text=' using Gemini 1.5 + Imagen 3' style={{ color: 'var(--accent)' }}><strong><u>Mangaroo</u></strong>, a PDF-to-Manga AI Illustrator</a>
            </li>
            <li>
              🚎 <a href="https://github.com/waterloo-rocketry/canhw/tree/ra_respin_2025" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong><u>Remote Arming Board</u></strong> for Waterloo Rocketry</a>
            </li>
            <li>
              🦾 <a href="https://github.com/awzheng/emg-fabric" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong><u>EMG Fabric Bionic Arm PCB</u></strong> for UW Biomechatronics</a>
            </li>
            <li>
              📚 View my <a href="https://docs.google.com/presentation/d/1IPV0oED7ZA_3K-oapaJplcr2cA3jqUmWFoVdGyBQ99s/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong><u>portfolio</u></strong></a>
            </li>
          </ul>
        </section>

        {/* Writing */}
        <section id="writing" className="section">
          <h3>Writing</h3>
          <ul className="writing-list">
            <li>
              SageWall <a href="https://github.com/awzheng/SageWall/blob/main/devlog.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong><u>Devlog</u></strong></a>
            </li>
            <li>
              CrawlStars <a href="https://github.com/awzheng/CrawlStars/blob/main/devlog.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong><u>Devlog</u></strong></a>
            </li>
            <li>
              Mangaroo <a href="https://github.com/awzheng/Mangaroo/blob/main/devlog.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong><u>Devlog</u></strong></a>
            </li>
          </ul>
        </section>

        {/* More */}
        <section id="more" className="section">
          <h3>More</h3>
          <ul className="more-list">
            <li>
              <a href="https://www.decadirect.org/articles/congratulations-to-the-2024-deca-icdc-competitive-event-champions" target="_blank" rel="noopener noreferrer" className="typewriter-hover" data-hover-text=' // video timestamp: 1:59:50' style={{ color: 'var(--accent)' }}><strong><u>1st Place @ DECA ICDC 2024</u></strong></a>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Andrew Zheng</p>
        </footer>
      </div>
    </main>
  );
}
