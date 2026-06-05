import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────
//  PRODUCT DATA
// ─────────────────────────────────────────────────────────────
const CATS = {
  casual: {
    id:"casual", label:"Casual", tag:"Effortless Style", accent:"#C8A966",
    sections:{
      chinos:{ id:"chinos", label:"Chinos", type:"pants",
        desc:"Refined casual trousers crafted for the modern wardrobe",
        items:[
          {id:"CH01",name:"Slim Khaki Chinos",color:"#C4A882",colorName:"Khaki",price:2499,sizes:["28","30","32","34","36"],stock:12,mat:"98% Cotton, 2% Elastane"},
          {id:"CH02",name:"Olive Stretch Chinos",color:"#6B7B3A",colorName:"Olive",price:2799,sizes:["30","32","34","36"],stock:4,mat:"97% Cotton, 3% Elastane"},
          {id:"CH03",name:"Navy Classic Chinos",color:"#1C2B4B",colorName:"Navy",price:2599,sizes:["28","30","32","34"],stock:15,mat:"100% Cotton"},
          {id:"CH04",name:"Charcoal Slim Chinos",color:"#4A4A4A",colorName:"Charcoal",price:2699,sizes:["30","32","34","36","38"],stock:2,mat:"96% Cotton, 4% Elastane"},
          {id:"CH05",name:"Beige Relaxed Chinos",color:"#D4C5A9",colorName:"Beige",price:2399,sizes:["28","30","32","34"],stock:9,mat:"100% Cotton"},
          {id:"CH06",name:"Black Slim Chinos",color:"#1A1A1A",colorName:"Black",price:2699,sizes:["30","32","34","36"],stock:11,mat:"Stretch Cotton"},
        ]},
      tshirts:{ id:"tshirts", label:"T-Shirts", type:"tshirt",
        desc:"Premium cotton tees built for everyday versatility",
        items:[
          {id:"TS01",name:"Classic White Tee",color:"#E6E4DE",colorName:"White",price:799,sizes:["S","M","L","XL"],stock:25,mat:"100% Pima Cotton"},
          {id:"TS02",name:"Charcoal Crew Tee",color:"#3D3D3D",colorName:"Charcoal",price:899,sizes:["S","M","L","XL","XXL"],stock:18,mat:"100% Cotton"},
          {id:"TS03",name:"Navy Tee",color:"#1C3F6E",colorName:"Navy",price:999,sizes:["M","L","XL"],stock:10,mat:"100% Cotton"},
          {id:"TS04",name:"Sage Green Tee",color:"#7D9F7A",colorName:"Sage",price:849,sizes:["S","M","L"],stock:7,mat:"Organic Cotton"},
          {id:"TS05",name:"Rust Tee",color:"#9B4523",colorName:"Rust",price:1099,sizes:["S","M","L","XL"],stock:14,mat:"100% Cotton"},
        ]},
      polo:{ id:"polo", label:"Polo Shirts", type:"polo",
        desc:"Smart-casual polo shirts in premium piqué cotton",
        items:[
          {id:"PL01",name:"Classic Navy Polo",color:"#1F3A5F",colorName:"Navy",price:1499,sizes:["S","M","L","XL"],stock:14,mat:"100% Piqué Cotton"},
          {id:"PL02",name:"Forest Green Polo",color:"#2D5A3D",colorName:"Forest",price:1599,sizes:["M","L","XL"],stock:9,mat:"100% Cotton"},
          {id:"PL03",name:"Burgundy Polo",color:"#722F37",colorName:"Burgundy",price:1699,sizes:["S","M","L","XL","XXL"],stock:11,mat:"Piqué Cotton"},
          {id:"PL04",name:"White Piqué Polo",color:"#E8E7E2",colorName:"White",price:1449,sizes:["M","L","XL"],stock:3,mat:"100% Cotton"},
        ]},
      shirts:{ id:"shirts", label:"Casual Shirts", type:"shirt",
        desc:"Relaxed-fit shirts for weekend and beyond",
        items:[
          {id:"CS01",name:"Oxford Blue Check",color:"#4A7AB5",colorName:"Blue",price:1899,sizes:["S","M","L","XL"],stock:8,mat:"100% Oxford Cotton"},
          {id:"CS02",name:"White Linen Shirt",color:"#F0EDE5",colorName:"White",price:2199,sizes:["M","L","XL"],stock:12,mat:"100% Linen"},
          {id:"CS03",name:"Sage Flannel Shirt",color:"#8FAF8E",colorName:"Sage",price:1999,sizes:["S","M","L","XL"],stock:6,mat:"Brushed Flannel"},
          {id:"CS04",name:"Rust Chambray",color:"#8B4513",colorName:"Rust",price:1799,sizes:["M","L","XL","XXL"],stock:10,mat:"Chambray Cotton"},
        ]},
      shorts:{ id:"shorts", label:"Shorts", type:"shorts",
        desc:"Comfortable shorts for warm-weather versatility",
        items:[
          {id:"SH01",name:"Khaki Chino Shorts",color:"#B5A17A",colorName:"Khaki",price:1299,sizes:["S","M","L","XL"],stock:15,mat:"98% Cotton"},
          {id:"SH02",name:"Navy Board Shorts",color:"#1C3F6E",colorName:"Navy",price:1199,sizes:["M","L","XL"],stock:11,mat:"Quick-Dry Nylon"},
          {id:"SH03",name:"Olive Cargo Shorts",color:"#6B7B3A",colorName:"Olive",price:1399,sizes:["S","M","L"],stock:20,mat:"100% Cotton"},
        ]},
      sneakers:{ id:"sneakers", label:"Sneakers", type:"shoe",
        desc:"Premium casual footwear for the style-conscious",
        items:[
          {id:"SK01",name:"White Canvas Low-Top",color:"#E4E3DE",colorName:"White",price:2999,sizes:["6","7","8","9","10","11"],stock:9,mat:"Canvas Upper"},
          {id:"SK02",name:"Black Leather Sneaker",color:"#1A1A1A",colorName:"Black",price:3499,sizes:["7","8","9","10"],stock:5,mat:"Leather Upper"},
          {id:"SK03",name:"Grey Mesh Runner",color:"#808080",colorName:"Grey",price:3299,sizes:["8","9","10","11"],stock:13,mat:"Technical Mesh"},
        ]},
    }
  },
  formal: {
    id:"formal", label:"Formal", tag:"Sophisticated Authority", accent:"#B8A898",
    sections:{
      suits:{ id:"suits", label:"Suits", type:"suit",
        desc:"Masterfully tailored suits for the discerning gentleman",
        items:[
          {id:"SU01",name:"Charcoal Slim Suit",color:"#3D3D3D",colorName:"Charcoal",price:12999,sizes:["38","40","42","44"],stock:4,mat:"Super 120s Wool"},
          {id:"SU02",name:"Navy Pinstripe Suit",color:"#1C2B4B",colorName:"Navy",price:14999,sizes:["38","40","42"],stock:3,mat:"Pure Wool"},
          {id:"SU03",name:"Black Tuxedo",color:"#0F0F0F",colorName:"Black",price:18999,sizes:["38","40","42","44","46"],stock:6,mat:"Satin-Lapel Wool"},
          {id:"SU04",name:"Mid-Grey Suit",color:"#7A7A7A",colorName:"Grey",price:11999,sizes:["38","40","42","44"],stock:5,mat:"Wool Blend"},
        ]},
      trousers:{ id:"trousers", label:"Trousers", type:"pants",
        desc:"Precision-cut formal trousers for every occasion",
        items:[
          {id:"TR01",name:"Charcoal Dress Trousers",color:"#3D3D3D",colorName:"Charcoal",price:3499,sizes:["28","30","32","34","36"],stock:10,mat:"Wool Blend"},
          {id:"TR02",name:"Navy Formal Trousers",color:"#1C2B4B",colorName:"Navy",price:3299,sizes:["30","32","34"],stock:8,mat:"Pure Wool"},
          {id:"TR03",name:"Black Slim Trousers",color:"#0F0F0F",colorName:"Black",price:3699,sizes:["30","32","34","36"],stock:12,mat:"Stretch Wool"},
        ]},
      blazers:{ id:"blazers", label:"Blazers", type:"blazer",
        desc:"Distinguished blazers crafted to command every room",
        items:[
          {id:"BL01",name:"Navy Wool Blazer",color:"#1C2B4B",colorName:"Navy",price:7999,sizes:["S","M","L","XL"],stock:7,mat:"Premium Wool"},
          {id:"BL02",name:"Charcoal Blazer",color:"#3D3D3D",colorName:"Charcoal",price:8499,sizes:["M","L","XL"],stock:5,mat:"Wool Blend"},
          {id:"BL03",name:"Camel Sport Coat",color:"#C19A6B",colorName:"Camel",price:6999,sizes:["S","M","L"],stock:4,mat:"Cashmere Blend"},
        ]},
      dress_shirts:{ id:"dress_shirts", label:"Dress Shirts", type:"shirt",
        desc:"Impeccably crafted dress shirts for formal occasions",
        items:[
          {id:"DS01",name:"White Dress Shirt",color:"#F2F0EA",colorName:"White",price:2999,sizes:["S","M","L","XL"],stock:18,mat:"Egyptian Cotton"},
          {id:"DS02",name:"Light Blue Oxford",color:"#97BAD0",colorName:"Blue",price:2799,sizes:["M","L","XL"],stock:12,mat:"100% Cotton"},
          {id:"DS03",name:"French Cuff Stripe",color:"#DCDCDC",colorName:"Pearl",price:3499,sizes:["M","L","XL","XXL"],stock:2,mat:"Sea Island Cotton"},
        ]},
    }
  },
  sport: {
    id:"sport", label:"Sport", tag:"Performance Meets Style", accent:"#E8624A",
    sections:{
      joggers:{ id:"joggers", label:"Joggers", type:"joggers",
        desc:"Technical joggers engineered for performance and comfort",
        items:[
          {id:"JG01",name:"Black Tapered Joggers",color:"#0A0A0A",colorName:"Black",price:1999,sizes:["S","M","L","XL"],stock:20,mat:"Tech Fleece"},
          {id:"JG02",name:"Grey Marl Joggers",color:"#808080",colorName:"Grey",price:1799,sizes:["M","L","XL"],stock:15,mat:"French Terry"},
          {id:"JG03",name:"Navy Slim Joggers",color:"#1C3F6E",colorName:"Navy",price:1899,sizes:["S","M","L","XL","XXL"],stock:12,mat:"Performance Cotton"},
        ]},
      active_tees:{ id:"active_tees", label:"Active Tees", type:"tshirt",
        desc:"High-performance tees designed for training and beyond",
        items:[
          {id:"AT01",name:"Black Dri-Fit Tee",color:"#0A0A0A",colorName:"Black",price:1299,sizes:["S","M","L","XL"],stock:22,mat:"Performance Poly"},
          {id:"AT02",name:"White Compression Tee",color:"#F0F0EC",colorName:"White",price:1499,sizes:["M","L","XL"],stock:16,mat:"4-Way Stretch"},
          {id:"AT03",name:"Navy Training Tee",color:"#1C3F6E",colorName:"Navy",price:999,sizes:["S","M","L","XL"],stock:18,mat:"Dri-Fit Poly"},
        ]},
      sport_shorts:{ id:"sport_shorts", label:"Sport Shorts", type:"shorts",
        desc:"Functional training shorts with advanced technical fabrics",
        items:[
          {id:"SS01",name:"Black Training Shorts",color:"#0A0A0A",colorName:"Black",price:1299,sizes:["S","M","L","XL"],stock:18,mat:"Performance Nylon"},
          {id:"SS02",name:"Grey Running Shorts",color:"#707070",colorName:"Grey",price:1199,sizes:["M","L","XL"],stock:14,mat:"Lightweight Mesh"},
          {id:"SS03",name:"Navy Gym Shorts",color:"#1C3F6E",colorName:"Navy",price:1099,sizes:["S","M","L"],stock:20,mat:"Quick-Dry Poly"},
        ]},
    }
  },
  accessories: {
    id:"accessories", label:"Accessories", tag:"The Finishing Touch", accent:"#D4AF37",
    sections:{
      belts:{ id:"belts", label:"Belts", type:"belt",
        desc:"Handcrafted leather belts that complete every ensemble",
        items:[
          {id:"BE01",name:"Black Dress Belt",color:"#0F0F0F",colorName:"Black",price:1299,sizes:["32","34","36","38"],stock:20,mat:"Full-Grain Leather"},
          {id:"BE02",name:"Tan Braided Belt",color:"#8B6914",colorName:"Tan",price:1499,sizes:["32","34","36"],stock:12,mat:"Braided Leather"},
          {id:"BE03",name:"Cognac Dress Belt",color:"#9B5523",colorName:"Cognac",price:1699,sizes:["32","34","36","38","40"],stock:8,mat:"Calfskin Leather"},
        ]},
      ties:{ id:"ties", label:"Ties", type:"tie",
        desc:"Silk ties woven for distinguished occasions",
        items:[
          {id:"TI01",name:"Burgundy Silk Tie",color:"#722F37",colorName:"Burgundy",price:1599,sizes:["One Size"],stock:8,mat:"100% Silk"},
          {id:"TI02",name:"Navy Silk Tie",color:"#1C3F6E",colorName:"Navy",price:1699,sizes:["One Size"],stock:11,mat:"100% Silk"},
          {id:"TI03",name:"Charcoal Knit Tie",color:"#3D3D3D",colorName:"Charcoal",price:1399,sizes:["One Size"],stock:14,mat:"Silk Knit"},
        ]},
      wallets:{ id:"wallets", label:"Wallets", type:"wallet",
        desc:"Slim leather wallets crafted for the modern gentleman",
        items:[
          {id:"WA01",name:"Slim Black Wallet",color:"#0F0F0F",colorName:"Black",price:1999,sizes:["One Size"],stock:15,mat:"Full-Grain Leather"},
          {id:"WA02",name:"Tan Bifold Wallet",color:"#C4A67A",colorName:"Tan",price:2299,sizes:["One Size"],stock:10,mat:"Veg-Tanned Leather"},
        ]},
    }
  }
};

