import { Tenant, Listing, Rental, Event, Post, NewsItem } from './types';

export const TENANTS: Record<string, Tenant> = {
  'demo-centro': {
    id: 'demo-centro',
    name: 'Centro Empresarial Demo',
    logo: '🏢 CED',
    primaryColor: '#ef4444', // Red-500
    secondaryColor: '#fca5a5',
    contact: {
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      phone: '(11) 9999-9999',
      email: 'contato@demo-centro.com.br'
    }
  },
  'centro-beta': {
    id: 'centro-beta',
    name: 'Tech Hub Beta',
    logo: '🚀 THB',
    primaryColor: '#2563eb', // Blue-600
    secondaryColor: '#93c5fd',
    contact: {
      address: 'Rua da Inovação, 404 - Florianópolis, SC',
      phone: '(48) 8888-8888',
      email: 'admin@techhub.com'
    }
  }
};

export const LISTINGS: Listing[] = [
  {
    id: '1',
    name: 'Café do Ponto',
    category: 'Lanchonetes',
    description: 'O melhor café do centro empresarial. Lanches rápidos e ambiente agradável.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=CP&backgroundColor=78350f',
    tags: ['Café', 'Wi-Fi', 'Almoço'],
    isVerified: true,
    rating: 4.8,
    reviewCount: 120,
    location: 'Térreo, Loja 10',
    phone: '(11) 3245-0000',
    email: 'contato@cafedoponto.com',
    website: 'www.cafedoponto.com.br',
    amenities: ['Wi-Fi Gratuito', 'Café & Água', 'Acessibilidade'],
    awards: ['Excelência 2024'],
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      { id: 'r1', userName: 'Maria Silva', rating: 5, date: '12 Out 2024', comment: 'Melhor pão de queijo do prédio!', status: 'approved' },
      { id: 'r2', userName: 'João Souza', rating: 4, date: '10 Out 2024', comment: 'Ótimo atendimento, mas o Wi-Fi oscilou hoje.', status: 'approved' },
      { id: 'r3', userName: 'Carlos Fake', rating: 1, date: '09 Out 2024', comment: 'SPAM MESSAGE CLICK HERE', status: 'rejected' },
      { id: 'r4', userName: 'Ana Pending', rating: 5, date: 'Hoje', comment: 'Adorei a nova decoração!', status: 'pending' }
    ],
    featuredItems: [
      {
        id: 'f1',
        name: 'Combo Cappuccino + Pão de Queijo',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
        price: 18.90,
        rating: 4.9,
        reviewCount: 42,
        description: 'Nosso carro chefe',
        type: 'product',
        isHighlighted: true
      },
      {
        id: 'f2',
        name: 'Torta de Limão Siciliano',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
        price: 12.50,
        rating: 4.7,
        reviewCount: 15,
        unit: 'fatia',
        type: 'product',
        isHighlighted: true
      },
      {
        id: 'f3',
        name: 'Expresso Duplo',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        price: 8.00,
        rating: 5.0,
        reviewCount: 89,
        unit: 'xícara',
        type: 'product',
        isHighlighted: true
      },
      {
        id: 'f4',
        name: 'Água Mineral',
        image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80',
        price: 5.00,
        type: 'product',
        isHighlighted: false
      }
    ]
  },
  {
    id: '2',
    name: 'Tech Solutions Assistência',
    category: 'Diversos',
    description: 'Reparo de notebooks e celulares em até 24h.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=TS&backgroundColor=2563eb',
    tags: ['Reparo', 'Apple', 'Samsung'],
    isVerified: true,
    rating: 4.5,
    reviewCount: 45,
    location: '2º Andar, Sala 202',
    phone: '(11) 9988-7766',
    amenities: ['Atendimento 24h', 'Ambiente Climatizado'],
    reviews: [
       { id: 'r1', userName: 'Pedro Tech', rating: 5, date: '15 Set 2024', comment: 'Salvaram meu Mac!', status: 'approved' }
    ],
    gallery: [
       'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&w=800&q=80'
    ],
    featuredItems: [
      {
        id: 't1',
        name: 'Troca de Tela iPhone X-13',
        image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80',
        price: 450.00,
        rating: 4.8,
        reviewCount: 120,
        description: 'Peça original, garantia 3 meses',
        type: 'service',
        isHighlighted: true
      },
      {
        id: 't2',
        name: 'Formatação + Backup',
        image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80',
        price: 120.00,
        rating: 4.5,
        reviewCount: 30,
        unit: 'serviço',
        type: 'service',
        isHighlighted: true
      },
      {
        id: 't3',
        name: 'Limpeza Interna Notebook',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        price: 80.00,
        rating: 4.9,
        reviewCount: 15,
        unit: 'serviço',
        type: 'service',
        isHighlighted: false
      }
    ]
  },
  {
    id: '3',
    name: 'Silva & Souza Advocacia',
    category: 'Advocacia',
    description: 'Especialistas em direito trabalhista e empresarial.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=SS&backgroundColor=1e293b',
    tags: ['Advogados', 'Consultoria'],
    isVerified: false,
    rating: 5.0,
    reviewCount: 12,
    location: '5º Andar, Sala 501',
    amenities: ['Estacionamento', 'Wi-Fi Gratuito'],
    awards: ['Top Quality']
  },
  {
    id: '4',
    name: 'FitCenter Academia',
    category: 'Diversos',
    description: 'Musculação, funcional e aulas em grupo.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=FC&backgroundColor=dc2626',
    tags: ['Academia', 'Saúde', 'Crossfit'],
    isVerified: true,
    rating: 4.9,
    reviewCount: 300,
    location: 'Subsolo 1'
  },
  {
    id: '5',
    name: 'CopyMax Gráfica',
    category: 'Diversos',
    description: 'Impressões, encadernações e plotagem.',
    image: 'https://images.unsplash.com/photo-1562564025-51dc11516a0b?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=CG&backgroundColor=f59e0b',
    tags: ['Gráfica', 'Express'],
    isVerified: false,
    rating: 4.2,
    reviewCount: 22,
    location: 'Térreo, Loja 05'
  },
  {
    id: '6',
    name: 'Studio Zen Yoga',
    category: 'Clínicas',
    description: 'Aulas de yoga e meditação para o equilíbrio da mente.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=SZ&backgroundColor=84cc16',
    tags: ['Yoga', 'Bem-estar'],
    isVerified: true,
    rating: 5.0,
    reviewCount: 45,
    location: 'Cobertura, Sala 01'
  },
  {
    id: '7',
    name: 'Connect Coworking',
    category: 'Diversos',
    description: 'Espaço de trabalho compartilhado e salas de reunião.',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
    logo: 'https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=6366f1',
    tags: ['Coworking', 'Escritório'],
    isVerified: true,
    rating: 4.8,
    reviewCount: 92,
    location: '4º Andar'
  }
];

