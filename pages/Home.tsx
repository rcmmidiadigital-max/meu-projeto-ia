import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Utensils, Briefcase, HeartPulse, Cpu, MoreHorizontal, ChevronRight, ChevronLeft, Calculator, Scale, Star, Zap, Calendar } from 'lucide-react';
import { useTenant } from '../components/Layout';
import { Button, ListingCard, RentalCard, EventCard, NewsCard, PostCard, Badge, ListingRow } from '../components/Shared';
import { LISTINGS, RENTALS, EVENTS, NEWS, POSTS, CATEGORIES } from '../constants';

// Mapped Icons for categories
const iconMap: Record<string, React.ElementType> = {
  'utensils': Utensils,
  'briefcase': Briefcase,
  'heart-pulse': HeartPulse,
  'cpu': Cpu,
  'calculator': Calculator,
  'scale': Scale,
  'more-horizontal': MoreHorizontal,
};

const HeroSection = () => {
  const { tenant } = useTenant();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/lojas?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="relative bg-gray-900 h-[500px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Business Center" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-[-60px]">
        <div className="max-w-2xl">
          <Badge color="blue">Bem-vindo ao {tenant.name}</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-6 tracking-tight leading-tight">
            Explore o <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-300">Centro Empresarial</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            Encontre lojas, serviços, profissionais e salas comerciais disponíveis. Tudo em um só lugar.
          </p>

          {/* Floating Search Card - Light Theme */}
          <div className="bg-white p-2 rounded-xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-xl">
             <div className="flex-1 relative flex items-center">
                <div className="pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-3 pr-3 py-3 border-none rounded-md bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="O que procura?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
             </div>
             
             {/* Divider */}
             <div className="w-px bg-gray-200 my-2 hidden sm:block"></div>
             
             <div className="sm:w-48 relative flex items-center">
               <select className="block w-full py-3 px-3 border-none bg-transparent text-gray-700 focus:ring-0 cursor-pointer text-sm font-medium focus:bg-gray-50 rounded-md outline-none">
                 <option>Todas categorias</option>
                 <option>Lojas</option>
                 <option>Serviços</option>
               </select>
             </div>
             
             <button 
               onClick={handleSearch} 
               className="h-full py-3 px-8 shadow-md bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
             >
               Buscar
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || MoreHorizontal;
          return (
            <button 
              key={cat.name}
              onClick={() => navigate(`/lojas?cat=${cat.name}`)}
              className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-md border border-gray-100 hover:border-brand-300 hover:shadow-lg transition-all min-w-[160px] whitespace-nowrap group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-brand-600">{cat.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, linkText, to }: { title: string, linkText?: string, to?: string }) => (
  <div className="flex justify-between items-end mb-6">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    {linkText && to && (
      <Link to={to} className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center">
        {linkText} <ArrowRight size={16} className="ml-1" />
      </Link>
    )}
  </div>
);

export const Home: React.FC = () => {
  // Separate the first listing as the main feature, and the next 4 as smaller list items
  const mainHighlight = LISTINGS[0];
  const smallHighlights = LISTINGS.slice(1, 7);

  return (
    <div className="pb-20">
      <HeroSection />
      <CategoriesSection />

      {/* 1. ORIGINAL SECTION: Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <SectionHeader title="Destaques do Centro" linkText="Ver todas as lojas" to="/lojas" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LISTINGS.slice(0, 4).map(listing => (
            <ListingCard key={listing.id} listing={listing} compact />
          ))}
        </div>
      </section>

      {/* 2. NEW SECTION: Asymmetric Layout (Big Left Card + Small Grid Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <SectionHeader title="Sugestões para Você" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Big Card */}
           <div className="lg:col-span-1">
              <Link to={`/lojas/${mainHighlight.id}`} className="block h-full bg-brand-50 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[400px]">
                  <div className="relative z-10 flex flex-col h-full">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-white rounded-full text-brand-600 shadow-sm">
                           <Zap size={20} className="fill-current" />
                        </div>
                        <span className="font-bold text-brand-700 tracking-wide uppercase text-sm">Destaque do Mês</span>
                     </div>
                     
                     <h3 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{mainHighlight.name}</h3>
                     <p className="text-gray-600 text-lg mb-8 line-clamp-3">{mainHighlight.description}</p>
                     
                     <div className="mt-auto">
                        <Button className="w-full sm:w-auto shadow-md">Conhecer agora</Button>
                     </div>
                  </div>

                  {/* Decorative Image/Illustration */}
                  <img 
                    src={mainHighlight.image} 
                    alt={mainHighlight.name} 
                    className="absolute -bottom-10 -right-10 w-64 h-64 object-cover rounded-tl-[4rem] shadow-2xl group-hover:scale-105 transition-transform duration-500 border-4 border-white"
                  />
              </Link>
           </div>

           {/* Right Grid (Smaller Items) */}
           <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-start">
                 {smallHighlights.map(listing => (
                   <ListingRow key={listing.id} listing={listing} />
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Two Columns: Events & News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Upcoming Events (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Próximos Eventos</h2>
              <Link to="#" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1.5">
                <Calendar size={18} /> Ver calendário
              </Link>
            </div>
            
            <div className="space-y-4 flex-1">
              {EVENTS.map(event => (
                <div key={event.id} className="relative">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>

          {/* What's New (Right 7 cols - imitating the banner style of City Guide) */}
          <div className="lg:col-span-7">
             <SectionHeader title="Novidades & Avisos" />
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="grid gap-6">
                  {NEWS.map(item => (
                    <Link to={`/novidades/${item.id}`} key={item.id}>
                      <NewsCard item={item} />
                    </Link>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                   <Link to="/novidades">
                     <Button variant="outline" className="w-full sm:w-auto min-w-[200px] border-brand-200 text-brand-700 hover:bg-brand-50">
                       Veja todas as novidades
                     </Button>
                   </Link>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Rentals Section */}
      <section className="bg-gray-100 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <SectionHeader title="Oportunidades de Locação" linkText="Ver espaços disponíveis" to="/locacao" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {RENTALS.map(rental => (
               <RentalCard key={rental.id} rental={rental} />
             ))}
           </div>
        </div>
      </section>

      {/* Community Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
         <SectionHeader title="Últimas da Comunidade" />
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {POSTS.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
         </div>
      </section>

    </div>
  );
};