// ─────────────────────────────────────────────────────────────
//  SVG PRODUCT IMAGE GENERATOR
// ─────────────────────────────────────────────────────────────
function generateProductSVG(type, color) {
  const svgsByType = {
    pants: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="60" height="50" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="35" cy="60" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="65" cy="60" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="28" y="68" width="10" height="40" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="62" y="68" width="10" height="40" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="26" y="108" width="14" height="8" fill="#666" stroke="#333" stroke-width="0.5"/>
      <rect x="60" y="108" width="14" height="8" fill="#666" stroke="#333" stroke-width="0.5"/>
    </svg>`,
    trousers: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="60" height="55" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="35" cy="65" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="65" cy="65" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="27" y="73" width="12" height="45" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="61" y="73" width="12" height="45" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="25" y="118" width="16" height="10" fill="#555" stroke="#333" stroke-width="0.5"/>
      <rect x="59" y="118" width="16" height="10" fill="#555" stroke="#333" stroke-width="0.5"/>
    </svg>`,
    joggers: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="60" height="50" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="35" cy="60" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="65" cy="60" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 30 68 Q 28 100 32 130" stroke="${color}" stroke-width="10" fill="none"/>
      <path d="M 70 68 Q 72 100 68 130" stroke="${color}" stroke-width="10" fill="none"/>
      <ellipse cx="32" cy="130" rx="6" ry="8" fill="#666" stroke="#333" stroke-width="0.5"/>
      <ellipse cx="68" cy="130" rx="6" ry="8" fill="#666" stroke="#333" stroke-width="0.5"/>
    </svg>`,
    shorts: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="60" height="50" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="35" cy="60" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="65" cy="60" r="8" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="28" y="68" width="12" height="35" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="60" y="68" width="12" height="35" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="26" y="103" width="16" height="6" fill="#666" stroke="#333" stroke-width="0.5"/>
      <rect x="58" y="103" width="16" height="6" fill="#666" stroke="#333" stroke-width="0.5"/>
    </svg>`,
    tshirt: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="50" height="55" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="15" y="35" width="15" height="30" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="70" y="35" width="15" height="30" fill="${color}" stroke="#333" stroke-width="1"/>
      <polygon points="35,70 50,80 65,70" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 45 15 Q 50 5 55 15" stroke="#333" stroke-width="1" fill="none"/>
    </svg>`,
    polo: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="50" height="55" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="15" y="35" width="15" height="30" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="70" y="35" width="15" height="30" fill="${color}" stroke="#333" stroke-width="1"/>
      <polygon points="45,12 50,5 55,12" fill="#333"/>
      <line x1="50" y1="12" x2="50" y2="22" stroke="#333" stroke-width="1"/>
      <polygon points="35,70 50,80 65,70" fill="${color}" stroke="#333" stroke-width="1"/>
    </svg>`,
    shirt: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="50" height="60" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="10" y="35" width="20" height="40" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="70" y="35" width="20" height="40" fill="${color}" stroke="#333" stroke-width="1"/>
      <polygon points="45,12 50,5 55,12" fill="#333"/>
      <line x1="50" y1="12" x2="50" y2="75" stroke="#333" stroke-width="1"/>
      <circle cx="50" cy="25" r="2" fill="#666"/>
      <circle cx="50" cy="35" r="2" fill="#666"/>
      <polygon points="35,75 50,85 65,75" fill="${color}" stroke="#333" stroke-width="1"/>
    </svg>`,
    blazer: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 15 L 25 50 L 20 80 Q 20 100 30 120 L 35 120 Q 40 100 40 80 L 45 40 L 50 15 Z" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 70 15 L 75 50 L 80 80 Q 80 100 70 120 L 65 120 Q 60 100 60 80 L 55 40 L 50 15 Z" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 45 40 L 55 40 L 52 100 L 48 100 Z" fill="${color}" stroke="#333" stroke-width="1"/>
      <circle cx="48" cy="60" r="1.5" fill="#666"/>
      <circle cx="52" cy="60" r="1.5" fill="#666"/>
    </svg>`,
    suit: `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 15 L 25 50 L 20 85 Q 18 110 25 140 L 32 145 Q 38 115 40 85 L 45 40 L 50 15 Z" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 70 15 L 75 50 L 80 85 Q 82 110 75 140 L 68 145 Q 62 115 60 85 L 55 40 L 50 15 Z" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="45" y="40" width="10" height="60" fill="${color}" stroke="#333" stroke-width="1"/>
      <rect x="28" y="70" width="6" height="30" fill="#1a1a1a" stroke="#333" stroke-width="0.5"/>
      <circle cx="48" cy="58" r="1" fill="#999"/>
      <circle cx="52" cy="58" r="1" fill="#999"/>
    </svg>`,
    shoe: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="50" rx="20" ry="15" fill="${color}" stroke="#333" stroke-width="1"/>
      <ellipse cx="65" cy="50" rx="20" ry="15" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 20 45 Q 25 30 35 35" stroke="${color}" stroke-width="8" fill="none"/>
      <path d="M 50 45 Q 55 30 65 35" stroke="${color}" stroke-width="8" fill="none"/>
      <ellipse cx="35" cy="65" rx="18" ry="6" fill="#1a1a1a" opacity="0.3"/>
      <ellipse cx="65" cy="65" rx="18" ry="6" fill="#1a1a1a" opacity="0.3"/>
    </svg>`,
    wallet: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="70" height="50" fill="${color}" stroke="#333" stroke-width="1" rx="3"/>
      <rect x="18" y="25" width="64" height="15" fill="none" stroke="#555" stroke-width="0.5" stroke-dasharray="2,2"/>
      <rect x="75" y="35" width="8" height="15" fill="#666" stroke="#333" stroke-width="0.5" rx="1"/>
      <line x1="20" y1="45" x2="70" y2="45" stroke="#555" stroke-width="0.5" opacity="0.5"/>
    </svg>`,
    belt: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="20" fill="${color}" stroke="#333" stroke-width="1" rx="2"/>
      <circle cx="85" cy="30" r="6" fill="none" stroke="#666" stroke-width="1"/>
      <rect x="80" y="26" width="10" height="8" fill="#888" stroke="#333" stroke-width="0.5"/>
    </svg>`,
    tie: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M 42 10 L 45 60 L 40 70 L 50 90 L 60 70 L 55 60 L 58 10 Z" fill="${color}" stroke="#333" stroke-width="1"/>
      <path d="M 48 10 L 50 50 L 52 10 Z" fill="#1a1a1a" opacity="0.15"/>
    </svg>`
  };

  return svgsByType[type] || svgsByType.tshirt;
}

