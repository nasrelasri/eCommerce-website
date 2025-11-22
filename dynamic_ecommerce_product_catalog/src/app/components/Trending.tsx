import ProductCard from "./ProductCard";
import { mockProducts } from "../products/mockData";

const Trending = () => {
  const trendingProducts = mockProducts
    .filter((product) => product.isTrending)
    .slice(0, 9);

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
              image={product.image}
              title={product.title}
              rating={product.rating}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;

