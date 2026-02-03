import React from 'react';
import { useTenant } from '../components/Layout';
import { PostCard, Button } from '../components/Shared';
import { POSTS } from '../constants';
import { FileText, Wrench, Users, Settings, Plus } from 'lucide-react';

const InternalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-gray-50 flex">
    {/* Simple Sidebar */}
    <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
       <div className="p-6">
         <h2 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Menu</h2>
         <nav className="mt-4 space-y-1">
           <a href="#/app" className="flex items-center gap-2 px-3 py-2 text-brand-600 bg-brand-50 rounded-md font-medium">
             <Users size={18} /> Comunidade
           </a>
           <a href="#/app/tickets" className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium">
             <Wrench size={18} /> Chamados
           </a>
           <a href="#/admin" className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md font-medium">
             <Settings size={18} /> Admin
           </a>
         </nav>
       </div>
    </div>
    
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <Button>
            <Plus size={16} className="mr-2" /> Novo Post
          </Button>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <InternalLayout title="Comunidade & Feed">
       <div className="space-y-6">
         {POSTS.map(post => (
           <PostCard key={post.id} post={post} />
         ))}
       </div>
    </InternalLayout>
  );
};

export const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
       <div className="max-w-7xl mx-auto">
         <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded border border-yellow-500/50 text-sm">Modo View-Only</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
               <h3 className="text-gray-400 text-sm uppercase">Total Ocupação</h3>
               <p className="text-4xl font-bold mt-2">87%</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
               <h3 className="text-gray-400 text-sm uppercase">Chamados Abertos</h3>
               <p className="text-4xl font-bold mt-2 text-red-400">12</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
               <h3 className="text-gray-400 text-sm uppercase">Receita (Mês)</h3>
               <p className="text-4xl font-bold mt-2 text-green-400">R$ 1.2M</p>
            </div>
         </div>
       </div>
    </div>
  );
};

export const Governance: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Governança & Transparência</h1>
      <p className="text-gray-500 mb-8">Acesse atas, balancetes e documentos oficiais do condomínio.</p>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
        {[1,2,3,4].map(i => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                 <FileText size={20} />
               </div>
               <div>
                 <h4 className="font-medium text-gray-900">Ata da Assembleia Geral Ordinária {2024 - i}</h4>
                 <p className="text-xs text-gray-500">Publicado em 12/03/2024 • PDF (2.4MB)</p>
               </div>
             </div>
             <Button variant="outline" className="text-xs h-8">Download</Button>
          </div>
        ))}
      </div>
    </div>
  );
};