// ─────────────────────────────────────────────────────────────
//  THREE.JS MODEL BUILDER
// ─────────────────────────────────────────────────────────────
function buildModel(type, colorHex) {
  const group = new THREE.Group();
  const c = new THREE.Color(colorHex);
  const mat = new THREE.MeshPhongMaterial({ color: c.clone(), shininess: 22, specular: new THREE.Color(0x333333) });
  const dkMat = new THREE.MeshPhongMaterial({ color: c.clone().multiplyScalar(0.55), shininess: 35 });
  const goldMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xB8930C), shininess: 120, specular: new THREE.Color(0x999999) });
  const whiteMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xCCCCCC), shininess: 80 });

  const mk = (geo, m, px=0, py=0, pz=0, rx=0, ry=0, rz=0) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(px, py, pz);
    mesh.rotation.set(rx, ry, rz);
    group.add(mesh);
    return mesh;
  };

  if (type === 'pants' || type === 'trousers') {
    mk(new THREE.CylinderGeometry(0.5,0.5,0.11,24), dkMat, 0,1.18,0);
    mk(new THREE.CylinderGeometry(0.52,0.57,0.44,24), mat, 0,0.86,0);
    mk(new THREE.CylinderGeometry(0.25,0.18,1.52,16), mat, -0.24,-0.12,0);
    mk(new THREE.CylinderGeometry(0.25,0.18,1.52,16), mat, 0.24,-0.12,0);
    for(let i=0;i<5;i++){const a=(i/5)*Math.PI*2+0.3;mk(new THREE.BoxGeometry(0.04,0.13,0.04),dkMat,Math.cos(a)*0.54,1.12,Math.sin(a)*0.54);}
  }

  else if (type === 'joggers') {
    mk(new THREE.CylinderGeometry(0.5,0.5,0.11,24), dkMat, 0,1.18,0);
    mk(new THREE.CylinderGeometry(0.52,0.57,0.44,24), mat, 0,0.86,0);
    mk(new THREE.CylinderGeometry(0.26,0.2,1.52,16), mat, -0.24,-0.12,0);
    mk(new THREE.CylinderGeometry(0.26,0.2,1.52,16), mat, 0.24,-0.12,0);
    // Elastic cuffs
    mk(new THREE.CylinderGeometry(0.21,0.21,0.13,16), dkMat, -0.24,-0.92,0);
    mk(new THREE.CylinderGeometry(0.21,0.21,0.13,16), dkMat, 0.24,-0.92,0);
    // Drawstring
    mk(new THREE.BoxGeometry(0.08,0.28,0.04), dkMat, 0,1.06,0.5);
  }

  else if (type === 'shorts') {
    mk(new THREE.CylinderGeometry(0.5,0.5,0.11,24), dkMat, 0,1.18,0);
    mk(new THREE.CylinderGeometry(0.52,0.56,0.44,24), mat, 0,0.86,0);
    mk(new THREE.CylinderGeometry(0.26,0.23,0.75,16), mat, -0.24,0.44,0);
    mk(new THREE.CylinderGeometry(0.26,0.23,0.75,16), mat, 0.24,0.44,0);
    group.position.y = -0.35;
  }

  else if (type === 'tshirt') {
    mk(new THREE.CylinderGeometry(0.4,0.37,1.1,20), mat, 0,0.06,0);
    mk(new THREE.CylinderGeometry(0.47,0.43,0.2,20), mat, 0,0.7,0);
    mk(new THREE.TorusGeometry(0.2,0.042,8,20), mat, 0,0.86,0, Math.PI/2,0,0);
    // Short sleeves
    mk(new THREE.CylinderGeometry(0.17,0.15,0.38,12), mat, -0.55,0.66,0, 0,0,Math.PI/2.8);
    mk(new THREE.CylinderGeometry(0.17,0.15,0.38,12), mat, 0.55,0.66,0, 0,0,-Math.PI/2.8);
  }

  else if (type === 'polo') {
    mk(new THREE.CylinderGeometry(0.4,0.37,1.1,20), mat, 0,0.06,0);
    mk(new THREE.CylinderGeometry(0.47,0.43,0.2,20), mat, 0,0.7,0);
    mk(new THREE.TorusGeometry(0.2,0.042,8,20), dkMat, 0,0.86,0, Math.PI/2,0,0);
    // Polo collar
    mk(new THREE.BoxGeometry(0.2,0.2,0.04), mat, -0.07,0.94,0.3, -0.3,0,0);
    mk(new THREE.BoxGeometry(0.2,0.2,0.04), mat, 0.07,0.94,0.3, -0.3,0,0);
    // Placket
    mk(new THREE.BoxGeometry(0.05,0.32,0.05), dkMat, 0,0.74,0.39);
    // Short sleeves
    mk(new THREE.CylinderGeometry(0.17,0.15,0.38,12), mat, -0.55,0.66,0, 0,0,Math.PI/2.8);
    mk(new THREE.CylinderGeometry(0.17,0.15,0.38,12), mat, 0.55,0.66,0, 0,0,-Math.PI/2.8);
  }

  else if (type === 'shirt') {
    mk(new THREE.CylinderGeometry(0.4,0.37,1.1,20), mat, 0,0.06,0);
    mk(new THREE.CylinderGeometry(0.47,0.43,0.2,20), mat, 0,0.72,0);
    // Long sleeves
    mk(new THREE.CylinderGeometry(0.155,0.125,0.9,12), mat, -0.58,0.37,0, 0,0,Math.PI/5.5);
    mk(new THREE.CylinderGeometry(0.155,0.125,0.9,12), mat, 0.58,0.37,0, 0,0,-Math.PI/5.5);
    // Collar flaps
    mk(new THREE.BoxGeometry(0.22,0.22,0.04), mat, -0.1,0.95,0.3, -0.2,0.3,0);
    mk(new THREE.BoxGeometry(0.22,0.22,0.04), mat, 0.1,0.95,0.3, -0.2,-0.3,0);
    // Buttons
    for(let i=0;i<5;i++) mk(new THREE.CylinderGeometry(0.024,0.024,0.03,8),whiteMat,0,0.65-i*0.2,0.4,Math.PI/2,0,0);
    // Cuffs
    mk(new THREE.CylinderGeometry(0.13,0.13,0.1,12), dkMat, -0.76,0.03,0, 0,0,Math.PI/5.5);
    mk(new THREE.CylinderGeometry(0.13,0.13,0.1,12), dkMat, 0.76,0.03,0, 0,0,-Math.PI/5.5);
  }

  else if (type === 'blazer' || type === 'suit') {
    mk(new THREE.CylinderGeometry(0.5,0.46,1.2,20), mat, 0,0.1,0);
    mk(new THREE.CylinderGeometry(0.6,0.54,0.24,20), mat, 0,0.8,0);
    const lapMat = new THREE.MeshPhongMaterial({color:c.clone().multiplyScalar(0.82),shininess:28});
    mk(new THREE.BoxGeometry(0.23,0.5,0.06), lapMat, -0.2,0.6,0.39, 0,-0.35,0);
    mk(new THREE.BoxGeometry(0.23,0.5,0.06), lapMat, 0.2,0.6,0.39, 0,0.35,0);
    mk(new THREE.BoxGeometry(0.2,0.22,0.05), dkMat, -0.09,0.97,0.35, -0.2,0,0);
    mk(new THREE.BoxGeometry(0.2,0.22,0.05), dkMat, 0.09,0.97,0.35, -0.2,0,0);
    if(type==='suit') mk(new THREE.BoxGeometry(0.1,0.09,0.03), new THREE.MeshPhongMaterial({color:0xF8F8F8}), -0.38,0.68,0.43);
    // Long sleeves
    mk(new THREE.CylinderGeometry(0.17,0.14,1.02,12), mat, -0.68,0.33,0, 0,0,Math.PI/6);
    mk(new THREE.CylinderGeometry(0.17,0.14,1.02,12), mat, 0.68,0.33,0, 0,0,-Math.PI/6);
    // Sleeve buttons
    for(let i=0;i<2;i++){
      mk(new THREE.CylinderGeometry(0.03,0.03,0.04,8),new THREE.MeshPhongMaterial({color:c.clone().multiplyScalar(0.4),shininess:80}),-0.94,-0.13+i*0.12,0,0,0,Math.PI/6);
      mk(new THREE.CylinderGeometry(0.03,0.03,0.04,8),new THREE.MeshPhongMaterial({color:c.clone().multiplyScalar(0.4),shininess:80}),0.94,-0.13+i*0.12,0,0,0,-Math.PI/6);
    }
    // Front buttons
    for(let i=0;i<2;i++) mk(new THREE.CylinderGeometry(0.035,0.035,0.04,8),new THREE.MeshPhongMaterial({color:c.clone().multiplyScalar(0.4),shininess:80}),0,0.32-i*0.2,0.49,Math.PI/2,0,0);
  }

  else if (type === 'belt') {
    mk(new THREE.TorusGeometry(0.65,0.042,8,44,Math.PI*1.85), mat, 0,0,0, Math.PI/2,0,0);
    mk(new THREE.BoxGeometry(0.18,0.12,0.04), goldMat, 0.71,0,0);
    mk(new THREE.CylinderGeometry(0.015,0.015,0.15,8), goldMat, 0.71,0,0, 0,0,Math.PI/2);
    group.scale.setScalar(1.35);
    group.rotation.x = 0.22;
  }

  else if (type === 'tie') {
    mk(new THREE.BoxGeometry(0.115,1.55,0.03), mat, 0,-0.28,0);
    // Pointed tip (cone pointing down = rotate PI on x)
    mk(new THREE.ConeGeometry(0.082,0.22,4), mat, 0,-1.16,0, Math.PI,0,Math.PI/4);
    mk(new THREE.BoxGeometry(0.16,0.19,0.08), mat, 0,0.73,0);
    group.scale.setScalar(1.55);
  }

  else if (type === 'shoe') {
    mk(new THREE.BoxGeometry(0.46,0.1,1.15), new THREE.MeshPhongMaterial({color:0xBBBBAA,shininess:12}), 0,-0.7,0);
    mk(new THREE.BoxGeometry(0.41,0.29,0.88), mat, 0,-0.46,-0.08);
    const toe = new THREE.Mesh(new THREE.SphereGeometry(0.2,12,8), mat);
    toe.scale.set(1,0.7,1.25); toe.position.set(0,-0.46,0.43); group.add(toe);
    mk(new THREE.BoxGeometry(0.27,0.32,0.03), mat, 0,-0.22,0.06, -0.15,0,0);
    for(let i=0;i<4;i++) mk(new THREE.BoxGeometry(0.31,0.016,0.016),whiteMat,0,-0.3+i*0.056,0.07-i*0.03);
    group.scale.setScalar(1.45); group.position.y = 0.18;
  }

  else if (type === 'wallet') {
    mk(new THREE.BoxGeometry(0.9,0.65,0.15), mat);
    mk(new THREE.BoxGeometry(0.91,0.022,0.16), dkMat);
    mk(new THREE.BoxGeometry(0.56,0.33,0.022), new THREE.MeshPhongMaterial({color:0x888888,transparent:true,opacity:0.35}), 0.04,0.1,0.088);
    group.scale.setScalar(1.55);
  }

  else {
    mk(new THREE.BoxGeometry(0.8,1.2,0.4), mat);
  }

  return group;
}

