import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, ChevronDown } from 'lucide-react';
import { Tenant } from '../types';
import { TENANTS } from '../constants';
import { Button } from './Shared';

// --- Context ---

interface TenantContextType {
  tenant: Tenant;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within a TenantProvider');
  return context;
};

// --- Provider ---

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant>(TENANTS['demo-centro']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Basic query string parsing to simulate multi-tenant
    const searchParams = new URLSearchParams(window.location.search);
    const tenantId = searchParams.get('tenant');
    if (tenantId && TENANTS[tenantId]) {
      setTenant(TENANTS[tenantId]);
    }
  }, []);

  // Set CSS variables for theming
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-500', tenant.primaryColor);
    root.style.setProperty('--brand-600', tenant.primaryColor); // Simplify for demo
    root.style.setProperty('--brand-700', tenant.primaryColor); // Simplify for demo
    // We would calculate lighter shades properly in a real app or use a library
  }, [tenant]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <TenantContext.Provider value={{ tenant, isLoggedIn, login, logout }}>
      {children}
    </TenantContext.Provider>
  );
};

// --- Components ---

const Header: React.FC = () => {
  const { tenant, isLoggedIn, login, logout } = useTenant();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Helper for active state
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
               <div className="w-10 h-10 rounded bg-brand-600 flex items-center justify-center text-white text-xl font-bold">
                 {tenant.logo.includes(' ') ? tenant.logo.split(' ')[0] : tenant.logo[0]}
               </div>
               <div className="hidden md:block">
                 <h1 className="text-lg font-bold text-gray-900 leading-tight">{tenant.name}</h1>
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Portal do Condômino</p>
               </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/lojas" className={`text-sm font-medium transition-colors ${isActive('/lojas') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>Lojas</Link>
            <Link to="/locacao" className={`text-sm font-medium transition-colors ${isActive('/locacao') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>Locação</Link>
            <Link to="/governanca" className={`text-sm font-medium transition-colors ${isActive('/governanca') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>Governança</Link>
            
            {isLoggedIn && (
               <Link to="/app" className={`text-sm font-medium transition-colors ${isActive('/app') ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`}>Dashboard</Link>
            )}

            <div className="h-4 w-px bg-gray-200 mx-2"></div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                     <User size={16} />
                   </div>
                   <span>Olá, Visitante</span>
                 </div>
                 <Button variant="ghost" className="text-xs" onClick={logout}>Sair</Button>
              </div>
            ) : (
              <Button variant="primary" onClick={login} className="gap-2">
                <LogIn size={16} /> Entrar
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/lojas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Lojas</Link>
            <Link to="/locacao" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Locação</Link>
            <Link to="/governanca" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Governança</Link>
            <Link to="/quem-somos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Quem Somos</Link>
            {isLoggedIn && (
               <Link to="/app" className="block px-3 py-2 rounded-md text-base font-medium text-brand-600 hover:bg-gray-50">Dashboard</Link>
            )}
            <div className="border-t border-gray-200 my-2 pt-2">
              {isLoggedIn ? (
                 <button onClick={logout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Sair</button>
              ) : (
                 <button onClick={login} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-brand-600 hover:bg-blue-50">Entrar na conta</button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const { tenant } = useTenant();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white text-sm font-bold">
                 {tenant.logo.includes(' ') ? tenant.logo.split(' ')[0] : tenant.logo[0]}
               </div>
               <span className="font-bold text-lg">{tenant.name}</span>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               O centro empresarial mais completo da região. Conectando negócios e pessoas em um único lugar.
             </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white">Início</Link></li>
              <li><Link to="/quem-somos" className="hover:text-white">Quem Somos</Link></li>
              <li><Link to="/lojas" className="hover:text-white">Lojas e Serviços</Link></li>
              <li><Link to="/locacao" className="hover:text-white">Salas Comerciais</Link></li>
              <li><Link to="/governanca" className="hover:text-white">Transparência</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Contato</h4>
             <ul className="space-y-2 text-sm text-gray-300">
               <li>{tenant.contact.address}</li>
               <li>{tenant.contact.phone}</li>
               <li>{tenant.contact.email}</li>
             </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white">Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Regimento Interno</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {tenant.name}. Powered by MultiTenant Portal MVP.
          {/* Admin Link fixed high contrast */}
          <Link to="/admin/dashboard" className="ml-4 text-gray-500 hover:text-white transition-colors underline decoration-dotted">Área Administrativa</Link>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};