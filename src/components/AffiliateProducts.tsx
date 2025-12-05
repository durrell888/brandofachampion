import { ExternalLink, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { affiliateProducts, AffiliateProduct } from "@/data/affiliateProducts";

interface AffiliateProductsProps {
  title?: string;
  subtitle?: string;
  maxProducts?: number;
  category?: string;
  showFeaturedOnly?: boolean;
}

const AffiliateProducts = ({
  title = "Recommended Gear",
  subtitle = "Top picks from our partners to help you perform at your best",
  maxProducts = 4,
  category,
  showFeaturedOnly = false,
}: AffiliateProductsProps) => {
  let products = affiliateProducts;
  
  if (category) {
    products = products.filter(p => p.category === category);
  }
  
  if (showFeaturedOnly) {
    products = products.filter(p => p.badge);
  }
  
  products = products.slice(0, maxProducts);

  const handleClick = (product: AffiliateProduct) => {
    // Track affiliate click (you could add analytics here)
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Partner Products
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 hover:shadow-lg transition-all duration-300 animate-fade-in opacity-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-square bg-gradient-to-br from-secondary/50 to-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-foreground">
                  {product.price}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors"
                  onClick={() => handleClick(product)}
                >
                  View Deal
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        * As an affiliate, we may earn from qualifying purchases. This helps support our athletes.
      </p>
    </section>
  );
};

export default AffiliateProducts;