// ─────────────────────────────────────────────────────────────
//  3D VIEWER COMPONENT
// ─────────────────────────────────────────────────────────────
function ThreeDViewer({ product, type }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || !product) return;
    const el = mountRef.current;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W/H, 0.1, 100);
    camera.position.set(0, 0.15, 3.65);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.32));
    const key = new THREE.DirectionalLight(0xFFF8F0, 1.3); key.position.set(2,4,3); scene.add(key);
    const fill = new THREE.DirectionalLight(0xD8E8FF, 0.38); fill.position.set(-3,1,2); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xFFE8B0, 0.45); rim.position.set(0,-2,-3); scene.add(rim);
    scene.add(Object.assign(new THREE.DirectionalLight(0xffffff,0.28), {position:{x:0,y:5,z:0}}));

    // Grid floor
    const grid = new THREE.GridHelper(3.5, 18, 0x2A2A2A, 0x1A1A1A);
    grid.position.y = -1.28;
    scene.add(grid);

    // Color glow disk under model
    const diskGeo = new THREE.CylinderGeometry(0.65,0.65,0.01,32);
    const diskMat = new THREE.MeshBasicMaterial({color: new THREE.Color(product.color).multiplyScalar(0.5), transparent:true, opacity:0.22});
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.position.y = -1.27;
    scene.add(disk);

    // Build the clothing model
    const group = buildModel(type, product.color);
    scene.add(group);

    // State for rotation
    let rotY = 0.3, rotX = 0;
    let dragging = false, prevX = 0, prevY = 0;
    let autoRotate = true, autoTimer = null;
    const raf = { id: null };

    const animate = () => {
      raf.id = requestAnimationFrame(animate);
      if (autoRotate) rotY += 0.007;
      group.rotation.y = rotY;
      group.rotation.x = rotX;
      renderer.render(scene, camera);
    };
    animate();

    // Event handlers stored as named functions for proper cleanup
    const handlers = {
      mousedown:(e) => { dragging=true; autoRotate=false; prevX=e.clientX; prevY=e.clientY; clearTimeout(autoTimer); renderer.domElement.style.cursor='grabbing'; },
      mousemove:(e) => { if(!dragging) return; rotY+=(e.clientX-prevX)*0.012; rotX=Math.max(-0.45,Math.min(0.45,rotX+(e.clientY-prevY)*0.008)); prevX=e.clientX; prevY=e.clientY; },
      mouseup:()   => { dragging=false; renderer.domElement.style.cursor='grab'; autoTimer=setTimeout(()=>{autoRotate=true;},2800); },
      touchstart:(e)=> { dragging=true; autoRotate=false; prevX=e.touches[0].clientX; prevY=e.touches[0].clientY; clearTimeout(autoTimer); e.preventDefault(); },
      touchmove:(e) => { if(!dragging)return; rotY+=(e.touches[0].clientX-prevX)*0.012; rotX=Math.max(-0.45,Math.min(0.45,rotX+(e.touches[0].clientY-prevY)*0.008)); prevX=e.touches[0].clientX; prevY=e.touches[0].clientY; e.preventDefault(); },
      touchend:()  => { dragging=false; autoTimer=setTimeout(()=>{autoRotate=true;},2800); },
    };

    const c = renderer.domElement;
    c.style.cursor = 'grab';
    c.addEventListener('mousedown',  handlers.mousedown);
    window.addEventListener('mousemove', handlers.mousemove);
    window.addEventListener('mouseup',   handlers.mouseup);
    c.addEventListener('touchstart', handlers.touchstart, {passive:false});
    window.addEventListener('touchmove',  handlers.touchmove, {passive:false});
    window.addEventListener('touchend',   handlers.touchend);

    return () => {
      cancelAnimationFrame(raf.id);
      clearTimeout(autoTimer);
      c.removeEventListener('mousedown',  handlers.mousedown);
      window.removeEventListener('mousemove', handlers.mousemove);
      window.removeEventListener('mouseup',   handlers.mouseup);
      c.removeEventListener('touchstart', handlers.touchstart);
      window.removeEventListener('touchmove',  handlers.touchmove);
      window.removeEventListener('touchend',   handlers.touchend);
      scene.traverse(obj => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m=>m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []); // key prop on parent handles product/type changes

  return <div ref={mountRef} style={{width:'100%',height:'100%'}} />;
}

