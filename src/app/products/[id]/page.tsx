"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Product } from "../mockData";
import { productService } from "../../services/productService";
import { useCart } from "../../context/CartContext";

const TOTAL_STARS = 5;

const getReviewCount = (productId: string) => {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash << 5) - hash + productId.charCodeAt(i);
    hash |= 0;
  }
  return 50 + (Math.abs(hash) % 200);
};

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productService.getProductById(productId);
        if (data) {
          setProduct(data);
          if (data.size.length > 0) {
            setSelectedSize(data.size[0]);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!product) return;

    addToCart(product, selectedSize, quantity);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const normalizedRating = product
    ? Math.min(Math.max(product.rating, 0), TOTAL_STARS)
    : 0;
  const displayRating = normalizedRating.toFixed(1);
  const reviewCount = useMemo(
    () => (product ? getReviewCount(product.id) : 0),
    [product?.id]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-900 border-r-transparent"></div>
                <p className="mt-4 text-neutral-600">Loading product...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <p className="text-lg text-red-600">{error || "Product not found"}</p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => router.back()}
                    className="rounded-md border border-neutral-200 px-6 py-2 text-neutral-700 transition hover:bg-neutral-50"
                  >
                    Go Back
                  </button>
                  <Link
                    href="/products"
                    className="rounded-md bg-neutral-900 px-6 py-2 text-white transition hover:bg-neutral-800"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-neutral-900">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-neutral-900">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900">{product.title}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.discount && (
                <div className="absolute top-4 right-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                  {product.discount}
                </div>
              )}
              {product.isTrending && (
                <div className="absolute top-4 left-4 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
                  Trending
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                  {product.category}
                </p>
                <h1 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex items-center gap-1 text-amber-500"
                    aria-label={`Rated ${displayRating} out of ${TOTAL_STARS}`}
                  >
                    {Array.from({ length: TOTAL_STARS }).map((_, index) => {
                      const isFilled = normalizedRating >= index + 1;
                      return (
                        <svg
                          key={index}
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          role="presentation"
                        >
                          <path
                            d="M12 2.5l2.9 6.08 6.72.55-5.11 4.45 1.54 6.67L12 16.84l-6.05 3.41 1.54-6.67-5.11-4.45 6.72-.55L12 2.5z"
                            fill={isFilled ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                        </svg>
                      );
                    })}
                  </div>
                  <span className="text-sm font-medium text-neutral-600">
                    {displayRating} ({reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <p className="text-4xl font-bold text-neutral-900">
                    {product.price}
                  </p>
                  {product.originalPrice && (
                    <span className="text-xl font-medium text-neutral-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-neutral-700">
                  Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border-2 px-6 py-3 text-sm font-semibold transition ${
                        selectedSize === size
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-neutral-700">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="min-w-[3rem] text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-full bg-neutral-900 px-8 py-4 text-lg font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!selectedSize}
                >
                  Add to Cart
                </button>
                {showSuccessMessage && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                    ✓ Added to cart successfully!
                  </div>
                )}
              </div>

              {/* Product Description */}
              <div className="border-t border-neutral-200 pt-6">
                <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                  Description
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  Experience the perfect blend of style and comfort with our{" "}
                  {product.title}. Crafted with attention to detail, this piece
                  from our {product.category.toLowerCase()} collection offers
                  timeless elegance and exceptional quality. Whether you're
                  dressing for a casual day out or a special occasion, this
                  product delivers on both form and function.
                </p>
              </div>

              {/* Additional Info */}
              <div className="border-t border-neutral-200 pt-6">
                <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                  Product Details
                </h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium text-neutral-500">Category</dt>
                    <dd className="text-neutral-900">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-neutral-500">Available Sizes</dt>
                    <dd className="text-neutral-900">{product.size.join(", ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-neutral-500">Rating</dt>
                    <dd className="text-neutral-900">{displayRating} / 5.0</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;

