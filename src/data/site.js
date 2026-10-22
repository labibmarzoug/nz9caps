export const site = {
  name: 'Studiocapnza9',
  logo: '/images/logo.png',
  hero: '/images/hero.png',
  heroBadge: 'DROP · LIVE',
  tagline: 'Streetwear × haute couture',
  collectionTitle: 'Les Exclusivités du Moment',
  catalogTitle: 'Shop',
  email: 'anassmilo123@gmail.com',
  phone: '+212 6 00 00 00 00',
  address: 'Hay Essalam, 53000 Ifrane, Morocco',
  hours: 'Lun — Dim · 10h à 20h',
  handmadeBlurb:
    "Découvrez l'exclusivité où le streetwear rencontre la haute couture. Notre nouvelle collection réinvente les casquettes emblématiques avec une touche de glamour audacieuse. Chaque pièce est soigneusement customisée avec des détails premium : dentelle délicate, fleurs en 3D, perles nacrées et strass étincelants. Conçues pour ceux et celles qui refusent l'ordinaire, ces créations uniques transforment un accessoire du quotidien en un véritable bijou.",
  about: {
    kicker: 'Studio Ifrane',
    title: 'Un atelier, une signature.',
    lead:
      'Studiocapnza9 naît d’un geste simple : customiser à la main des pièces iconiques jusqu’à ce qu’elles deviennent uniques. Hoodies cropped 340 GSM et casquettes brodées, perles, dentelle et strass — chaque drop est limité.',
    story: [
      'Basé à Ifrane, le studio assemble streetwear et haute couture. Les casquettes NY, LA et Chicago sont détruites, perlées, brodées. Les hoodies cropped oversize arrivent en tissu turc premium, 340 GSM.',
      'Rien n’est produit en masse. Les éditions limited (Fire, Meta, Stone Black, Multi X) existent en quelques tailles. Livraison 24h–48h au Maroc, paiement à la livraison.',
    ],
  },
  values: [
    { n: '01', title: 'Handmade', text: 'Chaque casquette est customisée à la main : dentelle 3D, perles nacrées, strass, broderie florale.' },
    { n: '02', title: 'Limited', text: 'Drops courts, tailles précises, pièces numbered. Quand c’est sold out, c’est sold out.' },
    { n: '03', title: 'Premium', text: 'Hoodies 340 GSM, tissu turc, coupe cropped oversize. Casquettes coupe ajustée visière plate.' },
    { n: '04', title: 'Local', text: 'Atelier à Ifrane. Expédition 24h à 48h partout au Maroc.' },
  ],
  process: [
    { n: '01', title: 'Sélection', text: 'On part d’une base iconique — Yankees, Dodgers, White Sox — ou d’un blank hoodie premium.' },
    { n: '02', title: 'Sculpture', text: 'Destroyed, dentelle, fleurs 3D, flammes, strass. Le custom se construit pièce par pièce.' },
    { n: '03', title: 'Contrôle', text: 'Chaque finition est vérifiée avant drop. Qualité atelier, pas chaîne industrielle.' },
    { n: '04', title: 'Drop', text: 'Mise en ligne, tailles ouvertes, cash on delivery. Tu reçois sous 24–48h.' },
  ],
  stats: [
    { value: '24', label: 'Pièces au drop' },
    { value: '340', label: 'GSM hoodie' },
    { value: '24h', label: 'Livraison Maroc' },
    { value: '100%', label: 'Custom studio' },
  ],
  saleEnd: '2026-10-28T23:59:59+02:00',
  saleFrom: 350,
  saleTo: 229,
  perks: [
    { n: '01', title: 'Livraison gratuite', text: '24h à 48h partout au Maroc.' },
    { n: '02', title: 'Cash on delivery', text: 'Tu paies à la réception.' },
    { n: '03', title: 'Solde hoodies', text: '350 → 229 dh, chrono en header.' },
    { n: '04', title: 'Handmade', text: 'Custom atelier, drops limités.' },
  ],
  faq: [
    { q: 'La livraison est-elle vraiment gratuite ?', a: 'Oui. Expédition 24h–48h partout au Maroc, sans frais de port.' },
    { q: 'Comment je paie ?', a: 'Cash on delivery. Tu vérifies la pièce, tu paies à la réception.' },
    { q: 'Le solde hoodie, c’est jusqu’à quand ?', a: 'Jusqu’à la fin du chrono en haut du site. 350 dh → 229 dh.' },
    { q: 'Les long sleeves arrivent quand ?', a: 'Drop coming soon. Caps et hoodies restent live.' },
  ],
}

export const collections = [
  { id: 'cap', label: 'Caps', kicker: 'Handmade' },
  { id: 'longsleeve', label: 'Longsleeve', kicker: 'Coming soon' },
  { id: 'hoodie', label: 'Hoodies', kicker: 'Solde −35%' },
]

export const heroSlides = [
  {
    image:
      'https://cdn.shopify.com/s/files/1/0714/7572/4403/files/3567fbb9-e597-4ff1-b2ba-af4b95e8f703.png?v=1792441252',
    kicker: 'Hoodie cropped · solde',
    title: 'Script World.',
    text: 'Tissu turc, 340 GSM, coupe oversize légèrement cropped. Solde 350 → 229 dh. Livraison gratuite.',
    cta: 'Shop hoodie',
    to: '/products/casquette-ny-yankees-personnalisee-rouge-bordeaux-paillettes',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0714/7572/4403/files/IMG-8670.jpg?v=1785322990',
    kicker: 'Caps handmade',
    title: 'NY Dark Custom.',
    text: 'Flammes, fleurs noires 3D, perles. Streetwear sculpté comme un bijou.',
    cta: 'Explorer les caps',
    to: '/collections/all?cat=cap',
  },
  {
    image: '/images/hero.png',
    kicker: 'Long sleeve drop',
    title: 'Coming soon.',
    text: 'Le studio prépare le next chapter. Caps et hoodies restent live.',
    cta: 'Enter shop',
    to: '/collections/all',
  },
]