// ─────────────────────────────────────────────────────────────
//  LOGO SPLASH SCREEN
// ─────────────────────────────────────────────────────────────
function LogoSplash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      width:'100%',height:'100vh',
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      background:'linear-gradient(135deg, #060606 0%, #1a1a1a 100%)',
      position:'fixed',top:0,left:0,zIndex:999,
    }}>
      <style>{`@keyframes fadeInOut { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }`}</style>
      <div style={{
        fontSize:'clamp(60px, 12vw, 120px)',
        fontFamily:"'Cormorant Garamond',serif",
        fontWeight:300,
        fontStyle:'italic',
        color:'#E8E4DC',
        letterSpacing:'0.15em',
        textAlign:'center',
        animation:'fadeInOut 3.5s ease-in-out',
        textShadow:'0 0 40px rgba(200,169,102,0.3)',
      }}>ELEGANCE</div>
      
      <p style={{
        marginTop:24,
        fontSize:11,
        fontFamily:"'Montserrat',sans-serif",
        letterSpacing:'0.35em',
        color:'rgba(200,169,102,0.6)',
        fontWeight:300,
        textTransform:'uppercase',
        animation:'fadeInOut 3.5s ease-in-out 0.3s',
      }}>Premium Menswear</p>

      <div style={{
        marginTop:40,
        width:40,height:1,
        background:'rgba(200,169,102,0.4)',
        animation:'fadeInOut 3.5s ease-in-out 0.5s',
      }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  CONTACT INFORMATION PAGE
// ─────────────────────────────────────────────────────────────
function ContactPage({ onBack }) {
  return (
    <div style={{paddingTop:'clamp(50px, 10vh, 60px)', minHeight:'100vh', background:'#060606'}}>
      <div style={{
        padding:'clamp(32px, 8vw, 52px) clamp(16px, 4vw, 48px) clamp(60px, 10vw, 100px)',maxWidth:1400,margin:'0 auto'
      }}>
        <button onClick={onBack} style={{
          background:'none',border:'none',cursor:'pointer',
          fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.32em',
          color:'rgba(200,169,102,0.45)',marginBottom:'clamp(20px, 4vw, 32px)',fontWeight:300,
          display:'flex',alignItems:'center',gap:7,padding:0
        }}>← BACK TO HOME</button>

        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(32px, 8vw, 80px)',
          fontWeight:300,fontStyle:'italic',color:'#E8E4DC',letterSpacing:'-0.01em',marginBottom:'clamp(8px, 1vw, 8px)',
          maxWidth:'90%'
        }}>
          Get in Touch</h1>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 11px)',
          color:'rgba(232,228,220,0.35)',letterSpacing:'0.12em',fontWeight:300,marginBottom:'clamp(32px, 5vw, 52px)'}}>
          We're here to help with any questions
        </p>

        {/* Main Layout: Info + Map - Responsive */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(clamp(280px, 100%, 400px),1fr))',gap:'clamp(24px, 5vw, 48px)',marginBottom:'clamp(32px, 5vw, 52px)'}}>
          {/* Contact Info */}
          <div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(18px, 5vw, 26px)',fontWeight:500,
              color:'#E8E4DC',marginBottom:'clamp(16px, 3vw, 28px)'}}>Contact Information</h3>
            
            <div style={{marginBottom:'clamp(16px, 3vw, 28px)'}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.2em',
                color:'rgba(200,169,102,0.6)',marginBottom:'clamp(4px, 1vw, 6px)',fontWeight:500,textTransform:'uppercase'}}>
                Email</p>
              <a href="mailto:hello@elegance.com" style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(12px, 2.5vw, 14px)',
                color:'#E8E4DC',fontWeight:300,textDecoration:'none',transition:'color 0.22s',cursor:'pointer',wordBreak:'break-all'}}
                onMouseOver={(e)=>e.target.style.color='#C8A966'}
                onMouseOut={(e)=>e.target.style.color='#E8E4DC'}>
                hello@elegance.com
              </a>
            </div>

            <div style={{marginBottom:'clamp(16px, 3vw, 28px)'}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.2em',
                color:'rgba(200,169,102,0.6)',marginBottom:'clamp(4px, 1vw, 6px)',fontWeight:500,textTransform:'uppercase'}}>
                Phone</p>
              <a href="tel:+18001234567" style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(12px, 2.5vw, 14px)',
                color:'#E8E4DC',fontWeight:300,textDecoration:'none',transition:'color 0.22s',cursor:'pointer'}}
                onMouseOver={(e)=>e.target.style.color='#C8A966'}
                onMouseOut={(e)=>e.target.style.color='#E8E4DC'}>
                +1 (800) 123-4567
              </a>
            </div>

            <div style={{marginBottom:'clamp(16px, 3vw, 28px)'}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.2em',
                color:'rgba(200,169,102,0.6)',marginBottom:'clamp(4px, 1vw, 6px)',fontWeight:500,textTransform:'uppercase'}}>
                Main Headquarters</p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(12px, 2.5vw, 14px)',
                color:'#E8E4DC',fontWeight:300,lineHeight:1.8}}>
                ELEGANCE Fashion Headquarters<br/>
                123 Fashion Avenue<br/>
                New York, NY 10001<br/>
                United States
              </p>
            </div>

            <div style={{marginBottom:'clamp(16px, 3vw, 28px)'}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.2em',
                color:'rgba(200,169,102,0.6)',marginBottom:'clamp(4px, 1vw, 6px)',fontWeight:500,textTransform:'uppercase'}}>
                Regional Office</p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(12px, 2.5vw, 14px)',
                color:'#E8E4DC',fontWeight:300,lineHeight:1.8}}>
                456 Luxury Lane<br/>
                Los Angeles, CA 90028<br/>
                United States
              </p>
            </div>

            <div style={{marginBottom:'clamp(16px, 3vw, 28px)'}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.2em',
                color:'rgba(200,169,102,0.6)',marginBottom:'clamp(4px, 1vw, 6px)',fontWeight:500,textTransform:'uppercase'}}>
                Business Hours</p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(12px, 2.5vw, 14px)',
                color:'#E8E4DC',fontWeight:300,lineHeight:1.8}}>
                Monday - Friday: 9am - 6pm EST<br/>
                Saturday: 10am - 4pm EST<br/>
                Sunday: Closed<br/>
                <span style={{color:'rgba(200,169,102,0.6)',fontSize:'clamp(10px, 2vw, 12px)',marginTop:8,display:'block'}}>Holidays: Closed</span>
              </p>
            </div>
          </div>

          {/* Map & Social */}
          <div>
            {/* Map Placeholder */}
            <div style={{
              width:'100%',height:'clamp(220px, 40vh, 340px)',background:'linear-gradient(135deg, rgba(200,169,102,0.05) 0%, rgba(200,169,102,0.02) 100%)',
              border:'1px solid rgba(200,169,102,0.2)',borderRadius:'2px',
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
              marginBottom:'clamp(20px, 3vw, 32px)',position:'relative',overflow:'hidden'
            }}>
              <svg width="clamp(40px, 10vw, 60px)" height="clamp(40px, 10vw, 60px)" viewBox="0 0 24 24" fill="none" stroke="rgba(200,169,102,0.5)" strokeWidth="1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3" fill="rgba(200,169,102,0.5)"/>
              </svg>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(10px, 2vw, 12px)',
                color:'rgba(200,169,102,0.4)',marginTop:'clamp(8px, 2vw, 12px)',fontWeight:300}}>
                Interactive Map Coming Soon
              </p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',
                color:'rgba(232,228,220,0.2)',marginTop:'clamp(2px, 1vw, 4px)',fontWeight:300}}>
                New York, NY 10001
              </p>
            </div>

            {/* Social Links */}
            <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px, 4vw, 20px)',fontWeight:500,
              color:'#E8E4DC',marginBottom:'clamp(12px, 2vw, 16px)'}}>Follow Us</h4>
            
            <div style={{display:'flex',flexDirection:'column',gap:'clamp(8px, 2vw, 10px)',marginBottom:'clamp(20px, 4vw, 32px)'}}>
              {[
                {name:'Instagram',handle:'@elegance.menswear'},
                {name:'Facebook',handle:'@elegancemenswear'},
                {name:'Twitter',handle:'@elegancemen'},
                {name:'LinkedIn',handle:'@elegance-menswear'}
              ].map(social => (
                <a key={social.name} href="#" style={{
                  fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(10px, 2vw, 12px)',
                  color:'rgba(200,169,102,0.6)',fontWeight:300,letterSpacing:'0.05em',
                  textDecoration:'none',transition:'color 0.22s',cursor:'pointer',
                  paddingBottom:'clamp(4px, 1vw, 6px)',borderBottom:'1px solid rgba(200,169,102,0.1)'
                }} onMouseOver={(e)=>e.target.style.color='#C8A966'}
                   onMouseOut={(e)=>e.target.style.color='rgba(200,169,102,0.6)'}
                >{social.name} <span style={{color:'rgba(232,228,220,0.3)',fontSize:'clamp(8px, 2vw, 10px)'}}>{social.handle}</span></a>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{padding:'clamp(16px, 3vw, 24px)',background:'rgba(200,169,102,0.05)',border:'1px solid rgba(200,169,102,0.15)',borderRadius:'2px'}}>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 11px)',fontWeight:500,
                color:'#E8E4DC',marginBottom:'clamp(8px, 2vw, 12px)',letterSpacing:'0.1em',textTransform:'uppercase'}}>
                Stay Updated</p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',
                color:'rgba(232,228,220,0.4)',fontWeight:300,lineHeight:1.6,marginBottom:'clamp(8px, 2vw, 12px)'}}>
                Subscribe for exclusive offers, new collections, and styling tips.
              </p>
              <input type="email" placeholder="Enter your email" style={{
                width:'100%',padding:'clamp(8px, 2vw, 10px) clamp(8px, 2vw, 12px)',marginBottom:'clamp(6px, 1vw, 8px)',
                background:'rgba(255,255,255,0.05)',border:'1px solid rgba(200,169,102,0.3)',
                color:'#E8E4DC',fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 12px)',
                outline:'none',transition:'border 0.22s',boxSizing:'border-box'
              }} onFocus={(e)=>e.target.style.borderColor='#C8A966'}
                 onBlur={(e)=>e.target.style.borderColor='rgba(200,169,102,0.3)'}/>
              <button style={{
                width:'100%',padding:'clamp(6px, 2vw, 8px) clamp(8px, 2vw, 12px)',
                background:'rgba(200,169,102,0.15)',border:'1px solid rgba(200,169,102,0.3)',
                color:'#C8A966',fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',fontWeight:500,
                letterSpacing:'0.1em',cursor:'pointer',transition:'all 0.22s',
                textTransform:'uppercase',boxSizing:'border-box'
              }} onMouseOver={(e)=>{e.target.style.background='rgba(200,169,102,0.25)'; e.target.style.borderColor='#C8A966'}}
                 onMouseOut={(e)=>{e.target.style.background='rgba(200,169,102,0.15)'; e.target.style.borderColor='rgba(200,169,102,0.3)'}}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  CUSTOMER REVIEWS SECTION
