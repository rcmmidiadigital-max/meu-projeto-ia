import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, Outlet, useNavigate, useParams } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { 
  LayoutDashboard, Store, Key, Calendar, Newspaper, FileText, 
  Settings, LogOut, Plus, Search, Edit, Trash2, Save, Upload,
  MoreVertical, CheckCircle, XCircle, ChevronDown, Menu, X,
  ArrowLeft, Image as ImageIcon, DollarSign, Tag, Globe, Mail, Phone, MapPin, 
  Wifi, Car, Coffee, Accessibility, Clock, Check, Trophy, Medal, Award,
  MessageSquare, Star, Zap, ZoomIn, Crop, AlertCircle
} from 'lucide-react';
import { Button, Badge } from '../components/Shared';
import { LISTINGS, RENTALS, EVENTS, NEWS, CATEGORIES } from '../constants';
import { useTenant } from '../components/Layout';
import { Listing, FeaturedItem, Review } from '../types';

// --- ADMIN LAYOUT ---

export const AdminLayout: React.FC = () => {
  const { tenant } = useTenant();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin/dashboard' },
    { icon: FileText, label: 'Páginas (Home/Sobre)', path: '/admin/paginas' },
    { icon: Store, label: 'Lojas & Destaques', path: '/admin/lojas' },
    { icon: Key, label: 'Locação & Vagas', path: '/admin/locacao' },
    { icon: Calendar, label: 'Eventos', path: '/admin/eventos' },
    { icon: Newspaper, label: 'Novidades & Avisos', path: '/admin/novidades' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
           <div className="font-bold text-lg tracking-wide">ADMIN PORTAL</div>
        </div>

        <nav className="flex-1 py-6 space-y-1 px-3">
           {menuItems.map(item => (
             <Link 
               key={item.path} 
               to={item.path}
               className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                 isActive(item.path) 
                   ? 'bg-brand-600 text-white' 
                   : 'text-gray-400 hover:text-white hover:bg-gray-800'
               }`}
             >
               <item.icon size={18} />
               {item.label}
             </Link>
           ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
           <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold">A</div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Gestor Predial</p>
              </div>
           </div>
           <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm px-2">
             <LogOut size={16} /> Sair do Painel
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
           <div className="flex items-center gap-3">
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600">
               {mobileMenuOpen ? <X /> : <Menu />}
             </button>
             <h1 className="text-xl font-bold text-gray-800">
               {menuItems.find(i => isActive(i.path))?.label || 'Painel Administrativo'}
             </h1>
           </div>
           <div className="flex items-center gap-4">
              <Button size="sm" variant="outline" className="hidden sm:flex">Ver Site</Button>
           </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 text-white absolute top-16 left-0 w-full z-30 border-t border-gray-800">
            <nav className="py-2">
              {menuItems.map(item => (
                 <Link 
                   key={item.path} 
                   to={item.path}
                   onClick={() => setMobileMenuOpen(false)}
                   className={`block px-4 py-3 text-sm font-medium ${isActive(item.path) ? 'bg-gray-800 text-brand-400' : 'text-gray-300'}`}
                 >
                   {item.label}
                 </Link>
              ))}
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

// --- COMPONENTS FOR ADMIN UI ---

interface AdminHeaderProps {
  title: string;
  action?: React.ReactNode;
  backLink?: string;
}

const AdminHeader = ({ title, action, backLink }: AdminHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div className="flex items-center gap-4">
      {backLink && (
        <Link to={backLink} className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-500">
          <ArrowLeft size={20} />
        </Link>
      )}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    {action}
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, trend, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
         <Icon size={24} className={color.replace('bg-', 'text-').replace('100', '600')} />
      </div>
      {trend && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <p className="text-sm text-gray-500 font-medium">{title}</p>
    <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
  </div>
);

interface TableProps {
  headers: string[];
  children?: React.ReactNode;
}

const Table = ({ headers, children }: TableProps) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  </div>
);

interface ActionButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  color?: string;
}

const ActionButton = ({ icon: Icon, onClick, color = 'text-gray-500 hover:text-gray-700' }: ActionButtonProps) => (
  <button onClick={onClick} className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${color}`}>
    <Icon size={16} />
  </button>
);

// --- IMAGE UPLOAD & CROPPER ---

// Helper to create the cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  // set canvas size to match the bounding box
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // draw image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg');
};

interface ImageUploadProps {
  url: string;
  onChange: (url: string) => void;
  label: string;
  aspectRatio?: number; // e.g., 1, 16/9, 4/3
  recommendedText?: string;
}

const ImageUpload = ({ url, onChange, label, aspectRatio = 1, recommendedText }: ImageUploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Random ID for input
  const inputId = `upload-${label ? label.replace(/\s+/g, '-').toLowerCase() : Math.random().toString(36).substr(2, 9)}`;

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
      setIsModalOpen(true);
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onChange(croppedImage);
        setIsModalOpen(false);
        setImageSrc(null); // Cleanup
      }
    } catch (e) {
      console.error(e);
    }
  };

  const cancelCrop = () => {
    setIsModalOpen(false);
    setImageSrc(null);
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
        <div className="w-20 h-20 rounded-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
          {url ? (
            <img src={url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={24} className="text-gray-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
           <input 
             type="file" 
             id={inputId} 
             accept="image/*"
             className="hidden" 
             onChange={onFileChange}
           />
           <div className="flex flex-wrap gap-2">
             <Button 
               variant="outline" 
               size="sm" 
               onClick={() => document.getElementById(inputId)?.click()} 
               className="w-full sm:w-auto bg-white"
             >
               <Upload size={14} className="mr-2" /> {url ? 'Alterar Imagem' : 'Enviar Imagem'}
             </Button>
           </div>
           
           <div className="flex items-start gap-2 text-[11px] text-gray-500 bg-blue-50/50 p-2 rounded">
             <AlertCircle size={14} className="flex-shrink-0 text-blue-400 mt-0.5" />
             <div>
                <p>Formatos: JPG, PNG, WEBP. Max 5MB.</p>
                {recommendedText && <p className="font-semibold text-blue-700 mt-0.5">{recommendedText}</p>}
                {!recommendedText && <p className="font-semibold text-blue-700 mt-0.5">Proporção: {aspectRatio === 1 ? 'Quadrada (1:1)' : aspectRatio === 16/9 ? 'Widescreen (16:9)' : 'Livre'}</p>}
             </div>
           </div>
        </div>
      </div>

      {/* CROPPER MODAL */}
      {isModalOpen && imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col h-[80vh] sm:h-[600px] shadow-2xl">
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Crop size={18} /> Ajustar e Cortar Imagem
                </h3>
                <button onClick={cancelCrop} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
             </div>
             
             <div className="relative flex-1 bg-gray-900 overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true}
                />
             </div>

             <div className="p-4 bg-white border-t border-gray-100 space-y-4 z-10">
                <div className="flex items-center gap-4 px-2">
                   <ZoomIn size={16} className="text-gray-400" />
                   <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>
                <div className="flex justify-end gap-3">
                   <Button variant="outline" onClick={cancelCrop}>Cancelar</Button>
                   <Button onClick={showCroppedImage} className="gap-2"><Check size={16} /> Confirmar Corte</Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PAGES ---

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
       <AdminHeader title="Visão Geral do Condomínio" />
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Lojas Ativas" value="42" trend="+2 este mês" icon={Store} color="bg-blue-100" />
          <StatCard title="Unidades Locadas" value="87%" trend="+5%" icon={Key} color="bg-green-100" />
          <StatCard title="Eventos (Out)" value="12" icon={Calendar} color="bg-purple-100" />
          <StatCard title="Solicitações" value="5" trend="Pendente" icon={FileText} color="bg-orange-100" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-gray-800 mb-4">Atividades Recentes</h3>
             <ul className="space-y-4">
                {[1,2,3,4].map(i => (
                  <li key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-500 w-24">10:4{i} AM</span>
                    <span className="text-gray-900 font-medium">Nova reserva de sala de reunião (Sala 404)</span>
                  </li>
                ))}
             </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-gray-800 mb-4">Avisos Rápidos</h3>
             <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg mb-4">
                <p className="text-sm text-yellow-800 font-bold mb-1">Manutenção Programada</p>
                <p className="text-xs text-yellow-700">Elevadores sociais bloco B parados dia 25/10 das 14h às 16h.</p>
             </div>
             <Button size="sm" variant="outline" className="w-full">Criar Novo Aviso</Button>
          </div>
       </div>
    </div>
  );
};

export const AdminPages: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
       <AdminHeader title="Gestão de Páginas" action={<Button>Visualizar Site</Button>} />

       {/* Home Page Config */}
       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
             <h3 className="font-bold text-lg text-gray-900">Página Inicial (Home)</h3>
             <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-bold">Publicado</span>
          </div>
          
          <form className="space-y-6">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal (Hero)</label>
                <input type="text" defaultValue="Explore o Centro Empresarial" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                <textarea rows={2} defaultValue="Encontre lojas, serviços, profissionais e salas comerciais disponíveis." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white" />
             </div>
             <div>
                <ImageUpload 
                  label="Imagem de Fundo (Hero)" 
                  url="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" 
                  onChange={() => {}} 
                  aspectRatio={16/5}
                  recommendedText="Recomendado: 1920x600px (16:5)"
                />
             </div>
             <div className="flex justify-end pt-4">
                <Button>Salvar Alterações</Button>
             </div>
          </form>
       </div>

       {/* About Page Config */}
       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
             <h3 className="font-bold text-lg text-gray-900">Quem Somos</h3>
          </div>
          <form className="space-y-6">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texto Institucional</label>
                <textarea rows={6} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white" defaultValue="Fundado há mais de duas décadas..." />
             </div>
             <div className="flex justify-end pt-4">
                <Button>Salvar Alterações</Button>
             </div>
          </form>
       </div>
    </div>
  );
};

export const AdminListings: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
       <AdminHeader 
         title="Gestão de Lojas e Empresas" 
         action={<Button className="gap-2"><Plus size={16} /> Nova Loja</Button>} 
       />

       {/* Filters */}
       <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
             <input type="text" placeholder="Buscar empresa..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white" />
          </div>
          <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 outline-none">
             <option>Todas Categorias</option>
             {CATEGORIES.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
             ))}
          </select>
       </div>

       <Table headers={['Empresa', 'Categoria', 'Localização', 'Destaque', 'Status', 'Ações']}>
          {LISTINGS.map(l => (
            <tr key={l.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                 <div className="flex items-center gap-3">
                    <img src={l.logo || l.image} className="w-8 h-8 rounded object-cover bg-gray-100" alt="" />
                    <span className="font-medium text-gray-900">{l.name}</span>
                 </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{l.category}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{l.location}</td>
              <td className="px-6 py-4 text-center">
                 {l.isVerified && (
                  <button className="text-yellow-400 hover:text-yellow-500 transition-colors">
                      <CheckCircle size={18} className="fill-current" />
                  </button>
                 )}
              </td>
              <td className="px-6 py-4">
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                   Ativo
                 </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                 <ActionButton icon={Edit} color="text-blue-500 hover:bg-blue-50" onClick={() => navigate(`/admin/lojas/${l.id}`)} />
                 <ActionButton icon={Trash2} color="text-red-500 hover:bg-red-50" />
              </td>
            </tr>
          ))}
       </Table>
    </div>
  );
};

