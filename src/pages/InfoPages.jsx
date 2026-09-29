import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import categories from '../data/categories.json'
import store from '../data/store.json'
import { contact, location } from '../config/contact.js'
import { buildQuoteMessage, buildWhatsAppUrl } from '../utils/catalog.js'
import { CategoryList, SectionHeading } from '../components/Storefront.jsx'
import { useSeo } from '../utils/seo.js'
import { lazy, Suspense } from 'react'

const MapSection = lazy(() => import('../components/MapSection.jsx'))

export function CategoriesPage() {
  useSeo('Nos catégories', 'Explorez les catégories de produits et équipements proposées par MK Quincaillerie.')
  return <><section className="page-masthead"><div className="wrap"><span className="eyebrow">NOS UNIVERS</span><h1>Un rayon pour<br /><em>chaque projet.</em></h1><p>Parcourez les familles du catalogue et trouvez le matériel adapté à votre activité.</p></div></section><section className="section-block wrap category-page"><SectionHeading eyebrow="CATÉGORIES PRODUITS" title="Du petit outillage au chantier." /><CategoryList items={categories} /></section></>
}

export function AboutPage() {
  useSeo('À propos', 'MK Quincaillerie, une adresse de proximité pour l’outillage, la quincaillerie, le bricolage et les fournitures de chantier.')
  return <><section className="page-masthead"><div className="wrap"><span className="eyebrow">À PROPOS DE MK</span><h1>Le matériel<br /><em>du quotidien.</em></h1><p>{store.description}</p></div></section><section className="about-section wrap"><div className="about-stamp"><span>MK</span><small>OUTILLAGE<br />QUINCAILLERIE<br />CHANTIER</small></div><div className="about-copy"><span className="eyebrow">UNE ADRESSE DE PROXIMITÉ</span><h2>Les essentiels pour avancer.</h2><p>MK Quincaillerie accompagne les besoins en quincaillerie, outillage, bricolage, équipements de chantier et fournitures professionnelles.</p><p>Le catalogue est présenté à titre indicatif. Les références disponibles, leurs caractéristiques et leurs prix sont à confirmer auprès de l’équipe, afin de répondre au plus juste à chaque demande.</p><Link className="text-link" to="/contact">Prendre contact <ArrowUpRight size={16} /></Link></div></section><section className="about-values"><div className="wrap about-values-inner"><div><strong>01</strong><h3>Outillage</h3><p>Les outils pour l'atelier et le terrain.</p></div><div><strong>02</strong><h3>Quincaillerie</h3><p>Les composants et accessoires du projet.</p></div><div><strong>03</strong><h3>Équipement</h3><p>Les fournitures dédiées aux chantiers.</p></div></div></section></>
}

export function QuotePage() {
  useSeo('Demander un devis', 'Décrivez votre besoin à MK Quincaillerie et préparez votre demande de devis par WhatsApp ou e-mail.')
  const [searchParams] = useSearchParams()
  const [feedback, setFeedback] = useState('')

  function submitQuote(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    const message = buildQuoteMessage(values)
    const destination = event.nativeEvent.submitter?.value || 'whatsapp'

    if (destination === 'email') {
      if (!contact.email) return setFeedback('L’adresse e-mail du magasin est à compléter dans src/data/store.json.')
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Demande de devis MK Quincaillerie')}&body=${encodeURIComponent(message)}`
      return
    }

    const whatsapp = buildWhatsAppUrl(message)
    if (!whatsapp) return setFeedback('Le numéro WhatsApp du magasin est à compléter dans src/data/store.json.')
    window.open(whatsapp, '_blank', 'noopener,noreferrer')
  }

  return <><section className="page-masthead"><div className="wrap"><span className="eyebrow">À VOTRE ÉCOUTE</span><h1>Parlons de votre<br /><em>besoin.</em></h1><p>Quelques détails nous aideront à préparer une réponse adaptée.</p></div></section><section className="quote-layout wrap"><form className="quote-form" onSubmit={submitQuote}><div className="form-intro"><span className="eyebrow">DEMANDE DE DEVIS</span><h2>Votre demande</h2><p>Les champs marqués d'un astérisque sont obligatoires.</p></div><div className="form-grid"><label>Nom complet *<input name="name" autoComplete="name" required /></label><label>Téléphone *<input name="phone" type="tel" autoComplete="tel" required /></label><label>E-mail<input name="email" type="email" autoComplete="email" /></label><label>Entreprise<input name="company" autoComplete="organization" /></label><label>Type de demande<select name="type"><option>Demande de produit</option><option>Demande de disponibilité</option><option>Conseil matériel</option><option>Autre demande</option></select></label><label>Produit recherché<input name="product" defaultValue={searchParams.get('produit') ?? ''} /></label><label>Quantité<input name="quantity" type="number" min="1" inputMode="numeric" /></label><label className="form-full">Message<textarea name="message" rows="4" placeholder="Précisez les dimensions, l'usage ou les caractéristiques recherchées…" /></label></div><div className="form-submit"><button className="button button-orange" type="submit" value="whatsapp">Envoyer par WhatsApp <MessageCircle size={16} /></button><button className="button button-outline" type="submit" value="email">Envoyer par e-mail <Mail size={16} /></button></div><p className="form-note">Votre message est préparé sur votre appareil. Aucun formulaire n'est transmis à un serveur.</p>{feedback && <p className="form-feedback" role="status">{feedback}</p>}</form><aside className="quote-aside"><span className="quote-aside-mark">MK</span><span className="eyebrow eyebrow-light">POUR MIEUX VOUS RÉPONDRE</span><h2>Chaque détail compte.</h2><p>Ajoutez une référence, une quantité ou l'usage prévu. Notre équipe pourra ainsi mieux comprendre votre demande.</p><div className="aside-rule" /><div className="aside-contact"><MapPin size={17} /><span>{location.address}<br />{location.city}, {location.country}</span></div><Link to="/contact" className="aside-link">Coordonnées & horaires <ArrowUpRight size={15} /></Link></aside></section></>
}