export const RENTALS: Rental[] = [
  {
    id: 'r1',
    title: 'Sala Comercial Vazia',
    type: 'Sala',
    area: 52,
    usefulArea: 45,
    price: 2500,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Ar condicionado Split', 'Piso Elevado', 'Vista Panorâmica', 'Cabeamento Estruturado', 'Persianas'],
    status: 'available',
    bathrooms: 2,
    parkingSpaces: 2,
    rooms: 1,
    suites: 0,
    age: 5,
    description: 'Sala comercial excelente, pronta para uso. Possui piso elevado com acabamento em carpete, forro mineral com iluminação em LED e ar condicionado. O espaço conta com copa montada e banheiros privativos. Localização privilegiada no edifício com vista para a avenida principal. O condomínio oferece segurança 24h, recepção bilíngue e estacionamento com vallet.'
  },
  {
    id: 'r2',
    title: 'Loja Vaga no Térreo',
    type: 'Loja',
    area: 95,
    usefulArea: 80,
    price: 6000,
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ec27?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582037928769-181f2644ec27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Vitrine Vidro Temperado', 'Pé direito duplo', 'Acessibilidade', 'Ponto de Gás', 'Exaustão'],
    status: 'available',
    bathrooms: 1,
    parkingSpaces: 1,
    rooms: 1,
    suites: 0,
    age: 2,
    description: 'Loja com vitrine ampla voltada para o hall principal do centro empresarial. Pé direito duplo que permite construção de mezanino (já aprovado no projeto). Ideal para cafés, livrarias ou showrooms. Infraestrutura completa de água, luz e gás.'
  },
  {
    id: 'r3',
    title: 'Espaço para Quiosque',
    type: 'Quiosque',
    area: 12,
    usefulArea: 12,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Ponto de água', 'Energia trifásica', 'Internet dedicada'],
    status: 'reserved',
    bathrooms: 0,
    parkingSpaces: 0,
    rooms: 0,
    suites: 0,
    age: 1,
    description: 'Espaço estratégico para quiosque no ponto de maior circulação do empreendimento. Próximo às catracas de acesso.'
  },
  {
    id: 'r4',
    title: 'Vaga G2-44',
    type: 'Vaga de Garagem',
    area: 12,
    usefulArea: 12,
    price: 350,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    features: ['Coberta', 'Próxima ao Elevador B', 'Monitoramento 24h'],
    status: 'available',
    parkingSpaces: 1,
    description: 'Vaga de garagem ampla e de fácil manobra localizada no G2. Acesso exclusivo para condôminos.'
  },
  {
    id: 'r5',
    title: 'Auditório Principal',
    type: 'Auditório',
    area: 150,
    usefulArea: 140,
    price: 1500, // Preço por evento/dia poderia ser ajustado na UI
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    features: ['Projetor 4K', 'Sistema de Som', '100 Lugares', 'Foyer'],
    status: 'available',
    description: 'Auditório moderno para palestras, treinamentos e convenções. Acústica tratada e equipamentos de última geração.'
  }
];

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Summit de Liderança 2024',
    date: '15 Out',
    fullDate: '15 Outubro 2024',
    time: '09:00 - 18:00',
    image: 'https://images.unsplash.com/photo-1544531696-b85366a23092?auto=format&fit=crop&w=800&q=80',
    category: 'Palestra',
    organizer: 'Associação Comercial',
    location: 'Auditório Principal',
    description: 'Participe do maior encontro de líderes do ano. Palestras inspiradoras sobre gestão, futuro do trabalho e inovação corporativa.',
    highlights: ['Keynote Speaker Internacional', 'Painel de Debates', 'Certificado Digital', 'Coffee Break Premium']
  },
  {
    id: 'e2',
    title: 'Dia da Família & Kids',
    date: '20 Out',
    fullDate: '20 Outubro 2024',
    time: '10:00 - 16:00',
    image: 'https://images.unsplash.com/photo-1566004100631-029668deb959?auto=format&fit=crop&w=800&q=80',
    category: 'Infantil',
    organizer: 'Comitê de Eventos',
    location: 'Jardim Central',
    description: 'Um dia dedicado aos filhos dos colaboradores e comunidade. Oficinas de pintura, brinquedos infláveis, pipoca e muita diversão.',
    highlights: ['Pintura Facial', 'Show de Mágica', 'Espaço Baby', 'Food Trucks']
  },
  {
    id: 'e3',
    title: 'Workshop: IA nos Negócios',
    date: '25 Out',
    fullDate: '25 Outubro 2024',
    time: '14:00 - 18:00',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    category: 'Palestra',
    organizer: 'Academy Tech',
    location: 'Sala de Treinamento 2',
    description: 'Entenda como a Inteligência Artificial pode otimizar processos na sua empresa. Casos práticos e ferramentas úteis.',
    highlights: ['Prática em Tempo Real', 'Material de Apoio', 'Networking', 'Vagas Limitadas']
  }
];

