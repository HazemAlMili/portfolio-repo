
import Header from "@/components/header";
import Hero from "@/components/hero";
import CircuitBackground from "@/components/CircuitBackground";
import PageLoader from "@/components/PageLoader";
import "@/styles/globals.css";

import About from '@/components/about';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Certificates from '@/components/certificates';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

function App() {
  return (
    <>
      <CircuitBackground />
      <PageLoader />
      <main>
        {/* Critical: Always loaded */}
        <Header />
        <Hero />
        
        {/* All sections loaded instantly */}
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