export function ContactPage() {
  useSeo('Contact et accès', 'Coordonnées, horaires et localisation de MK Quincaillerie à Casablanca.')
  return <><section className="page-masthead"><div className="wrap"><span className="eyebrow">CONTACT & ACCÈS</span><h1>À votre<br /><em>disposition.</em></h1><p>Une question sur une référence ou un besoin chantier ? Contactez le magasin.</p></div></section><section className="contact-details wrap"><div className="contact-detail"><span><Phone size={19} /></span><div><small>TÉLÉPHONE</small>{contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : <p>À renseigner</p>}</div></div><div className="contact-detail"><span><MessageCircle size={19} /></span><div><small>WHATSAPP</small>{contact.whatsapp ? <a href={buildWhatsAppUrl('Bonjour MK Quincaillerie.')} target="_blank" rel="noreferrer">Écrire sur WhatsApp</a> : <p>Numéro à renseigner</p>}</div></div><div className="contact-detail"><span><Mail size={19} /></span><div><small>E-MAIL</small>{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <p>À renseigner</p>}</div></div></section><section className="contact-hours wrap"><div><span className="eyebrow">HORAIRES</span><h2>Passer au magasin.</h2></div><div className="hours-list">{store.hours.map((item) => <div key={item.days}><span>{item.days}</span><strong>{item.hours}</strong></div>)}</div></section><div className="wrap"><Suspense fallback={<div className="map-placeholder">Chargement de la carte…</div>}><MapSection /></Suspense></div></>
}

export function LegalPage() {
  useSeo('Mentions légales', 'Mentions légales du site MK Quincaillerie.')
  return <><section className="page-masthead"><div className="wrap"><span className="eyebrow">INFORMATIONS</span><h1>Mentions<br /><em>légales.</em></h1><p>Informations relatives à l'édition et à l'utilisation du site.</p></div></section><section className="legal-content wrap"><article><h2>Éditeur du site</h2><p><strong>{store.name}</strong><br />Adresse : {store.address}, {store.city}, {store.country}<br />Téléphone : {store.phone || 'À compléter'}<br />E-mail : {store.email || 'À compléter'}<br />Identifiants légaux : à compléter par l'éditeur.</p></article><article><h2>Hébergement</h2><p>Hébergeur : à compléter lors du déploiement du site.</p></article><article><h2>Contenu du catalogue</h2><p>Les informations produit sont fournies à titre indicatif. Les références, caractéristiques, disponibilités et prix sont à confirmer directement auprès de MK Quincaillerie. Aucun prix non vérifié n'est publié sur le site.</p></article><article><h2>Données personnelles</h2><p>Le formulaire de devis prépare un message dans l'application WhatsApp ou le logiciel de messagerie de l'utilisateur. Le site ne collecte ni ne stocke ces informations sur un serveur.</p></article><article><h2>Propriété intellectuelle</h2><p>Les contenus et éléments graphiques du site sont à renseigner et valider par l'éditeur avant publication.</p></article></section></>
}