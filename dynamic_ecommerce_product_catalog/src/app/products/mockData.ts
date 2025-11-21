export type Product = {
  id: string;
  image: string;
  title: string;
  rating: number;
  price: string;
  originalPrice?: string;
  discount?: string;
};

export const mockProducts: Product[] = [
  {
    id: "selvedge-denim-jacket",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    title: "Selvedge Denim Jacket",
    rating: 4.8,
    price: "$198",
    originalPrice: "$230",
    discount: "15% off",
  },
  {
    id: "merino-crew-sweater",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    title: "Merino Crew Sweater",
    rating: 4.6,
    price: "$145",
    originalPrice: "$172",
    discount: "16% off",
  },
  {
    id: "heritage-oxford-shirt",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    title: "Heritage Oxford Shirt",
    rating: 4.5,
    price: "$92",
    originalPrice: "$108",
    discount: "15% off",
  },
  {
    id: "tailored-wool-blazer",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    title: "Tailored Wool Blazer",
    rating: 4.6,
    price: "$320",
    originalPrice: "$400",
    discount: "20% off",
  },
  {
    id: "pleated-wool-trousers",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    title: "Pleated Wool Trousers",
    rating: 4.4,
    price: "$210",
    originalPrice: "$248",
    discount: "15% off",
  },
  {
    id: "linen-resort-shirt",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80",
    title: "Linen Resort Shirt",
    rating: 4.3,
    price: "$128",
    originalPrice: "$150",
    discount: "15% off",
  },
  {
    id: "cashmere-shawl-cardigan",
    image:
      "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=800&q=80",
    title: "Cashmere Shawl Cardigan",
    rating: 4.7,
    price: "$265",
    originalPrice: "$312",
    discount: "15% off",
  },
  {
    id: "double-breasted-topcoat",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    title: "Double-Breasted Topcoat",
    rating: 4.8,
    price: "$580",
    originalPrice: "$640",
    discount: "9% off",
  },
  {
    id: "performance-pique-polo",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    title: "Performance Piqué Polo",
    rating: 4.2,
    price: "$98",
    originalPrice: "$112",
    discount: "12% off",
  },
];

