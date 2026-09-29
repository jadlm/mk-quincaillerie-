import categories from '../data/categories.json'
import { contact, location } from '../config/contact.js'

export function categoryFor(slug) {
  return categories.find((category) => category.slug === slug)
}

export function searchProducts(products, query) {
  const normalized = query.trim().toLocaleLowerCase('fr')
  if (!normalized) return products

  return products.filter((product) => {
    const category = categoryFor(product.category)?.name ?? ''
    return [product.name, product.reference, product.brand, product.description, category]
      .filter(Boolean)
      .some((value) => value.toLocaleLowerCase('fr').includes(normalized))
  })
}

export function filterProducts(products, { query = '', category = '', sort = 'featured' } = {}) {
  const filtered = searchProducts(products, query)
    .filter((product) => !category || product.category === category)

  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  if (sort === 'featured') filtered.sort((a, b) => Number(b.featured) - Number(a.featured))
  return filtered
}

export function buildWhatsAppUrl(message) {
  const number = contact.whatsapp.replace(/\D/g, '')
  if (!number) return ''
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function buildQuoteMessage(values) {
  return [
    'Bonjour MK Quincaillerie,',
    '',
    'Je souhaite demander un devis.',
    `Nom : ${values.name}`,
    `Téléphone : ${values.phone}`,
    `Email : ${values.email || 'Non renseigné'}`,
    `Entreprise : ${values.company || 'Non renseignée'}`,
    `Type de demande : ${values.type || 'Demande de produit'}`,
    `Produit : ${values.product || 'À préciser'}`,
    `Quantité : ${values.quantity || 'À préciser'}`,
    `Message : ${values.message || 'Aucun message complémentaire'}`,
    '',
    'Merci.',
  ].join('\n')
}

export function googleMapsUrl() {
  const { latitude, longitude, address, city } = location
  if (latitude != null && longitude != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}`)}`
}