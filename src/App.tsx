import React, { Suspense } from 'react';
import Header from "@/components/header";
import Hero from "@/components/hero";
import CircuitBackground from "@/components/CircuitBackground";
import PageLoader from "@/components/PageLoader";
import "@/styles/globals.css";

// React.lazy for below the fold components
const About = React.lazy(() => import('@/components/about'));
const Experience = React.lazy(() => import('@/components/experience'));
const Projects = React.lazy(() => import('@/components/projects'));
const Certificates = React.lazy(() => import('@/components/certificates'));
const Contact = React.lazy(() => import('@/components/contact'));
const Footer = React.lazy(() => import('@/components/footer'));

function App() {
  return (
    <>
      <CircuitBackground />
      <PageLoader />
      <main>
        {/* Critical: Always loaded */}
        <Header />
        <Hero />
        
        {/* Lazy: Load as needed */}
        <Suspense fallback={<div className="section-skeleton" />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<div className="section-skeleton" />}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<div className="section-skeleton" />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<div className="section-skeleton" />}>
          <Certificates />
        </Suspense>
        
        <Suspense fallback={<div className="section-skeleton" />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<div className="section-skeleton" />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
