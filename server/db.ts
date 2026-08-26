export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  specs: Record<string, string>;
  stock: number;
  discount: number;
  colors: string[];
  smartScore?: number;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Quantum X Pro Smartphone",
    description: "The ultimate flagship phone with AI camera system and all-day battery.",
    price: 69999,
    discount: 10,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 1245,
    features: ["120Hz AMOLED", "50MP AI Camera", "5000mAh Battery", "Snapdragon 8 Gen 3"],
    specs: {
      RAM: "12GB",
      Storage: "256GB",
      Camera: "50MP Main + 12MP Ultra-Wide",
      Battery: "5000mAh"
    },
    stock: 50,
    colors: ["Cosmic Black", "Lunar White"],
    smartScore: 94
  },
  {
    id: "p2",
    name: "AuraBook Pro 14",
    description: "Powerful and thin laptop for creators and developers.",
    price: 85000,
    discount: 5,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 890,
    features: ["M2 Chip equivalent", "14-inch Retina Display", "16 hours battery", "Backlit Keyboard"],
    specs: {
      Processor: "Aura Silicon M2",
      RAM: "16GB",
      Storage: "512GB SSD",
      Display: "14-inch 4K"
    },
    stock: 20,
    colors: ["Space Gray", "Silver"],
    smartScore: 89
  },
  {
    id: "p3",
    name: "SonicMax Noise Cancelling Headphones",
    description: "Immersive audio with industry-leading active noise cancellation.",
    price: 15999,
    discount: 15,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 2150,
    features: ["Active Noise Cancelling", "40 hours battery", "Hi-Res Audio", "Multipoint connection"],
    specs: {
      Type: "Over-Ear",
      Battery: "40h",
      Connectivity: "Bluetooth 5.3",
      Weight: "250g"
    },
    stock: 100,
    colors: ["Matte Black", "Midnight Blue"],
    smartScore: 92
  },
  {
    id: "p4",
    name: "Vortex Gaming Console",
    description: "Next-gen gaming with 4K resolution and 120fps support.",
    price: 49999,
    discount: 0,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
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

const categories = ["Mobiles", "Laptops", "Electronics", "Gaming", "Shoes", "Fashion", "Grocery", "Home Appliances"];
const adjectives = ["Smart", "Ultra", "Pro", "Lite", "Max", "Eco", "Classic", "Vibrant", "Premium", "Essential"];
const nouns = ["Device", "Gadget", "Gear", "Machine", "Accessory", "Item", "Tool", "Wear", "Bundle", "Kit"];

const categoryImages: Record<string, string[]> = {
  Mobiles: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop"],
  Laptops: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1531297172864-8dbcc0d44043?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"],
  Electronics: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"],
  Gaming: ["https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop"],
  Shoes: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"],
  Fashion: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop"],
  Grocery: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=800&auto=format&fit=crop"],
  "Home Appliances": ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"]
};

for (let i = 10; i <= 100; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = Math.floor(Math.random() * 90000) + 999;
  const catImages = categoryImages[category] || categoryImages["Electronics"];
  const image = catImages[Math.floor(Math.random() * catImages.length)];
  products.push({
    id: `p${i}`,
    name: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${category} ${nouns[Math.floor(Math.random() * nouns.length)]} ${i}`,
    description: `A fantastic ${category.toLowerCase()} option for everyday use.`,
    price,
    discount: Math.floor(Math.random() * 30),
    category,
    image,
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
    
    return tokens.some(token => 
      p.name.toLowerCase().includes(token) || 
      p.description.toLowerCase().includes(token) ||
      p.category.toLowerCase().includes(token)
    );
  }).sort((a, b) => (b.smartScore || 0) - (a.smartScore || 0));
};
