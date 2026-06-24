import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DynamicBackground from './components/DynamicBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import StatisticsPage from './pages/StatisticsPage';
import MediaPage from './pages/MediaPage';
import TracksPage from './pages/TracksPage';
import QuizPage from './pages/QuizPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

// Scroll reset component on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Immersive Glassmorphic Dynamic Background */}
      <DynamicBackground />

      {/* Sticky Premium Navigation Header */}
      <Navbar />

      {/* Main Pages Content routing */}
      <main style={{ flexGrow: 1, position: 'relative', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Premium Multi-column Footer */}
      <Footer />
    </Router>
  );
}

export default App;
