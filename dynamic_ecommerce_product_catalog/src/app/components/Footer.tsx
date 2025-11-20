import Image from "next/image";

const socials = [
  { name: "Instagram", src: "/instagram.png" },
  { name: "TikTok", src: "/tiktok.png" },
  { name: "YouTube", src: "/youtube.png" },
];

const payments = [
  { name: "Visa", src: "/Visa.png" },
  { name: "Mastercard", src: "/Mastercard.png" },
  { name: "PayPal", src: "/Paypal.png" },
  { name: "Apple Pay", src: "/Apple_Pay.png" },
  { name: "Google Pay", src: "/Google_Pay.png" },
];

const Footer = () => {
  return (
    <footer className="bg-neutral-200 px-4 py-16 text-neutral-800 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="text-2xl font-semibold tracking-tight">PRIME</div>
          <p className="max-w-md text-base text-center text-neutral-700">
            Find clothes that match your vibe. Designed for men who want to look
            good effortlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            {socials.map((network) => (
              <span
                key={network.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
                aria-label={network.name}
              >
                <Image
                  src={network.src}
                  alt={`${network.name} icon`}
                  width={18}
                  height={18}
                  className="h-4 w-4 object-contain"
                />
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-neutral-400 pt-8">
          <div className="flex flex-col gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <p className="text-sm text-neutral-600">Prime.com © 2025</p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              {payments.map((brand) => (
                <span
                  key={brand.name}
                  className="inline-flex h-8 w-12 items-center justify-center rounded-lg bg-white shadow-sm"
                  aria-label={brand.name}
                >
                  <Image
                    src={brand.src}
                    alt={`${brand.name} badge`}
                    width={18}
                    height={10}
                    className="h-3 w-auto object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

