"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Header = ({ searchQuery = "", onSearchChange }: HeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync with parent searchQuery
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    // Real-time search as user types
    onSearchChange?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange?.(localSearch);
  };

  return (
    <header className="px-4 py-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Mobile layout */}
        <div className="flex items-center justify-between md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 text-neutral-800 transition-colors hover:text-neutral-900 focus:outline-none cursor-pointer"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <Link href="/" className="text-xl font-semibold tracking-tight">
            PRIME
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-neutral-800 transition-colors hover:text-neutral-900 focus:outline-none cursor-pointer"
              aria-label="Search products"
            >
              <svg
                className="h-5 w-5 text-neutral-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm6.5 11 2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-neutral-800 transition-colors hover:text-neutral-900 focus:outline-none cursor-pointer"
              aria-label="Open cart"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6h15l-1.5 8.5h-11L6 6Zm0 0L4 3H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="19" r="1" fill="currentColor" />
                <circle cx="17" cy="19" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 border-t border-neutral-200 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* Desktop layout */}
        <div className="hidden grid-cols-[auto_1fr_auto] items-center gap-6 md:grid">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            PRIME
          </Link>

          <nav className="flex items-center justify-center gap-10 text-sm font-medium text-neutral-600">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-neutral-900">
                {item.label}
              </Link>
            ))}
          </nav>

          <form 
            onSubmit={handleSearchSubmit}
            className="flex items-center justify-end gap-4 min-w-sm"
          >
            <label className="flex w-full max-w-sm items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-500">
              <span className="sr-only">Search products</span>
              <svg
                className="h-4 w-4 text-neutral-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm6.5 11 2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="search"
                value={localSearch}
                onChange={handleSearchInput}
                placeholder="Find a product…"
                className="w-full bg-transparent text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch("");
                    onSearchChange?.("");
                  }}
                  className="text-neutral-400 hover:text-neutral-700"
                  aria-label="Clear search"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </label>

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-neutral-800 transition-colors hover:text-neutral-900 focus:outline-none cursor-pointer"
              aria-label="Open cart"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6h15l-1.5 8.5h-11L6 6Zm0 0L4 3H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="19" r="1" fill="currentColor" />
                <circle cx="17" cy="19" r="1" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;

