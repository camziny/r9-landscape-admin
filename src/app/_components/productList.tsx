import { getProducts } from "@/server/db/queries";
import Image from "next/image";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="z-10 w-full max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={product.image}
              style={{ objectFit: "fill" }}
              width={192}
              height={192}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl text-gray-700 font-semibold mb-2">
                {product.title}
              </h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