export const POSTS: Post[] = [
  {
    id: 'p1',
    author: { name: 'Mariana Costa', avatar: 'https://i.pravatar.cc/150?u=1' },
    title: 'Alguém recomenda um contador?',
    excerpt: 'Estou abrindo uma nova empresa e preciso de indicações de contabilidade aqui no prédio.',
    date: '2h atrás',
    likes: 5,
    comments: 3
  },
  {
    id: 'p2',
    author: { name: 'João Silva', avatar: 'https://i.pravatar.cc/150?u=2' },
    title: 'Vendo Cadeira Herman Miller',
    excerpt: 'Motivo: mudança de escritório. Está novíssima.',
    date: '5h atrás',
    likes: 12,
    comments: 8
  },
  {
    id: 'p3',
    author: { name: 'Administração', avatar: 'https://i.pravatar.cc/150?u=99' },
    title: 'Manutenção nos elevadores',
    excerpt: 'Neste sábado teremos manutenção programada nos elevadores sociais.',
    date: '1d atrás',
    likes: 45,
    comments: 0
  }
];

// --- Rich Content for News using Advanced Copywriting techniques ---

const SKYVIEW_CONTENT = `
  <p class="lead">Cansado das mesmas opções de almoço todos os dias? Imagine fechar aquele contrato importante com uma vista panorâmica de tirar o fôlego.</p>

  <h2>Uma Nova Perspectiva para seus Negócios</h2>
  <p>O <strong>SkyView Gastronomia</strong> não é apenas um restaurante; é o novo ponto de encontro da elite empresarial da região. Localizado na cobertura do Centro Empresarial, ele combina alta gastronomia com um ambiente projetado para impressionar.</p>

  <blockquote>
    "Acreditamos que o ambiente influencia diretamente na qualidade das decisões tomadas. O SkyView foi criado para ser o cenário de grandes conquistas." - <em>Chef Henrique Fogaça (Consultor Convidado)</em>
  </blockquote>

  <h3>O Menu: Fusão e Sofisticação</h3>
  <p>Esqueça o trivial. Nossa cozinha aposta na culinária contemporânea com toques regionais. Destaques para:</p>
  <ul>
    <li><strong>Risoto de Cordeiro com Hortelã:</strong> Perfeito para dias frios.</li>
    <li><strong>Peixe Branco em Crosta de Castanhas:</strong> Leveza para quem volta ao trabalho.</li>
    <li><strong>Carta de Vinhos Exclusiva:</strong> Rótulos selecionados para celebrações.</li>
  </ul>

  <h3>Exclusividade para Condôminos</h3>
  <p>Sabemos que seu tempo é precioso. Por isso, empresas instaladas no condomínio possuem:</p>
  <ol>
    <li>Prioridade na lista de espera.</li>
    <li>Desconto de 10% no menu executivo.</li>
    <li>Sala privativa para reuniões de almoço (mediante reserva).</li>
  </ol>

  <div class="callout p-4 bg-brand-50 border-l-4 border-brand-500 rounded my-6">
    <strong>Dica de Ouro:</strong> O Happy Hour às sextas-feiras tem música ao vivo e drinks em dobro das 18h às 20h. O lugar perfeito para o <em>team building</em> da sua equipe.
  </div>

  <p>Não deixe para depois. A experiência que você e seus clientes merecem está a apenas um elevador de distância.</p>
`;

