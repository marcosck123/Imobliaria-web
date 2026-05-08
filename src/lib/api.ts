import { Property, PropertyFilters, PaginatedResponse } from '@/types/property'
import { mockProperties, featuredProperties } from '@/lib/mock-data'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }
  return res.json()
}

export async function getProperties(
  filters?: PropertyFilters
): Promise<PaginatedResponse<Property>> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(key, String(value))
        }
      })
    }
    return await fetchAPI<PaginatedResponse<Property>>(`/properties?${params}`)
  } catch {
    let filtered = [...mockProperties]
    if (filters?.type) filtered = filtered.filter((p) => p.type === filters.type)
    if (filters?.status) filtered = filtered.filter((p) => p.status === filters.status)
    if (filters?.city) filtered = filtered.filter((p) => p.city.toLowerCase().includes(filters.city!.toLowerCase()))
    if (filters?.minPrice) filtered = filtered.filter((p) => p.price >= filters.minPrice!)
    if (filters?.maxPrice) filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
    if (filters?.bedrooms) filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!)
    const page = filters?.page || 1
    const limit = filters?.limit || 9
    const start = (page - 1) * limit
    return {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    }
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    return await fetchAPI<Property>(`/properties/${slug}`)
  } catch {
    return mockProperties.find((p) => p.slug === slug) || null
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    return await fetchAPI<Property[]>('/properties/featured')
  } catch {
    return featuredProperties
  }
}
