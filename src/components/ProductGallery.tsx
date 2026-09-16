import { useState } from "react";
import type { Product } from "../types/product.types"

type Props = {
    product: Product;
};

export default function ProductGallery({ product }: Props) {
    const [mainImage, setMainImage] = useState(product.image);

    return (
        <div className="space-y-3">

            <div className="h-64 w-full rounded-xl overflow-hidden bg-[#F3EFE7]">
                <img src={mainImage ?? "/images/ImageNotAvailable.jpg"}
                    alt={product.name ? `${product.name} från Goldie Ranch` : "Produktbild"}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {product.images && product.images.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                    {product.images.map((img: string) => (
                        <button
                            key={img}
                            onClick={() => setMainImage(img)}
                            className="w-16 h-16 shrink-0 border border-[#E5DFD5] rounded-md overflow-hidden">
                            <img src={img} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}