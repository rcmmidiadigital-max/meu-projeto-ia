import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Phone, Share2, Globe, Check, 
  Wifi, Car, Coffee, Accessibility, Award, Trophy, Medal,
  Image as ImageIcon, Info, MessageCircle, Mail, Star, Heart, User, Pencil,
  CreditCard, Tag, ChevronLeft, ChevronRight, ArrowRight,
  Ruler, Maximize, Bath, Bed, Calendar, FileText, EyeOff, Layout, X, Zap,
  ShoppingBag, Sparkles
} from 'lucide-react';
import { Button, Badge, ListingCard, RentalCard } from '../components/Shared';
import { LISTINGS, RENTALS } from '../constants';
import { Listing, FeaturedItem, Rental } from '../types';

// --- SHARED COMPONENTS FOR DETAIL ---

interface DetailTabButtonProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const DetailTabButton: React.FC<DetailTabButtonProps> = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    active 
      ? 'bg-brand-50 text-brand-700 ring-2 ring-brand-100 ring-offset-1' 
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`}>
    <Icon size={16} />
    {label}
  </button>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-bold text-gray-900 mb-6">{children}</h3>
);

const StoreSidebar: React.FC<{ listing: Listing }> = ({ listing }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
       {/* Header with Logo */}
       <div className="flex gap-4 items-start mb-6">
          <div className="w-16 h-16 rounded-lg border border-gray-100 flex-shrink-0 overflow-hidden bg-gray-50">
             {listing.logo ? (
               <img src={listing.logo} alt={listing.name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-600 font-bold text-xl">
                  {listing.name.substring(0, 2).toUpperCase()}
               </div>
             )}
          </div>
          <div>
             <h3 className="font-bold text-gray-900 text-lg leading-tight">{listing.name}</h3>
             <div className="flex items-center text-yellow-500 text-xs font-bold mt-1">
               <Star size={12} className="fill-current mr-1" /> {listing.rating}
               <span className="text-gray-400 font-normal ml-1">({listing.reviewCount} reviews)</span>
             </div>
          </div>
       </div>

       <div className="border-t border-gray-100 pt-6 mb-8">
         <h4 className="font-bold text-gray-900 mb-4">Contatos:</h4>
         <div className="grid grid-cols-1 gap-y-4 gap-x-2">
           <div className="flex items-start gap-3 text-sm text-gray-600">
             <Phone size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
             <span className="break-all">{listing.phone || '(11) 3245-0000'}</span>
           </div>
           {listing.website && (
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Globe size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                <a href={`http://${listing.website}`} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline break-all">{listing.website}</a>
              </div>
           )}
           {listing.email && (
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Mail size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                <a href={`mailto:${listing.email}`} className="text-gray-600 hover:text-brand-600 break-all">{listing.email}</a>
              </div>
           )}
           <div className="flex items-start gap-3 text-sm text-gray-600">
             <MapPin size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
             <span>{listing.location}, Centro Empresarial</span>
           </div>
         </div>
       </div>

       <a 
         href={`https://wa.me/?text=Olá, vi sua loja ${listing.name} no Portal do Centro Empresarial.`}
         target="_blank" 
         rel="noopener noreferrer"
         className="w-full py-3 px-4 rounded-lg bg-[#25D366] text-white font-bold text-sm hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-sm mb-3"
       >
         <MessageCircle size={18} />
         Conversar no WhatsApp
       </a>
       
       <button className="w-full py-3 px-4 rounded-lg border border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          <Share2 size={18} />
          Compartilhar Loja
       </button>
    </div>

    {/* Map Placeholder */}
    <div className="rounded-xl overflow-hidden border border-gray-200 h-64 relative bg-gray-100 group cursor-pointer">
      <img 
        src="https://api.maptiler.com/resources/logo.svg" 
        className="absolute bottom-2 left-2 w-20 opacity-50 z-10" 
        alt="map source"
      />
      <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/img/osm-intl,15,48.2082,16.3738,270x200.png')] bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 transition-all duration-500"></div>
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="bg-white p-3 rounded-full shadow-lg text-brand-600 animate-bounce">
           <MapPin size={24} className="fill-current" />
         </div>
      </div>
    </div>
  </div>
);

