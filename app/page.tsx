import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
// import Message from "@/components/dev-mess";
import "./globals.css";
function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
      {/* <Message /> */}
    </main>
  );
}
export default Home;
