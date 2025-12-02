import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const imageUrl = node.images.edges[0]?.node.url;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link 
      to={`/apparel/${node.handle}`}
      className="group bg-card rounded-xl border border-border overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
    >
      <div className="aspect-square bg-secondary/20 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={node.images.edges[0]?.node.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {node.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[2.5rem]">
          {node.description || "No description available"}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-accent">
            ${parseFloat(price.amount).toFixed(2)}
          </span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!firstVariant?.availableForSale}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};
