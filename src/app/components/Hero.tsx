import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-neutral-100 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="space-y-4 text-center md:space-y-6 md:text-left">
          <h1 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
            TIMELESS MEN&apos;S FASHION FOR EVERY MOMENT
          </h1>
          <p className="text-base text-neutral-600 sm:text-lg">
            Find clothes that match your vibe. Designed for men who want to look
            good effortlessly.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/products"
              className="w-full rounded-full bg-black px-6 py-3 text-center text-sm font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800 sm:w-auto sm:px-10"
            >
              Start shopping
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/heroImg.png"
            alt="Curated men's essentials"
            width={1000}
            height={736}
            priority
            className="h-auto w-full max-w-[460px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

