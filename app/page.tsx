import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// ============================================================================
// CRITICAL - Load immediately (above the fold)
// ============================================================================
import Header from "@/components/header";
import Hero from "@/components/hero";

// ============================================================================
// LAZY LOAD - Below the fold components
// ============================================================================

// About appears first after hero, preload it
const About = dynamic(() => import('@/components/about'), {
  loading: () => <div className="section-skeleton" />
});

// These load on demand as user scrolls
const Projects = dynamic(() => import('@/components/projects'));
const Certificates = dynamic(() => import('@/components/certificates'));
const Contact = dynamic(() => import('@/components/contact'));
const Footer = dynamic(() => import('@/components/footer'));

import "./globals.css";

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function Home() {
  return (
    <main>
      {/* Critical: Always loaded */}
      <Header />
      <Hero />
      
      {/* Lazy: Load as needed */}
      <Suspense fallback={<div className="section-skeleton" />}>
        <About />
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
  );
}

export default Home;