// ─────────────────────────────────────────────────────────────
function ReviewsSection() {
  const reviews = [
    {name:"James Mitchell",rating:5,comment:"Exceptional quality. The 3D viewer really helps in choosing the perfect fit."},
    {name:"Alexander Chen",rating:5,comment:"Premium materials and outstanding customer service. Highly recommend!"},
    {name:"Marcus Thompson",rating:5,comment:"The attention to detail is remarkable. Worth every penny."},
    {name:"David Rodriguez",rating:5,comment:"Best menswear shopping experience. Fast delivery too!"},
  ];

  return (
    <div style={{padding:'clamp(40px, 8vw, 70px) clamp(16px, 4vw, 48px)',maxWidth:1380,margin:'0 auto'}}>
      <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 9px)',letterSpacing:'0.38em',
        color:'rgba(200,169,102,0.45)',marginBottom:'clamp(20px, 4vw, 36px)',fontWeight:500,textTransform:'uppercase'}}>
        What Our Customers Say
      </p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(clamp(200px, 45vw, 280px),1fr))',gap:'clamp(16px, 3vw, 24px)'}}>
        {reviews.map((review,i)=>(
          <div key={i} style={{
            background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',
            padding:'clamp(16px, 4vw, 28px)',borderRadius:'4px',transition:'all 0.22s'
          }} onMouseOver={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
             onMouseOut={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.03)'}>
            <div style={{display:'flex',marginBottom:'clamp(8px, 2vw, 12px)',gap:3}}>
              {[...Array(review.rating)].map((_,i)=>(
                <span key={i} style={{fontSize:'clamp(12px, 2.5vw, 14px)',color:'#C8A966'}}>★</span>
              ))}
            </div>
            <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(10px, 2vw, 12px)',
              color:'rgba(232,228,220,0.7)',fontWeight:300,lineHeight:1.7,marginBottom:'clamp(8px, 2vw, 14px)'}}>
              "{review.comment}"</p>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px, 2vw, 13px)',
              color:'#E8E4DC',fontWeight:500}}>— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ onHome, path, cartCount, onContact }) {
  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:200,
      height:60,
      background:'rgba(5,5,5,0.96)',
      backdropFilter:'blur(14px)',
      borderBottom:'1px solid rgba(255,255,255,0.055)',
      padding:'0 36px',
      display:'flex',alignItems:'center',justifyContent:'space-between',
    }}>
      <button onClick={onHome} style={{
        background:'none',border:'none',cursor:'pointer',
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:20,fontWeight:600,letterSpacing:'0.18em',
        color:'#E8E4DC',padding:0
      }}>ELEGANCE</button>

      <div style={{display:'flex',alignItems:'center',gap:8,fontSize:11,
        fontFamily:"'Montserrat',sans-serif",fontWeight:300,letterSpacing:'0.08em',
        color:'rgba(232,228,220,0.35)'}}>
        {path.map((p,i)=>(
          <span key={i} style={{display:'flex',alignItems:'center',gap:8}}>
            {i>0 && <span style={{color:'rgba(200,169,102,0.35)'}}>›</span>}
            <span style={{color:i===path.length-1?'rgba(200,169,102,0.8)':'inherit',textTransform:'uppercase'}}>{p}</span>
          </span>
        ))}
      </div>

      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <button onClick={onContact} style={{
          background:'none',border:'none',cursor:'pointer',
          fontFamily:"'Montserrat',sans-serif",fontSize:10,letterSpacing:'0.1em',
          color:'rgba(232,228,220,0.45)',fontWeight:300,
          transition:'color 0.22s',padding:'4px 8px'
        }} onMouseOver={(e)=>e.target.style.color='#C8A966'} 
           onMouseOut={(e)=>e.target.style.color='rgba(232,228,220,0.45)'}
        >CONTACT</button>
        
        <div style={{display:'flex',alignItems:'center',gap:7,
          fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(10px,2vw,12px)',fontWeight:300,
          color:'rgba(232,228,220,0.45)'}}>  
          <span style={{fontSize:15,opacity:0.6}}>◇</span>
          <span>{cartCount}</span>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
//  HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage({ onCategory }) {
  const [hov, setHov] = useState(null);

  return (
    <div style={{paddingTop:'clamp(50px, 10vh, 60px)'}}>
      {/* Hero */}
      <div style={{
        minHeight:'clamp(60vh, 80vh, 100vh)',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        position:'relative',overflow:'hidden',
        background:'radial-gradient(ellipse 90% 70% at 50% 38%, rgba(200,169,102,0.055) 0%, transparent 68%)',
        padding:'clamp(20px, 5vw, 40px)',
      }}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:'clamp(200px, 50vw, 520px)',height:'clamp(200px, 50vw, 520px)',borderRadius:'50%',
          border:'1px solid rgba(200,169,102,0.05)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:'clamp(120px, 30vw, 320px)',height:'clamp(120px, 30vw, 320px)',borderRadius:'50%',
          border:'1px solid rgba(200,169,102,0.08)',pointerEvents:'none'}}/>

        {/* ELEGANCE Brand Logo */}
        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'clamp(28px, 7vw, 80px)',
          fontWeight:300,
          fontStyle:'italic',
          letterSpacing:'0.2em',
          color:'#C8A966',
          textAlign:'center',
          marginBottom:'clamp(16px, 4vw, 32px)',
          textTransform:'uppercase',
          animation:'fadeIn 1s ease-in-out 0.3s both',
          textShadow:'0 2px 20px rgba(200,169,102,0.2)',
        }}>ELEGANCE</h2>

        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.45em',
          color:'rgba(200,169,102,0.55)',marginBottom:'clamp(12px, 3vw, 22px)',fontWeight:300,textTransform:'uppercase'}}>
          Menswear Collection — 2025
        </p>
        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'clamp(32px, 8vw, 96px)',
          fontWeight:300,fontStyle:'italic',
          color:'#E8E4DC',textAlign:'center',lineHeight:1.08,
          letterSpacing:'-0.01em',marginBottom:'clamp(12px, 3vw, 18px)',maxWidth:'100%',padding:'0 clamp(12px, 3vw, 24px)'
        }}>Dressed in<br/>Three Dimensions</h1>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(10px, 2.5vw, 12px)',
          color:'rgba(232,228,220,0.35)',letterSpacing:'0.07em',fontWeight:300,marginBottom:'clamp(24px, 5vw, 52px)',
          textAlign:'center',maxWidth:600,padding:'0 clamp(12px, 3vw, 24px)'
        }}>
          Explore our full collection with immersive 360° 3D previews
        </p>
        <div style={{display:'flex',gap:'clamp(10px, 2vw, 10px)',flexWrap:'wrap',justifyContent:'center',padding:'0 clamp(12px, 3vw, 24px)'}}>
          {Object.values(CATS).map(cat=>(
            <button key={cat.id} onClick={()=>onCategory(cat.id)}
              onMouseEnter={()=>setHov(cat.id)} onMouseLeave={()=>setHov(null)}
              style={{
                background:hov===cat.id?'rgba(200,169,102,0.09)':'transparent',
                border:`1px solid ${hov===cat.id?'rgba(200,169,102,0.45)':'rgba(232,228,220,0.14)'}`,
                color:hov===cat.id?'#C8A966':'rgba(232,228,220,0.5)',
                padding:'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 26px)',
                fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',
                letterSpacing:'0.22em',fontWeight:500,cursor:'pointer',
                transition:'all 0.22s ease',textTransform:'uppercase',
              }}>{cat.label}</button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div style={{padding:'clamp(40px, 8vw, 70px) clamp(16px, 4vw, 48px) clamp(60px, 12vw, 100px)',maxWidth:1380,margin:'0 auto'}}>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 9px)',letterSpacing:'0.38em',
          color:'rgba(200,169,102,0.45)',marginBottom:'clamp(20px, 4vw, 36px)',fontWeight:500,textTransform:'uppercase'}}>
          Shop by Category
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(clamp(140px,40vw,240px),1fr))',gap:'clamp(8px, 2vw, 2px)'}}>
          {Object.values(CATS).map(cat=>(
            <div key={cat.id}
              onClick={()=>onCategory(cat.id)}
              onMouseEnter={()=>setHov(`c-${cat.id}`)}
              onMouseLeave={()=>setHov(null)}
              style={{
                background:hov===`c-${cat.id}`?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.018)',
                border:'1px solid rgba(255,255,255,0.05)',
                padding:'clamp(24px, 5vw, 44px) clamp(16px, 4vw, 28px)',cursor:'pointer',
                transition:'all 0.28s ease',
                transform:hov===`c-${cat.id}`?'translateY(-5px)':'none',
              }}>
              <div style={{width:28,height:1,background:cat.accent,marginBottom:'clamp(12px, 3vw, 22px)',
                opacity:hov===`c-${cat.id}`?1:0.4,transition:'opacity 0.28s'}}/>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px, 5vw, 26px)',fontWeight:500,
                color:'#E8E4DC',marginBottom:'clamp(4px, 1vw, 6px)',letterSpacing:'0.02em'}}>{cat.label}</h3>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 10px)',
                color:'rgba(232,228,220,0.3)',fontWeight:300,letterSpacing:'0.04em',marginBottom:'clamp(12px, 2vw, 22px)',lineHeight:1.6}}>
                {cat.tag}</p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 9px)',
                color:cat.accent,letterSpacing:'0.22em',fontWeight:500,opacity:0.65}}>
                {Object.keys(cat.sections).length} SECTIONS →</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <ReviewsSection />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  CATEGORY PAGE
// ─────────────────────────────────────────────────────────────
const ICONS = {pants:'▮▮',joggers:'▮▮',shorts:'▮',tshirt:'▲',polo:'▲●',shirt:'▲—',blazer:'▲▲',suit:'◼',belt:'○',tie:'│',shoe:'◁',wallet:'▬'};

