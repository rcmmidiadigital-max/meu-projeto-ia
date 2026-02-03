import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, Search, Map, ChevronDown, LayoutGrid, List,
  Utensils, Briefcase, HeartPulse, Cpu, Calculator, MoreHorizontal, ShoppingBag, Coffee, CheckCircle, RotateCcw
} from 'lucide-react';
import { ListingCard, RentalCard, Button } from '../components/Shared';
import { LISTINGS, RENTALS, CATEGORIES } from '../constants';

// --- ICONS MAP ---
const iconMap: Record<string, React.ElementType> = {
  'utensils': Utensils,
  'briefcase': Briefcase,
  'heart-pulse': HeartPulse,
  'cpu': Cpu,
  'calculator': Calculator,
  'more-horizontal': MoreHorizontal,
  'shopping-bag': ShoppingBag,
  'coffee': Coffee
};

interface ListingsPageProps {
  type: 'store' | 'rental';
}

interface CategoryButtonProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 h-28 w-full group ${
      active 
        ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' 
        : 'border-gray-100 bg-white text-gray-500 hover:border-brand-200 hover:shadow-md'
    }`}
  >
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
      active ? 'bg-brand-200 text-brand-700' : 'bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600'
    }`}>
      <Icon size={20} />
    </div>
    <span className="text-xs font-medium text-center leading-tight">{label}</span>
  </button>
);