const PARKING_CONTENT = `
  <p class="lead">Você já calculou quanto tempo perde procurando uma vaga ou na fila do guichê de pagamento? Chegou a hora de investir esses minutos no que realmente importa: seu negócio.</p>

  <h2>Tecnologia que Gera Fluidez</h2>
  <p>A reforma do Subsolo G3 vai muito além de tinta nova no chão. Implementamos um ecossistema inteligente de mobilidade focado na experiência do usuário.</p>

  <h3>O que mudou?</h3>
  <ul>
    <li><strong>Sistema LPR (Leitura de Placa):</strong> As cancelas agora abrem automaticamente para veículos cadastrados. Adeus, tickets de papel.</li>
    <li><strong>4 Estações de Carregamento Rápido:</strong> Prepare sua frota para o futuro com nossos pontos de recarga para veículos elétricos e híbridos.</li>
    <li><strong>Sinalização Dinâmica:</strong> Painéis LED indicam em tempo real onde estão as vagas livres, reduzindo o tempo de manobra em até 40%.</li>
  </ul>

  <blockquote>
    "Eficiência operacional começa na chegada ao escritório. Queremos que o condomínio seja um facilitador, não um obstáculo." - <em>Ricardo Mendes, Gerente Predial</em>
  </blockquote>

  <h3>Como Atualizar seu Acesso?</h3>
  <p>Para usufruir do acesso automático, siga o passo a passo:</p>
  <ol>
    <li>Acesse o <strong>Dashboard</strong> do condômino no app.</li>
    <li>Vá em <em>"Meus Veículos"</em> e clique em <em>"Adicionar Novo"</em>.</li>
    <li>Insira a placa e o modelo do carro.</li>
    <li>Aguarde a validação (até 2h úteis).</li>
  </ol>

  <p>Aproveite a nova era da mobilidade no nosso Centro Empresarial.</p>
`;

