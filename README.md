# Studiocapnza9

Thème Shopify Online Store 2.0 + storefront React local.

Après import GitHub dans Shopify, tu modifies **titres, pages, sections, produits et images** dans l’éditeur Shopify, pas dans le code.

## Importer dans Shopify (GitHub)

1. Pousse ce repo sur GitHub (branche `master`).
2. Shopify Admin → **Boutique en ligne** → **Thèmes** → **Ajouter un thème** → **Connecter depuis GitHub**.
3. Autorise Shopify, choisis le repo `nz9caps` et la branche `master`.
4. Shopify lit les dossiers à la racine : `layout/`, `templates/`, `sections/`, `config/`, `snippets/`, `assets/`, `locales/`.
5. Clique **Personnaliser** sur le thème connecté.

## Quoi éditer où (manuel, dans Shopify)

| Tu veux changer | Où |
|---|---|
| Titres hero, Hoodies / Caps / Long Sleeves, textes, boutons | **Personnaliser** → section → champs à gauche |
| Image hero, cercles collections, logo | **Personnaliser** → Image / Logo, ou **Réglages du thème** |
| Ajouter / retirer une section | **Personnaliser** → **Ajouter une section** (Hero, Collection vedette, Coming soon, Texte, Image + texte, Contact) |
| Produits, prix, photos, tailles | Admin → **Produits** |
| Collections Hoodies / Caps | Admin → **Produits** → **Collections**, puis dans l’éditeur lie chaque section à sa collection |
| Pages About / Contact | Admin → **Boutique en ligne** → **Pages**. Assigne le modèle `page.about` ou `page.contact` |
| Menu header / footer | Admin → **Boutique en ligne** → **Menus** (`main-menu`, `footer`) |
| Couleurs, logo, date du chrono, prix solde barre | **Personnaliser** → **Réglages du thème** |
| Panier / checkout / COD | Admin → **Paramètres** → **Paiements** (paiement à la livraison) |

## Après connexion

1. Crée les collections **Hoodies** et **Caps** (et éventuellement Long Sleeves).
2. Sur la page d’accueil, ouvre les sections **Hoodies** et **Caps** et choisis la collection.
3. Sur les cercles, ajoute une image et un lien vers chaque collection.
4. Crée les pages **About** et **Contact** si elles n’existent pas.
5. Uploade le logo dans **Réglages du thème**.

Les fichiers React (`src/`) servent uniquement au preview local. Shopify les ignore.

## Local (React)

```bash
npm install
npm run dev
```

Ouvre `http://localhost:5173/`.
