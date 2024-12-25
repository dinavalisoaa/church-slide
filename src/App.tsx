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
import TypesList from './pages/types/TypesList';
import './Font.css';
import CategorySongList from './pages/category-song/CategorySongList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages avec Sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<SearchableDashboard />} />
        <Route path="/type-crud" element={<TypesList  />} />
        <Route path="/category-song" element={<CategorySongList  />} />
        <Route path="/home" element={<Home />} />
        
        </Route>

        {/* Pages sans Sidebar */}
        <Route path="/other" element={<Slide />} />
        <Route path="/tables" element={<TablesPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
