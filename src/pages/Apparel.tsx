import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ShoppingBag, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import hoodieModelCover from "@/assets/hoodie-model-cover.jpg";
import hoodieShowcaseFront from "@/assets/hoodie-showcase-front.jpg";
import hoodieShowcaseBack from "@/assets/hoodie-showcase-back.jpg";

const Apparel = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Video Section - H&M Style */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-secondary">
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            poster={hoodieModelCover}
          >
            {/* Placeholder - replace with actual brand video */}
            <source src="https://cdn.shopify.com/videos/c/o/v/5a5c5f5e5f5e5f5e5f5e5f5e5f5e5f5e.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                BOAC
                <span className="block text-accent">COLLECTION</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Represent excellence. Every piece tells a story of determination and triumph.
              </p>
              <div className="flex items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-background hover:bg-white/90 font-semibold px-8"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Now
                </Button>
                <CartDrawer />
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </section>

      {/* Model Showcase Section */}
      <section className="py-8 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Model Card 1 - Front */}
            <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <img
                src={hoodieShowcaseFront}
                alt="BOAC Faith Over Fear Hoodie - Front"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">Faith Over Fear Hoodie</h3>
                <p className="text-white/70 text-sm">Premium comfort meets champion style</p>
              </div>
            </div>

            {/* Model Card 2 - Back */}
            <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <img
                src={hoodieShowcaseBack}
                alt="BOAC Faith Over Fear Hoodie - Back"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">Bold Statement Back</h3>
                <p className="text-white/70 text-sm">Make your presence known</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop the Collection
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every purchase supports our mission to empower athletes beyond the game.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our collection is being prepared. Tell us in the chat what products you'd like to see!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Apparel;
