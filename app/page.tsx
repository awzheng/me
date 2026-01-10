import ThemeToggle from "./components/ThemeToggle";
import SocialLinks from "./components/SocialLinks";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="header">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>awzheng.me</h1>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <div className="container">
        {/* About Section */}
        <section id="about" className="section">
          <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Andrew Zheng
          </p>

          {/* Currently */}
          <h3>Currently</h3>
          <ul className="experience-list">
            <li>
              <strong>Computer Engineering</strong> @ <a href="https://uwaterloo.ca/electrical-computer-engineering/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>University of Waterloo</a>
            </li>
          </ul>

          {/* Previously */}
          <h3 style={{ marginTop: '2rem' }}>Previously</h3>
          <ul className="experience-list">
            <li>
              <strong>Case Contest Coach</strong> Self-founded & 5-figures revenue
            </li>
          </ul>
        </section>

        {/* Built */}
        <section id="built" className="section">
          <h3>Built</h3>
          <ul className="project-list">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" fill="#4ECDC4" style={{ width: '1.8em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginRight: '0.25em' }}>
                <polygon points="0,0 40,0 40,12 32,20 40,28 32,36 40,50 0,50" />
                <polygon points="52,0 88,0 88,18 82,25 88,32 88,50 52,50 52,32 58,25 52,18" />
                <polygon points="100,0 136,0 136,18 130,25 136,32 136,50 100,50 100,32 106,25 100,18" />
                <polygon points="148,0 188,0 188,50 148,50 148,36 156,28 148,20 156,12 148,0" />
              </svg>
              <a href="https://github.com/awzheng/SageWall" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>SageWall</strong></a> ML Cloud Security System
            </li>
            <li>
              🌟 <a href="https://github.com/awzheng/CrawlStars" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>CrawlStars</strong></a> Concurrent Web Crawler + Search Engine
            </li>
            <li>
              🦘 <a href="https://github.com/awzheng/Mangaroo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>Mangaroo</strong></a> PDF-to-Manga AI Illustrator
            </li>
            <li>
              🚎 <a href="https://github.com/waterloo-rocketry/canhw/tree/ra_respin_2025" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>Remote Arming Board</strong></a> Waterloo Rocketry
            </li>
            <li>
              🦾 <a href="https://github.com/awzheng/emg-fabric" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>EMG Fabric Bionic Arm PCB</strong></a> UW Biomechatronics
            </li>
            <li>
              📚 View my <a href="https://docs.google.com/presentation/d/1IPV0oED7ZA_3K-oapaJplcr2cA3jqUmWFoVdGyBQ99s/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>portfolio</strong></a>
            </li>
          </ul>
        </section>

        {/* Writing */}
        <section id="writing" className="section">
          <h3>Writing</h3>
          <ul className="writing-list">
            <li>
              SageWall <a href="https://github.com/awzheng/SageWall/blob/main/devlog.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>Devlog</strong></a>
            </li>
            <li>
              CrawlStars <a href="https://github.com/awzheng/CrawlStars/blob/main/devlog.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>Devlog</strong></a>
            </li>
            <li>
              Mangaroo <a href="https://github.com/awzheng/Mangaroo/blob/main/devlog.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><strong>Devlog</strong></a>
            </li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <SocialLinks />
        <p style={{ marginTop: '1.5rem' }}>© {new Date().getFullYear()} Andrew Zheng</p>
      </footer>
    </main>
  );
}
