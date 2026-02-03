import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon, 
  Share2, MessageCircle, ChevronRight 
} from 'lucide-react';
import { NEWS } from '../constants';
import { Button } from '../components/Shared';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsItem = NEWS.find(n => n.id === id);

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h2>
        <Link to="/novidades"><Button>Voltar para o Blog</Button></Link>
      </div>
    );
  }

  // Suggest related posts (simple logic: same category, exclude current)
  const relatedPosts = NEWS
    .filter(n => n.category === newsItem.category && n.id !== newsItem.id)
    .slice(0, 2);

  // Social Share Logic (Mock)
  const shareUrl = window.location.href;
  const shareText = `Confira este artigo: ${newsItem.title}`;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. PROGRESS BAR (Optional visual flair) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
        <div className="h-full bg-brand-600 w-1/3"></div> {/* Mock progress */}
      </div>

      {/* 2. HEADER SECTION (SEO Optimized) */}
      <header className="pt-8 pb-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/novidades" className="hover:text-brand-600 transition-colors">Novidades</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{newsItem.title}</span>
          </nav>

          {/* Category */}
          <div className="mb-4">
            <span className="bg-brand-100 text-brand-800 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {newsItem.category || 'Geral'}
            </span>
          </div>

          {/* Title (H1) */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            {newsItem.title}
          </h1>

          {/* Summary (Lead) */}
          <p className="text-xl text-gray-500 mb-8 leading-relaxed font-light">
             {newsItem.summary}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-200 pt-6">
             <div className="flex items-center gap-4">
                <img 
                  src={newsItem.author?.avatar} 
                  alt={newsItem.author?.name} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm" 
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{newsItem.author?.name}</p>
                  <p className="text-xs text-gray-500">{newsItem.author?.role}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
               <div className="flex items-center gap-2" title="Data de publicação">
                 <Calendar size={16} className="text-brand-500" />
                 <time dateTime={newsItem.date}>{newsItem.date}</time>
               </div>
               <div className="flex items-center gap-2" title="Tempo de leitura estimado">
                 <Clock size={16} className="text-brand-500" />
                 <span>{newsItem.readTime || '3 min'}</span>
               </div>
             </div>
          </div>

        </div>
      </header>

      {/* 3. HERO IMAGE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-10">
        <figure className="rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={newsItem.image} 
            alt={newsItem.title} 
            className="w-full h-auto object-cover max-h-[600px]"
          />
          <figcaption className="bg-gray-900 text-gray-400 text-xs py-2 px-4 text-center">
            Foto: Divulgação / Centro Empresarial
          </figcaption>
        </figure>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-12 relative">
         
         {/* 4. SMO SIDEBAR (Sticky) */}
         <aside className="hidden lg:flex flex-col gap-4 sticky top-24 h-fit w-12 flex-shrink-0">
            <p className="text-xs font-bold text-gray-400 text-center mb-2 uppercase tracking-widest rotate-180" style={{writingMode: 'vertical-rl'}}>Compartilhe</p>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm" title="Facebook">
              <Facebook size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors shadow-sm" title="Twitter">
              <Twitter size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:bg-blue-900 transition-colors shadow-sm" title="LinkedIn">
              <Linkedin size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm" title="WhatsApp">
              <MessageCircle size={18} />
            </button>
            <div className="w-px h-12 bg-gray-200 mx-auto my-2"></div>
            <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors" title="Copiar Link">
              <LinkIcon size={18} />
            </button>
         </aside>

         {/* 5. MAIN CONTENT (Prose) */}
         <main className="flex-1 min-w-0">
           <article className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
             {/* Render HTML Content safely */}
             {newsItem.content ? (
               <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
             ) : (
               <p>{newsItem.summary}</p>
             )}
           </article>

           {/* Tags */}
           {newsItem.tags && (
             <div className="mt-12 pt-8 border-t border-gray-100">
               <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Tags Relacionadas</h4>
               <div className="flex flex-wrap gap-2">
                 {newsItem.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors">
                     #{tag}
                   </span>
                 ))}
               </div>
             </div>
           )}

           {/* Mobile Share (Visible only on small screens) */}
           <div className="lg:hidden mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <span className="font-bold text-gray-700">Gostou? Compartilhe:</span>
              <div className="flex gap-2">
                 <button className="p-2 bg-white rounded-full text-blue-600 shadow-sm"><Facebook size={20} /></button>
                 <button className="p-2 bg-white rounded-full text-green-500 shadow-sm"><MessageCircle size={20} /></button>
                 <button className="p-2 bg-white rounded-full text-gray-600 shadow-sm"><Share2 size={20} /></button>
              </div>
           </div>

           {/* 6. AUTHOR BOX (E-E-A-T Signal) */}
           <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <img 
                 src={newsItem.author?.avatar} 
                 alt={newsItem.author?.name} 
                 className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" 
              />
              <div className="flex-1">
                 <h3 className="font-bold text-gray-900 text-lg">Sobre {newsItem.author?.name}</h3>
                 <p className="text-brand-600 text-sm font-medium mb-3">{newsItem.author?.role}</p>
                 <p className="text-gray-500 text-sm leading-relaxed">
                   Jornalista especializada em lifestyle corporativo e tendências de mercado. Escreve semanalmente sobre as novidades do ecossistema empresarial.
                 </p>
              </div>
           </div>

         </main>
      </div>

      {/* 7. RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16 mt-16 border-t border-gray-200">
           <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Você também pode gostar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {relatedPosts.map(post => (
                   <Link key={post.id} to={`/novidades/${post.id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                      <div className="h-48 overflow-hidden">
                        <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={post.title} />
                      </div>
                      <div className="p-6">
                         <div className="text-xs text-brand-600 font-bold mb-2 uppercase">{post.category}</div>
                         <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">{post.title}</h3>
                         <p className="text-gray-500 text-sm line-clamp-2">{post.summary}</p>
                      </div>
                   </Link>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* 8. NEWSLETTER CTA (Copywriting Action) */}
      <section className="py-16 bg-white">
         <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Não perca nenhuma novidade</h2>
            <p className="text-gray-500 mb-8">
               Junte-se a mais de 2.000 condôminos e receba nossa curadoria de conteúdo diretamente no seu e-mail. Sem spam, apenas valor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
               <input 
                 type="email" 
                 placeholder="Digite seu e-mail corporativo" 
                 className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" 
               />
               <Button size="lg" className="whitespace-nowrap">Inscrever agora</Button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
               Ao se inscrever, você concorda com nossa Política de Privacidade.
            </p>
         </div>
      </section>

    </div>
  );
};
