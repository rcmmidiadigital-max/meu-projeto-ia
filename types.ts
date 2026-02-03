
export interface Tenant {
  id: string;
  name: string;
  logo: string; // URL or text representation
  primaryColor: string; // Hex code
  secondaryColor: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  reply?: string;
}

export interface FeaturedItem {
  id: string;
  name: string;
  image: string;
  price: number;
  unit?: string; // e.g., "unidade", "hora", "sessão"
  rating?: number;
  reviewCount?: number;
  description?: string;
  type: 'product' | 'service';
  isHighlighted?: boolean; // New: Controls if it appears on main store page highlights
}

export interface Listing {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  logo?: string;
  featuredItems?: FeaturedItem[];
  tags: string[];
  isVerified: boolean;
  rating?: number;
  reviewCount?: number;
  location?: string;
  phone?: string;
  
  // New fields
  email?: string;
  website?: string;
  amenities?: string[];
  awards?: string[];
  gallery?: string[]; // New: Photo Gallery
  reviews?: Review[]; // New: Review Management
}

export interface Rental {
  id: string;
  title: string;
  type: 'Sala' | 'Loja' | 'Quiosque' | 'Andar Corporativo' | 'Vaga de Garagem' | 'Auditório';
  area: number; // Area total
  price: number; // monthly
  image: string; // Main image (fallback)
  images?: string[]; // Gallery images
  features: string[];
  status: 'available' | 'reserved';
  
  // New detailed fields
  description?: string;
  usefulArea?: number; // Area útil
  bathrooms?: number;
  parkingSpaces?: number;
  rooms?: number; // Quartos ou Salas
  suites?: number;
  age?: number; // Idade do imóvel (anos)
}

export interface Event {
  id: string;
  title: string;
  date: string; // Display date e.g. "15 Out"
  fullDate?: string; // e.g. "15 Outubro 2024"
  time?: string; // e.g. "08:00 - 17:00"
  image: string;
  category: string;
  description?: string;
  organizer?: string;
  location?: string;
  highlights?: string[];
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  likes: number;
  comments: number;
}

export interface NewsAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string; // Used for meta description and cards
  image: string;
  date: string;
  
  // Blog specific fields
  category?: string;
  content?: string; // HTML content
  author?: NewsAuthor;
  readTime?: string; // e.g. "5 min leitura"
  tags?: string[];
  slug?: string; // SEO friendly URL part (mocked via ID for now)
}