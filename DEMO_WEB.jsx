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
//  NAVBAR
// ─────────────────────────────────────────────────────────────
function Navbar({ onHome, path, cartCount }) {
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
      }}>MASC</button>

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

      <div style={{display:'flex',alignItems:'center',gap:7,
        fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:300,
        color:'rgba(232,228,220,0.45)'}}>
        <span style={{fontSize:15,opacity:0.6}}>◇</span>
        <span>{cartCount}</span>
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
    <div style={{paddingTop:60}}>
      {/* Hero */}
      <div style={{
        minHeight:'calc(100vh - 60px)',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        position:'relative',overflow:'hidden',
        background:'radial-gradient(ellipse 90% 70% at 50% 38%, rgba(200,169,102,0.055) 0%, transparent 68%)',
      }}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:520,height:520,borderRadius:'50%',
          border:'1px solid rgba(200,169,102,0.05)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:320,height:320,borderRadius:'50%',
          border:'1px solid rgba(200,169,102,0.08)',pointerEvents:'none'}}/>

        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,letterSpacing:'0.45em',
          color:'rgba(200,169,102,0.55)',marginBottom:22,fontWeight:300,textTransform:'uppercase'}}>
          Menswear Collection — 2025
        </p>
        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:'clamp(50px,7.5vw,96px)',
          fontWeight:300,fontStyle:'italic',
          color:'#E8E4DC',textAlign:'center',lineHeight:1.08,
          letterSpacing:'-0.01em',marginBottom:18,maxWidth:820,padding:'0 24px'
        }}>Dressed in<br/>Three Dimensions</h1>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,
          color:'rgba(232,228,220,0.35)',letterSpacing:'0.07em',fontWeight:300,marginBottom:52}}>
          Explore our full collection with immersive 360° 3D previews
        </p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',padding:'0 24px'}}>
          {Object.values(CATS).map(cat=>(
            <button key={cat.id} onClick={()=>onCategory(cat.id)}
              onMouseEnter={()=>setHov(cat.id)} onMouseLeave={()=>setHov(null)}
              style={{
                background:hov===cat.id?'rgba(200,169,102,0.09)':'transparent',
                border:`1px solid ${hov===cat.id?'rgba(200,169,102,0.45)':'rgba(232,228,220,0.14)'}`,
                color:hov===cat.id?'#C8A966':'rgba(232,228,220,0.5)',
                padding:'10px 26px',
                fontFamily:"'Montserrat',sans-serif",fontSize:10,
                letterSpacing:'0.22em',fontWeight:500,cursor:'pointer',
                transition:'all 0.22s ease',textTransform:'uppercase',
              }}>{cat.label}</button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div style={{padding:'70px 48px 100px',maxWidth:1380,margin:'0 auto'}}>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:'0.38em',
          color:'rgba(200,169,102,0.45)',marginBottom:36,fontWeight:500,textTransform:'uppercase'}}>
          Shop by Category
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2}}>
          {Object.values(CATS).map(cat=>(
            <div key={cat.id}
              onClick={()=>onCategory(cat.id)}
              onMouseEnter={()=>setHov(`c-${cat.id}`)}
              onMouseLeave={()=>setHov(null)}
              style={{
                background:hov===`c-${cat.id}`?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.018)',
                border:'1px solid rgba(255,255,255,0.05)',
                padding:'44px 28px',cursor:'pointer',
                transition:'all 0.28s ease',
                transform:hov===`c-${cat.id}`?'translateY(-5px)':'none',
              }}>
              <div style={{width:28,height:1,background:cat.accent,marginBottom:22,
                opacity:hov===`c-${cat.id}`?1:0.4,transition:'opacity 0.28s'}}/>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,
                color:'#E8E4DC',marginBottom:6,letterSpacing:'0.02em'}}>{cat.label}</h3>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,
                color:'rgba(232,228,220,0.3)',fontWeight:300,letterSpacing:'0.04em',marginBottom:22,lineHeight:1.6}}>
                {cat.tag}</p>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,
                color:cat.accent,letterSpacing:'0.22em',fontWeight:500,opacity:0.65}}>
                {Object.keys(cat.sections).length} SECTIONS →</p>
            </div>
          ))}
        </div>
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
    <div style={{paddingTop:60}}>
      {/* Hero */}
      <div style={{
        height:'38vh',minHeight:220,
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        background:`radial-gradient(ellipse 55% 80% at 50% 50%, ${cat.accent}09 0%, transparent 72%)`
      }}>
        <button onClick={onBack} style={{
          background:'none',border:'none',cursor:'pointer',
          fontFamily:"'Montserrat',sans-serif",fontSize:10,letterSpacing:'0.32em',
          color:'rgba(200,169,102,0.45)',marginBottom:18,fontWeight:300,
          display:'flex',alignItems:'center',gap:7,padding:0
        }}>← HOME</button>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(48px,6vw,80px)',
          fontWeight:300,fontStyle:'italic',color:'#E8E4DC',letterSpacing:'-0.01em',marginBottom:8}}>
          {cat.label}</h2>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,
          color:'rgba(232,228,220,0.35)',letterSpacing:'0.12em',fontWeight:300}}>{cat.tag}</p>
      </div>

      {/* Sections Grid */}
      <div style={{padding:'52px 48px 100px',maxWidth:1380,margin:'0 auto'}}>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:'0.36em',
          color:'rgba(200,169,102,0.44)',marginBottom:34,fontWeight:500,textTransform:'uppercase'}}>
          Select a Section — {Object.keys(cat.sections).length} Categories
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:2}}>
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
function SectionPage({ catId, secId, onBack }) {
  const cat = CATS[catId];
  const sec = cat.sections[secId];
  const [selected, setSelected] = useState(sec.items[0]);
  const [size, setSize] = useState(null);
  const [addedFx, setAddedFx] = useState(false);

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

  return (
    <div style={{
      paddingTop:60,
      height:'100vh',
      display:'flex',flexDirection:'column',
      overflow:'hidden',
      background:'#060606',
    }}>
      {/* Sub-header */}
      <div style={{
        padding:'12px 36px',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        display:'flex',alignItems:'center',gap:16,flexShrink:0,
        background:'rgba(5,5,5,0.7)',
      }}>
        <button onClick={onBack} style={{
          background:'none',border:'none',cursor:'pointer',padding:0,
          fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:300,
          letterSpacing:'0.08em',color:'rgba(232,228,220,0.38)',
          display:'flex',alignItems:'center',gap:6,
        }}>← {cat.label}</button>
        <span style={{color:'rgba(200,169,102,0.3)'}}>›</span>
        <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:500,
          letterSpacing:'0.12em',color:'rgba(200,169,102,0.75)',textTransform:'uppercase'}}>
          {sec.label}</span>
        <span style={{marginLeft:'auto',fontFamily:"'Montserrat',sans-serif",fontSize:9,
          color:'rgba(232,228,220,0.2)',fontWeight:300,letterSpacing:'0.12em'}}>
          {sec.items.length} STYLES AVAILABLE
        </span>
      </div>

      {/* Main layout: sidebar | 3D viewer | details */}
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>

        {/* ── LEFT: Product List ── */}
        <div style={{
          width:296,flexShrink:0,
          borderRight:'1px solid rgba(255,255,255,0.05)',
          overflowY:'auto',
        }}>
          <div style={{padding:'12px 0'}}>
            {sec.items.map(item=>(
              <div key={item.id}
                onClick={()=>selectProduct(item)}
                style={{
                  padding:'14px 22px',cursor:'pointer',
                  borderLeft: selected.id===item.id?`2px solid ${cat.accent}`:'2px solid transparent',
                  background: selected.id===item.id?'rgba(255,255,255,0.04)':'transparent',
                  transition:'all 0.18s',
                  display:'flex',alignItems:'center',gap:13,
                }}>
                {/* Swatch */}
                <div style={{
                  width:30,height:30,borderRadius:'50%',flexShrink:0,
                  background:item.color,
                  border: selected.id===item.id?`2px solid ${cat.accent}`:'2px solid rgba(255,255,255,0.1)',
                  boxShadow:`0 0 10px ${item.color}45`,
                  transition:'border 0.18s',
                }}/>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:500,
                    color: selected.id===item.id?'#E8E4DC':'rgba(232,228,220,0.72)',
                    marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                    transition:'color 0.18s'}}>
                    {item.name}</p>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:6}}>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,
                      color:'rgba(232,228,220,0.35)',fontWeight:300}}>
                      ₹{item.price.toLocaleString()}</span>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:8.5,
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
          flex:1,position:'relative',
          background:`radial-gradient(ellipse 70% 65% at 50% 44%, ${selected.color}0C 0%, transparent 65%)`,
          minWidth:0,
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

        {/* ── RIGHT: Details Panel ── */}
        <div style={{
          width:292,flexShrink:0,
          borderLeft:'1px solid rgba(255,255,255,0.05)',
          overflowY:'auto',
          padding:'28px 24px',
        }}>
          <Label>Product</Label>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:500,
            color:'#E8E4DC',marginBottom:22,lineHeight:1.3}}>{selected.name}</h3>

          <Label>Price</Label>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:300,
            color:'#E8E4DC',letterSpacing:'-0.01em',marginBottom:22}}>
            ₹{selected.price.toLocaleString()}</p>

          <Label>Material</Label>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,
            color:'rgba(232,228,220,0.5)',fontWeight:300,lineHeight:1.6,marginBottom:22}}>
            {selected.mat}</p>

          <Label>Availability</Label>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:22}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:stockColor(selected.stock),
              boxShadow:`0 0 6px ${stockColor(selected.stock)}80`}}/>
            <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,
              color:stockColor(selected.stock),fontWeight:400,letterSpacing:'0.06em'}}>
              {stockLabel(selected.stock)}</span>
          </div>

          {/* Size Selector */}
          <div style={{marginBottom:26}}>
            <Label>
              Size {!size&&<span style={{color:'rgba(220,90,70,0.55)',fontSize:8,letterSpacing:'0.1em'}}> — SELECT ONE</span>}
            </Label>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {selected.sizes.map(sz=>(
                <button key={sz} onClick={()=>setSize(sz)} style={{
                  padding:'7px 11px',
                  border: size===sz?`1px solid ${cat.accent}`:'1px solid rgba(255,255,255,0.11)',
                  background: size===sz?`${cat.accent}14`:'transparent',
                  color: size===sz?cat.accent:'rgba(232,228,220,0.45)',
                  fontFamily:"'Montserrat',sans-serif",fontSize:11,
                  fontWeight:size===sz?500:300,letterSpacing:'0.06em',
                  cursor:'pointer',transition:'all 0.18s',
                }}>{sz}</button>
              ))}
            </div>
          </div>

          {/* Add to Bag */}
          <button onClick={handleAdd} disabled={!size} style={{
            width:'100%',padding:'13px',marginBottom:22,
            background: addedFx?'rgba(94,170,122,0.12)':size?`${cat.accent}12`:'rgba(255,255,255,0.025)',
            border: addedFx?'1px solid rgba(94,170,122,0.7)':size?`1px solid ${cat.accent}`:'1px solid rgba(255,255,255,0.07)',
            color: addedFx?'#5EAA7A':size?cat.accent:'rgba(232,228,220,0.18)',
            fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:500,
            letterSpacing:'0.24em',cursor:size?'pointer':'not-allowed',transition:'all 0.22s',
          }}>{addedFx?'✓  ADDED TO BAG':'ADD TO BAG'}</button>

          {/* Colour Variants */}
          <div>
            <Label>All Colours</Label>
            <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
              {sec.items.map(item=>(
                <button key={item.id} onClick={()=>selectProduct(item)} title={item.colorName}
                  style={{
                    width:22,height:22,borderRadius:'50%',background:item.color,padding:0,cursor:'pointer',
                    border: selected.id===item.id?`2px solid ${cat.accent}`:'2px solid rgba(255,255,255,0.08)',
                    boxShadow: selected.id===item.id?`0 0 9px ${item.color}65`:'none',
                    transition:'all 0.18s',
                  }}/>
              ))}
            </div>
          </div>

          {/* Section description */}
          <p style={{
            fontFamily:"'Montserrat',sans-serif",fontSize:10,
            color:'rgba(232,228,220,0.22)',fontWeight:300,lineHeight:1.7,
            marginTop:28,paddingTop:22,
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
  const [page, setPage] = useState('home');   // 'home' | 'category' | 'section'
  const [catId, setCatId] = useState(null);
  const [secId, setSecId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const goHome = () => { setPage('home'); setCatId(null); setSecId(null); };
  const goCategory = (id) => { setCatId(id); setSecId(null); setPage('category'); };
  const goSection = (id) => { setSecId(id); setPage('section'); };

  const path =
    page==='home'     ? ['Home'] :
    page==='category' ? ['Home', CATS[catId].label] :
                        ['Home', CATS[catId].label, CATS[catId].sections[secId].label];

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
      `}</style>

      <div style={{
        background:'#060606',color:'#E8E4DC',
        fontFamily:"'Montserrat',sans-serif",
        height:'100vh',
        overflowY: page==='section'?'hidden':'auto',
      }}>
        <Navbar onHome={goHome} path={path} cartCount={cartCount} />

        {page==='home'     && <HomePage onCategory={goCategory}/>}
        {page==='category' && <CategoryPage catId={catId} onSection={goSection} onBack={goHome}/>}
        {page==='section'  && (
          <SectionPage
            key={`${catId}-${secId}`}
            catId={catId}
            secId={secId}
            onBack={()=>goCategory(catId)}
          />
        )}
      </div>
    </>
  );
}
