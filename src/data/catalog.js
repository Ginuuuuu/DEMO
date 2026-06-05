/** @typedef {{ id: string; name: string; color: string; colorName: string; price: number; type: string; sizes: string[]; stock: number; mat: string; desc: string; featured?: boolean }} Product */

/** @typedef {{ id: string; label: string; type: string; desc: string; items: Product[] }} Section */

/** @typedef {{ id: string; label: string; tag: string; accent: string; hero: string; sections: Record<string, Section> }} Category */

/**
 * @param {string} id
 * @param {string} name
 * @param {string} color
 * @param {string} colorName
 * @param {number} price
 * @param {string} type
 * @param {Partial<Product>} [overrides]
 * @returns {Product}
 */
function product(id, name, color, colorName, price, type, overrides = {}) {
  return {
    id,
    name,
    color,
    colorName,
    price,
    type,
    sizes: overrides.sizes ?? ['S', 'M', 'L', 'XL'],
    stock: overrides.stock ?? 12,
    mat: overrides.mat ?? 'Premium Fabric',
    desc: overrides.desc ?? `Crafted for the modern gentleman — ${name.toLowerCase()} in ${colorName.toLowerCase()}.`,
    featured: overrides.featured ?? false,
  };
}

/** @type {Record<string, Category>} */
export const CATEGORIES = {
  formal: {
    id: 'formal',
    label: 'Formal',
    tag: 'Sophisticated Authority',
    accent: '#B8A898',
    hero: 'Tailored precision for every occasion',
    sections: {
      korean_pants: {
        id: 'korean_pants',
        label: 'Korean Pants',
        type: 'pants',
        desc: 'Contemporary Korean-cut trousers with a refined silhouette',
        items: [
          product('FM-KP01', 'Slate Korean Pants', '#4A5568', 'Slate', 4299, 'pants', { mat: 'Wool Blend', featured: true }),
          product('FM-KP02', 'Charcoal Korean Pants', '#3D3D3D', 'Charcoal', 4499, 'pants', { mat: 'Stretch Wool' }),
          product('FM-KP03', 'Navy Korean Pants', '#1C2B4B', 'Navy', 4599, 'pants', { mat: 'Super 100s Wool' }),
        ],
      },
      trousers: {
        id: 'trousers',
        label: 'Trousers',
        type: 'trousers',
        desc: 'Precision-cut formal trousers for boardroom to ballroom',
        items: [
          product('FM-TR01', 'Charcoal Dress Trousers', '#3D3D3D', 'Charcoal', 3499, 'trousers', { sizes: ['28', '30', '32', '34', '36'] }),
          product('FM-TR02', 'Navy Formal Trousers', '#1C2B4B', 'Navy', 3299, 'trousers', { sizes: ['30', '32', '34'] }),
          product('FM-TR03', 'Black Slim Trousers', '#0F0F0F', 'Black', 3699, 'trousers', { sizes: ['30', '32', '34', '36'] }),
        ],
      },
      straight_fit: {
        id: 'straight_fit',
        label: 'Straight Fit',
        type: 'pants',
        desc: 'Classic straight-leg cuts with timeless appeal',
        items: [
          product('FM-SF01', 'Grey Straight Fit', '#7A7A7A', 'Grey', 3199, 'pants'),
          product('FM-SF02', 'Tan Straight Fit', '#C4A882', 'Tan', 2999, 'pants'),
        ],
      },
      patterned_shirt: {
        id: 'patterned_shirt',
        label: 'Patterned Shirt',
        type: 'shirt',
        desc: 'Statement patterns for distinguished evenings',
        items: [
          product('FM-PS01', 'Paisley Party Shirt', '#722F37', 'Burgundy', 2799, 'shirt', { featured: true }),
          product('FM-PS02', 'Micro Check Shirt', '#4A7AB5', 'Blue Check', 2599, 'shirt'),
        ],
      },
      linen_shirts: {
        id: 'linen_shirts',
        label: 'Linen Shirts',
        type: 'shirt',
        desc: 'Breathable linen for warm-weather elegance',
        items: [
          product('FM-LS01', 'White Linen Shirt', '#F0EDE5', 'White', 2199, 'shirt', { mat: '100% Linen' }),
          product('FM-LS02', 'Sky Linen Shirt', '#97BAD0', 'Sky', 2299, 'shirt', { mat: '100% Linen' }),
        ],
      },
      plain_shirt: {
        id: 'plain_shirt',
        label: 'Plain Shirt',
        type: 'shirt',
        desc: 'Essential solid dress shirts in premium cotton',
        items: [
          product('FM-PL01', 'White Dress Shirt', '#F2F0EA', 'White', 2999, 'shirt', { mat: 'Egyptian Cotton', featured: true }),
          product('FM-PL02', 'Light Blue Oxford', '#97BAD0', 'Blue', 2799, 'shirt'),
        ],
      },
      party_shirt: {
        id: 'party_shirt',
        label: 'Party Shirt',
        type: 'shirt',
        desc: 'Bold evening shirts designed to stand out',
        items: [
          product('FM-PT01', 'Black Satin Party Shirt', '#0F0F0F', 'Black', 3499, 'shirt', { mat: 'Satin Cotton' }),
          product('FM-PT02', 'Midnight Velvet Touch', '#1C2B4B', 'Midnight', 3799, 'shirt'),
        ],
      },
    },
  },

  casual: {
    id: 'casual',
    label: 'Casual',
    tag: 'Effortless Style',
    accent: '#C8A966',
    hero: 'Relaxed luxury for everyday living',
    sections: {
      baggy_pants: {
        id: 'baggy_pants', label: 'Baggy Pants', type: 'pants',
        desc: 'Relaxed silhouettes with contemporary street influence',
        items: [
          product('CS-BG01', 'Stone Baggy Pants', '#B5A17A', 'Stone', 2499, 'pants', { featured: true }),
          product('CS-BG02', 'Black Baggy Pants', '#1A1A1A', 'Black', 2599, 'pants'),
        ],
      },
      mom_fit: {
        id: 'mom_fit', label: 'Mom Fit', type: 'pants',
        desc: 'High-rise relaxed fit with vintage character',
        items: [product('CS-MF01', 'Vintage Mom Fit', '#6B7B3A', 'Olive', 2299, 'pants')],
      },
      loose_fit: {
        id: 'loose_fit', label: 'Loose Fit', type: 'pants',
        desc: 'Comfort-first cuts without compromising style',
        items: [product('CS-LF01', 'Sand Loose Fit', '#D4C5A9', 'Sand', 2199, 'pants')],
      },
      jeans: {
        id: 'jeans', label: 'Jeans', type: 'pants',
        desc: 'Premium denim in classic and modern washes',
        items: [
          product('CS-JN01', 'Indigo Classic Jean', '#1C3F6E', 'Indigo', 2799, 'pants', { featured: true }),
          product('CS-JN02', 'Washed Blue Jean', '#4A7AB5', 'Washed Blue', 2599, 'pants'),
        ],
      },
      skinny_jean: {
        id: 'skinny_jean', label: 'Skinny Jean', type: 'pants',
        desc: 'Slim-fit denim with stretch comfort',
        items: [product('CS-SJ01', 'Black Skinny Jean', '#0A0A0A', 'Black', 2699, 'pants')],
      },
      shorts: {
        id: 'shorts', label: 'Shorts', type: 'shorts',
        desc: 'Warm-weather essentials in premium fabrics',
        items: [
          product('CS-SH01', 'Khaki Chino Shorts', '#B5A17A', 'Khaki', 1299, 'shorts'),
          product('CS-SH02', 'Navy Board Shorts', '#1C3F6E', 'Navy', 1199, 'shorts', { mat: 'Quick-Dry Nylon' }),
        ],
      },
      wide_leg: {
        id: 'wide_leg', label: 'Wide-Leg Pants', type: 'pants',
        desc: 'Flowing wide-leg silhouettes for bold casual looks',
        items: [product('CS-WL01', 'Cream Wide-Leg', '#E6E4DE', 'Cream', 2899, 'pants')],
      },
      printed_shirts: {
        id: 'printed_shirts', label: 'Printed Shirts', type: 'shirt',
        desc: 'Artful prints for expressive weekend style',
        items: [
          product('CS-PR01', 'Tropical Print Shirt', '#7D9F7A', 'Sage Print', 1899, 'shirt', { featured: true }),
          product('CS-PR02', 'Abstract Geo Shirt', '#4A7AB5', 'Blue Print', 1999, 'shirt'),
        ],
      },
      plain_shirts: {
        id: 'plain_shirts', label: 'Plain Shirts', type: 'shirt',
        desc: 'Versatile solid shirts for layered looks',
        items: [product('CS-PS01', 'Oxford White Shirt', '#F0EDE5', 'White', 1799, 'shirt')],
      },
      drop_shoulder: {
        id: 'drop_shoulder', label: 'Drop-Shoulder Shirts', type: 'shirt',
        desc: 'Relaxed shoulder lines with modern drape',
        items: [product('CS-DS01', 'Charcoal Drop-Shoulder', '#3D3D3D', 'Charcoal', 1699, 'shirt')],
      },
      tshirts: {
        id: 'tshirts', label: 'T-Shirts', type: 'tshirt',
        desc: 'Premium cotton tees built for everyday versatility',
        items: [
          product('CS-TS01', 'Classic White Tee', '#E6E4DE', 'White', 799, 'tshirt', { mat: '100% Pima Cotton', featured: true }),
          product('CS-TS02', 'Charcoal Crew Tee', '#3D3D3D', 'Charcoal', 899, 'tshirt'),
          product('CS-TS03', 'Navy Tee', '#1C3F6E', 'Navy', 999, 'tshirt'),
        ],
      },
    },
  },

  sports: {
    id: 'sports',
    label: 'Sports',
    tag: 'Performance Meets Style',
    accent: '#E8624A',
    hero: 'Engineered for movement, styled for life',
    sections: {
      compression_shirt: {
        id: 'compression_shirt', label: 'Compression Shirt', type: 'tshirt',
        desc: 'Second-skin compression for peak performance',
        items: [
          product('SP-CS01', 'Black Compression Top', '#0A0A0A', 'Black', 1499, 'tshirt', { mat: '4-Way Stretch Poly', featured: true }),
          product('SP-CS02', 'Navy Compression Top', '#1C3F6E', 'Navy', 1599, 'tshirt', { mat: '4-Way Stretch Poly' }),
        ],
      },
      compression_pants: {
        id: 'compression_pants', label: 'Compression Pants', type: 'joggers',
        desc: 'Muscle-supporting tights for training and recovery',
        items: [product('SP-CP01', 'Graphite Compression Pants', '#4A4A4A', 'Graphite', 1799, 'joggers', { mat: 'Compression Knit' })],
      },
      tights: {
        id: 'tights', label: 'Tights', type: 'joggers',
        desc: 'Lightweight running tights with moisture control',
        items: [product('SP-TG01', 'Black Running Tights', '#0A0A0A', 'Black', 1299, 'joggers', { mat: 'Dri-Fit Mesh' })],
      },
      tshirts: {
        id: 'tshirts', label: 'T-Shirts', type: 'tshirt',
        desc: 'Performance tees for gym, track, and trail',
        items: [
          product('SP-TS01', 'Dri-Fit Training Tee', '#0A0A0A', 'Black', 999, 'tshirt', { mat: 'Performance Poly' }),
          product('SP-TS02', 'White Active Tee', '#F0F0EC', 'White', 899, 'tshirt'),
        ],
      },
      shorts: {
        id: 'shorts', label: 'Shorts', type: 'shorts',
        desc: 'Technical training shorts with advanced fabrics',
        items: [
          product('SP-SH01', 'Black Training Shorts', '#0A0A0A', 'Black', 1299, 'shorts', { mat: 'Performance Nylon' }),
          product('SP-SH02', 'Grey Running Shorts', '#707070', 'Grey', 1199, 'shorts'),
        ],
      },
      watches: {
        id: 'watches', label: 'Watches', type: 'watch',
        desc: 'Sport chronographs built for active lifestyles',
        items: [
          product('SP-WA01', 'Carbon Sport Watch', '#1A1A1A', 'Carbon', 8999, 'watch', { sizes: ['One Size'], featured: true }),
          product('SP-WA02', 'Steel Active Watch', '#808080', 'Steel', 7499, 'watch', { sizes: ['One Size'] }),
        ],
      },
      shoes: {
        id: 'shoes', label: 'Shoes', type: 'shoe',
        desc: 'Performance footwear for every discipline',
        items: [
          product('SP-SK01', 'Grey Mesh Runner', '#808080', 'Grey', 4299, 'shoe', { sizes: ['7', '8', '9', '10', '11'], mat: 'Technical Mesh', featured: true }),
          product('SP-SK02', 'Black Training Shoe', '#0A0A0A', 'Black', 4999, 'shoe', { sizes: ['7', '8', '9', '10'] }),
        ],
      },
    },
  },

  accessories: {
    id: 'accessories',
    label: 'Accessories',
    tag: 'The Finishing Touch',
    accent: '#D4AF37',
    hero: 'Details that define distinction',
    sections: {
      caps: {
        id: 'caps', label: 'Caps', type: 'cap',
        desc: 'Structured and unstructured caps for every mood',
        items: [product('AC-CP01', 'Navy Structured Cap', '#1C2B4B', 'Navy', 999, 'cap', { sizes: ['One Size'] })],
      },
      watches: {
        id: 'watches', label: 'Watches', type: 'watch',
        desc: 'Timepieces that complement refined dressing',
        items: [
          product('AC-WA01', 'Gold Dress Watch', '#C8A966', 'Gold', 12999, 'watch', { sizes: ['One Size'], featured: true }),
          product('AC-WA02', 'Silver Minimal Watch', '#C0C0C0', 'Silver', 9999, 'watch', { sizes: ['One Size'] }),
        ],
      },
      perfumes: {
        id: 'perfumes', label: 'Perfumes', type: 'perfume',
        desc: 'Signature fragrances for day and evening',
        items: [
          product('AC-PF01', 'Noir Elegance EDP', '#1A1A1A', 'Noir', 4499, 'perfume', { sizes: ['50ml', '100ml'] }),
          product('AC-PF02', 'Amber Reserve', '#9B5523', 'Amber', 5499, 'perfume', { sizes: ['50ml', '100ml'], featured: true }),
        ],
      },
      ties: {
        id: 'ties', label: 'Ties', type: 'tie',
        desc: 'Silk ties woven for distinguished occasions',
        items: [
          product('AC-TI01', 'Burgundy Silk Tie', '#722F37', 'Burgundy', 1599, 'tie', { sizes: ['One Size'] }),
          product('AC-TI02', 'Navy Silk Tie', '#1C3F6E', 'Navy', 1699, 'tie', { sizes: ['One Size'] }),
        ],
      },
      belt: {
        id: 'belt', label: 'Belts', type: 'belt',
        desc: 'Handcrafted leather belts that complete every ensemble',
        items: [
          product('AC-BE01', 'Black Dress Belt', '#0F0F0F', 'Black', 1299, 'belt', { sizes: ['32', '34', '36', '38'] }),
          product('AC-BE02', 'Cognac Dress Belt', '#9B5523', 'Cognac', 1699, 'belt', { sizes: ['32', '34', '36', '38', '40'] }),
        ],
      },
      head_band: {
        id: 'head_band', label: 'Head-Bands', type: 'accessory',
        desc: 'Sport and leisure head-bands in premium knits',
        items: [product('AC-HB01', 'Charcoal Knit Head-Band', '#3D3D3D', 'Charcoal', 499, 'accessory', { sizes: ['One Size'] })],
      },
      socks: {
        id: 'socks', label: 'Socks', type: 'accessory',
        desc: 'Fine-gauge socks for formal and casual wear',
        items: [product('AC-SK01', 'Merino Dress Socks', '#1C2B4B', 'Navy', 599, 'accessory', { sizes: ['S', 'M', 'L'], mat: 'Merino Wool' })],
      },
      rings: {
        id: 'rings', label: 'Rings', type: 'ring',
        desc: 'Minimal bands in sterling and brushed steel',
        items: [product('AC-RG01', 'Brushed Steel Ring', '#808080', 'Steel', 1999, 'ring', { sizes: ['8', '9', '10', '11'] })],
      },
      chain: {
        id: 'chain', label: 'Chains', type: 'chain',
        desc: 'Subtle chain accents for modern layering',
        items: [product('AC-CH01', 'Gold Cuban Chain', '#C8A966', 'Gold', 3499, 'chain', { sizes: ['One Size'] })],
      },
      bracelet: {
        id: 'bracelet', label: 'Bracelets', type: 'bracelet',
        desc: 'Leather and metal bracelets with refined finish',
        items: [product('AC-BR01', 'Leather Wrap Bracelet', '#9B5523', 'Cognac', 1499, 'bracelet', { sizes: ['One Size'] })],
      },
      stud: {
        id: 'stud', label: 'Studs', type: 'stud',
        desc: 'Discreet stud accents in polished metal',
        items: [product('AC-ST01', 'Silver Micro Stud', '#C0C0C0', 'Silver', 899, 'stud', { sizes: ['One Size'] })],
      },
    },
  },

  inner_ornament: {
    id: 'inner_ornament',
    label: 'Inner Ornament',
    tag: 'Foundation of Comfort',
    accent: '#9B8AA8',
    hero: 'Premium essentials beneath the surface',
    sections: {
      boxer_briefs: {
        id: 'boxer_briefs', label: 'Boxer Briefs', type: 'underwear',
        desc: 'Supportive boxer briefs in breathable cotton blends',
        items: [product('IO-BB01', 'Black Boxer Brief', '#0A0A0A', 'Black', 699, 'underwear', { mat: 'Cotton Modal Blend' })],
      },
      briefs: {
        id: 'briefs', label: 'Briefs', type: 'underwear',
        desc: 'Classic brief cut with soft waistband',
        items: [product('IO-BF01', 'Navy Classic Brief', '#1C3F6E', 'Navy', 599, 'underwear')],
      },
      trunks: {
        id: 'trunks', label: 'Trunks', type: 'underwear',
        desc: 'Mid-length trunks for everyday comfort',
        items: [product('IO-TR01', 'Grey Trunk Pack', '#808080', 'Grey', 799, 'underwear')],
      },
      thongs: {
        id: 'thongs', label: 'Thongs', type: 'underwear',
        desc: 'Minimal coverage with premium microfiber',
        items: [product('IO-TH01', 'Black Micro Thong', '#0A0A0A', 'Black', 499, 'underwear', { mat: 'Microfiber' })],
      },
      hipster_briefs: {
        id: 'hipster_briefs', label: 'Hipster Briefs', type: 'underwear',
        desc: 'Low-rise hipster fit in ultra-soft fabric',
        items: [product('IO-HB01', 'White Hipster Brief', '#F0EDE5', 'White', 649, 'underwear')],
      },
      thermal: {
        id: 'thermal', label: 'Thermal / Body Warmer', type: 'tshirt',
        desc: 'Insulating base layers for cold seasons',
        items: [
          product('IO-TM01', 'Charcoal Thermal Top', '#3D3D3D', 'Charcoal', 1299, 'tshirt', { mat: 'Thermal Knit', featured: true }),
          product('IO-TM02', 'Black Body Warmer', '#0A0A0A', 'Black', 1499, 'tshirt', { mat: 'Fleece-Lined Knit' }),
        ],
      },
      vneck: {
        id: 'vneck', label: 'V-Neck T-Shirt', type: 'tshirt',
        desc: 'Essential V-neck base layers',
        items: [product('IO-VN01', 'White V-Neck Tee', '#F0EDE5', 'White', 599, 'tshirt', { mat: '100% Cotton' })],
      },
      crew_neck: {
        id: 'crew_neck', label: 'Crew Neck T-Shirt', type: 'tshirt',
        desc: 'Classic crew neck undershirts',
        items: [product('IO-CN01', 'Grey Crew Neck Tee', '#808080', 'Grey', 549, 'tshirt')],
      },
      vest: {
        id: 'vest', label: 'Classic Sleeveless Vest', type: 'tshirt',
        desc: 'Sleeveless vests for layering under tailoring',
        items: [product('IO-VS01', 'White Sleeveless Vest', '#F2F0EA', 'White', 499, 'tshirt', { mat: '100% Cotton' })],
      },
    },
  },

  footwear: {
    id: 'footwear',
    label: 'Footwear',
    tag: 'Step Into Excellence',
    accent: '#7A8B99',
    hero: 'From boardroom to boulevard',
    sections: {
      formal_shoes: {
        id: 'formal_shoes', label: 'Formal Shoes', type: 'shoe',
        desc: 'Polished leather oxfords and derbies',
        items: [
          product('FW-FS01', 'Black Oxford', '#0A0A0A', 'Black', 6999, 'shoe', { sizes: ['7', '8', '9', '10', '11'], mat: 'Full-Grain Leather', featured: true }),
          product('FW-FS02', 'Tan Derby', '#C4A882', 'Tan', 6499, 'shoe', { sizes: ['8', '9', '10'] }),
        ],
      },
      casual_shoes: {
        id: 'casual_shoes', label: 'Casual Shoes', type: 'shoe',
        desc: 'Everyday leather and suede casuals',
        items: [product('FW-CS01', 'White Canvas Low-Top', '#E4E3DE', 'White', 2999, 'shoe', { sizes: ['6', '7', '8', '9', '10', '11'] })],
      },
      running_shoes: {
        id: 'running_shoes', label: 'Running Shoes', type: 'shoe',
        desc: 'Lightweight runners with responsive cushioning',
        items: [product('FW-RS01', 'Neon Runner', '#E8624A', 'Coral', 5499, 'shoe', { sizes: ['7', '8', '9', '10', '11'], mat: 'Engineered Mesh' })],
      },
      crocs: {
        id: 'crocs', label: 'Crocs', type: 'sandal',
        desc: 'Comfort clogs for leisure and travel',
        items: [product('FW-CR01', 'Graphite Comfort Clog', '#4A4A4A', 'Graphite', 2499, 'sandal', { sizes: ['6', '7', '8', '9', '10'] })],
      },
      sandals: {
        id: 'sandals', label: 'Sandals', type: 'sandal',
        desc: 'Premium leather sandals for warm climates',
        items: [product('FW-SD01', 'Tan Leather Sandal', '#C4A882', 'Tan', 1999, 'sandal', { sizes: ['7', '8', '9', '10'] })],
      },
      chappal: {
        id: 'chappal', label: 'Chappal', type: 'sandal',
        desc: 'Traditional craftsmanship meets modern comfort',
        items: [product('FW-CH01', 'Brown Leather Chappal', '#8B6914', 'Brown', 1299, 'sandal', { sizes: ['7', '8', '9', '10'] })],
      },
      slipper: {
        id: 'slipper', label: 'Slipper', type: 'sandal',
        desc: 'Indoor-outdoor slippers in soft materials',
        items: [product('FW-SL01', 'Charcoal Home Slipper', '#3D3D3D', 'Charcoal', 999, 'sandal', { sizes: ['7', '8', '9', '10'] })],
      },
      loafer: {
        id: 'loafer', label: 'Loafer', type: 'shoe',
        desc: 'Slip-on loafers for smart-casual dressing',
        items: [
          product('FW-LF01', 'Burgundy Penny Loafer', '#722F37', 'Burgundy', 5999, 'shoe', { sizes: ['8', '9', '10', '11'], featured: true }),
          product('FW-LF02', 'Black Tassel Loafer', '#0A0A0A', 'Black', 6299, 'shoe', { sizes: ['8', '9', '10'] }),
        ],
      },
      sneakers: {
        id: 'sneakers', label: 'Sneakers', type: 'shoe',
        desc: 'Premium sneakers for street and studio',
        items: [
          product('FW-SN01', 'Black Leather Sneaker', '#1A1A1A', 'Black', 4499, 'shoe', { sizes: ['7', '8', '9', '10'] }),
          product('FW-SN02', 'White Minimal Sneaker', '#E4E3DE', 'White', 4299, 'shoe', { sizes: ['7', '8', '9', '10', '11'], featured: true }),
        ],
      },
      boots: {
        id: 'boots', label: 'Boots', type: 'boot',
        desc: 'Chelsea and combat boots in premium leather',
        items: [product('FW-BT01', 'Chelsea Boot', '#0A0A0A', 'Black', 7999, 'boot', { sizes: ['8', '9', '10', '11'], mat: 'Calf Leather' })],
      },
      slide: {
        id: 'slide', label: 'Slide', type: 'sandal',
        desc: 'Minimal slides for poolside and lounge',
        items: [product('FW-SI01', 'Black Sport Slide', '#0A0A0A', 'Black', 1499, 'sandal', { sizes: ['7', '8', '9', '10'] })],
      },
      flip_flop: {
        id: 'flip_flop', label: 'Flip-Flop', type: 'sandal',
        desc: 'Classic flip-flops with cushioned footbed',
        items: [product('FW-FF01', 'Navy Flip-Flop', '#1C3F6E', 'Navy', 799, 'sandal', { sizes: ['7', '8', '9', '10'] })],
      },
    },
  },
};

