import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Features from './components/Features';
import Video from './components/Video';
import Pricing from './components/Pricing';
import FAQs from './components/FAQs';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('theme-mode');
      if (stored) return stored === 'dark';
    } catch (e) {}
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    try { localStorage.setItem('theme-mode', darkMode ? 'dark' : 'light'); } catch (e) {}
  }, [darkMode]);

  return (
    <div className={`${darkMode ? 'dark' : 'light'} overflow-x-hidden`}
      style={darkMode ? {} : {
        '--background': 'var(--color-ivory)',
        '--foreground': 'var(--color-jet)',
        '--primary': 'var(--color-jet)',
        '--primary-hover': 'var(--color-charcoal)',
        '--secondary': 'var(--color-steel)',
        '--card': 'var(--color-white)',
        '--border': 'var(--color-dove)',
        backgroundColor: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
      }}
    >
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main id="main">
        <Hero />
        <Statement />
        <Features />
        <Video />
        <Pricing />
        <FAQs />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}

export default App;
