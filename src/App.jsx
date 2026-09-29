import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx').then((module) => ({ default: module.HomePage })))
const CatalogPage = lazy(() => import('./pages/CatalogPage.jsx').then((module) => ({ default: module.CatalogPage })))
const ProductPage = lazy(() => import('./pages/ProductPage.jsx').then((module) => ({ default: module.ProductPage })))
const CategoriesPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.CategoriesPage })))
const AboutPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.AboutPage })))
const ContactPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.ContactPage })))
const QuotePage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.QuotePage })))
const LegalPage = lazy(() => import('./pages/InfoPages.jsx').then((module) => ({ default: module.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx').then((module) => ({ default: module.NotFoundPage })))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="page-loading" role="status">Chargement…</div>}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="produits" element={<CatalogPage />} />
            <Route path="produits/:slug" element={<ProductPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="devis" element={<QuotePage />} />
            <Route path="a-propos" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="mentions-legales" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