const HOLIDAY_CONTENT = `
  <p class="lead">Planejamento é a chave para evitar imprevistos. Confira abaixo o guia completo de funcionamento do prédio para o feriado de Finados.</p>

  <h2>Operação em Regime de Plantão</h2>
  <p>No dia <strong>02 de Novembro (Feriado Nacional)</strong>, o Centro Empresarial operará com foco em segurança e manutenção preventiva. O acesso será restrito para garantir a proteção do patrimônio de todos.</p>

  <h3>Quadro de Horários</h3>
  <ul>
    <li><strong>Portaria Principal:</strong> 24h (Acesso controlado via biometria).</li>
    <li><strong>Recepção de Visitantes:</strong> Fechada.</li>
    <li><strong>Estacionamento Rotativo:</strong> Fechado (Apenas mensalistas com tag ativa).</li>
    <li><strong>Praça de Alimentação:</strong> Fechada (Reabertura normal no dia seguinte).</li>
  </ul>

  <div class="callout p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded my-6">
    <strong>Atenção:</strong> Serviços de delivery não terão acesso aos andares. A retirada deve ser feita na portaria térrea pelo solicitante.
  </div>

  <h3>Emergências</h3>
  <p>Nossa equipe de segurança e brigada de incêndio estará com efetivo reforçado.</p>
  <ul>
    <li><strong>Central de Segurança (24h):</strong> Ramal 9090</li>
    <li><strong>Manutenção Predial (Plantão):</strong> (11) 99999-1234</li>
  </ul>

  <p>Desejamos a todos um bom feriado e um excelente descanso.</p>
`;

