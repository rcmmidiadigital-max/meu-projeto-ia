import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, Calendar, User, ArrowRight, ChevronRight, Filter } from 'lucide-react';
import { NEWS } from '../constants';
import { Button, Badge } from '../components/Shared';

export const NewsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter logic
  const filteredNews = NEWS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredNews[0];
  const regularPosts = filteredNews.slice(1);
  
  // Extract unique categories and tags for sidebar
  const categories = Array.from(new Set(NEWS.map(n => n.category))).filter(Boolean) as string[];
  const allTags = Array.from(new Set(NEWS.flatMap(n => n.tags || [])));

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. HERO SECTION (SEO Friendly H1) */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge color="blue">Blog & Atualizações</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-4 tracking-tight">
            Novidades do Centro Empresarial
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Fique por dentro das últimas notícias, comunicados oficiais, eventos e dicas para potencializar seus negócios.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- MAIN CONTENT COLUMN --- */}
          <main className="flex-1">
            
            {/* Featured Post */}
            {!searchTerm && !selectedCategory && featuredPost && (
              <div className="mb-12 group">
                <Link to={`/novidades/${featuredPost.id}`} className="block relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full md:w-3/4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded">{featuredPost.category}</span>
                      <span className="text-gray-300 text-sm flex items-center gap-1"><Calendar size={14}/> {featuredPost.date}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-brand-200 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-200 mb-6 line-clamp-2 text-lg">
                      {featuredPost.summary}
                    </p>
                    <div className="flex items-center gap-3">
                      <img src={featuredPost.author?.avatar} alt={featuredPost.author?.name} className="w-10 h-10 rounded-full border-2 border-white" />
                      <div className="text-white">
                        <p className="text-sm font-bold">{featuredPost.author?.name}</p>
                        <p className="text-xs text-gray-300">{featuredPost.author?.role}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* List Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm ? `Resultados para "${searchTerm}"` : 'Artigos Recentes'}
              </h2>
              <div className="text-sm text-gray-500">
                Mostrando {regularPosts.length + (featuredPost ? 1 : 0)} artigos
              </div>
            </div>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularPosts.map(news => (
                <article key={news.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full group">
                  <Link to={`/novidades/${news.id}`} className="block h-48 overflow-hidden relative">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {news.category && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                        {news.category}
                      </span>
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {news.date}</span>
                      <span>•</span>
                      <span>{news.readTime || '3 min leitura'}</span>
                    </div>
                    
                    <Link to={`/novidades/${news.id}`} className="block mb-3">
                      <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                      {news.summary}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                       <div className="flex items-center gap-2">
                          <img src={news.author?.avatar} alt={news.author?.name} className="w-6 h-6 rounded-full" />
                          <span className="text-xs font-medium text-gray-600">{news.author?.name}</span>
                       </div>
                       <Link to={`/novidades/${news.id}`} className="text-brand-600 text-xs font-bold flex items-center hover:underline">
                         Ler mais <ArrowRight size={12} className="ml-1"/>
                       </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {filteredNews.length === 0 && (
               <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                 <p className="text-gray-500">Nenhum artigo encontrado com esses critérios.</p>
                 <button onClick={() => {setSearchTerm(''); setSelectedCategory(null)}} className="text-brand-600 font-bold mt-2 hover:underline">
                   Limpar filtros
                 </button>
               </div>
            )}

          </main>

          {/* --- SIDEBAR --- */}
          <aside className="w-full lg:w-80 space-y-8">
             
             {/* Search Widget */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Buscar</h3>
                <div className="relative">
                   <input 
                      type="text" 
                      placeholder="Pesquisar no blog..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
             </div>

             {/* Categories Widget */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Categorias</h3>
                <ul className="space-y-2">
                   <li>
                     <button 
                       onClick={() => setSelectedCategory(null)}
                       className={`w-full flex justify-between items-center text-sm px-2 py-1.5 rounded transition-colors ${selectedCategory === null ? 'bg-brand-50 text-brand-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                     >
                       <span>Todas</span>
                       <span className="bg-gray-100 text-gray-500 text-xs py-0.5 px-2 rounded-full">{NEWS.length}</span>
                     </button>
                   </li>
                   {categories.map(cat => (
                     <li key={cat}>
                       <button 
                         onClick={() => setSelectedCategory(cat)}
                         className={`w-full flex justify-between items-center text-sm px-2 py-1.5 rounded transition-colors ${selectedCategory === cat ? 'bg-brand-50 text-brand-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                       >
                         <span>{cat}</span>
                         <span className="bg-gray-100 text-gray-500 text-xs py-0.5 px-2 rounded-full">{NEWS.filter(n => n.category === cat).length}</span>
                       </button>
                     </li>
                   ))}
                </ul>
             </div>

             {/* Tags Widget */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Tag size={18}/> Tags Populares</h3>
                <div className="flex flex-wrap gap-2">
                   {allTags.slice(0, 10).map(tag => (
                     <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors">
                       #{tag}
                     </span>
                   ))}
                </div>
             </div>

             {/* Newsletter Widget */}
             <div className="bg-brand-900 p-6 rounded-xl text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="font-bold text-lg mb-2">News Semanal</h3>
                   <p className="text-brand-100 text-sm mb-4">Receba um resumo das novidades e eventos toda segunda-feira.</p>
                   <input type="email" placeholder="Seu melhor email" className="w-full px-3 py-2 rounded text-gray-900 text-sm mb-2 focus:outline-none" />
                   <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 rounded text-sm transition-colors">Inscrever-se</button>
                </div>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-brand-700 rounded-full opacity-50 blur-xl"></div>
             </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
