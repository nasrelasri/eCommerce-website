import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              About PRIME
            </h1>
            <p className="text-lg text-neutral-600">
              Elevating your style with premium products since 2025
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">
                Our Story
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                PRIME was founded with a simple mission: to provide exceptional
                products that enhance your everyday life. We believe in quality,
                authenticity, and creating meaningful connections with our
                customers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">
                Our Values
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Quality First
                  </h3>
                  <p className="text-neutral-700">
                    We curate only the finest products that meet our high
                    standards of excellence.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Customer Focus
                  </h3>
                  <p className="text-neutral-700">
                    Your satisfaction is our priority. We&apos;re here to ensure a
                    seamless shopping experience.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Sustainability
                  </h3>
                  <p className="text-neutral-700">
                    We&apos;re committed to responsible practices that protect our
                    planet for future generations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-neutral-900">
                    Innovation
                  </h3>
                  <p className="text-neutral-700">
                    We continuously evolve to bring you the latest trends and
                    timeless classics.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">
                Why Choose Us
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                With PRIME, you&apos;re not just buying products—you&apos;re investing in
                quality, style, and a shopping experience designed around you.
                From our carefully selected inventory to our dedicated customer
                service, every detail is crafted with care.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;

