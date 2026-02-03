import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Tag, User, CheckCircle, 
  ArrowLeft, Share2, Heart, Mail, Phone, Building 
} from 'lucide-react';
import { EVENTS } from '../constants';
import { Button } from '../components/Shared';

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Evento não encontrado</h2>
          <Link to="/" className="text-brand-600 hover:underline mt-4 block">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. HERO & INFO CARD SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-brand-600 flex items-center gap-1">
               <ArrowLeft size={16} /> Voltar
            </Link>
            <span>/</span>
            <span>Eventos</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{event.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main Image */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] relative group">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button className="p-2 bg-white/90 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                     <Heart size={20} />
                   </button>
                   <button className="p-2 bg-white/90 rounded-full text-gray-600 hover:text-brand-600 transition-colors shadow-sm">
                     <Share2 size={20} />
                   </button>
                </div>
              </div>
            </div>

            {/* Right: Blue Event Info Card */}
            <div className="lg:col-span-1">
               <div className="bg-blue-700 text-white rounded-2xl p-8 shadow-xl h-full flex flex-col relative overflow-hidden">
                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 relative z-10">Event Info</h3>
                  <div className="w-10 h-1 bg-white mb-8 relative z-10"></div>

                  <div className="space-y-6 relative z-10 flex-1">
                     
                     <div className="flex items-start gap-4">
                        <div className="mt-1"><Calendar size={20} className="text-blue-200" /></div>
                        <div>
                           <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Data</p>
                           <p className="font-medium text-lg">{event.fullDate || event.date}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="mt-1"><Clock size={20} className="text-blue-200" /></div>
                        <div>
                           <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Horário</p>
                           <p className="font-medium text-lg">{event.time || 'A definir'}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="mt-1"><Tag size={20} className="text-blue-200" /></div>
                        <div>
                           <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Categoria</p>
                           <p className="font-medium text-lg">{event.category}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="mt-1"><User size={20} className="text-blue-200" /></div>
                        <div>
                           <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Organizador</p>
                           <p className="font-medium text-lg">{event.organizer || 'Administração'}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="mt-1"><MapPin size={20} className="text-blue-200" /></div>
                        <div>
                           <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Local</p>
                           <p className="font-medium text-lg">{event.location || 'Centro Empresarial'}</p>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DESCRIPTION SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
               <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{event.title}</h1>
               
               <div className="prose prose-lg text-gray-600 mb-8">
                  <p className="leading-relaxed">
                     {event.description || 'Descrição detalhada do evento não disponível.'}
                  </p>
               </div>

               {event.highlights && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {event.highlights.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                          <CheckCircle className="text-brand-500" size={20} />
                          <span className="font-medium text-gray-800">{item}</span>
                       </div>
                    ))}
                 </div>
               )}
            </div>

            {/* Sidebar Placeholder or Empty for balance */}
            <div className="hidden lg:block">
               {/* Optional related events or ads could go here */}
            </div>
         </div>
      </div>

      {/* 3. REGISTRATION FORM SECTION */}
      <div className="bg-white py-16 border-t border-gray-200">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Garanta sua vaga</h2>
               <p className="text-gray-500">Preencha o formulário abaixo para confirmar sua presença neste evento.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-gray-700">Nome Completo</label>
                        <div className="relative">
                           <User className="absolute left-3 top-3 text-gray-400" size={18} />
                           <input type="text" id="name" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Seu nome" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Corporativo</label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                           <input type="email" id="email" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="seu@email.com" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-gray-700">Telefone / WhatsApp</label>
                        <div className="relative">
                           <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                           <input type="tel" id="phone" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="(00) 00000-0000" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-bold text-gray-700">Empresa / Unidade</label>
                        <div className="relative">
                           <Building className="absolute left-3 top-3 text-gray-400" size={18} />
                           <input type="text" id="company" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Ex: Sala 304" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500" />
                        <span className="text-sm text-gray-600">Concordo em receber notificações sobre este evento.</span>
                     </label>
                  </div>

                  <div className="pt-4">
                     <Button size="lg" className="w-full text-lg shadow-lg">Confirmar Inscrição</Button>
                  </div>
               </form>
            </div>
         </div>
      </div>

    </div>
  );
};