function CategoryPage({ catId, onSection, onBack }) {
  const cat = CATS[catId];
  const [hov, setHov] = useState(null);

  return (
    <div style={{paddingTop:'clamp(50px, 10vh, 60px)'}}>
      {/* Hero */}
      <div style={{
        height:'clamp(30vh, 40vh, 38vh)',minHeight:220,
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        background:`radial-gradient(ellipse 55% 80% at 50% 50%, ${cat.accent}09 0%, transparent 72%)`,
        padding:'clamp(16px, 4vw, 28px)',
      }}>
        <button onClick={onBack} style={{
          background:'none',border:'none',cursor:'pointer',
          fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',letterSpacing:'0.32em',
          color:'rgba(200,169,102,0.45)',marginBottom:'clamp(12px, 2vw, 18px)',fontWeight:300,
          display:'flex',alignItems:'center',gap:7,padding:0
        }}>← HOME</button>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(32px, 8vw, 80px)',
          fontWeight:300,fontStyle:'italic',color:'#E8E4DC',letterSpacing:'-0.01em',marginBottom:'clamp(4px, 1vw, 8px)',
          textAlign:'center',maxWidth:'90%'
        }}>
          {cat.label}</h2>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 11px)',
          color:'rgba(232,228,220,0.35)',letterSpacing:'0.12em',fontWeight:300}}>{cat.tag}</p>
      </div>

      {/* Sections Grid */}
      <div style={{padding:'clamp(32px, 8vw, 52px) clamp(16px, 4vw, 48px) clamp(60px, 10vw, 100px)',maxWidth:1380,margin:'0 auto'}}>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 9px)',letterSpacing:'0.36em',
          color:'rgba(200,169,102,0.44)',marginBottom:'clamp(20px, 4vw, 34px)',fontWeight:500,textTransform:'uppercase'}}>
          Select a Section — {Object.keys(cat.sections).length} Categories
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(clamp(120px, 30vw, 210px),1fr))',gap:'clamp(8px, 2vw, 2px)'}}>
          {Object.values(cat.sections).map(sec=>(
            <div key={sec.id}
              onClick={()=>onSection(sec.id)}
              onMouseEnter={()=>setHov(sec.id)}
              onMouseLeave={()=>setHov(null)}
              style={{
                background:hov===sec.id?'rgba(255,255,255,0.05)':'rgba(255,255,255,0.02)',
                border:'1px solid rgba(255,255,255,0.06)',
                padding:'32px 24px',cursor:'pointer',
                transition:'all 0.22s ease',
                transform:hov===sec.id?'translateY(-3px)':'none',
              }}>
              <div style={{
                width:40,height:40,borderRadius:'50%',marginBottom:18,
                background:`radial-gradient(circle, ${cat.accent}18, transparent)`,
                border:`1px solid ${cat.accent}28`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:13,color:cat.accent,fontFamily:'monospace'
              }}>{ICONS[sec.type]||'◆'}</div>
              <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:21,fontWeight:500,
                color:'#E8E4DC',marginBottom:6}}>{sec.label}</h4>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,
                color:'rgba(232,228,220,0.28)',fontWeight:300,marginBottom:18,lineHeight:1.65,
                display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                {sec.desc}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,
                  color:'rgba(232,228,220,0.22)',letterSpacing:'0.1em',fontWeight:300}}>
                  {sec.items.length} PRODUCTS</span>
                <span style={{color:cat.accent,fontSize:15,opacity:hov===sec.id?1:0.35,transition:'opacity 0.22s'}}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION PAGE  (3D Viewer + Product List)