/** @returns {Product[]} */
export function getAllProducts() {
  return Object.values(CATEGORIES).flatMap((cat) =>
    Object.values(cat.sections).flatMap((sec) =>
      sec.items.map((item) => ({
        ...item,
        categoryId: cat.id,
        categoryLabel: cat.label,
        sectionId: sec.id,
        sectionLabel: sec.label,
        accent: cat.accent,
      }))
    )
  );
}

/** @returns {Product[]} */
export function getFeaturedProducts() {
  return getAllProducts().filter((p) => p.featured);
}

/**
 * @param {string} categoryId
 * @param {string} productId
 */
export function getProduct(categoryId, productId) {
  const category = CATEGORIES[categoryId];
  if (!category) return null;

  for (const section of Object.values(category.sections)) {
    const found = section.items.find((item) => item.id === productId);
    if (found) {
      return {
        ...found,
        categoryId: category.id,
        categoryLabel: category.label,
        sectionId: section.id,
        sectionLabel: section.label,
        accent: category.accent,
      };
    }
  }
  return null;
}

/** @param {string} categoryId */
export function getCategory(categoryId) {
  return CATEGORIES[categoryId] ?? null;
}

/** @param {string} categoryId @param {string} sectionId */
export function getSection(categoryId, sectionId) {
  const category = CATEGORIES[categoryId];
  if (!category) return null;
  const section = category.sections[sectionId];
  if (!section) return null;
  return { category, section };
}

/** @param {string} categoryId @param {string} [sectionId] */
export function categoryUrl(categoryId, sectionId) {
  const category = CATEGORIES[categoryId];
  const section = sectionId ?? (category ? Object.keys(category.sections)[0] : null);
  return section ? `/shop/${categoryId}?section=${section}` : `/shop/${categoryId}`;
}

/** @param {string} categoryId @param {string} productId */
export function getRelatedProducts(categoryId, productId, limit = 4) {
  return getAllProducts()
    .filter((p) => p.categoryId === categoryId && p.id !== productId)
    .slice(0, limit);
}
