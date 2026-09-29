import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, ChevronRight, PackageCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import categories from '../data/categories.json'
import { categoryFor } from '../utils/catalog.js'

export function SectionHeading({ eyebrow, title, text, link, linkLabel = 'Voir tout' }) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
      {link && <Link className="text-link" to={link}>{linkLabel}<ArrowUpRight size={16} /></Link>}
    </div>
  )
}

export function CategoryFeature({ category, index = 0 }) {
  return (
    <motion.div className={`category-feature category-feature-${index % 4}`} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.32, delay: (index % 4) * 0.045 }}>
      <Link to={`/produits?categorie=${category.slug}`} className="category-link">
        <img src={category.image} alt="" loading="lazy" />
        <span className="category-shade" />
        <span className="category-copy"><small>{String(index + 1).padStart(2, '0')} / CATÉGORIE</small><strong>{category.name}</strong><span>{category.description}<ChevronRight size={16} /></span></span>
      </Link>
    </motion.div>
  )
}

export function ProductCard({ product, index = 0 }) {
  const category = categoryFor(product.category)
  return (
    <motion.article className="product-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.3, delay: Math.min(index % 4, 3) * 0.05 }}>
      <Link to={`/produits/${product.slug}`} className="product-image-link" aria-label={`Voir ${product.name}`}>
        <img src={product.images?.[0]} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.featured ? 'SÉLECTION' : 'CATALOGUE'}</span>
      </Link>
      <div className="product-info">
        <span className="product-category">{category?.name ?? 'Quincaillerie'}</span>
        <h3><Link to={`/produits/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.shortDescription}</p>
        <div className="product-card-bottom"><span>{product.price == null ? 'Prix sur devis' : product.priceLabel}</span><Link to={`/produits/${product.slug}`} aria-label={`Découvrir ${product.name}`}><ArrowUpRight size={18} /></Link></div>
      </div>
    </motion.article>
  )
}

export function ProductGrid({ products }) {
  if (!products.length) return <div className="empty-state"><PackageCheck size={26} /><h3>Aucun produit trouvé</h3><p>Essayez une autre recherche ou choisissez une autre catégorie.</p><Link className="text-link" to="/produits">Effacer les filtres <ArrowUpRight size={15} /></Link></div>
  return <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
}

export function TrustLine() {
  return <div className="trust-line"><span><Check size={16} /> Sélection orientée chantier</span><span><Check size={16} /> Prix communiqués sur devis</span><span><Check size={16} /> Conseil selon votre besoin</span></div>
}

export function CategoryList({ items = categories }) {
  return <div className="category-grid">{items.map((category, index) => <CategoryFeature key={category.id} category={category} index={index} />)}</div>
}