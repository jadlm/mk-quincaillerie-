import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products.json'
import categories from '../data/categories.json'
import { filterProducts } from '../utils/catalog.js'
import { ProductGrid } from '../components/Storefront.jsx'
import { useSeo } from '../utils/seo.js'

const pageSize = 8

export function CatalogPage() {
  useSeo('Catalogue produits', 'Recherchez et filtrez les produits de la quincaillerie MK. Prix et disponibilités sur demande.')
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const category = searchParams.get('categorie') ?? ''
  const sort = searchParams.get('tri') ?? 'featured'
  const filtered = filterProducts(products, { query, category, sort })

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
    setVisibleCount(pageSize)
  }

  return (
    <>
      <section className="page-masthead"><div className="wrap"><span className="eyebrow">LE CATALOGUE MK</span><h1>Produits &<br /><em>équipements.</em></h1><p>Des références à préciser ensemble. Les prix sont communiqués sur devis.</p></div></section>
      <section className="catalog-section wrap">
        <div className="catalog-toolbar"><label className="search-field"><Search size={18} /><span className="sr-only">Rechercher un produit</span><input type="search" placeholder="Nom, référence, marque, catégorie…" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(pageSize) }} /></label><label className="select-field"><SlidersHorizontal size={17} /><span className="sr-only">Catégorie</span><select value={category} onChange={(event) => updateParam('categorie', event.target.value)}><option value="">Toutes les catégories</option>{categories.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label><label className="sort-field"><span className="sr-only">Trier les produits</span><select value={sort} onChange={(event) => updateParam('tri', event.target.value)}><option value="featured">Sélection MK</option><option value="name">Nom A à Z</option></select></label></div>
        <div className="results-meta"><span>{filtered.length} référence{filtered.length > 1 ? 's' : ''}</span><span>Prix sur devis</span></div>
        <ProductGrid products={filtered.slice(0, visibleCount)} />
        {visibleCount < filtered.length && <button className="button button-outline load-more" onClick={() => setVisibleCount((count) => count + pageSize)}>Charger plus de produits</button>}
      </section>
    </>
  )
}