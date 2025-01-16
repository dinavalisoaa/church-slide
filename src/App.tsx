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
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages avec Sidebar */}
          <Route path="/" element={<SearchableDashboard />} />
        <Route path="/type-crud" element={<TypesList  />} />
        <Route path="/category-song" element={<CategorySongList  />} />
        <Route path="/home" element={<Home />} />


        {/* Pages sans Sidebar */}
          <Route path="/other" element={<Apps />} />
        <Route path="/tables" element={<TablesPage />} />

      </Routes>
    </BrowserRouter>
  );
}
 function Apps() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography sx={{ mt: 3 }} variant="h5" component="h1" gutterBottom>
                    Vite.js + React.JS + TypeScript + MUI v5dasdasd
                </Typography>
               
            </Box>
        </Container>
    );
}
export default App;
