import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const raw = JSON.parse(readFileSync('./shopify-products.json', 'utf8'))
const catalogOrder = [
  'casquette-ny-yankees-personnalisee-rouge-bordeaux-paillettes',
  'casquette-la-dodgers-custom-rouge-broderie-florale-roses',
  'casquette-atlanta-braves-pastel-fleurs-en-dentelle-3d-perles',
  'casquette-ny-yankees-dark-custom-flammes-fleurs-noires-3d',
  'casquette-chicago-white-sox-bleu-royal-dentelle-blanche-perles',
  'casquette-la-dodgers-grise-fleurs-perlees-3d-argentees',
  'casquette-chicago-white-sox-bleue-custom-bijoux-strass',
  'casquette-ny-yankees-bicolore-fleurs-en-dentelle-3d-perles',
  'casquette-chicago-white-sox-marine-broderie-florale-nuit-sequins',
  'casquette-la-dodgers-rouge-custom-dentelle-blanche-perles',
  'casquette-ny-yankees-noire-destroyed-dentelle-blanche-perles',
  'casquette-ny-yankees-kaki-broderie-florale-roses-rouges',
  'casquette-la-dodgers-verte-destroyed-toile-daraignee-strass-perles',
  'casquette-ny-yankees-grise-custom-strass-bijoux-etincelants',
  'red-one-multi-x-limited-edition',
  'p-black-multi-d-white-limited-edition',
  'green-express-limited-edition',
  'black-ia-red-flower-limited-edition',
  'dope-black-white-s-limited-edition',
  'new-york-stone-black-edition',
  'new-york-fire-limited-edition',
  'new-york-meta',
  'new-york-turttle-white-russ',
  'new-york-fire-rubbies',
]

const byHandle = Object.fromEntries(raw.products.map((p) => [p.handle, p]))

const CARE =
  'To maintain the beauty and integrity of your purchase, we recommend treating it with care. Simple maintenance practices, such as gentle washing and proper storage, can effectively preserve the longevity of your favorite items.'
const DESIGN =
  'Our dedication to excellence extends beyond materials; it encompasses the artistry and craftsmanship illustrated in every piece we create.'

function cdn(src, width = 1600) {
  return src.replace(/\\/g, '').replace(/\\\//g, '/') + (src.includes('?') ? `&width=${width}` : `?width=${width}`)
}

const products = catalogOrder
  .map((handle, index) => {
    const p = byHandle[handle]
    if (!p) throw new Error(`Missing ${handle}`)
    const variants = p.variants.map((v) => ({
      id: String(v.id),
      title: v.title,
      option: v.option1,
      price: Number(v.price),
      compareAt: v.compare_at_price ? Number(v.compare_at_price) : null,
      available: Boolean(v.available),
      image: v.featured_image?.src || null,
    }))
    const available = variants.some((v) => v.available)
    const price = variants[0].price
    const compareAt = variants[0].compareAt
    const option = p.options?.[0]
    const hasRealOptions = option && option.name !== 'Title' && option.values?.[0] !== 'Default Title'
    return {
      id: String(p.id),
      handle: p.handle,
      title: p.title,
      vendor: p.vendor,
      category: /hoodie/i.test(p.title) ? 'hoodie' : 'cap',
      featured: index < 16,
      bodyHtml: p.body_html || '',
      care: CARE,
      design: DESIGN,
      optionName: hasRealOptions ? option.name : null,
      optionValues: hasRealOptions ? option.values : [],
      variants,
      images: p.images.map((img) => img.src),
      available,
      price,
      compareAt,
      soldOut: !available,
      onSale: Boolean(compareAt) && compareAt > price,
    }
  })

mkdirSync('./src/data', { recursive: true })
writeFileSync(
  './src/data/products.js',
  `export const products = ${JSON.stringify(products, null, 2)}\n
export function getProduct(handle) {
  return products.find((p) => p.handle === handle)
}

export function featuredProducts() {
  return products.filter((p) => p.featured)
}

export function relatedProducts(handle, limit = 8) {
  const current = getProduct(handle)
  return products
    .filter((p) => p.handle !== handle)
    .sort((a, b) => {
      if (a.category === current?.category && b.category !== current?.category) return -1
      if (b.category === current?.category && a.category !== current?.category) return 1
      return 0
    })
    .slice(0, limit)
}

export function formatPrice(value) {
  return \`\${Number(value).toFixed(2)} dh\`
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) => p.title.toLowerCase().includes(q) || p.category.includes(q))
}
`
)
console.log(`Wrote ${products.length} products`)
