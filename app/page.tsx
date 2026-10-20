/* eslint-disable @next/next/no-img-element */
import ThemeToggle from "./components/ThemeToggle";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andrewzheng2007" },
  { label: "GitHub", href: "https://github.com/awzheng" },
  { label: "Email", href: "mailto:andrew.zheng1@uwaterloo.ca" },
];

const numerals = ["Ø", "I", "II", "III", "IV", "V", "VI"];

const work = [
  { title: "Harbinger", location: "Los Angeles, USA", href: "https://harbingermotors.com/" },
  { title: "Miovision", location: "Waterloo, Canada", href: "https://miovision.com/" },
  { title: "Waterloo Rocketry", location: "Waterloo, Canada", href: "https://www.waterloorocketry.com/" },
  // { title: "Founder", location: "Toronto, Canada · 2024", href: "https://www.decadirect.org/articles/congratulations-to-the-2024-deca-icdc-competitive-event-champions" },
];

const projects = [
  { title: "Git IRL Bot", description: "Winner, Hack the North 2026", href: "https://devpost.com/software/house-bot" },
  { title: "Allocate", description: "macOS CPU Fleet Controller", href: "https://allocate.awzheng.me/" },
];
// Fill in: thumbnail (public/images/vlogs/*), title, date, url.
const vlogs: { title: string; date: string; href: string; image: string }[] = [];

export default function Home() {
  return (
    <main className="wrap">
      <header>
        <div className="head">
          <h1 className="name">Andrew Zheng</h1>
          <ThemeToggle />
        </div>
        <nav className="socials" aria-label="Social links">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
        <p className="sub">University of Waterloo · Computer Engineering</p>
      </header>

      <section>
        <h2>Experience</h2>
        {work.map((w, i) => (
          <div className="row work" key={w.title}>
            <span className="num" aria-hidden="true">{numerals[work.length - 1 - i]}</span>
            <a className="title" href={w.href} target="_blank" rel="noopener noreferrer">
              {w.title}
            </a>
            <span className="meta">{w.location}</span>
          </div>
        ))}
      </section>

      <section>
        <h2>Archive</h2>
        {projects.map((p) => (
          <div className="row" key={p.title}>
            <a className="title" href={p.href} target="_blank" rel="noopener noreferrer">
              {p.title}
            </a>
            <span className="meta">{p.description}</span>
          </div>
        ))}
      </section>

      {/* <section>
          <h2>Events</h2>
          <ul className="vlogs">
            {vlogs.map((v) => (
              <li className="vlog" key={v.href}>
                <a href={v.href} target="_blank" rel="noopener noreferrer">
                  <img src={v.image} alt="" loading="lazy" decoding="async" />
                  <span className="t">{v.title}</span>
                  <span className="d">{v.date}</span>
                </a>
              </li>
            ))}
          </ul>
        </section> */}
    </main>
  );
}
