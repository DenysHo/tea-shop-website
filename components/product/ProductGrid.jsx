import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, className = "" }) {
  return (
    <div
      className={`grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-x-6 gap-y-10 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