export const ListingsPage: React.FC<ListingsPageProps> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('cat') || '';
  
  const [search, setSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [sidebarTab, setSidebarTab] = useState<'categories' | 'filters'>('categories');

  // Filter Logic
  const filteredListings = LISTINGS.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat ? l.category === selectedCat : true;
    return matchesSearch && matchesCat;
  });

  const filteredRentals = RENTALS.filter(r => {
     const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
     // Basic mock filter for rentals
     return matchesSearch;
  });

  const resultsCount = type === 'store' ? filteredListings.length : filteredRentals.length;
  const pageTitle = type === 'store' ? 'Encontre Lojas' : 'Encontre Espaços';

  // Mock data for filters
  const filterCategories = [
    'Alimentação',
    'Tecnologia',
    'Saúde',
    'Jurídico',
    'Serviços',
    'Moda',
    'Beleza',
    'Educação',
    'Financeiro',
    'Marketing',
    'Consultoria',
    'Imobiliária',
    'Turismo'
  ];

  const filterServices = [
    'Wi-Fi gratuito',
    'Estacionamento',
    'Acessibilidade',
    'Aceita animais',
    'Delivery',
    'Agendamento online',
    'Ar Condicionado',
    'Segurança 24h'
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR --- */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            
            {/* Search Widget - Updated to Pill shape with Orange button */}
            <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-200">
               <div className="relative flex items-center">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-gray-400" size={20} />
                 </div>
                 <input 
                    type="text"
                    className="block w-full pl-11 pr-32 py-3 rounded-full border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-sm bg-transparent"
                    placeholder="Procurar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                 />
                 <div className="absolute inset-y-0 right-0 p-1">
                    <button className="h-full px-6 bg-orange-500 text-white rounded-full font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm">
                       Procurar
                    </button>
                 </div>
               </div>
            </div>

            {/* Tabs & Grid */}
            {type === 'store' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                   <button 
                     onClick={() => setSidebarTab('categories')}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                       sidebarTab === 'categories' ? 'bg-red-50 text-red-500' : 'text-gray-500 hover:text-gray-900'
                     }`}
                   >
                     <LayoutGrid size={16} /> Categorias
                   </button>
                   <button 
                     onClick={() => setSidebarTab('filters')}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                       sidebarTab === 'filters' ? 'bg-red-50 text-red-500' : 'text-gray-500 hover:text-gray-900'
                     }`}
                   >
                     <Filter size={16} /> Filtros
                   </button>
                </div>

                {sidebarTab === 'categories' ? (
                  <div className="grid grid-cols-2 gap-3">
                     <CategoryButton 
                       icon={ShoppingBag} 
                       label="Todas" 
                       active={selectedCat === ''} 
                       onClick={() => setSelectedCat('')} 
                     />
                     {CATEGORIES.map(cat => {
                        const Icon = iconMap[cat.icon] || MoreHorizontal;
                        return (
                          <CategoryButton 
                            key={cat.name}
                            icon={Icon} 
                            label={cat.name} 
                            active={selectedCat === cat.name} 
                            onClick={() => setSelectedCat(cat.name)} 
                          />
                        );
                     })}
                  </div>
                ) : (
                  <div className="bg-transparent space-y-8 animate-in fade-in duration-300">
                     {/* Filter Group 1: Categorias */}
                     <div>
                       <h3 className="font-bold text-gray-900 text-lg mb-4">Categorias</h3>
                       <div className="space-y-3 h-[240px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                         {filterCategories.map((item, idx) => (
                           <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                             <input 
                               type="checkbox" 
                               className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition duration-150 ease-in-out cursor-pointer" 
                             />
                             <span className="text-gray-500 font-medium group-hover:text-brand-600 transition-colors">{item}</span>
                           </label>
                         ))}
                       </div>
                     </div>

                     {/* Filter Group 2: Serviços */}
                     <div>
                       <h3 className="font-bold text-gray-900 text-lg mb-4">Serviços</h3>
                       <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                         {filterServices.map((item, idx) => (
                           <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                             <input 
                               type="checkbox" 
                               className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition duration-150 ease-in-out cursor-pointer" 
                             />
                             <span className="text-gray-500 font-medium group-hover:text-brand-600 transition-colors">{item}</span>
                           </label>
                         ))}
                       </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex gap-4 pt-4">
                       <button className="flex-1 px-6 py-2.5 rounded-full border border-brand-500 text-brand-600 font-bold hover:bg-brand-50 transition-colors">
                         Filtro
                       </button>
                       <button className="flex-1 px-6 py-2.5 rounded-full border border-brand-500 text-brand-600 font-bold hover:bg-brand-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                         <RotateCcw size={16} />
                         Redefinir filtros
                       </button>
                     </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Rental specific filters (Simple for now) */}
            {type === 'rental' && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                 <h3 className="font-bold text-gray-900 mb-4">Filtrar por Tipo</h3>
                 <div className="space-y-3">
                   {['Sala Comercial', 'Loja Térrea', 'Quiosque', 'Depósito'].map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-white group-hover:border-brand-500 peer-checked:bg-brand-600 peer-checked:border-brand-600">
                           <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                           {/* Check icon would go here in real implementation or use custom checkbox */}
                        </div>
                        <span className="text-gray-600 text-sm">{t}</span>
                      </label>
                   ))}
                 </div>
              </div>
            )}

          </aside>


          {/* --- MAIN CONTENT --- */}
          <main className="flex-1 min-w-0">
            
            {/* Header */}
            <div className="mb-8">
               <nav className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Link to="/" className="hover:text-brand-600">Home</Link> 
                  <span>&gt;</span>
                  <span className="text-gray-600">{type === 'store' ? 'Lojas' : 'Locação'}</span>
                  <span>&gt;</span>
                  <span className="text-gray-900">Pesquisa</span>
               </nav>
               
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{pageTitle}</h1>
                  <button className="flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
                     <Map size={20} />
                     Map view
                  </button>
               </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
               <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">Sort by:</span>
                  <div className="relative group cursor-pointer">
                     <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                       Relevância <ChevronDown size={14} />
                     </span>
                     {/* Dropdown would be here */}
                  </div>
               </div>
               <div className="text-sm text-gray-400 flex items-center gap-2">
                 <CheckCircle size={14} className="text-brand-500" />
                 {resultsCount} resultados encontrados
               </div>
            </div>

            {/* Grid Results */}
            {type === 'store' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredListings.map(l => <ListingCard key={l.id} listing={l} />)}
                  {filteredListings.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Nenhum resultado</h3>
                      <p className="text-gray-500">Tente ajustar sua busca ou filtros.</p>
                    </div>
                  )}
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {filteredRentals.map(r => <RentalCard key={r.id} rental={r} />)}
                   {filteredRentals.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Nenhum espaço encontrado</h3>
                    </div>
                  )}
                </div>
             )}

          </main>
        </div>
      </div>
    </div>
  );
};