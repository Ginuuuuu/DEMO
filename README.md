# MASC - Menswear Collection 3D E-Commerce

A premium 3D e-commerce website for menswear with interactive Three.js product visualization.

## Features

- ✨ Interactive 3D product viewer with drag-to-rotate controls
- 🎨 4 product categories: Casual, Formal, Sport, Accessories
- 👕 50+ products with colors, sizes, and pricing
- 📱 Fully responsive design
- 🎯 Smooth navigation: Home → Category → Section → Product details
- 🛒 Shopping cart counter
- ⚡ Built with React + Three.js + Vite

## Project Structure

```
CLIENT_WEBSITES/
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Home Page** - Click any category button to explore
2. **Category Page** - Select a section (e.g., Chinos, T-Shirts)
3. **Product Page** - View 3D model with:
   - **Left sidebar**: Browse all products
   - **Center**: Drag to rotate the 3D model 360°
   - **Right panel**: Select size, check availability, add to cart
4. **Navigation**: Use breadcrumb at top to navigate back

## Technologies

- **React 18** - UI framework
- **Three.js** - 3D graphics
- **Vite** - Modern build tool
- **CSS-in-JS** - Inline styling
- **Google Fonts** - Cormorant Garamond & Montserrat

## Customization

### Edit Products
Modify the `CATS` object in `src/App.jsx` to change:
- Product names, prices, colors
- Stock levels
- Descriptions
- Sizes available

### Change Colors & Styling
All styling is inline in components. Look for `style={{}}` props to customize:
- Theme colors (golds, grays)
- Font sizes
- Spacing & layouts

### Modify 3D Models
Edit the `buildModel()` function in `src/App.jsx` to:
- Change clothing geometry
- Add new item types
- Adjust lighting

## Performance Notes

- 3D models are generated procedurally (no heavy file downloads)
- Each product instantiates a fresh Three.js scene for isolation
- Proper cleanup on unmount prevents memory leaks
- Optimized for both desktop and touch devices

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL required for 3D rendering.

## License

Private project for ENOMOTIA.

---

Built with ❤️ for premium menswear shopping.
