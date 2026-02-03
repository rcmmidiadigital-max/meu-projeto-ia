import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart, Calendar, MessageSquare, ArrowRight, CheckCircle, Wallet, Layout } from 'lucide-react';
import { Listing, Rental, Event, Post, NewsItem } from '../types';

// --- ATOMS ---

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'gray' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }> = ({ 
  children, variant = 'primary', size = 'md', className = '', ...props 
}) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm border border-transparent",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
  };
  
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 py-2 px-4 text-sm",
    lg: "h-12 py-3 px-6 text-base"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- CARDS ---

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, compact }) => {
  return (
    <Link to={`/lojas/${listing.id}`} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10">
          <Heart size={18} className="fill-transparent hover:fill-current" />
        </button>
        {listing.isVerified && (
           <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
             <CheckCircle size={10} /> Verificado
           </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-brand-600 transition-colors">{listing.name}</h3>
        </div>
        
        {/* Rating Row */}
        <div className="flex items-center gap-4 mb-4">
          {listing.rating ? (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="font-bold text-sm text-gray-900">{listing.rating}</span>
              <span className="text-xs text-gray-400">({listing.reviewCount})</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400">Sem avaliações</span>
          )}
          <span className="text-gray-300">|</span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{listing.category}</span>
        </div>

        {/* Footer Meta */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-4 text-xs text-gray-500">
           <div className="flex items-center gap-1.5 truncate">
             <MapPin size={14} className="text-gray-400 flex-shrink-0" />
             <span className="truncate">{listing.location || 'Centro'}</span>
           </div>
        </div>
      </div>
    </Link>
  );
};

// Nova componente horizontal baseada na imagem de referência
export const ListingRow: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <Link to={`/lojas/${listing.id}`} className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-brand-100 transition-all duration-200 items-center">
      {/* Alterado para priorizar LOGO para listas de empresas */}
      <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gray-50 border border-gray-200 p-0.5">
        <img 
          src={listing.logo || listing.image} 
          alt={listing.name} 
          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform" 
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
         <h4 className="font-bold text-gray-900 text-base truncate group-hover:text-brand-600">{listing.name}</h4>
         <div className="flex items-center gap-1 mb-0.5">
            <span className="text-xs text-gray-500">{listing.category}</span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-0.5">
                <Star size={10} className="text-yellow-400 fill-current" />
                <span className="text-xs font-bold text-gray-700">{listing.rating || 'N/A'}</span>
            </div>
         </div>
      </div>
      <div className="text-gray-300 group-hover:text-brand-600 transition-colors">
        <ArrowRight size={16} />
      </div>
    </Link>
  );
};

export const RentalCard: React.FC<{ rental: Rental }> = ({ rental }) => {
  return (
    <Link to={`/locacao/${rental.id}`} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img src={rental.image} alt={rental.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm z-10">
          <Heart size={18} className="fill-transparent hover:fill-current" />
        </button>
        <span className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm z-10">
          {rental.type}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
           <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-brand-600 transition-colors">{rental.title}</h3>
        </div>

        <div className="flex items-center gap-4 mb-4">
           <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="font-bold text-sm text-gray-900">5.0</span>
              <span className="text-xs text-gray-400">(Novo)</span>
           </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
           <div className="flex items-center gap-1.5">
             <Wallet size={14} className="text-gray-400" />
             <span className="font-bold text-gray-900 text-sm">R$ {rental.price.toLocaleString('pt-BR')}</span>
           </div>
           <div className="flex items-center gap-1.5">
             <Layout size={14} className="text-gray-400" />
             <span>{rental.area} m²</span>
           </div>
        </div>
      </div>
    </Link>
  );
};

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link to={`/eventos/${event.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
      <div className="relative h-40">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-lg px-2 py-1 text-center shadow-sm min-w-[50px]">
           <span className="block text-xs text-red-500 font-bold uppercase">{event.date.split(' ')[1]}</span>
           <span className="block text-lg font-bold text-gray-900 leading-none">{event.date.split(' ')[0]}</span>
        </div>
      </div>
      <div className="p-3">
        <span className="text-xs font-medium text-brand-600 mb-1 block">{event.category}</span>
        <h4 className="font-semibold text-gray-900 leading-tight group-hover:text-brand-600">{event.title}</h4>
      </div>
    </Link>
  );
};

export const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-brand-200 transition-colors cursor-pointer group">
      <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
           <span className="text-xs text-gray-400">{item.date}</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-600 line-clamp-1">{item.title}</h4>
        <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
        <div className="mt-2 flex items-center text-brand-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ler mais <ArrowRight size={12} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-3 mb-3">
        <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full bg-gray-200" />
        <div>
          <p className="text-xs font-bold text-gray-900">{post.author.name}</p>
          <p className="text-[10px] text-gray-400">{post.date}</p>
        </div>
      </div>
      <h4 className="text-sm font-semibold text-gray-800 mb-1">{post.title}</h4>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{post.excerpt}</p>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1"><Heart size={12} /> {post.likes}</span>
        <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments}</span>
      </div>
    </div>
  );
};