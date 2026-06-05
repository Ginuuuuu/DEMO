# ELEGANCE — Premium Menswear

A luxury menswear e-commerce demo with immersive Three.js 3D product previews, Swiper carousels, and a six-category catalog.

## Stack

- **React 18** + **Vite**
- **Three.js** — procedural 3D clothing models
- **Swiper** — featured & section carousels
- **Framer Motion** — premium page animations
- **React Router** — multi-page navigation

## Quick Start

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/       # UI, 3D viewer, layout
├── context/          # Shopping cart state
├── data/catalog.js   # All categories & products
├── pages/            # Home, Category, Product, Contact
├── styles/global.css
└── utils/            # 3D builder, SVG thumbnails, formatters
public/
└── images/           # Drop real product photos here (see below)
```

## Categories

1. **Formal** — Korean pants, trousers, shirts, and more
2. **Casual** — Jeans, tees, baggy pants, printed shirts
3. **Sports** — Compression wear, training gear, sport watches
4. **Accessories** — Belts, ties, watches, jewelry, perfumes
5. **Inner Ornament** — Underwear, thermals, base layers
6. **Footwear** — Formal, casual, sneakers, boots, sandals

## Routes

| Path | Page |
|------|------|
| `/` | Home with featured carousel |
| `/shop/:categoryId` | Category with section grids |
| `/shop/:categoryId/:productId` | Product detail + 3D viewer |
| `/contact` | Contact & newsletter |

## Replacing Placeholders with Real Images

Add photos under:

```
public/images/{categoryId}/{productId}/hero.jpg
public/images/{categoryId}/{productId}/gallery-01.jpg
```

Then reference in `src/data/catalog.js` with an `images` array on each product.

## Build

```bash
npm run build
npm run preview
```

Private project for ENOMOTIA.
