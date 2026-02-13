import Hero from '../components/Hero';
import About from '../components/About';
import GitHubStats from '../components/GitHubStats';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <GitHubStats />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
