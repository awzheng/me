/* eslint-disable @next/next/no-img-element */

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andrewzheng2007" },
  { label: "GitHub", href: "https://github.com/awzheng" },
  { label: "Email", href: "mailto:andrew.zheng1@uwaterloo.ca" },
];

const work = [
  { title: "Harbinger", role: "Los Angeles, USA", href: "https://harbingermotors.com/" },
  { title: "Miovision", role: "Waterloo, Canada", href: "https://miovision.com/" },
  { title: "Waterloo Rocketry", role: "Waterloo, Canada", href: "https://www.waterloorocketry.com/" },
  // { title: "Founder", role: "Toronto, Canada · 2024", href: "https://www.decadirect.org/articles/congratulations-to-the-2024-deca-icdc-competitive-event-champions" },
];

const projects = [
  { title: "Allocate", href: "https://allocate.awzheng.me/" },
  { title: "Albedo", href: "https://github.com/awzheng/Albedo" },
];
// Fill in: thumbnail (public/images/vlogs/*), title, date, url.
const vlogs: { title: string; date: string; href: string; image: string }[] = [];

export default function Home() {
  return (
    <main className="wrap">
      <header>
        <div className="head">
          <h1 className="name">Andrew Zheng</h1>
          <nav className="socials" aria-label="Social links">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="sub">University of Waterloo · Computer Engineering</p>
      </header>

      <section>
        <h2>Work</h2>
        {work.map((w) => (
          <div className="row" key={w.title}>
            <a className="title" href={w.href} target="_blank" rel="noopener noreferrer">
              {w.title}
            </a>
            <span className="meta">{w.role}</span>
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