// --- RECENTLY VIEWED CAROUSEL ---

interface RecentlyViewedCarouselProps {
  items: (Listing | Rental)[];
  type: 'store' | 'rental';
}

const RecentlyViewedCarousel: React.FC<RecentlyViewedCarouselProps> = ({ 
  items, 
  type 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Visto Recentemente</h2>
        <Link 
          to={type === 'store' ? '/lojas' : '/locacao'} 
          className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center"
        >
          Ver todos <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white border border-gray-200 text-gray-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-gray-50 hover:text-brand-600"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 px-1"
        >
          {items.map((item) => (
             <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                {type === 'store' ? (
                  <ListingCard listing={item as Listing} />
                ) : (
                  <RentalCard rental={item as Rental} />
                )}
             </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white border border-gray-200 text-gray-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hover:text-brand-600"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// --- FEATURED ITEM CARD ---

const FeaturedItemCard: React.FC<{ item: FeaturedItem }> = ({ item }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full relative">
    {item.isHighlighted && (
       <div className="absolute top-3 left-3 z-10">
         <span className="bg-yellow-400 text-yellow-900 text-[10px] uppercase font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
           <Zap size={10} className="fill-current" /> Destaque
         </span>
       </div>
    )}
    <div className="relative h-40 flex-shrink-0">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm">
        <Heart size={16} />
      </button>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{item.name}</h4>
      
      {/* Rating Row */}
      {item.rating && (
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="font-bold text-sm text-gray-900">{item.rating}</span>
          <span className="text-sm text-gray-400">({item.reviewCount || 0})</span>
        </div>
      )}

      {/* Description */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 flex-1">
         <span className="line-clamp-2">{item.description || 'Produto em destaque'}</span>
      </div>

      {/* Price & Action Row (Bottom) */}
      <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between gap-3">
        <div className="flex flex-col">
           <div className="flex items-baseline gap-1">
             <span className="font-bold text-lg text-gray-900">R$ {item.price.toFixed(2).replace('.', ',')}</span>
             {item.unit && <span className="text-xs text-gray-500 font-normal">/{item.unit}</span>}
           </div>
        </div>
        <Button size="sm" variant={item.type === 'service' ? 'outline' : 'primary'}>
           {item.type === 'service' ? 'Agendar' : 'Comprar'}
        </Button>
      </div>
    </div>
  </div>
);


// --- STORE DETAIL (Custom Rich Layout) ---

export const StoreDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const listing = LISTINGS.find(l => l.id === id);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews' | 'gallery'>('info');

  if (!listing) return <div className="p-12 text-center">Loja não encontrada.</div>;

  // Filter listings for "Recently Viewed" (exclude current)
  const otherListings = LISTINGS.filter(l => l.id !== listing.id).slice(0, 5);

  // Split featured items into highlights and others
  const highlights = listing.featuredItems?.filter(i => i.isHighlighted) || [];
  const otherItems = listing.featuredItems?.filter(i => !i.isHighlighted) || [];

  const amenities = [
    { icon: Wifi, label: 'Wi-Fi Gratuito' },
    { icon: Car, label: 'Estacionamento' },
    { icon: Coffee, label: 'Café & Água' },
    { icon: Accessibility, label: 'Acessibilidade' },
    { icon: Clock, label: 'Atendimento 24h' },
    { icon: Check, label: 'Ambiente Climatizado' },
  ].filter(am => listing.amenities ? listing.amenities.includes(am.label) : true); // In real app, match exactly

  // Prepare Gallery Images
  const galleryImages = listing.gallery && listing.gallery.length > 0 
    ? listing.gallery 
    : [listing.image, listing.image, listing.image, listing.image, listing.image];

  // Prepare Reviews (Only approved)
  const reviews = listing.reviews?.filter(r => r.status === 'approved') || [];
  
  const ratingStats = [
    { label: '5 rating', pct: 60 },
    { label: '4 rating', pct: 30 },
    { label: '3 rating', pct: 10 },
    { label: '2 rating', pct: 0 },
    { label: '1 rating', pct: 0 },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Link to="/" className="hover:text-brand-600">Home</Link> / 
            <Link to="/lojas" className="hover:text-brand-600">Lojas</Link> / 
            <span className="text-gray-900 font-medium">{listing.name}</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{listing.name}</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"><Heart size={20} /></button>
            <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"><Share2 size={20} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <DetailTabButton 
            icon={Info} 
            label="Info" 
            active={activeTab === 'info'} 
            onClick={() => setActiveTab('info')} 
          />
          <DetailTabButton 
            icon={MessageCircle} 
            label={`Avaliações (${reviews.length})`} 
            active={activeTab === 'reviews'} 
            onClick={() => setActiveTab('reviews')} 
          />
          <DetailTabButton 
            icon={ImageIcon} 
            label={`Galeria (${galleryImages.length})`} 
            active={activeTab === 'gallery'} 
            onClick={() => setActiveTab('gallery')} 
          />
        </div>

        {/* Meta Info Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
           <div className="flex items-center text-yellow-500 font-bold">
             <Star size={16} className="fill-current mr-1" /> 
             {listing.rating || '4.5'} 
             <span className="text-gray-400 font-normal ml-1">({listing.reviewCount || 0} avaliações)</span>
           </div>
           <span className="text-gray-300">•</span>
           <div className="flex items-center">
             <MapPin size={16} className="mr-1 text-gray-400" />
             {listing.location}
           </div>
        </div>

        {/* --- TAB CONTENT: INFO --- */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-300">
             {/* LEFT MAIN CONTENT */}
             <div className="lg:col-span-8 space-y-12">
                
                {/* Description */}
                <section>
                  <SectionTitle>Sobre</SectionTitle>
                  <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                    <p className="whitespace-pre-line">{listing.description}</p>
                  </div>
                </section>

                {/* Featured Items (Highlights) Carousel */}
                {highlights.length > 0 && (
                   <section>
                      <SectionTitle>Destaques</SectionTitle>
                      <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 snap-x lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
                         {highlights.map(item => (
                           <div key={item.id} className="min-w-[240px] snap-center flex-shrink-0 h-full lg:min-w-0">
                             <FeaturedItemCard item={item} />
                           </div>
                         ))}
                      </div>
                   </section>
                )}

                {/* Other Items (List) */}
                {otherItems.length > 0 && (
                  <section className={highlights.length > 0 ? "mt-4" : ""}>
                     <SectionTitle>Outros Produtos & Serviços</SectionTitle>
                     <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-sm">
                        {otherItems.map(item => (
                          <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center flex-shrink-0 border border-gray-100 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all overflow-hidden">
                                   {item.image ? (
                                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                                   ) : (
                                      item.type === 'service' ? <Sparkles size={20} /> : <ShoppingBag size={20} />
                                   )}
                                </div>
                                <div>
                                   <h4 className="font-medium text-gray-900 leading-tight">{item.name}</h4>
                                   {item.description && <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>}
                                </div>
                             </div>
                             <div className="text-right pl-4">
                                <span className="block font-bold text-gray-900 text-sm">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                                {item.unit && <span className="text-xs text-gray-400 block">/{item.unit}</span>}
                             </div>
                          </div>
                        ))}
                     </div>
                  </section>
                )}

                {/* Amenities */}
                {listing.amenities && listing.amenities.length > 0 && (
                  <section>
                     <SectionTitle>Comodidades</SectionTitle>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {listing.amenities.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-700">
                             <Check size={20} className="text-brand-600" />
                             <span className="font-medium text-sm">{item}</span>
                          </div>
                        ))}
                     </div>
                  </section>
                )}

                {/* Awards */}
                {listing.awards && listing.awards.length > 0 && (
                  <section>
                     <SectionTitle>Reconhecimento</SectionTitle>
                     <div className="flex flex-wrap gap-6">
                        {listing.awards.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-100 min-w-[200px]">
                             <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <Trophy size={24} />
                             </div>
                             <div>
                                <p className="font-bold text-gray-900 text-sm">{item}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </section>
                )}
             </div>

             {/* RIGHT SIDEBAR */}
             <div className="lg:col-span-4">
                <StoreSidebar listing={listing} />
             </div>
          </div>
        )}

        {/* --- TAB CONTENT: GALLERY --- */}
        {activeTab === 'gallery' && (
          <div className="animate-in fade-in duration-300">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img, i) => (
                  <div key={i} className={`rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}>
                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* --- TAB CONTENT: REVIEWS --- */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in duration-300">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8">
              <SectionTitle>Avaliações dos Clientes</SectionTitle>
              
              {/* Rating Stats Box */}
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-gray-100 pb-8">
                  {/* Big Score */}
                  <div className="flex flex-col items-center justify-center min-w-[120px] p-2">
                     <span className="text-5xl font-bold text-gray-900 mb-2">{listing.rating || '4.5'}</span>
                     <div className="flex gap-1 text-yellow-400 mb-2">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-current" />)}
                     </div>
                     <span className="text-xs text-gray-400">{reviews.length} Avaliações</span>
                  </div>
              </div>

              {/* List of Reviews */}
              <div className="space-y-8">
                 {reviews.length > 0 ? reviews.map(review => (
                   <div key={review.id} className="group">
                      <div className="flex items-start gap-4 mb-4">
                         <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-500 font-bold text-lg">
                            {review.userAvatar ? (
                               <img src={review.userAvatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                               review.userName.charAt(0)
                            )}
                         </div>
                         <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                               <h4 className="font-bold text-gray-900">{review.userName}</h4>
                               <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex gap-1 text-yellow-400 mb-3">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} size={12} className={s <= review.rating ? "fill-current" : "text-gray-200"} />
                              ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                              {review.comment}
                            </p>
                         </div>
                      </div>
                      <div className="border-b border-gray-100 mt-6"></div>
                   </div>
                 )) : (
                    <div className="text-center py-10 text-gray-500">
                       Seja o primeiro a avaliar esta loja!
                    </div>
                 )}
              </div>
            </div>

            {/* RIGHT COLUMN (Sidebar) */}
            <div className="lg:col-span-4">
               <StoreSidebar listing={listing} />
            </div>
          </div>
        )}

        {/* --- FIXED BOTTOM SECTION: RECENTLY VIEWED --- */}
        <RecentlyViewedCarousel items={otherListings} type="store" />
      </div>
    </div>
  );
};

export const RentalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const rental = RENTALS.find(r => r.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Gallery Logic: Fallback to single image if array not present
  const gallery = rental?.images && rental.images.length > 0 
    ? rental.images 
    : (rental?.image ? [rental.image, rental.image, rental.image] : []);

  // --- LIGHTBOX CONTROLS ---
  const openLightbox = (index: number) => {
    setCurrentImageIdx(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  if (!rental) return <div className="p-12 text-center">Imóvel não encontrado.</div>;

  // Filter rentals for "Recently Viewed" (exclude current)
  const otherRentals = RENTALS.filter(r => r.id !== rental.id);

  // Specific Icon Details for Rental (Residential/Commercial mix style)
  const details = [
    { label: 'tot.', value: `${rental.area} m²`, icon: Ruler },
    { label: 'útil', value: rental.usefulArea ? `${rental.usefulArea} m²` : '-', icon: Maximize },
    { label: 'banheiros', value: rental.bathrooms ?? '-', icon: Bath },
    { label: 'vagas', value: rental.parkingSpaces ?? '-', icon: Car },
    { label: 'salas', value: rental.rooms ?? '-', icon: Layout }, // Changed generic Bed to Layout for commercial context
    { label: 'suíte', value: rental.suites ?? '-', icon: Bed }, // Kept Bed for Suites per user request context
    { label: 'anos', value: rental.age ?? '-', icon: Calendar },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-6">
      
      {/* --- LIGHTBOX OVERLAY --- */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all z-20"
          >
            <X size={24} />
          </button>

          <button 
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all z-20 hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center max-w-7xl max-h-screen">
            <img 
              src={gallery[currentImageIdx]} 
              alt={`Gallery ${currentImageIdx}`} 
              className="max-w-full max-h-[85vh] object-contain select-none"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
               {currentImageIdx + 1} / {gallery.length}
            </div>
          </div>

          <button 
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all z-20 hidden md:block"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR: Breadcrumbs + Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Link to="/" className="hover:text-brand-600">Home</Link> / 
            <Link to="/locacao" className="hover:text-brand-600">Locação</Link> / 
            <span className="text-gray-900 font-medium">{rental.type}</span>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
             <button className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
               <Heart size={18} /> Favorito
             </button>
             <button className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
               <Share2 size={18} /> Compartilhar
             </button>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] mb-8 rounded-xl overflow-hidden">
           {/* Large Image */}
           <div 
             className="md:col-span-3 md:row-span-2 relative group cursor-pointer bg-gray-100"
             onClick={() => openLightbox(0)}
           >
              <img src={gallery[0]} alt="Main" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
           </div>
           
           {/* Side Images */}
           <div 
             className="hidden md:block md:col-span-1 md:row-span-1 relative group cursor-pointer bg-gray-100"
             onClick={() => openLightbox(1)}
           >
              <img src={gallery[1] || gallery[0]} alt="Side 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
           </div>
           
           <div 
             className="hidden md:block md:col-span-1 md:row-span-1 relative group cursor-pointer bg-gray-100"
             onClick={() => openLightbox(2)}
           >
              <img src={gallery[2] || gallery[0]} alt="Side 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              {/* View All Button Overlay */}
              <div className="absolute bottom-4 right-4">
                 <button 
                    onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
                    className="bg-white/90 backdrop-blur hover:bg-white text-gray-900 text-sm font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                 >
                    Ver todas as fotos <ImageIcon size={16} />
                 </button>
              </div>
           </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* LEFT: Details */}
           <div className="lg:col-span-8 space-y-10">
              
              {/* Header Info */}
              <div>
                 <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{rental.title}</h1>
                 </div>
                 <p className="text-gray-500 flex items-center gap-2 mb-6">
                    <MapPin size={18} /> Centro Empresarial Demo - Torre A, 4º Andar
                 </p>

                 {/* Icons Row */}
                 <div className="flex flex-wrap gap-8 py-6 border-y border-gray-100">
                    {details.map((det, idx) => (
                       <div key={idx} className="flex flex-col items-center gap-2 min-w-[60px]">
                          <det.icon size={28} className="text-gray-900 stroke-1.5" />
                          <div className="text-center">
                             <span className="block text-lg font-medium text-gray-900 leading-none">{det.value}</span>
                             <span className="block text-sm text-gray-500 mt-1">{det.label}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Description */}
              <section>
                 <SectionTitle>Descrição do Imóvel</SectionTitle>
                 <div className="prose prose-gray max-w-none text-gray-600">
                    <p className="whitespace-pre-line leading-relaxed">
                       {rental.description || 'Descrição detalhada não informada pelo proprietário. Entre em contato para mais informações.'}
                    </p>
                 </div>
              </section>

              {/* Diferenciais (Features) */}
              <section>
                <SectionTitle>Diferenciais</SectionTitle>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rental.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-gray-700 p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                      <div className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 flex items-center justify-center shadow-sm">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>
           </div>

           {/* RIGHT: Sidebar */}
           <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg sticky top-24">
                 <div className="mb-6 pb-6 border-b border-gray-100">
                   <span className="text-sm text-gray-500 font-medium block mb-1">Valor Mensal</span>
                   <div className="flex items-baseline gap-1">
                      <span className="text-sm text-gray-400 font-medium">R$</span>
                      <p className="text-4xl font-bold text-brand-600">{rental.price.toLocaleString('pt-BR')}</p>
                   </div>
                   <div className="mt-2 text-sm text-gray-500">
                      + Condomínio: R$ 850,00<br/>
                      + IPTU: R$ 120,00
                   </div>
                 </div>

                 <div className="space-y-3">
                    <Button className="w-full h-12 text-base shadow-md">Agendar Visita</Button>
                    <Button variant="outline" className="w-full h-12 text-base border-brand-200 text-brand-700 hover:bg-brand-50">
                       <MessageCircle size={18} className="mr-2" /> 
                       Enviar Mensagem
                    </Button>
                 </div>

                 <div className="mt-6 pt-4 border-t border-gray-50 text-center">
                    <p className="text-xs text-gray-400">Código do imóvel: {rental.id.toUpperCase()}</p>
                 </div>
              </div>
           </div>

        </div>

        {/* BOTTOM: Related */}
        <RecentlyViewedCarousel items={otherRentals} type="rental" />
      </div>
    </div>
  );
};
