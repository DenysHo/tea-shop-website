import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
