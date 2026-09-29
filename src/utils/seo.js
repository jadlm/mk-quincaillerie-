import { useEffect } from 'react'
import store from '../data/store.json'

export function useSeo(title, description, schema) {
  useEffect(() => {
    const fullTitle = `${title} | MK Quincaillerie`
    document.title = fullTitle
    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')

    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'HardwareStore',
      name: store.name,
      description: store.description,
      telephone: store.phone || undefined,
      email: store.email || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: store.address,
        addressLocality: store.city,
        addressCountry: store.country,
      },
    }
    const script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema ?? localBusiness)
    document.getElementById('structured-data')?.remove()
    document.head.append(script)
  }, [title, description, schema])
}

function setMeta(key, value, attribute = 'name') {
  let element = document.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = value
}