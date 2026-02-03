import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, TrendingUp, Clock, Check, ArrowRight, 
  MapPin, Building, Car, Coffee
} from 'lucide-react';
import { Button, Badge } from '../components/Shared';
import { useTenant } from '../components/Layout';

export const About: React.FC = () => {
  const { tenant } = useTenant();

  const stats = [
    {
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      value: '15.000+',
      label: 'Fluxo Diário de Pessoas',
      desc: 'Um ecossistema vivo de clientes potenciais circulando todos os dias.'
    },
    {
      icon: Building,
      color: 'bg-orange-100 text-orange-600',
      value: '500+',
      label: 'Empresas Residentes',
      desc: 'Networking ativo entre startups, consultórios e grandes corporações.'
    },
    {
      icon: Shield,
      color: 'bg-green-100 text-green-600',
      value: '24/7',
      label: 'Segurança e Monitoramento',
      desc: 'Tecnologia de ponta para garantir a tranquilidade do seu negócio.'
    },
    {
      icon: Car,
      color: 'bg-purple-100 text-purple-600',
      value: '2.000',
      label: 'Vagas de Estacionamento',
      desc: 'Conforto e acessibilidade para você, seus colaboradores e clientes.'
    }
  ];

  const benefits = [
    'Localização estratégica no coração financeiro da cidade.',
    'Infraestrutura de TI com fibra óptica redundante.',
    'Auditório para eventos e salas de reunião equipadas.',
    'Área de convivência e praça de alimentação completa.',
    'Gestão predial eficiente e baixo custo condominial.'
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
            alt="Modern Office Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl px-4">
          <Badge color="blue" children="Nossa Essência" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-6 leading-tight">
            Mais que um edifício, um <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-blue-200">ecossistema de sucesso</span>.
          </h1>
          <p className="text-lg text-gray-200 font-light">
            Conectamos negócios, pessoas e oportunidades em um ambiente projetado para o crescimento.
          </p>
        </div>
      </div>

      {/* 2. HISTORY & CONTEXT SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80" 
                alt="People meeting in lobby" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Crescimento</p>
                  <p className="font-bold text-gray-900">Valorização de 40%</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Nos últimos 5 anos, empresas instaladas aqui cresceram acima da média do mercado.</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Uma história de solidez e inovação</h2>
            <div className="prose prose-blue text-gray-600 mb-8 space-y-4">
              <p>
                Fundado há mais de duas décadas, o <strong>{tenant.name}</strong> nasceu com a missão de descentralizar o polo comercial da região. O que começou como um projeto arquitetônico ousado transformou-se no principal hub de negócios da cidade.
              </p>
              <p>
                Ao longo dos anos, modernizamos não apenas nossa fachada, mas toda a nossa infraestrutura lógica e física. Deixamos de ser apenas salas comerciais para nos tornarmos um centro de convivência e networking.
              </p>
              <p>
                Hoje, abrigamos desde startups de tecnologia até escritórios de advocacia tradicionais, criando uma sinergia única que impulsiona novos negócios todos os dias.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/locacao">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  Quero trazer minha empresa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS & VALUES GRID */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o {tenant.name}?</h2>
            <p className="text-gray-600">
              Os números comprovam: oferecemos a melhor relação custo-benefício e o maior potencial de visibilidade para o seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={28} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">{stat.label}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Faça parte desta história de sucesso</h2>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
            Não perca a oportunidade de posicionar sua marca no endereço mais prestigiado da região. Agende uma visita e conheça nossos espaços disponíveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/locacao">
              <button className="px-8 py-4 bg-white text-brand-600 font-bold rounded-lg shadow-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                Ver Espaços Disponíveis
              </button>
            </Link>
            <button className="px-8 py-4 bg-brand-700 text-white font-bold rounded-lg border border-brand-500 hover:bg-brand-800 transition-colors w-full sm:w-auto">
              Falar com Consultor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};