export interface AffiliateProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  image: string;
  affiliateLink: string;
  badge?: string;
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "1",
    name: "Vapor Edge Pro 360 2",
    brand: "Nike",
    category: "Football Cleats",
    description: "Elite football cleats for maximum speed and traction",
    price: "$150",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    affiliateLink: "https://www.nike.com",
    badge: "Top Pick",
  },
  {
    id: "2",
    name: "Alpha Menace Pro 3",
    brand: "Nike",
    category: "Football Cleats",
    description: "Aggressive traction for linemen and linebackers",
    price: "$130",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    affiliateLink: "https://www.nike.com",
  },
  {
    id: "3",
    name: "F7 2.0 Football Gloves",
    brand: "Cutters",
    category: "Gloves",
    description: "Premium grip technology for receivers and DBs",
    price: "$50",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    affiliateLink: "https://www.amazon.com",
    badge: "Best Seller",
  },
  {
    id: "4",
    name: "Speed Ladder Training Kit",
    brand: "SKLZ",
    category: "Training",
    description: "Improve footwork, agility, and quickness",
    price: "$59",
    image: "/images/products/sklz-speed-ladder.jpg",
    affiliateLink: "https://amzn.to/4iEMyP7",
  },
  {
    id: "5",
    name: "Gold Standard Whey Protein",
    brand: "Optimum Nutrition",
    category: "Nutrition",
    description: "24g protein per serving for muscle recovery",
    price: "$76",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
    affiliateLink: "https://amzn.to/3KF7zMW",
    badge: "#1 Protein",
  },
  {
    id: "6",
    name: "Resistance Bands Set",
    brand: "TheraBand",
    category: "Training",
    description: "Build strength and flexibility anywhere",
    price: "$25",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400",
    affiliateLink: "https://www.amazon.com",
  },
  {
    id: "7",
    name: "G502 X Gaming Headset",
    brand: "Beats",
    category: "Recovery",
    description: "Noise-cancelling for focus and recovery sessions",
    price: "$180",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    affiliateLink: "https://www.amazon.com",
  },
  {
    id: "8",
    name: "Hypervolt GO 2",
    brand: "Hyperice",
    category: "Recovery",
    description: "Portable percussion massage for muscle recovery",
    price: "$200",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    affiliateLink: "https://www.amazon.com",
    badge: "Pro Choice",
  },
];

export const getProductsByCategory = (category: string) => {
  return affiliateProducts.filter(p => p.category === category);
};

export const getFeaturedProducts = () => {
  return affiliateProducts.filter(p => p.badge);
};
