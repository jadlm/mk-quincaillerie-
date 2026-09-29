import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSeo } from '../utils/seo.js'

export function NotFoundPage() {
  useSeo('Page introuvable', 'Cette page n’existe pas ou a été déplacée.')
  return <section className="not-found wrap"><span className="eyebrow">ERREUR 404</span><h1>Cette page n'est pas disponible.</h1><Link className="button button-dark" to="/"><ArrowLeft size={16} /> Retour à l'accueil</Link></section>
}