const AVAILABLE_AMENITIES = [
  'Wi-Fi Gratuito', 'Estacionamento', 'Café & Água', 
  'Acessibilidade', 'Atendimento 24h', 'Ambiente Climatizado',
  'Pet Friendly', 'Área Kids', 'Sala de Reunião'
];

const AVAILABLE_AWARDS = [
  'Excelência 2024', 'Top Quality', 'Verificado', 
  'Melhor Atendimento', 'Sustentabilidade', 'Inovação'
];

export const AdminListingEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Listing | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'products' | 'gallery' | 'reviews'>('general');

  // Load data simulation
  useEffect(() => {
    const found = LISTINGS.find(l => l.id === id);
    if (found) {
      setFormData(found);
    }
  }, [id]);

  if (!formData) return <div className="p-8">Carregando...</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  const handleFeaturedItemChange = (index: number, field: string, value: any) => {
    if (!formData.featuredItems) return;
    const newItems = [...formData.featuredItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => prev ? ({ ...prev, featuredItems: newItems }) : null);
  };

  const handleAddFeaturedItem = () => {
    const newItem: FeaturedItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Novo Item',
      price: 0,
      image: 'https://via.placeholder.com/150',
      type: 'product',
      isHighlighted: false
    };
    setFormData(prev => prev ? ({ ...prev, featuredItems: [...(prev.featuredItems || []), newItem] }) : null);
  };

  const handleRemoveFeaturedItem = (index: number) => {
    if (!formData.featuredItems) return;
    const newItems = formData.featuredItems.filter((_, i) => i !== index);
    setFormData(prev => prev ? ({ ...prev, featuredItems: newItems }) : null);
  };

  const toggleArrayItem = (field: 'amenities' | 'awards', item: string) => {
     if (!formData) return;
     const currentList = formData[field] || [];
     const newList = currentList.includes(item) 
        ? currentList.filter(i => i !== item) 
        : [...currentList, item];
     setFormData({ ...formData, [field]: newList });
  };

  const handleAddGalleryImage = () => {
    // Mock
    const newImg = `https://picsum.photos/seed/${Math.random()}/800/600`;
    setFormData(prev => prev ? ({...prev, gallery: [...(prev.gallery || []), newImg]}) : null);
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setFormData(prev => prev ? ({...prev, gallery: prev.gallery?.filter((_, i) => i !== idx)}) : null);
  };

  const handleReviewAction = (reviewId: string, action: 'approved' | 'rejected') => {
     if (!formData?.reviews) return;
     const newReviews = formData.reviews.map(r => r.id === reviewId ? { ...r, status: action } : r);
     setFormData({ ...formData, reviews: newReviews });
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    navigate('/admin/lojas');
  };

  const highlightedCount = formData.featuredItems?.filter(i => i.isHighlighted).length || 0;

  return (
    <div className="max-w-6xl space-y-6 animate-in fade-in duration-300 pb-20">
      <AdminHeader 
        title={`Editar: ${formData.name}`} 
        backLink="/admin/lojas"
        action={
          <div className="flex gap-3">
             <Button variant="outline" onClick={() => navigate('/admin/lojas')}>Cancelar</Button>
             <Button onClick={handleSave} className="gap-2"><Save size={16} /> Salvar Alterações</Button>
          </div>
        } 
      />

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'general' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Informações Gerais
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'products' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Produtos & Destaques
        </button>
        <button 
          onClick={() => setActiveTab('gallery')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'gallery' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Galeria de Fotos
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reviews' ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Avaliações
        </button>
      </div>

      {/* --- TAB: GENERAL --- */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Store size={18} className="text-gray-400" /> Dados Principais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Categoria</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Descrição Completa</label>
                  <textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle size={18} className="text-gray-400" /> Comodidades
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {AVAILABLE_AMENITIES.map(item => (
                   <button key={item} onClick={() => toggleArrayItem('amenities', item)} className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all ${formData.amenities?.includes(item) ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.amenities?.includes(item) ? 'border-brand-500 bg-brand-500' : 'border-gray-300'}`}>
                         {formData.amenities?.includes(item) && <Check size={10} className="text-white" />}
                      </div>
                      {item}
                   </button>
                 ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy size={18} className="text-gray-400" /> Reconhecimentos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {AVAILABLE_AWARDS.map(item => (
                   <button key={item} onClick={() => toggleArrayItem('awards', item)} className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all ${formData.awards?.includes(item) ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}>
                      <Medal size={16} className={formData.awards?.includes(item) ? 'text-yellow-500' : 'text-gray-400'} />
                      {item}
                   </button>
                 ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <ImageIcon size={18} className="text-gray-400" /> Mídia
                </h3>
                <div className="space-y-6">
                   <ImageUpload 
                     label="Logo da Empresa" 
                     url={formData.logo || formData.image} 
                     onChange={(url) => setFormData({...formData, logo: url})} 
                     aspectRatio={1}
                     recommendedText="Recomendado: 400x400px (1:1)"
                   />
                   <ImageUpload 
                     label="Imagem de Capa" 
                     url={formData.image} 
                     onChange={(url) => setFormData({...formData, image: url})} 
                     aspectRatio={16/9}
                     recommendedText="Recomendado: 1200x675px (16:9)"
                   />
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <Phone size={18} className="text-gray-400" /> Contato
                </h3>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Telefone</label>
                      <input type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none bg-white" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Website</label>
                      <input type="text" name="website" value={formData.website || ''} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none bg-white" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                      <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none bg-white" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Endereço</label>
                      <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none bg-white" />
                   </div>
                </div>
             </div>
             
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Settings size={18} className="text-gray-400" /> Configurações
               </h3>
               <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={formData.isVerified} onChange={(e) => setFormData({...formData, isVerified: e.target.checked})} className="w-4 h-4 text-brand-600 rounded" />
                  <span className="text-sm font-medium text-gray-700">Selo Verificado</span>
               </label>
             </div>
          </div>
        </div>
      )}

      {/* --- TAB: PRODUCTS & HIGHLIGHTS --- */}
      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
           <div className="flex justify-between items-center mb-6">
             <div>
               <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Tag size={18} className="text-gray-400" /> Produtos e Serviços
               </h3>
               <p className="text-sm text-gray-500 mt-1">Gerencie seu catálogo. Marque até 3 itens como destaque principal.</p>
             </div>
             <Button size="sm" variant="outline" onClick={handleAddFeaturedItem} className="gap-2">
               <Plus size={14} /> Adicionar Item
             </Button>
           </div>
           
           <div className="mb-4 flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <Zap size={16} />
              <span>Destaques selecionados: <strong>{highlightedCount}/3</strong></span>
           </div>

           <div className="space-y-4">
              {formData.featuredItems?.map((item, index) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50 items-start">
                   {/* Image Upload for Item - INCREASED WIDTH */}
                   <div className="w-full sm:w-56 flex-shrink-0">
                      <ImageUpload 
                        label="" 
                        url={item.image} 
                        onChange={(url) => handleFeaturedItemChange(index, 'image', url)} 
                        aspectRatio={1}
                        recommendedText="800x800px (1:1)"
                      />
                   </div>
                   
                   <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Nome</label>
                        <input type="text" value={item.name} onChange={(e) => handleFeaturedItemChange(index, 'name', e.target.value)} className="w-full px-3 py-1.5 rounded border border-gray-300 text-sm bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Preço (R$)</label>
                        <input type="number" value={item.price} onChange={(e) => handleFeaturedItemChange(index, 'price', parseFloat(e.target.value))} className="w-full px-3 py-1.5 rounded border border-gray-300 text-sm bg-white" />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                         <label className="flex items-center gap-2 cursor-pointer mt-2 select-none">
                            <input 
                              type="checkbox" 
                              checked={item.isHighlighted} 
                              onChange={(e) => handleFeaturedItemChange(index, 'isHighlighted', e.target.checked)} 
                              className="w-4 h-4 text-brand-600 rounded"
                            />
                            <span className={`text-sm font-medium ${item.isHighlighted ? 'text-brand-600' : 'text-gray-600'}`}>
                               Exibir como Destaque na Loja {item.isHighlighted && <span className="text-xs bg-brand-100 text-brand-700 px-1 rounded ml-1">ATIVO</span>}
                            </span>
                         </label>
                      </div>
                   </div>

                   <button onClick={() => handleRemoveFeaturedItem(index)} className="text-gray-400 hover:text-red-500 p-2 transition-colors self-start sm:self-center">
                     <Trash2 size={16} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* --- TAB: GALLERY --- */}
      {activeTab === 'gallery' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
               <ImageIcon size={18} className="text-gray-400" /> Galeria de Fotos
             </h3>
             <Button size="sm" onClick={handleAddGalleryImage} className="gap-2">
               <Plus size={14} /> Adicionar Foto
             </Button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.gallery?.map((img, idx) => (
                <div key={idx} className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                   <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => handleRemoveGalleryImage(idx)} className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50">
                        <Trash2 size={20} />
                      </button>
                   </div>
                </div>
              ))}
              {(!formData.gallery || formData.gallery.length === 0) && (
                 <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    Nenhuma foto na galeria.
                 </div>
              )}
           </div>
        </div>
      )}

      {/* --- TAB: REVIEWS --- */}
      {activeTab === 'reviews' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
           <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
             <MessageSquare size={18} className="text-gray-400" /> Gerenciar Avaliações
           </h3>
           
           <div className="space-y-4">
              {formData.reviews?.map((review) => (
                 <div key={review.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{review.userName}</span>
                          <div className="flex text-yellow-400">
                             {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= review.rating ? "fill-current" : "text-gray-300"} />)}
                          </div>
                       </div>
                       <Badge color={review.status === 'approved' ? 'green' : review.status === 'rejected' ? 'gray' : 'blue'}>
                          {review.status === 'approved' ? 'Aprovado' : review.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                       </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 bg-white p-3 rounded border border-gray-100 italic">"{review.comment}"</p>
                    
                    {review.status === 'pending' && (
                       <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleReviewAction(review.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white border-transparent">
                             Aprovar
                          </Button>
                          <Button size="sm" onClick={() => handleReviewAction(review.id, 'rejected')} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                             Rejeitar
                          </Button>
                       </div>
                    )}
                    {review.status !== 'pending' && (
                       <div className="text-xs text-gray-400">
                          Processado em {new Date().toLocaleDateString()}
                       </div>
                    )}
                 </div>
              ))}
              
              {(!formData.reviews || formData.reviews.length === 0) && (
                 <div className="text-center py-12 text-gray-400">
                    Nenhuma avaliação recebida ainda.
                 </div>
              )}
           </div>
        </div>
      )}

    </div>
  );
};

export const AdminRentals: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
       <AdminHeader 
         title="Gestão de Locação" 
         action={<Button className="gap-2"><Plus size={16} /> Novo Imóvel</Button>} 
       />
       
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
             <span className="block text-2xl font-bold text-gray-900">12</span>
             <span className="text-xs text-gray-500 uppercase">Salas Vagas</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
             <span className="block text-2xl font-bold text-gray-900">3</span>
             <span className="text-xs text-gray-500 uppercase">Lojas Vagas</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
             <span className="block text-2xl font-bold text-gray-900">45</span>
             <span className="text-xs text-gray-500 uppercase">Vagas Garagem</span>
          </div>
       </div>

       <Table headers={['Imóvel', 'Tipo', 'Área', 'Valor', 'Status', 'Ações']}>
          {RENTALS.map(r => (
            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
               <td className="px-6 py-4">
                 <div className="font-medium text-gray-900">{r.title}</div>
                 <div className="text-xs text-gray-400">ID: {r.id.toUpperCase()}</div>
               </td>
               <td className="px-6 py-4 text-sm text-gray-600">{r.type}</td>
               <td className="px-6 py-4 text-sm text-gray-600">{r.area} m²</td>
               <td className="px-6 py-4 text-sm font-bold text-gray-900">R$ {r.price.toLocaleString('pt-BR')}</td>
               <td className="px-6 py-4">
                  {r.status === 'available' ? (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Disponível</span>
                  ) : (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Reservado</span>
                  )}
               </td>
               <td className="px-6 py-4 flex gap-2">
                 <ActionButton icon={Edit} color="text-blue-500 hover:bg-blue-50" />
                 <ActionButton icon={Trash2} color="text-red-500 hover:bg-red-50" />
              </td>
            </tr>
          ))}
       </Table>
    </div>
  );
};

export const AdminEvents: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
       <AdminHeader 
         title="Gestão de Eventos" 
         action={<Button className="gap-2"><Plus size={16} /> Novo Evento</Button>} 
       />

       <Table headers={['Evento', 'Data', 'Categoria', 'Local', 'Ações']}>
          {EVENTS.map(e => (
             <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                   <div className="flex items-center gap-3">
                      <img src={e.image} className="w-10 h-10 rounded object-cover" alt="" />
                      <span className="font-medium text-gray-900">{e.title}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.fullDate || e.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.location}</td>
                <td className="px-6 py-4 flex gap-2">
                   <ActionButton icon={Edit} color="text-blue-500 hover:bg-blue-50" />
                   <ActionButton icon={Trash2} color="text-red-500 hover:bg-red-50" />
                </td>
             </tr>
          ))}
       </Table>
    </div>
  );
};

export const AdminNews: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
       <AdminHeader 
         title="Novidades e Avisos" 
         action={<Button className="gap-2"><Plus size={16} /> Nova Publicação</Button>} 
       />

       <Table headers={['Título', 'Data', 'Categoria', 'Autor', 'Ações']}>
          {NEWS.map(n => (
             <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                   <div className="max-w-xs truncate font-medium text-gray-900">{n.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{n.date}</td>
                <td className="px-6 py-4">
                   <Badge color="gray">{n.category}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{n.author?.name}</td>
                <td className="px-6 py-4 flex gap-2">
                   <ActionButton icon={Edit} color="text-blue-500 hover:bg-blue-50" />
                   <ActionButton icon={Trash2} color="text-red-500 hover:bg-red-50" />
                </td>
             </tr>
          ))}
       </Table>
    </div>
  );
};
