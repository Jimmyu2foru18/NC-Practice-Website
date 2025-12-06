import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Government from './pages/Government';
import Services from './pages/Services';
import Events from './pages/Events';
import DestinationExplorer from './pages/MapPage';
import Emergency from './pages/Emergency';
import News from './pages/News';
import Contact from './pages/Contact';
import About from './pages/About';
import History from './pages/History';
import Transportation from './pages/Transportation';
import Schools from './pages/Schools';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/government" element={<Government />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/map" element={<DestinationExplorer />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;