import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  rating: number;
  price: string;
  originalPrice?: string;
  discount?: string;
};

const TOTAL_STARS = 5;

const ProductCard = ({
  id,
  image,
  title,
  rating,
  price,
  originalPrice,
  discount,
}: ProductCardProps) => {
  const normalizedRating = Math.min(Math.max(rating, 0), TOTAL_STARS);
  const displayRating = normalizedRating.toFixed(1);

  return (
    <Link href={`/products/${id}`}>
      <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>

        <div className="flex items-center justify-between">
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
                  className="h-4 w-4"
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
            {displayRating}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xl font-semibold text-neutral-900">{price}</p>
            {originalPrice ? (
              <span className="text-sm font-medium text-neutral-400 line-through">
                {originalPrice}
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                {discount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ProductCard;
