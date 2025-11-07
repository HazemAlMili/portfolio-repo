import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ClickSpark from "@/components/ClickSpark";

// import Message from "@/components/dev-mess";
import "./globals.css";
function Home() {
  return (
    <main>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={13}
        sparkRadius={12}
        sparkCount={7}
        duration={400}
      >
        <Header />
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
        {/* <Message /> */}
      </ClickSpark>
    </main>
  );
}
export default Home;
