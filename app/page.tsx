import About from '@/components/about'
import Contact from '@/components/contact'
import Education from '@/components/education'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/Navbar'
// import Portfolio from '@/components/portfolio'
import Projects from '@/components/project'
import Skills from '@/components/skills'

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Education />
    <Contact />
    <Footer />
    </>
  )
}