const ORGANIC_CONTENT = `
  <p class="lead">Saúde não é apenas sobre não ficar doente; é sobre a energia que você traz para o trabalho todos os dias. E tudo começa pela alimentação.</p>

  <h2>Do Campo para a sua Mesa (no Escritório)</h2>
  <p>Temos o orgulho de anunciar que nossa tradicional Feira de Orgânicos está de cara nova. Atendendo a pedidos, dobramos o número de expositores e mudamos a frequência para <strong>toda quinta-feira</strong>.</p>

  <h3>Por que consumir orgânicos?</h3>
  <ul>
    <li><strong>Sabor Real:</strong> Alimentos livres de agrotóxicos preservam seu sabor original e nutrientes.</li>
    <li><strong>Economia Local:</strong> Você compra diretamente de famílias produtoras da região, sem intermediários.</li>
    <li><strong>Sustentabilidade:</strong> Menor impacto ambiental na produção e transporte.</li>
  </ul>

  <blockquote>
    "Não é apenas uma feira, é um ato político e de autocuidado. Saber a origem do que você come muda sua relação com a comida." - <em>Ana Souza, Comitê de Sustentabilidade</em>
  </blockquote>

  <h3>Novidades desta Edição</h3>
  <p>Além das frutas e verduras da estação, agora você encontra:</p>
  <ol>
    <li><strong>Queijos Artesanais:</strong> Produtores premiados da Serra da Canastra.</li>
    <li><strong>Mel Silvestre:</strong> Puro e com propriedades medicinais.</li>
    <li><strong>Pães de Fermentação Natural:</strong> Feitos no dia, perfeitos para o lanche da tarde.</li>
  </ol>

  <div class="callout p-4 bg-green-50 border-l-4 border-green-500 rounded my-6">
    <strong>Local:</strong> Pátio Central (Térreo), próximo à fonte.<br/>
    <strong>Horário:</strong> Das 10h às 15h (Para pegar o horário de almoço).
  </div>

  <p>Traga sua sacola retornável e venha fazer parte desse movimento por uma vida mais saudável.</p>
`;

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'SkyView: A Nova Experiência Gastronômica no Terraço',
    summary: 'Descubra como o novo restaurante SkyView está redefinindo o conceito de almoços de negócios com alta gastronomia e uma vista panorâmica exclusiva.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    date: '12 Out 2024',
    category: 'Gastronomia',
    author: {
      name: 'Camila Rocha',
      role: 'Editora de Lifestyle',
      avatar: 'https://i.pravatar.cc/150?u=30'
    },
    readTime: '4 min leitura',
    tags: ['Restaurante', 'Networking', 'Novidade', 'Executivo'],
    content: SKYVIEW_CONTENT
  },
  {
    id: 'n2',
    title: 'Estacionamento Inteligente: Mais 50 Vagas Disponíveis',
    summary: 'A reforma do estacionamento foi concluída com sucesso. Conheça o novo sistema de pagamento automático e as vagas exclusivas para veículos elétricos.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    date: '10 Out 2024',
    category: 'Infraestrutura',
    author: {
      name: 'Ricardo Mendes',
      role: 'Gerente Predial',
      avatar: 'https://i.pravatar.cc/150?u=31'
    },
    readTime: '3 min leitura',
    tags: ['Estacionamento', 'Tecnologia', 'Mobilidade'],
    content: PARKING_CONTENT
  },
  {
    id: 'n3',
    title: 'Funcionamento Especial: Feriado de Finados',
    summary: 'Confira as alterações no acesso, horários da portaria e funcionamento das lojas de conveniência durante o feriado nacional.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    date: '08 Out 2024',
    category: 'Comunicados',
    author: {
      name: 'Administração',
      role: 'Gestão',
      avatar: 'https://i.pravatar.cc/150?u=99'
    },
    readTime: '1 min leitura',
    tags: ['Feriado', 'Horários', 'Acesso'],
    content: HOLIDAY_CONTENT
  },
  {
    id: 'n4',
    title: 'Feira de Orgânicos: Agora toda Quinta-feira',
    summary: 'Apoiando produtores locais e trazendo saúde para sua mesa. Frutas, verduras e produtos artesanais no pátio central.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    date: '05 Out 2024',
    category: 'Bem-estar',
    author: {
      name: 'Ana Souza',
      role: 'Comitê de Sustentabilidade',
      avatar: 'https://i.pravatar.cc/150?u=33'
    },
    readTime: '2 min leitura',
    tags: ['Saúde', 'Sustentabilidade', 'Evento'],
    content: ORGANIC_CONTENT
  }
];

export const CATEGORIES = [
  { name: 'Advocacia', icon: 'scale' },
  { name: 'Armarinhos', icon: 'shopping-bag' },
  { name: 'Artesanatos', icon: 'palette' },
  { name: 'Clínicas', icon: 'heart-pulse' },
  { name: 'Contabilidade', icon: 'calculator' },
  { name: 'Diversos', icon: 'more-horizontal' },
  { name: 'Imobiliárias', icon: 'home' },
  { name: 'Lanchonetes', icon: 'coffee' },
  { name: 'Odontologia', icon: 'smile' },
  { name: 'Outros', icon: 'box' },
  { name: 'Tecidos & Confecções', icon: 'scissors' }
];