import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, MessageCircle, PackageCheck } from 'lucide-react'
import products from '../data/products.json'
import { categoryFor, buildWhatsAppUrl } from '../utils/catalog.js'
import { ProductGrid } from '../components/Storefront.jsx'
import { useSeo } from '../utils/seo.js'
import { contact } from '../config/contact.js'

export function ProductPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const category = product ? categoryFor(product.category) : undefined
  const whatsapp = product && buildWhatsAppUrl(`Bonjour MK Quincaillerie, je souhaite avoir un devis pour le produit : ${product.name} — Référence ${product.reference}.`)

  useSeo(product?.name ?? 'Produit introuvable', product?.shortDescription ?? 'La référence demandée est introuvable.', product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    category: category?.name,
    offers: product.price == null ? undefined : { '@type': 'Offer', price: product.price, priceCurrency: 'MAD', availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  } : undefined)

  if (!product) return <section className="not-found wrap"><span className="eyebrow">RÉFÉRENCE INTROUVABLE</span><h1>Produit indisponible.</h1><Link className="button button-dark" to="/produits">Retour au catalogue <ArrowLeft size={16} /></Link></section>

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)
  return (
    <>
      <div className="breadcrumb wrap"><Link to="/produits"><ArrowLeft size={15} /> Catalogue</Link><span>/</span><span>{category?.name}</span></div>
      <section className="product-detail wrap">
        <div className="product-gallery"><div className="product-main-image"><img src={product.images[activeImage]} alt={product.name} /></div>{product.images.length > 1 && <div className="product-thumbnails">{product.images.map((image, index) => <button key={image} onClick={() => setActiveImage(index)} aria-label={`Afficher la photo ${index + 1}`} aria-pressed={activeImage === index}><img src={image} alt="" /></button>)}</div>}</div>
        <div className="product-detail-copy"><span className="eyebrow">{category?.name ?? 'CATALOGUE MK'}</span><h1>{product.name}</h1><p className="product-reference">Référence : {product.reference}</p><span className="availability"><Check size={15} />{product.available ? 'Disponibilité à confirmer' : 'Sur demande'}</span><div className="detail-price">{product.price == null ? 'Prix sur devis' : product.priceLabel}</div><p className="detail-description">{product.description}</p><div className="detail-actions"><Link className="button button-orange" to={`/devis?produit=${encodeURIComponent(product.name)}`}>Demander un devis <ArrowUpRight size={16} /></Link>{whatsapp && <a className="button button-outline" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>}</div><div className="product-specs"><h2>Caractéristiques</h2>{Object.entries(product.specifications ?? {}).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div>
      </section>
      <section className="product-notice wrap"><PackageCheck size={20} /><p>Référence, marque, caractéristiques et disponibilité à confirmer auprès du magasin. Contactez-nous pour vérifier que ce produit correspond à votre besoin.</p><span>{contact.phone || 'Coordonnées à compléter'}</span></section>
      {related.length > 0 && <section className="featured-section"><div className="wrap section-block"><h2 className="related-title">Dans le même univers</h2><ProductGrid products={related} /></div></section>}
    </>
  )
}