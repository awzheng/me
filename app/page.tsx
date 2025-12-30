import Header from "./components/Header";
import StringHero from "./components/StringHero";
import Section from "./components/Section";

const sections = [
  { id: "hardware", title: "Hardware", color: "#FF6B6B" },
  { id: "firmware", title: "Firmware", color: "#FF9F43" },
  { id: "software", title: "Software", color: "#FDCB6E" },
  { id: "business", title: "Business", color: "#4ADE80" },
  { id: "about", title: "About", color: "#74B9FF" },
  { id: "extras", title: "Extras", color: "#C084FC" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      <Header />
      
      {/* Hero Section with Strings */}
      <StringHero />
      
      {/* Content Sections */}
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          color={section.color}
        />
      ))}
      
      {/* Footer */}
      <footer className="py-12 px-6 text-center">
        <p className="font-[family-name:var(--font-figtree)] text-gray-500 text-lg">
          Built with 🎸 by Andrew Zheng
        </p>
        <p className="font-[family-name:var(--font-figtree)] text-gray-600 text-sm mt-2">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </main>
  );
}
