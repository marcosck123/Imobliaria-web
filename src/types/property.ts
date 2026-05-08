export enum PropertyType {
  CASA = 'Casa',
  APARTAMENTO = 'Apartamento',
  TERRENO = 'Terreno',
  COMERCIAL = 'Comercial',
}

export enum PropertyStatus {
  VENDA = 'Venda',
  ALUGUEL = 'Aluguel',
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
}

export interface Property {
  id: string
  slug: string
  title: string
  description: string
  type: PropertyType
  status: PropertyStatus
  price: number
  condominioPrice?: number
  iptuPrice?: number
  area: number
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  city: string
  neighborhood: string
  address: string
  state: string
  zipCode: string
  images: PropertyImage[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface PropertyFilters {
  type?: PropertyType | ''
  status?: PropertyStatus | ''
  city?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
