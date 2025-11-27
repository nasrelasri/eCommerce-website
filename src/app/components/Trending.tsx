"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "../products/mockData";
import { productService } from "../services/productService";

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productService.getTrendingProducts();
        setTrendingProducts(data.slice(0, 9));
      } catch (err) {
        setError('Failed to load trending products');
        console.error('Error fetching trending products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.3em] text-neutral-900">
              TRENDING
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-900 border-r-transparent"></div>
              <p className="mt-4 text-sm text-neutral-600">Loading trending products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.3em] text-neutral-900">
              TRENDING
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-[0.3em] text-neutral-900">
            TRENDING
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              rating={product.rating}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="rounded-md bg-neutral-900 px-8 py-3 font-medium text-white transition-all hover:bg-neutral-800"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trending;

