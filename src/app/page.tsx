import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Trending from "./components/Trending";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <Hero />
      <Trending />
      <Footer />
    </div>
  );
}
