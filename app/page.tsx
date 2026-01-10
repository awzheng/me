import Navigation from "./components/Navigation";
import ThemeToggle from "./components/ThemeToggle";
import SocialLinks from "./components/SocialLinks";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="header">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>andrew zheng</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Navigation />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        {/* About Section */}
        <section id="about" className="section">
          <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Engineering @ <strong>Your Company</strong>
          </p>

          {/* Currently */}
          <h3>Currently</h3>
          <ul className="experience-list">
            <li>
              <strong>Software Engineer</strong> @ <a href="#" style={{ color: 'var(--accent)' }}>Your Company</a>
            </li>
          </ul>

          {/* Previously */}
          <h3 style={{ marginTop: '2rem' }}>Previously</h3>
          <ul className="experience-list">
            <li>
              <strong>Engineering Intern</strong> @ <a href="#" style={{ color: 'var(--accent)' }}>Previous Company</a>
            </li>
            <li>
              <strong>Research Assistant</strong> @ <a href="#" style={{ color: 'var(--accent)' }}>University</a>
            </li>
          </ul>
        </section>

        {/* What I've Been Building */}
        <section id="projects" className="section">
          <h3>what i've been building:</h3>
          <ul className="project-list">
            <li>
              created <a href="#" style={{ color: 'var(--accent)' }}><strong>project name</strong></a> (brief description of what it does and impact)
            </li>
            <li>
              shipped <a href="#" style={{ color: 'var(--accent)' }}><strong>another project</strong></a> (description and user metrics)
            </li>
            <li>
              built <a href="#" style={{ color: 'var(--accent)' }}><strong>cool thing</strong></a> (technical achievement or innovation)
            </li>
            <li>
              developed <a href="#" style={{ color: 'var(--accent)' }}><strong>useful tool</strong></a> (problem it solves)
            </li>
          </ul>
        </section>

        {/* Writing */}
        <section id="writing" className="section">
          <h3>Writing</h3>
          <ul className="writing-list">
            <li>
              <a href="#">article or blog post title</a>
            </li>
            <li>
              <a href="#">another interesting piece</a>
            </li>
            <li>
              <a href="#">technical deep dive</a>
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
