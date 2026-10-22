# Studiocapnza9

Storefront React du drop Studiocapnza9 : 24 produits, panier, Cash on Delivery, collections Hoodies / Caps / Long Sleeves.

## Local

```bash
npm install
npm run dev
```

Ouvre `http://localhost:5173/`.

## Build

```bash
npm run build
npm run preview
```

Le dossier `dist/` est le site statique à héberger (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

## Shopify

Ce projet **n’est pas un thème Liquid**. Shopify Online Store n’accepte que les thèmes `.liquid`. Tu ne peux pas coller ce repo dans l’éditeur de thème Shopify tel quel.

Options :

1. **Publier ce site** (recommandé pour ce code) : connecte le repo GitHub à Vercel ou Netlify, puis pointe le domaine.
2. **Garder Shopify** pour les produits / checkout : il faudrait reconstruire le design en thème Liquid, ou un storefront Hydrogen.

Les données produits sont dans `src/data/products.js` (export Shopify) et `src/data/site.js`.
