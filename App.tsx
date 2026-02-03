import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TenantProvider, Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ListingsPage } from './pages/Listings';
import { StoreDetail, RentalDetail } from './pages/Detail';
import { EventDetail } from './pages/EventDetail';
import { NewsList } from './pages/NewsList';
import { NewsDetail } from './pages/NewsDetail';
import { Dashboard, Governance } from './pages/Internal';
import { 
  AdminLayout, 
  AdminDashboard, 
  AdminListings, 
  AdminListingEdit,
  AdminRentals, 
  AdminEvents, 
  AdminNews, 
  AdminPages 
} from './pages/Admin';

// Scroll to top on route change helper
const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/quem-somos" element={<Layout><About /></Layout>} />
        
        <Route path="/lojas" element={<Layout><ListingsPage type="store" /></Layout>} />
        <Route path="/lojas/:id" element={<Layout><StoreDetail /></Layout>} />
        
        <Route path="/locacao" element={<Layout><ListingsPage type="rental" /></Layout>} />
        <Route path="/locacao/:id" element={<Layout><RentalDetail /></Layout>} />
        
        <Route path="/eventos/:id" element={<Layout><EventDetail /></Layout>} />
        
        {/* News / Blog Routes */}
        <Route path="/novidades" element={<Layout><NewsList /></Layout>} />
        <Route path="/novidades/:id" element={<Layout><NewsDetail /></Layout>} />
        
        <Route path="/governanca" element={<Layout><Governance /></Layout>} />

        {/* Protected / Internal Routes (Simulated) */}
        <Route path="/app" element={<Layout><Dashboard /></Layout>} />
        <Route path="/app/tickets" element={<Layout><Dashboard /></Layout>} /> {/* Reusing for demo */}
        
        {/* NEW ADMIN PANEL ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<Navigate to="dashboard" replace />} />
           <Route path="dashboard" element={<AdminDashboard />} />
           <Route path="paginas" element={<AdminPages />} />
           <Route path="lojas" element={<AdminListings />} />
           <Route path="lojas/:id" element={<AdminListingEdit />} />
           <Route path="locacao" element={<AdminRentals />} />
           <Route path="eventos" element={<AdminEvents />} />
           <Route path="novidades" element={<AdminNews />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <TenantProvider>
        <AppRoutes />
      </TenantProvider>
    </Router>
  );
};

export default App;