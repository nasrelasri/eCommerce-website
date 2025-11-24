"use client";

import { useState, useMemo } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "./mockData";

const ITEMS_PER_PAGE = 9;

const ProductsPage = () => {
  // Calculate min and max prices from products
  const priceMinMax = useMemo(() => {
    const prices = mockProducts.map((product) =>
      parseFloat(product.price.replace("$", ""))
    );
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceMinMax.min,
    priceMinMax.max,
  ]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">(
    "featured"
  );

  // Extract unique categories from products
  const availableCategories = useMemo(() => {
    const categories = mockProducts.map((product) => product.category);
    return Array.from(new Set(categories)).sort();
  }, []);

  // Filter and sort products based on selected categories, price range, and sort option
  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const price = parseFloat(product.price.replace("$", ""));
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceB - priceA;
      });
    }

    return sorted;
  }, [selectedCategories, priceRange, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [currentPage, filteredProducts]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    setPriceRange((prev) => {
      const newRange: [number, number] = [...prev];
      if (index === 0) {
        // Updating min value - ensure it doesn't exceed max
        newRange[0] = Math.min(value, prev[1]);
      } else {
        // Updating max value - ensure it doesn't go below min
        newRange[1] = Math.max(value, prev[0]);
      }
      return newRange;
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([priceMinMax.min, priceMinMax.max]);
    setCurrentPage(1);
  };

  // Filter content JSX (reusable for desktop and mobile)
  const filterContent = (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
        {(selectedCategories.length > 0 ||
          priceRange[0] !== priceMinMax.min ||
          priceRange[1] !== priceMinMax.max) && (
          <button
            onClick={clearFilters}
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Category
        </h3>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900"
              />
              <span>{category}</span>
              <span className="ml-auto text-xs text-neutral-400">
                ({mockProducts.filter((p) => p.category === category).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-4 border-t border-neutral-200 pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Price Range
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-neutral-900">
              ${priceRange[0]}
            </span>
            <span className="text-neutral-400">-</span>
            <span className="font-semibold text-neutral-900">
              ${priceRange[1]}
            </span>
          </div>
          <div className="relative pt-1 pb-1">
            <div className="relative h-5 flex items-center">
              <input
                type="range"
                min={priceMinMax.min}
                max={priceMinMax.max}
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChange(0, parseInt(e.target.value))
                }
                className="pointer-events-none absolute z-10 h-0 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-neutral-200 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-neutral-900 [&::-moz-range-thumb]:shadow-md [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-neutral-200"
              />
              <input
                type="range"
                min={priceMinMax.min}
                max={priceMinMax.max}
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(1, parseInt(e.target.value))
                }
                className="pointer-events-none absolute z-20 h-0 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-neutral-900 [&::-moz-range-thumb]:shadow-md [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white shadow-xl lg:hidden">
            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-full p-2 hover:bg-neutral-100"
                  aria-label="Close filters"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {filterContent}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                View Results
              </button>
            </div>
          </aside>
        </>
      )}

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-8 space-y-6 rounded-lg border border-neutral-200 p-6">
              {filterContent}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex flex-1 flex-col gap-10">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900 lg:hidden"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                  {(selectedCategories.length > 0 ||
                    priceRange[0] !== priceMinMax.min ||
                    priceRange[1] !== priceMinMax.max) && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
                      {selectedCategories.length +
                        (priceRange[0] !== priceMinMax.min ||
                        priceRange[1] !== priceMinMax.max
                          ? 1
                          : 0)}
                    </span>
                  )}
                </button>
                <h1 className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 sm:block">
                  Products
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {filteredProducts.length !== mockProducts.length && (
                  <p className="hidden text-sm text-neutral-600 sm:block">
                    Showing {filteredProducts.length} of {mockProducts.length}{" "}
                    products
                  </p>
                )}
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-select"
                    className="hidden text-sm font-medium text-neutral-700 sm:inline"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "featured" | "price-low" | "price-high"
                      )
                    }
                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </header>

            <section aria-live="polite">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-neutral-500">
                  <p className="text-lg">No products found</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-neutral-900 underline hover:no-underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.image}
                      title={product.title}
                      rating={product.rating}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      discount={product.discount}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-4 border-t border-neutral-200 pt-6"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="cursor-pointer rounded-full border border-neutral-200 px-6 py-2 text-sm font-semibold text-neutral-400 transition hover:border-neutral-300 hover:text-neutral-600 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-300"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageClick(pageNumber)}
                        className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                          isActive
                            ? "border-neutral-900 bg-neutral-900 text-white cursor-default"
                            : "cursor-pointer border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                        }`}
                        disabled={isActive}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer rounded-full border border-neutral-200 px-6 py-2 text-sm font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-300"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
