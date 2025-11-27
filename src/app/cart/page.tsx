"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert("Checkout functionality coming soon!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <svg
                  className="mx-auto h-24 w-24 text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M6 6h15l-1.5 8.5h-11L6 6Zm0 0L4 3H2"
                  />
                  <circle cx="9" cy="19" r="1" fill="currentColor" />
                  <circle cx="17" cy="19" r="1" fill="currentColor" />
                </svg>
                <h1 className="mt-6 text-2xl font-bold text-neutral-900">
                  Your cart is empty
                </h1>
                <p className="mt-2 text-neutral-500">
                  Start shopping to add items to your cart
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-block rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-neutral-900">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
            >
              Clear cart
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row"
                  >
                    <Link
                      href={`/products/${item.productId}`}
                      className="relative h-56 w-full overflow-hidden rounded-lg bg-neutral-100 md:h-32 md:w-32 md:shrink-0"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-1 min-w-0 flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.productId}`}
                            className="block text-lg font-semibold text-neutral-900 hover:text-neutral-600"
                          >
                            {item.product.title}
                          </Link>
                          <p className="mt-1 text-sm text-neutral-500">
                            {item.product.category}
                          </p>
                          <p className="mt-1 text-sm text-neutral-500">
                            Size: {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.productId, item.size)
                          }
                          className="text-neutral-400 transition hover:text-neutral-900"
                          aria-label="Remove item"
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-neutral-500">
                            Quantity:
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                              aria-label="Decrease quantity"
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
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="min-w-[3rem] text-center text-base font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                              aria-label="Increase quantity"
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
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-neutral-900">
                            $
                            {(
                              parseFloat(
                                item.product.price.replace("$", "")
                              ) * item.quantity
                            ).toFixed(2)}
                          </p>
                          {item.product.originalPrice && (
                            <p className="text-sm text-neutral-400 line-through">
                              $
                              {(
                                parseFloat(
                                  item.product.originalPrice.replace("$", "")
                                ) * item.quantity
                              ).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-2xl border border-neutral-200 bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold text-neutral-900">
                  Order Summary
                </h2>

                <div className="space-y-4 border-b border-neutral-200 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium text-neutral-900">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium text-neutral-900">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium text-neutral-900">
                      ${(getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-lg font-bold">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-neutral-900">
                    ${(getTotalPrice() * 1.1).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="mt-4 block w-full rounded-full border border-neutral-200 px-6 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;

