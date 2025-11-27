"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-x-4 top-20 z-50 w-auto max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl sm:inset-x-auto sm:right-4 sm:w-full"
      >
        <div className="flex max-h-[calc(100vh-8rem)] flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close cart"
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-neutral-500">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-4 border-b border-neutral-100 pb-4 last:border-0"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-neutral-900">
                            {item.product.title}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            Size: {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.productId, item.size);
                          }}
                          className="text-neutral-400 transition hover:text-neutral-900"
                          aria-label="Remove item"
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
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity - 1
                              );
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded border border-neutral-200 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                            aria-label="Decrease quantity"
                          >
                            <svg
                              className="h-3 w-3"
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
                          <span className="min-w-[2rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity + 1
                              );
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded border border-neutral-200 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                            aria-label="Increase quantity"
                          >
                            <svg
                              className="h-3 w-3"
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
                        <p className="text-sm font-semibold text-neutral-900">
                          ${(
                            parseFloat(item.product.price.replace("$", "")) *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-neutral-200 px-6 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-neutral-900">
                  Total:
                </span>
                <span className="text-xl font-bold text-neutral-900">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="block w-full rounded-full bg-neutral-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDropdown;

