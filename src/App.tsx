import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import FormPage from './pages/FormPage';
import OtherPage from './pages/OtherPage';
import SearchableDashboard from './components/SearchableDashboard';
import Home from './components/Home';
import TablesPage from './components/TablesPage';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/solarized.css'; // You can choose another theme
import RevealSlides from './RevealSlides';
import Slide from './components/base/Slide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages avec Sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<SearchableDashboard />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tables" element={<TablesPage />} />

        </Route>

        {/* Pages sans Sidebar */}
        <Route path="/other" element={<Slide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
