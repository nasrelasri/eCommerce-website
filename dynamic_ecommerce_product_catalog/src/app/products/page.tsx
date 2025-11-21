import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "./mockData";

const products = mockProducts;
const TOTAL_PAGES = 3;
const CURRENT_PAGE = 1;

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />

      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <header className="space-y-3 text-center">
            <h1 className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Products
            </h1>
          </header>

          <section aria-live="polite">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.length > 0 &&
                products.map((product) => (
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
          </section>

          <nav
            className="flex items-center justify-center gap-4 border-t border-neutral-200 pt-6"
            aria-label="Pagination"
          >
            <button
              type="button"
              className="rounded-full border border-neutral-200 px-6 py-2 text-sm font-semibold text-neutral-400 transition hover:border-neutral-300 hover:text-neutral-600 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-300"
              disabled
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_PAGES }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === CURRENT_PAGE;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                      isActive
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
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
              className="rounded-full border border-neutral-200 px-6 py-2 text-sm font-semibold text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-300"
              disabled
            >
              Next
            </button>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
