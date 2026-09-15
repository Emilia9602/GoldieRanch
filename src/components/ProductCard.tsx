import type { Product } from "../types/product.types"

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

            <div className="h-52 w-full overflow-hidden bg-[#F3EFE7]">
                <img
                    src={product.image ?? "/images/ImageNotAvailable.jpg"}
                    alt={product.name ? `${product.name} från Goldie Ranch` : "Produktbild"}
                    className="w-full h-full object-cover object-[50%_30%]" />
            </div>

            <h3 className="text-lg font-semibold text-[#3E3A36]">
                {product.name}
            </h3>

            <p className="text-sm text-[#6B625A] leading-relaxed">
                {product.description}
            </p>

            <div className="flex justify-between items-center pt-3 border-t border-[#E5DFD5]">

                <span className="text-[#3E3A36] font-semibold">
                    {product.price}
                </span>
            </div>
        </div>
    )
}