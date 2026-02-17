import { useProfile } from './hooks/useProfile';
import Sidebar from './layouts/Sidebar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Loader from './components/Loader';
import './App.css';

function App() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="app-loading">
        <Loader />
        <p className="app-loading-text">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar profile={profile} />
      <main className="main-content">
        <Hero profile={profile} />
        <About profile={profile} />
        <Education profile={profile} />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} {profile?.name || 'Developer'}. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
