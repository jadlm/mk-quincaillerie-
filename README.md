# MK Quincaillerie

Catalogue web React + Vite. Le site n'utilise ni backend ni base de données : les contenus sont gérés dans `src/data/`.

## Lancer le site

```sh
npm install
npm run dev
```

Le serveur Vite affiche l'adresse locale dans le terminal.

## Gérer les données

- Ajouter ou supprimer une référence : modifier `src/data/products.json`. Chaque `slug` doit être unique. Les images sont des chemins publics ou des URL; `price: null` affiche « Prix sur devis ».
- Modifier les catégories : éditer `src/data/categories.json`; la valeur `slug` doit correspondre au champ `category` des produits.
- Ajouter/modifier un avis : éditer `src/data/reviews.json`. Le fichier est volontairement vide tant qu'aucun avis réel n'a été fourni.
- Coordonnées, adresse, horaires, réseaux sociaux : modifier `src/data/store.json`.
- WhatsApp, téléphone, e-mail et position GPS sont exportés depuis `src/config/contact.js` à partir de `store.json`. Le numéro WhatsApp doit être au format international, sans `+` ni espaces, par exemple `2126XXXXXXXX`.

Les produits et catégories de départ illustrent la structure du catalogue. Vérifier et compléter leurs références, marques, caractéristiques et disponibilités avant publication.

## Carte, contact et prix

Renseigner `latitude` et `longitude` dans `src/data/store.json` pour afficher la carte OpenStreetMap intégrée. Les coordonnées de Casablanca ne sont pas devinées. Compléter aussi le téléphone, WhatsApp, l'e-mail et les horaires avant mise en ligne. Aucun prix n'est inventé.

Le formulaire ouvre le logiciel de messagerie ou WhatsApp du visiteur avec le texte prérempli. Il ne transmet pas les informations à un serveur.

## Vérifications et déploiement

```sh
npm run lint
npm run build
npm run preview
```

Vercel est configuré pour réécrire les routes React vers `index.html`. Le build produit `sitemap.xml` et `robots.txt` à partir du catalogue. Définir la variable `SITE_URL` sur le domaine public avant le build; à défaut, l'adresse utilisée est `https://mkquincaillerie.ma`.

Les images sont servies localement depuis `public/images/`. Remplacez les fichiers et leurs chemins dans les JSON pour personnaliser le catalogue.