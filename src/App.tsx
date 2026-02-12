import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './shared/components/Layout';
import HomePage from './features/home/components/HomePage';
import CatalogPage from './features/catalog/components/CatalogPage';
import OutfitBuilderPage from './features/outfit-builder/components/OutfitBuilderPage';
import SavedOutfitsPage from './features/saved-outfits/components/SavedOutfitsPage';
import CartDrawer from './features/cart/components/CartDrawer';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/builder" element={<OutfitBuilderPage />} />
          <Route path="/saved-outfits" element={<SavedOutfitsPage />} />
        </Routes>
        <CartDrawer />
      </Layout>
    </Router>
  );
}

export default App;