// ─────────────────────────────────────────────────────────────
function SectionPage({ catId, secId, onBack, onSectionChange }) {
  const cat = CATS[catId];
  const sections = Object.values(cat.sections);
  const currentSecIndex = sections.findIndex(s => s.id === secId);
  const sec = sections[currentSecIndex];
  const [selected, setSelected] = useState(sec.items[0]);
  const [size, setSize] = useState(null);
  const [addedFx, setAddedFx] = useState(false);

  const hasPrev = currentSecIndex > 0;
  const hasNext = currentSecIndex < sections.length - 1;
  const prevSec = hasPrev ? sections[currentSecIndex - 1] : null;
  const nextSec = hasNext ? sections[currentSecIndex + 1] : null;

  const stockLabel = (s) => s<=3 ? `Only ${s} left` : s<=8 ? `${s} remaining` : `${s} in stock`;
  const stockColor = (s) => s<=3 ? '#E85D3A' : s<=8 ? '#E8A83A' : '#5EAA7A';

  const handleAdd = () => {
    if (!size) return;
    setAddedFx(true);
    setTimeout(()=>setAddedFx(false), 2200);
  };

  const selectProduct = (item) => {
    setSelected(item);
    setSize(null);
  };

  const goToPrevSection = () => {
    if (hasPrev) onSectionChange(prevSec.id);
  };

  const goToNextSection = () => {
    if (hasNext) onSectionChange(nextSec.id);
  };

  const goToLastSection = () => {
    onSectionChange(sections[sections.length - 1].id);
  };

  return (
    <div style={{
      paddingTop:'clamp(50px, 10vh, 60px)',
      height:'100vh',
      display:'flex',flexDirection:'column',
      overflow:'hidden',
      background:'#060606',
    }}>
      {/* Sub-header - Responsive */}
      <div style={{
        padding:'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 36px)',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        display:'flex',alignItems:'center',gap:'clamp(8px, 2vw, 16px)',flexShrink:0,
        background:'rgba(5,5,5,0.7)',
        flexWrap:'wrap',
        rowGap:'clamp(4px, 1vw, 8px)',
      }}>
        <button onClick={onBack} style={{
          background:'none',border:'none',cursor:'pointer',padding:0,
          fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 11px)',fontWeight:300,
          letterSpacing:'0.08em',color:'rgba(232,228,220,0.38)',
          display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap',
        }}>← {cat.label}</button>
        <span style={{color:'rgba(200,169,102,0.3)',display:'none'}}>›</span>
        <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 11px)',fontWeight:500,
          letterSpacing:'0.12em',color:'rgba(200,169,102,0.75)',textTransform:'uppercase'}}>
          {sec.label}</span>
        <span style={{marginLeft:'auto',fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(7px, 2vw, 9px)',
          color:'rgba(232,228,220,0.2)',fontWeight:300,letterSpacing:'0.12em',whiteSpace:'nowrap'}}>
          {sec.items.length} STYLES
        </span>

        {/* Navigation Buttons - Responsive */}
        <div style={{display:'flex',gap:'clamp(4px, 1vw, 8px)',paddingLeft:'clamp(8px, 2vw, 16px)',
          borderLeft:'1px solid rgba(200,169,102,0.2)',width:'100%',justifyContent:'flex-end'}}>
          <button onClick={goToPrevSection} disabled={!hasPrev} style={{
            padding:'clamp(4px, 1vw, 4px) clamp(6px, 1vw, 8px)',background:'none',
            border:`1px solid ${hasPrev?'rgba(200,169,102,0.4)':'rgba(200,169,102,0.1)'}`,
            color:hasPrev?'rgba(200,169,102,0.7)':'rgba(200,169,102,0.2)',
            fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(7px, 1.5vw, 9px)',fontWeight:500,cursor:hasPrev?'pointer':'not-allowed',
            transition:'all 0.22s',textTransform:'uppercase'
          }} onMouseOver={(e)=>{if(hasPrev){e.target.style.background='rgba(200,169,102,0.1)'; e.target.style.color='#C8A966'}}}
             onMouseOut={(e)=>{if(hasPrev){e.target.style.background='none'; e.target.style.color='rgba(200,169,102,0.7)'}}}
          >← PREV</button>

          <button onClick={goToNextSection} disabled={!hasNext} style={{
            padding:'clamp(4px, 1vw, 4px) clamp(6px, 1vw, 8px)',background:'none',
            border:`1px solid ${hasNext?'rgba(200,169,102,0.4)':'rgba(200,169,102,0.1)'}`,
            color:hasNext?'rgba(200,169,102,0.7)':'rgba(200,169,102,0.2)',
            fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(7px, 1.5vw, 9px)',fontWeight:500,cursor:hasNext?'pointer':'not-allowed',
            transition:'all 0.22s',textTransform:'uppercase'
          }} onMouseOver={(e)=>{if(hasNext){e.target.style.background='rgba(200,169,102,0.1)'; e.target.style.color='#C8A966'}}}
             onMouseOut={(e)=>{if(hasNext){e.target.style.background='none'; e.target.style.color='rgba(200,169,102,0.7)'}}}
          >NEXT →</button>

          <button onClick={goToLastSection} style={{
            padding:'clamp(4px, 1vw, 4px) clamp(6px, 1vw, 8px)',background:'none',
            border:'1px solid rgba(200,169,102,0.4)',
            color:'rgba(200,169,102,0.7)',fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(7px, 1.5vw, 9px)',fontWeight:500,
            cursor:'pointer',transition:'all 0.22s',textTransform:'uppercase'
          }} onMouseOver={(e)=>{e.target.style.background='rgba(200,169,102,0.1)'; e.target.style.color='#C8A966'}}
             onMouseOut={(e)=>{e.target.style.background='none'; e.target.style.color='rgba(200,169,102,0.7)'}}
          >LAST</button>
        </div>
      </div>

      {/* Main layout: RESPONSIVE - Mobile stacked, Desktop 3-column */}
      <div style={{
        flex:1,
        display:'grid',
        gridTemplateColumns:'minmax(220px, 1fr) minmax(300px, 2fr) minmax(220px, 1fr)',
        overflow:'hidden',
        gap:0,
        width:'100%',
        height:'100%'
      }}>

        {/* ── LEFT: Product List - Responsive sidebar ── */}
        <div style={{
          width:'100%',
          height:'100%',
          flexShrink:0,
          borderRight:'1px solid rgba(255,255,255,0.05)',
          overflowY:'auto',
          overflowX:'hidden',
        }}>
          <div style={{padding:'clamp(8px, 2vw, 12px) 0'}}>
            {sec.items.map(item=>(
              <div key={item.id}
                onClick={()=>selectProduct(item)}
                style={{
                  padding:'clamp(10px, 2vw, 14px) clamp(12px, 3vw, 22px)',cursor:'pointer',
                  borderLeft: selected.id===item.id?`2px solid ${cat.accent}`:'2px solid transparent',
                  background: selected.id===item.id?'rgba(255,255,255,0.04)':'transparent',
                  transition:'all 0.18s',
                  display:'flex',alignItems:'center',gap:'clamp(10px, 2vw, 14px)',
                }}>
                {/* Product Image Thumbnail */}
                <div style={{
                  width:'clamp(50px, 12vw, 70px)',height:'clamp(60px, 15vw, 90px)',flexShrink:0,
                  background:selected.id===item.id?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)',
                  border:`1px solid ${selected.id===item.id?'rgba(200,169,102,0.5)':'rgba(255,255,255,0.1)'}`,
                  borderRadius:'2px',display:'flex',alignItems:'center',justifyContent:'center',
                  overflow:'hidden',transition:'all 0.18s',
                }}>
                  <div style={{width:'90%',height:'90%',opacity:0.8}} dangerouslySetInnerHTML={{__html:generateProductSVG(sec.type,item.color)}}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12px, 3vw, 15px)',fontWeight:500,
                    color: selected.id===item.id?'#E8E4DC':'rgba(232,228,220,0.72)',
                    marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                    transition:'color 0.18s'}}>
                    {item.name}</p>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 11px)',
                      color:'rgba(232,228,220,0.35)',fontWeight:300}}>
                      ₹{item.price.toLocaleString()}</span>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(7px, 1.5vw, 8.5px)',
                      color:stockColor(item.stock),fontWeight:500,letterSpacing:'0.05em',flexShrink:0}}>
                      {stockLabel(item.stock).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: 3D Canvas ── */}
        <div style={{
          position:'relative',
          width:'100%',
          height:'100%',
          background:`radial-gradient(ellipse 70% 65% at 50% 44%, ${selected.color}0C 0%, transparent 65%)`,
          borderRight:'1px solid rgba(255,255,255,0.05)',
          overflow:'hidden',
        }}>
          {/* Use key to remount when product changes → fresh Three.js instance */}
          <ThreeDViewer key={`${selected.id}-${sec.type}`} product={selected} type={sec.type}/>

          {/* Drag hint */}
          <div style={{
            position:'absolute',bottom:18,left:'50%',transform:'translateX(-50%)',
            fontFamily:"'Montserrat',sans-serif",fontSize:9,fontWeight:300,
            color:'rgba(232,228,220,0.18)',letterSpacing:'0.2em',
            display:'flex',alignItems:'center',gap:8,pointerEvents:'none',
            whiteSpace:'nowrap',
          }}>↻ DRAG TO ROTATE 360°</div>

          {/* Product name overlay */}
          <div style={{position:'absolute',top:22,left:26,pointerEvents:'none'}}>
            <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:8.5,letterSpacing:'0.32em',
              color:'rgba(200,169,102,0.38)',marginBottom:5,fontWeight:300,textTransform:'uppercase'}}>
              {sec.label}</p>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:400,
              fontStyle:'italic',color:'rgba(232,228,220,0.5)'}}>{selected.name}</h3>
          </div>

          {/* Color badge */}
          <div style={{
            position:'absolute',bottom:18,left:22,
            display:'flex',alignItems:'center',gap:8,pointerEvents:'none',
          }}>
            <div style={{width:10,height:10,borderRadius:'50%',background:selected.color,
              border:'1px solid rgba(255,255,255,0.2)'}}/>
            <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,fontWeight:300,
              letterSpacing:'0.15em',color:'rgba(232,228,220,0.22)'}}>
              {selected.colorName.toUpperCase()}</span>
          </div>
        </div>

        {/* ── RIGHT: Details Panel - Responsive ── */}
        <div style={{
          width:'100%',
          height:'100%',
          borderLeft:'1px solid rgba(255,255,255,0.05)',
          overflowY:'auto',
          overflowX:'hidden',
          padding:'clamp(16px, 4vw, 28px) clamp(12px, 3vw, 24px)',
        }}>
          <Label>Product</Label>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(16px, 4vw, 22px)',fontWeight:500,
            color:'#E8E4DC',marginBottom:'clamp(12px, 2vw, 22px)',lineHeight:1.3}}>{selected.name}</h3>

          <Label>Price</Label>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px, 6vw, 30px)',fontWeight:300,
            color:'#E8E4DC',letterSpacing:'-0.01em',marginBottom:'clamp(12px, 2vw, 22px)'}}>
            ₹{selected.price.toLocaleString()}</p>

          <Label>Material</Label>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 11px)',
            color:'rgba(232,228,220,0.5)',fontWeight:300,lineHeight:1.6,marginBottom:'clamp(12px, 2vw, 22px)'}}>
            {selected.mat}</p>

          <Label>Availability</Label>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:'clamp(12px, 2vw, 22px)'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:stockColor(selected.stock),
              boxShadow:`0 0 6px ${stockColor(selected.stock)}80`}}/>
            <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(9px, 2vw, 11px)',
              color:stockColor(selected.stock),fontWeight:400,letterSpacing:'0.06em'}}>
              {stockLabel(selected.stock)}</span>
          </div>

          {/* Size Selector */}
          <div style={{marginBottom:'clamp(16px, 3vw, 26px)'}}>
            <Label>
              Size {!size&&<span style={{color:'rgba(220,90,70,0.55)',fontSize:'clamp(7px, 1.5vw, 8px)',letterSpacing:'0.1em'}}> — SELECT ONE</span>}
            </Label>
            <div style={{display:'flex',flexWrap:'wrap',gap:'clamp(4px, 1vw, 6px)'}}>
              {selected.sizes.map(sz=>(
                <button key={sz} onClick={()=>setSize(sz)} style={{
                  padding:'clamp(5px, 1vw, 7px) clamp(8px, 2vw, 11px)',
                  border: size===sz?`1px solid ${cat.accent}`:'1px solid rgba(255,255,255,0.11)',
                  background: size===sz?`${cat.accent}14`:'transparent',
                  color: size===sz?cat.accent:'rgba(232,228,220,0.45)',
                  fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 11px)',
                  fontWeight:size===sz?500:300,letterSpacing:'0.06em',
                  cursor:'pointer',transition:'all 0.18s',
                }}>{sz}</button>
              ))}
            </div>
          </div>

          {/* Add to Bag */}
          <button onClick={handleAdd} disabled={!size} style={{
            width:'100%',padding:'clamp(10px, 2vw, 13px)',marginBottom:'clamp(12px, 2vw, 22px)',
            background: addedFx?'rgba(94,170,122,0.12)':size?`${cat.accent}12`:'rgba(255,255,255,0.025)',
            border: addedFx?'1px solid rgba(94,170,122,0.7)':size?`1px solid ${cat.accent}`:'1px solid rgba(255,255,255,0.07)',
            color: addedFx?'#5EAA7A':size?cat.accent:'rgba(232,228,220,0.18)',
            fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',fontWeight:500,
            letterSpacing:'0.24em',cursor:size?'pointer':'not-allowed',transition:'all 0.22s',
          }}>{addedFx?'✓  ADDED TO BAG':'ADD TO BAG'}</button>

          {/* Colour Variants */}
          <div>
            <Label>All Colours</Label>
            <div style={{display:'flex',gap:'clamp(4px, 1vw, 7px)',flexWrap:'wrap'}}>
              {sec.items.map(item=>(
                <button key={item.id} onClick={()=>selectProduct(item)} title={item.colorName}
                  style={{
                    width:'clamp(18px, 4vw, 22px)',height:'clamp(18px, 4vw, 22px)',borderRadius:'50%',background:item.color,padding:0,cursor:'pointer',
                    border: selected.id===item.id?`2px solid ${cat.accent}`:'2px solid rgba(255,255,255,0.08)',
                    boxShadow: selected.id===item.id?`0 0 9px ${item.color}65`:'none',
                    transition:'all 0.18s',
                  }}/>
              ))}
            </div>
          </div>

          {/* Section description */}
          <p style={{
            fontFamily:"'Montserrat',sans-serif",fontSize:'clamp(8px, 2vw, 10px)',
            color:'rgba(232,228,220,0.22)',fontWeight:300,lineHeight:1.7,
            marginTop:'clamp(16px, 3vw, 28px)',paddingTop:'clamp(12px, 2vw, 22px)',
            borderTop:'1px solid rgba(255,255,255,0.05)',
          }}>{sec.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SMALL SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:8.5,letterSpacing:'0.32em',
      color:'rgba(232,228,220,0.26)',marginBottom:9,fontWeight:300,textTransform:'uppercase'}}>
      {children}</p>
  );
}

// ─────────────────────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState('home');   // 'home' | 'category' | 'section' | 'contact'
  const [catId, setCatId] = useState(null);
  const [secId, setSecId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const goHome = () => { setPage('home'); setCatId(null); setSecId(null); };
  const goCategory = (id) => { setCatId(id); setSecId(null); setPage('category'); };
  const goSection = (id) => { setSecId(id); setPage('section'); };
  const goContact = () => { setPage('contact'); };

  const path =
    page==='home'     ? ['Home'] :
    page==='contact'  ? ['Contact'] :
    page==='category' ? ['Home', CATS[catId].label] :
                        ['Home', CATS[catId].label, CATS[catId].sections[secId].label];

  if (showSplash) {
    return <LogoSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { background:#060606; overflow:hidden; height:100%; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:3px; }
        button { outline:none; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) {
          html, body { font-size: 14px; }
        }
        @media (max-width: 480px) {
          html, body { font-size: 13px; }
        }
      `}</style>

      <div style={{
        background:'#060606',color:'#E8E4DC',
        fontFamily:"'Montserrat',sans-serif",
        height:'100vh',
        overflowY: page==='section'?'hidden':'auto',
        display:'flex',flexDirection:'column',
      }}>
        <Navbar onHome={goHome} path={path} cartCount={cartCount} onContact={goContact} />

        {page==='home'     && <HomePage onCategory={goCategory}/>}
        {page==='contact'  && <ContactPage onBack={goHome}/>}
        {page==='category' && <CategoryPage catId={catId} onSection={goSection} onBack={goHome}/>}
        {page==='section'  && (
          <SectionPage
            key={`${catId}-${secId}`}
            catId={catId}
            secId={secId}
            onBack={()=>goCategory(catId)}
            onSectionChange={goSection}
          />
        )}
      </div>
    </>
  );
}
