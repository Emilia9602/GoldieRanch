import type { Product } from "../types/product.types"

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">

            <div className="h-52 w-full overflow-hidden bg-[#F3EFE7]">
                <img
                    src={product.image ?? "/images/ImageNotAvailable.jpg"}
                    alt={product.name ? `${product.name} från Goldie Ranch` : "Produktbild"}
                    className="w-full h-full object-cover object-center" />
            </div>

            <div className="p-3 space-y-1 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-[#342D26]">
                    {product.name}
                </h3>

                <p className="text-sm text-[#6B5D48] leading-relaxed">
                    {product.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-[#D9BE95]/40 mt-auto">

                    <span className="text-[#342D26] font-semibold">
                        {product.price} kr
                    </span>
                </div>
            </div>
        </div>
    )
}