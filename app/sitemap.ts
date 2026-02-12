import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hazemalmelli.vercel.app'
  const lastModified = new Date()
  
  return [
    // Homepage (Hero Section)
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // About Section
    {
      url: `${baseUrl}/#about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // Experience Section
    {
      url: `${baseUrl}/#experience`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Projects Section
    {
      url: `${baseUrl}/#projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    
    // Certificates Section
    {
      url: `${baseUrl}/#certificates`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Contact Section
    {
      url: `${baseUrl}/#contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]
}
