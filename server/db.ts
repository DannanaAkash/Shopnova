import { Product } from '../src/types';

export const products: Product[] = [
  {
    id: "p1",
    name: "Quantum X Pro Smartphone",
    description: "The ultimate flagship phone with AI camera system and all-day battery.",
    price: 69999,
    discount: 10,
    category: "Mobiles",
    image: "/images/quantum_x_pro_smartphone.jpg",
    images: [
      "/images/quantum_x_pro_smartphone.jpg",
      "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 1245,
    features: ["120Hz AMOLED", "50MP AI Camera", "5000mAh Battery", "Snapdragon 8 Gen 3"],
    specs: {
      Display: "6.7 inch AMOLED",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12GB",
      Storage: "256GB"
    },
    stock: 45,
    colors: ["Phantom Black", "Cosmic Silver"],
    smartScore: 94
  },
  {
    id: "p2",
    name: "AuraBook 14 Ultralight",
    description: "Premium thin-and-light laptop perfect for professionals and creatives.",
    price: 85000,
    discount: 5,
    category: "Laptops",
    image: "/images/aurabook_14_ultralight.jpg",
    images: [
      "/images/aurabook_14_ultralight.jpg",
      "https://images.unsplash.com/photo-1531297172864-8dbcc0d44043?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviews: 890,
    features: ["Ultra-thin design", "M-series chip", "18-hour battery", "Retina display"],
    specs: {
      Screen: "14-inch Liquid Retina",
      Processor: "M2",
      Memory: "16GB Unified",
      Storage: "512GB SSD"
    },
    stock: 22,
    colors: ["Space Gray", "Silver"],
    smartScore: 91
  },
  {
    id: "p3",
    name: "SonicPods Pro",
    description: "Active noise cancelling wireless earbuds with spatial audio.",
    price: 18999,
    discount: 15,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 2100,
    features: ["Active Noise Cancelling", "Transparency Mode", "Spatial Audio", "Sweat Resistant"],
    specs: {
      Battery: "Up to 6 hours",
      Case: "MagSafe Charging",
      Connectivity: "Bluetooth 5.3"
    },
    stock: 150,
    colors: ["White"],
    smartScore: 89
  },
  {
    id: "p4",
    name: "PlayStation 5 Console",
    description: "Next-gen gaming with 4K resolution and 120fps support.",
    price: 49999,
    discount: 0,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviews: 3400,
    features: ["4K Gaming", "1TB SSD", "Ray Tracing", "Dual Sense Controller"],
    specs: {
      Resolution: "4K up to 120fps",
      Storage: "1TB NVMe SSD",
      RAM: "16GB GDDR6"
    },
    stock: 15,
    colors: ["White/Black"],
    smartScore: 96
  },
  {
    id: "p5",
    name: "FitPulse Smartwatch 3",
    description: "Advanced health tracking and GPS in a sleek design.",
    price: 8999,
    discount: 20,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.4,
    reviews: 540,
    features: ["Heart Rate Monitor", "Built-in GPS", "SpO2 Tracking", "7-day battery"],
    specs: {
      Display: "1.4-inch AMOLED",
      WaterResistance: "5ATM",
      Battery: "7 days"
    },
    stock: 200,
    colors: ["Graphite", "Rose Gold"],
    smartScore: 85
  },
  {
    id: "p6",
    name: "AeroStep Running Shoes",
    description: "Lightweight and breathable shoes for daily running.",
    price: 3599,
    discount: 25,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviews: 120,
    features: ["Breathable mesh", "Cushioned sole", "Lightweight", "Durable grip"],
    specs: {
      Material: "Mesh/Synthetic",
      Sole: "Rubber",
      Weight: "220g"
    },
    stock: 80,
    colors: ["Neon Red", "Black/White"],
    smartScore: 88
  },
  {
    id: "p7",
    name: "Vibrant Cotton T-Shirt",
    description: "Comfortable and stylish 100% cotton casual wear.",
    price: 999,
    discount: 20,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.3,
    reviews: 350,
    features: ["100% Cotton", "Breathable", "Pre-shrunk", "Machine washable"],
    specs: {
      Material: "Cotton",
      Fit: "Regular",
      Sleeve: "Short"
    },
    stock: 150,
    colors: ["Red", "Blue", "Yellow"],
    smartScore: 81
  },
  {
    id: "p8",
    name: "Smart 4K UHD TV 55\"",
    description: "Stunning 4K visual experience with smart features.",
    price: 45000,
    discount: 15,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 820,
    features: ["4K Resolution", "HDR 10", "Smart TV Apps", "Dolby Audio"],
    specs: {
      Size: "55 inch",
      Resolution: "3840 x 2160",
      RefreshRate: "60Hz"
    },
    stock: 30,
    colors: ["Black"],
    smartScore: 90
  },
  {
    id: "p9",
    name: "Fresh Organic Apple Box",
    description: "Handpicked, fresh, and sweet organic apples.",
    price: 500,
    discount: 5,
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 140,
    features: ["Organic", "Farm Fresh", "No Pesticides", "Sweet taste"],
    specs: {
      Weight: "2kg",
      Type: "Fruit",
      Origin: "Local Farms"
    },
    stock: 50,
    colors: ["Red"],
    smartScore: 95
  }
];

const categories = ["Mobiles", "Laptops", "Electronics", "Gaming", "Shoes", "Fashion", "Grocery", "Home Appliances", "Software"];
const adjectives = ["Smart", "Ultra", "Pro", "Lite", "Max", "Eco", "Classic", "Vibrant", "Premium", "Essential", "Cloud"];
const nouns = ["Device", "Gadget", "Gear", "Machine", "Accessory", "Item", "Tool", "Wear", "Bundle", "Kit", "App", "Suite"];

const categoryImages: Record<string, string[]> = {
  Mobiles: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop"],
  Laptops: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1531297172864-8dbcc0d44043?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"],
  Electronics: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"],
  Gaming: ["https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop"],
  Shoes: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"],
  Fashion: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop"],
  Grocery: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=800&auto=format&fit=crop"],
  "Home Appliances": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"],
  Software: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop"]
};

for (let i = 10; i <= 300; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = Math.floor(Math.random() * 90000) + 999;
  const catImages = categoryImages[category] || categoryImages["Electronics"];
  const image = catImages[Math.floor(Math.random() * catImages.length)];
  
  // Shuffle catImages to provide a nice gallery
  const shuffledImages = [...catImages].sort(() => 0.5 - Math.random());
  
  products.push({
    id: `p${i}`,
    name: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${category} ${nouns[Math.floor(Math.random() * nouns.length)]} ${i}`,
    description: `A fantastic ${category.toLowerCase()} option for everyday use. Enjoy premium quality with vibrant details.`,
    price,
    discount: Math.floor(Math.random() * 30),
    category,
    image,
    images: shuffledImages,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * 5000),
    features: ["High Quality", "Durable", "Modern Design"],
    specs: { Brand: "Generic", Model: `Gen ${i}` },
    stock: Math.floor(Math.random() * 500),
    colors: ["Black", "White", "Silver"],
    smartScore: Math.floor(Math.random() * 30) + 70
  });
}

export const getProducts = () => products;
export const getProductById = (id: string) => products.find(p => p.id === id);
export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  let maxPrice = Infinity;
  
  // Regex to catch "under 30000" or "under 30k"
  const underMatch = lowerQuery.match(/under\s*[₹$]?\s*(\d+)/);
  if (underMatch) {
    maxPrice = parseInt(underMatch[1], 10);
  }
  
  let searchTerms = lowerQuery;
  if (underMatch) {
    searchTerms = lowerQuery.replace(underMatch[0], '').trim();
  }
  
  const ignoreWords = ["best", "for", "products", "under", "₹", "the", "a", "an", "is"];
  const tokens = searchTerms.split(/[\s₹$]+/).filter(w => !ignoreWords.includes(w) && w.length > 0);
  
  return products.filter(p => {
    const matchesPrice = p.price <= maxPrice;
    if (!matchesPrice) return false;
    
    if (tokens.length === 0) return true;
    
    return tokens.every(token => 
      p.name.toLowerCase().includes(token) || 
      p.description.toLowerCase().includes(token) ||
      p.category.toLowerCase().includes(token)
    );
  }).sort((a, b) => (b.smartScore || 0) - (a.smartScore || 0));
};
